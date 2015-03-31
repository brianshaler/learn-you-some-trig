React = require 'react'
numeral = require 'numeral'

Plot = require './plot'

{div, input, span} = React.DOM

idleTime = 3000

module.exports = React.createFactory React.createClass
  getDefaultProps: ->
    width: 640
    height: 480
    radius: 480 * 0.4

  getInitialState: ->
    fraction: 0
    lastActivity: 0
    showRotation: true
    showCos: true
    showSin: true

  componentDidMount: ->
    @interval = setInterval =>
      return unless @props.playing
      return unless Date.now() - @state.lastActivity > idleTime
      newFraction = @state.fraction + 0.005
      newFraction-- while newFraction > 1
      @setState
        fraction: newFraction
    , 1000 / 24

  componentWillUnmount: ->
    clearInterval @interval

  handleChange: (e) ->
    @setState
      lastActivity: Date.now()
      fraction: parseFloat e.target.value

  toggleRotation: (e) ->
    @setState
      showRotation: e.target.checked

  toggleCos: (e) ->
    @setState
      showCos: e.target.checked

  toggleSin: (e) ->
    @setState
      showSin: e.target.checked

  render: ->
    displayFraction = numeral @state.fraction
      .format '0.00'

    div {},
      div
        style:
          marginLeft: "#{(@props.width - 30) * @state.fraction}px"
      , displayFraction
      input
        type: 'range'
        value: @state.fraction
        min: 0
        max: 1
        step: 0.01
        onChange: @handleChange
        onMouseDown: @handleChange
        style:
          width: 640
      , ''
      Plot
        fraction: @state.fraction
        width: @props.width
        height: @props.height
        radius: @props.radius
        cx: @props.width / 2
        cy: @props.height / 2
        x: @props.radius * Math.cos @state.fraction * Math.PI * 2
        y: @props.radius * Math.sin @state.fraction * Math.PI * 2
        showRotation: @state.showRotation
        showCos: @state.showCos
        showSin: @state.showSin
      input
        type: 'checkbox'
        onChange: @toggleRotation
        checked: @state.showRotation
      , 'show rotation'
      input
        type: 'checkbox'
        onChange: @toggleCos
        checked: @state.showCos
      , 'show cosine'
      input
        type: 'checkbox'
        onChange: @toggleSin
        checked: @state.showSin
      , 'show sine'
