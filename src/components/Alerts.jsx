/* eslint-disable react/prop-types */
import { FaExclamationCircle } from 'react-icons/fa';

function Alerts({ text }) {
   return (
      <div className="col-span-8 col-end-13 mt-3 maxMd:col-span-12">
         <div className="flex items-center justify-end gap-x-2 pl-1.5 pt-2 font-light text-[#4b4348] maxXs:text-sm">
            {text}
            <div className="w-4">
               <FaExclamationCircle color="#c91616" />
            </div>
         </div>
      </div>
   );
}

export default Alerts;
