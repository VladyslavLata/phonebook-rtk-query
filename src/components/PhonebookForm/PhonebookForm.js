import { Formik, Form, Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { LabelName, AddButton } from './Phonebook.styled';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectLoading } from 'redux/contacts/selectors';

const ErrorText = styled(ErrorMessage)`
  color: red;
`;

const schema = yup.object().shape({
  name: yup
    .string()
    .strict()
    .trim()
    .min(1)
    .max(30)
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      'Name may contain only letters, apostrophe, dash and spaces'
    )
    .required(),
  phone: yup
    .string()
    .strict()
    .trim()
    .matches(
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{2}\)?)\s?-?\s?(\(?\d{2}\)?)?$/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required(),
});

const initialValues = {
  name: '',
  phone: '',
};

export const PhonebookForm = ({ onAddContact, onReviewName }) => {
  const loading = useSelector(selectLoading);
  const handleSubmit = (values, actions) => {
    if (onReviewName(values.name)) {
      alert(`${values.name} is already in contacts.`);
      return;
    }

    onAddContact({ ...values });
    actions.resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form>
        <label htmlFor="name">
          <LabelName>Name</LabelName>
          <Field autoComplete="off" type="text" name="name" />
          <ErrorText component="p" name="name" />
        </label>
        <label htmlFor="phone">
          <LabelName>Phone</LabelName>
          <Field type="tel" name="phone" />
          <ErrorText component="p" name="phone" />
        </label>
        <AddButton type="submit" disabled={loading}>
          Add contact
        </AddButton>
      </Form>
    </Formik>
  );
};

PhonebookForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
  onReviewName: PropTypes.func.isRequired,
};
