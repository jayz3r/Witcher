const cards = document.querySelector(".cards-content");
const URL = "https://jsonplaceholder.typicode.com/posts";
const getCardsData = async () => {
  const response = await fetch(URL);
  const data = await response.json();
  try {
    data.forEach((card) => {
      console.log(data);
      const cardWrapper = document.createElement("div");
      cardWrapper.classList.add("card");
      cardWrapper.innerHTML = 
      `<div class='card'>
      <img src="https://i.pinimg.com/564x/58/d8/6d/58d86dbbc7f1b3463e682dd73f114463.jpg">
      <h2>${card.title}</h2>
      <p class='personDesc'>${card.body}</p>
      </div>`;
      cards.append(cardWrapper);
    });
  } catch (e) {
    console.error(e);
  }
};
getCardsData();
