import { useRef, useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  console.log('과제수행');
  const [todo, setToDo] = useState([
    { id: Number(new Date()), content: 'TO DO리스트 입니다' },
  ]);
  // todo는 id와 content를 갖는 객체 추가

  return (
    <>
      <ToDoAddInput setToDo={setToDo} />
      <ToDoList todo={todo} setToDo={setToDo} />
    </>
  );
}

// To Do 내용입력 (props자식 컴포넌트)
const ToDoAddInput = ({ setToDo }) => {
  const inputRef = useRef(null);

  const addToDo = () => {
    const newToDo = {
      id: Number(new Date()),
      content: inputRef.current.value,
    };
    setToDo((prev) => [...prev, newToDo]);
  };

  return (
    <>
      <input ref={inputRef} />
      <button onClick={addToDo}>추가</button>
    </>
  );
};

// To Do List 내용표시부분 (props 자식 컴포넌트)
const ToDoList = ({ todo, setToDo }) => {
  return (
    <>
      <ul>
        {todo.map((el) => (
          <ToDo key={el.id} todo={el} setToDo={setToDo} />
        ))}
      </ul>
    </>
  );
};

// To Do List 내용표시부분 props의 자식 컴포넌트)
const ToDo = ({ todo, setToDo }) => {
  return (
    <>
      <li>
        {todo.content}
        <button
          onClick={() => {
            setToDo((prev) => prev.filter((el) => el.id !== todo.id));
          }}
        >
          삭제🗑️
        </button>
      </li>
    </>
  );
};

export default App;
