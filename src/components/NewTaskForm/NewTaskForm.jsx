import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  state = {
    label: '',
    min: '',
    sec: '',
  };

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value,
    });
  };

  onMinutesChange = (e) => {
    this.setState({
      min: e.target.value,
    });
  };

  onSecondsChange = (e) => {
    this.setState({
      sec: e.target.value,
    });
  };

  onSubmit = (e) => {
    if (e.key === 'Enter') {
      const { onItemAdded } = this.props;
      const { label, min, sec } = this.state;
      onItemAdded(label, min, sec);
      this.setState({
        label: '',
        min: '',
        sec: '',
      });
    }
  };

  render() {
    const { label, min, sec } = this.state;
    return (
      <form onKeyDown={this.onSubmit} className="new-todo-form">
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          value={label}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          value={min}
          onChange={this.onMinutesChange}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          value={sec}
          onChange={this.onSecondsChange}
        />
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
};
