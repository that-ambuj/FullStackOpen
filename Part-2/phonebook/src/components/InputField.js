import React from 'react';


const InputField = ({ text, value, onChange}) => {
    return (
      <div>{text} : <input value={value} onChange={onChange} required /></div>
    )
  }

export default InputField