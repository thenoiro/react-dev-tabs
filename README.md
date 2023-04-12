```jsx
import DevTabs from 'react-dev-tabs';

const App = () => {
  return (
    <div>
      <DevTabs
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
            path: 'assets/icons', // will be used to consturct import string on asset click
            module: () => import('assets/icons'),
          },
        ]}
      >
    </div>
  );
};
```
