/**
 * @param {string} selector
 * @constructor
 */
const Meter = function(selector) {
  this.$root = document.querySelector(selector)
  this.$pointer = this.$root.querySelector('.meter-pointer')
  this.init()
}

Meter.prototype.init = function() {
  for (var i = 0; i <= 10; i += 1) {
    const $scale = document.createElement('div')
    $scale.className = 'meter-scale'
    $scale.style.transform = 'rotate(' + (i * 9 - 45) + 'deg)'
    if (i % 5 === 0) {
      $scale.classList.add('meter-scale-strong')
    }
    this.$root.appendChild($scale)
  }
}

/**
 * @param {number} deg
 */
Meter.prototype.update = function(deg, frequency) {
  var AudioContext = w.AudioContext || w.webkitAudioContext;
  var context = new AudioContext()
  var o = context.createOscillator()
  var  g = context.createGain()
  o.connect(g)
  g.connect(context.destination)

  o.frequency.value = frequency
  o.start(0)
  this.$pointer.style.transform = 'rotate(' + deg + 'deg)'
  o.stop()
}
