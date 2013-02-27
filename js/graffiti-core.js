var GraffitiCore = (function ($) {
  function Class(conf) {
    var init = conf.init || function () {};
    delete conf.init;
    init.prototype = conf;
    return init;
  };
  
  var Curve = new Class({
    init: function (brush) {
      this.brush = brush;
      this.points = [];
    },

    push: function (point) {
      this.points.push(point);
    }
  });

  var Canvas = new Class({
    init: function (canvas) {
      this.context = canvas.getContext('2d');

      this.context.lineCap = 'round';
      this.context.lineJoin = 'round';

      this.width = canvas.width;
      this.height = canvas.height;
    },
   
    clear: function () {
      this.context.clearRect(0, 0, this.width, this.height);
    },

    data: function () {
      return this.context.canvas.toDataURL('image/png'); 
    },

    draw: function (curve) {
      var brush = curve.brush;
      var points = curve.points;

      this.context.beginPath();

      this.context.lineWidth = brush.width;
      this.context.strokeStyle = brush.color;
  
      this.context.moveTo(points[0].x, points[0].y);
      this.context.lineTo(points[0].x - 0.5, points[0].y - 0.5);

      for (var i in points) {
        this.context.lineTo(points[i].x, points[i].y);
      }

      this.context.stroke();

      this.context.closePath();
    }
  });
  
  var GraffitiCore = new Class({
    init: function (conf) {
      conf = this.initConf(conf);

      this.buildDom(conf);
      this.initSystemObjects(conf);
      this.bindEvents(conf);
    },

    initConf: function (conf) {
      var _conf = {
        selector: undefined,

        width: 600,
        height: 300,
          
        brush: {
          width: 40,
          color: 'rgba(200, 200, 50, 0.75)'
        }
      };

      for (var prop in conf) {
        _conf[prop] = conf[prop];
      }

      return _conf;
    },
  
    buildDom: function (conf) {
      var wrapper = $(conf.selector);
  
      this.dom = { 
        wrapper: wrapper.css({
          width: conf.width,
          height: conf.height
        }).empty(),
  
        canvas: {
          common: $('<canvas>').attr({
            width: conf.width,
            height: conf.height
          }).css({
            display: 'block',
          }).appendTo(wrapper),
  
          overlay:  $('<canvas>').attr({
            width: conf.width,
            height: conf.height
          }).css({
            display: 'block',
            position: 'relative',
            top: -conf.height,
            zIndex: 9999
          }).appendTo(wrapper)
        }
      };
    },
  
    initSystemObjects: function (conf) {
      this.system = {
        curve: undefined,
        curves: [],

        brush: conf.brush,

        canvas: {
          common: new Canvas(this.dom.canvas.common.get(0)),
          overlay: new Canvas(this.dom.canvas.overlay.get(0))
        },

        inProcess: false,
        historyIndex: -1
      };
    },
  
    bindEvents: function (conf) {
      var s = this.system;
      var overlay = this.dom.canvas.overlay;

      var proceedCurveByEvent = function (e) {
        s.curve.push({
          x: e.pageX - overlay.offset().left, 
          y: e.pageY - overlay.offset().top
        });

        s.canvas.overlay.clear();
        s.canvas.overlay.draw(s.curve);
      };
  
      overlay.bind({
        mousedown: function (e) {
          s.inProcess = true;
          s.curve = new Curve(s.brush);
          proceedCurveByEvent(e);
        },
  
        mousemove: function (e) {
          if (s.inProcess) {
            proceedCurveByEvent(e);
          }
        },
  
        mouseup: function (e) {
          if (s.inProcess) {
            s.inProcess = false;
            proceedCurveByEvent(e);
  
            s.canvas.overlay.clear();
            s.canvas.common.draw(s.curve);
  
            s.historyIndex += 1;
            s.curves = s.curves.slice(0, s.historyIndex);

            s.curves.push(s.curve);
            s.curve = undefined;
          }
        }
      });

      $(window).mouseup(function () {
        if (s.inProcess) {
          overlay.mouseup();
        }
      });
    },

    clear: function () {
      var s = this.system;

      s.canvas.common.clear();
      s.historyIndex = -1;
      s.curves = [];
    },

    data: function () {
      return this.system.canvas.common.data();
    },

    prev: function () {
      var s = this.system;

      s.canvas.common.clear();
      s.historyIndex = Math.max(s.historyIndex - 1, -1);

      for(var i = 0; i <= s.historyIndex; i += 1) {
        s.canvas.common.draw(s.curves[i]);
      }
    },

    next: function () {
      var s = this.system;

      s.canvas.common.clear();
      s.historyIndex = Math.min(s.historyIndex + 1, s.curves.length - 1);

      for(var i = 0; i <= s.historyIndex; i += 1) {
        s.canvas.common.draw(s.curves[i]);
      }
    },

    setBrush: function (brush) {
      this.system.brush = brush;
    }
  });

  return GraffitiCore;
})(jQuery);

