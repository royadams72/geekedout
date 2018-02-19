//Returns false if empty

export function isEmpty(obj:{}){
for (var x in obj) { return false; }
   return true;
}


export function isObject(o, strict = true) {
  if (o === null || o === undefined) {
    return false;
  }
  const instanceOfObject = o instanceof Object;
  const typeOfObject = typeof o === 'object';
  const constructorUndefined = o.constructor === undefined;
  const constructorObject = o.constructor === Object;
  const typeOfConstructorObject = typeof o.constructor === 'function';
  let r;
  if (strict === true) {
    r = (instanceOfObject || typeOfObject) && (constructorUndefined || constructorObject);
  } else {
    r = (constructorUndefined || typeOfConstructorObject);
  }
  return r;
};
