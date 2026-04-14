/* App
 */
console.log("penpage");
var app = {
  presets: [
    {
      name: "Default",
      value:
        "5 .5 5 3 normal 0 1 10 0 0 0 1 0 0 0 0 0.5 0.8 0 0 0 0 0 -0 0 0 40 -5",
    },
    {
      name: "Original",
      value:
        "2.75 .15 5 3 multiply 0 0 10 0.7 -1 1 0 1.3 0 -1 1 0 0 1 -1 1 -1 0 0 0 0 30 -5",
    },
    {
      name: "Fluid",
      value:
        "5 .5 5 3 multiply 0 1 10 0.7 -1 1 0 1.3 0 -1 1 0 0 1 -1 1 -1 0 0 0 0 30 -5",
    },
    {
      name: "Pink",
      value:
        "5 .5 5 3 difference 1 1 10 0 0 0 0 .6 0 0 0 .5 -.3 0 0 0 2 0 0 0 0 30 -5",
    },
    {
      name: "Fire",
      value:
        "5 .5 5 3 multiply 1 1 10 0 0 1 1 0 0 1 1 0 0 0 0 0 0 0 0 0 0 10 -5",
    },
    {
      name: "Sharp",
      value:
        "5 .5 5 3 multiply 0 1 10 0 0 0 0 0 0 1.1 0 0 0 1 -1 -0.7 0 0.1 0 0 0 100 -20",
    },
    {
      name: "Neon",
      value:
        "5 .5 5 3 multiply 1 1 10 0 0 0 0 1 0 -1 1 2.8 -1 0.7 0.3 -0.5 0.5 1 0 0 0 30 -5",
    },
    {
      name: "Hot",
      value:
        "5 .5 5 3 multiply 1 1 10 0 0 0 1.6 2 0 0 2 5 -1.1 0 1.3 0 0 0.1 0 0 0 30 -5",
    },
    {
      name: "Energy",
      value:
        "3.4 .5 5 3 screen 1 1 3 0 0 0 1.7 0.8 0 0 2 5 -1.1 0 1.3 0 0 0.1 0.7 0 0 10 -0.6",
    },
  ],
  config: {}, // Nothing here, since the first preset in the list is loaded by default.
  storage: {
    dragging: false,
    isdemo: true,
    path: [],
    shapes: [],
    last: null,
    composites: [
      "normal",
      "multiply",
      "screen",
      "overlay",
      "darken",
      "lighten",
      "color-dodge",
      "color-burn",
      "hard-light",
      "soft-light",
      "difference",
      "exclusion",
      "hue",
      "saturation",
      "color",
      "luminosity",
      "clear",
      "copy",
      "destination",
      "source-over",
      "destination-over",
      "source-in",
      "destination-in",
      "source-out",
      "destination-out",
      "source-atop",
      "destination-atop",
      "xor",
      "lighter",
    ],
    order: [
      "scale",
      "speed",
      "linewidth",
      "layers",
      "composite",
      "night",
      "shader",
      "blur",
      "rr",
      "rg",
      "rb",
      "ra",
      "r1",
      "gr",
      "gg",
      "gb",
      "ga",
      "g1",
      "br",
      "bg",
      "bb",
      "ba",
      "b1",
      "ar",
      "ag",
      "ab",
      "aa",
      "a1",
    ],
  },
};

/* Menu
 */

$(".trigger-menu").on("click", function (e) {
  e.stopPropagation();
  $("#wrapper").toggleClass("wrapped");
});

$(".trigger-clear").on("click", function (e) {
  app.storage.shapes = [];
});

$(".trigger-save").on("click", function () {
  if (typeof Storage === "undefined")
    return alert("Sorry! No Web Storage support...");

  var presets = JSON.parse(localStorage["presets"] || null) || [],
    name = prompt("Name this preset", "preset_" + presets.length),
    values = [];

  if (!name) return;

  var order = app.storage.order;
  app.storage.order.forEach(function (input) {
    if (!$("#" + input).length) return;

    var $input = $("#" + input);

    if ($input.is('[type="checkbox"]'))
      values.push($input.prop("checked") ? "1" : "0");
    else values.push($input.val());
  });

  if (values.length != order.length)
    return alert(
      "Sorry! The configuration length & input order length doesn't match..."
    );

  presets.push({
    name: name,
    value: values.join(" "),
  });

  localStorage.setItem("presets", JSON.stringify(presets));

  $("#preset").append(
    '<option value="' + values.join(" ") + '">' + name + "</option>"
  );
});

$(".canvas").on("click", function () {
  $("#wrapper").removeClass("wrapped");
});

/* Controls (sidebar)
 */

if (typeof Storage !== "undefined")
  app.presets = app.presets.concat(
    JSON.parse(localStorage["presets"] || null) || []
  );

app.presets.forEach(function (preset, index) {
  $("#preset").append(
    '<option value="' +
      preset.value +
      '"' +
      (index == 0 ? " selected" : "") +
      ">" +
      preset.name +
      "</option>"
  );
});

app.storage.composites.forEach(function (composite) {
  $("#composite").append(
    '<option value="' + composite + '">' + composite + "</option>"
  );
});

$("[data-config]").on("change", function () {
  app.config[$(this).data("config")] = $(this).val();
});

$("#blur").on("change", function () {
  document
    .querySelector("#filter feGaussianBlur")
    .setAttribute("stdDeviation", $(this).val());
});

$("[data-shader]").on("change", function () {
  var order = ["r", "g", "b", "a", "1"],
    value = [];
  for (var x = 0; x < 4; x++) {
    for (var y = 0; y < 5; y++) {
      if (!$("#" + order[x] + order[y]).length) continue;
      value.push(
        parseFloat(Number($("#" + order[x] + order[y]).val()).toFixed(2))
      );
    }
  }
  document
    .querySelector("#filter feColorMatrix")
    .setAttribute("values", value.join(" "));
});

$("#shader").on("change", function () {
  $(this).prop("checked")
    ? $("body").addClass("has-shader")
    : $("body").removeClass("has-shader");
});

$("#night").on("change", function () {
  $(this).prop("checked")
    ? $("body").addClass("has-night")
    : $("body").removeClass("has-night");
});

function handleTouche(e) {
  var original = e.originalEvent;
  if (original && window.TouchEvent && original instanceof TouchEvent) {
    if (original.changedTouches && original.changedTouches.length)
      return {
        x: original.changedTouches[0].clientX,
        y: original.changedTouches[0].clientY,
      };
    else if (original.targetTouches && original.targetTouches.length)
      return {
        x: original.targetTouches[0].clientX,
        y: original.targetTouches[0].clientY,
      };
  } else {
    return { x: e.clientX, y: e.clientY };
  }
}

$(".slider").each(function () {
  var $slider = $(this),
    $input = $(this).find("input"),
    min = typeof $(this).data("min") === "undefined" ? 1 : $(this).data("min"),
    max =
      typeof $(this).data("max") === "undefined" ? 100 : $(this).data("max"),
    step = $(this).data("step") || 0,
    acc = $(this).data("accuracy") || 0,
    vertical = $(this).hasClass("slider-vertical");

  var $thumb = $(this).find(".slider-thumb");
  $thumb.on("mousedown touchstart", function () {
    clearTimeout(app.storage.timeoutDragging);
    app.storage.dragging = $input;
  });

  $input.data("update", function (e, animate, def) {
    if (e) {
      var coordinates = handleTouche(e);
      var mouse = vertical
          ? (coordinates.y - $slider.offset().top) / $slider.height()
          : (coordinates.x - $slider.offset().left) / $slider.width(),
        value = min + (vertical ? 1 - mouse : mouse) * (max - min);
      value = +Math.max(
        min,
        Math.min(max, step ? Math.round(value / step) * step : value)
      ).toFixed(acc);
    } else {
      var value = def ? def : $input.val();
    }

    var percent = ((value - min) / (max - min)) * 100 + "%";

    if (animate) {
      vertical
        ? $thumb.animate({ bottom: percent }, { duration: 1000 })
        : $thumb.animate(
            { left: percent },
            {
              duration: 1000,
              step: function (i) {
                var a = (min + (i / 100) * (max - min)).toFixed(acc);
                $input.val(a).trigger("change");
                $('label[for="' + $input.attr("id") + '"]').length &&
                  $('label[for="' + $input.attr("id") + '"]')
                    .find("span")
                    .html(a);
              },
              complete: function () {
                $input.val(value).trigger("change");
                $('label[for="' + $input.attr("id") + '"]').length &&
                  $('label[for="' + $input.attr("id") + '"]')
                    .find("span")
                    .html(value);
              },
            }
          );
    } else {
      vertical
        ? $thumb.css({ bottom: percent })
        : $thumb.css({ left: percent });
      $('label[for="' + $input.attr("id") + '"]').length &&
        $('label[for="' + $input.attr("id") + '"]')
          .find("span")
          .html(value);
      $input.val(value).trigger("change");
    }
  });

  $(this).on("click", function (e) {
    if (app.storage.dragging) return;

    $input.data("update")(e, true);
  });

  $input.data("update")(null);
});

$(document)
  .on("mouseup", function () {
    app.storage.timeoutDragging = setTimeout(function () {
      app.storage.dragging = false;
    }, 100);
  })
  .on("mousemove", function (e) {
    if (!app.storage.dragging) return;

    var $input = app.storage.dragging;

    $input.data("update")(e);
  });

$("#preset")
  .on("change", function () {
    var order = app.storage.order,
      value = $(this).val();

    value.split(" ").forEach(function (v, i) {
      if (!order[i] || !$("#" + order[i]).length) return;

      var $input = $("#" + order[i]);
      if ($input.data("update")) {
        $input.data("update")(null, order[i] == "cursor" ? false : true, v);
      } else if ($input.is('[type="number"]')) {
        $({ a: $input.val() }).animate(
          { a: v },
          {
            duration: 1000,
            step: function (i) {
              $input.val(i.toFixed(1)).trigger("change");
            },
            complete: function () {
              $input.val(v).trigger("change");
            },
          }
        );
      } else if ($input.is('[type="checkbox"]')) {
        $input.prop("checked", v == 1 ? true : false).trigger("change");
      } else {
        $input.val(v).trigger("change");
      }
    });
  })
  .trigger("change");

/* Drawing
 */

var temporary = document.querySelector("canvas#temporary"),
  temporaryCtx = temporary.getContext("2d"),
  render = document.querySelector("canvas#render"),
  renderCtx = render.getContext("2d");

render.width = temporary.width = window.innerWidth;
render.height = temporary.height = window.innerHeight;

$(render)
  .on("mousedown touchstart", function (e) {
    if (app.storage.isdemo) {
      app.storage.shapes = [];
      app.storage.isdemo = false;
    }

    var coordinates = handleTouche(e);
    app.storage.path = [coordinates];

    temporaryCtx.beginPath();
    temporaryCtx.strokeStyle = "#ccc";
    temporaryCtx.moveTo(coordinates.x, coordinates.y);
  })
  .on("mousemove touchmove", function (e) {
    if (!app.storage.path.length) return;

    var now = +new Date();
    var last = app.storage.path[app.storage.path.length - 1];
    var coordinates = handleTouche(e);

    if (last.x == coordinates.x && last.y == coordinates.y) return;

    if (
      now - app.storage.last > 50 &&
      Math.sqrt(
        (last.x - coordinates.x) * (last.x - coordinates.x) +
          (last.y - coordinates.y) * (last.y - coordinates.y)
      ) > 10
    ) {
      app.storage.path.push({ x: coordinates.x, y: coordinates.y });
      app.storage.last = now;
    }

    temporaryCtx.lineTo(coordinates.x, coordinates.y);
    temporaryCtx.stroke();
    temporaryCtx.moveTo(coordinates.x, coordinates.y);
  })
  .on("mouseup touchend touchcancel touchleave mouseleave", function (e) {
    if (!app.storage.path.length) return;

    var coordinates = handleTouche(e);

    var last = app.storage.path[app.storage.path.length - 1];
    if (last.x != coordinates.x || last.y != coordinates.y)
      app.storage.path.push({ x: coordinates.x, y: coordinates.y });

    temporary.width = temporary.width;

    app.storage.shapes.push({
      path: app.storage.path,
      linewidth: app.config.linewidth || 5,
    });
    app.storage.path = [];
  });

$(document).on("keydown", function (e) {
  if (e.keyCode == 90 && (e.ctrlKey || e.metaKey))
    app.storage.shapes.splice(-1, 1);
});

function drawPath(time) {
  for (var iL = 0; iL < app.config.layers; iL++) {
    renderCtx.strokeStyle = renderCtx.fillStyle =
      "rgb(" +
      (iL % 3 == 0 ? 255 : 0) +
      "," +
      (iL % 3 == 1 ? 255 : 0) +
      "," +
      (iL % 3 == 2 ? 255 : 0) +
      ")";

    app.storage.shapes.forEach(function (shape, iS) {
      renderCtx.beginPath();

      shape.path.forEach(function (curve, iP) {
        var shiftX =
            app.config.scale *
            Math.sin(
              ((iP + 1) * (iS + 1)) / (iL + 1) +
                (time * -app.config.speed) / 100
            ),
          shiftY =
            app.config.scale *
            Math.cos(
              ((iP + 1) * (iS + 1)) / (iL + 1) +
                (time * -app.config.speed) / 100
            );
        var thisCurve = { x: curve.x + shiftX, y: curve.y + shiftY };

        if (!iP && iP == shape.path.length - 1)
          renderCtx.arc(
            thisCurve.x,
            thisCurve.y,
            shape.linewidth,
            0,
            2 * Math.PI,
            false
          );
        else if (!iP) renderCtx.moveTo(thisCurve.x, thisCurve.y);
        else if (iP != shape.path.length - 1) {
          var shiftX =
              app.config.scale *
              Math.sin(
                ((iP + 2) * (iS + 1)) / (iL + 1) +
                  (time * -app.config.speed) / 100
              ),
            shiftY =
              app.config.scale *
              Math.cos(
                ((iP + 2) * (iS + 1)) / (iL + 1) +
                  (time * -app.config.speed) / 100
              );
          var nextCurve = {
            x: shape.path[iP + 1].x + shiftX,
            y: shape.path[iP + 1].y + shiftY,
          };
          var xc = (thisCurve.x + nextCurve.x) / 2;
          var yc = (thisCurve.y + nextCurve.y) / 2;
          renderCtx.quadraticCurveTo(thisCurve.x, thisCurve.y, xc, yc);
        }
      });

      renderCtx.lineWidth = shape.linewidth;
      shape.path.length == 1 ? renderCtx.fill() : renderCtx.stroke();
    });
  }
}

function animate(time) {
  render.width = render.width;

  renderCtx.globalCompositeOperation = app.config.composite;
  renderCtx.lineCap = "round";
  drawPath(time);
  return requestAnimationFrame(animate);
}

animate();

$(window).resize(function () {
  render.width = temporary.width = window.innerWidth;
  render.height = temporary.height = window.innerHeight;
});

function demo() {
  var shapes = [
      {
        path: [
          { x: 502, y: 158 },
          { x: 535, y: 428 },
        ],
        linewidth: "5",
      },
      {
        path: [
          { x: 497, y: 198 },
          { x: 520, y: 388 },
          { x: 516, y: 399 },
        ],
        linewidth: "5",
      },
      {
        path: [
          { x: 466, y: 219 },
          { x: 525, y: 194 },
          { x: 608, y: 232 },
          { x: 567, y: 343 },
          { x: 481, y: 429 },
          { x: 463, y: 409 },
          { x: 467, y: 403 },
        ],
        linewidth: "5",
      },
      {
        path: [
          { x: 632, y: 188 },
          { x: 657, y: 383 },
          { x: 662, y: 400 },
        ],
        linewidth: "5",
      },
      {
        path: [
          { x: 632, y: 193 },
          { x: 671, y: 166 },
          { x: 726, y: 187 },
          { x: 712, y: 232 },
          { x: 674, y: 252 },
          { x: 686, y: 264 },
          { x: 740, y: 343 },
          { x: 765, y: 394 },
          { x: 766, y: 392 },
        ],
        linewidth: "5",
      },
      {
        path: [
          { x: 814, y: 372 },
          { x: 838, y: 121 },
          { x: 841, y: 110 },
          { x: 848, y: 120 },
          { x: 882, y: 214 },
          { x: 924, y: 336 },
          { x: 953, y: 389 },
        ],
        linewidth: "5",
      },
      {
        path: [
          { x: 825, y: 280 },
          { x: 896, y: 270 },
          { x: 920, y: 269 },
        ],
        linewidth: "5",
      },
      {
        path: [
          { x: 925, y: 112 },
          { x: 1002, y: 355 },
          { x: 999, y: 341 },
          { x: 997, y: 233 },
          { x: 1024, y: 124 },
          { x: 1029, y: 109 },
        ],
        linewidth: "5",
      },
      {
        path: [
          { x: 1016, y: 180 },
          { x: 1047, y: 252 },
          { x: 1066, y: 322 },
          { x: 1076, y: 337 },
          { x: 1072, y: 236 },
          { x: 1090, y: 105 },
          { x: 1107, y: 55 },
        ],
        linewidth: "5",
      },
      {
        path: [
          { x: 1317, y: 59 },
          { x: 1242, y: 224 },
          { x: 1239, y: 234 },
          { x: 1239, y: 232 },
        ],
        linewidth: "5",
      },
      {
        path: [
          { x: 1207, y: 141 },
          { x: 1220, y: 208 },
          { x: 1229, y: 258 },
          { x: 1242, y: 253 },
          { x: 1305, y: 221 },
          { x: 1343, y: 202 },
        ],
        linewidth: "5",
      },
    ],
    position = { x: null, y: null, w: null, h: null };

  shapes.forEach(function (shape) {
    shape.path.forEach(function (point) {
      position.x = Math.min(point.x, position.x || point.x);
      position.y = Math.min(point.y, position.y || point.y);
      position.w = Math.max(point.x, position.w || point.x);
      position.h = Math.max(point.y, position.h || point.y);
    });
  });

  var rW = (window.innerWidth * 0.75) / (position.w - position.x),
    rH = (window.innerHeight * 0.75) / (position.h - position.y),
    wH = window.innerWidth / 2 - ((position.w - position.x) * rH) / 2,
    hH = window.innerHeight / 2 - ((position.h - position.y) * rH) / 2,
    wW = window.innerWidth / 2 - ((position.w - position.x) * rW) / 2,
    hW = window.innerHeight / 2 - ((position.h - position.y) * rW) / 2;

  shapes.forEach(function (shape) {
    shape.path.forEach(function (point) {
      if (rH < rW) {
        point.x = parseInt((point.x - position.x) * rH + wH);
        point.y = parseInt((point.y - position.y) * rH + hH);
      } else {
        point.x = parseInt((point.x - position.x) * rW + wW);
        point.y = parseInt((point.y - position.y) * rW + hW);
      }
    });
  });

  app.storage.shapes = shapes;
}

demo();
