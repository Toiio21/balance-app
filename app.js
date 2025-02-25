const express = require('express');
const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug'); // Правильный импорт Umzug
const config = require('./config/database');
const balanceRouter = require('./routes/balance');

const app = express();
app.use(express.json());

// Настройка Sequelize
const sequelize = new Sequelize(config.development);

// Настройка Umzug для миграций
const umzug = new Umzug({
  migrations: {
    glob: 'migrations/*.js', // Путь к миграциям
    resolve: ({ name, path, context }) => {
      const migration = require(path || '');
      return {
        name,
        up: async () => migration.up(context, Sequelize),
        down: async () => migration.down(context, Sequelize),
      };
    },
  },
  context: sequelize.getQueryInterface(), // Контекст для миграций
  storage: new SequelizeStorage({ sequelize }), // Используем SequelizeStorage
  logger: console, // Логгер для вывода информации
});

// Запуск миграций при старте приложения
umzug.up()
  .then(() => {
    console.log('Migrations executed');
    app.use('/balance', balanceRouter);
    app.listen(3000, () => console.log('Server running on port 3000'));
  })
  .catch(err => {
    console.error('Migration failed:', err);
    process.exit(1); // Завершаем процесс с ошибкой
  });