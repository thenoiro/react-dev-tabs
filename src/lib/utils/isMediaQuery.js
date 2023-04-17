const isMediaQuery = (query) => {
  return !!window.matchMedia(query).matches;
};

export default isMediaQuery;
