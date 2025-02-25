const express = require('express');
const router = express.Router();
const { User, sequelize } = require('../models'); // Импортируем User и sequelize
const { Sequelize } = require('sequelize');

router.put('/', async (req, res) => {
  const { userId, amount } = req.body;

  if (typeof amount !== 'number') {
    return res.status(400).send('Invalid amount');
  }

  const t = await sequelize.transaction({ isolationLevel: Sequelize.Transaction.SERIALIZABLE });

  try {
    const user = await User.findByPk(userId, {
      lock: t.LOCK.UPDATE,
      transaction: t
    });

    if (!user) {
      await t.rollback();
      return res.status(404).send('User not found');
    }

    const newBalance = user.balance + amount;
    if (newBalance < 0) {
      await t.rollback();
      return res.status(400).send('Insufficient funds');
    }

    user.balance = newBalance;
    await user.save({ transaction: t });
    await t.commit();

    res.json({ balance: user.balance });
  } catch (error) {
    await t.rollback();
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;