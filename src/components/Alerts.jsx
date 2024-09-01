import { FaExclamationCircle } from 'react-icons/fa';

function Alerts({ text }) {
   return (
      <div className="col-span-12 mt-3">
         <span className="flex justify-end items-center gap-x-2 font-light text-[#4b4348] p-2 pl-0">
            {text}
            <FaExclamationCircle color="#c91616" />
         </span>
      </div>
   );
}

export default Alerts;
