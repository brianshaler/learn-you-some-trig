(function() {
  var Canvas, React, canvas, div, numeral, ref, span;

  React = require('react');

  numeral = require('numeral');

  Canvas = require('./canvas');

  ref = React.DOM, div = ref.div, canvas = ref.canvas, span = ref.span;

  module.exports = React.createFactory(React.createClass({
    render: function() {
      var cx, cy, degrees, displayFraction, displayX, displayY, radians, ref1, x, xHalf, y, yHalf;
      ref1 = this.props, cx = ref1.cx, cy = ref1.cy, x = ref1.x, y = ref1.y;
      displayX = numeral(Math.cos(this.props.fraction * Math.PI * 2)).format('0.0');
      displayY = numeral(Math.sin(this.props.fraction * Math.PI * 2)).format('0.0');
      xHalf = this.props.radius * Math.cos(this.props.fraction * Math.PI);
      yHalf = this.props.radius * Math.sin(this.props.fraction * Math.PI);
      displayFraction = numeral(this.props.fraction).format('0.0');
      radians = numeral(this.props.fraction * 2).format('0.0');
      degrees = String(10 * Math.round(36 * this.props.fraction));
      return div({
        style: {
          width: this.props.width,
          height: this.props.height + 20
        }
      }, div({
        className: 'wheel-canvas'
      }, Canvas({
        fraction: this.props.fraction,
        width: this.props.width,
        height: this.props.height,
        cx: this.props.cx,
        cy: this.props.cy,
        x: this.props.x,
        y: this.props.y,
        radius: this.props.radius,
        showRotation: this.props.showRotation,
        showCos: this.props.showCos,
        showSin: this.props.showSin
      }), div({
        className: 'labels',
        style: {
          left: this.props.width / 2,
          top: this.props.height / 2
        }
      }, div({
        className: 'label',
        style: {
          display: this.props.showRotation ? 'block' : 'none',
          transform: "translate3d(" + (x < 0 ? -100 : 0) + "%, " + (y >= 0 ? -100 : 0) + "%, 0)",
          left: x * 0.3,
          top: -y * 0.3,
          borderColor: 'rgba(0, 75, 0, 1)',
          backgroundColor: 'rgba(25, 100, 25, 1)',
          color: 'white'
        }
      }, div({}, "Rotation: " + displayFraction), div({}, "(" + radians + "rad " + degrees + "deg)")), div({
        className: 'label',
        style: {
          display: this.props.showSin ? 'block' : 'none',
          transform: "translate3d(0, " + (y / this.props.radius * 50 - 50) + "%, 0)",
          left: this.props.radius * 1.15,
          top: -y,
          borderColor: 'blue',
          backgroundColor: 'rgba(255, 255, 255, 0.9)'
        }
      }, div({}, "sin(" + displayFraction + " * 2π) = " + displayY)), div({
        className: 'label',
        style: {
          display: this.props.showCos ? 'block' : 'none',
          transform: "translate3d(" + (-x / this.props.radius * 50 - 50) + "%, 0, 0)",
          left: x,
          top: this.props.radius * 1.15,
          borderColor: 'red',
          backgroundColor: 'rgba(255, 255, 255, 0.9)'
        }
      }, div({}, "cos(" + displayFraction + " * 2π) = " + displayX)))));
    }
  }));

}).call(this);
