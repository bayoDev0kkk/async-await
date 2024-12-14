// Методы, которые могут пригодиться:
// starWars.searchCharacters(query),
// starWars.searchPlanets(query),
// starWars.searchSpecies(query).
// starWars.getCharactersById(id),
// starWars.getPlanetsById(id),
// starWars.getSpeciesById(id)

// Тут ваш код.

interface Character {
  name: string;
  title: string
}

interface Planet {
  name: string;
  title: string
}

interface Species {
  name: string;
  title:string
}

interface SearchResult<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

type ResourceType = "people" | "planets" | "species";


const spinner = document.querySelector(".spinner") as HTMLElement;
const resultContainer = document.getElementById("result-container") as HTMLElement;
const searchQueryInput = document.getElementById("searchQuery") as HTMLInputElement;
const byQueryBtn = document.getElementById("byQueryBtn") as HTMLButtonElement;
const searchByIdInput = document.getElementById("searchById") as HTMLInputElement;
const byIdBtn = document.getElementById("byIdBtn") as HTMLButtonElement;
const resourceSelect = document.getElementById("resourceSelect") as HTMLSelectElement;


const showSpinner = () => {
  spinner.style.visibility = "visible";
  resultContainer.style.visibility = "hidden";
};

const hideSpinner = () => {
  spinner.style.visibility = "hidden";
  resultContainer.style.visibility = "visible";
};

const displayResults = (data:SearchResult<Character> |SearchResult<Planet> |SearchResult<Species> | Character | Planet | Species): void => {
  hideSpinner();
  const content = document.getElementById("content") as HTMLElement;
  content.innerHTML = "";

  if ('name' in data) {
    const div = document.createElement("div");
    div.classList.add("box");
    div.innerHTML = `<strong>${data.name}</strong>`;
    content.appendChild(div);
  } else if (data && 'results' in data && data.results.length > 0) {
    data.results.forEach((item:Character | Planet | Species) => {
      const div = document.createElement("div");
      div.classList.add("box");
      div.innerHTML = `<strong>${item.name || item.title}</strong>`;
      content.appendChild(div);
    });
  } else {
    content.innerHTML = "No results found";
  }
};

byQueryBtn.addEventListener("click", () => {
  showSpinner();
  const query = searchQueryInput.value.trim();
  const resource = resourceSelect.value;

  if (resource === "people") {
    // Указываем тип, который ожидаем в .then()
    starWars.searchCharacters(query)
      .then((data: SearchResult<Character>) => displayResults(data))
      .catch(console.error);
  } else if (resource === "planets") {
    starWars.searchPlanets(query)
      .then((data: SearchResult<Planet>) => displayResults(data))
      .catch(console.error);
  } else if (resource === "species") {
    starWars.searchSpecies(query)
      .then((data: SearchResult<Species>) => displayResults(data))
      .catch(console.error);
  }
});


byIdBtn.addEventListener("click", () => {
  showSpinner();
  const id = searchByIdInput.value.trim();
  const resource = resourceSelect.value as ResourceType;;

  if (!id || isNaN(Number(id))) {
    alert("Please enter a valid ID.");
    hideSpinner();
    return;
  }

  console.log(`Searching for ID: ${id} in resource: ${resource}`);

  let url = "";
  if (resource === "people") {
    url = `https://swapi.py4e.com/api/people/${id}/`;
  } else if (resource === "planets") {
    url = `https://swapi.py4e.com/api/planets/${id}/`;
  } else if (resource === "species") {
    url = `https://swapi.py4e.com/api/species/${id}/`;
  }

  console.log("Fetching from:", url);
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    })
    .then((data: Character | Planet | Species) => {
      console.log("Data received:", data);
      displayResults(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      hideSpinner();
      const content = document.getElementById("content");
      if (content) {
        content.innerHTML = "No results found for this ID.";
      } else {
        console.error("Element with id 'content' not found");
      }
    });
});
