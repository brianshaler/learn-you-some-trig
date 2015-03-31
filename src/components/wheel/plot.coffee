React = require 'react'
numeral = require 'numeral'

Canvas = require './canvas'

{div, canvas, span} = React.DOM


module.exports = React.createFactory React.createClass
  render: ->
    {cx, cy, x, y} = @props

    displayX = numeral Math.cos @props.fraction * Math.PI * 2
      .format '0.0'
    displayY = numeral Math.sin @props.fraction * Math.PI * 2
      .format '0.0'

    xHalf = @props.radius * Math.cos @props.fraction * Math.PI
    yHalf = @props.radius * Math.sin @props.fraction * Math.PI

    displayFraction = numeral @props.fraction
      .format '0.0'
    radians = numeral @props.fraction * Math.PI * 2
      .format '0.0'
    degrees = String 10 * Math.round 36 * @props.fraction

    div
      style:
        width: @props.width
        height: @props.height + 20
    ,
      div
        className: 'wheel-canvas'
      ,
        Canvas
          fraction: @props.fraction
          width: @props.width
          height: @props.height
          cx: @props.cx
          cy: @props.cy
          x: @props.x
          y: @props.y
          radius: @props.radius
          showRotation: @props.showRotation
          showCos: @props.showCos
          showSin: @props.showSin
        div
          className: 'labels'
          style:
            left: @props.width / 2
            top: @props.height / 2
        ,
          div
            className: 'label'
            style:
              display: if @props.showRotation then 'block' else 'none'
              transform: "translate3d(#{if x < 0 then -100 else 0}%, #{if y >= 0 then -100 else 0}%, 0)"
              left: x * 0.3
              top: -y * 0.3
              borderColor: 'rgba(0, 75, 0, 1)'
              backgroundColor: 'rgba(25, 100, 25, 1)'
              color: 'white'
          ,
            div {}, "Rotation: #{displayFraction}"
            div {}, "(#{displayFraction}rad #{degrees}deg)"
          div
            className: 'label'
            style:
              display: if @props.showSin then 'block' else 'none'
              transform: "translate3d(0, #{y / @props.radius * 50 - 50}%, 0)"
              left: @props.radius * 1.15
              top: -y
              borderColor: 'blue'
              backgroundColor: 'rgba(255, 255, 255, 0.9)'
          ,
            div {}, "sin(#{displayFraction} * 2π) = #{displayY}"
          div
            className: 'label'
            style:
              display: if @props.showCos then 'block' else 'none'
              transform: "translate3d(#{-x / @props.radius * 50 - 50}%, 0, 0)"
              left: x
              top: @props.radius * 1.15
              borderColor: 'red'
              backgroundColor: 'rgba(255, 255, 255, 0.9)'
          ,
            div {}, "cos(#{displayFraction} * 2π) = #{displayX}"
