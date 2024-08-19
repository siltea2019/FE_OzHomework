import { useEffect, useState } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    const fetchAPI = async () => {
      const response = await fetch(
        'https://pokeapi.co/api/v2/pokemon-species/1/'
      );
      const jsData = await response.json();
      console.log(jsData);

      const poketmonData = {
        id: 1,
        name: jsData.names.find((el) => el.language.name === 'ko').name,
      };
      console.log(poketmonData);
    };

    fetchAPI();
  }, []);

  return <></>;
}

export default App;
