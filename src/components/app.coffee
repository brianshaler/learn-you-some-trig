React = require 'react'

Wheel = require './wheel'

{div, input} = React.DOM

module.exports = React.createClass
  getInitialState: ->
    playWheel: true

  toggleWheelPlay: (e) ->
    @setState
      playWheel: e.target.checked

  render: ->
    div {},
      input
        type: 'checkbox'
        onChange: @toggleWheelPlay
        checked: @state.playWheel
      , 'play'
      Wheel
        playing: @state.playWheel
