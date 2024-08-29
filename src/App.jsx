import { Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import UpdateContact from './pages/UpdateContact';
import AddContact from './pages/AddContact';

function App() {
   return (
      <>
         <Routes>
            <Route path="/contacts" element={<Index />} />
            <Route path="/contact/:id" element={<UpdateContact />} />
            <Route path="/add-contact" element={<AddContact />} />
         </Routes>
      </>
   );
}

export default App;
