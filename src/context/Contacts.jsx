import { createContext, useContext, useEffect, useReducer } from 'react';

const ContactsContext = createContext();
const initialState = JSON.parse(localStorage.getItem('contacts')) || [
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
      case 'DELETE-ITEM':
         const deleteItemResult = state.filter((i) => i.id !== action.payload);
         return [...deleteItemResult];
      case 'GROUP-DELETE':
         const groupDeleteResult = state.filter(
            (i) => !action.payload.includes(i.id)
         );
         console.log(groupDeleteResult);
         return [...groupDeleteResult];
      default:
         return state;
   }
};

function ContactsProvider({ children }) {
   const [state, dispatch] = useReducer(reducer, initialState);
   console.log(state);
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
