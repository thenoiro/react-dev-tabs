import ReactDOM from 'react-dom/client';
// import DevTabs from 'react-dev-tabs';

// import { Button } from '@/components';

const App = () => {
  return (
    <div>
      {/* <Button>Button</Button>

      <DevTabs
        tabs={[
          {
            type: 'components',
            label: 'Components',
            modules: () => import('./demo/components'),
          },
          {
            type: 'components',
            label: 'Views',
            modules: () => import('./demo/components'),
          },
          {
            type: 'components',
            label: 'Legacy',
            variant: 'inside',
            modules: () => import('./legacy'),
          },
          {
            type: 'assets',
            label: 'Icons',
            modules: () => import('./assets/icons/color'),
          },
          {
            type: 'assets',
            label: 'Logos',
            modules: () => import('./assets/logos'),
          },
          {
            type: 'assets',
            label: 'Images',
            size: 200,
            modules: () => import('./assets/images'),
          },
        ]}
      /> */}
    </div>
  );
};

const container = document.createElement('div');
container.id = 'root';
document.body.appendChild(container);

const root = ReactDOM.createRoot(container);
root.render(<App />);
