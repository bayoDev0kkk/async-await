"use strict";
// Модуль для работы с API Star Wars.
// Все методы обращаются к стороннему сервису, запрашивают данные у него.
// Методы асинхронны, они возвращают Promise.
const starWars = {
    // --- Search Methods ---
    searchCharacters: (query) => {
        return new Promise((resolve) => {
            fetch(`https://swapi.py4e.com/api/people/?search=${query}`)
                .then((response) => response.json())
                .then((characters) => resolve(characters))
                .catch((err) => console.log("searchCharacters error: ", err));
        });
    },
    searchPlanets: (query) => {
        return new Promise((resolve) => {
            fetch(`https://swapi.py4e.com/api/planets/?search=${query}`)
                .then((response) => response.json())
                .then((planets) => resolve(planets))
                .catch((err) => console.log("searchPlanets error: ", err));
        });
    },
    searchSpecies: (query) => {
        return new Promise((resolve) => {
            fetch(`https://swapi.py4e.com/api/species/?search=${query}`)
                .then((response) => response.json())
                .then((species) => resolve(species))
                .catch((err) => console.log("searchSpecies error: ", err));
        });
    },
    // --- Get By Id Methods ---
    getCharactersById: async (id) => await (await fetch(`https://swapi.py4e.com/api/people/${id}`)).json(),
    getPlanetsById: async (id) => await (await fetch(`https://swapi.py4e.com/api/planets/${id}`)).json(),
    getSpeciesById: async (id) => await (await fetch(`https://swapi.py4e.com/api/species/${id}`)).json(),
    getFilmsById: async (id) => await (await fetch(`https://swapi.py4e.com/api/films/${id}`)).json(),
};
