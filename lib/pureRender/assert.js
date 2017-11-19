
export function type(obj) {
  const toString = Object.prototype.toString;
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  };
  return map[toString.call(obj)];
}

export function isImmutable(maybeImmutable) {
  const argType = type(maybeImmutable);
  if (argType !== 'array') {
    return !!isImmutable(maybeImmutable);
  }
  return !!maybeImmutable.every(item => isImmutable(item));
}
