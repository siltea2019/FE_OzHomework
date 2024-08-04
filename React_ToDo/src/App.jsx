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
      <Advice />
      <Clock />
      <StopWatch />
      <Timer />
      <ToDoAddInput setToDo={setToDo} />
      <ToDoList todo={todo} setToDo={setToDo} />
    </>
  );
}

// 한국어 명언
const Advice = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('https://korean-advice-open-api.vercel.app/api/advice')
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);
  return (
    <>
      {data && (
        <>
          <div>{data.message}</div>
          <div>
            -{data.authorProfile}, {data.author}-
          </div>
        </>
      )}
    </>
  );
};

//현재시간 표시
const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);

  return <div>{time.toLocaleTimeString()}</div>;
};

const formatTime = (seconds) => {
  const timeString = `${String(Math.floor(seconds / 3600)).padStart(
    2,
    '0'
  )}:${String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')}:${String(
    seconds % 60
  ).padStart(2, '0')}`;
  return timeString;
};

// 스탑워치
const StopWatch = () => {
  const [time, setTime] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const timeRef = useRef(null);

  useEffect(() => {
    if (isOn === true) {
      const timerId = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
      timeRef.current = timerId;
    } else {
      clearInterval(timeRef.current);
    }
  }, [isOn]);

  return (
    <div>
      {formatTime(time)}
      <button onClick={() => setIsOn((prev) => !prev)}>
        {isOn ? '끄기' : '켜기'}
      </button>
      <button
        onClick={() => {
          setTime(0);
          setIsOn(false);
        }}
      >
        리셋
      </button>
    </div>
  );
};

const Timer = () => {
  const [startTime, setStartTime] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const [time, setTime] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (time > 0 && isOn) {
      const timerId = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
      timerRef.current = timerId;
    } else if (!isOn || time == 0) {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isOn, time]);

  return (
    <div>
      <div>{time ? formatTime(time) : formatTime(startTime)}</div>
      <button
        onClick={() => {
          setIsOn(true);
          setTime(time ? time : startTime);
          setStartTime(0);
        }}
      >
        시작
      </button>
      <button
        onClick={() => {
          setIsOn(false);
        }}
      >
        멈춤
      </button>
      <input
        type="range"
        value={startTime}
        min="0"
        max="360"
        step="10"
        onChange={(event) => setStartTime(event.target.value)}
      />
      <button
        onClick={() => {
          setTime(0);
          setIsOn(false);
          // setStartTime(0); --> 사용법 확인하기;
        }}
      >
        리셋
      </button>
    </div>
  );
};

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
