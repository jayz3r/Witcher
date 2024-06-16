const modalTriggerButton = document.querySelector("#btn-get");
const modal = document.querySelector(".modal");
const modalCloseButton = document.querySelector(".modal_close");

const openModal = () => {
  modal.style.display = "block";
};
const closeModal = () => {
  modal.style.display = "none";
};
modalTriggerButton.onclick = () => {
  openModal();
  document.body.style.overflow = "hidden";
};
modalCloseButton.onclick = () => {
  closeModal();
};

modal.onclick = (event) => {
  if (event.target === modal) {
    closeModal();
  }
};

/// Open modal 10sec after launch
// setTimeout(() => {
//   openModal();
// }, 10000);



///Open modal when user on bottom of page
const onScroll =()=> {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        openModal();
        window.removeEventListener("scroll", onScroll);
    }
}


// Add the scroll event listener
window.addEventListener("scroll", onScroll);