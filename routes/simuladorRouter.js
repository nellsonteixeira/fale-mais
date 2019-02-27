const express = require('express');
const router = express.Router();
const controller = require('../controllers/simuladorController');
const { check } = require('express-validator/check');

router.get(
  '/origem/:origem/destino/:destino/franquia/:franquia/minutos/:minutos',
  [
    check('origem').isNumeric(),
    check('destino').isNumeric(),
    check('minutos').isNumeric(),
    check('franquia', 'O parametro Franquia deve ser um número maior do que zero').isInt({ gt: 0 }),
  ],
  controller.obterValorDaChamada
);

router.get('/', controller.get);

module.exports = router;
