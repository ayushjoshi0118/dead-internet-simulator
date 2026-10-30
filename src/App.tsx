import { AppProvider } from './context/AppContext';
import { Browser } from './components/Browser';
import './styles/main.css';
import './styles/sites.css';
import './styles/browser.css';

export default function App() {
  return (
    <AppProvider>
      <div className="app-root">
        <Browser />
      </div>
    </AppProvider>
  );
}
