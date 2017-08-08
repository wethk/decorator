const DEFAULT_TIMEOUT = 300;
const throttleArr = {};

const handleDescriptor = (target, key, descriptor, wait = DEFAULT_TIMEOUT) => {
  const fn = descriptor.value;
  return {
    ...descriptor,
    value() {
      const now = Date.now();
      let judgeLog = false;
      judgeLog = !!(!throttleArr[key] || wait <= (now - throttleArr[key].previous));
      if (judgeLog) {
        throttleArr[key] = throttleArr[key] ? throttleArr[key] : {};
        throttleArr[key].previous = now;
        setTimeout(() => {
          const throttleFn = fn.apply(this, arguments);
          return throttleFn;
        }, 0);
      }
    }
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

function throttle(...arg) {
  return decorate(handleDescriptor, arg);
}
export default throttle;