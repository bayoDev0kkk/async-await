// Методы, которые могут пригодиться:
// starWars.searchCharacters(query),
// starWars.searchPlanets(query),
// starWars.searchSpecies(query).
// starWars.getCharactersById(id),
// starWars.getPlanetsById(id),
// starWars.getSpeciesById(id)

// Тут ваш код.

const spinner = document.querySelector(".spinner");
const resultContainer = document.getElementById("result-container");
const searchQueryInput = document.getElementById("searchQuery");
const byQueryBtn = document.getElementById("byQueryBtn");
const searchByIdInput = document.getElementById("searchById");
const byIdBtn = document.getElementById("byIdBtn");
const resourceSelect = document.getElementById("resourceSelect");

// Функция для отображения спиннера
const showSpinner = () => {
  spinner.style.visibility = "visible";
  resultContainer.style.visibility = "hidden";
};

// Функция для скрытия спиннера
const hideSpinner = () => {
  spinner.style.visibility = "hidden";
  resultContainer.style.visibility = "visible";
};

// Функция для отображения данных
const displayResults = (data) => {
    hideSpinner();
    const content = document.getElementById("content");
    content.innerHTML = ""; 
  
    // Если пришел объект с полем name (значит, мы получили результат по ID)
    if (data && data.name) {
      const div = document.createElement("div");
      div.classList.add("box");
      div.innerHTML = `<strong>${data.name}</strong>`;
      content.appendChild(div);
    } else if (data && data.results && data.results.length > 0) {
      // Если результат пришел в виде массива (по имени)
      data.results.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("box");
        div.innerHTML = `<strong>${item.name || item.title}</strong>`;
        content.appendChild(div);
      });
    } else {
      content.innerHTML = "No results found";
    }
  };

// Обработчик нажатия на кнопку "Search"
byQueryBtn.addEventListener("click", () => {
  showSpinner();
  const query = searchQueryInput.value.trim();
  const resource = resourceSelect.value;

  if (resource === "people") {
    starWars.searchCharacters(query).then(displayResults).catch(console.error);
  } else if (resource === "planets") {
    starWars.searchPlanets(query).then(displayResults).catch(console.error);
  } else if (resource === "species") {
    starWars.searchSpecies(query).then(displayResults).catch(console.error);
  }
});

// Обработчик нажатия на кнопку "Search by ID"
byIdBtn.addEventListener("click", () => {
    showSpinner();
    const id = searchByIdInput.value.trim();
    const resource = document.getElementById("resourceSelect").value;  // Правильный селектор для ресурса
  
    // Проверка на пустое или невалидное значение ID
    if (!id || isNaN(id)) {
      alert("Please enter a valid ID.");
      hideSpinner();
      return;
    }
  
    // Логирование ID и ресурса для диагностики
    console.log(`Searching for ID: ${id} in resource: ${resource}`);
    
    let url = "";
    
    // Формирование URL запроса в зависимости от выбранного ресурса
    if (resource === "people") {
      url = `https://swapi.py4e.com/api/people/${id}/`;
    } else if (resource === "planets") {
      url = `https://swapi.py4e.com/api/planets/${id}/`;
    } else if (resource === "species") {
      url = `https://swapi.py4e.com/api/species/${id}/`;
    }
  
    console.log("Fetching from:", url); // Логирование итогового URL
  
    // Запрос к API
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then(data => {
        console.log("Data received:", data); // Логирование полученных данных
        displayResults(data); // Отображение данных
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        hideSpinner();
        const content = document.getElementById("content");
        content.innerHTML = "No results found for this ID.";
      });
  });