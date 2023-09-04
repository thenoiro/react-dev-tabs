import { useCallback, useMemo } from 'react';

import { cx } from 'utils/emotion';
import useCss from 'hooks/useCss.hook';
import Text from 'components/Text';

import { FieldComponentProps } from './FieldComponent.types';

const getStringifiedValue = (v: unknown): string => {
  if (['string', 'number', 'boolean', 'undefined'].includes(typeof v)) {
    return String(v);
  }
  if (v === null) {
    return 'null';
  }
  return JSON.stringify(v);
};

const FieldComponent = <PropType extends unknown>(
  props: FieldComponentProps<PropType>,
) => {
  const {
    legend,
    value,
    onChange,
    options,
    default: defaultValue,
  } = props;

  const def = useMemo(() => {
    return getStringifiedValue(defaultValue);
  }, [defaultValue]);

  const currentValue = useMemo(() => {
    return getStringifiedValue(value);
  }, [value]);

  const rootClass = useCss((theme) => ({
    display: 'inline-flex',
    flexDirection: 'column',
    padding: theme.size(1, 4, 1, 1),
    margin: 0,
    marginRight: theme.size(1),
    marginBottom: theme.size(1),
    border: `1px solid ${theme.palette.accent.secondary.color}`,
    borderRadius: theme.size(0.5),
    gap: theme.size(0.5),
    maxHeight: '351px',
    overflow: 'hidden',
    overflowY: 'auto',
    ...theme.scroll({ color: 'secondary' }),
  }));

  const legendClass = useCss((theme) => ({
    display: 'flex',
    color: theme.palette.accent.secondary.contrast.low,
    backgroundColor: theme.palette.accent.secondary.color,
    padding: theme.size(0.25, 1),
    borderRadius: theme.size(0.5),
  }));

  const labelClass = useCss((theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.size(1),
    cursor: 'pointer',
  }));

  const radioClass = useCss((theme) => ({
    padding: 0,
    margin: 0,
    accentColor: theme.palette.accent.secondary.color,
    cursor: 'pointer',
    width: theme.size(2),
    height: theme.size(2),

    '&:focus-visible': {
      outlineOffset: 0,
      outlineColor: theme.palette.accent.secondary.color,
    },
  }));

  const textClass = useCss(() => ({
    whiteSpace: 'nowrap',
    maxWidth: 300,
  }));

  const defaultRadioClass = useCss(() => ({
    textDecoration: 'underline',
  }));

  const handleChange = useCallback((v: PropType) => () => {
    onChange(v);
  }, [onChange]);

  return (
    <fieldset className={rootClass}>
      <legend className={legendClass}>
        <Text variant="code" size="small" weight="bold">
          {legend}
        </Text>
      </legend>

      {options.map((opt, index) => {
        const v = getStringifiedValue(opt);
        const isDefault = def !== 'undefined' && def === v;

        return (
          <label key={`${v}_${index}`} className={labelClass}>
            <input
              value={v}
              type="radio"
              name={legend}
              className={radioClass}
              checked={currentValue === v}
              onChange={handleChange(opt)}
            />

            <Text
              title={v}
              size="small"
              variant="code"
              className={cx(textClass, isDefault && defaultRadioClass)}
            >
              {v}
            </Text>
          </label>
        );
      })}
    </fieldset>
  );
};

export default FieldComponent;
