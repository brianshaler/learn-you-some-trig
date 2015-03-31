(function() {
  var App, React, app, el, numeral;

  numeral = require('numeral');

  React = require('react');

  App = require('./components/app');

  el = document.getElementById('trig');

  app = React.createElement(App);

  React.render(app, el);

}).call(this);
