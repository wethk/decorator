const DEFAULT_TIMEOUT = 300;
const debounceArr = {};
const isRNEnv = false;

function handleDescriptor(target, key, descriptor, wait = DEFAULT_TIMEOUT) {
  isRNEnv = !!arguments[0].render;
  if (isRNEnv) {
    const componentWillUnmount = arguments[0].componentWillUnmount;
    const arg = arguments;
    if (componentWillUnmount) {
      arguments[0].componentWillUnmount = function () {
        for (const obj in debounceArr) {
          clearTimeout(debounceArr[obj]);
        }
        componentWillUnmount.apply(this, arg);
      };
    } else {
      arguments[0].componentWillUnmount = function () {
        for (const obj in debounceArr) {
          clearTimeout(debounceArr[obj]);
        }
      };
    }
  }

  const fn = descriptor.value;
  return {
    ...descriptor,
    value() {
      const timeSetter = debounceArr[key];
      clearTimeout(timeSetter);
      debounceArr[key] = setTimeout(() => {
        delete debounceArr[key];
        console.log('natureless', 'setTimeout', this, arguments);
        fn.apply(this, arguments);
      }, wait);
    },
  };
}

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