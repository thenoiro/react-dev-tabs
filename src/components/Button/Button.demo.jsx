import { useState } from 'react';
import { Fieldset } from 'lib';

import Button from './Button';
import { Code } from 'lib/components';

const { Field } = Fieldset;

const Demo = () => {
  const [size, setSize] = useState();
  console.log('>>> This should not be consolled until Demo displaying...');

  return (
    <div>
      <Fieldset>
        <Field
          legend="size"
          value={size}
          onChange={setSize}
          options={[undefined, 'small', 'medium', 'large']}
        />
      </Fieldset>

      <Code my={2}>
        {`
          <Button size={${size}}>
            Demo
          </Button>
        `}
      </Code>

      <Button size={size}>
        Demo
      </Button>
    </div>
  );
};

export default Demo;
