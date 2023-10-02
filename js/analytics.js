const day = document.querySelector(".soon .days .nb"),
  hours = document.querySelector(".soon .hours .nb"),
  minutes = document.querySelector(".soon .minutes .nb"),
  seconds = document.querySelector(".soon .seconds .nb");

let timer = setInterval(() => {
  const now = Date.now();
  const target = new Date("12, 30 2023").getTime();

  let timeDiff = target - now;
  const dy = Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
    hrs = Math.round((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    mins = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)),
    secs = Math.floor((timeDiff % (1000 * 60)) / 1000);

  day.textContent = dy;
  hours.textContent = hrs < 10 ? `0${hrs}` : hrs;
  minutes.textContent = mins < 10 ? `0${mins}` : mins;
  seconds.textContent = secs < 10 ? `0${secs}` : secs;

  if (timeDiff == 0) clearInterval(timer);
}, 1000);
