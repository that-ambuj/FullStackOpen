import React from 'react';

const Button = ({ text }) => <button type="submit">{text}</button>

const DisplayContact = ({ name, number }) => (<div>{name}, {number} <Button text="Delete" /></div>)

export default DisplayContact
