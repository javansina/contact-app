import { Link, useNavigate } from 'react-router-dom';
import { useContacts } from '../context/Contacts';

function AlertModule({
   text,
   setShowError,
   payload,
   finalSubmit,
   showMessage,
   setShowMessage,
}) {

   const navigate = useNavigate();
   const { state,  } = useContacts();
   
   let id = '';

   if (payload[0] === 'SEND') {
      const data = state.filter((i) => i.name === payload[1]);
      id = data[0].id;
   }

   return (
      <div className="absolute inset-0 flex justify-center items-center bg-[#cc8ca7]/30 z-50">
         <div className="bg-[#E3B9CC] p-10 flex flex-col items-center gap-y-9 rounded-xl moduleShadow">
            <span className="text-[#72326d] font-DanaMedium tracking-wider">
               {showMessage[1] || text}
            </span>
            <div
               className={`flex gap-x-5 w-full ${
                  payload[0] === 'SEND' || showMessage[0]
                     ? 'justify-end'
                     : 'justify-center'
               }`}
            >
               {showMessage[0] ? (
                  <>
                     <button
                        className="bg-[#743454] p-2.5 rounded-lg text-white tracking-wider"
                        onClick={() => {
                           finalSubmit(showMessage[2]);
                           setShowMessage(false);
                           if (
                              showMessage[1] ===
                              'از ایجاد تغییرات مطمئن هستید ؟'
                           ) {
                              navigate('/', {
                                 state: {
                                    message: 'تغییرات با موفقیت ثبت شد !',
                                 },
                              });
                           } else {
                              navigate('/', {
                                 state: {
                                    message: 'اطلاعات مخاطب با موفقیت ثبت شد !',
                                 },
                              });
                           }
                        }}
                     >
                        بله
                     </button>
                     <button
                        className="bg-[#743454] p-2.5 rounded-lg text-white tracking-wider"
                        onClick={() => {
                           setShowError(true);
                        }}
                     >
                        خیر
                     </button>
                  </>
               ) : payload[0] === 'SEND' ? (
                  <>
                     <Link
                        to={`/contact/${id}`}
                        className="bg-[#743454] p-2.5 rounded-lg text-white tracking-wider"
                     >
                        ویرایش میکنم
                     </Link>

                     <button
                        className="bg-[#743454] p-2.5 rounded-lg text-white tracking-wider"
                        onClick={() => {
                           setShowError(false);
                        }}
                     >
                        {payload[0] === 'SEND' ? 'بستن' : 'حله'}
                     </button>
                  </>
               ) : (
                  <button
                     className="bg-[#743454] p-2.5 rounded-lg text-white tracking-wider"
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
