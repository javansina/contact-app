/* eslint-disable no-useless-escape */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useContacts } from '../context/Contacts';
import { useParams } from 'react-router-dom';

import Alerts from './Alerts';
import AlertModule from './AlertModule';
import axios from 'axios';
import { FaRegCheckCircle } from 'react-icons/fa';
import Input from './Input';

function Form({ submitType }) {
   const { state, dispatch } = useContacts();
   const { id } = useParams();
   const [contactData] = state.filter((i) => i.id === id);
   let prevData = contactData;

   const [successMessage, setSuccessMessage] = useState([false, '', '']);
   const [showMessage, setShowMessage] = useState([false, '']);
   const [showError, setShowError] = useState(false);

   const [fullName, setFullName] = useState({
      value: '',
      status: true,
      focus: false,
      submitStatus: false,
   });
   const [email, setEmail] = useState({
      value: prevData?.email || '',
      status: true,
      focus: false,
      submitStatus: false,
   });
   const [job, setJob] = useState({
      value: prevData?.job || '',
      status: true,
      focus: false,
      submitStatus: false,
   });
   const [phoneNumber, setPhoneNumber] = useState({
      value: prevData?.phoneNumber || '',
      status: true,
      focus: false,
      submitStatus: false,
   });

   useEffect(() => {
      if (contactData) {
         setFullName((state) => ({
            ...state,
            value: contactData.name || '',
         }));
         setEmail((state) => ({
            ...state,
            value: contactData.email || '',
         }));
         setJob((state) => ({ ...state, value: contactData.job || '' }));
         setPhoneNumber((state) => ({
            ...state,
            value: contactData.phoneNumber || '',
         }));
      }
   }, [contactData]);

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

   const importantSubList = [
      { state: fullName, stateFunction: setFullName },
      { state: email, stateFunction: setEmail },
   ];

   const contact = {
      id: submitType === 'UPDATE-CONTACT' ? id : `${idMaker()}`,
      name: fullName.value.trim(),
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

      if (invalids.length > 0) {
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
   const [timeoutId, setTimeoutId] = useState(null);
   const finalSubmit = async (contact) => {
      if (timeoutId) {
         clearTimeout(timeoutId);
      }
      setTimeout(() => {
         setSuccessMessage((state) => {
            const [a, b] = state;
            return [a, b, 'successDiv'];
         });
      }, 10);

      const newTimeoutId = setTimeout(() => {
         setSuccessMessage([false, '', '']);
      }, 3000);

      setTimeoutId(newTimeoutId);

      if (submitType === 'UPDATE-CONTACT') {
         axios
            .patch(`http://localhost:3000/contacts/${contact.id}`, contact)
            .then(() => {
               return axios.get('http://localhost:3000/contacts');
            })
            .then((res) => {
               dispatch({
                  type: 'SET-CONTACTS',
                  payload: res.data,
               });
            })
            .catch((error) => {
               console.log('Error:', error);
            });
      } else {
         axios
            .post('http://localhost:3000/contacts', {
               ...contact,
            })
            .then(() => {
               return axios.get('http://localhost:3000/contacts');
            })
            .then((res) => {
               dispatch({
                  type: 'SET-CONTACTS',
                  payload: res.data,
               });
            })
            .catch((error) => {
               console.log('Error:', error);
            });
      }
   };

   return (
      <>
         <div className="mx-auto font-semibold lg:w-[70%]">
            {showMessage[0] && !showError && (
               <AlertModule
                  finalSubmit={finalSubmit}
                  showMessage={showMessage}
                  setSuccessMessage={setSuccessMessage}
                  setShowMessage={setShowMessage}
                  payload={[0]}
                  setShowError={() => {}}
                  text={''}
               />
            )}
            {showError &&
               (submitType === 'UPDATE-CONTACT' ? (
                  prevData.name === fullName.value &&
                  prevData.email === email.value &&
                  prevData.job === job.value &&
                  prevData.phoneNumber === phoneNumber.value ? (
                     <AlertModule
                        finalSubmit={finalSubmit}
                        showMessage={showMessage}
                        setShowMessage={setShowMessage}
                        setSuccessMessage={setSuccessMessage}
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
                        setSuccessMessage={setSuccessMessage}
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
                     setSuccessMessage={setSuccessMessage}
                     payload={['SEND', fullName.value]}
                     setShowError={setShowError}
                     text={
                        'این مخاطب قبلا در لیست مخاطبین ثبت شده است ، ایا قصد ویرایش دارید؟'
                     }
                  />
               ))}
            {successMessage[0] && (
               <div
                  id="successful"
                  className="absolute top-1 h-16 w-fit rounded-xl bg-[#0e9149]"
               >
                  <div className="w-fit px-7 py-4">
                     <span className="flex gap-x-5 text-white">
                        {successMessage[1]}
                        <FaRegCheckCircle />
                     </span>
                  </div>
                  <div
                     className={`mb-4 h-1 w-full rounded-b-full bg-[#8bb69e] py-1 ${successMessage[2]}`}
                  ></div>
               </div>
            )}
            <form
               onSubmit={submitHandler}
               className="shadowMor mt-10 flex flex-col gap-y-3 rounded-xl bg-[#D5AABD] px-20 pb-10 pt-16 text-xl text-[#44122b] maxXs:mt-8 maxXs:px-10 maxXs:pt-10"
            >
               <div className="grid grid-cols-12">
                  <label
                     htmlFor="name"
                     className="col-span-4 flex items-center maxXs:text-base maxMd:col-span-12"
                  >
                     نام و نام خانوادگی
                     <span className="mx-1 mb-3 text-[#c91616]">*</span>:
                  </label>
                  <Input
                     id="name"
                     setstate={setFullName}
                     state={fullName}
                     setShowError={setShowError}
                     regex={/^[a-zA-z\u0600-\u06FF\s\d]{4,20}$/}
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
                     className="col-span-4 flex items-center maxXs:text-base maxMd:col-span-12"
                  >
                     ایمیل<span className="mx-1 mb-3 text-[#c91616]">*</span>:
                  </label>
                  <Input
                     id="email"
                     setstate={setEmail}
                     state={email}
                     setShowError={setShowError}
                     regex={/^[\w_\.]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/}
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
                     className="col-span-4 flex items-center maxXs:text-base maxMd:col-span-12"
                  >
                     شغل :
                  </label>
                  <Input
                     id="job"
                     setstate={setJob}
                     state={job}
                     setShowError={setShowError}
                     regex={/^[a-zA-z\u0600-\u06FF\s\d]{4,20}$/}
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
                     className="col-span-4 flex items-center maxXs:text-base maxMd:col-span-12"
                  >
                     تلفن همراه :
                  </label>
                  <Input
                     id="phone"
                     setstate={setPhoneNumber}
                     state={phoneNumber}
                     setShowError={setShowError}
                     regex={/^09[\d]{9}$/}
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
                  className="mx-auto mt-7 w-fit rounded-xl bg-[#802348] p-3 text-white/90 transition-all hover:scale-105 hover:bg-[#802348]/90 hover:text-white maxXs:text-base"
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
