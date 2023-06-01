import React from 'react';
import PropTypes from 'prop-types';

import Task from '../Task/Task';

import './TaskList.css';

function TaskList({ todos, onDeleted, onToggleCompleted, onEditItem, onToggleEdit, onSubmit }) {
  const elements = todos.map((item) => {
    const { edit, id, ...itemProps } = item;
    const a = 'b';
    let classNames = '';

    if (edit) {
      classNames = 'editing';
    }

    return (
      <li key={id} className={classNames}>
        <div className="pres" onClick={(event) => onToggleCompleted(event, id)} role="presentation">
          <Task
            onSubmit={onSubmit}
            {...itemProps}
            onDeleted={() => onDeleted(id)}
            onEditItem={onEditItem}
            onToggleEdit={() => onToggleEdit(id)}
            edit={edit}
            id={id}
          />
        </div>
      </li>
    );
  });

  return <ul className="todo-list">{elements}</ul>;
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      completed: PropTypes.bool,
      edit: PropTypes.bool,
      id: PropTypes.number,
      date: PropTypes.instanceOf(Date),
    }),
  ).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  onToggleEdit: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default TaskList;
