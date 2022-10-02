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
import {
  useGetContactsQuery,
  useAddContactsMutation,
  useDeleteContactsMutation,
} from 'redux/contacts/contactsSlice';

export const App = () => {
  const dispatch = useDispatch();
  // const contacts = useSelector(selectors.selectContacts);
  const name = useSelector(selectors.selectFilterName);
  // const loading = useSelector(selectors.selectLoading);
  // const messageError = useSelector(selectors.selectErrorMessage);
  // const visibleContacts = useSelector(selectors.selectVisibleContacts);
  const { data: contacts, error } = useGetContactsQuery();
  const [addContactsMutator, { isError, error: e, isLoading }] =
    useAddContactsMutation();
  const [deleteContactMutator] = useDeleteContactsMutation();
  // console.log(error);
  // console.log("app",isLoading);
  // useEffect(() => {
  //   dispatch(operations.fetchContacts());
  // }, [dispatch]);

  const reviewNameInContacts = name => {
    return contacts.find(contact => contact.name === name);
  };

  const addContact = async contact => {
    try {
      await addContactsMutator(contact);
    } catch (error) {
      console.log(error);
    }
  };

  const removeContact = async removeContactId => {
    try {
      await deleteContactMutator(removeContactId);
    } catch (error) {
      console.log(error);
    }
  };

  const changeFilter = e => {
    dispatch(filter(e.currentTarget.value.trimStart()));
  };

  const getVisibleContacts = () => {
    if (!contacts) {
      return;
    }
    const filterNameNormalized = name.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterNameNormalized)
    );
  };

  const visibleContacts = getVisibleContacts();
  // console.log('vc', visibleContacts);

  return (
    <>
      <Section title="Phonebook">
        <PhonebookForm
          onAddContact={addContact}
          onReviewName={reviewNameInContacts}
        />
        <Spinner loading={isLoading} size={'56'} />
      </Section>
      <Section title="Contacts">
        <Filter
          filterHeader="Find contacts by name"
          value={name}
          onChange={changeFilter}
        />
        {isError && <Message message={error} />}
        {visibleContacts && (
          <Contacts
            contacts={visibleContacts}
            onRemoveContact={removeContact}
          />
        )}
      </Section>
    </>
  );
};
