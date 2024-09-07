import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { CiMedicalCross } from 'react-icons/ci';
import { FaXmark } from 'react-icons/fa6';
import { LiaEditSolid } from 'react-icons/lia';
import { BsCheckAll } from 'react-icons/bs';

import { useContacts } from '../context/Contacts';
import Search from '../components/Search';
import AlertModule from '../components/AlertModule';

function Index() {
   const { state, dispatch } = useContacts();
   const [searchedItems, setSearchedItems] = useState([false, []]);
   const [searchedItemsStyles, setSearchedItemsStyles] = useState('');
   const [groupDelete, setGroupDelete] = useState(false);
   const [showAlert, setShowAlert] = useState(false);
   const [showMessage, setShowMessage] = useState('');
   const [checked, setChecked] = useState([]);

   useEffect(() => {
      state.length
         ? !searchedItems[0] && !searchedItems[1]
            ? setSearchedItems([false, state])
            : searchedItems[0]
            ? setShowMessage('NOT-FOUND')
            : null
         : setShowMessage('NO-CONTACT');
   }, [searchedItems]);
   useEffect(() => {
      setSearchedItems([false, state]);
   }, [state]);

   const checkBoxHandler = (e, id) => {
      if (!checked.includes(id)) {
         setGroupDelete(true);
         setChecked([...checked, id]);
      } else {
         const result = checked.filter((i) => i !== id);
         setChecked([...result]);
         if (!result.length) {
            setGroupDelete(false);
         }
      }
   };

   const groupDeleteHandler = () => {
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
   };

   return (
      <>
         {/* {offMessage && receivedData.length && (
            <Successful text={receivedData?.message} />
         )} */}
         {/* {showAlert && (
            <AlertModule
               finalSubmit={finalSubmit}
               showMessage={showMessage}
               setShowMessage={setShowMessage}
               payload={['NO-CHANGE']}
               setShowError={setShowError}
               text={'مقادیر را تغییر نداده اید'}
            />
         )} */}
         <div className="flex justify-between items-center bg-[#B88C9E] mt-20 px-10 py-6  rounded-t-xl">
            <div className="flex items-end gap-x-5">
               <img
                  className="w-8 mb-1"
                  src="/contacts-svgrepo-com (1).svg"
                  alt=""
               />
               <span className="font-semibold text-[#5e364a] font-MorabbaBold text-3xl">
                  مخاطب ها
               </span>
            </div>

            <Search
               searchedItems={searchedItems}
               setSearchedItems={setSearchedItems}
               setShowMessage={setShowMessage}
               setSearchedItemsStyles={setSearchedItemsStyles}
            />

            <Link
               className="flex gap-x-3 items-center text-[#573747] hover:bg-[#76616E] hover:text-[#f3d4e2] font-semibold text-xl font-MorabbaMedium p-2 px-4 mt-3 rounded-lg transition-all"
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
               <span className="p-10">دریغ از یک مخاطب ... !</span>
            </div>
         ) : showMessage === 'NOT-FOUND' ? (
            <div className="flex justify-center items-center  bg-[#D5AABD] rounded-b-xl font-DanaMedium text-4xl text-[#704C5E]">
               <span className="p-10">مخاطبی با این مشخصات یافت نشد !</span>
            </div>
         ) : (
            <div className="bg-[#D5AABD] text-pink-800 text-2xl pt-0 rounded-xl rounded-t-none">
               <div className="pt-5">
                  <div className="grid grid-cols-12 pb-6 px-8 text-[#704C5E] font-bold drop-shadow-md shadow-lg">
                     <span className="col-span-1 flex justify-center items-center">
                        {groupDelete && (
                           <div className="w-full flex justify-between">
                              <button
                                 className="hover:bg-[#ac3866] p-0.5 hover:text-white/80 rounded-lg"
                                 onClick={allItemsselectHandler}
                              >
                                 <BsCheckAll size={30} />
                              </button>
                              <button
                                 className="hover:bg-[#ac3866] p-1.5 hover:text-white/80 rounded-lg"
                                 onClick={groupDeleteHandler}
                              >
                                 <RiDeleteBinLine size={23} />
                              </button>
                              <button
                                 className="hover:bg-[#ac3866] p-1.5 hover:text-white/80 rounded-lg"
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
