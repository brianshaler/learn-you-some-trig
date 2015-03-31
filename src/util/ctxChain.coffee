arcStep = Math.PI * 0.025

module.exports = (ctx, cx, cy, width, height) ->
  ref =
    set: (obj) ->
      for prop, val of obj
        ctx[prop] = val
      ref
    grid: ->
      ctx.beginPath()
      ctx.moveTo cx, 0
      ctx.lineTo cx, height
      ctx.moveTo 0, cy
      ctx.lineTo width, cy
      ctx.stroke()
      ref
    strokeCircle: (radius, x = 0, y = 0) ->
      x += cx
      y = cy - y
      ctx.beginPath()
      ctx.moveTo x + radius, y
      for a in [0..Math.PI*2+arcStep] by arcStep
        ctx.lineTo x + radius * Math.cos(a), y + radius * Math.sin(a)
      ctx.stroke()
      ref
    fillCircle: (radius, x = 0, y = 0) ->
      x += cx
      y = cy - y
      ctx.beginPath()
      ctx.moveTo x + radius, y
      for a in [0..Math.PI*2+arcStep] by arcStep
        ctx.lineTo x + radius * Math.cos(a), y + radius * Math.sin(a)
      ctx.fill()
      ref
    fillArc: (radius, x, y, rad1, rad2) ->
      x += cx
      y = cy - y
      ctx.beginPath()
      ctx.moveTo x + radius, y
      for a in [rad1..rad2] by arcStep
        ctx.lineTo x + radius * Math.cos(a), y - radius * Math.sin(a)
      ctx.lineTo x + radius * Math.cos(rad2), y - radius * Math.sin(rad2)
      ctx.lineTo x, y
      ctx.fill()
      ref
    fillRect: (x, y, w, h) ->
      x += cx
      y = cy - y
      ctx.fillRect x, y, w, h
      ref
    stroke: (x1, y1, x2, y2) ->
      ctx.beginPath()
      ctx.moveTo cx + x1, cy - y1
      ctx.lineTo cx + x2, cy - y2
      ctx.stroke()
      ref
    point: (x, y, size = 4) ->
      ctx.fillRect cx + x - size / 2, cy + y - size / 2, size, size
      ref
