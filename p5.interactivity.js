p5.prototype._initVals = function () {
  this.int_zoom = 1;
  this.int_offset = this.createVector(0, 0);
  
  this.ZOOM_LIM = [1/3, 3]

  this.mouseWheel = mouseWheel1.bind(this);
  this.mouseDragged = mouseDragged1.bind(this);
};

p5.prototype.registerMethod("init", p5.prototype._initVals);

p5.prototype.interactive = function () {
  const ctx = this._isGlobal ? window : this;

  let { e, f } = ctx.drawingContext.getTransform();
  origin = { x: e, y: f };

  scale(ctx.int_zoom);
  translate(ctx.int_offset);
};

function mouseWheel1(event) {
  const ctx = this._isGlobal ? window : this;
  // convert delta value into zoom
  ctx.int_zoom *= 2 ** (-event.delta / 50);
  ctx.int_zoom = constrain(ctx.int_zoom, ...ctx.ZOOM_LIM);
  return false;
}

function mouseDragged1(event) {
  const ctx = this._isGlobal ? window : this;

  ctx.int_offset.add(
    event.movementX / ctx.int_zoom,
    event.movementY / ctx.int_zoom
  );
}

p5.prototype.getViewport = function () {
  const ctx = this._isGlobal ? window : this;

  return { x: -ctx.int_offset.x - origin.x / ctx.int_zoom, y: -ctx.int_offset.y - origin.y / ctx.int_zoom, width: ctx.width / ctx.int_zoom, height: ctx.height / ctx.int_zoom };
};
