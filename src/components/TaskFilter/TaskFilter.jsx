import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './TaskFilter.css';

export default class TaskFilter extends Component {
  buttons = [
    { name: 'All', label: 'All' },
    { name: 'Active', label: 'Active' },
    { name: 'Completed', label: 'Completed' },
  ];

  render() {
    const { changeFilter, filter } = this.props;

    const buttonsOut = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const classes = isActive ? 'selected' : null;
      return (
        <li key={name}>
          <button type="button" className={classes} onClick={() => changeFilter(name)}>
            {label}
          </button>
        </li>
      );
    });

    return <ul className="filters">{buttonsOut}</ul>;
  }
}

TaskFilter.defaultProps = {
  filter: 'all',
};

TaskFilter.propTypes = {
  filter: PropTypes.string,
  changeFilter: PropTypes.func.isRequired,
};
