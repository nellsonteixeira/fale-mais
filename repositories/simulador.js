const repo = require('./db');

const obterTarifaOrigemDestino = async (origem, destino) => {
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

const obterTarifas = async () => {
  return await repo.loadCollection('tarifa');
};

const obterPlanos = async () => {
  return await repo.loadCollection('plano');
};

module.exports = {
  obterTarifaOrigemDestino, 
  obterTarifas,
  obterPlanos
}
