import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Section } from './Section/Section';
import { PhonebookForm } from './PhonebookForm/PhonebookForm';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import { Spinner } from './Spinner/Spinner';
import { filter } from 'redux/contacts/contactsSlice';
import { operations, selectors } from 'redux/contacts';
import { Message } from './Message/Message';
import { useGetContactsQuery } from 'redux/contacts/contactsSlice';

export const App = () => {
  const dispatch = useDispatch();
  // const contacts = useSelector(selectors.selectContacts);
  const name = useSelector(selectors.selectFilterName);
  // const loading = useSelector(selectors.selectLoading);
  // const messageError = useSelector(selectors.selectErrorMessage);
  // const visibleContacts = useSelector(selectors.selectVisibleContacts);
  const { data: contacts } = useGetContactsQuery();

  // useEffect(() => {
  //   dispatch(operations.fetchContacts());
  // }, [dispatch]);

  const reviewNameInContacts = name => {
    return contacts.find(contact => contact.name === name);
  };

  const addContact = contact => {
    dispatch(operations.addNewContact(contact));
  };

  const removeContact = removeContactId => {
    dispatch(operations.deleteContact(removeContactId));
  };

  const changeFilter = e => {
    dispatch(filter(e.currentTarget.value.trimStart()));
  };

  return (
    <>
      <Section title="Phonebook">
        <PhonebookForm
          onAddContact={addContact}
          onReviewName={reviewNameInContacts}
        />
        {/* <Spinner loading={loading} size={'56'} /> */}
      </Section>
      <Section title="Contacts">
        <Filter
          filterHeader="Find contacts by name"
          value={name}
          onChange={changeFilter}
        />
        {/* {messageError && <Message message={messageError} />} */}
        {
          // contacts.length > 0 &&
          <Contacts onRemoveContact={removeContact} />
        }
      </Section>
    </>
  );
};
