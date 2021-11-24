// import React from 'react';
import styled from 'styled-components';

// import './Button.css';

// we copy pasted the Button.css here with styled-components method
// The only difference is, we deleted the "button" indications
// in css section and replaced button:focus as &:focus

// styled-components ensures that the classes we create won't interfere
// with children component's in future. Imagine if a multiple people work
// on the same project, this ensures that all classes are unique to their
// components and not inherited to the other components.
const Button = styled.button`
  width: 100%;
  font: inherit;
  padding: 0.5rem 1.5rem;
  border: 1px solid #8b005d;
  color: white;
  background: #8b005d;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.26);
  cursor: pointer;

  @media(min-width: 768px) {
    width: auto;
  }

  &:focus
    outline: none;

  &:hover,
  &:active {
    background: #ac0e77;
    border-color: #ac0e77;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.26);
  }
`;

// const Button = props => {
//   return (
//     <button type={props.type} className="button" onClick={props.onClick}>
//       {props.children}
//     </button>
//   );
// };

export default Button;
