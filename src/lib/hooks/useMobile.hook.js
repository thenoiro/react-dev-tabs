import useMediaQuery from 'lib/hooks/useMediaQuery.hook';

const useMobile = (breakpoints) => {
  const mobile = breakpoints?.mobile || '960px';
  const query = `(max-width: ${mobile})`;
  return useMediaQuery(query);
};

export default useMobile;
