import { ContactForm } from 'components/ContactForm';
import { ContactsList } from 'components/ContactsList';

const ContactsPage = () => {
  return (
    <main>
      <ContactForm />
      <ContactsList />
    </main>
  );
};

export default ContactsPage;
