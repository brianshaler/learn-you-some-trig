(function() {
  var arcStep;

  arcStep = Math.PI * 0.025;

  module.exports = function(ctx, cx, cy, width, height) {
    var ref;
    return ref = {
      set: function(obj) {
        var prop, val;
        for (prop in obj) {
          val = obj[prop];
          ctx[prop] = val;
        }
        return ref;
      },
      grid: function() {
        ctx.beginPath();
        ctx.moveTo(cx, 0);
        ctx.lineTo(cx, height);
        ctx.moveTo(0, cy);
        ctx.lineTo(width, cy);
        ctx.stroke();
        return ref;
      },
      strokeCircle: function(radius, x, y) {
        var a, i, ref1, ref2;
        if (x == null) {
          x = 0;
        }
        if (y == null) {
          y = 0;
        }
        x += cx;
        y = cy - y;
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        for (a = i = 0, ref1 = Math.PI * 2 + arcStep, ref2 = arcStep; ref2 > 0 ? i <= ref1 : i >= ref1; a = i += ref2) {
          ctx.lineTo(x + radius * Math.cos(a), y + radius * Math.sin(a));
        }
        ctx.stroke();
        return ref;
      },
      fillCircle: function(radius, x, y) {
        var a, i, ref1, ref2;
        if (x == null) {
          x = 0;
        }
        if (y == null) {
          y = 0;
        }
        x += cx;
        y = cy - y;
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        for (a = i = 0, ref1 = Math.PI * 2 + arcStep, ref2 = arcStep; ref2 > 0 ? i <= ref1 : i >= ref1; a = i += ref2) {
          ctx.lineTo(x + radius * Math.cos(a), y + radius * Math.sin(a));
        }
        ctx.fill();
        return ref;
      },
      fillArc: function(radius, x, y, rad1, rad2) {
        var a, i, ref1, ref2, ref3;
        x += cx;
        y = cy - y;
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        for (a = i = ref1 = rad1, ref2 = rad2, ref3 = arcStep; ref3 > 0 ? i <= ref2 : i >= ref2; a = i += ref3) {
          ctx.lineTo(x + radius * Math.cos(a), y - radius * Math.sin(a));
        }
        ctx.lineTo(x + radius * Math.cos(rad2), y - radius * Math.sin(rad2));
        ctx.lineTo(x, y);
        ctx.fill();
        return ref;
      },
      fillRect: function(x, y, w, h) {
        x += cx;
        y = cy - y;
        ctx.fillRect(x, y, w, h);
        return ref;
      },
      stroke: function(x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(cx + x1, cy - y1);
        ctx.lineTo(cx + x2, cy - y2);
        ctx.stroke();
        return ref;
      },
      point: function(x, y, size) {
        if (size == null) {
          size = 4;
        }
        ctx.fillRect(cx + x - size / 2, cy + y - size / 2, size, size);
        return ref;
      }
    };
  };

}).call(this);
