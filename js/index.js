const friendsList = {
  current: [],
  changed: [],
  count: 72,
};

const ALL_USERS_CARDS_FILTERS = friendsList.changed;
const ALL_USERS_CARDS = friendsList.current;
const USERS_LIST = document.getElementById("usersList");
const FILTERS_MENU = document.getElementById("filters_menu");
const SEARCH_INPUT = document.querySelector(".searcher");

function initApp() {
  getUsers().then((users) => {
    saveUsers(users);
    createUsersCards(ALL_USERS_CARDS);
  });
}

initApp();

function getUsers() {
  const url = `https://randomuser.me/api/1.3/?results=${friendsList.count}`;

  return fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => data.results)
    .catch((err) => {
      console.error(err.message);
    });
}

function saveUsers(users) {
  users.forEach(function (el) {
    ALL_USERS_CARDS.push(el);
    ALL_USERS_CARDS_FILTERS.push(el);
  });
}

function createUsersCards(users) {
  const lists = document.createDocumentFragment();

  users.forEach(function (el) {
    const card = document.createElement("li");
    card.classList.add("userCard");
    let template = `<span class="name">${el.name.first} ${el.name.last}</span>
     <img src="${el.picture.large}">
     <span class="age">Age: ${el.dob.age}</span>
     <span class="location">Location: ${el.location.city}</span>`;
    card.insertAdjacentHTML("beforeEnd", template);
    lists.append(card);
  });

  USERS_LIST.appendChild(lists);
}

FILTERS_MENU.addEventListener("click", function ({ target }) {
  if (target.nodeName === "INPUT") {
    switch (target.value) {
      case "nameAscend":
        sortByName(target.value);
        offChecked();
        break;
      case "nameDescend":
        sortByName(target.value);
        offChecked();
        break;
      case "younger":
        sortByAge(target.value);
        offChecked();
        break;
      case "senior":
        sortByAge(target.value);
        offChecked();
        break;
      case "male":
        sortByGender(target.value);
        offChecked();
        break;
      case "female":
        sortByGender(target.value);
        offChecked();
        break;
    }
  }
  if (target.value === "reset") {
    resetFilters();
  }
});

function sortByName(selectedFilter) {
  const nameSort = ALL_USERS_CARDS_FILTERS.slice();
  const runSorting = (a, b) => {
    if (a.name.first > b.name.first) {
      return 1;
    }
    if (a.name.first < b.name.first) {
      return -1;
    }
    return 0;
  };
  if (selectedFilter === "nameAscend") {
    nameSort.sort(runSorting);
  } else {
    nameSort.sort((a, b) => runSorting(b, a));
  }
  resetCards();
  createUsersCards(nameSort);
}

function sortByAge(selectedFilter) {
  const ageSort = ALL_USERS_CARDS_FILTERS.slice();
  const runSorting = (a, b) => a.dob.age - b.dob.age;
  if (selectedFilter === "younger") {
    ageSort.sort(runSorting);
  } else {
    ageSort.sort((a, b) => runSorting(b, a));
  }
  resetCards();
  createUsersCards(ageSort);
}

function sortByGender(selectedFilter) {
  let genderFilter = [];
  if (selectedFilter === "male") {
    genderFilter = ALL_USERS_CARDS_FILTERS.filter(
      (elem) => elem.gender === "male"
    );
  } else {
    genderFilter = ALL_USERS_CARDS_FILTERS.filter(
      (elem) => elem.gender === "female"
    );
  }
  resetCards();
  createUsersCards(genderFilter);
}

function resetFilters() {
  resetCards();
  createUsersCards(ALL_USERS_CARDS);
}

SEARCH_INPUT.addEventListener("keydown", () => {
  search(ALL_USERS_CARDS_FILTERS);
});

function search(people) {
  resetCards();
  const search = SEARCH_INPUT.value.toLowerCase();

  const newPeople = people.filter(
    (elem) =>
      elem.name.first.toLowerCase().match(search) ||
      elem.name.last.toLowerCase().match(search)
  );
  createUsersCards(newPeople);
}

function resetCards() {
  USERS_LIST.innerHTML = "";
}

function offChecked() {
  WHAT_FILTER_CHOISEN = "";
  let allInputs = document.querySelectorAll(".sort_input");
  allInputs.forEach((element) => {
    element.checked = false;
  });
}
