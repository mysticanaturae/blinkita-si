/* =========================================================
   BLINKITA — APP.JS V5
   Living Digital World
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     INTRO
  ======================================================= */

  const intro = document.getElementById("blinkita-intro");
  const slides = Array.from(
    document.querySelectorAll(".intro-slide")
  );
  const dots = Array.from(
    document.querySelectorAll(".progress-dot")
  );
  const skipButton = document.getElementById("skipIntro");
  const enterButton = document.getElementById("enterBlinkita");

  let currentSlide = 0;
  let introTimer = null;
  let introFinished = false;
  let introPaused = false;

  const SLIDE_DURATION = 5200;


  /* =======================================================
     INTRO NAVIGATION
  ======================================================= */

  let introNavigation =
    document.querySelector(".intro-navigation");

  if (!introNavigation && intro) {

    introNavigation =
      document.createElement("div");

    introNavigation.className =
      "intro-navigation";


    const previousButton =
      document.createElement("button");

    previousButton.className =
      "intro-arrow intro-arrow-prev";

    previousButton.type = "button";

    previousButton.setAttribute(
      "aria-label",
      "Previous slide"
    );

    previousButton.innerHTML = "←";


    const nextButton =
      document.createElement("button");

    nextButton.className =
      "intro-arrow intro-arrow-next";

    nextButton.type = "button";

    nextButton.setAttribute(
      "aria-label",
      "Next slide"
    );

    nextButton.innerHTML = "→";


    introNavigation.appendChild(
      previousButton
    );

    introNavigation.appendChild(
      nextButton
    );

    intro.appendChild(
      introNavigation
    );


    previousButton.addEventListener(
      "click",
      (event) => {

        event.preventDefault();
        event.stopPropagation();

        previousSlide();

      }
    );


    nextButton.addEventListener(
      "click",
      (event) => {

        event.preventDefault();
        event.stopPropagation();

        nextSlide();

      }
    );

  }


  const previousButton =
    document.querySelector(
      ".intro-arrow-prev"
    );

  const nextButton =
    document.querySelector(
      ".intro-arrow-next"
    );


  /* =======================================================
     SHOW SLIDE
  ======================================================= */

  function showSlide(
    index,
    restartTimer = true
  ) {

    if (
      !slides.length ||
      introFinished
    ) {
      return;
    }


    currentSlide = Math.max(
      0,
      Math.min(
        index,
        slides.length - 1
      )
    );


    slides.forEach(
      (slide, i) => {

        const isActive =
          i === currentSlide;

        slide.classList.toggle(
          "active",
          isActive
        );

        slide.setAttribute(
          "aria-hidden",
          isActive
            ? "false"
            : "true"
        );

      }
    );


    dots.forEach(
      (dot, i) => {

        dot.classList.toggle(
          "active",
          i === currentSlide
        );

      }
    );


    if (intro) {

      intro.dataset.phase =
        String(
          currentSlide + 1
        );

    }


    updateArrows();


    if (restartTimer) {

      startIntroTimer();

    }

  }


  /* =======================================================
     INTRO TIMER
  ======================================================= */

  function startIntroTimer() {

    clearTimeout(
      introTimer
    );


    if (
      introFinished ||
      introPaused
    ) {
      return;
    }


    /*
      Zadnji slide ostane odprt.
      Vstop uporabnik potrdi sam.
    */

    if (
      currentSlide >=
      slides.length - 1
    ) {
      return;
    }


    introTimer =
      setTimeout(
        () => {

          if (
            !introPaused &&
            !introFinished
          ) {

            nextSlide();

          }

        },
        SLIDE_DURATION
      );

  }


  /* =======================================================
     NEXT SLIDE
  ======================================================= */

  function nextSlide() {

    if (introFinished) {
      return;
    }


    if (
      currentSlide <
      slides.length - 1
    ) {

      showSlide(
        currentSlide + 1
      );

    } else {

      finishIntro();

    }

  }


  /* =======================================================
     PREVIOUS SLIDE
  ======================================================= */

  function previousSlide() {

    if (introFinished) {
      return;
    }


    if (currentSlide > 0) {

      showSlide(
        currentSlide - 1
      );

    } else {

      showSlide(0);

    }

  }


  /* =======================================================
     UPDATE ARROWS
  ======================================================= */

  function updateArrows() {

    if (
      !previousButton ||
      !nextButton
    ) {
      return;
    }


    previousButton.disabled =
      currentSlide === 0;

    nextButton.disabled =
      currentSlide ===
      slides.length - 1;


    previousButton.style.opacity =
      currentSlide === 0
        ? "0.25"
        : "1";


    nextButton.style.opacity =
      currentSlide ===
      slides.length - 1
        ? "0.25"
        : "1";

  }


  /* =======================================================
     FINISH INTRO
  ======================================================= */

  function finishIntro() {

    if (introFinished) {
      return;
    }


    introFinished = true;

    clearTimeout(
      introTimer
    );


    if (!intro) {
      return;
    }


    intro.classList.add(
      "intro-exit"
    );


    setTimeout(
      () => {

        intro.classList.add(
          "entered"
        );


        setTimeout(
          () => {

            intro.style.pointerEvents =
              "none";

            intro.style.visibility =
              "hidden";

          },
          900
        );

      },
      850
    );

  }


  /* =======================================================
     SKIP INTRO
  ======================================================= */

  if (skipButton) {

    skipButton.addEventListener(
      "click",
      (event) => {

        event.preventDefault();
        event.stopPropagation();

        finishIntro();

      }
    );

  }


  /* =======================================================
     ENTER BLINKITA
  ======================================================= */

  if (enterButton) {

    enterButton.addEventListener(
      "click",
      (event) => {

        event.preventDefault();
        event.stopPropagation();

        finishIntro();

      }
    );

  }


  /* =======================================================
     PROGRESS DOTS
  ======================================================= */

  dots.forEach(
    (dot, index) => {

      dot.addEventListener(
        "click",
        (event) => {

          event.preventDefault();
          event.stopPropagation();

          showSlide(index);

        }
      );

    }
  );


  /* =======================================================
     KEYBOARD
  ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        !intro ||
        introFinished
      ) {
        return;
      }


      if (
        event.key === "ArrowRight"
      ) {

        nextSlide();

      }


      if (
        event.key === "ArrowLeft"
      ) {

        previousSlide();

      }


      if (
        event.key === "Escape"
      ) {

        finishIntro();

      }


      if (
        event.key === " "
      ) {

        event.preventDefault();

        introPaused =
          !introPaused;


        if (introPaused) {

          clearTimeout(
            introTimer
          );

        } else {

          startIntroTimer();

        }

      }

    }
  );


  /* =======================================================
     TOUCH / SWIPE
  ======================================================= */

  let touchStartX = 0;
  let touchEndX = 0;


  if (intro) {

    intro.addEventListener(
      "touchstart",
      (event) => {

        if (
          !event.changedTouches.length
        ) {
          return;
        }

        touchStartX =
          event.changedTouches[0]
            .screenX;

      },
      {
        passive: true
      }
    );


    intro.addEventListener(
      "touchend",
      (event) => {

        if (
          !event.changedTouches.length
        ) {
          return;
        }

        touchEndX =
          event.changedTouches[0]
            .screenX;


        const distance =
          touchEndX - touchStartX;


        if (
          Math.abs(distance) < 50
        ) {
          return;
        }


        if (distance < 0) {

          nextSlide();

        } else {

          previousSlide();

        }

      },
      {
        passive: true
      }
    );

  }


  /* =======================================================
     MOUSE PAUSE
  ======================================================= */

  if (intro) {

    intro.addEventListener(
      "mouseenter",
      () => {

        introPaused = true;

        clearTimeout(
          introTimer
        );

      }
    );


    intro.addEventListener(
      "mouseleave",
      () => {

        if (introFinished) {
          return;
        }

        introPaused = false;

        startIntroTimer();

      }
    );

  }


  /* =======================================================
     START INTRO
  ======================================================= */

  if (
    intro &&
    slides.length
  ) {

    intro.classList.remove(
      "intro-exit",
      "entered"
    );


    intro.style.pointerEvents =
      "";

    intro.style.visibility =
      "";


    introFinished = false;
    introPaused = false;
    currentSlide = 0;


    showSlide(
      0,
      false
    );


    /*
      Dva animation frame-a omogočita,
      da brskalnik najprej nariše
      začetno stanje in nato sproži
      prehod v aktivni slide.
    */

    requestAnimationFrame(
      () => {

        requestAnimationFrame(
          () => {

            startIntroTimer();

          }
        );

      }
    );

  }


  /* =======================================================
     TRANSLATIONS
  ======================================================= */

  const translations = {

    sl: {

      skip:
        "Preskoči uvod",

      slide1a:
        "Misliš, da živiš skozi čas.",

      slide1b:
        "Kaj, če čas živi skozi tebe?",

      slide2a:
        "Čas ni samo nekaj, kar mineva.",

      slide2b:
        "Je prostor, skozi katerega živiš.",

      slide3title:
        "Pet vrat.",

      slide3main:
        "En živ svet.",

      slide4a:
        "BLINKITA",

      slide4b:
        "živi digitalni svet.",

      slide4c:
        "Prostor za človeka, ki je pripravljen živeti drugače.",

      enter:
        "Vstopi v BLINKITA",

      enterBlinkita:
        "Vstopi v BLINKITA",

      navWorlds:
        "Svetovi",

      navShop:
        "Trgovina",

      navLive:
        "V živo",

      navCircle:
        "Krog",

      myBlinkita:
        "Moj BLINKITA",

      cart:
        "Košarica",

      todayTime:
        "Danes v Živem Času",

      traditionalCount:
        "Tradicionalno štetje · placeholder",

      calculate:
        "Naredi izračun",

      heroTitle:
        "živi digitalni svet.",

      heroText:
        "Raziskuj zgodbe, orodja, izkušnje in svetove, ki sestavljajo BLINKITA.",

      bodyStory:
        "Tvoje telo ima svojo zgodbo.",

      mindStory:
        "Spremeni zgodbo, iz katere živiš.",

      timeStory:
        "Čas je prostor, skozi katerega živiš.",

      lifeStory:
        "Življenje je namenjeno temu, da ga živiš.",

      explore:
        "Raziskuj →",

      bodyLead:
        "Tvoja osebna zgodba. Pot, ki je postala del BLINKITA.",

      bodyText:
        "Programi, coaching, telesne izkušnje in izdelki, ki se bodo postopoma zložili v svoj svet.",

      meetStory:
        "Spoznaj zgodbo",

      mindTitle:
        "Kaj si pripravljena spremeniti?",

      mindLead:
        "Coaching, avdio, programi in globlje delo z zgodbami, ki oblikujejo tvoje življenje.",

      exploreMind:
        "Raziskuj Mind",

      timeLead:
        "Čas ni samo nekaj, kar mineva. Je prostor, skozi katerega živiš.",

      timeText:
        "Tradicionalni Tzolk'in, osebni izračuni, dnevni Čas in prihodnja skupna energija BLINKITA Circle.",

      lifeTitle:
        "Življenje, ki ga zares živiš.",

      lifeLead:
        "Belize, narava, potovanja, ustvarjalnost, izkušnje in kraji, kjer se tvoje življenje odpre.",

      exploreLife:
        "Raziskuj Life",

      shopTitle:
        "Predmeti, znanje in izkušnje.",

      viewAll:
        "Poglej vse →",

      paloText:
        "Original premium Palo Santo · 100% Palo Santo essential oil",

      bookText:
        "Knjiga / digitalna izdaja",

      digitalText:
        "E-knjiga · aktivacije · avdio",

      discover:
        "Odkrij",

      addCart:
        "Dodaj v košarico",

      circleText:
        "Skupnost, dogodki v živo, skupni Živ Čas in razvijajoča se BLINKITA AI.",

      members:
        "člani",

      collectiveEnergy:
        "kolektivna energija",

      todaysTime:
        "današnji Čas",

      enterCircle:
        "Vstopi v Krog",

      liveTitle:
        "Srečaj me v živo.",

      aiText:
        "Osebno vodenje, spomin in predlogi skozi tvoj BLINKITA svet. Prava AI povezava pride v naslednji fazi.",

      meetAI:
        "Spoznaj BLINKITA AI",

      worldsTitle:
        "En svet. Mnoga vrata.",

      appText:
        "Tvoj BLINKITA svet v žepu.",

      codeText:
        "Vstop v globlji kod Časa.",

      calcTitle:
        "Izračunaj svoj Čas",

      calcText:
        "Prva različica je pripravljena za priklop obstoječega tradicionalnega Tzolk'in engine-a.",

      myself:
        "Jaz",

      another:
        "Druga oseba",

      event:
        "Dogodek",

      business:
        "Poslovanje",

      project:
        "Projekt"

    },


    en: {

      skip:
        "Skip intro",

      slide1a:
        "You think you live through time.",

      slide1b:
        "What if time lives through you?",

      slide2a:
        "Time is not simply something that passes.",

      slide2b:
        "It is the space through which you live.",

      slide3title:
        "Five doors.",

      slide3main:
        "One living world.",

      slide4a:
        "BLINKITA",

      slide4b:
        "a living digital world.",

      slide4c:
        "A space for the human who is ready to live differently.",

      enter:
        "Enter BLINKITA",

      enterBlinkita:
        "Enter BLINKITA",

      navWorlds:
        "Worlds",

      navShop:
        "Shop",

      navLive:
        "Live",

      navCircle:
        "Circle",

      myBlinkita:
        "My BLINKITA",

      cart:
        "Cart",

      todayTime:
        "Today in Living Time",

      traditionalCount:
        "Traditional count · placeholder",

      calculate:
        "Calculate",

      heroTitle:
        "a living digital world.",

      heroText:
        "Explore the stories, tools, experiences and worlds that make BLINKITA.",

      bodyStory:
        "Your body has a story.",

      mindStory:
        "Change the story you live from.",

      timeStory:
        "Time is the space through which you live.",

      lifeStory:
        "Life is meant to be lived.",

      explore:
        "Explore →",

      bodyLead:
        "Your personal story. A journey that became part of BLINKITA.",

      bodyText:
        "Programs, coaching, body experiences and products that will gradually unfold into their own world.",

      meetStory:
        "Meet the story",

      mindTitle:
        "What are you ready to change?",

      mindLead:
        "Coaching, audio, programs and deeper work with the stories shaping your life.",

      exploreMind:
        "Explore Mind",

      timeLead:
        "Time is not simply something that passes. It is the space through which you live.",

      timeText:
        "Traditional Tzolk'in, personal calculations, daily Time and the future collective energy of BLINKITA Circle.",

      lifeTitle:
        "A life you truly live.",

      lifeLead:
        "Belize, nature, travel, creativity, experiences and places where your life opens.",

      exploreLife:
        "Explore Life",

      shopTitle:
        "Objects, knowledge and experiences.",

      viewAll:
        "View all →",

      paloText:
        "Original premium Palo Santo · 100% Palo Santo essential oil",

      bookText:
        "Book / digital edition",

      digitalText:
        "E-book · activations · audio",

      discover:
        "Discover",

      addCart:
        "Add to cart",

      circleText:
        "Community, live events, shared Living Time and the evolving BLINKITA AI.",

      members:
        "members",

      collectiveEnergy:
        "collective energy",

      todaysTime:
        "today's Time",

      enterCircle:
        "Enter the Circle",

      liveTitle:
        "Meet me live.",

      aiText:
        "Personal guidance, memory and suggestions through your BLINKITA world. The real AI connection comes in the next phase.",

      meetAI:
        "Meet BLINKITA AI",

      worldsTitle:
        "One world. Many doors.",

      appText:
        "Your BLINKITA world in your pocket.",

      codeText:
        "Enter the deeper code of Time.",

      calcTitle:
        "Calculate your Time",

      calcText:
        "The first version is ready to connect with the existing traditional Tzolk'in engine.",

      myself:
        "Myself",

      another:
        "Another person",

      event:
        "Event",

      business:
        "Business",

      project:
        "Project"

    }

  };


  /* =======================================================
     SET LANGUAGE
  ======================================================= */

  function setLanguage(language) {

    const dictionary =
      translations[language];


    if (!dictionary) {
      return;
    }


    document.documentElement.lang =
      language;


    document
      .querySelectorAll("[data-i18n]")
      .forEach(
        (element) => {

          const key =
            element.dataset.i18n;


          if (
            dictionary[key] !== undefined
          ) {

            element.textContent =
              dictionary[key];

          }

        }
      );


    document
      .querySelectorAll(
        ".language"
      )
      .forEach(
        (button) => {

          button.classList.toggle(
            "active",
            button.dataset.lang ===
              language
          );

        }
      );


    document
      .querySelectorAll(
        ".main-language-button"
      )
      .forEach(
        (button) => {

          button.classList.toggle(
            "active",
            button.dataset.lang ===
              language
          );

        }
      );

  }


  /* =======================================================
     LANGUAGE BUTTONS
  ======================================================= */

  document
    .querySelectorAll(
      ".language, .main-language-button"
    )
    .forEach(
      (button) => {

        button.addEventListener(
          "click",
          (event) => {

            event.preventDefault();
            event.stopPropagation();

            setLanguage(
              button.dataset.lang
            );

          }
        );

      }
    );


  /* =======================================================
     CALCULATOR
  ======================================================= */

  window.openCalc =
    function () {

      const calc =
        document.getElementById(
          "calc"
        );


      if (calc) {

        calc.classList.add(
          "open"
        );

      }

    };


  window.closeCalc =
    function () {

      const calc =
        document.getElementById(
          "calc"
        );


      if (calc) {

        calc.classList.remove(
          "open"
        );

      }

    };


  /* =======================================================
     CART
  ======================================================= */

  let cartCount = 0;


  window.addCart =
    function (productName) {

      cartCount++;


      const cartNumber =
        document.querySelector(
          ".cart span:last-child"
        );


      if (cartNumber) {

        cartNumber.textContent =
          cartCount;

      }


      console.log(
        "Added to cart:",
        productName
      );

    };


  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealElements =
    document.querySelectorAll(
      ".reveal"
    );


  if (
    "IntersectionObserver" in window
  ) {

    const observer =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(
            (entry) => {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  "visible"
                );

                observer.unobserve(
                  entry.target
                );

              }

            }
          );

        },
        {
          threshold: 0.12
        }
      );


    revealElements.forEach(
      (element) => {

        observer.observe(
          element
        );

      }
    );

  } else {

    revealElements.forEach(
      (element) => {

        element.classList.add(
          "visible"
        );

      }
    );

  }


  /* =======================================================
     ESC — CLOSE CALCULATOR
  ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key !== "Escape"
      ) {
        return;
      }


      const calc =
        document.getElementById(
          "calc"
        );


      if (calc) {

        calc.classList.remove(
          "open"
        );

      }

    }
  );


  /* =======================================================
     INITIAL LANGUAGE
  ======================================================= */

  setLanguage("sl");


  /* =======================================================
     READY
  ======================================================= */

  console.log(
    "BLINKITA V5 loaded successfully."
  );

});
