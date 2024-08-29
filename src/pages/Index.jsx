import { IoSettingsOutline } from 'react-icons/io5';
import { useContacts } from '../context/Contacts';

function Index() {
   const { state, dispatch } = useContacts();

   const editeHandler = (id) => {
      console.log('moz');
      location.pathname = `/contact/${id}`;
   };

   return (
      <div>
         <div>
            <span className="flex items-end">
               <img
                  className="w-10"
                  src="/contacts-svgrepo-com (1).svg"
                  alt=""
               />
               جستوجو در مخاطبین :
            </span>
            <input type="text" />
            <button>➕</button>
            <button>✔</button>
         </div>
         <table className="border border-black p-3 mx-auto w-full text-center">
            <thead>
               <tr>
                  <th className="border border-black p-3">نام</th>
                  <th className="border border-black p-3">ایمیل</th>
                  <th className="border border-black p-3">ایمیل</th>
               </tr>
            </thead>
            <tbody>
               {state.map((i) => (
                  <tr key={i.id}>
                     <td className="border border-black p-3">{i.name}</td>
                     <td className="border border-black p-3">{i.email}</td>
                     <td className="border-black w-fit p-3 flex justify-center gap-x-5">
                        <span
                           className="w-1 inline-block"
                           onClick={() => editeHandler(i.id)}
                        >
                           <IoSettingsOutline />
                        </span>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}

export default Index;
