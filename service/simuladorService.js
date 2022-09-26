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

const obterPlanos = async () => {
    const planos = await simuladorRepository.obterPlanos();
    return Object.values(planos.data).map(plano => {
        return {
            plano: plano.plano,
            franquia: plano.franquia
        };
    });
};

const obterTarifas = async () => {
    const planos = await simuladorRepository.obterTarifas();
    return Object.values(planos.data).map(plano => {
        return {
            origem: plano.origem,
            destino: plano.destino,
            tarifa: plano.tarifa
        };
    });
};

const obterTarifaOrigemDestino = async (origem, destino) => {
    return await simuladorRepository.obterTarifaOrigemDestino(origem, destino);
}

module.exports = {
    simularSemFaleMais,
    simularComFaleMais,
    obterPlanos,
    obterTarifas,
    obterTarifaOrigemDestino
}