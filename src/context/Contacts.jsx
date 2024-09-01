import { createContext, useContext, useEffect, useReducer } from 'react';

const ContactsContext = createContext();
const initialState = JSON.parse(localStorage.getItem('contacts')) || [];

const reducer = (state, action) => {

   switch (action.type) {
      case 'ADD-CONTACT':
         return [...state, action.payload];

      case 'UPDATE-CONTACT':
         const updatedContact = [];
         for (let i of state) {
            i.id !== action.payload.id
               ? updatedContact.push(i)
               : updatedContact.push(action.payload);
         }
         return [...updatedContact];

      case 'DELETE-ITEM':
         const deleteItemResult = state.filter((i) => i.id !== action.payload);
         return [...deleteItemResult];

      case 'GROUP-DELETE':
         const groupDeleteResult = state.filter(
            (i) => !action.payload.includes(i.id)
         );
         return [...groupDeleteResult];

      default:
         return state;
   }
};

function ContactsProvider({ children }) {
   const [state, dispatch] = useReducer(reducer, initialState);

   useEffect(() => {
      localStorage.setItem('contacts', JSON.stringify(state));
   }, [state]);

   return (
      <ContactsContext.Provider value={{ state, dispatch }}>
         {children}
      </ContactsContext.Provider>
   );
}

export const useContacts = () => useContext(ContactsContext);

export default ContactsProvider;
