jQuery.fn.extend({
  /**
   * 自动伸缩元素
   * 调用方式 $(element).autohide({selector: element, max_height: 34})
   * @param options {selector: // 自动伸缩元素的筛选器， max_height: 最大高度}
   * @returns {*}
   */
  autohide: function(options) {
    if (this.length <= 0) {
      return this;
    }

    var main = this;
    return main
      .extend({
        items: main.find(options.selector),
        setup: function() {
          if (main.items <= 0) {
            return main;
          }
          main.items.each(function(i) {
            var item = $(this);
            var origin_height = item.height();
            if (origin_height > options.max_height) {
              var origin_text = item.text();
              item.data("origin_text", origin_text);
              item.text(origin_text.substr(0, 37));
              item.next().bind({
                click: function(e) {
                  item.text(item.data("origin_text"));
                  $(this).hide();
                }
              });
            } else {
              item.next().hide();
            }
          });

          return main;
        }
      })
      .setup();
  }
});
