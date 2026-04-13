function locoScroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

function textSplitting() {
  var allh1 = document.querySelectorAll("#sen1 h1");
  allh1.forEach(function (elems) {
    var clutter = "";
    var h1txt = elems.textContent;
    var splittxt = h1txt.split("");
    splittxt.forEach(function (elem) {
      clutter += `<span>${elem}</span>`;
    });
    elems.innerHTML = clutter;
  });
}

function gsapAnimation1() {
  gsap.to("#sen1 h1 span", {
    color: "#E3E3C4",
    stagger: 0.1,
    scrollTrigger: {
      trigger: "#screen2 h1",
      scroller: "#main", // use #main if locomotive implemented
      // markers: true,
      start: "top 50%",
      end: "top -50%",
      scrub: 1,
    },
  });
}

// locoScroll()
// textSplitting()
// gsapAnimation1()

function loaderScreen() {
  gsap.from(".loader .line h1", {
    y: 150,
    stagger: 0.2,
    duration: 0.6,
    delay: 0.2,
  });

  var timer = document.querySelector(".line1-part1 .timer");
  var loader = document.querySelector(".loader");
  var grow = 0;
  var timerInterval = setInterval(function () {
    if (grow < 100) {
      timer.innerHTML = grow++;
    } else {
      timer.innerHTML = grow;
      clearInterval(timerInterval);
    }
  }, 35);

  gsap.from(".line1-part1", {
    opacity: 0,
    delay: 1,
    duration: 1,
    scrub: 1,
  });

  gsap.from(".wait-message", {
    opacity: 0,
    delay: 1.5,
    duration: 1,
    scrub: 1,
  });

  var tl = gsap.timeline();

  tl.to(".loader", {
    delay: 4,
    yPercent: -100,
    duration: 1.1,
    ease: "power4.inOut",
  });

  // tl.from(".screen1 .navbar", {
  //   opacity: 0,
  //   y: 40,
  //   duration: 0.4,
  // }, "-=0.15");

  tl.from(".section-1 .line h1", {
    y: 150,
    stagger: 0.2,
    duration: 0.6,
  }, "-=0.1");

  tl.set(".loader", {
    display: "none",
  });
}

function cursorAnimetion() {
  document.addEventListener("mousemove", function (dets) {
    gsap.to(".crsr", {
      left: dets.x,
      top: dets.y,
    });
  });

  Shery.makeMagnet(".navbar_links a, .navbar_menu", {
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
  });
}

function setupShowreelVideo() {
  var video = document.querySelector(".sec-2-video");

  if (!video) {
    return;
  }

  video.autoplay = true;
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.load();

  function tryPlayVideo() {
    var playPromise = video.play();

    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(function () {});
    }
  }

  if (video.readyState >= 2) {
    tryPlayVideo();
  } else {
    video.addEventListener("canplay", tryPlayVideo, { once: true });
  }

  window.addEventListener("load", tryPlayVideo, { once: true });
  document.addEventListener("pointerdown", tryPlayVideo, { once: true });
}

loaderScreen();
cursorAnimetion();
// setupShowreelVideo();
