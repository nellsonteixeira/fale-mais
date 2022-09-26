const { validationResult } = require("express-validator/check");
const simuladorService = require('../service/simuladorService');
const simuladorRepository = require("../repositories/simulador");

const validateParams = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
};

exports.obterValorDaChamada = async (req, res) => {
  validateParams(req, res);

  let planos = await simuladorService.obterPlanos();
  planos = planos.map(plano => { return plano.franquia });

  const planoEncontrado = planos.find(franquia => parseInt(franquia) === parseInt(req.params.franquia));

  if (!planos || !planoEncontrado) {
    res.status(400).json({ status: 400, message: 'Franquia inválida.' });
  }

  const valor = await simuladorService.obterTarifaOrigemDestino(
    req.params.origem,
    req.params.destino
  );

  if (!valor) {
    res.status(400).json({ status: 400, message: 'Plano inválido.' });
  }

  const valorComPlano = simuladorService.simularComFaleMais(
    req.params.franquia,
    req.params.minutos,
    valor[0].tarifa
  );

  const valorSemPlano = simuladorService.simularSemFaleMais(req.params.minutos, valor[0].tarifa);

  res.json({
    valorComPlano: valorComPlano,
    valorSemPlano: valorSemPlano
  });
};

exports.get = async (req, res) => {
  let tarifas = await simuladorRepository.obterTarifas();
  let planos = await simuladorService.obterPlanos()

  tarifas = Object.values(tarifas.data).map(tarifa => {
    return {
      origem: tarifa.origem,
      destino: tarifa.destino,
      valor: tarifa.tarifa
    };
  });

  res.json({
    tarifas: tarifas,
    planos: planos
  });
};
