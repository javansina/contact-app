import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
import { RiDeleteBinLine } from 'react-icons/ri';
import { CiMedicalCross } from 'react-icons/ci';
import { FaXmark } from 'react-icons/fa6';
import { TiTick } from 'react-icons/ti';

import { useContacts } from '../context/Contacts';
import Search from '../components/Search';

function Index() {
   const { state, dispatch } = useContacts();
   const [searchedItems, setSearchedItems] = useState([false]);
   const [groupDelete, setGroupDelete] = useState([false, []]);
   const [showMessage, setShowMessage] = useState('');
   console.log(state);
   console.log(searchedItems);
   useEffect(() => {
      state.length
         ? !searchedItems[0] && !searchedItems[1]
            ? setSearchedItems([false, state])
            : null
         : setShowMessage('NO-CONTACT');

   }, [searchedItems]);
   useEffect(() => {
      setSearchedItems([false, state]);
   }, [state]);
   const editeHandler = (id) => {
      location.pathname = `/contact/${id}`;
   };
   console.log(searchedItems);
   const checkBoxHandler = (e, id) => {
      console.log(e.target.checked);
      if (e.target.checked) {
         setGroupDelete((state) => [true, [...state[1], id]]);
      }
   };
   console.log(groupDelete);
   return (
      <div>
         <div className="flex justify-between">
            <span className="flex items-end">
               <img
                  className="w-10"
                  src="/contacts-svgrepo-com (1).svg"
                  alt=""
               />
               جستوجو در مخاطبین :
            </span>

            <Search
               searchedItems={searchedItems}
               setSearchedItems={setSearchedItems}
               setShowMessage={setShowMessage}
            />
            <Link to={'add-contact'}>
               <CiMedicalCross />
            </Link>
            {groupDelete[0] ? (
               <button
                  onClick={() => {
                     dispatch({
                        type: 'GROUP-DELETE',
                        payload: groupDelete[1],
                     });
                     setGroupDelete([false, []]);
                  }}
               >
                  <TiTick />
               </button>
            ) : (
               <button onClick={() => setGroupDelete([true, []])}>
                  <RiDeleteBinLine />
               </button>
            )}
            <button
               onClick={() => {
                  setGroupDelete([false, []]);
               }}
            >
               <FaXmark />
            </button>
         </div>
         <table className="border border-black p-3 mx-auto w-full text-center">
            <thead>
               <tr>
                  <th className="border border-black p-3">نام</th>
                  <th className="border border-black p-3">ایمیل</th>
                  <th className="border border-black p-3">ایمیل</th>
               </tr>
            </thead>
            <tbody>
               {showMessage ? (
                  showMessage === 'NO-CONTACT' ? (
                     <tr>
                        <td>no contact</td>
                     </tr>
                  ) : showMessage === 'NOT-FOUND' ? (
                     <tr>
                        <td>not found</td>
                     </tr>
                  ) : null
               ) : (
                  searchedItems[1]?.map((i) => (
                     <tr key={i.id}>
                        <td className="border border-black p-3">{i.name}</td>
                        <td className="border border-black p-3">{i.email}</td>
                        <td className="border-black w-fit p-3 flex justify-center gap-x-5">
                           <span
                              className="w-1 inline-block"
                              onClick={() => editeHandler(i.id)}
                           >
                              <IoSettingsOutline />
                           </span>
                           <span
                              className="w-1 inline-block"
                              onClick={() =>
                                 dispatch({
                                    type: 'DELETE-ITEM',
                                    payload: i.id,
                                 })
                              }
                           >
                              <RiDeleteBinLine />
                           </span>
                           {groupDelete[0] && (
                              <input
                                 type="checkBox"
                                 onChange={(e) => {
                                    checkBoxHandler(e, i.id);
                                 }}
                              />
                           )}
                        </td>
                     </tr>
                  ))
               )}
            </tbody>
         </table>
      </div>
   );
}

export default Index;
