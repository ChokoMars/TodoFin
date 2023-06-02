import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import KG from 'date-fns/locale/en-AU';
import PropTypes from 'prop-types';

import './Task.css';
/* eslint-disable */

export default class Task extends Component {
  state = {
    min: this.props.min,
    sec: this.props.sec,
    timer: false,
    down: this.props.down,
    revertValue: '',
  };

  componentDidMount() {
    this.timerID = setInterval(() => this.changeTimer(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  changeTimer = () => {
    if (!this.state.timer) {
      return;
    }

    let { min, sec, down } = this.state;

    if (down) {
      console.log('вниз');
      if (sec <= 0) {
        if (min === 0) {
          return;
        }
        min--;
        sec = 59;
      } else {
        sec--;
      }
      this.setState({ min, sec });
    } else {
      console.log('вверх');
      if (sec === 60) {
        min++;
      }
      sec++;
      this.setState({ min, sec });
    }
  };

  playTimer = () => {
    this.setState({ timer: true });
  };

  pauseTimer = () => {
    this.setState({ timer: false });
  };

  render() {
    const { onDeleted, label, completed, onEditItem } = this.props;
    const { onToggleEdit, edit, id, onSubmit, date, escFunction } = this.props;
    const { min, sec } = this.state;
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
              <span className="title">{label}</span>
              <span className="description">
                <button
                  type="button"
                  name="timer"
                  className="icon icon-play"
                  onClick={this.playTimer}
                />
                <button
                  type="button"
                  name="timer"
                  className="icon icon-pause"
                  onClick={this.pauseTimer}
                />
                <span className="timer">
                  {min}:{sec}
                </span>
              </span>

              <span className="description">
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
              onClick={() => this.setState({ revertValue: label })}
              onKeyDown={(ev) => escFunction(ev, id)}
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
