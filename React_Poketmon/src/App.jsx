import { useEffect, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMultiplePoketmonById } from './RTK/thunk';

function App() {
  const dispatch = useDispatch();
  const poketmonData = useSelector((state) => state.poketmon);
  console.log(poketmonData);
  useEffect(() => {
    dispatch(fetchMultiplePoketmonById(200));
  }, []);

  return <></>;
}

export default App;
