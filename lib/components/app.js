(function() {
  var React, Wheel, div, input, ref;

  React = require('react');

  Wheel = require('./wheel');

  ref = React.DOM, div = ref.div, input = ref.input;

  module.exports = React.createClass({
    getInitialState: function() {
      return {
        playWheel: true
      };
    },
    toggleWheelPlay: function(e) {
      return this.setState({
        playWheel: e.target.checked
      });
    },
    render: function() {
      return div({}, input({
        type: 'checkbox',
        onChange: this.toggleWheelPlay,
        checked: this.state.playWheel
      }, 'play'), Wheel({
        playing: this.state.playWheel
      }));
    }
  });

}).call(this);
