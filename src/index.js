import ReactDOM from 'react-dom/client';

import DevTabs from 'lib';

const App = () => {
  return (
    <div>
      <div>Test</div>

      <DevTabs
        tabs={[
          {
            type: 'components',
            label: 'Components',
            modules: () => import('./components'),
          },
        ]}
      />
    </div>
  );
};
const container = document.createElement('div');
document.body.appendChild(container);

const root = ReactDOM.createRoot(container);
root.render(<App />);
