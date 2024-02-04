
window.onload = () => {
  let nextBtn = document.querySelector(".next");
  let prevBtn = document.querySelector(".prev");
  let box = document.querySelector(".box");
  let degree = 0;
  if (box) {
    prevBtn.addEventListener("click", () => {
      degree += 90;
      box.style = `transform: perspective(1000px) rotateY(${degree}deg);`;
    });
    nextBtn.addEventListener("click", () => {
      degree -= 90;
      box.style = `transform: perspective(1000px) rotateY(${degree}deg);`;
    });
  }
};
