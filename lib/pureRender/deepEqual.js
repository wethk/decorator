import immutable, { is } from 'immutable';
import deepEqual from 'odash._baseisequal';
import { type, isImmutable } from './assert';

console.log('naturelessTT', 'immutable', immutable);

function normalEqual(objA, objB) {
  const typeA = type(objA);
  const typeB = type(objB);
  return typeA === typeB && deepEqual(objA, objB);
}

function immutableEqual(objA, objB) {
  return is(objA, objB);
}

export default function deepEqual(objA, objB) {
  if (isImmutable([objA,objB])) {
      return immutableEqual(objA, objB);
  }

  return normalEqual(objA, objB);
}
