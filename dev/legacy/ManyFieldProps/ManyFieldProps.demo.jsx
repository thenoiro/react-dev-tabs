import { useState } from 'react';
import { Field, Fieldset } from 'react-dev-tabs';

const options = new Array(20).fill(null).map((v, index) => `Field Option ${index + 1}`);

const Demo = () => {
  const [children, setChildren] = useState();

  return (
    <div>
      <Fieldset>
        <Field
          legend="children"
          value={children}
          onChange={setChildren}
          options={[undefined, ...options]}
        />
      </Fieldset>
    </div>
  );
};

export default Demo;
