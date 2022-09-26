const { expect } = require('chai')
const service = require('../../service/simuladorService')
const sinon = require('sinon');
const simuladorRepository = require('../../repositories/simulador');

describe('Simulador Service:', () => {
    
    context('Obter Tarifa para Origem 11 e Destino 17', () => {
        it('Deve retornar o valor da tarifa para origem/destino', async () => {
            const origem = 11;
            const destino = 17

            const esperado = { origem: destino, destino: destino, tarifa: 1.5 };
            sinon.stub(simuladorRepository, 'obterTarifaOrigemDestino').resolves(esperado);

            const atual = await service.obterTarifaOrigemDestino(origem, destino);

            expect(atual).to.equal(esperado);
        })
    })

    context('Obter Tarifas', () => {
        it('Deve todas as Tarifas', async () => {
            const esperado = {
                data: [
                    { origem: 11, destino: 17, tarifa: 1.5 },
                    { origem: 17, destino: 21, tarifa: 1.9 }
                ]
            };

            sinon.stub(simuladorRepository, 'obterTarifas').resolves(esperado);

            const atual = await service.obterTarifas();

            expect(atual).deep.to.equal(esperado.data);
        })
    })

    context('Obter Planos', () => {
        it('Deve todas os Planos', async () => {
            const esperado = { data: [{ plano: "Fale Mais 35", franquia: 35 }] }

            sinon.stub(simuladorRepository, 'obterPlanos').resolves(esperado);

            const atual = await service.obterPlanos();

            expect(atual).deep.to.equal(esperado.data);
        })
    })

    context('Simular plano com Fale Mais', () => {
        it('Deve calcular o valor da ligacao com plano', async () => {
            const franquia = 60;
            const totalMinutos = 90;
            const valorTarifa = 1.6

            const atual = await service.simularComFaleMais(franquia, totalMinutos, valorTarifa);

            const esperado = 52.8;
            expect(atual).deep.to.equal(esperado);
        })
    })

    context('Simular plano sem Fale Mais', () => {
        it('Deve calcular o valor da ligacao sem o plano', async () => {
            const totalMinutos = 90;
            const valorTarifa = 1.6

            const atual = await service.simularSemFaleMais(totalMinutos, valorTarifa);

            const esperado = 144;
            expect(atual).deep.to.equal(esperado);
        })
    })
})


