const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');
const should = chai.should();
chai.use(chaiHttp);

describe('Simulador Controller:', () => {

  context('GET /simulador/origem/11/destino/17/franquia/60/minutos/80', () => {
    it('Deve retornar o valor a pagar por 80 minutos pelo fale-mais 60', done => {
      chai
        .request(server)
        .get('/simulador/origem/11/destino/17/franquia/60/minutos/80')
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.have
            .property('valorComPlano')
            .and.to.be.a('number')
            .and.to.be.above(0);

          res.body.should.have
            .property('valorSemPlano')
            .and.to.be.a('number')
            .and.to.be.above(0);
          done();
        });
    });
  });

  context('GET /simulador/', () => {
    it('Deve retornar as tarifas e os planos disponiveis', done => {
      chai
        .request(server)
        .get('/simulador/')
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.have.property('tarifas').and.to.be.a('array');
          res.body.should.have.property('planos').and.to.be.a('array');

          res.body.tarifas[0].should.have.own
            .property('origem')
            .and.to.be.a('number')
            .and.to.be.above(0);

          res.body.tarifas[0].should.have.own
            .property('destino')
            .and.to.be.a('number')
            .and.to.be.above(0);

          res.body.tarifas[0].should.have.own
            .property('valor')
            .and.to.be.a('number')
            .and.to.be.above(0);

          res.body.planos[1].should.have.own
            .property('plano')
            .and.to.be.a('string')
            .and.to.not.be.empty;

          res.body.planos[1].should.have.own
            .property('franquia')
            .and.to.be.a('number')
            .and.to.be.above(0);
          done();
        });
    });
  });
});
