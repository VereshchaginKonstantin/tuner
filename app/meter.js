/**
 * @param {string} selector
 * @constructor
 */
const Meter = function(selector) {
  this.$root = document.querySelector(selector)
  this.$pointer = this.$root.querySelector('.meter-pointer')
  this.init()
}
Meter.prototype.playing = false;
Meter.prototype.lastDegree = 0;

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
Meter.prototype.update = function(deg, frequency, audioCtx) {
       var adeg = Math.abs(deg)
	if(adeg > 5)
	{
		this.lastDegree += adeg;
	}
	else{
		this.lastDegree = 0;
	}
	if(this.lastDegree > 50)
        {   
	   if(!this.playing && audioCtx)
	   {
		  this.playing = true; 
		  this.playNote(frequency, 2, audioCtx)
		} 
           this.$pointer.style.transform = 'rotate(' + deg + 'deg)'	 
        }
	else
	{ 
       this.$pointer.style.transform = 'rotate(' + 0 + 'deg)'	  
	}
}

 
Meter.prototype.playNote = function(frequency, duration, audioCtx) {

  // create Oscillator node
  var oscillator = audioCtx.createOscillator();

  oscillator.type = 'square';
  oscillator.frequency.value = frequency; // value in hertz
  oscillator.connect(audioCtx.destination);
  oscillator.start();

  setTimeout(
    function() {
      oscillator.stop();
      this.playing = false;
    }, duration);
} 
