import { Link } from 'react-router-dom';
import Form from '../components/Form';

function AddContact() {
   return (
      <>
         <div className=" w-[70%] mx-auto mt-16 flex justify-between">
            <span className="p-3 font-bold text-2xl text-[#44122b]">
               فرم مخاطب جدید
            </span>
            <Link
               to={'/'}
               className="flex gap-x-3 w-fit p-3 pl-3.5 bg-[#D5AABD] text-[#8b2659] hover:bg-[#e2b2c6] shadowMorL transition-all font-semibold rounded-xl"
            >
               <span className="mt-1">بازگشت به لیست مخاطبین</span>
               <img className="w-8" src="/contacts-svgrepo-com (1).svg" />
            </Link>
         </div>
         <Form submitType={'ADD-CONTACT'} />
      </>
   );
}

export default AddContact;
