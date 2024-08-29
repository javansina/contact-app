import { Link } from 'react-router-dom';
import Form from '../components/Form';

function AddContact() {
   return (
      <>
         <Form submitType={'ADD-CONTACT'} />
         <Link to={'/contacts'}>asdf</Link>
      </>
   );
}

export default AddContact;
