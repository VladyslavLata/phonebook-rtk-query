import styled from 'styled-components';

export const Button = styled.button`
  position: relative;
  padding: ${p => p.theme.space[2]}px;
  border-radius: ${p => p.theme.radii.sm};
  cursor: pointer;

  &:active {
    background-color: ${p => p.theme.colors.accent};
  }
`;
