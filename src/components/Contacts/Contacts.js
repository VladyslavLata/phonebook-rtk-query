import PropTypes from 'prop-types';
import { Box } from 'components/Box/Box';
import { Number } from './Contacts.styled';
import { ButtonDelete } from 'components/ButtonDelete/ButtonDelete';
// import { useSelector } from 'react-redux';
// import { selectVisibleContacts } from 'redux/contacts/selectors';
import { useGetContactsQuery } from 'redux/contacts/contactsSlice';

export const Contacts = ({ onRemoveContact, contacts }) => {
  // const visibleContacts = useSelector(selectVisibleContacts);
  // const { data: contacts } = useGetContactsQuery();
  return (
    <Box as="ul" py={4}>
      {contacts &&
        contacts.map(({ name, phone, id }) => (
          <Box
            as="li"
            p={3}
            display="flex"
            width="300px"
            justifyContent="space-between"
            alignItems="center"
            key={id}
          >
            <div>
              <h3>{name}</h3>
              <Number>{phone}</Number>
            </div>
            <ButtonDelete onRemoveContact={onRemoveContact} id={id}>
              Delete
            </ButtonDelete>
          </Box>
        ))}
    </Box>
  );
};

// Contacts.propTypes = {
//   onRemoveContact: PropTypes.func.isRequired,
// };
