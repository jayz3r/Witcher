/// Phone checker

const phoneInput = document.querySelector("#phone_input");
const phoneButton = document.querySelector("#phone_button");
const phoneSpan = document.querySelector("#phone_result");

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/;

phoneButton.onclick = () => {
  if (regExp.test(phoneInput.value)) {
    phoneSpan.innerHTML = "OK";
    phoneSpan.style.color = "green";
  } else {
    phoneSpan.innerHTML = "not ok";
    phoneSpan.style.color = "red";
  }
};

/// TAb slider

const tabContentBlocks = document.querySelectorAll(".tab_content_block");
const tabContentItems = document.querySelectorAll(".tab_content_item");
const tabParent = document.querySelector(".tab_content_items");

const hideTabContent = () => {
  tabContentBlocks.forEach((item) => {
    item.style.display = "none";
  });
  tabContentItems.forEach((item) => {
    item.classList.remove("tab_content_item_active");
  });
};

const showTabContent = (index = 0) => {
  tabContentBlocks[index].style.display = "block";
  tabContentItems[index].classList.add("tab_content_item_active");
};

hideTabContent();
showTabContent();

tabParent.onclick = (event) => {
  if (event.target.classList.contains("tab_content_item")) {
    tabContentItems.forEach((item, index) => {
      if (event.target === item) {
        hideTabContent();
        showTabContent(index);
        clearInterval(tabInterval);
        autoSlider(index);
      }
    });
  }
};

/// autoSlider
let tabInterval;
const autoSlider = (i = 0) => {
  tabInterval = setInterval(() => {
    i++;
    if (i > tabContentBlocks.length - 1) {
      i = 0;
    }
    hideTabContent();
    showTabContent(i);
  }, 3000);
};
autoSlider();

// Converter

const usdInput = document.querySelector("#usd");
const somInput = document.querySelector("#som");
const euroInput = document.querySelector("#eur");

const converter = (element, targetElement, secTargetElement) => {
  element.oninput = async () => {
    const response = await fetch("../data/converter.json");
    const data = await response.json();
    try {
      switch (element.id) {
        case "som":
          targetElement.value = (element.value / data.usd).toFixed(2);
          secTargetElement.value = (element.value / data.euro).toFixed(2);
          break;
        case "usd":
          targetElement.value = (element.value * data.usd).toFixed(2);
          secTargetElement.value = (element.value / data.euro).toFixed(2);
          break;
        case "eur":
          targetElement.value = (element.value * data.euro).toFixed(2);
          secTargetElement.value = (element.value * data.eurTOusd).toFixed(2);
          break;
        default:
          break;
      }
      element.value === "" &&
        (targetElement.value = "" || (secTargetElement.value = " "));
    } catch (e) {
      console.error(e);
    }
  };
};

converter(usdInput, somInput, euroInput);
converter(somInput, usdInput, euroInput);
converter(euroInput, somInput, usdInput);

/// Card switcher

const cardBLock = document.querySelector(".cardSwitcher");
const btnPrev = document.querySelector("#btn-prev");
const btnNext = document.querySelector("#btn-next");

let cardNumber = 1;

const fetchData = async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${cardNumber}`
  );
  const data = await response.json();
  try {
    const { title, id, completed } = data;
    cardBLock.innerHTML = `
    <p>${title}</p>
    <p style="color:${completed ? "green" : "red"}">${completed}</p>
    <p>${id}</p>
    `;
  } catch (e) {
    console.error(e);
  }
};
fetchData();
btnNext.onclick = () => {
  cardNumber++;
  if (cardNumber >= 200) {
    cardNumber = 1;
  }
  fetchData();
};
btnPrev.onclick = () => {
  cardNumber--;
  if (cardNumber <= 0) {
    cardNumber = 200;
  }
  fetchData();
};

const jsonplaceholderurl = "https://jsonplaceholder.typicode.com/posts";
const getDataAsync = async () => {
  try {
    const response = await fetch(jsonplaceholderurl);
    const data = await response.json();
    console.log(data);
  } catch (e) {
    console.error(e);
  }
};
getDataAsync();

/// weather
const searchInput = document.querySelector(".cityName");
const temp = document.querySelector(".temp");
const city = document.querySelector(".city");

const URL = "http://api.openweathermap.org/data/2.5/weather";
const API_Key = "e417df62e04d3b1b111abeab19cea714";
const citySearch = () => {
  searchInput.oninput = async () => {
    const response = await fetch(
      `${URL}?q=${searchInput.value}&appid=${API_Key}`
    );
    const data = await response.json();
    try {
      city.innerHTML = data.name ? data.name : "Город не найден";
      temp.innerHTML = data.main?.temp
        ? Math.round(data.main.temp - 273) + "&deg;С"
        : "//";
    } catch (e) {
      console.error(e);
    }
  };
};

citySearch();
