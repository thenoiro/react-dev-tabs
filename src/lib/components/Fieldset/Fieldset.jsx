import { useCallback } from 'react';

import { classname as cx } from 'lib/utils';
import Box from 'lib/components/Box';

import './fieldset.css';

const Fieldset = (props) => {
  const { children } = props;

  return (
    <Box display="flex" flexWrap="wrap" mb={2} gap="8px">
      {children}
    </Box>
  );
};

const Field = (props) => {
  const {
    grid,
    options,
    legend,
    value,
    onChange,
    hint,
    default: def,
    ...rest
  } = props;

  const handleChange = useCallback((opt) => () => {
    typeof onChange === 'function' && onChange(opt);
  }, [onChange]);

  return (
    <Box
      {...rest}
      display="flex"
      component="fieldset"
      className="dev-fieldset"
      flexDirection={grid ? 'row' : 'column'}
      borderRadius="4px"
      flexWrap={grid ? 'wrap' : undefined}
    >
      <Box
        display="flex"
        alignItems="center"
        component="legend"
        className="dev-fieldset-legend"
      >
        {legend}
      </Box>

      {Array.isArray(options) && options.map((opt) => (
        <Box
          mr={2}
          key={String(opt)}
          display="inline-flex"
          alignItems="center"
          component="label"
          flexBasis={grid}
          className={cx(
            'dev-fieldset-option',
            opt === value && 'dev-fieldset-option-current',
          )}
        >
          <Box
            mt={0}
            type="radio"
            component="input"
            value={String(opt)}
            checked={opt === value}
            onChange={handleChange(opt)}
            className="dev-fieldset-checkbox"
          />
          <Box
            ml={1}
            fontSize={13}
            component="span"
            fontFamily="monospace"
            fontWeight={String(def) === String(opt) ? 800 : 400}
            className="dev-fieldset-label"
          >
            {String(opt)}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

Fieldset.Field = Field;

export default Fieldset;
