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
// somInput.oninput =() =>{
//   const request = new XMLHttpRequest()
//   request.open("GET", "../data/converter.json")
//   request.setRequestHeader('Content-type', 'application/json')
//   request.send()

//   request.onload = () =>{
//     const data = JSON.parse(request.response)
//     usdInput.value = (somInput.value / data.usd).toFixed(2)
//   }
// }
// usdInput.oninput =() =>{
//   const request = new XMLHttpRequest()
//   request.open("GET", "../data/converter.json")
//   request.setRequestHeader('Content-type', 'application/json')
//   request.send()

//   request.onload = () =>{
//     const data = JSON.parse(request.response)
//     somInput.value = (usdInput.value * data.usd).toFixed(2)
//   }
// }
const converter = (element, targetElement, secTargetElement ) => {
  element.oninput = () => {
    const request = new XMLHttpRequest();
    request.open("GET", "../data/converter.json");
    request.setRequestHeader("Content-type", "application/json");
    request.send();

    request.onload = () => {
      const data = JSON.parse(request.response);
      switch (element.id) {
        case "som":
          targetElement.value = (element.value / data.usd).toFixed(2);
          secTargetElement.value = (element.value / data.euro).toFixed(2)
          break;
        case "usd":
          targetElement.value = (element.value * data.usd).toFixed(2);
          secTargetElement.value = (element.value / data.euro).toFixed(2)
          break;
        case "eur":
          targetElement.value = (element.value * data.euro).toFixed(2);
          secTargetElement.value = (element.value * data.eurTOusd).toFixed(2)
          break;
        default:
          break;
      }
      element.value === '' && (targetElement.value = '' || (secTargetElement.value = ' '))
    };
  };
};

converter(usdInput, somInput, euroInput);
converter(somInput, usdInput, euroInput);
converter(euroInput, somInput, usdInput );
