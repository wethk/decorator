import { is } from 'immutable';
import _deepEqual from 'lodash._baseisequal';
import { type, isImmutable } from './assert';


function normalEqual(objA, objB) {
  const typeA = type(objA);
  const typeB = type(objB);

  return typeA === typeB && _deepEqual(objA, objB);
}

export default function deepEqual(objA, objB) {

  const indexedA = Object.keys(objA);
  const indexedB = Object.keys(objB); 

  const lenA = indexedA.length;
  const lenB = indexedA.length;

  if(lenA !== lenB) return false

  return indexedA.every(key=>{
    const valueA = objA[key]
    const isFunc = type(valueA) === 'function';
    const verifyFunc = isImmutable(valueA) ? is : normalEqual

    return isFunc ? isFunc : verifyFunc(valueA, objB[key])
  })
}
