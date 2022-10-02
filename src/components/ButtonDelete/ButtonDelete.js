import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from './ButtonDelete.styled';
import { Spinner } from 'components/Spinner/Spinner';
import { selectErrorMessage } from 'redux/contacts/selectors';

export const ButtonDelete = ({ onRemoveContact, id, children }) => {
  const [loading, setLoading] = useState(false);
  const error = useSelector(selectErrorMessage);
  if (error) {
    setLoading(false);
  }
  return (
    <Button
      type="button"
      disabled={loading}
      onClick={() => {
        setLoading(true);
        onRemoveContact(id);
      }}
    >
      <Spinner loading={loading} size={'24'} />
      {children}
    </Button>
  );
};
