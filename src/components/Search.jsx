import { useEffect, useState } from 'react';
import { useContacts } from '../context/Contacts';
function Search({ searchedItems, setSearchedItems,setShowMessage }) {
   const { state, dispatch } = useContacts();
   const [searchedValue, setSearchedValue] = useState('');
   const [searchedItemLength, setSearchedItemLength] = useState(-1);

   useEffect(() => {
      const searchedItem = state.filter((i) =>
         searchedValue === '' ? true : i.name.includes(searchedValue)
      );
      console.log(searchedItem);

      setSearchedItemLength(searchedItem.length);
      if(state){

         if (!searchedItem.length) {
            console.log(!searchedItem.length);
            
            setSearchedItems([false, searchedItem]);
         } else {
            setSearchedItems(true);
            console.log("mozzzzzzzzzzzzzzzzzzzzzzzz");
            
         }
      }
   }, [searchedValue, searchedItemLength, setSearchedItems, state]);

   console.log(searchedValue);
   return (
      <>
         <input
            placeholder="جستوجو کنید ..."
            className="bg-slate-300"
            onChange={(e) => {
               setSearchedValue(e.target.value);
            }}
            onBlur={() => {
               setSearchedValue('');
            }}
            value={searchedValue}
            type="text"
         />
         {/* <button onClick={searchHandler}>serach</button> */}
      </>
   );
}

export default Search;
