const projSlider = document.querySelector(".projects .wrapper"),
  ctrlBtns = document.querySelectorAll(".projects .btn"),
  projects = projSlider.querySelectorAll(".project"),
  projectWidth = projects[0].scrollWidth;

let projIndex = 0;
let isDragStart = false,
  scrollWidth = 0,
  prevPos,
  prevScrollLeft;

let maxScroll = projSlider.scrollWidth - projSlider.offsetWidth;

const slide = () => {
  projIndex =
    projIndex === projects.length
      ? 0
      : projIndex < 0
      ? projects.length - 1
      : projIndex;
  scrollWidth = projIndex * projectWidth;
  projSlider.style.transform = `translateX(-${projIndex * 100}%)`;
};
const updateIndex = (e) => {
  projIndex += e.target.id === "next" ? 1 : -1;
  slide();
};

ctrlBtns.forEach((btn) => {
  btn.addEventListener("click", updateIndex);
});

const checkScroll = () => {
  scrollWidth =
    scrollWidth >= maxScroll ? maxScroll : scrollWidth <= 0 ? 0 : scrollWidth;
  projIndex =
    projIndex === projects.length
      ? projects.length - 1
      : projIndex <= 0
      ? 0
      : projIndex;
};

const startDrag = (e) => {
  isDragStart = true;
  prevPos = e.pageX || e.touches[0].pageX;
  prevScrollLeft = scrollWidth;
  projSlider.classList.add("dragging");
};

const drag = (e) => {
  if (!isDragStart) return;
  e.preventDefault();
  let diffPos = (e.pageX || e.touches[0].pageX) - prevPos;
  scrollWidth = prevScrollLeft - diffPos;
  projIndex = Math.round(scrollWidth / projectWidth);
  checkScroll();
  projSlider.style.transform = `translate(-${scrollWidth}px)`;
};

const stopDrag = (e) => {
  isDragStart = false;
  projSlider.classList.remove("dragging");
};

projSlider.addEventListener("mousedown", startDrag);
projSlider.addEventListener("touchstart", startDrag);
projSlider.addEventListener("mousemove", drag);
projSlider.addEventListener("touchmove", drag);
projSlider.addEventListener("mouseup", stopDrag);
projSlider.addEventListener("mouseleave", stopDrag);
projSlider.addEventListener("touchend", stopDrag);
