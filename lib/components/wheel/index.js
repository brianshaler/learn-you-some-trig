(function() {
  var Plot, React, div, idleTime, input, numeral, ref, span;

  React = require('react');

  numeral = require('numeral');

  Plot = require('./plot');

  ref = React.DOM, div = ref.div, input = ref.input, span = ref.span;

  idleTime = 3000;

  module.exports = React.createFactory(React.createClass({
    getDefaultProps: function() {
      return {
        width: 640,
        height: 480,
        radius: 480 * 0.4
      };
    },
    getInitialState: function() {
      return {
        fraction: 0,
        lastActivity: 0,
        showRotation: true,
        showCos: true,
        showSin: true
      };
    },
    componentDidMount: function() {
      return this.interval = setInterval((function(_this) {
        return function() {
          var newFraction;
          if (!_this.props.playing) {
            return;
          }
          if (!(Date.now() - _this.state.lastActivity > idleTime)) {
            return;
          }
          newFraction = _this.state.fraction + 0.005;
          while (newFraction > 1) {
            newFraction--;
          }
          return _this.setState({
            fraction: newFraction
          });
        };
      })(this), 1000 / 24);
    },
    componentWillUnmount: function() {
      return clearInterval(this.interval);
    },
    handleChange: function(e) {
      return this.setState({
        lastActivity: Date.now(),
        fraction: parseFloat(e.target.value)
      });
    },
    toggleRotation: function(e) {
      return this.setState({
        showRotation: e.target.checked
      });
    },
    toggleCos: function(e) {
      return this.setState({
        showCos: e.target.checked
      });
    },
    toggleSin: function(e) {
      return this.setState({
        showSin: e.target.checked
      });
    },
    render: function() {
      var displayFraction;
      displayFraction = numeral(this.state.fraction).format('0.00');
      return div({}, div({
        style: {
          marginLeft: ((this.props.width - 30) * this.state.fraction) + "px"
        }
      }, displayFraction), input({
        type: 'range',
        value: this.state.fraction,
        min: 0,
        max: 1,
        step: 0.01,
        onChange: this.handleChange,
        onMouseDown: this.handleChange,
        style: {
          width: 640
        }
      }, ''), Plot({
        fraction: this.state.fraction,
        width: this.props.width,
        height: this.props.height,
        radius: this.props.radius,
        cx: this.props.width / 2,
        cy: this.props.height / 2,
        x: this.props.radius * Math.cos(this.state.fraction * Math.PI * 2),
        y: this.props.radius * Math.sin(this.state.fraction * Math.PI * 2),
        showRotation: this.state.showRotation,
        showCos: this.state.showCos,
        showSin: this.state.showSin
      }), input({
        type: 'checkbox',
        onChange: this.toggleRotation,
        checked: this.state.showRotation
      }, 'show rotation'), input({
        type: 'checkbox',
        onChange: this.toggleCos,
        checked: this.state.showCos
      }, 'show cosine'), input({
        type: 'checkbox',
        onChange: this.toggleSin,
        checked: this.state.showSin
      }, 'show sine'));
    }
  }));

}).call(this);
