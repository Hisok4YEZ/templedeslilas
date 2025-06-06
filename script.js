onload = () => {
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");
    clearTimeout(c);
  }, 1000);
};

window.addEventListener("DOMContentLoaded", () => {
  fetch("header.html")
    .then(response => response.text())
    .then(html => {
      document.getElementById("header-placeholder").innerHTML = html;
    })
    .catch(err => console.error("Erreur de chargement du header :", err));
});

window.addEventListener("DOMContentLoaded", () => {
  fetch("footer.html")
    .then(response => response.text())
    .then(html => {
      document.getElementById("footer-placeholder").innerHTML = html;
    })
    .catch(err => console.error("Erreur de chargement du header :", err));
});

const track = document.getElementById("image-track");

const handleOnDown = e => {
  track.dataset.mouseDownAt = e.clientX;
};

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};

const handleOnMove = e => {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  track.dataset.percentage = nextPercentage;

  track.animate(
    { transform: `translate(${nextPercentage}%, -50%)` },
    { duration: 1200, fill: "forwards" }
  );

  for (const image of track.getElementsByClassName("image")) {
    image.animate(
      { objectPosition: `${100 + nextPercentage}% center` },
      { duration: 1200, fill: "forwards" }
    );
  }
};

// Mouse / touch events
window.onmousedown = e => handleOnDown(e);
window.ontouchstart = e => handleOnDown(e.touches[0]);
window.onmouseup = e => handleOnUp();
window.ontouchend = e => handleOnUp();
window.onmousemove = e => handleOnMove(e);
window.ontouchmove = e => handleOnMove(e.touches[0]);


// Centrer le track dès le chargement
window.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("image-track");
  const startPercentage = parseFloat(track.dataset.percentage) || -50;

  track.style.transform = `translate(${startPercentage}%, -50%)`;

  for (const image of track.getElementsByClassName("image")) {
    image.style.objectPosition = `${100 + startPercentage}% center`;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".scroll-to-intro");
  const target = document.querySelector(".intro");

  if (btn && target) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // une fois visible, on n'observe plus
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.reveal-on-scroll').forEach(section => {
    observer.observe(section);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".gallery-slider__slide");

  if (!slides.length) return;

  slides.forEach((slide) => {
    slide.addEventListener("click", () => {
      slides.forEach((s) => s.classList.remove("active"));
      slide.classList.add("active");
    });

    slide.addEventListener("keydown", (e) => {
      if (e.code === "Enter") {
        slide.click();
      }
    });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".gallery-slider__slide");
  if (!slides.length) return;
  slides.forEach((slide) => {
    slide.addEventListener("click", () => {
      slides.forEach((s) => s.classList.remove("active"));
      slide.classList.add("active");
    });
    slide.addEventListener("keydown", (e) => {
      if (e.code === "Enter") {
        slide.click();
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".letter-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    })
    .then((response) => {
      if (response.ok) {
        document.body.classList.add("sent");
        form.reset();
      } else {
        alert("Une erreur est survenue. Veuillez réessayer.");
      }
    })
    .catch(() => {
      alert("Erreur réseau. Veuillez réessayer plus tard.");
    });
  });
});


document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => {
      const checkbox = document.getElementById('menu-toggle');
      if (checkbox) checkbox.checked = false;
    });
});
