/* eslint-disable react/prop-types */
import axios from 'axios';
import { createContext, useContext, useEffect, useReducer } from 'react';

const ContactsContext = createContext();
const initialState = [];

const reducer = (state, action) => {
   switch (action.type) {
      case 'SET-CONTACTS':
         return [...action.payload];

      default:
         return state;
   }
};

function ContactsProvider({ children }) {
   const [state, dispatch] = useReducer(reducer, initialState);

   useEffect(() => {
      axios.get(`http://localhost:3000/contacts`).then((res) => {
         dispatch({ type: 'SET-CONTACTS', payload: res.data });
      });
   }, []);

   return (
      <ContactsContext.Provider value={{ state, dispatch }}>
         {children}
      </ContactsContext.Provider>
   );
}

export const useContacts = () => useContext(ContactsContext);

export default ContactsProvider;
