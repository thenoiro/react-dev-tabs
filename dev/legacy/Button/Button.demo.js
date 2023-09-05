import { useState } from 'react';
import { Field, Fieldset } from 'react-dev-tabs';

import Button from './Button';

const Demo = () => {
  const [variant, setVariant] = useState();
  const [color, setColor] = useState();
  const [size, setSize] = useState();

  return (
    <div>
      <Fieldset>
        <Field
          legend="variant"
          value={variant}
          onChange={setVariant}
          options={[undefined, 'text', 'outlined', 'contained']}
          default="outlined"
        />
        <Field
          legend="color"
          value={color}
          onChange={setColor}
          options={[undefined, 'primary', 'secondary']}
          default="primary"
        />
        <Field
          legend="size"
          value={size}
          onChange={setSize}
          options={[undefined, 'small', 'medium', 'large']}
          default="medium"
        />
      </Fieldset>

      <Button
        size={size}
        color={color}
        variant={variant}
      >
        Test Button
      </Button>
    </div>
  );
};

export default Demo;
