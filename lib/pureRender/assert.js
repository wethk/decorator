
const IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
const IS_RECORD_SENTINEL = '@@__IMMUTABLE_RECORD__@@';

function isRecord(maybeRecord) {
  return !!(maybeRecord && maybeRecord[IS_RECORD_SENTINEL]);
}

function isCollection(maybeCollection) {
  return !!(maybeCollection && maybeCollection[IS_ITERABLE_SENTINEL]);
}

function _isImmutable(maybeImmutable) {
  return isCollection(maybeImmutable) || isRecord(maybeImmutable);
}

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
    return !!_isImmutable(maybeImmutable);
  }
  return maybeImmutable.every(item => _isImmutable(item));
}
