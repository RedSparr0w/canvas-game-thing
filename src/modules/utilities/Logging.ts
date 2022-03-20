/* eslint-disable no-console */
export const DateTime = (date = new Date()) => {
  const padNum = (num: number) => num.toString().padStart(2, '0');
  const dateStr = [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(padNum).join('-');
  const timeStr = [date.getHours(), date.getMinutes(), date.getSeconds()].map(padNum).join(':');
  return `${dateStr} ${timeStr}`;
};

export const Log = (...args) => {
  console.log(`\x1b[1m\x1b[37m[log][${DateTime()}]\x1b[0m`, ...args);
};

export const LogInfo = (...args) => {
  console.info(`\x1b[1m\x1b[36m[info][${DateTime()}]\x1b[0m`, ...args);
};

export const LogDebug = (...args) => {
  console.debug(`\x1b[1m\x1b[34m[debug][${DateTime()}]\x1b[0m`, ...args);
};

export const LogWarn = (...args) => {
  console.warn(`\x1b[1m\x1b[33m[warning][${DateTime()}]\x1b[0m`, ...args);
};

const ErrorObject = (error) => {
  const errObj = [];
  if (error.message) errObj.push(`\n\tMessage: ${error.message}`);
  if (error.errno) errObj.push(`\n\tError No: ${error.errno}`);
  if (error.code) errObj.push(`\n\tCode: ${error.code}`);
  return errObj;
};

export const LogError = (...args) => {
  // eslint-disable-next-line no-param-reassign
  if (typeof args[args.length - 1] === 'object') args = [...args, ...ErrorObject(args.pop())];
  console.error(`\x1b[1m\x1b[31m[error][${DateTime()}]\x1b[0m`, ...args);
};
