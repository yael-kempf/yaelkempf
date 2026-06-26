function makeDraggable(e){var t=0,n=0,o=0,i=0;function a(a){(a=a||window.event).preventDefault(),t=o-a.clientX,n=i-a.clientY,o=a.clientX,i=a.clientY,e.style.top=e.offsetTop-n+"px",e.style.left=e.offsetLeft-t+"px"}function s(){document.onmouseup=null,document.onmousemove=null}e.onmousedown=function(e){(e=e||window.event).preventDefault(),o=e.clientX,i=e.clientY,document.onmouseup=s,document.onmousemove=a}}function createCustomWindow(e,t,n){n.classList.contains("car3")&&new Audio("assets/car1/car voice.mp4").play();n.classList.contains("car1")&&new Audio("assets/car3/starting car.mp4").play();n.classList.contains("car2")&&new Audio("assets/car2/mixkit-car-double-horn-719.wav").play();var o=document.createElement("div");o.className="custom-window",o.style.backgroundColor="#f0f4f8",o.style.boxShadow="-10px 10px #8f8f8f78",o.innerHTML=`\n      <div class="container-win">\n          <div class="flex">\n              <div onclick="closeCustomWindow()" class="close-btn"><i class="fa fa-close"></i></div>\n              <div class="title">\n              <div class="hr1"></div>\n              <div class="hr2"></div>\n              <span class="title">${e}</span>\n              </div>\n          </div>\n      </div>\n      \n      <iframe src="${t}" width="100%" height="350px"></iframe>`,document.body.appendChild(o);var i=o.offsetWidth,a=o.offsetHeight,s=Math.random()*(window.innerWidth-i),c=Math.random()*(window.innerHeight-a);return s=Math.min(s,window.innerWidth-i),c=Math.min(c,window.innerHeight-a),o.style.left=s+"px",o.style.top=c+"px",makeDraggable(o),o.querySelector(".close-btn").addEventListener("click",(function(){closeCustomWindow(o)})),o}function closeCustomWindow(e){e&&document.body.removeChild(e)}function createDoubleWindowsForBoard(e){createCustomWindow("Advertising","assets/adversatingboard/advertising.html",e.currentTarget||e.srcElement)}function createDoubleWindowsForLetsRock(e){const t=e.currentTarget||e.srcElement;createCustomWindow("Let's Rock Tonight","./car-pages/car1.html",t),createCustomWindow("Let's Rock Tonight","./car-pages/letsrock.html",t)}function createDoubleWindowsForHeart(e){const t=e.currentTarget||e.srcElement;createCustomWindow("Listen With Your Heart","assets/heart/heart.html",t),createCustomWindow("Listen With Your Heart","assets/heart/heartEmbeded.html",t),createCustomWindow("Listen With Your Heart","assets/heart/heartThirdPopup.html",t)}

document.addEventListener("DOMContentLoaded", function() {
  // Handle image GIF swaps on hover and touch
  document.querySelectorAll("img").forEach(function(img) {
    var srcAttr = img.getAttribute("src");
    var gifAttr = img.getAttribute("data-gif-src");

    if (gifAttr) {
      // Mouse hover
      img.addEventListener("mouseenter", function() {
        img.src = gifAttr;
      });
      img.addEventListener("mouseleave", function() {
        img.src = srcAttr;
      });

      // Touch events
      var isTouching = false;
      img.addEventListener("touchstart", function() {
        isTouching = true;
        img.src = gifAttr;
      });
      img.addEventListener("touchend", function() {
        if (isTouching) {
          img.src = srcAttr;
          isTouching = false;
        }
      });
    }

    // Handle click on touch for elements with onclick
    if (img.getAttribute("onclick")) {
      img.addEventListener("touchstart", function() {
        img.style.opacity = "0.7";
      });
      img.addEventListener("touchend", function() {
        img.style.opacity = "1";
        img.click();
      });
    }
  });

  // Handle touch for links
  document.querySelectorAll("a[href]").forEach(function(link) {
    link.addEventListener("touchend", function(e) {
      var href = link.getAttribute("href");
      if (href) {
        e.preventDefault();
        window.location.href = href;
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  var speakerElement = document.querySelector("#speaker-audio");
  if (!speakerElement) return;

  var soundsData = speakerElement.getAttribute("data-sounds").split(",");
  var isPlaying = false;
  var currentSound = null;

  function toggleSound() {
    if (isPlaying) {
      // Stop current sound
      var audioEl = document.getElementById("sound" + currentSound);
      if (audioEl) {
        audioEl.pause();
        audioEl.currentTime = 0;
      }
    } else {
      // Play random sound
      var shuffled = soundsData.slice();
      for (var i = shuffled.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
      }
      currentSound = shuffled[0];
      var audio = document.getElementById("sound" + currentSound);
      if (audio) {
        audio.play();
      }

      // Trigger all GIF animations
      document.querySelectorAll(".hoverable-image, .speaker").forEach(function(el) {
        var gifSrc = el.getAttribute("data-gif-src");
        if (gifSrc) {
          el.setAttribute("src", gifSrc);
        }
      });

      // Start car and heart animations
      var car1 = document.querySelector(".car1");
      var car3 = document.querySelector(".car3");
      var heart = document.querySelector(".heart");
      var music = document.querySelector(".music");

      if (car1) car1.style.animation = "moveForwardBackwardCar1 3s infinite alternate";
      if (car3) car3.style.animation = "moveForwardBackwardCar3 3s infinite alternate";
      if (heart) heart.style.animation = "rotateAnimation 5s linear infinite";
      if (music) music.style.animation = "rotateAnimation 5s linear infinite";
    }
    isPlaying = !isPlaying;
  }

  speakerElement.addEventListener("click", toggleSound);
  speakerElement.addEventListener("touchstart", toggleSound);
});

document.addEventListener("DOMContentLoaded", function() {
  var dogContainer = document.querySelector(".dog-container");
  if (dogContainer) {
    dogContainer.addEventListener("touchstart", function() {
      dogContainer.classList.add("touch-active");
    });
    dogContainer.addEventListener("touchend", function() {
      dogContainer.classList.remove("touch-active");
    });
  }
});

// Pen button
var penImageBtn = document.getElementById("penImage");
if (penImageBtn) {
  penImageBtn.addEventListener("click", function() {
    var penPaint = document.getElementById("penPaint");
    if (penPaint.classList.contains("hidden")) {
      penPaint.classList.remove("hidden");
    } else {
      penPaint.classList.add("hidden");
    }
  });
}

// Close button for pen
var closeBtn = document.getElementById("closeButton");
if (closeBtn) {
  closeBtn.addEventListener("click", function() {
    var penPaint = document.querySelector(".pen-paint");
    if (penPaint) {
      penPaint.classList.add("hidden");
    }
  });
}
