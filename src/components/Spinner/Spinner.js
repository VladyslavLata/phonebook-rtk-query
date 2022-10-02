import { RotatingLines } from 'react-loader-spinner';
import { SpinnerWrap } from './Spinner.styled';

export const Spinner = ({ loading, size }) => {
  return (
    <SpinnerWrap>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width={size}
        visible={loading}
      />
    </SpinnerWrap>
  );
};
