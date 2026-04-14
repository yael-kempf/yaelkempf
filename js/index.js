function loadImage(e, t) {
  return new Promise((n, o) => {
    var s = new XMLHttpRequest(),
      a = !1;
    s.open("GET", e, !0),
      (s.responseType = "arraybuffer"),
      (s.onprogress = function (e) {
        e.lengthComputable
          ? t(parseInt((e.loaded / e.total) * 100))
          : a || ((a = !0), t(-1));
      }),
      (s.onloadend = function () {
        if (s.status.toString().match(/^2/)) {
          a || t(100);
          var e = {},
            r = s.getAllResponseHeaders().match(/^Content-Type\:\s*(.*?)$/im);
          r && r[1] && (e.type = r[1]);
          var p = new Blob([this.response], e);
          n(window.URL.createObjectURL(p));
        } else o(s);
      }),
      s.send();
  });
}

// Script for preloader text
$(function () {
  let progressI = -1;
  let lastP = 0;

  function onPreloadProgress(p) {
    if (p === lastP) return;
    lastP = p;
    let messages = [
      "Do you believe in destiny?",
      "I knew you would be there",
      "LOL",
      "What does it mean to be curious?",
    ];

    let i = Math.max(Math.floor((messages.length * p) / 99 /*100*/), 0);
    if (p === 100) {
      onFinishPreload();
    }
    if (progressI === i) {
      return;
    }
    $("#loading-text").text(messages[i]);
    progressI = i;
  }

  function onFinishPreload() {
    $(".until-loader").css("display", "none");
    let el = $(".loading-container").get(0);
    el.classList.add("animate__animated", "animate__fadeOut");
    el.addEventListener("animationend", () => {
      el.remove();
    });
  }

  // Script for preloader images
  if (
    !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    let percentages = [];
    let linkElements = $(".inner a");
    linkElements.each(function (i) {
      let el = $(this);
      let url = el.attr("data-url");
      let isVideo = url.endsWith("mp4");
      percentages[i] = 0;

      let setSrc;
      if (isVideo) {
        let video = $('<video class="bg-element" muted loop />').attr(
          "id",
          "bg-" + i
        );
        $(".work-background").append(video);
        let source = video.append('<source type="video/mp4"/>');
        setSrc = (blobUrl) => source.attr("src", blobUrl);
      } else {
        //img
        let img = $('<div class="bg-element" />').attr("id", "bg-" + i);
        $(".work-background").append(img);
        setSrc = (blobUrl) =>
          img.css("background-image", 'url("' + blobUrl + '")');
      }

      loadImage(url, function (p) {
        percentages[i] = p;
        onPreloadProgress(
          percentages.reduce((p, c, i) => p + (c - p) / (i + 1), 0)
        );
      })
        .then((blobUrl) => {
          setSrc(blobUrl);
        })
        .catch(() => {
          percentages[i] = 100;
          onPreloadProgress(
            percentages.reduce((p, c, i) => p + (c - p) / (i + 1), 0)
          );
        })
        .finally(() => {
          el.on({
            mouseenter: function () {
              linkElements.addClass("unselected-link");
              el.removeClass("unselected-link");
              $(".bg-element").hide();
              let bg = $("#bg-" + i);
              bg.show();
              if (bg.is("video")) {
                bg.get(0).play();
              }
            },
            mouseleave: function () {
              $(".bg-element").hide();
              linkElements.removeClass("unselected-link");
              $("video").each(function () {
                this.pause();
                this.currentTime = 0;
              });
            },
          });
        });
    });
  } else {
    if (!sessionStorage.getItem("hide-preloader")) {
      sessionStorage.setItem("hide-preloader", true);
      $("#loading-text").text("Hi Babe");
      setTimeout(() => {
        onFinishPreload();
      }, 1500);
    } else {
      onFinishPreload();
    }
  }

  $("#why-surfers-should-be-fed").on("mouseover", function () {
    let el = $(this);
    let height = el.height();
    el.addClass("why-surfers-should-be-fed");
    setTimeout(() => {
      el.css("height", height).find("span").remove();
    }, 5000);
  });

  // function onResize() {
  //     let height = $(this).height();
  //     let width = $(this).width();
  //     let margin = Math.min(width, height) * .1;
  //     let bg = $('.work-background');
  //     bg.css('top', margin + 'px');
  //     bg.css('width', (width - margin * 2) + 'px');
  //     bg.css('height', (height - margin * 2) + 'px');
  //     bg.css('left', margin + 'px');
  // }
  // $(window).resize(onResize);
  // onResize();
});
