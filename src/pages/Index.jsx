import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { CiMedicalCross } from 'react-icons/ci';
import { FaXmark } from 'react-icons/fa6';
import { LiaEditSolid } from 'react-icons/lia';
import { BsCheckAll } from 'react-icons/bs';

import { useContacts } from '../context/Contacts';
import Search from '../components/Search';
import Successful from '../components/Successful';

function Index() {
   const { state, dispatch } = useContacts();
   const [searchedItems, setSearchedItems] = useState([false, []]);
   const [searchedItemsStyles, setSearchedItemsStyles] = useState('');
   const [groupDelete, setGroupDelete] = useState(false);
   const [showMessage, setShowMessage] = useState('');
   const [checked, setChecked] = useState([]);
   const location = useLocation();
   const receivedData = location.state;
   const [offMessage, setOffMessge] = useState(receivedData);

   useEffect(() => {
      const successDiv = document.getElementById('successful');
      successDiv.classList.add("w-full")
      successDiv.classList.remove("w-full")
      console.log(successDiv);
      
      setTimeout(() => {
         setOffMessge(false);
      }, 4000);
   }, []);

   useEffect(() => {
      state.length
         ? !searchedItems[0] && !searchedItems[1]
            ? setSearchedItems([false, state])
            : searchedItems[0]
            ? setShowMessage('NOT-FOUND')
            : null
         : setShowMessage('NO-CONTACT');
      console.log(showMessage);
   }, [searchedItems]);
   useEffect(() => {
      setSearchedItems([false, state]);
   }, [state]);
   const editeHandler = (id) => {
      location.pathname = `/contact/${id}`;
   };

   const checkBoxHandler = (e, id) => {
      console.log(checked);
      console.log(e.target.checked);

      if (!checked.includes(id)) {
         setGroupDelete(true);
         setChecked([...checked, id]);
      } else {
         const result = checked.filter((i) => i !== id);
         console.log(result);
         setChecked([...result]);
         if (!result.length) {
            setGroupDelete(false);
         }
      }
   };

   const groupDeleteHandler = () => {
      console.log(groupDelete);

      dispatch({
         type: 'GROUP-DELETE',
         payload: checked,
      });

      setGroupDelete(false);
   };

   const allItemsselectHandler = () => {
      const selected = [];
      if (checked.length !== state.length) {
         for (let i of state) {
            selected.push(i.id);
         }
      }
      setChecked(selected);
      console.log(state.length);
      console.log(selected);
      console.log(checked);
   };

   console.log(searchedItemsStyles);

   return (
      <>
         {offMessage && <Successful text={receivedData.message} />}
         <div className="flex justify-between items-center bg-[#B88C9E] mt-20 px-9 py-6  rounded-t-xl">
            <div className="flex items-end gap-x-5">
               <img
                  className="w-8"
                  src="/contacts-svgrepo-com (1).svg"
                  alt=""
               />
               <span className="font-semibold text-2xl text-[#5e364a]">
                  مخاطبین
               </span>
            </div>

            <Search
               searchedItems={searchedItems}
               setSearchedItems={setSearchedItems}
               setShowMessage={setShowMessage}
               setSearchedItemsStyles={setSearchedItemsStyles}
            />

            <Link
               className="flex gap-x-3 items-center text-[#573747] hover:bg-[#76616E] hover:text-[#f3d4e2] font-medium p-2 mt-3 rounded-lg"
               to={'add-contact'}
            >
               <span className="">
                  <CiMedicalCross />
               </span>
               افزودن مخاطب
            </Link>
         </div>
         {showMessage && showMessage === 'NO-CONTACT' ? (
            <div className="flex justify-center items-center  bg-[#D5AABD] rounded-b-xl text-4xl text-[#704C5E]">
               <span className="p-5">no contact</span>
            </div>
         ) : showMessage === 'NOT-FOUND' ? (
            <div className="flex justify-center items-center  bg-[#D5AABD] rounded-b-xl text-4xl text-[#704C5E]">
               <span className="p-5">not found</span>
            </div>
         ) : (
            <div className="bg-[#D5AABD] text-pink-800 text-2xl pt-0 rounded-xl rounded-t-none">
               <div className="pt-5">
                  <div className="grid grid-cols-12 pb-6 px-8 text-[#704C5E] font-bold drop-shadow-md shadow-lg">
                     <span className="col-span-1 flex justify-center items-center">
                        {groupDelete && (
                           <div className="w-full flex justify-between">
                              <button onClick={allItemsselectHandler}>
                                 <BsCheckAll size={30} />
                              </button>
                              <button onClick={groupDeleteHandler}>
                                 <RiDeleteBinLine size={23} />
                              </button>
                              <button
                                 onClick={() => {
                                    setGroupDelete(false);
                                    setChecked([]);
                                 }}
                              >
                                 <FaXmark size={23} />
                              </button>
                           </div>
                        )}
                     </span>
                     <span className="col-span-3 flex justify-center items-center">
                        نام و نام‌خانوادگی
                     </span>
                     <span className="col-span-6 flex justify-center items-center">
                        ایمیل
                     </span>
                     <span className="col-span-1 flex justify-center items-center">
                        ویرایش
                     </span>
                     <span className="col-span-1 flex justify-center items-center">
                        حذف
                     </span>
                  </div>
                  <div className=" max-h-[605px] p-7 overflow-y-auto scrollbar-webkit m-1">
                     {searchedItems[1]?.map((i) => (
                        <div
                           key={i.id}
                           className="grid grid-cols-12 py-4 rounded-xl my-1 bg-[#E3B9CC] hover:bg-[#E7BDD0]"
                        >
                           <span className="col-span-1 flex justify-center items-center">
                              <input
                                 className="accent-pink-500 outline-none w-4 h-4 rounded-lg"
                                 type="checkBox"
                                 checked={checked.includes(i.id)}
                                 onChange={(e) => {
                                    checkBoxHandler(e, i.id);
                                 }}
                              />
                           </span>
                           <div
                              className={`col-span-3 flex justify-between items-center ${
                                 searchedItemsStyles === 'NAME' &&
                                 'text-pink-950 font-semibold'
                              }`}
                           >
                              <span className="w-full flex justify-center">
                                 {i.name}
                              </span>
                              <span className="w-px h-full bg-gray-300"></span>
                           </div>
                           <span
                              className={`col-span-6 flex justify-between mr-5 items-center ${
                                 searchedItemsStyles === 'EMAIL' &&
                                 'text-pink-950 font-semibold'
                              }`}
                           >
                              <span className="w-full flex justify-center">
                                 {i.email}
                              </span>
                              <span className="w-px h-full bg-gray-300"></span>
                           </span>
                           <Link
                              className="col-span-1 flex justify-between items-center"
                              to={`/contact/${i.id}`}
                           >
                              <div className="w-full flex justify-center">
                                 <span className="pt-1.5 pr-1.5 pb-2 pl-2 rounded-md hover:bg-[#ac3866] hover:text-white/80">
                                    <LiaEditSolid />
                                 </span>
                              </div>
                              <span className="w-px h-full bg-gray-300"></span>
                           </Link>
                           <span className="col-span-1 flex justify-center items-center">
                              <span
                                 className="p-2 rounded-md hover:bg-[#ac3866] hover:text-white/80"
                                 onClick={() =>
                                    dispatch({
                                       type: 'DELETE-ITEM',
                                       payload: i.id,
                                    })
                                 }
                              >
                                 <RiDeleteBinLine />
                              </span>
                           </span>
                        </div>
                     ))}
                  </div>
                  <div className="myShadow h-px"></div>
               </div>
               {/* <table className="border border-black p-3 mx-auto w-full mt-[500px] text-center">
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
               ) : null}
               {searchedItems[1]?.map((i) => (
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
               ))}
            </tbody>
         </table> */}
            </div>
         )}
      </>
   );
}

export default Index;
