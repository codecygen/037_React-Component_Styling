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

Importing CSS in a Normal Way
===

This method is pretty straightforward but downside is, the classnames are included in the entire HTML. So if someone is working on another component, he may want to edit that component's classnames in a different way but since, lets say he gives the name ".button" to his class in his own css file there will be a classname ".button" duplication which will mess up the things.

Button.js

```
import React from 'react';
import './Button.css';

const Button = props => {
  return (
    <button type={props.type} className="button" onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
```

Button.css

```
.button {
  width: 100%;
  font: inherit;
  padding: 0.5rem 1.5rem;
  border: 1px solid #8b005d;
  color: white;
  background: #8b005d;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.26);
  cursor: pointer;
}

.button:focus {
  outline: none;
}

.button:hover,
.button:active {
  background: #ac0e77;
  border-color: #ac0e77;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.26);
}

@media(min-width: 768px) {
  .button {
    width: auto;
  }
}
```

Modular CSS Classes
===
In this method, when you import the css module the actual ".button" class will be renamed as a unique name in actual HTML file that is created. For example it renamed .button class as ".Button_button__2lgkF" in my example when I right click and inspect the entire HTML code on browser.

Only thing you have to take into account is, you have to rename the css modules with ".module." section. Instead of naming your css file as "Button.css", you have to name it as "Button.module.css" so when importing, React will know that it has to assign a unique class name for the class that is written in "Button.module.css".

Button.js
```
import React from 'react';
import classes from './Button.module.css';

const Button = props => {
  return (
    <button type={props.type} className={classes.button} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
```
Button.module.css (you have to put .modules. section when renaming otherwise it wont work.)

```
.button {
  width: 100%;
  font: inherit;
  padding: 0.5rem 1.5rem;
  border: 1px solid #8b005d;
  color: white;
  background: #8b005d;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.26);
  cursor: pointer;
}

.button:focus {
  outline: none;
}

.button:hover,
.button:active {
  background: #ac0e77;
  border-color: #ac0e77;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.26);
}

@media(min-width: 768px) {
  .button {
    width: auto;
  }
}
```

As you have seen, the default class calling is given down below,

```
<button className={classes.button}>
```

In this method, don't forget that if the class name is with dash "form-control", you have to use something like this to call it.

```
<div className={classes['form-control']}>
```

Alternatively for a conditional css rendering, this has to be used.

```
{/* Instead of this, */}
{/* <div className={`form-control ${!isValid ? 'invalid' : ''}`}> */}
{/* Use this, */}
<div className={`${classes['form-control']} ${!isValid && classes.invalid}`}>
```

Styled-Components Package
===
This is a package that you can install with
npm i styled-components

styled-components ensures that the classes we create won't interfere with other classes in future as the css modules are all imported one by one to form to page so any prior class that has same name in another css file will interfere with the other css file's same class name. Imagine if a multiple people work on the same project, this ensures that all classes are unique to their components and not inherited to the other components.

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

Styled-Components Package with Props
===
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

Styled-Components Package with Responsive Design
===
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

