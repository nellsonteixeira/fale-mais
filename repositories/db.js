const loki = require("lokijs");
const db = new loki("./faleMais.json");

exports.loadCollection = collectionName => {
  return new Promise(resolve => {
    db.loadDatabase({}, () => {
      collectionName = db.getCollection(collectionName);
      if (!collectionName) {
        collectionName = db.addCollection(collectionName);
      }
      resolve(collectionName);
    });
  });
};
