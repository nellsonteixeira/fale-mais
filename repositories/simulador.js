const repo = require('../repositories/db');

exports.obterTarifaOrigemDestino = async (origem, destino) => {
  const tarifa = await repo.loadCollection('tarifa');
  return await tarifa.find({
    $and: [
      {
        origem: parseInt(origem)
      },
      {
        destino: parseInt(destino)
      }
    ]
  });
};

exports.obterTarifas = async (origem, destino) => {
  return await repo.loadCollection('tarifa');
};

exports.obterPlanos = async (origem, destino) => {
  return await repo.loadCollection('plano');
};
