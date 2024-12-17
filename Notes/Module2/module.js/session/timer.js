export const timer = () => {
  let card = document.createElement("div");

  function getime() {
    let date = new Date();
    let hours = date.getHours();
    let mins = date.getMinutes();
    let seconds = date.getSeconds();
    card.textContent = `${hours}:${mins}:${seconds}`;
    //console.log(hours, mins, seconds);
  }

  setInterval(getime, 1000);
  getime();
  return card;
};
