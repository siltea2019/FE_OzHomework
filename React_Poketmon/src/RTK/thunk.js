import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMultiplePoketmonById = createAsyncThunk(
  'poketmon/fetchMultiplePoketmonById',
  async (maxPoketmonId) => {
    const numberArray = Array.from({ length: maxPoketmonId }, (_, i) => i + 1);

    const fetchAPI = async (poketmonId) => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${poketmonId}/`
      );
      const jsData = await response.json();

      const poketmonData = {
        id: 1,
        name: jsData.names.find((el) => el.language.name === 'ko').name,
        descriptions: jsData.flavor_text_entries.find(
          (el) => el.language.name === 'ko'
        ).flavor_text,
        general: jsData.genera.find((el) => el.language.name === 'ko').genus,
        front_img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poketmonId}.png`,
        back_img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${poketmonId}.png`,
      };
      return poketmonData;
    };

    return await Promise.all(numberArray.map((el) => fetchAPI(el)));
  }
);
