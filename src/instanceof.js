function instanceOf(object, constructor) {

  if (this != null && constructor != null) {
    constructor = object;
    object = this;
  }

  if (typeof object !== 'object') {
    throw new TypeError('Must compare an object');
  }

  if (typeof constructor !== 'function') {
    throw new TypeError('Must compare an object to a function');
  }

  if (object.constructors) {
    for (let superConstructor of object.constructors) {
      if (_functionInstanceOf(constructor, superConstructor)) {
        return true;
      }
    }
  }

  return object instanceof constructor;
}

export default instanceOf;

function _functionInstanceOf(func, funcCompare) {

  while (func != null) {
    if (func === funcCompare) {
      return true;
    }
    func = Object.getPrototypeOf(func);
  }
  return false;
}
