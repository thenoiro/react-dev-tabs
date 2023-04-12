import { useCallback } from 'react';

import { classname as cx } from 'lib/utils';
import Shell from 'lib/components/Shell';

import './fieldset.css';

const Fieldset = (props) => {
  const { children } = props;

  return (
    <Shell display="flex" flexWrap="wrap" mb={2} gap="8px">
      {children}
    </Shell>
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
    <Shell
      {...rest}
      display="flex"
      component="fieldset"
      className="dev-fieldset"
      flexDirection={grid ? 'row' : 'column'}
      borderRadius="4px"
      flexWrap={grid ? 'wrap' : undefined}
    >
      <Shell
        display="flex"
        alignItems="center"
        component="legend"
        className="dev-fieldset-legend"
      >
        {legend}
      </Shell>

      {Array.isArray(options) && options.map((opt) => (
        <Shell
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
          <Shell
            mt={0}
            type="radio"
            component="input"
            value={String(opt)}
            checked={opt === value}
            onChange={handleChange(opt)}
            className="dev-fieldset-checkbox"
          />
          <Shell
            ml={1}
            fontSize={13}
            component="span"
            fontFamily="monospace"
            fontWeight={String(def) === String(opt) ? 800 : 400}
            className="dev-fieldset-label"
          >
            {String(opt)}
          </Shell>
        </Shell>
      ))}
    </Shell>
  );
};

Fieldset.Field = Field;

export default Fieldset;
