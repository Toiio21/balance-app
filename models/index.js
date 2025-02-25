const { Sequelize } = require('sequelize');
const config = require('../config/database');

// Создаём экземпляр Sequelize
const sequelize = new Sequelize(config.development);

// Импортируем модель User
const User = require('./User')(sequelize);

// Синхронизация моделей с базой данных (опционально)
sequelize.sync()
  .then(() => console.log('Models synchronized with the database'))
  .catch(err => console.error('Failed to synchronize models:', err));

// Экспортируем экземпляр sequelize и модели
module.exports = {
  sequelize,
  User
};