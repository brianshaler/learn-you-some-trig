React = require 'react'
numeral = require 'numeral'
ctxChain = require '../../util/ctxChain'

{div, canvas, span} = React.DOM


module.exports = React.createFactory React.createClass
  redraw: ->
    #c = @getDOMNode().childNodes[0]
    c = React.findDOMNode @refs.canvas
    ctx = c.getContext '2d'
    ctx.save()
    ctx.clearRect 0, 0, @props.width, @props.height

    {x, y, radius} = @props

    drawing = ctxChain ctx, @props.cx, @props.cy, @props.width, @props.height

    if @props.showCos
      drawing.set
        fillStyle: 'rgba(255, 0, 0, 0.15)'
      .fillRect (if x < 0 then x else 0),
        radius * 1.1, #(if y > 0 then y else 0),
        Math.abs(x),
        radius * 2.2 # * 1.1 + (if y > 0 then y else 0)

    if @props.showSin
      drawing.set
        fillStyle: 'rgba(0, 0, 255, 0.15)'
      .fillRect -radius * 1.1,
        (if y > 0 then y else 0),
        radius * 2.2
        Math.abs(y),

    if @props.showRotation
      drawing.set
        fillStyle: 'rgba(25, 100, 25, 1)'
      .fillArc radius / 4, 0, 0, 0, @props.fraction * Math.PI * 2

    drawing.set
      globalAlpha: 0.5
      strokeStyle: 'black'
      lineWidth: 1
    .grid()
    .set
      globalAlpha: 1
      fillStyle: 'black'
      strokeStyle: 'black'
      lineWidth: 3
    .strokeCircle radius

    if @props.showSin
      drawing.set
        strokeStyle: 'blue'
      .stroke x, 0, x, y
      .stroke 0, 0, 0, y
      .stroke radius * 1.1, 0, radius * 1.1, y

    if @props.showCos
      drawing.set
        strokeStyle: 'red'
      .stroke 0, y, x, y
      .stroke 0, 0, x, 0
      .stroke 0, -radius * 1.1, x, -radius * 1.1

    drawing.set
      strokeStyle: 'black'
      lineWidth: 1
    .stroke 0, 0, x, y
    .set
      fillStyle: 'black'
      strokeStyle: 'black'
    .fillCircle 6, x, y
    .fillCircle 6, 0, 0

    ctx.restore()

  componentDidMount: ->
    @redraw()

  componentDidUpdate: ->
    @redraw()

  render: ->
    {x, y, radius} = @props

    displayX = numeral Math.cos @props.fraction * Math.PI * 2
      .format '0.0'
    displayY = numeral Math.sin @props.fraction * Math.PI * 2
      .format '0.0'

    xHalf = radius * Math.cos @props.fraction * Math.PI
    yHalf = radius * Math.sin @props.fraction * Math.PI

    fraction = numeral @props.fraction
      .format '0.0'
    radians = numeral @props.fraction * Math.PI * 2
      .format '0.0'
    degrees = String 10 * Math.round 36 * @props.fraction
    div
      style:
        width: @props.width
        height: @props.height
    ,
      canvas
        ref: 'canvas'
        key: 'wheel-canvas'
        width: @props.width
        height: @props.height
      , ''
