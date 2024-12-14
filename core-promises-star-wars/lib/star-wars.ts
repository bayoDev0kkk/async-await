// Модуль для работы с API Star Wars.
// Все методы обращаются к стороннему сервису, запрашивают данные у него.
// Методы асинхронны, они возвращают Promise.

// Есть следующие методы:
// starWars.searchCharacters(query),
// starWars.searchPlanets(query),
// starWars.searchSpecies(query).
// starWars.getCharactersById(id),
// starWars.getPlanetsById(id),
// starWars.getSpeciesById(id)

// Код ниже разбирать не нужно.
// Всё, что вам необходимо знать: эти методы умеют получать данные и возвращают промисы.
// Поробуйте запустить их в своем скрипте search.js.

interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  films: string[];
  created: string;
  edited: string;
  url: string;
}

interface Species {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  homeworld: string;
  language: string;
  people: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

interface SearchResult<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}


const starWars = {
  // --- Search Methods ---

  searchCharacters: (query:string):Promise<SearchResult<Character>> => {
    return new Promise((resolve) => {
      fetch(`https://swapi.py4e.com/api/people/?search=${query}`)
        .then((response) => response.json())
        .then((characters:SearchResult<Character>) => resolve(characters))
        .catch((err) => console.log("searchCharacters error: ", err));
    });
  },

  searchPlanets: (query:string):Promise<SearchResult<Planet>> => {
    return new Promise((resolve) => {
      fetch(`https://swapi.py4e.com/api/planets/?search=${query}`)
        .then((response) => response.json())
        .then((planets: SearchResult<Planet>) => resolve(planets))
        .catch((err) => console.log("searchPlanets error: ", err));
    });
  },

  searchSpecies: (query:string): Promise<SearchResult<Species>> => {
    return new Promise((resolve) => {
      fetch(`https://swapi.py4e.com/api/species/?search=${query}`)
        .then((response) => response.json())
        .then((species: SearchResult<Species>) => resolve(species))
        .catch((err) => console.log("searchSpecies error: ", err));
    });
  },

  // --- Get By Id Methods ---

  getCharactersById: async (id:number): Promise<Character> =>
    await (await fetch(`https://swapi.py4e.com/api/people/${id}`)).json(),

  getPlanetsById: async (id:number) :Promise<Planet> =>
    await (await fetch(`https://swapi.py4e.com/api/planets/${id}`)).json(),

  getSpeciesById: async (id:number): Promise<Species> =>
    await (await fetch(`https://swapi.py4e.com/api/species/${id}`)).json(),

  getFilmsById: async (id:number): Promise<Film> =>
    await (await fetch(`https://swapi.py4e.com/api/films/${id}`)).json(),
};


