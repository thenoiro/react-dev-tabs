import { useState } from 'react';
import { Field, Fieldset } from 'react-dev-tabs';

const Demo = () => {
  const [children, setChildren] = useState();

  return (
    <div>
      <Fieldset>
        <Field
          legend="children"
          value={children}
          onChange={setChildren}
          options={[undefined, 'Long Legend Name of property lorem ipsum dollar swift']}
        />
      </Fieldset>
    </div>
  );
};

export default Demo;
