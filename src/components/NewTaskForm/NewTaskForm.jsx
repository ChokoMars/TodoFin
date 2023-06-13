import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

function NewTaskForm({ onItemAdded }) {
  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const onLabelChange = (event) => {
    setLabel(event.target.value);
  };

  const onMinutesChange = (e) => {
    setMin(e.target.value);
  };

  const onSecondsChange = (e) => {
    setSec(e.target.value);
  };

  const onSubmit = (e) => {
    if (e.key === 'Enter') {
      onItemAdded(label, min, sec);
      setLabel('');
      setMin('');
      setSec('');
    }
  };

  return (
    <form onKeyDown={onSubmit} className="new-todo-form">
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={onLabelChange}
        value={label}
      />
      <input
        type="number"
        className="new-todo-form__timer"
        placeholder="Min"
        value={min}
        onChange={onMinutesChange}
      />
      <input
        type="number"
        className="new-todo-form__timer"
        placeholder="Sec"
        value={sec}
        onChange={onSecondsChange}
      />
    </form>
  );
}

export default NewTaskForm;

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
};
