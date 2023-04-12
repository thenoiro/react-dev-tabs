const classname = (...args) => {
  return args.filter((n) => typeof n === 'string').join(' ');
};

export default classname;
