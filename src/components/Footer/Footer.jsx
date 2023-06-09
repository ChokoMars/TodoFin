import React from 'react';
import PropTypes from 'prop-types';

import TaskFilter from '../TaskFilter/TaskFilter';

import './Footer.css';

function Footer({ toDo, changeFilter, filter, deleteCompleted }) {
  return (
    <footer className="footer">
      <span className="todo-count">
        {toDo}
        {' items left'}
      </span>
      <TaskFilter changeFilter={changeFilter} filter={filter} />
      <button type="button" className="clear-completed" onClick={deleteCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  toDo: 0,
  filter: 'all',
};

Footer.propTypes = {
  toDo: PropTypes.number,
  filter: PropTypes.string,
  changeFilter: PropTypes.func.isRequired,
  deleteCompleted: PropTypes.func.isRequired,
};

export default Footer;
