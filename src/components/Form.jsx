import { useEffect, useMemo, useRef, useState } from 'react';
import { useContacts } from '../context/Contacts';
import { useParams } from 'react-router-dom';

import Alerts from './Alerts';
import AlertModule from './AlertModule';

function Form({ submitType }) {
   const { state, dispatch } = useContacts();
   const { id } = useParams();
   const input = useRef(null);

   const [contactData] = state.filter((i) => i.id === +id);
   const prevData = contactData;

   const [showMessage, setShowMessage] = useState([false, '']);
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
   useEffect(() => {
      input.current.focus();
      console.log(input);
   }, []);
   const validation = (e) => {
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
   const moz = useMemo(() => {
      let s = 342;
      s = +234;
      return () => {
         console.log('moz');
      };
   }, []);
   console.log(moz);
   const importantSubList = [
      { state: fullName, stateFunction: setFullName },
      { state: email, stateFunction: setEmail },
   ];
   const contact = {
      id: submitType === 'UPDATE-CONTACT' ? +id : idMaker(),
      name: fullName.value,
      email: email.value,
      job: job.value.trim(),
      phoneNumber: phoneNumber.value,
   };
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
         if (!state.find((i) => i.name === contact.name)) {
            submitType === 'UPDATE-CONTACT'
               ? setShowMessage([
                    true,
                    'از ایجاد تغییرات مطمئن هستید ؟',
                    contact,
                 ])
               : setShowMessage([
                    true,
                    'از ثبت این مخاطب اطمینان دارید ؟',
                    contact,
                 ]);
            setShowError(false);
         } else {
            setShowError(true);
         }
      }
   };

   const finalSubmit = (contact) => {
      dispatch({
         type: submitType,
         payload: contact,
      });
   };
   console.log(!![]);
   return (
      <>
         <div className="lg:w-[70%] mx-auto font-semibold">
            {showMessage[0] && !showError && (
               <AlertModule
                  finalSubmit={finalSubmit}
                  showMessage={showMessage}
                  setShowMessage={setShowMessage}
                  payload={[0]}
                  setShowError={() => {}}
                  text={''}
               />
            )}
            {showError ? (
               submitType === 'UPDATE-CONTACT' ? (
                  prevData.name === fullName.value &&
                  prevData.email === email.value &&
                  prevData.job === job.value &&
                  prevData.phoneNumber === phoneNumber.value ? (
                     <AlertModule
                        finalSubmit={finalSubmit}
                        showMessage={showMessage}
                        setShowMessage={setShowMessage}
                        payload={['NO-CHANGE']}
                        setShowError={setShowError}
                        text={'مقادیر را تغییر نداده اید'}
                     />
                  ) : (
                     <AlertModule
                        finalSubmit={finalSubmit}
                        showMessage={[
                           true,
                           'از ایجاد تغییرات مطمئن هستید ؟',
                           contact,
                        ]}
                        setShowMessage={setShowMessage}
                        payload={['WAS-REGISTERED']}
                        setShowError={setShowError}
                        text={''}
                     />
                  )
               ) : (
                  <AlertModule
                     finalSubmit={finalSubmit}
                     showMessage={showMessage}
                     setShowMessage={setShowMessage}
                     payload={['SEND', fullName.value]}
                     setShowError={setShowError}
                     text={
                        'این مخاطب قبلا در لیست مخاطبین ثبت شده است ، ایا قصد ویرایش دارید؟'
                     }
                  />
               )
            ) : null}

            <form
               onSubmit={submitHandler}
               className="flex flex-col gap-y-3 mt-10 maxXs:mt-8 px-20 maxXs:px-10 pt-16 maxXs:pt-10 pb-10 bg-[#D5AABD] shadowMor text-[#44122b] rounded-xl text-xl"
            >
               <div className="grid grid-cols-12">
                  <label
                     htmlFor="name"
                     className="col-span-4 maxMd:col-span-12  maxXs:text-base flex items-center"
                  >
                     نام و نام خانوادگی
                     <span className="text-[#c91616] mx-1 mb-3">*</span>:
                  </label>
                  <input
                     id="name"
                     onChange={(e) =>
                        validation([
                           e.target.value,
                           /^[a-zA-z\u0600-\u06FF\s\d]{4,20}$/,
                           setFullName,
                        ])
                     }
                     autoComplete="off"
                     ref={input}
                     value={fullName.value}
                     onFocus={() => focusHandler(fullName, setFullName)}
                     className="col-span-8 maxMd:col-span-12 p-2 bg-[#E3B9CC] rounded-md outline-[#D5AABD]"
                     type="text"
                  />

                  {fullName.focus ? (
                     <Alerts text={'این بخش نباید خالی بماند'} />
                  ) : !fullName.status ? (
                     <Alerts
                        text={
                           "تعداد کارکتر ' نام و نام خانوادگی ' باید بین 4 تا 20 کارکتر باشد"
                        }
                     />
                  ) : null}
               </div>
               <div className="grid grid-cols-12">
                  <label
                     htmlFor="email"
                     className="col-span-4 maxMd:col-span-12  maxXs:text-base flex items-center"
                  >
                     ایمیل<span className="text-[#c91616] mx-1 mb-3">*</span>:
                  </label>
                  <input
                     autoComplete="off"
                     id="email"
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
                     className="col-span-8 maxMd:col-span-12 p-2 bg-[#E3B9CC] rounded-md outline-[#D5AABD]"
                     type="text"
                  />
                  {email.focus ? (
                     <Alerts text={'این بخش نباید خالی بماند'} />
                  ) : !email.status ? (
                     <Alerts text={'ساختار ایمیل معتبر : example@gmail.com'} />
                  ) : null}
               </div>
               <div className="grid grid-cols-12">
                  <label
                     htmlFor="job"
                     className="col-span-4 maxMd:col-span-12  maxXs:text-base flex items-center"
                  >
                     شغل :
                  </label>
                  <input
                     autoComplete="off"
                     id="job"
                     onChange={(e) =>
                        validation([
                           e.target.value,
                           /^[a-zA-z\u0600-\u06FF\s\d]{4,20}$/,
                           setJob,
                        ])
                     }
                     value={job.value}
                     onBlur={() => blurHandler(job, setJob)}
                     onFocus={() => focusHandler(job, setJob)}
                     className="col-span-8 maxMd:col-span-12 p-2 bg-[#E3B9CC] rounded-md outline-[#D5AABD]"
                     type="text"
                  />
                  {job.focus ? (
                     <Alerts
                        text={
                           'بهتر است یک عبارت معتبر وارد کنید یا این بخش را خالی بگذارید'
                        }
                     />
                  ) : !job.status ? (
                     <Alerts
                        text={
                           "تعداد کارکتر ' شغل ' باید بین 4 تا 20 کارکتر باشد"
                        }
                     />
                  ) : null}
               </div>
               <div className="grid grid-cols-12">
                  <label
                     htmlFor="phone"
                     className="col-span-4 maxMd:col-span-12  maxXs:text-base flex items-center"
                  >
                     تلفن همراه :
                  </label>
                  <input
                     autoComplete="off"
                     id="phone"
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
                     className="col-span-8 maxMd:col-span-12 p-2 bg-[#E3B9CC] outline-[#D5AABD] rounded-md"
                     type="text"
                  />
                  {phoneNumber.focus ? (
                     <Alerts
                        text={
                           'بهتر است یک شماره معتبر وارد کنید یا این بخش را خالی بگذارید'
                        }
                     />
                  ) : !phoneNumber.status ? (
                     <Alerts
                        text={
                           "شماره همراه باید به صورت ' 09123456789 ' و 11 رقمی باشد"
                        }
                     />
                  ) : null}
               </div>
               <button
                  className="mt-7 bg-[#802348] hover:bg-[#802348]/90 maxXs:text-base text-white/90 hover:text-white w-fit mx-auto p-3 hover:scale-105 rounded-xl transition-all"
                  type="submit"
               >
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
