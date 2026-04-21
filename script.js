let locoScroll;
let resizeTimer;

function locomotiveAnime() {
  var main = document.querySelector("#main");
  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  var useSmoothScroll = !prefersReducedMotion && window.innerWidth > 1024;

  if (!main || !window.LocomotiveScroll) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  locoScroll = new LocomotiveScroll({
    el: main,
    smooth: useSmoothScroll,
    lerp: 0.08,
    tablet: {
      smooth: false,
    },
    smartphone: {
      smooth: false,
    },
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(main, {
    scrollTop(value) {
      if (arguments.length) {
        return locoScroll.scrollTo(value, 0, 0);
      }

      return locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: useSmoothScroll ? "transform" : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", function () {
    if (locoScroll) {
      locoScroll.update();
    }
  });

  if (document.querySelector(".loader")) {
    locoScroll.stop();
  }

  ScrollTrigger.refresh();
}

function refreshSmoothScroll() {
  ScrollTrigger.refresh();

  if (!locoScroll) {
    return;
  }

  requestAnimationFrame(function () {
    locoScroll.update();

    if (
      !document.querySelector(".loader") ||
      window.getComputedStyle(document.querySelector(".loader")).display ===
        "none"
    ) {
      locoScroll.start();
    }
  });
}

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
    // delay: 4,
    yPercent: -100,
    duration: 1.1,
    ease: "power4.inOut",
  });

  tl.from(
    ".screen1 .navbar",
    {
      opacity: 0,
      y: 40,
      duration: 0.4,
    },
    "-=0.15",
  );

  tl.from(
    ".section-1 .line h1",
    {
      y: 150,
      stagger: 0.2,
      duration: 0.6,
    },
    "-=0.1",
  );

  tl.set(".loader", {
    display: "none",
  });

  tl.call(refreshSmoothScroll);
}

function cursorAnimation() {
  var cursor = document.querySelector(".crsr");

  if (!cursor) {
    return;
  }

  var moveCursorX = gsap.quickTo(cursor, "left", {
    duration: 0.18,
    ease: "power3.out",
  });
  var moveCursorY = gsap.quickTo(cursor, "top", {
    duration: 0.18,
    ease: "power3.out",
  });
  document.addEventListener("mousemove", function (dets) {
    moveCursorX(dets.clientX);
    moveCursorY(dets.clientY);
  });

  Shery.makeMagnet(".navbar_links a, .navbar_menu", {
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 0.6,
  });
}

function setupShowreelVideo() {
  var video = document.querySelector(".sec-2-video");
  var videoWrap = document.querySelector(".sec-2-video-wrap");
  var videoImg = videoWrap ? videoWrap.querySelector(".video-img") : null;
  var playButton = document.querySelector(".crsr-video");

  if (!video) {
    return;
  }

  // Ensure image is visible initially
  if (videoImg) {
    videoImg.style.display = "block";
  }

  video.autoplay = false;
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.load();

  function hideImage() {
    if (videoImg) {
      videoImg.style.display = "none";
    }
  }

  function showImage() {
    if (videoImg) {
      videoImg.style.display = "block";
    }
  }

  function unmute() {
    video.muted = false;
    video.defaultMuted = false;
  }

  function playVideo() {
    var playPromise = video.play();

    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(function () {});
    }

    hideImage();
    unmute();
  }

  // Unmute and hide image when video plays
  video.addEventListener("play", function () {
    hideImage();
    unmute();
  });

  // Show image when video pauses
  video.addEventListener("pause", showImage);

  // Show image when video ends
  video.addEventListener("ended", showImage);

  // Play video only when clicking on the play button
  if (playButton) {
    playButton.addEventListener("click", playVideo);
  }

  // Also allow clicking on the video wrap to play
  if (videoWrap) {
    videoWrap.addEventListener("click", playVideo);
  }
}

function sheryAnimation() {
  Shery.imageEffect(".image-div", {
    style: 5,
    gooey: true,
    // debug:true,
    config: {
      a: { value: 2, range: [0, 30] },
      b: { value: 0.75, range: [-1, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 0.7241195453907675 },
      gooey: { value: true },
      infiniteGooey: { value: false },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1.23, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 0 },
      noise_speed: { value: 0.5, range: [0, 10] },
      metaball: { value: 0.33, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0.01, range: [0, 0.1] },
      noise_height: { value: 0.5, range: [0, 2] },
      noise_scale: { value: 10, range: [0, 100] },
    },
  });
}

function cursorAnimation2() {
  var videoContainer = document.querySelector(".sec-2-video-wrap");
  var video = document.querySelector(".sec-2-video-wrap video");
  var videoImg = document.querySelector(".video-img");
  videoContainer.addEventListener("mouseenter", function () {
    videoContainer.addEventListener("mousemove", function (dets) {
      gsap.to(".crsr", {
        opacity: 0,
      });
      gsap.to(".crsr-video", {
        left: dets.x - 600,
        y: dets.y - 300,
      });
    });
  });
  videoContainer.addEventListener("mouseleave", function () {
    gsap.to(".crsr", {
      opacity: 1,
    });
    gsap.to(".crsr-video", {
      left: "70%",
      top: "-15%",
    });
  });

  var flag = 0;
  videoContainer.addEventListener("click", function () {
    if (flag == 0) {
      video.play();
      video.style.opacity = 1;
      videoImg.style.opacity = 0;
      document.querySelector(".crsr-video").innerHTML =
        `<i class="ri-pause-mini-fill"></i>`;
      gsap.to(".crsr-video", {
        scale: 0.5,
      });
      flag = 1;
    } else {
      video.pause();
      video.style.opacity = 0;
      videoImg.style.opacity = 1;
      document.querySelector(".crsr-video").innerHTML =
        `<i class="ri-play-mini-fill"></i>`;
      gsap.to(".crsr-video", {
        scale: 1,
      });
      flag = 0;
    }
  });
}

function flagAnimation() {
  document.addEventListener("mousemove", function (dets) {
    gsap.to(".sec-1-flag", {
      x: dets.x,
      y: dets.y,
    });
  });

  document
    .querySelector(".line3-txt")
    .addEventListener("mouseenter", function () {
      gsap.to(".sec-1-flag", {
        opacity: 1,
      });
    });

  document
    .querySelector(".line3-txt")
    .addEventListener("mouseleave", function () {
      gsap.to(".sec-1-flag", {
        opacity: 0,
      });
    });
}

function texttillateAnime(effect, element) {
  $(element).on("mouseenter", function () {
    gsap.from(element, {
      delay: 0.5,
      duration: 1,
      onStart: function () {
        $(element).textillate({ in: { effect: effect } });
      },
    });
  });
}

locomotiveAnime();
loaderScreen();
cursorAnimation();
setupShowreelVideo();
sheryAnimation();
cursorAnimation2();
flagAnimation();
texttillateAnime("fadeIn", ".sec-6-heading")
