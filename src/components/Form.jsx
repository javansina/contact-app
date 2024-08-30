import { useEffect, useState } from 'react';
import { useContacts } from '../context/Contacts';
import { Link, useParams } from 'react-router-dom';
function Form({ submitType }) {
   const { state, dispatch } = useContacts();
   const params = useParams();
   const [contactData] = state.filter((i) => i.id === +params.id);
   const prevData = contactData;
   console.log(state);
   console.log(params.id);
   console.log(prevData);
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
            id: submitType === 'UPDATE-CONTACT' ? +params.id : idMaker(),
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
         <Link to={'/'}>dsfas</Link>
         {showError ? (
            submitType === 'UPDATE-CONTACT' ? (
               prevData.name === fullName.value ? (
                  <h1>مقادیر را تغییر نداده اید</h1>
               ) : (
                  <h1>این مقدار قبلا ثبت شده است</h1>
               )
            ) : (
               <h1>
                  این مخاطب قبلا در لیست مخاطبین ثبت شده است ، ایا قصد ویرایش
                  دارید؟
               </h1>
            )
         ) : null}
         <form onSubmit={submitHandler} className="flex flex-col gap-y-5 mt-10">
            <div className="flex gap-x-5">
               <p>
                  نام و نام خانوادگی <span>*</span> :
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
                  className="bg-slate-400"
                  type="text"
               />
               {fullName.focus ? (
                  <h1 className="bg-red-400 text-white">
                     این بخش نباید خالی بماند
                  </h1>
               ) : !fullName.status ? (
                  <h1 className="bg-red-400 text-white">
                     تعداد کارکتر &apos; نام و نام خانوادگی &apos; باید بین 4 تا
                     20 کارکتر باشد
                  </h1>
               ) : null}
            </div>
            <div className="flex gap-x-5">
               <p>
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
                  className="bg-slate-400"
                  type="text"
               />
               {email.focus ? (
                  <h1 className="bg-red-400 text-white">
                     این بخش نباید خالی بماند
                  </h1>
               ) : !email.status ? (
                  <h1 className="bg-red-400 text-white">
                     ساختار ایمیل معتبر : example@gmail.com
                  </h1>
               ) : null}
            </div>
            <div className="flex gap-x-5">
               <span>شغل :</span>
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
                  className="bg-slate-400"
                  type="text"
               />
               {job.focus ? (
                  <h1 className="bg-red-400 text-white">
                     بهتر است یک عبارت معتبر وارد کنید یا این بخش را خالی
                     بگذارید
                  </h1>
               ) : !job.status ? (
                  <h1 className="bg-red-400 text-white">
                     تعداد کارکتر &apos; شغل &apos; باید بین 4 تا 20 کارکتر باشد
                  </h1>
               ) : null}
            </div>
            <div className="flex gap-x-5">
               <span>تلفن همراه :</span>
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
                  placeholder="091 111 11 11"
                  className="bg-slate-400"
                  type="text"
               />
               {phoneNumber.focus ? (
                  <h1 className="bg-red-400 text-white">
                     بهتر است یک شماره معتبر وارد کنید یا این بخش را خالی
                     بگذارید
                  </h1>
               ) : !phoneNumber.status ? (
                  <h1 className="bg-red-400 text-white">
                     شماره همراه باید به صورت &apos; 09123456789 &apos; و 11
                     رقمی باشد
                  </h1>
               ) : null}
            </div>
            <button type="submit">
               {submitType === 'ADD-CONTACT'
                  ? 'افزودن مخاطب'
                  : 'ویرایش اطلاعات'}
            </button>
         </form>
      </>
   );
}

export default Form;
