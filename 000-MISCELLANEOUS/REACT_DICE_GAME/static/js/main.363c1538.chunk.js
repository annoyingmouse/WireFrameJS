(this["webpackJsonpdice-game"] = this["webpackJsonpdice-game"] || []).push([
  [0],
  {
    12: function (e, a, t) {
      e.exports = t(26);
    },
    17: function (e, a, t) {},
    18: function (e, a, t) {},
    19: function (e, a, t) {},
    20: function (e, a, t) {},
    26: function (e, a, t) {
      "use strict";
      t.r(a);
      var c = t(0),
        r = t.n(c),
        n = t(4),
        l = t.n(n),
        s =
          (t(17),
          t(18),
          t(19),
          function (e) {
            return r.a.createElement(
              "section",
              { className: e.player.decorator },
              r.a.createElement(
                "div",
                { className: "container" },
                r.a.createElement("h2", null, e.player.name),
                r.a.createElement(
                  "div",
                  { className: "view" },
                  r.a.createElement(
                    "div",
                    { className: "dice", "data-value": e.player.value },
                    r.a.createElement(
                      "div",
                      { className: "side front" },
                      r.a.createElement("div", { className: "dot center" }),
                    ),
                    r.a.createElement("div", { className: "side front inner" }),
                    r.a.createElement(
                      "div",
                      { className: "side right" },
                      r.a.createElement("div", { className: "dot dtop dleft" }),
                      r.a.createElement("div", {
                        className: "dot dbottom dright",
                      }),
                    ),
                    r.a.createElement("div", { className: "side top inner" }),
                    r.a.createElement(
                      "div",
                      { className: "side back" },
                      r.a.createElement("div", { className: "dot dtop dleft" }),
                      r.a.createElement("div", {
                        className: "dot dtop dright",
                      }),
                      r.a.createElement("div", {
                        className: "dot dbottom dleft",
                      }),
                      r.a.createElement("div", {
                        className: "dot dbottom dright",
                      }),
                      r.a.createElement("div", {
                        className: "dot center dleft",
                      }),
                      r.a.createElement("div", {
                        className: "dot center dright",
                      }),
                    ),
                    r.a.createElement("div", { className: "side back inner" }),
                    r.a.createElement(
                      "div",
                      { className: "side left" },
                      r.a.createElement("div", { className: "dot dtop dleft" }),
                      r.a.createElement("div", {
                        className: "dot dtop dright",
                      }),
                      r.a.createElement("div", {
                        className: "dot dbottom dleft",
                      }),
                      r.a.createElement("div", {
                        className: "dot dbottom dright",
                      }),
                    ),
                    r.a.createElement("div", { className: "side left inner" }),
                    r.a.createElement(
                      "div",
                      { className: "side top" },
                      r.a.createElement("div", { className: "dot dtop dleft" }),
                      r.a.createElement("div", { className: "dot center" }),
                      r.a.createElement("div", {
                        className: "dot dbottom dright",
                      }),
                    ),
                    r.a.createElement("div", { className: "side top inner" }),
                    r.a.createElement(
                      "div",
                      { className: "side bottom" },
                      r.a.createElement("div", { className: "dot center" }),
                      r.a.createElement("div", { className: "dot dtop dleft" }),
                      r.a.createElement("div", {
                        className: "dot dtop dright",
                      }),
                      r.a.createElement("div", {
                        className: "dot dbottom dleft",
                      }),
                      r.a.createElement("div", {
                        className: "dot dbottom dright",
                      }),
                    ),
                    r.a.createElement("div", {
                      className: "side bottom inner",
                    }),
                  ),
                ),
                r.a.createElement("h3", null, "Wins ", e.player.score),
              ),
            );
          }),
        d = (t(20), t(3)),
        m = Object(d.b)(function (e) {
          return { state: e };
        })(function (e) {
          return r.a.createElement(
            "section",
            { className: "score" },
            r.a.createElement(
              "div",
              { className: "container" },
              r.a.createElement("h1", null, "Let's go!"),
              r.a.createElement(
                "button",
                {
                  onClick: function () {
                    e.dispatch({ type: "ROLL_DICE" }),
                      setTimeout(function () {
                        e.dispatch({ type: "ENABLE_BUTTON" });
                      }, 1e3);
                  },
                  disabled: e.state.disabled,
                  id: "roll",
                },
                "Roll Dice!",
              ),
              r.a.createElement("h3", null, e.state.message),
            ),
          );
        }),
        o = Object(d.b)(function (e) {
          return { state: e };
        })(function (e) {
          return (
            Object(c.useEffect)(function () {
              function e() {
                var e = window.innerWidth,
                  a = window.innerHeight;
                document.querySelectorAll(".container").forEach(function (t) {
                  if (375 > e / 2 || 375 > a / 2) {
                    var c = Math.min(e / 2 / 375, a / 2 / 375);
                    t.style.transform = "translate(-50%, -50%) scale(".concat(
                      c,
                      ")",
                    );
                  }
                });
              }
              return (
                e(),
                window.addEventListener("resize", e),
                function () {
                  window.removeEventListener("resize", e);
                }
              );
            }),
            r.a.createElement(
              "div",
              { className: "app" },
              r.a.createElement(s, { player: e.state.player }),
              r.a.createElement(s, { player: e.state.computer }),
              r.a.createElement(m, null),
            )
          );
        }),
        i = t(5),
        u = t(9),
        v = {
          games: 0,
          disabled: !1,
          player: { name: "You", score: 0, decorator: "player", value: 1 },
          computer: {
            name: "Computer",
            score: 0,
            decorator: "computer",
            value: 1,
          },
          message: "Games: 0 ",
        },
        E = function () {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : v,
            a = arguments.length > 1 ? arguments[1] : void 0;
          switch (a.type) {
            case "ENABLE_BUTTON":
              var t = Object(u.a)({}, e);
              return (t.disabled = !1), t;
            case "ROLL_DICE":
              if (!e.disabled) {
                var c = Object(u.a)({}, e);
                c.disabled = !0;
                var r = e.player.value,
                  n = e.computer.value;
                c.games++,
                  (c.message = "Games ".concat(c.games, ", ")),
                  (c.player.value = Math.floor(6 * Math.random()) + 1),
                  (c.computer.value = Math.floor(6 * Math.random()) + 1);
                var l = c.player.value === r,
                  s = c.computer.value === n;
                return (
                  l && s && (c.message += "no change, "),
                  l && !s && (c.message += "no change for you, "),
                  !l && s && (c.message += "no change for the computer, "),
                  c.player.value < c.computer.value &&
                    (c.computer.score++, (c.message += "Computer wins! ")),
                  c.player.value > c.computer.value &&
                    (c.player.score++, (c.message += "Player wins! ")),
                  c.player.value === c.computer.value &&
                    (c.message += "a draw! "),
                  c
                );
              }
          }
          return e;
        },
        p = Object(i.b)(E),
        N = document.getElementById("root");
      l.a.render(
        r.a.createElement(d.a, { store: p }, r.a.createElement(o, null)),
        N,
      );
    },
  },
  [[12, 1, 2]],
]);
//# sourceMappingURL=main.363c1538.chunk.js.map
