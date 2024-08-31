import { useEffect, useState } from 'react';
import { useContacts } from '../context/Contacts';
import { Link, useParams } from 'react-router-dom';
import { FaExclamationCircle } from 'react-icons/fa';

function Form({ submitType }) {
   const { state, dispatch } = useContacts();
   const { id } = useParams();
   const [contactData] = state.filter((i) => i.id === +id);
   const prevData = contactData;

   const [changed, setChanged] = useState(true);
   const [showMessage, setShowMessage] = useState(false);
   const [showError, setShowError] = useState(false);
   const [fullName, setFullName] = useState({
      value: contactData?.name || '',
      status: true,
      focus: false,
      submitStatus: false,
   });
   const [email, setEmail] = useState({
      value: contactData?.email || '',
      status: true,
      focus: false,
      submitStatus: false,
   });
   const [job, setJob] = useState({
      value: contactData?.job || '',
      status: true,
      focus: false,
      submitStatus: false,
   });
   const [phoneNumber, setPhoneNumber] = useState({
      value: contactData?.phoneNumber || '',
      status: true,
      focus: false,
      submitStatus: false,
   });

   if (showError) {
      setTimeout(() => {
         setShowError(false);
      }, 2000);
   }

   const validation = (e) => {
      setChanged(false);
      const value = e[0];
      const regex = e[1];
      const result = regex.test(value.trim());
      result
         ? e[2]({
              value,
              status: true,
              focus: false,
              submitStatus: true,
           })
         : e[2]({
              value,
              status: false,
              focus: false,
              submitStatus: false,
           });
   };

   useEffect(() => {
      if (submitType === 'UPDATE-CONTACT') {
         setFullName((state) => ({
            ...state,
            focus: false,
            status: true,
            submitStatus: true,
         }));
         setEmail((state) => ({
            ...state,
            focus: false,
            status: true,
            submitStatus: true,
         }));
      }
   }, []);
   const idMaker = () => Math.ceil(Math.pow(Math.random() * 35634, 3));

   const focusHandler = (state, func) => {
      if (!state.value.length) {
         func((state) => ({ ...state, focus: true }));
      }
      setShowError(false);
   };

   const blurHandler = (state, func) => {
      !state.value.length
         ? func((state) => ({ ...state, focus: false, status: true }))
         : state.status
         ? func((state) => ({ ...state, focus: false, status: true }))
         : func((state) => ({ ...state, focus: true, status: false }));
   };

   const importantSubList = [
      { state: fullName, stateFunction: setFullName },
      { state: email, stateFunction: setEmail },
   ];

   const submitHandler = (e) => {
      e.preventDefault();

      const invalids = [];
      importantSubList.map((item, index) => {
         if (!item.state.submitStatus) {
            invalids.push(index);
         }
      });

      if (!!invalids.length) {
         invalids.map((item) => {
            const setAlert = importantSubList[item].stateFunction;
            {
               !importantSubList[item].state.value.length
                  ? setAlert((state) => ({ ...state, focus: true }))
                  : setAlert((state) => ({ ...state, status: false }));
            }
         });
      }
      if (!invalids.length && !job.focus && !phoneNumber.focus) {
         const contact = {
            id: submitType === 'UPDATE-CONTACT' ? +id : idMaker(),
            name: fullName.value,
            email: email.value,
            jub: job.value,
            phoneNumber: phoneNumber.value,
         };
         if (!state.find((i) => i.name === contact.name)) {
            dispatch({
               type: submitType,
               payload: contact,
            });
            setShowError(false);
         } else {
            setShowError(true);
         }
      }
   };

   return (
      <>
         <div className="w-[70%] mx-auto">
            {showError ? (
               submitType === 'UPDATE-CONTACT' ? (
                  prevData.name === fullName.value ? (
                     <span>مقادیر را تغییر نداده اید</span>
                  ) : (
                     <span>این مقدار قبلا ثبت شده است</span>
                  )
               ) : (
                  <span>
                     این مخاطب قبلا در لیست مخاطبین ثبت شده است ، ایا قصد ویرایش
                     دارید؟
                  </span>
               )
            ) : null}
            <Link to={'/'} className="flex justify-end">
               بازگشت به لیست مخاطبین
               <img className="w-8" src="/contacts-svgrepo-com (1).svg" />
            </Link>
            <form
               onSubmit={submitHandler}
               className="flex flex-col gap-y-5 mt-10 p-20 bg-[#B88C9E] text-[#44122b] font-semibold text-xl"
            >
               <div className="grid grid-cols-12">
                  <p className="col-span-4">
                     نام و نام خانوادگی <span className="">*</span> :
                  </p>
                  <input
                     onChange={(e) =>
                        validation([
                           e.target.value,
                           /^[a-zA-z\u0600-\u06FF\s\d]{4,20}$/,
                           setFullName,
                        ])
                     }
                     value={fullName.value}
                     onFocus={() => focusHandler(fullName, setFullName)}
                     className="col-span-8 p-2 bg-[#e3b9b9] rounded-md"
                     type="text"
                  />

                  {fullName.focus ? (
                     <div className="col-span-12">
                        <span className="flex justify-end items-center gap-x-2 font-light text-[#4b4348] p-2 pl-0">
                           این بخش نباید خالی بماند
                           <FaExclamationCircle color="#c91616" />
                        </span>
                     </div>
                  ) : !fullName.status ? (
                     <div className="col-span-12 text-left">
                        <span className="font-light text-[#4b4348] p-2">
                           تعداد کارکتر &apos; نام و نام خانوادگی &apos; باید
                           بین 4 تا 20 کارکتر باشد
                        </span>
                     </div>
                  ) : null}
               </div>
               <div className="grid grid-cols-12">
                  <p className="col-span-4">
                     ایمیل <span>*</span> :
                  </p>
                  <input
                     onChange={(e) => {
                        validation([
                           e.target.value.trim(),
                           /^[\w_\.]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/,
                           setEmail,
                        ]);
                        setEmail((state) => ({ ...state, focus: false }));
                     }}
                     value={email.value}
                     onFocus={() => focusHandler(email, setEmail)}
                     className="col-span-8 p-2 bg-[#E3B9CC] rounded-md"
                     type="text"
                  />
                  {email.focus ? (
                     <div className="col-span-12">
                        <span className="flex justify-end items-center gap-x-2 font-light text-[#4b4348] p-2 pl-0">
                           این بخش نباید خالی بماند
                           <FaExclamationCircle color="#c91616" />
                        </span>
                     </div>
                  ) : !email.status ? (
                     <div className="col-span-12 text-left">
                        <span className="font-light text-[#4b4348] p-2">
                           ساختار ایمیل معتبر : example@gmail.com
                        </span>
                     </div>
                  ) : null}
               </div>
               <div className="grid grid-cols-12">
                  <span className="col-span-4">شغل :</span>
                  <input
                     onChange={(e) =>
                        validation([
                           e.target.value.trim(),
                           /^[a-zA-z\u0600-\u06FF\s\d]{4,20}$/,
                           setJob,
                        ])
                     }
                     value={job.value}
                     onBlur={() => blurHandler(job, setJob)}
                     onFocus={() => focusHandler(job, setJob)}
                     className="col-span-8 p-2 bg-[#E3B9CC] rounded-md"
                     type="text"
                  />
                  {job.focus ? (
                     <div className="col-span-12 text-left">
                        <span className="font-light text-[#4b4348] p-2">
                           بهتر است یک عبارت معتبر وارد کنید یا این بخش را خالی
                           بگذارید
                        </span>
                     </div>
                  ) : !job.status ? (
                     <div className="col-span-12 text-left">
                        <span className="font-light text-[#4b4348] p-2">
                           تعداد کارکتر &apos; شغل &apos; باید بین 4 تا 20
                           کارکتر باشد
                        </span>
                     </div>
                  ) : null}
               </div>
               <div className="grid grid-cols-12">
                  <span className="col-span-4">تلفن همراه :</span>
                  <input
                     onChange={(e) =>
                        validation([
                           e.target.value.trim(),
                           /^09[\d]{9}$/,
                           setPhoneNumber,
                        ])
                     }
                     value={phoneNumber.value}
                     onBlur={() => blurHandler(phoneNumber, setPhoneNumber)}
                     onFocus={() => focusHandler(phoneNumber, setPhoneNumber)}
                     placeholder=" 111 11 11 091"
                     className="col-span-8 p-2 bg-[#E3B9CC] rounded-md"
                     type="text"
                  />
                  {phoneNumber.focus ? (
                     <div className="col-span-12 text-left">
                        <span className="font-light text-[#4b4348] p-2">
                           بهتر است یک شماره معتبر وارد کنید یا این بخش را خالی
                           بگذارید
                        </span>
                     </div>
                  ) : !phoneNumber.status ? (
                     <div className="col-span-12 text-left">
                        <span className="font-light text-[#4b4348] p-2">
                           شماره همراه باید به صورت &apos; 09123456789 &apos; و
                           11 رقمی باشد
                        </span>
                     </div>
                  ) : null}
               </div>
               <button type="submit">
                  {submitType === 'ADD-CONTACT'
                     ? 'افزودن مخاطب'
                     : 'ویرایش اطلاعات'}
               </button>
            </form>
         </div>
      </>
   );
}

export default Form;
