document.addEventListener("DOMContentLoaded", () => {
  // --- 1. PORTFOLIO HOVER PREVIEW (IMAGE FOLLOW CURSOR) & ACCORDION ---
  const items = document.querySelectorAll(".portfolio-item");
  const preview = document.getElementById("hover-preview");
  const container = preview
    ? preview.querySelector(".preview-container")
    : null;
  let currentSrc = "";

  if (preview && container) {
    items.forEach((item) => {
      // Mouse Enter - Prepare image
      item.addEventListener("mouseenter", () => {
        const newSrc = item.getAttribute("data-image");

        if (newSrc && newSrc !== currentSrc) {
          // Buat elemen gambar baru untuk efek sliding
          const newImg = document.createElement("img");
          newImg.src = newSrc;
          newImg.className = "incoming";
          container.appendChild(newImg);

          // Ambil gambar yang lama
          const oldImg = container.querySelector("img:not(.incoming)");

          // Trigger animasi setelah render
          setTimeout(() => {
            if (oldImg) {
              oldImg.classList.add("outgoing");
            }
            newImg.classList.remove("incoming");
            newImg.style.transform = "translateY(0)";
          }, 10);

          // Hapus gambar lama setelah animasi selesai
          setTimeout(() => {
            if (oldImg) oldImg.remove();
          }, 600);

          currentSrc = newSrc;
        }
      });

      // Mouse Move - Update position
      item.addEventListener("mousemove", (e) => {
        preview.style.left = `${e.clientX + 20}px`;
        preview.style.top = `${e.clientY + 20}px`;
        preview.style.opacity = "0.7";
        preview.style.transform = "scale(1)";
      });

      // Mouse Leave - Hide preview
      item.addEventListener("mouseleave", () => {
        preview.style.opacity = "0";
        preview.style.transform = "scale(0.8)";
      });

      // Accordion Logic (Shared across click events)
      item.addEventListener("click", (e) => {
        const content = item.querySelector(".accordion-content");
        const icon = item.querySelector(".accordion-icon");

        if (!content || !icon) return;

        if (content.style.maxHeight) {
          content.style.maxHeight = null;
          content.classList.remove("open");
          item.classList.remove("active");
          icon.style.transform = "rotate(0deg)";
        } else {
          // Optional: Close other accordions
          document.querySelectorAll(".portfolio-item").forEach((otherItem) => {
            if (otherItem !== item) {
              const otherContent =
                otherItem.querySelector(".accordion-content");
              const otherIcon = otherItem.querySelector(".accordion-icon");
              if (otherContent) {
                otherContent.style.maxHeight = null;
                otherContent.classList.remove("open");
                otherItem.classList.remove("active");
              }
              if (otherIcon) otherIcon.style.transform = "rotate(0deg)";
            }
          });

          content.style.maxHeight = content.scrollHeight + "px";
          content.classList.add("open");
          item.classList.add("active");
          icon.style.transform = "rotate(45deg)";
        }
      });
    });
  }

  // --- 1B. EDUCATION HOVER PREVIEW (IMAGE FOLLOW CURSOR) & ACCORDION ---
  const educationItems = document.querySelectorAll(".education-item");

  if (preview && container) {
    educationItems.forEach((item) => {
      // Mouse Enter - Prepare image
      item.addEventListener("mouseenter", () => {
        const newSrc = item.getAttribute("data-image");

        if (newSrc && newSrc !== currentSrc) {
          // Buat elemen gambar baru untuk efek sliding
          const newImg = document.createElement("img");
          newImg.src = newSrc;
          newImg.className = "incoming";
          container.appendChild(newImg);

          // Ambil gambar yang lama
          const oldImg = container.querySelector("img:not(.incoming)");

          // Trigger animasi setelah render
          setTimeout(() => {
            if (oldImg) {
              oldImg.classList.add("outgoing");
            }
            newImg.classList.remove("incoming");
            newImg.style.transform = "translateY(0)";
          }, 10);

          // Hapus gambar lama setelah animasi selesai
          setTimeout(() => {
            if (oldImg) oldImg.remove();
          }, 600);

          currentSrc = newSrc;
        }
      });

      // Mouse Move - Update position
      item.addEventListener("mousemove", (e) => {
        preview.style.left = `${e.clientX + 20}px`;
        preview.style.top = `${e.clientY + 20}px`;
        preview.style.opacity = "0.7";
        preview.style.transform = "scale(1)";
      });

      // Mouse Leave - Hide preview
      item.addEventListener("mouseleave", () => {
        preview.style.opacity = "0";
        preview.style.transform = "scale(0.8)";
      });

      // Accordion Logic
      item.addEventListener("click", (e) => {
        const content = item.querySelector(".accordion-content");
        const icon = item.querySelector(".accordion-icon");

        if (!content || !icon) return;

        if (content.style.maxHeight) {
          content.style.maxHeight = null;
          content.classList.remove("open");
          item.classList.remove("active");
          icon.style.transform = "rotate(0deg)";
        } else {
          // Close other accordions
          document.querySelectorAll(".education-item").forEach((otherItem) => {
            if (otherItem !== item) {
              const otherContent =
                otherItem.querySelector(".accordion-content");
              const otherIcon = otherItem.querySelector(".accordion-icon");
              if (otherContent) {
                otherContent.style.maxHeight = null;
                otherContent.classList.remove("open");
                otherItem.classList.remove("active");
              }
              if (otherIcon) otherIcon.style.transform = "rotate(0deg)";
            }
          });

          content.style.maxHeight = content.scrollHeight + "px";
          content.classList.add("open");
          item.classList.add("active");
          icon.style.transform = "rotate(45deg)";
        }
      });
    });
  }

  // --- 2. SKILL BARS ANIMATION (Intersection Observer) ---
  const skillBars = document.querySelectorAll(".skill-per");
  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.getAttribute("data-width");
          bar.style.width = width;
        } else {
          entry.target.style.width = "0";
        }
      });
    },
    { threshold: 0.2 },
  );

  skillBars.forEach((bar) => skillsObserver.observe(bar));

  // --- 3. SCROLL REVEAL (Word by Word) ---
  const revealElements = document.querySelectorAll(".reveal-text");
  revealElements.forEach((el) => {
    const text = el.innerText;
    const words = text.split(" ");
    el.innerHTML = "";

    words.forEach((word) => {
      const span = document.createElement("span");
      span.innerHTML = word + " ";
      span.className = "reveal-word";
      el.appendChild(span);
    });
  });

  const revealOnScroll = () => {
    const allWords = document.querySelectorAll(".reveal-word");
    const windowHeight = window.innerHeight;

    allWords.forEach((word) => {
      const rect = word.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;

      if (elementCenter < windowHeight * 0.75) {
        word.classList.add("active");
      } else {
        word.classList.remove("active");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  // --- 4. HERO & ENTRY ANIMATIONS ---
  const triggerEntryAnimations = () => {
    const heroName = document.getElementById("hero-name");
    const heroInfo = document.getElementById("hero-info");
    const heroImages = document.querySelectorAll(".hero-image-item");

    setTimeout(() => {
      if (heroName) heroName.classList.add("active");

      heroImages.forEach((img, index) => {
        setTimeout(
          () => {
            img.classList.add("active");
          },
          200 + index * 150,
        );
      });

      setTimeout(() => {
        if (heroInfo) heroInfo.classList.add("active");
      }, 800);
    }, 100);
  };

  triggerEntryAnimations();

  // --- 5. PORTFOLIO SCROLL ANIMATION ---
  const portfolioItems = document.querySelectorAll(".portfolio-scroll-item");

  const portfolioObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Animate in
        if (entry.isIntersecting) {
          entry.target.classList.remove("scale-0", "opacity-0");
          entry.target.classList.add("scale-100", "opacity-100");
        }
        // Animate out (but only if we've scrolled far enough)
        else {
          const rect = entry.boundingClientRect;
          // Only vanish if it's completely out of view (top or bottom)
          if (rect.bottom < -100 || rect.top > window.innerHeight + 100) {
            entry.target.classList.remove("scale-100", "opacity-100");
            entry.target.classList.add("scale-0", "opacity-0");
          }
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "400px 0px 400px 0px", // Give space before it vanishes
    },
  );

  portfolioItems.forEach((item) => portfolioObserver.observe(item));

  // --- 6. PARALLAX, NAVBAR & LENS BLUR ---
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // Parallax & Blur
    const heroImages = document.querySelectorAll(".hero-image-item img");
    heroImages.forEach((img, index) => {
      const parent = img.closest(".hero-image-item");
      const isMain = parent && parent.classList.contains("is-main");
      const speed = 0.05 + index * 0.02;

      img.style.transform = `translateY(${scrollY * speed}px) scale(${1.1 - scrollY * 0.0002})`;

      let blurVal = isMain
        ? Math.min(scrollY * 0.01, 10)
        : Math.min(8 + scrollY * 0.02, 20);

      if (scrollY > 10) {
        img.style.filter = `blur(${blurVal}px) brightness(${isMain ? 0.8 : 0.5}) grayscale(${isMain ? 0 : 0.5})`;
      } else {
        if (!isMain) {
          img.style.filter = "blur(8px) brightness(0.7) grayscale(0.2)";
        } else {
          img.style.filter = "blur(0px) brightness(1) grayscale(0)";
        }
      }
    });

    // Navbar Logic
    const navbar = document.getElementById("navbar");
    const navMenu = document.getElementById("nav-menu");
    const navLogo = document.getElementById("nav-logo");
    const heroName = document.getElementById("hero-name");
    const heroInfo = document.getElementById("hero-info");
    const triggerPoint = 50;

    if (scrollY > triggerPoint) {
      if (navbar) {
        navbar.classList.add("scrolled", "py-4");
        navbar.classList.remove("py-8");
      }
      if (navMenu) {
        navMenu.classList.add("compact");
        navMenu.classList.remove("justify-between", "md:justify-around");
      }
      if (navLogo) {
        navLogo.classList.remove("opacity-0", "invisible", "-translate-x-10");
        navLogo.classList.add("opacity-100", "visible", "translate-x-0");
      }
      if (heroName) {
        heroName.style.transform = `translate(-45vw, -45vh) scale(0.15)`;
        heroName.style.opacity = "0";
      }
      if (heroInfo) {
        heroInfo.style.opacity = "0.7";
      }
    } else {
      if (navbar) {
        navbar.classList.remove("scrolled", "py-4");
        navbar.classList.add("py-8");
      }
      if (navMenu) {
        navMenu.classList.remove("compact");
        navMenu.classList.add("justify-between", "md:justify-around");
      }
      if (navLogo) {
        navLogo.classList.add("opacity-0", "invisible", "-translate-x-10");
        navLogo.classList.remove("opacity-100", "visible", "translate-x-0");
      }
      if (heroName) {
        heroName.style.transform = "translate(-50%, -50%) scale(1)";
        heroName.style.opacity = "1";
      }
      if (heroInfo) {
        heroInfo.style.opacity = "1";
      }
    }
  });

  console.log("Portfolio & Animations Initialized");
});
