import React, { useState } from "react";

export default function TextForm(props) {
  const [placeHold, setPlaceHold] = useState("Start typing...");
  const [text, setText] = useState("");

  const upperCase = () => {
    let newText = text.toUpperCase();
    setText(newText);
  };
  const lowerCase = () => {
    let newText = text.toLowerCase();
    setText(newText);
  };
  const handleSpace = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("Space removed","success");
  };
  const handleClear = () => {
    let newText = "";
    setText(newText);
  };
  const handleCopy = () => {
    /* Copy the text inside the text field */
    navigator.clipboard.writeText(text);

    props.showAlert("Text Copied","success");
  };

  const titleCase = () => {
    let str = document.getElementById("textBox").textContent;

   var splitStr = str.split(' ');
    for (var i = 0; i < splitStr.length; i++) {
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   
    setText(splitStr.join(' '));
}

  const handleChange = (event) => {
    setText(event.target.value);
    setPlaceHold("Type or Paste here..");
  };
  return (
    <div>
      <div className='my-3 '>
        <h2 className='form-label' htmlFor='textBox'>
          {props.heading}
        </h2>
        <textarea
          name=''
          resize="false"
          className='form-control my-3'
          id='textBox'
          cols='10'
          placeholder={placeHold}
          value={text}
          rows='10'
          onChange={handleChange} style={{ backgroundColor: props.mode === 'light' ? 'white' : 'rgb(4, 39, 67)', color: props.mode === 'light' ? 'black' : 'white'}}></textarea>
        <div className='d-flex justify-content-between w-10'>
          <button disabled={text.length === 0} className='btn btn-primary' onClick={upperCase}>
            UpperCase
          </button>
          <button className='btn btn-secondary' disabled={text.length === 0} onClick={lowerCase}>
            LowerCase
          </button>
          <button className='btn btn-success' onClick={titleCase} disabled={text.length === 0}>
            Capitalize
          </button>
          <button className='btn btn-info' onClick={handleCopy} disabled={text.length === 0}>
            Copy Whole Text
          </button>
          <button className='btn btn-warning' onClick={handleSpace} disabled={text.length === 0}>
            Remove Extra Space
          </button>
          <button className='btn btn-danger' onClick={handleClear} disabled={text.length === 0}>
            Clear All Text
          </button>
        </div>
      </div>
      <div className='mt-3'>
        <h1>Your Text Summary.</h1>
        <p>
          {text.split(/\s+/).filter((elem) => { return elem.length !== 0;}).length} words and {text.length} characters
        </p>
        <p>Reading time : {0.008 * text.split(/\s+/).filter((elem) => { return elem.length !== 0;}).length} </p>
      </div>
    </div>
  );
}
