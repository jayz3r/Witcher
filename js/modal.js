const modalTriggerButton = document.querySelector("#btn-get");
const modal = document.querySelector(".modal");
const modalCloseButton = document.querySelector(".modal_close");

const openModal = () => {
  modal.style.display = "block";
  document.body.classList.add('modal_visibility')

};
const closeModal = () => {
  modal.style.display = "none";
  document.body.classList.remove('modal_visibility')
};
modalTriggerButton.onclick = () => {
  openModal();
};
modalCloseButton.onclick = () => {
  closeModal();
};

modal.onclick = (event) => {
  if (event.target === modal) {
    closeModal();

  }
};

//  Open modal 10sec after launch
setTimeout(() => {
  openModal();
}, 10000);

///Open modal when user on bottom of page
const onScroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    openModal();
    window.removeEventListener("scroll", onScroll);
  }
};

// Add the scroll event listener
window.addEventListener("scroll", onScroll);

//Post data telegram bot

const form = document.querySelector("form");
const token = '7258038150:AAGvJ_Bjm7j283-m_C3YC14IPUgBiDo3J4I'
const chat_id = '@modalithink'
const API = `https://api.telegram.org/bot${token}/sendmessage`

form.onsubmit = async (event) => {
  event.preventDefault();

    const {name, phone}= Object.fromEntries(new FormData(event.target).entries());
    const text = `name: ${name}\nphone:${phone}`

    await fetch(API,{
      method:'POST',
      headers:{'Content-type': 'application/json'},
      body: JSON.stringify({
        chat_id: chat_id, text
      })
    })
  };

