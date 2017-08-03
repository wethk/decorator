export default function debounce(debounceDelay) {
  return (target, key, descriptor) => {
    const fn = descriptor.value;
    let last = 0;
    let current = 0;
    // 意思是要返回描述对象
    return {
      configurable: true,
      get: function get() {
        return function debouncedFunction(...args) {
          current = +new Date();
          if (current - last < debounceDelay) return;
          fn.apply(this, args);
          last = current;
        };
      },
    };
  };
}