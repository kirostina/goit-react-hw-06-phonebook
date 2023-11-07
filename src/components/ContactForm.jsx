import { nanoid } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactsSlice';
import Notiflix from 'notiflix';

function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(state => state.contacts.contacts);
  const dispatch = useDispatch();

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handleNumberChange = e => {
    setNumber(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (contacts.some(contact => contact.name === name)) {
      Notiflix.Notify.failure(`This contact is already in your phone list!`);
    } else {
      dispatch(addContact({ name, number, id: nanoid() }));
      setName('');
      setNumber('');
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          required
          value={name}
          onChange={handleNameChange}
        />
        <input
          type="tel"
          name="number"
          placeholder="Phone number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          required
          value={number}
          onChange={handleNumberChange}
        />
        <button type="submit">Add contact</button>
      </form>
    </>
  );
}

export default ContactForm;
