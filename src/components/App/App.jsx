/* eslint-disable */

import React, { useState } from 'react';

import Footer from '../Footer';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';

import './App.css';

function App() {
  let maxId = 0;

  function createTodoItem(label, min, sec, down) {
    let minValue = +min;
    let secValue = +sec;
    if (sec > 59) {
      minValue += Math.trunc(sec / 60);
      secValue -= Math.trunc(sec / 60) * 60;
    }
    return {
      label,
      completed: false,
      id: maxId++,
      edit: false,
      date: new Date(),
      min: minValue || 0,
      sec: secValue || 0,
      down,
      prevValue: '',
    };
  }

  const [todoData, setTodoData] = useState([
    createTodoItem('Drink Coffee'),
    createTodoItem('Make Awesome App'),
    createTodoItem('Have a lunch'),
  ]);

  const [filter, setFilter] = useState('all');

  const changeFilter = (data) => {
    setFilter(data);
  };

  const filteredItems = (todos, filter) => {
    switch (filter) {
      case 'All':
        return todos;

      case 'Active':
        return todos.filter((todo) => !todo.completed);

      case 'Completed':
        return todos.filter((todo) => todo.completed);

      default:
        return todos;
    }
  };

  const addItem = (text, min, sec) => {
    let newDown = false;
    if (min > 0 || sec > 0) {
      newDown = true;
    } else {
      newDown = false;
    }

    const newItem = createTodoItem(text, min, sec, newDown);

    if (text.trim().length <= 0) {
      return;
    }
    setTodoData((todoData) => {
      const newArray = [...todoData, newItem];

      return newArray;
    });
  };

  const deleteItem = (id) => {
    setTodoData(() => todoData.filter((item) => item.id !== id));
  };

  const onToggleCompleted = (event, id) => {
    if (
      event.target?.name === 'remove' ||
      event.target?.name === 'edit' ||
      event.target?.className === 'edit' ||
      event.target?.name === 'timer'
    ) {
      return;
    }

    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const oldItem = todoData[idx];
      const newItem = { ...oldItem, completed: !oldItem.completed };

      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      return newArray;
    });
  };

  const onToggleEdit = (id) => {
    setTodoData((todoData) =>
      todoData.map((el) => {
        if (el.id === id) {
          const prevValue = el.label;
          return (el = { ...el, edit: !el.edit, prevValue });
        }
        return el;
      }),
    );
  };

  const onEditItem = (ev, id) => {
    const text = ev.target.value;

    setTodoData((todoData) => {
      const newArr = todoData.slice();

      newArr.map((el) => {
        if (el.id === id) el.label = text;
        return el;
      });
      return newArr;
    });
  };

  const escFunction = (e, id) => {
    if (e.keyCode === 27) {
      setTodoData((todoData) => {
        const idx = todoData.findIndex((el) => el.id === id);
        const oldItem = todoData[idx];
        const newItem = { ...oldItem, label: oldItem.prevValue, edit: !oldItem.edit };

        const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

        return newArray;
      });
    }
  };

  const deleteCompleted = () => {
    setTodoData((todoData) => {
      const newArray = todoData.filter((item) => !item.completed);
      return newArray;
    });
  };

  const onSubmit = (ev, id) => {
    ev.preventDefault();
    onToggleEdit(id);
  };

  const completedCount = todoData.filter((el) => el.completed).length;
  const todoCount = todoData.length - completedCount;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onItemAdded={addItem} />
      </header>
      <section className="main">
        <TaskList
          escFunction={escFunction}
          todos={filteredItems(todoData, filter)}
          onDeleted={deleteItem}
          onToggleCompleted={onToggleCompleted}
          onEditItem={onEditItem}
          onToggleEdit={onToggleEdit}
          onSubmit={onSubmit}
        />
        <Footer
          toDo={todoCount}
          completed={completedCount}
          changeFilter={changeFilter}
          filter={filter}
          deleteCompleted={deleteCompleted}
        />
      </section>
    </section>
  );
}
export default App;
