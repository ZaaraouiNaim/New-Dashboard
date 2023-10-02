const lightbox = document.querySelector(".projects-pg .lightbox"),
  closePrevBtn = lightbox.querySelector(".close-preview"),
  showBtns = document.querySelectorAll(".project .preview-btn");

showBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    lightbox.querySelector(".img img").src =
      e.target.previousElementSibling.src;
    lightbox.classList.add("show");
  });
});

closePrevBtn.addEventListener("click", () => lightbox.classList.remove("show"));
