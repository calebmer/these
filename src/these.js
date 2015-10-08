const _ignoreProperties1 = ['length', 'name', 'arguments', 'caller', 'prototype'];
const _ignoreProperties2 = ['constructor'];

function these(...constructors) {

  let combined = class These {
    constructor(...args) {

      for (let constructor of constructors) {
        let result = new constructor(...args);
        for (let property in result) {
          if (result.hasOwnProperty(property)) {
            this[property] = result[property];
          }
        }
      }
    }
  };

  // FIXME: in a perfect universe, shouldn't need `_ignoreProperties*`
  for (let constructor of constructors) {
    for (let property of Object.getOwnPropertyNames(constructor)) {
      if (_ignoreProperties1.indexOf(property) !== -1) { continue; }
      combined[property] = constructor[property];
    }
    for (let property of Object.getOwnPropertyNames(constructor.prototype)) {
      if (_ignoreProperties2.indexOf(property) !== -1) { continue; }
      combined.prototype[property] = constructor.prototype[property];
    }
  }

  combined.prototype.constructors = constructors;

  return combined;
}

export default these;
