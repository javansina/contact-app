/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useContacts } from '../context/Contacts';

function AlertModule({
   text,
   setShowError,
   payload,
   finalSubmit,
   showMessage,
   setShowMessage,
   setSuccessMessage,
}) {
   const { state } = useContacts();

   let id = '';

   if (payload[0] === 'SEND') {
      const data = state.filter((i) => i.name === payload[1]);
      id = data[0].id;
   }

   return (
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#cc8ca7]/30">
         <div className="moduleShadow flex flex-col items-center gap-y-9 rounded-xl bg-[#E3B9CC] p-10">
            <span className="font-DanaMedium tracking-wider text-[#72326d]">
               {showMessage[1] || text}
            </span>
            <div
               className={`flex w-full gap-x-5 ${
                  payload[0] === 'SEND' || showMessage[0]
                     ? 'justify-end'
                     : 'justify-center'
               }`}
            >
               {showMessage[0] ? (
                  <>
                     <button
                        className="rounded-lg bg-[#743454] p-2.5 tracking-wider text-white"
                        onClick={() => {
                           finalSubmit(showMessage[2]);
                           setShowMessage(false);
                           showMessage[1] === 'از ایجاد تغییرات مطمئن هستید ؟'
                              ? setSuccessMessage([
                                   true,
                                   'تغییرات با موفقیت ثبت شد !',
                                   '',
                                ])
                              : setSuccessMessage([
                                   true,
                                   'اطلاعات مخاطب با موفقیت ثبت شد !',
                                   '',
                                ]);
                           setShowError(false);
                        }}
                     >
                        بله
                     </button>
                     <button
                        className="rounded-lg bg-[#743454] p-2.5 tracking-wider text-white"
                        onClick={() => {
                           setShowMessage(false);
                           setShowError(false);
                        }}
                     >
                        خیر
                     </button>
                  </>
               ) : payload[0] === 'SEND' ? (
                  <>
                     <Link
                        to={`/contact/${id}`}
                        className="rounded-lg bg-[#743454] p-2.5 tracking-wider text-white"
                     >
                        ویرایش میکنم
                     </Link>

                     <button
                        className="rounded-lg bg-[#743454] p-2.5 tracking-wider text-white"
                        onClick={() => {
                           setShowError(false);
                        }}
                     >
                        {payload[0] === 'SEND' ? 'بستن' : 'حله'}
                     </button>
                  </>
               ) : (
                  <button
                     className="rounded-lg bg-[#743454] p-2.5 tracking-wider text-white"
                     onClick={() => {
                        setShowError(false);
                     }}
                  >
                     {payload[0] === 'SEND' ? 'بستن' : 'حله'}
                  </button>
               )}
            </div>
         </div>
      </div>
   );
}

export default AlertModule;
