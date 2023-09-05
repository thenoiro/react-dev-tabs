import { useState } from 'react';
import { Field, Fieldset } from 'react-dev-tabs';

import TooManyFields from './TooManyFields';

const Demo = () => {
  const [children, setChildren] = useState('Bohdan Chernovol');
  const [size, setSize] = useState();
  const [radius, setRadius] = useState();
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [color, setColor] = useState();
  const [bgcolor, setBgcolor] = useState();
  const [padding, setPadding] = useState();
  const [title, setTitle] = useState();
  const [invert, setInvert] = useState();
  const [rotate, setRotate] = useState();
  const [flipX, setFlipX] = useState();
  const [flipY, setFlipY] = useState();

  return (
    <div>
      <Fieldset>
        <Field
          legend="children"
          value={children}
          onChange={setChildren}
          options={[undefined, 'Bohdan Chernovol', 'Bohdan', 'BC', 'b', 'The Noiro']}
        />
        <Field
          legend="size"
          value={size}
          onChange={setSize}
          options={[undefined, 10, 15, 20, 30, 50]}
          default="15"
        />
        <Field
          legend="radius"
          value={radius}
          onChange={setRadius}
          options={[undefined, '50%', '8px', 0, '25%']}
          default="50%"
        />
        <Field
          legend="width"
          value={width}
          onChange={setWidth}
          options={[undefined, '100px', '100%', '50px']}
        />
        <Field
          legend="height"
          value={height}
          onChange={setHeight}
          options={[undefined, '100px', '100%', '50px']}
        />
        <Field
          legend="color"
          value={color}
          onChange={setColor}
          options={[undefined, 'black', 'blue', 'green']}
          default="black"
        />
        <Field
          legend="bgcolor"
          value={bgcolor}
          onChange={setBgcolor}
          options={[undefined, 'white', 'yellow', 'silver']}
          default="white"
        />
        <Field
          legend="padding"
          value={padding}
          onChange={setPadding}
          options={[undefined, 5, 10, 15]}
        />
        <Field
          legend="title"
          value={title}
          onChange={setTitle}
          options={[undefined, 'Chernovol Bohdan']}
        />
        <Field
          legend="invert"
          value={invert}
          onChange={setInvert}
          options={[undefined, true, false]}
        />
        <Field
          legend="rotate"
          value={rotate}
          onChange={setRotate}
          options={[undefined, 90, 180, 270, 37]}
        />
        <Field
          legend="flipX"
          value={flipX}
          onChange={setFlipX}
          options={[undefined, true, false]}
        />
        <Field
          legend="flipY"
          value={flipY}
          onChange={setFlipY}
          options={[undefined, true, false]}
        />
      </Fieldset>

      <div style={{ marginTop: 20 }}>
        <TooManyFields
          rotate={rotate}
          flipX={flipX}
          flipY={flipY}
          invert={invert}
          title={title}
          padding={padding}
          size={size}
          radius={radius}
          width={width}
          height={height}
          color={color}
          bgcolor={bgcolor}
        >
          {children}
        </TooManyFields>
      </div>
    </div>
  );
};

export default Demo;
