import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import KG from 'date-fns/locale/en-AU';
import PropTypes from 'prop-types';

import './Task.css';
/* eslint-disable */

function Task({
  onToggleEdit,
  edit,
  id,
  onSubmit,
  date,
  escFunction,
  onDeleted,
  label,
  completed,
  onEditItem,
  down,
  min,
  sec,
}) {
  const [[mins, secs], setTime] = useState([min, sec]);
  const [timer, setTimer] = useState(false);
  const [timerDown, setTimerDown] = useState(down);
  const [revertValue, setRevertValue] = useState('');

  useEffect(() => {
    const timerID = setInterval(() => changeTimer(), 1000);
    return () => clearInterval(timerID);
  }, [changeTimer]);

  function changeTimer() {
    if (!timer) {
      return;
    }

    if (timerDown) {
      if (secs <= 0) {
        if (mins === 0) {
          return;
        }
        setTime([mins - 1, 59]);
      } else {
        setTime([mins, secs - 1]);
      }
    } else {
      if (secs === 60) {
        setTime([mins + 1, 0]);
      } else {
        setTime([mins, secs + 1]);
      }
    }
  }

  const playTimer = () => {
    setTimer(true);
  };

  const pauseTimer = () => {
    setTimer(false);
  };

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
              <button type="button" name="timer" className="icon icon-play" onClick={playTimer} />
              <button type="button" name="timer" className="icon icon-pause" onClick={pauseTimer} />
              <span className="timer">
                {mins}:{secs}
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
            onClick={() => setRevertValue(label)}
            onKeyDown={(ev) => escFunction(ev, id)}
            onChange={(ev) => onEditItem(ev, id)}
          />
        </form>
      )}
    </>
  );
}

export default Task;

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
