import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Contacts from './context/Contacts.jsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  //  <React.StrictMode>
      <Contacts>
         <BrowserRouter>
            <App />
         </BrowserRouter>
      </Contacts>
  //  </React.StrictMode>
);
