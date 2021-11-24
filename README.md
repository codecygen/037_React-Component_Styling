Checking if the entered String is all whitespace.
```
String.trim().length === 0
```

unshift is a good Javascript method

```
updatedGoals.unshift({ text: enteredText, id: Math.random().toString() });
```

Dynamic Inline Styling
===
Not preferable. It duplicates css codes as you give same codes in a css file and inline as well.

```
<label style={{color: !isValid ? 'red' : 'black'}}>Course Goal</label>
```

Dynamic CSS Classes
===

JSX File
```
<div className={`form-control ${!isValid ? 'invalid' : ''}`}>
    ...
    ...
</div>
```

CSS File
```
.form-control.invalid input {
  border-color: red;
  background: #ffd7d7;
}

.form-control.invalid label {
  color: red;
}
```

Styled-Components Package
===
This is a package that you can install with
npm i styled-components

styled-components ensures that the classes we create won't interfere with children component's in future. Imagine if a multiple people work on the same project, this ensures that all classes are unique to their components and not inherited to the other components.

Example CourseInput.js
```
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../UI/Button/Button';

// Here form-control class removed on the main section of css
// Also form-control class on other places replaced with &.
const FormControl = styled.div`
  margin: 0.5rem 0;

  & label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
  }

  & input {
    display: block;
    width: 100%;
    border: 1px solid #ccc;
    font: inherit;
    line-height: 1.5rem;
    padding: 0 0.25rem;
  }

  & input:focus {
    outline: none;
    background: #fad0ec;
    border-color: #8b005d;
  }

  &.invalid input {
    border-color: red;
    background: #ffd7d7;
  }

  &.invalid label {
    color: red;
  }
`;

const CourseInput = props => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const goalInputChangeHandler = event => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setEnteredValue(event.target.value);
  };

  const formSubmitHandler = event => {
    event.preventDefault();
    if (enteredValue.trim().length === 0) {
      setIsValid(false);
      return;
    }
    props.onAddGoal(enteredValue);
  };

  return (
    <form onSubmit={formSubmitHandler}>
      {/* Since form-control class already added
      we have to only add "isValid? && 'invalid
      Check original CourseInput.js for more info on
      how the conditional statement set in normal app." */}
      <FormControl className={isValid? && 'invalid'}>
        <label>Course Goal</label>
        <input 
          type="text" 
          onChange={goalInputChangeHandler} 
        />
      <FormControl />
      <Button type="submit">Add Goal</Button>
    </form>
  );
};

export default CourseInput;
```

We can also pass props for styled components

```
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../UI/Button/Button';

// Here form-control class removed on the main section of css
// Also form-control class on other places replaced with &.
const FormControl = styled.div`
  margin: 0.5rem 0;

  & label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
    color: ${props => (props.invalid ? 'red' : 'black')}
  }

  & input {
    display: block;
    width: 100%;
    border: 1px solid ${props => (props.invalid ? 'red' : '#ccc')};
    background: ${props => (props.invalid ? '#ffd7d7' : 'transparent')}
    font: inherit;
    line-height: 1.5rem;
    padding: 0 0.25rem;
  }

  & input:focus {
    outline: none;
    background: #fad0ec;
    border-color: #8b005d;
  }
`;

const CourseInput = props => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const goalInputChangeHandler = event => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setEnteredValue(event.target.value);
  };

  const formSubmitHandler = event => {
    event.preventDefault();
    if (enteredValue.trim().length === 0) {
      setIsValid(false);
      return;
    }
    props.onAddGoal(enteredValue);
  };

  return (
    <form onSubmit={formSubmitHandler}>
      {/* Here we pass props */}
      <FormControl invalid={!isValid}}>
        <label>Course Goal</label>
        <input 
          type="text" 
          onChange={goalInputChangeHandler} 
        />
      <FormControl />
      <Button type="submit">Add Goal</Button>
    </form>
  );
};

export default CourseInput;
```

styled-components can also be set up for responsive designs
This is the content of Button.js

```
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
```