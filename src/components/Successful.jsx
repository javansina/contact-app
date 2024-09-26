/* eslint-disable react/prop-types */
import { FaRegCheckCircle } from 'react-icons/fa';
function Successful({ text }) {
   return (
      <>
         <div id="successful" className="h-16 w-fit rounded-xl bg-[#0e9149]">
            <div className="w-fit px-7 py-4">
               <span className="flex gap-x-5 text-white">
                  {text}
                  <FaRegCheckCircle />
               </span>
            </div>
            <div className="successDiv mb-4 h-1 w-full rounded-b-full bg-[#8bb69e] py-1"></div>
         </div>
      </>
   );
}

export default Successful;
