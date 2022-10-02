import PropTypes from 'prop-types';
import { Box } from 'components/Box/Box';

export const Message = ({ message }) => {
  return (
    <Box as="p" p={4} color={'red'}>
      {message}
    </Box>
  );
};

Message.propTypes = {
  message: PropTypes.string.isRequired,
};
