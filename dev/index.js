import { useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import DevTabs from 'react-dev-tabs';

const App = () => {
  const [testCase, setTestCase] = useState('usual');
  const [zIndex, setZIndex] = useState();

  const tabs = useMemo(() => {
    switch (testCase) {
      case 'usual':
        return [
          {
            type: 'components',
            label: 'Legacy',
            variant: 'inside',
            modules: () => import('./legacy'),
          },
          {
            type: 'assets',
            label: 'Cats Images',
            modules: () => import('./images'),
          },
          {
            type: 'assets',
            label: 'Cats Images (100)',
            modules: () => import('./images'),
            size: 100,
          },
          {
            type: 'assets',
            label: 'Cats Images (500)',
            modules: () => import('./images'),
            size: 500,
          },
          {
            type: 'components',
            label: 'Many Components',
            modules: () => import('./many_components'),
          },
        ];
      case 'multiple-tabs':
      case 'no-tabs':
      default:
        return [];
    }
  }, [testCase]);

  return (
    <div>
      <div>Testing React Dev Tabs</div>

      <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <label>
          <input
            name="test"
            type="radio"
            checked={testCase === 'usual'}
            onChange={() => setTestCase('usual')}
          />

          <strong>Usual Case</strong>
        </label>

        <label>
          <input
            name="test"
            type="radio"
            checked={testCase === 'multiple-tabs'}
            onChange={() => setTestCase('multiple-tabs')}
          />

          <strong>Multiple Tabs Case</strong>
        </label>

        <label>
          <input
            name="test"
            type="radio"
            checked={testCase === 'no-tabs'}
            onChange={() => setTestCase('no-tabs')}
          />

          <strong>No Tabs Case</strong>
        </label>
      </div>

      <div style={{ marginTop: 20 }}>
        <div>Z Index</div>

        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label>
            <input
              name="zIndex"
              type="radio"
              checked={zIndex === undefined}
              onChange={() => setZIndex(undefined)}
            />

            <strong>undefined</strong>
          </label>

          <label>
            <input
              name="zIndex"
              type="radio"
              checked={zIndex === 900}
              onChange={() => setZIndex(900)}
            />

            <strong>900</strong>
          </label>

          <label>
            <input
              name="zIndex"
              type="radio"
              checked={zIndex === 1100}
              onChange={() => setZIndex(1100)}
            />

            <strong>1100</strong>
          </label>
        </div>

        <div style={{ marginTop: 20 }}>
          <div
            style={{
              position: 'absolute',
              zIndex: 950,
              background: 'blue',
              color: 'white',
              width: '400px',
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Z Index indicator (950)
          </div>
        </div>
      </div>

      <DevTabs
        tabs={tabs}
        zIndex={zIndex}
      />
    </div>
  );
};

const container = document.createElement('div');
container.id = 'root';
document.body.appendChild(container);

const root = ReactDOM.createRoot(container);
root.render(<App />);
