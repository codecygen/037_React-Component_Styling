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