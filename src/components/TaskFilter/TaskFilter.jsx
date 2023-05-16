import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './TaskFilter.css';

export default class TaskFilter extends Component {
  render() {
    const { changeFilter, filter } = this.props;

    return (
      <ul className="filters">
        <li>
          <button
            type="button"
            className={filter === 'All' ? 'selected' : null}
            onClick={() => changeFilter('All')}
          >
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => changeFilter('Active')}
            className={filter === 'Active' ? 'selected' : null}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => changeFilter('Completed')}
            className={filter === 'Completed' ? 'selected' : null}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}

TaskFilter.defaultProps = {
  filter: 'all',
};

TaskFilter.propTypes = {
  filter: PropTypes.string,
  changeFilter: PropTypes.func.isRequired,
};
