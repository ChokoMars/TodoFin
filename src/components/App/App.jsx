import React, { Component } from 'react';

import Footer from '../Footer';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';

import './App.css';

export default class App extends Component {
  maxId = 0;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch'),
    ],
    filter: 'all',
  };

  changeFilter = (data) => {
    this.setState({ filter: data });
  };

  filteredItems = (todos, filter) => {
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

  addItem = (text, min, sec) => {
    const newItem = this.createTodoItem(text, min, sec);
    if (text.trim().length <= 0) {
      return;
    }
    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem];

      return {
        todoData: newArray,
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return {
        todoData: newArray,
      };
    });
  };

  onToggleCompleted = (event, id) => {
    if (
      event.target?.name === 'remove' ||
      event.target?.name === 'edit' ||
      event.target?.className === 'edit' ||
      event.target?.name === 'timer'
    ) {
      return;
    }

    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const oldItem = todoData[idx];
      const newItem = { ...oldItem, completed: !oldItem.completed };

      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  onToggleEdit = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const oldItem = todoData[idx];
      const newItem = { ...oldItem, edit: !oldItem.edit };

      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  onEditItem = (ev, id) => {
    const text = ev.target.value;

    this.setState(({ todoData }) => {
      const newArr = todoData.slice();

      newArr.map((el) => {
        if (el.id === id) el.label = text;
        return el;
      });
      return { todoData: newArr };
    });
  };

  deleteCompleted = () => {
    this.setState(({ todoData }) => {
      const newArray = todoData.slice().filter((item) => !item.completed);
      return { todoData: newArray };
    });
  };

  onSubmit = (ev, id) => {
    ev.preventDefault();
    this.onToggleEdit(id);
  };

  createTodoItem(label, min, sec) {
    return {
      label,
      completed: false,
      id: this.maxId++,
      edit: false,
      date: new Date(),
      min: min || 0,
      sec: sec || 0,
    };
  }

  render() {
    const { todoData, filter } = this.state;
    const completedCount = todoData.filter((el) => el.completed).length;

    const todoCount = todoData.length - completedCount;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onItemAdded={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            todos={this.filteredItems(todoData, filter)}
            onDeleted={this.deleteItem}
            onToggleCompleted={this.onToggleCompleted}
            onEditItem={this.onEditItem}
            onToggleEdit={this.onToggleEdit}
            onSubmit={this.onSubmit}
          />
          <Footer
            toDo={todoCount}
            completed={completedCount}
            changeFilter={this.changeFilter}
            filter={filter}
            deleteCompleted={this.deleteCompleted}
          />
        </section>
      </section>
    );
  }
}
