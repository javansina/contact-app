import { createContext, useContext, useReducer } from 'react';

const ContactsContext = createContext();
const initialState = [
   {
      id: 1,
      name: 'sina',
      email: 'sinajavan5@gmail.com',
      job: 'programmer',
      phoneNumber: '09368528558',
   },
];

const reducer = (state, action) => {
   console.log(action);
   switch (action.type) {
      case 'ADD-CONTACT':
         return [...state, action.payload];
      case 'UPDATE-CONTACT':
         const updatedContact = state.filter((i) => i.id !== action.payload.id);
         console.log(updatedContact);
         return [...updatedContact, action.payload];
   }
};

function Contacts({ children }) {
   const [state, dispatch] = useReducer(reducer, initialState);
   console.log(state);

   return (
      <ContactsContext.Provider value={{ state, dispatch }}>
         {children}
      </ContactsContext.Provider>
   );
}

export const useContacts = () => useContext(ContactsContext);

export default Contacts;
