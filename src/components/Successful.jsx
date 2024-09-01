import { FaRegCheckCircle } from 'react-icons/fa';
function Successful({ text }) {
   return (
      <>
         <div id="successful" className="bg-[#0e9149] h-16 w-fit rounded-xl">
            <div className="w-fit px-7 py-4">
               <span className="flex gap-x-5 text-white">
                  {text}
                  <FaRegCheckCircle />
               </span>
            </div>
            <div className="py-1 rounded-b-full mb-4 bg-[#8bb69e] w-full h-1 successDiv"></div>
         </div>
      </>
   );
}

export default Successful;
