p5.prototype._initVals = function () {
  this.int_zoom = 1;
  this.int_offset = this.createVector(0, 0);
  
  this.mouseWheel = mouseWheel1.bind(this)
  this.mouseDragged = mouseDragged1.bind(this)
  
};

p5.prototype.registerMethod('init', p5.prototype._initVals)

p5.prototype.interactive = function () {
  scale(this.int_zoom);
  translate(this.int_offset);
};


function mouseWheel1(event) {
  // convert delta value into zoom
  this.int_zoom *= 2 ** (-event.delta / 50);
  this.int_zoom = constrain(this.int_zoom, 1 / 3, 3);
  return false;
}

function mouseDragged1(event) {
  this.int_offset.add(event.movementX / this.int_zoom, event.movementY / this.int_zoom);
}
