/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';

function Input({ id, setstate, state, setShowError, regex }) {
   const input = useRef(null);

   useEffect(() => {
      if (id === 'name') {
         input.current.focus();
      }
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

   const focusHandler = (state, func) => {
      if (!state.value.length) {
         func((state) => ({ ...state, focus: true }));
      }
      setShowError(false);
   };

   const blurHandler = (state, func) => {
      if (id === 'name' || id === 'email') return;
      !state.value.length
         ? func((state) => ({ ...state, focus: false, status: true }))
         : state.status
           ? func((state) => ({ ...state, focus: false, status: true }))
           : func((state) => ({ ...state, focus: true, status: false }));
   };

   return (
      <input
         id={id}
         onChange={(e) => validation([e.target.value, regex, setstate])}
         autoComplete="off"
         ref={input}
         value={
            id === 'phone' || id === 'email' ? state.value.trim() : state.value
         }
         onFocus={() => focusHandler(state, setstate)}
         onBlur={() => blurHandler(state, setstate)}
         onKeyDown={(e) => {
            if (id === 'email' || id === 'phone') {
               if (e.key === ' ') {
                  e.preventDefault();
               }
            }
         }}
         className="col-span-8 rounded-md bg-[#E3B9CC] p-2 outline-[#D5AABD] maxMd:col-span-12"
         type={id === 'phone' ? 'number' : 'text'}
      />
   );
}

export default Input;
