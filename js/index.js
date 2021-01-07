const allFriends = {
  currentList: [],
  changeList: [],
  numberOfFriends: 52,
};

const REQUEST_URL = "https://randomuser.me/api/1.3/";
const ALL_USERS_CARDS_FILTERS = allFriends.changeList;
const ALL_USERS_CARDS = allFriends.currentList;
const USERS_LIST = document.getElementById("usersList");
const ABC_BUTTON_FILTER = document.getElementById("Abc");
const ZYX_BUTTON_FILTER = document.getElementById("Zyx");
const MALE_BUTTON_FILTER = document.getElementById("male");
const FEMALE_BUTTON_FILTER = document.getElementById("female");
const JUNIOR_FILTER_BUTTON = document.getElementById("young-ftr");
const SENIOR_FILTER_BUTTON = document.getElementById("older-ftr");
const RESET_BUTTON = document.getElementById("reset");
const SEARCH_INPUT = document.querySelector(".searcher");

function initApp() {
  getUsers();
}

initApp();

function getUsers() {
  const url = `${REQUEST_URL}?results=${allFriends.numberOfFriends}`;
  fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Что-то не так с сервером...");
      }
    })
    .then((data) => {
      saveUsers(data.results);
      createUsersCards(ALL_USERS_CARDS);
    })
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
    card.innerHTML = `<span class="name">${el.name.first} ${el.name.last}</span>
    <img src="${el.picture.large}">
    <span class="age">Age: ${el.dob.age}</span>
    <span class="location">Location: ${el.location.city}</span>`;
    lists.appendChild(card);
  });

  USERS_LIST.appendChild(lists);
}

ABC_BUTTON_FILTER.addEventListener("click", () => {
  sortByABC();
});

function sortByABC() {
  const abcSearch = ALL_USERS_CARDS_FILTERS.sort((a, b) => {
    if (a.name.first > b.name.first) {
      return 1;
    }
    if (a.name.first < b.name.first) {
      return -1;
    }
    return 0;
  });

  resetCards();
  createUsersCards(abcSearch);
}

ZYX_BUTTON_FILTER.addEventListener("click", () => {
  sortByZYX();
});

function sortByZYX() {
  const zyxSearch = ALL_USERS_CARDS_FILTERS.sort((a, b) => {
    if (a.name.first < b.name.first) {
      return 1;
    }
    if (a.name.first > b.name.first) {
      return -1;
    }
    return 0;
  });
  resetCards();
  createUsersCards(zyxSearch);
}

JUNIOR_FILTER_BUTTON.addEventListener("click", () => {
  const younger = ALL_USERS_CARDS_FILTERS.sort((a, b) => a.dob.age - b.dob.age);
  search(younger);
});

SENIOR_FILTER_BUTTON.addEventListener("click", () => {
  const older = ALL_USERS_CARDS_FILTERS.sort((a, b) => b.dob.age - a.dob.age);
  search(older);
});

male.addEventListener("click", (elem) => {
  const filterMale = ALL_USERS_CARDS_FILTERS.filter(
    (elem) => elem.gender === "male"
  );
  search(filterMale);
});

female.addEventListener("click", (elem) => {
  const filterFemale = ALL_USERS_CARDS_FILTERS.filter(
    (elem) => elem.gender === "female"
  );
  search(filterFemale);
});

SEARCH_INPUT.addEventListener("keydown", () => {
  search(searcher.value);
});

RESET_BUTTON.addEventListener("click", () => {
  USERS_LIST.innerHTML = "";
  createUsersCards(ALL_USERS_CARDS);
  searcher.value = "";
});

function search(people) {
  USERS_LIST.innerHTML = "";
  const search = searcher.value.toLowerCase();

  people = people.filter(
    (elem) =>
      elem.name.first.toLowerCase().match(search) ||
      elem.name.last.toLowerCase().match(search)
  );
  createUsersCards(people);
}

function resetCards() {
  USERS_LIST.innerHTML = "";
}
