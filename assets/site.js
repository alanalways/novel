document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach((link) => {
    const href = link.getAttribute("href");
    const normalizedHref = href ? href.split("/").pop() : "";
    if (normalizedHref === currentPage || (currentPage === "" && normalizedHref === "index.html")) {
      link.classList.add("is-active");
    }
  });

  const yearNode = document.querySelector("[data-year]");
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  const volumeDetails = [...document.querySelectorAll(".volume-detail")];
  document.querySelector("[data-outline-expand]")?.addEventListener("click", () => {
    volumeDetails.forEach((item) => {
      item.open = true;
    });
  });
  document.querySelector("[data-outline-collapse]")?.addEventListener("click", () => {
    volumeDetails.forEach((item, index) => {
      item.open = index === 0;
    });
  });
  volumeDetails.forEach((item) => {
    item.querySelector("summary")?.addEventListener("click", () => {
      if (!item.open) {
        volumeDetails.forEach((other) => {
          if (other !== item) other.open = false;
        });
      }
    });
  });
});
