import { Link } from 'react-router-dom';
import Form from '../components/Form';

function UpdateContact() {
   return (
      <>
         <div className="mx-auto mt-20 flex justify-between lg:w-[70%]">
            <span className="maxXs:text-md p-3 text-2xl font-bold text-[#44122b]">
               ویرایش مخاطب
            </span>
            <Link
               to={'/'}
               className="shadowMorL flex w-fit gap-x-3 rounded-xl bg-[#D5AABD] p-3 pl-3.5 font-semibold text-[#8b2659] transition-all hover:bg-[#e2b2c6] maxXs:gap-x-2"
            >
               <span className="mr-2 mt-2 text-nowrap maxXs:text-xs">
                  لیست مخاطبین
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
