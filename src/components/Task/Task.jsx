import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import KG from 'date-fns/locale/en-AU';
import PropTypes from 'prop-types';

import './Task.css';

export default class Task extends Component {
  render() {
    const { onDeleted, label, completed, onEditItem } = this.props;
    const { onToggleEdit, edit, id, onSubmit, date } = this.props;
    let classNames = 'Task';

    if (completed) {
      classNames += ' completed';
    }

    return (
      <>
        <div className="view">
          <div className={classNames}>
            <input className="toggle" type="checkbox" checked={completed} readOnly />
            <label htmlFor={id}>
              <span className="description">{label}</span>
              <span className="created">
                {`created ${formatDistanceToNow(date, {
                  includeSeconds: true,
                  locale: KG,
                  addSuffix: true,
                })}`}
              </span>
            </label>
            <button
              type="button"
              aria-label="Edit"
              className="icon icon-edit"
              name="edit"
              onClick={onToggleEdit}
            />
            <button
              type="button"
              aria-label="Remove"
              className="icon icon-destroy"
              name="remove"
              onClick={onDeleted}
            />
          </div>
        </div>
        {edit && (
          <form onSubmit={(ev) => onSubmit(ev, id)}>
            <input
              type="text"
              className="edit"
              value={label}
              onChange={(ev) => onEditItem(ev, id)}
            />
          </form>
        )}
      </>
    );
  }
}

Task.defaultProps = {
  completed: false,
  edit: false,
};

Task.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool,
  edit: PropTypes.bool,
  date: PropTypes.instanceOf(Date).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
  onToggleEdit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
