In development (alpha).

Simple tool to create components/assets developers documentation for your react application. It appears only in development environment, and uses Suspense and react lazy loading to render assets and components demos. Your production build will contain all that code in a separate chunks, that will never appears.

## ```<DevTabs />```
Most simple demo of useage:

```jsx
import DevTabs from 'react-dev-tabs';

const App = () => {
  return (
    <div>
      <DevTabs
        zIndex={1200} // optional, 1000 by default
        tabs={[
          {
            type: 'components',
            label: 'Components List',
            module: () => import('components'),
          },
          {
            type: 'assets',
            label: 'Images',
            path: 'assets/images',
            module: () => import('assets/images'),
          },
          {
            size: 50, // asset size (200 by default)
            type: 'assets',
            label: 'Icons',

            // optional, will be used to consturct import
            // string on asset click
            path: 'assets/icons',
            module: () => import('assets/icons'),
          },
        ]}
      >
    </div>
  );
};
```

To show DevTabs press both shifts.

At this moment usefull only if you following re-export pattern (all your components or assets located in a particular directory, and re-exported from index file). E.g. your assets folder have to look like:

```js
export { default as main_background } from './main_background.webp';
export { default as landing_decoration } from './landing_decoration.webp';
// etc
```

In case of components:

```jsx
export { default as SearchField } from './SearchField';
export { default as ProductCard } from './ProductCard';
export * from './ProductCard';
// etc, only instances that started with a uppercase letter
// will be used in the components tab
```

In case of assets tab your images will be rendered directly in the tab.

## ```<Component.Demo />```

In case of components empty containers will be rendered for them by default. You still need to create a **Demo** for each component manually.

Let sey we have ```<Button />``` component:

```jsx
// components/Button/Button.jsx
const Button = (props) => {
  const { children, color, size, icon, onClick } = props;

  return (
    <button
      onClick={onClick}
      style={{
        color: 'white',
        backgroundColor: color,
        height: size,
        padding: '4px 16px',
        borderRadius: '4px',
      }}
    >
      {children}
      {icon}
    </button>
  );
};

export default Button;
```

```jsx
// components/Button/index.js
export { default } from './Button';
```

To create a Demo that will appear in your DevTabs you need to create Demo component:
```jsx
// components/Button/Button.demo.jsx
import Button from './Button.jsx';

const Demo = () => {
  return (
    <div>
      <p>This component represents project main button!</p>

      <div>
        <Button>Project Button</Button>
      </div>
    </div>
  );
};

export default Demo;
```

Now you need to add this demo component as a subcomponent to a Button component:
```jsx
// components/Button/Button.jsx
import { lazy } from 'react';

const Button = (props) => {
  const { children, color = 'black', size, icon, onClick } = props;

  return (
    <button
      onClick={onClick}
      style={{
        color: 'white',
        backgroundColor: color,
        height: size,
        padding: '4px 16px',
        borderRadius: '4px',
      }}
    >
      {children}
      {icon}
    </button>
  );
};
// This condition allows exclude demo for production build
if (process.env.NODE_ENV === 'development') {
  Button.Demo = lazy(() => import('./Button.demo.jsx'));
}

export default Button;
```

Thats it. Now (after reloading once) you will see your component demo in DevTabs.

## ```<Fieldset />```
To make your demo more interactive and helpful, you can use this helper component:

```jsx
// components/Button/Button.demo.jsx
import { useState } from 'react';
import { Fieldset, Field } from 'react-dev-tabs';
import Button from './Button.jsx';

const Demo = () => {
  const [size, setSize] = useState();
  const [color, setColor] = useState();
  const [children, setChildren] = useState('Project Button');

  return (
    <div>
      <p>This component represents project main button!</p>

      <Fieldset>
         {/* Field is the same as Fieldset.Field */}
        <Field
          legend="size"
          value={size}
          onChange={setSize}
          options={[undefined, 10, 20, 40, 50]}
        />
        <Field
          legend="children"
          value={children}
          onChange={setChildren}
          options={['Project Button', 'Project Button with a long label']}
        />
        <Field
          legend="color"
          value={color}
          onChange={setColor}
          options={[undefined, 'red', 'blue', 'white', 'black']}
          default="black"
        />
      </Fieldset>

      <div>
        <Button color={color} size={size}>
          {children}
        </Button>
      </div>
    </div>
  );
};

export default Demo;
```

Now you can play with your properties.

## ```<Code />```

This helper allows make a code example. It sensetive to it's content whitespaces, and will try its best to display code example in your formatting.

```jsx
// components/Button/Button.demo.jsx
import { useState } from 'react';
import { Fieldset, Field, Code } from 'react-dev-tabs';
import Button from './Button.jsx';

const Demo = () => {
  const [size, setSize] = useState();
  const [color, setColor] = useState();
  const [children, setChildren] = useState('Project Button');

  return (
    <div>
      <p>This component represents project main button!</p>

      <Code>
        {`
          <Button color={${color}} size={${size}}>
            ${children}
          </Button>
        `}
      </Code>

      <Fieldset>
        <Field
          legend="size"
          value={size}
          onChange={setSize}
          options={[undefined, 10, 20, 40, 50]}
        />
        <Field
          legend="children"
          value={children}
          onChange={setChildren}
          options={['Project Button', 'Project Button with a long label']}
        />
        <Field
          legend="color"
          value={color}
          onChange={setColor}
          options={[undefined, 'red', 'blue', 'white', 'black']}
          default="black"
        />
      </Fieldset>

      <div>
        <Button color={color} size={size}>
          {children}
        </Button>
      </div>
    </div>
  );
};

export default Demo;
```