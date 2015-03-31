(function() {
  var React, canvas, ctxChain, div, numeral, ref, span;

  React = require('react');

  numeral = require('numeral');

  ctxChain = require('../../util/ctxChain');

  ref = React.DOM, div = ref.div, canvas = ref.canvas, span = ref.span;

  module.exports = React.createFactory(React.createClass({
    redraw: function() {
      var c, ctx, drawing, radius, ref1, x, y;
      c = React.findDOMNode(this.refs.canvas);
      ctx = c.getContext('2d');
      ctx.save();
      ctx.clearRect(0, 0, this.props.width, this.props.height);
      ref1 = this.props, x = ref1.x, y = ref1.y, radius = ref1.radius;
      drawing = ctxChain(ctx, this.props.cx, this.props.cy, this.props.width, this.props.height);
      if (this.props.showCos) {
        drawing.set({
          fillStyle: 'rgba(255, 0, 0, 0.15)'
        }).fillRect((x < 0 ? x : 0), radius * 1.1, Math.abs(x), radius * 2.2);
      }
      if (this.props.showSin) {
        drawing.set({
          fillStyle: 'rgba(0, 0, 255, 0.15)'
        }).fillRect(-radius * 1.1, (y > 0 ? y : 0), radius * 2.2, Math.abs(y));
      }
      if (this.props.showRotation) {
        drawing.set({
          fillStyle: 'rgba(25, 100, 25, 1)'
        }).fillArc(radius / 4, 0, 0, 0, this.props.fraction * Math.PI * 2);
      }
      drawing.set({
        globalAlpha: 0.5,
        strokeStyle: 'black',
        lineWidth: 1
      }).grid().set({
        globalAlpha: 1,
        fillStyle: 'black',
        strokeStyle: 'black',
        lineWidth: 3
      }).strokeCircle(radius);
      if (this.props.showSin) {
        drawing.set({
          strokeStyle: 'blue'
        }).stroke(x, 0, x, y).stroke(0, 0, 0, y).stroke(radius * 1.1, 0, radius * 1.1, y);
      }
      if (this.props.showCos) {
        drawing.set({
          strokeStyle: 'red'
        }).stroke(0, y, x, y).stroke(0, 0, x, 0).stroke(0, -radius * 1.1, x, -radius * 1.1);
      }
      drawing.set({
        strokeStyle: 'black',
        lineWidth: 1
      }).stroke(0, 0, x, y).set({
        fillStyle: 'black',
        strokeStyle: 'black'
      }).fillCircle(6, x, y).fillCircle(6, 0, 0);
      return ctx.restore();
    },
    componentDidMount: function() {
      return this.redraw();
    },
    componentDidUpdate: function() {
      return this.redraw();
    },
    render: function() {
      var degrees, displayX, displayY, fraction, radians, radius, ref1, x, xHalf, y, yHalf;
      ref1 = this.props, x = ref1.x, y = ref1.y, radius = ref1.radius;
      displayX = numeral(Math.cos(this.props.fraction * Math.PI * 2)).format('0.0');
      displayY = numeral(Math.sin(this.props.fraction * Math.PI * 2)).format('0.0');
      xHalf = radius * Math.cos(this.props.fraction * Math.PI);
      yHalf = radius * Math.sin(this.props.fraction * Math.PI);
      fraction = numeral(this.props.fraction).format('0.0');
      radians = numeral(this.props.fraction * Math.PI * 2).format('0.0');
      degrees = String(10 * Math.round(36 * this.props.fraction));
      return div({
        style: {
          width: this.props.width,
          height: this.props.height
        }
      }, canvas({
        ref: 'canvas',
        key: 'wheel-canvas',
        width: this.props.width,
        height: this.props.height
      }, ''));
    }
  }));

}).call(this);
