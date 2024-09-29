/* eslint-disable react/prop-types */
import { useState } from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { LiaEditSolid } from 'react-icons/lia';
import { RiDeleteBinLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

function DetailsModal({ showDetails, setShowDeleteModal, setShowDetails }) {
   const [xSize, setXSize] = useState(false);

   return (
      <>
         <div className="text-bold absolute inset-0 flex items-center justify-center bg-[#cc8ca7]/30 text-2xl">
            <div className="moduleShadow relative flex flex-col gap-y-5 rounded-xl bg-[#E3B9CC] p-20 pb-16 text-pink-900">
               <button
                  className={`absolute ${xSize ? 'left-4.5 top-4.5' : 'left-5 top-5'}`}
                  onClick={() => setShowDetails([false, ''])}
                  onMouseMove={() => setXSize(true)}
                  onMouseLeave={() => setXSize(false)}
               >
                  <IoCloseCircleOutline
                     size={xSize ? 34 : 30}
                     color={xSize ? '#a32155' : '#721c3e'}
                  />
               </button>
               <div className="grid grid-cols-12 rounded-lg border border-white/20 bg-[#d3afc13c] px-5 py-3">
                  <span className="col-span-4 text-right font-DanaMedium">
                     نام :
                  </span>
                  <span className="col-span-8 pr-5 text-right font-DanaMedium">
                     {showDetails[1].name}
                  </span>
               </div>
               <div className="grid grid-cols-12 rounded-lg border border-white/20 bg-[#d3afc13c] px-5 py-3">
                  <span className="col-span-4 text-right font-DanaMedium">
                     ایمیل :
                  </span>
                  <span className="col-span-8 pr-5 text-right font-DanaMedium">
                     {showDetails[1].email}
                  </span>
               </div>
               <div className="grid grid-cols-12 rounded-lg border border-white/20 bg-[#d3afc13c] px-5 py-3">
                  <span className="col-span-4 text-right font-DanaMedium">
                     شغل :
                  </span>
                  <span className="col-span-8 pr-5 text-right font-DanaMedium">
                     {showDetails[1].job || '---'}
                  </span>
               </div>
               <div className="grid grid-cols-12 rounded-lg border border-white/20 bg-[#d3afc13c] px-5 py-3">
                  <span className="col-span-4 text-right font-DanaMedium">
                     تلفن همراه :
                  </span>
                  <span className="col-span-8 pr-5 text-right font-DanaMedium">
                     {showDetails[1].phoneNumber || '---'}
                  </span>
               </div>
               <div className="mt-5 flex justify-end">
                  <Link
                     className="flex items-center justify-between"
                     to={`/contact/${showDetails[1].id}`}
                  >
                     <div className="flex w-full justify-center">
                        <span className="rounded-md bg-[#a94d73] pb-3 pl-3 pr-2.5 pt-2.5 text-white hover:bg-[#d74680]">
                           <LiaEditSolid />
                        </span>
                     </div>
                     <span className="mx-5 h-full w-px bg-gray-300"></span>
                  </Link>
                  <span className="ml-0.5 flex items-center justify-center">
                     <span
                        className="rounded-md bg-[#a94d73] p-3 text-white/90 hover:bg-[#d74680]"
                        onClick={() => {

                           setShowDeleteModal([
                              true,
                              [showDetails[1].id],
                              'SINGLE',
                           ]);
                        }}
                     >
                        <RiDeleteBinLine />
                     </span>
                  </span>
               </div>
            </div>
         </div>
      </>
   );
}

export default DetailsModal;
