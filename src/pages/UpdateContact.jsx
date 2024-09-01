import { Link } from 'react-router-dom';
import Form from '../components/Form';


function UpdateContact() {
   return (
      <>
         <div className=" w-[70%] mx-auto mt-16 flex justify-between font-semibold font-DanaDemiBold">
            <span className="p-3 font-bold text-2xl text-[#44122b]">
               ویرایش اطلاعات
            </span>
            <Link
               to={'/'}
               className="flex gap-x-3 bg-[#e2b2c6] text-[#44122b] hover:bg-[#D5AABD] transition-all w-fit p-3 rounded-xl hover:"
            >
               <span className="mt-1">بازگشت به لیست مخاطبین</span>
               <img className="w-8" src="/contacts-svgrepo-com (1).svg" />
            </Link>
         </div>
         <Form submitType={'UPDATE-CONTACT'} />
      </>
   );
}

export default UpdateContact;
