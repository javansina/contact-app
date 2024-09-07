import { Link } from 'react-router-dom';
import Form from '../components/Form';

function UpdateContact() {
   return (
      <>
         <div className="lg:w-[70%] mx-auto mt-16 maxXs:mt-8 flex justify-between">
            <span className="p-3 text-2xl maxXs:text-sm font-bold text-[#44122b]">
               ویرایش مخاطب
            </span>
            <Link
               to={'/'}
               className="flex gap-x-3 maxXs:gap-x-2 w-fit p-3 pl-3.5 bg-[#D5AABD] text-[#8b2659] hover:bg-[#e2b2c6] shadowMorL transition-all font-semibold rounded-xl"
            >
               <span className="mt-1 maxXs:text-xs text-nowrap">
                  بازگشت به لیست مخاطبین
               </span>
               <img
                  className="w-8 maxXs:w-5"
                  src="/contacts-svgrepo-com (1).svg"
               />
            </Link>
         </div>
         <Form submitType={'UPDATE-CONTACT'} />
      </>
   );
}

export default UpdateContact;
