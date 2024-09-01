import { createContext, useContext, useState } from 'react';

const UpdateContext = createContext();

function UpdateContactProvider({ children }) {
   const [name, setName] = useState('');
   console.log(name);

   return (
      <UpdateContext.Provider value={{ name, setName }}>
         {children}
      </UpdateContext.Provider>
   );
}

export const useUpdateData = () => useContext(UpdateContext);
export default UpdateContactProvider;
