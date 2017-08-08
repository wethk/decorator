const DEFAULT_TIMEOUT = 300;
const debounceArr = {};

const handleDescriptor = (target, key, descriptor, wait = DEFAULT_TIMEOUT) => {
  const fn = descriptor.value;
  return {
    ...descriptor,
    value() {
      const timeSetter = debounceArr[key];
      clearTimeout(timeSetter);
      debounceArr[key] = setTimeout(() => {
        delete debounceArr[key];
        fn.apply(this, arguments);
      }, wait);
    },
  };
};

function decorate(handleDescriptor, args) {
  if (args.length === 3) {
    return handleDescriptor(...args);
  }
  return function () {
    return handleDescriptor(...Array.prototype.slice.call(arguments), ...args);
  };
}

function debounce(...arg) {
  return decorate(handleDescriptor, arg);
}
export default debounce;