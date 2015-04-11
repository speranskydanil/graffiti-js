var GraffitiApp = (function ($) {
  function Class(conf) {
    var init = conf.init || function () {};
    delete conf.init;
    init.prototype = conf;
    return init;
  };

  var GraffitiApp = new Class({
    init: function (conf) {
      conf = this.initConf(conf);

      this.buildDom(conf);
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
      $(conf.selector).html('\
        <div class="ga-viewport"></div>\
        <div class="ga-nav">\
          <a href="#" class="prev">prev</a>\
          |\
          <a href="#" class="next">next</a>\
          <br>\
          <a href="#" class="clear">clear</a>\
          |\
          <a href="#" class="save">save</a>\
          <br>\
        </div>\
        <div class="ga-brush">\
          <input type="text" class="width"> &nbsp;width<br>\
          <input type="text" class="opacity"> &nbsp;opacity<br>\
          <input type="text" class="red"> &nbsp;red<br>\
          <input type="text" class="green"> &nbsp;green<br>\
          <input type="text" class="blue"> &nbsp;blue<br>\
        </div>\
      ');

      this.dom = {
        nav: $(conf.selector + ' .ga-nav'),
        brush: $(conf.selector + ' .ga-brush')
      };

      var color_pattern = /^\s*rgba\(\s*(\d+)\s*\,\s*(\d+)\s*\,\s*(\d+)\s*\,\s*(\d*\.?\d+)\s*\)\s*$/;
      var color_matches = conf.brush.color.match(color_pattern).slice(1);

      this.dom.brush.find('.width').val(conf.brush.width);
      this.dom.brush.find('.opacity').val(color_matches[3]);
      this.dom.brush.find('.red').val(color_matches[0]);
      this.dom.brush.find('.green').val(color_matches[1]);
      this.dom.brush.find('.blue').val(color_matches[2]);

      this.gc = new GraffitiCore({
        selector: conf.selector + ' > .ga-viewport',
        width: conf.width,
        height: conf.height,
        brush: conf.brush
      });
    },

    bindEvents: function (conf) {
      var self = this;

      this.dom.nav.find('a').click(function (e) {
        e.preventDefault();

        switch($(this).attr('class')) {
          case 'prev':
            self.gc.prev();
            break;
          case 'next':
            self.gc.next();
            break;
          case 'clear':
            self.gc.clear();
            break;
          case 'save':
            window.open(self.gc.data());
            break;
        }
      });

      this.dom.brush.find('input').change(function (e) {
        self.gc.setBrush({
          width: parseInt(self.dom.brush.find('.width').val()),
          color: 'rgba(' +
                 parseInt(self.dom.brush.find('.red').val()) + ',' +
                 parseInt(self.dom.brush.find('.green').val()) + ',' +
                 parseInt(self.dom.brush.find('.blue').val()) + ',' +
                 parseFloat(self.dom.brush.find('.opacity').val()) + ')'
        });
      });
    }
  });

  return GraffitiApp;
})(jQuery);

