module.exports = {
  development: {
    username: 'adel_test',       // Имя пользователя
    password: 'adel1',   // Пароль
    database: 'db_test',       // Имя базы данных
    host: 'localhost',              // Хост (обычно localhost)
    dialect: 'postgres',             // Используемый диалект (PostgreSQL)
    pool: {
      max: 10,                      // Максимальное количество соединений
      min: 0,
      acquire: 30000,                // Время ожидания подключения (мс)
      idle: 10000                    // Время простоя соединения (мс)
    }
  }
};