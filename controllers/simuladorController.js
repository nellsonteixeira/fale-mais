const { validationResult } = require("express-validator/check");
const simuladorRepository = require("../repositories/simulador");
const ACRESCIMO = 0.10;

const simularSemFaleMais = (totalMinutos, valorTarifa) => {
  return totalMinutos * valorTarifa;
};

const simularComFaleMais = (franquiaPlano, totalMinutos, valorTarifa) => {
  let valorAPagar = 0;
  if (parseFloat(totalMinutos) > parseFloat(franquiaPlano)) {
    const valorLigação = (totalMinutos - franquiaPlano) * valorTarifa;
    valorAPagar = valorLigação * ACRESCIMO + valorLigação;
  }
  return valorAPagar;
};

const validateParams = (req, res) => {
  const origem = req.params.origem;
  const destino = req.params.destino;
  const franquia = req.params.franquia;
  const minutos = req.params.minutos;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
};

const obterPlanos = async () => {
  const planos = await simuladorRepository.obterPlanos();
  return Object.values(planos.data).map(plano => {
    return {
      plano: plano.plano,
      franquia: plano.franquia
    };
  });
};

exports.obterValorDaChamada = async (req, res) => {
  validateParams(req, res);
  
  let planos = await obterPlanos();
  planos = planos.map(plano=>{ return plano.franquia});
  const planoEncontrado = planos.find(franquia=> parseInt(franquia) === parseInt(req.params.franquia));

  if (!planos || !planoEncontrado) {
    res.status(400).json({status:400, message: 'Franquia inválida.'});
  }

  let resultado = 0;

  const valor = await simuladorRepository.obterTarifaOrigemDestino(
    req.params.origem,
    req.params.destino
  );

  if (!valor) {
    res.status(400).json({status:400, message: 'Plano inválido.'});
  }
  const valorComPlano = simularComFaleMais(
    req.params.franquia,
    req.params.minutos,
    valor[0].tarifa
  );

  const valorSemPlano = simularSemFaleMais(req.params.minutos, valor[0].tarifa);

  res.json({
    valorComPlano: valorComPlano,
    valorSemPlano: valorSemPlano
  });
};
exports.get = async (req, res) => {
  let tarifas = await simuladorRepository.obterTarifas();
  let planos = await obterPlanos()

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
