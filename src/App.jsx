import { Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import UpdateContact from './pages/UpdateContact';
import AddContact from './pages/AddContact';
import ContactsProvider from './context/Contacts.jsx';

function App() {
   return (
      <>
         <ContactsProvider>
               <Routes>
                  <Route index element={<Index />} />
                  <Route path="/contact/:id" element={<UpdateContact />} />
                  <Route path="/add-contact" element={<AddContact />} />
               </Routes>
         </ContactsProvider>
      </>
   );
}

export default App;
