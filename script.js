
document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile navigation
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 2. Automatically update the copyright year
  const year = document.querySelector("#year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // 3. Respect reduced-motion accessibility settings
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // 4. Premium GSAP animations
  if (
    !reduceMotion &&
    window.gsap &&
    window.ScrollTrigger
  ) {
    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance animation
    const heroTimeline = gsap.timeline({
      defaults: { ease: "power3.out" }
    });

    heroTimeline
      .from(".hero-copy .eyebrow", {
        y: 20,
        opacity: 0,
        duration: 0.6
      })
      .from(".hero-copy h1", {
        y: 45,
        opacity: 0,
        duration: 1
      }, "-=0.25")
      .from(".hero-intro", {
        y: 20,
        opacity: 0,
        duration: 0.7
      }, "-=0.5")
      .from(".hero-actions > *", {
        y: 15,
        opacity: 0,
        duration: 0.5,
        stagger: 0.15
      }, "-=0.3");

    // Hero illustration entrance
    gsap.from(".hero-visual", {
      opacity: 0,
      scale: 0.94,
      duration: 1.2,
      ease: "power2.out",
      delay: 0.25
    });

    // Project cards reveal on scroll
    gsap.from(".project-card", {
      y: 45,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".project-grid",
        start: "top 80%",
        once: true
      }
    });

    // About section reveal
    gsap.from(".about-content > *", {
      y: 25,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".about-content",
        start: "top 80%",
        once: true
      }
    });

    // Reveal remaining sections
    gsap.utils.toArray(
      ".skills .section-heading, .process-card, .contact-content"
    ).forEach((element) => {
      gsap.from(element, {
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          once: true
        }
      });
    });

    // Animate skill rows
    gsap.utils.toArray(".skill-row").forEach((row, index) => {
      gsap.from(row, {
        x: -18,
        opacity: 0,
        duration: 0.6,
        delay: index * 0.04,
        ease: "power2.out",
        scrollTrigger: {
          trigger: row,
          start: "top 92%",
          once: true
        }
      });
    });

    // Gentle floating animation for the central orb
    gsap.to(".core", {
      y: -12,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }
});
