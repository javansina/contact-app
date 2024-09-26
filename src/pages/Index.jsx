import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { CiMedicalCross } from 'react-icons/ci';
import { FaXmark } from 'react-icons/fa6';
import { LiaEditSolid } from 'react-icons/lia';
import { BsCheckAll } from 'react-icons/bs';

import { useContacts } from '../context/Contacts';
import Search from '../components/Search';

import DeleteModule from '../components/DeleteModule';

import { FaRegCheckCircle } from 'react-icons/fa';

function Index() {
   const { state, dispatch } = useContacts();
   const [searchedItems, setSearchedItems] = useState([false, []]);
   const [searchedItemsStyles, setSearchedItemsStyles] = useState('');
   const [groupDelete, setGroupDelete] = useState(false);
   const [showDeleteModule, setShowDeleteModule] = useState([false, '', '']);
   const [showMessage, setShowMessage] = useState('');
   const [checked, setChecked] = useState([]);
   const [showSuccessAlert, setShowSuccessAlert] = useState(false);
   const [timeoutId, setTimeoutId] = useState(null);

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

   const checkBoxHandler = (id) => {
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

   const allItemsselectHandler = () => {
      const selected = [];
      if (checked.length !== state.length) {
         for (let i of state) {
            selected.push(i.id);
         }
      }
      setChecked(selected);
   };

   const showMessageHandler = (code) => {
      if (timeoutId) {
         clearTimeout(timeoutId);
      }
      setTimeout(() => {
         setShowSuccessAlert([true, code, 'successDiv']);
      }, 10);

      const newTimeoutId = setTimeout(() => {
         setShowSuccessAlert([false, '', '']);
      }, 3000);

      setTimeoutId(newTimeoutId);
      setShowDeleteModule([false, []]);
   };
   return (
      <>
         {showSuccessAlert[0] && (
            <div
               id="successful"
               className="absolute top-1 h-16 w-fit rounded-xl bg-[#0e9149]"
            >
               <div className="w-fit px-7 py-4">
                  <span className="flex gap-x-5 text-white">
                     {showSuccessAlert[1] === 1
                        ? 'مخاطب حذف شد : )'
                        : 'مخاطب ها حذف شدند : )'}
                     <FaRegCheckCircle />
                  </span>
               </div>
               <div
                  className={`mb-4 h-1 w-full rounded-b-full bg-[#8bb69e] py-1 ${showSuccessAlert[2]} `}
               ></div>
            </div>
         )}
         {showDeleteModule[0] && (
            <DeleteModule
               showDeleteModule={showDeleteModule}
               setShowDeleteModule={setShowDeleteModule}
               dispatch={dispatch}
               setGroupDelete={setGroupDelete}
               setChecked={setChecked}
               setShowSuccessAlert={setShowSuccessAlert}
               showMessageHandler={showMessageHandler}
            />
         )}
         <div className="mt-20 rounded-t-xl bg-[#B88C9E] px-10 py-6 maxMd:justify-around maxLg:px-6">
            <div className="flex items-center justify-between">
               <div className="mt-1.5 flex items-end gap-x-5">
                  <img
                     className="w-8"
                     src="/contacts-svgrepo-com (1).svg"
                     alt=""
                  />
                  <span className="font-MorabbaBold text-2xl font-semibold text-[#5e364a] maxLg:text-xl">
                     مخاطب ها
                  </span>
               </div>

               <div className="maxMd:hidden">
                  <Search
                     searchedItems={searchedItems}
                     setSearchedItems={setSearchedItems}
                     setShowMessage={setShowMessage}
                     setSearchedItemsStyles={setSearchedItemsStyles}
                  />
               </div>

               <Link
                  className="mt-1.5 flex items-center gap-x-3 rounded-lg p-2 px-2 font-MorabbaMedium text-xl font-semibold text-[#573747] transition-all hover:bg-[#76616E] hover:text-[#f3d4e2] maxLg:gap-x-2"
                  to={'add-contact'}
               >
                  <span className="">
                     <CiMedicalCross />
                  </span>
                  افزودن مخاطب
               </Link>
            </div>
            <div className="md:hidden">
               <Search
                  searchedItems={searchedItems}
                  setSearchedItems={setSearchedItems}
                  setShowMessage={setShowMessage}
                  setSearchedItemsStyles={setSearchedItemsStyles}
               />
            </div>
         </div>
         {showMessage && showMessage === 'NO-CONTACT' ? (
            <div className="flex items-center justify-center rounded-b-xl bg-[#D5AABD] text-4xl text-[#704C5E]">
               <span className="p-10">دریغ از یک مخاطب ... !</span>
            </div>
         ) : showMessage === 'NOT-FOUND' ? (
            <div className="flex items-center justify-center rounded-b-xl bg-[#D5AABD] font-DanaMedium text-4xl text-[#704C5E]">
               <span className="p-10">مخاطبی با این مشخصات یافت نشد !</span>
            </div>
         ) : (
            <div className="rounded-xl rounded-t-none bg-[#D5AABD] pt-0 text-2xl text-pink-800">
               <div className="pt-5">
                  <div className="grid grid-cols-12 px-8 pb-6 font-bold text-[#704C5E] shadow-lg drop-shadow-md">
                     <span className="col-span-1 flex items-center justify-center">
                        {groupDelete && (
                           <div className="flex w-full justify-between">
                              <button
                                 className="rounded-lg p-0.5 hover:bg-[#ac3866] hover:text-white/80"
                                 onClick={allItemsselectHandler}
                              >
                                 <BsCheckAll size={30} />
                              </button>
                              <button
                                 className="rounded-lg p-1.5 hover:bg-[#ac3866] hover:text-white/80"
                                 onClick={() =>
                                    setShowDeleteModule([true, checked, ''])
                                 }
                              >
                                 <RiDeleteBinLine size={23} />
                              </button>
                              <button
                                 className="rounded-lg p-1.5 hover:bg-[#ac3866] hover:text-white/80"
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
                     <span className="col-span-3 flex items-center justify-center">
                        نام و نام‌خانوادگی
                     </span>
                     <span className="col-span-6 flex items-center justify-center">
                        ایمیل
                     </span>
                     <span className="col-span-1 flex items-center justify-center">
                        ویرایش
                     </span>
                     <span className="col-span-1 flex items-center justify-center">
                        حذف
                     </span>
                  </div>
                  {searchedItems[1].length > 0 && (
                     <div className="m-1 max-h-[605px] overflow-y-auto p-7 scrollbar-webkit">
                        {searchedItems[1].map((i) => (
                           <div
                              key={i.id}
                              className="my-1 grid grid-cols-12 rounded-xl bg-[#E3B9CC] py-4 hover:bg-[#E7BDD0]"
                           >
                              <span className="col-span-1 flex items-center justify-center">
                                 <input
                                    className="h-4 w-4 rounded-lg accent-pink-500 outline-none"
                                    type="checkBox"
                                    checked={checked.includes(i.id)}
                                    onChange={() => checkBoxHandler(i.id)}
                                 />
                              </span>
                              <div
                                 className={`col-span-3 flex items-center justify-between ${
                                    searchedItemsStyles === 'NAME' &&
                                    'font-semibold text-pink-950'
                                 }`}
                              >
                                 <span className="flex w-full justify-center">
                                    {i.name}
                                 </span>
                                 <span className="h-full w-px bg-gray-300"></span>
                              </div>
                              <span
                                 className={`col-span-6 mr-5 flex items-center justify-between ${
                                    searchedItemsStyles === 'EMAIL' &&
                                    'font-semibold text-pink-950'
                                 }`}
                              >
                                 <span className="flex w-full justify-center">
                                    {i.email}
                                 </span>
                                 <span className="h-full w-px bg-gray-300"></span>
                              </span>
                              <Link
                                 className="col-span-1 flex items-center justify-between"
                                 to={`/contact/${i.id}`}
                              >
                                 <div className="flex w-full justify-center">
                                    <span className="rounded-md pb-2 pl-2 pr-1.5 pt-1.5 hover:bg-[#ac3866] hover:text-white/80">
                                       <LiaEditSolid />
                                    </span>
                                 </div>
                                 <span className="h-full w-px bg-gray-300"></span>
                              </Link>
                              <span className="col-span-1 flex items-center justify-center">
                                 <span
                                    className="rounded-md p-2 hover:bg-[#ac3866] hover:text-white/80"
                                    onClick={() =>
                                       setShowDeleteModule([
                                          true,
                                          [i.id],
                                          'SINGLE',
                                       ])
                                    }
                                 >
                                    <RiDeleteBinLine />
                                 </span>
                              </span>
                           </div>
                        ))}
                     </div>
                  )}
                  <div className="myShadow h-px"></div>
               </div>
            </div>
         )}
      </>
   );
}

export default Index;
