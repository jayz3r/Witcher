// SLIDER BLOCK

const slides = document.querySelectorAll(".slide");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");
let index = 0;

const hideSlide = () => {
  slides.forEach((slide) => {
    slide.style.opacity = 0;
    slide.classList.remove("active_slide");
  });
};
const showSlide = (i = 0) => {
  slides[i].style.opacity = 1;
  slides[i].classList.add("active_slide");
};

hideSlide();
showSlide(index);

const autoSlider = (i = 0) => {
  setInterval(() => {
    i++;
    if (i > slides.length - 1) {
      i = 0;
    }
    hideSlide();
    showSlide(i);
  }, 10000);
};

next.onclick = () => {
  index < slides.length - 1 ? index++ : (index = 0);
  hideSlide();
  showSlide(index);
};

prev.onclick = () => {
  index > 0 ? index-- : (index = slides.length - 1);
  hideSlide();
  showSlide(index);
};

autoSlider(index);

//Persons

const cards = document.querySelector(".cards");

const getCardData = async () => {
  const response =  await fetch('/data/persons.json')
  const data = await response.json()
  try{
    data.forEach((persons) => {
      const card = document.createElement("div");
    
    card.classList.add("card");
    card.innerHTML = `
    <div class='card'>
    <img src=${persons.person_photo}>
    <h2>${persons.person_name}</h2>
      <p class="personNick">${persons.person_nick}</p>
      <div class='characteristics'>
      <span class="personAge">Age: ${persons.person_age}</span>
      <span class="personHeight">Height: ${persons.person_height}</span>
      </div>
      <p class="personDesc">${persons.person_desc}</p>
      </div>
        
      `;
      
      cards.append(card);
      });
    } catch(e){
      console.error(e);
    }
    };
    getCardData()

/// Gmail validation
const gmailInput = document.querySelector("#gmail_input");
const gmailButton = document.querySelector("#gmail_button");
const gmailSpan = document.querySelector("#gmail_result");

const regExp = /^[\w-\.]+@gmail.com$/;

gmailInput.oninput = () =>{
  if (regExp.test(gmailInput.value)) {
    gmailSpan.innerHTML = ''
  } else if(!regExp.test(gmailInput.value)){
    gmailSpan.innerHTML = 'invalid gmail'
    gmailSpan.style.color = 'red'
  } else{
    gmailSpan.innerHTML = ''
  }
}
gmailButton.onclick = () => {
  if (regExp.test(gmailInput.value)) {
    alertify.success('Success');
  } else {
    alertify.error('Invalid gmail address');

  }
};
  
