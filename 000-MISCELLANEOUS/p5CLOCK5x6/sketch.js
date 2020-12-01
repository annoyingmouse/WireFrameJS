import { Numeral } from "./Numeral.js"

new p5(p5 => {
  const style = window.getComputedStyle(document.querySelector("body"), null)
  const bodyWidth = parseInt(style.getPropertyValue("width"), 10)
  const bodyHeight = parseInt(style.getPropertyValue("height"), 10)
  const Numerals = []

  p5.setup = () => {
    p5.createCanvas(bodyWidth, bodyWidth * 1.5)
    Numerals.push(new Numeral(p5, 0, 0, 50))
    Numerals.push(new Numeral(p5, 250, 0, 50))
    Numerals.push(new Numeral(p5, 0, 300, 50))
    Numerals.push(new Numeral(p5, 250, 300, 50))
    Numerals.push(new Numeral(p5, 0, 600, 50))
    Numerals.push(new Numeral(p5, 250, 600, 50)) // 500px wide & 900px tall
  }

  p5.draw = () => {
    const date = new Date
    const hour = date.getHours().toString().split('')
    const minutes = date.getMinutes().toString().split('')
    const seconds = date.getSeconds().toString().split('')
    Numerals[0].num = hour.length === 1 ? 0 : hour[0]
    Numerals[1].num = hour.length === 1 ? hour[0] : hour[1]
    Numerals[2].num = minutes.length === 1 ? 0 :minutes[0]
    Numerals[3].num = minutes.length === 1 ? minutes[0] : minutes[1]
    Numerals[4].num = seconds.length === 1 ? 0 :seconds[0]
    Numerals[5].num = seconds.length === 1 ? seconds[0] : seconds[1]

    Numerals.forEach(numeral => numeral.draw())
  }

})
