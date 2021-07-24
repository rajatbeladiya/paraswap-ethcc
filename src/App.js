import { ToastContainer } from 'react-toastify';

import Routes from './Routes';
import './assets/styles/app.scss';

function App() {
  return (
    <div className="App">
      <ToastContainer id="forToast" />
      <Routes />
    </div>
  );
}

export default App;
