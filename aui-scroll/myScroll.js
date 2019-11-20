(function (window) {
    'use strict';
    var isToBottom = false;
    var myScroll = function (params, callback) {
        this.extend(this.params, params);
        this._init(params, callback);
    };
    myScroll.prototype = {
        params: {
            listen: false,
            distance: 100,
            dom: document.body
        },
        _init: function (params, callback) {
            var self = this;
            if (self.params.listen) {
                self.params.dom.addEventListener("touchmove", function (e) {
                    self.scroll(callback);
                });
                self.params.dom.addEventListener("touchend", function (e) {
                    self.scroll(callback);
                });

                self.params.dom.addEventListener('scroll', function (ev) {
                    self.scroll(callback);
                });
            }
        },
        scroll: function (callback) {
            var self = this;

            var clientHeight = self.params.dom.scrollTop === 0 ? self.params.dom.clientHeight : self.params.dom.clientHeight;
            var scrollTop = self.params.dom.scrollTop === 0 ? self.params.dom.scrollTop : self.params.dom.scrollTop;
            var scrollHeight = self.params.dom.scrollTop === 0 ? self.params.dom.scrollHeight : self.params.dom.scrollHeight;

            if (scrollHeight - scrollTop - self.params.distance <= clientHeight) {
                isToBottom = true;
            } else {
                isToBottom = false;
            }

            callback({
                "clientHeight": clientHeight,
                "scrollTop": scrollTop,
                "scrollHeight": scrollHeight,
                "isToBottom": isToBottom
            });
        },
        extend: function (a, b) {
            for (var key in b) {
                if (b.hasOwnProperty(key)) {
                    a[key] = b[key];
                }
            }
            return a;
        }
    };
    window.myScroll = myScroll;
})(window);
