import { Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import UpdateContact from './pages/UpdateContact';
import AddContact from './pages/AddContact';
import ContactsProvider from './context/Contacts.jsx';
import UpdateContactProvider from './context/UpdateContext.jsx';

function App() {
   return (
      <>
         <ContactsProvider>
            <UpdateContactProvider>
               <Routes>
                  <Route index element={<Index />} />
                  <Route path="/contact/:id" element={<UpdateContact />} />
                  <Route path="/add-contact" element={<AddContact />} />
               </Routes>
            </UpdateContactProvider>
         </ContactsProvider>
      </>
   );
}

export default App;
