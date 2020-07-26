export const getErrMessage = (errors: string[]): string => {
  let msg = '';
  if (errors && errors.length > 0) {
    msg = errors.join(',');
  }
  return msg;
};
