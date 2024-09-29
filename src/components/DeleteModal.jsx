/* eslint-disable react/prop-types */
import axios from 'axios';
import { useEffect, useState } from 'react';

function DeleteModal(props) {
   const {
      showDeleteModal,
      setShowDeleteModal,
      dispatch,
      setGroupDelete,
      setChecked,
      setShowSuccessAlert,
      showMessageHandler,
   } = props;

   const [noItem, setNoItem] = useState(false);

   useEffect(() => {
      if (showDeleteModal[2] === 'SINGLE') {
         setGroupDelete(false);
         setChecked([]);
      }
      if (!showDeleteModal[1].length) {
         setNoItem(true);
      } else {
         setNoItem(false);
      }
   }, []);

   const deleteHandler = (id) => {
      if (id.length > 1) {
         Promise.all(
            id.map((i) => axios.delete(`http://localhost:3000/contacts/${i}`)),
         )
            .then(() => {
               return axios.get('http://localhost:3000/contacts');
            })
            .then((res) => {
               dispatch({
                  type: 'SET-CONTACTS',
                  payload: res.data,
               });

               showMessageHandler(0);
            })
            .catch((error) => {
               console.error('Error deleting items:', error);
            });
      } else {
         axios
            .delete(`http://localhost:3000/contacts/${id[0]}`)
            .then(() => {
               return axios.get('http://localhost:3000/contacts');
            })
            .then((res) => {
               dispatch({
                  type: 'SET-CONTACTS',
                  payload: res.data,
               });
               showMessageHandler(1);
            })
            .catch((error) => {
               console.log('Error:', error);
            });
      }
      setGroupDelete(false);
      setChecked([]);
   };

   return (
      <>
         <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#cc8ca7]/30">
            <div className="moduleShadow flex flex-col items-end gap-y-9 rounded-xl bg-[#E3B9CC] p-10">
               <span className="font-DanaMedium tracking-wider text-[#72326d]">
                  {noItem
                     ? 'هیچ مخاطبی برای حذف انتخاب نکرده اید!'
                     : showDeleteModal[1].length === 1
                       ? 'مطمئنید که می‌خواهید این مخاطب را حذف کنید؟'
                       : 'مطمئنید که می‌خواهید این مخاطب ها را حذف کنید؟'}
               </span>
               {showDeleteModal[0] &&
                  (noItem ? (
                     <div>
                        <button
                           className="h-10 w-10 rounded-lg bg-[#743454] tracking-wider text-white"
                           onClick={() => setShowDeleteModal([false, []])}
                        >
                           حله
                        </button>
                     </div>
                  ) : (
                     <div className="flex gap-x-5">
                        <button
                           className="h-10 w-10 rounded-lg bg-[#743454] tracking-wider text-white"
                           onClick={() => {
                              deleteHandler(showDeleteModal[1]);
                              setShowSuccessAlert([false, '', '']);
                           }}
                        >
                           بله
                        </button>
                        <button
                           className="h-10 w-10 rounded-lg bg-[#743454] tracking-wider text-white"
                           onClick={() => setShowDeleteModal([false, []])}
                        >
                           خیر
                        </button>
                     </div>
                  ))}
            </div>
         </div>
      </>
   );
}

export default DeleteModal;
