import { useEffect, useState } from 'react';
import { LiaSearchSolid } from 'react-icons/lia';

import { useContacts } from '../context/Contacts';
import { FaXmark } from 'react-icons/fa6';

function Search({ setSearchedItems, setShowMessage, setSearchedItemsStyles }) {
   const { state, dispatch } = useContacts();
   const [searchedValue, setSearchedValue] = useState('');
   const [searchedItemLength, setSearchedItemLength] = useState(-1);
   const [focusOnSearch, setFocusOnSearch] = useState(false);

   useEffect(() => {
      const searchedItem = [];
      setSearchedItemsStyles('');
      if (searchedValue.includes('@')) {
         console.log('email');
         searchedItem.push(
            ...state.filter((i) =>
               searchedValue === '' ? true : i.email.includes(searchedValue)
            )
         );
         searchedValue.length && setSearchedItemsStyles('EMAIL');
      } else {
         searchedItem.push(
            ...state.filter((i) =>
               searchedValue === '' ? true : i.name.includes(searchedValue)
            )
         );
         searchedValue.length && setSearchedItemsStyles('NAME');
      }

      setSearchedItemLength(searchedItem.length);
      setShowMessage('');
      if (state) {
         if (!searchedItem.length) {
            // console.log(!searchedItem.length);

            setSearchedItems([true, []]);
         } else {
            setSearchedItems([false, searchedItem]);
            // console.log("mozzzzzzzzzzzzzzzzzzzzzzzz");
         }
      }
   }, [searchedValue, searchedItemLength, setSearchedItems, state]);

   return (
      <>
         <div className="relative">
            <span
               className="absolute top-4 right-1.5"
               onClick={() => {
                  if (focusOnSearch) {
                     setSearchedValue('');
                     setFocusOnSearch(false);
                  }
               }}
            >
               {focusOnSearch ? (
                  <FaXmark size={23} color="#61545a" />
               ) : (
                  <LiaSearchSolid size={20} color="#866372" />
               )}
            </span>
            <input
               placeholder="جستوجو کنید ( نام یا ایمیل با @) ..."
               className="m w-96 rounded-lg pt-1.5 pl-3 pr-8 pb-2 mt-2 text-lg text-[#D5AABD] bg-[#E3B9CC] outline-myBlue-700"
               onChange={(e) => {
                  setSearchedValue(e.target.value);
               }}
               onFocus={() => setFocusOnSearch(true)}
               // onBlur={() => {
               //    setSearchedValue('');
               // }}
               value={searchedValue}
               type="text"
            />
         </div>
         {/* <button onClick={searchHandler}>serach</button> */}
      </>
   );
}

export default Search;
