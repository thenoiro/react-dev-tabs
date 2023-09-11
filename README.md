### In development! (alpha)
---

**React-Dev-Tabs** is a small and lightweight library, that helps organize developers UI library, make components demos, and play with their properties. Also it allows to create assets (images) library.

# Motivation
Common situation - you are open ```components``` folder, and see something like this:
```
components
|- ...
|- Dropzone
|- DropzoneField
|- DropArea
|- FileInput
|- ...
```
What are these components? How do they look? What's the difference between some of them?
Another case is adding an image from a design, when you are not sure whether this image has already been used in the project or not.

In both cases **it would be nice to have a place with all the components demos, or a list of all the images used in a project**.

# Step-by-step

## DevTabs

First of all you need to add DevTabs somewhere in your project:

```jsx
import DevTabs from 'react-dev-tabs';

// Assuming this is your application root component
const App = () => (
  <div>
    {/* Other components here */}

    <DevTabs />
  </div>
);
```
Now you need to press and hold both Shifts on your keyboard for 500ms to show React-Dev-Tabs overlap. At this moment it will show "No tabs provided".

**React-Dev-Tabs** designed to exclude its content from main bundle. By default it will show up and load its content with ```React.Suspense``` only if ```process.env.NODE_ENV === 'development'```.

You can pass your own condition (boolean) with ```visible``` property, or simply render ```<DevTabs />``` by condition.


## Adding components demos

Each component demo is a usual React component. It is up to you how it will look like. But to add all of your demos you have to use **barrel exports pattern**. That means you have some folder with ```index.js``` inside of it with all your demos re-exported. E.g.:

```js
// [src/demo/index.js]
export { Button } from './Button';
export { Tabs } from './Tabs';
// or
export { default as Card } from './Card';
export { default as Avatar } from './Avatar';
```

Using with **DevTabs** component:

```jsx
<DevTabs
  tabs={[
    {
      type: 'components',
      label: 'Basic Components',
      modules: () => import('./demo'),
    },
  ]}
/>
```

Using dynamic import allows you to exclude your demo components from the main package. **Don't accidentally import them somewhere else**.

You can have more tabs of ```components``` type.

## Adding assets (images)

It is almost the same as for components, and yes, you still need to use **barrel exports pattern**. E.g.:

```js
// [src/assets/index.js]

export { default as logo } from './logo.png';
export { default as bg_decoration } from './bg-decoration.gif';

export * from './icons';
export * from './examples';
```

Adding to **DevTabs** component:

```jsx
<DevTabs
  tabs={[
    {
      type: 'assets',
      label: 'Images',
      size: 150 // optional, 300 by default
      modules: () => import('./images'),
    },
  ]}
/>
```

## Writing demo component

As mentioned above, demo component is usual React component. But **React-Dev-Tabs** also has several additional tools that will help expand the capabilities of the demo component.

### Fieldset, Field

```<Fieldset />``` component gives an ability to play with component properties:

```jsx
// [src/demo/Button/index.jsx]
import { useState } from 'react';
import { Fieldset, Field } from 'react-dev-tabs';
import Button from 'components/Button';

export default () => {
  const [color, setColor] = useState();
  const [size, setSize] = useState();
  const [disabled, setDisabled] = useState();

  return (
    <div>
      <Fieldset>
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
        />
        <Field
          legend="disabled"
          value={disabled}
          onChange={setDisabled}
          options={[undefined, true, false]}
        />
      </Fieldset>

      <div>
        <Button color={color} size={size} disabled={disabled}>
          Button Demo
        </Button>
      </div>
    </div>
  );
};
```

```<Field />``` component also available as ```<Fieldset.Field />```.

### Code

Creates code example block. Assepts a string as a children. It will do its best to properly format the code offsets.

```jsx
// [src/demo/Button/index.jsx]
import { useState } from 'react';
import { Fieldset, Field, Code } from 'react-dev-tabs';
import Button from 'components/Button';

export default () => {
  const [color, setColor] = useState();
  const [size, setSize] = useState();
  const [disabled, setDisabled] = useState();

  return (
    <div>
      <Fieldset>
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
        />
        <Field
          legend="disabled"
          value={disabled}
          onChange={setDisabled}
          options={[undefined, true, false]}
        />
      </Fieldset>

      <Code>
        {`
          <Button
            color={${color}}
            size={${size}}
            disabled={${disabled}}
          >
            Button Demo
          </Button>
        `}
      </Code>

      <div>
        <Button color={color} size={size} disabled={disabled}>
          Button Demo
        </Button>
      </div>
    </div>
  );
};
```
