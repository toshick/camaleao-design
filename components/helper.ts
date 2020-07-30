/**
 * getErrMessage
 */
export const getErrMessage = (errors: string[]): string => {
  let msg = '';
  if (errors && errors.length > 0) {
    msg = errors.join(',');
  }
  return msg;
};

/**
 * debounce
 */
export const debounce = (fn: any, interval: number) => {
  let timer: NodeJS.Timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn();
    }, interval);
  };
};

/**
 * throttle
 */
export const throttle = (fn: any, interval: number) => {
  let lastTime = Date.now() - interval;
  return () => {
    if (lastTime + interval < Date.now()) {
      lastTime = Date.now();
      fn();
    }
  };
};
