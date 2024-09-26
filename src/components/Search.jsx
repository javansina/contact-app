/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { LiaSearchSolid } from 'react-icons/lia';

import { useContacts } from '../context/Contacts';
import { FaXmark } from 'react-icons/fa6';

function Search({ setSearchedItems, setShowMessage, setSearchedItemsStyles }) {
   const { state } = useContacts();
   const [searchedValue, setSearchedValue] = useState('');
   const [searchedItemLength, setSearchedItemLength] = useState(-1);
   const [focusOnSearch, setFocusOnSearch] = useState(false);

   useEffect(() => {
      const searchedItem = [];
      setSearchedItemsStyles('');
      if (searchedValue.includes('@')) {
         searchedItem.push(
            ...state.filter((i) =>
               searchedValue === '' ? true : i.email.includes(searchedValue),
            ),
         );
         searchedValue.length && setSearchedItemsStyles('EMAIL');
      } else {
         searchedItem.push(
            ...state.filter((i) =>
               searchedValue === '' ? true : i.name.includes(searchedValue),
            ),
         );
         searchedValue.length && setSearchedItemsStyles('NAME');
      }

      setSearchedItemLength(searchedItem.length);
      setShowMessage('');
      if (state) {
         if (!searchedItem.length) {
            setSearchedItems([true, []]);
         } else {
            setSearchedItems([false, searchedItem]);
         }
      }
   }, [searchedValue, searchedItemLength, setSearchedItems, state]);

   return (
      <>
         <div className="relative">
            <span
               className="absolute right-2.5 top-4.5"
               onClick={() => {
                  if (focusOnSearch) {
                     setSearchedValue('');
                     setFocusOnSearch(false);
                  }
               }}
            >
               {focusOnSearch ? (
                  <FaXmark size={20} color="#61545a" />
               ) : (
                  <LiaSearchSolid size={20} color="#866372" />
               )}
            </span>
            <input
               placeholder="جستوجو کنید ( نام یا ایمیل با @) ..."
               className="m mt-1 w-96 rounded-lg bg-[#E3B9CC] pb-2 pl-3 pr-10 pt-2.5 text-lg text-[#c07d9b] outline-white/20 maxLg:w-72"
               onChange={(e) => {
                  setSearchedValue(e.target.value);
               }}
               onFocus={() => setFocusOnSearch(true)}
               value={searchedValue}
               type="text"
            />
         </div>
      </>
   );
}

export default Search;
