(function (window) {
    "use strict";

    var Dialog = function (cfg) {
        this.config.callback = null;
        this.extend(this.config, cfg);

        this._init();
    };

    Dialog.prototype = {
        config: {
            width: 180,
            height: 150,
            msg: '操作成功',
            winDom: window,
            delay: 0,
            bg: true,
            bgWhite: false,
            clickDomCancel: false,
            callback: null,
            type: "success"
        },

        _init: function () {
            var self = this;
            if (self.modelBox) return;
            self.render();
        },

        modelBox: null,
        mask: null,

        render: function () {
            var self = this;

            //初始渲染容器
            self.renderUI();

            //绑定事件
            self.clickDom();

            //初始化盒子大小
            self.initBox();

            //将节点挂载到body上
            document.body.appendChild(self.modelBox);
        },

        //初始渲染
        renderUI: function () {
            var self = this;
            self.modelBox = document.createElement('div');
            self.modelBox.id = 'animationTipBox';

            switch (self.config.type) {
                case 'load':
                    self.loadRender();
                    break;
                case 'success':
                    self.successRender();
                    break;
                case 'error':
                    self.errorRender();
                    break;
                case 'tip':
                    self.tipRender();
                    break;
            }

            //是否显示遮罩
            if (self.config.bg) {
                self._mask = document.createElement('div');
                self._mask.id = 'mask';
                document.body.appendChild(self._mask);

                var html = '';

                if (self.config.bgWhite) {
                    html = '<div class="mask_white"></div>'
                }else{
                    html = '<div class="mask"></div>'
                }

                self._mask.innerHTML = html;

            }

            if (!self.config.delay && typeof self.config.callback === "function") {
                self.config.delay = 1;
            }

            if (self.config.delay) {
                setTimeout(function () {
                    self.close();
                }, self.config.delay);
            }
        },


        clickDom: function () {
            var self = this;

            //点击空白立即取消
            if (self.config.clickDomCancel && self._mask) {
                self._mask.click(function () {
                    self.close();
                });
            }
        },


        initBox: function () {
            var self = this;
            self.modelBox.style.width = self.config.width + 'px';
            self.modelBox.style.height = self.config.height + 'px';
            self.modelBox.margin_left = '-' + (self.config.width / 2) + 'px';
            self.modelBox.margin_top = '-' + (self.config.height / 2) + 'px';
        },

        successRender: function () {
            var self = this;

            var html = "<div class='success'>";
            html += " <div class='icon'>";
            html += "<div class='line_short'></div>";
            html += "<div class='line_long'></div>  ";
            html += "</div>";
            html += "<div class='dec_txt'>" + self.config.msg + "</div>";
            html += "</div>";

            self.modelBox.innerHTML = html;
        },

        loadRender: function () {
            var self = this;

            var html = "<div class='load'>";
            html += "<div class='icon_box'>";
            for (var i = 1; i < 4; i++) {
                html += "<div class='cirBox" + i + "'>";
                html += "<div class='cir1'></div>";
                html += "<div class='cir2'></div>";
                html += "<div class='cir3'></div>";
                html += "<div class='cir4'></div>";
                html += "</div>";
            }
            html += "</div>";
            html += "</div>";
            html += "<div class='dec_txt'>" + self.config.msg + "</div>";

            self.modelBox.innerHTML = html;
        },

        tipRender: function () {
            var self = this;

            var html = "<div class='tip'>";
            html += "<div class='icon'>i</div>";
            html += "<div class='dec_txt'>" + self.config.msg + "</div>";
            html += "</div>";

            self.modelBox.innerHTML = html;
        },

        errorRender: function () {
            var self = this;

            var html = "<div class='lose'>";
            html += "<div class='icon'>";
            html += "<div class='icon_box'>";
            html += "<div class='line_left'></div>";
            html += "<div class='line_right'></div>";
            html += "</div>";
            html += "</div>";
            html += "<div class='dec_txt'>" + self.config.msg + "</div>";
            html += "</div>";

            self.modelBox.innerHTML = html;
        },

        close: function () {

            var self = this;

            self.destroy();
            if (self.config.delay && typeof self.config.callback === "function") {
                self.config.callback();
            }
        },

        destroy: function () {
            var self = this;
            if (self._mask) {
                self._mask.remove();
            }

            if (self.modelBox) {
                self.modelBox.remove();
                self.modelBox = null;
            }

        },


        extend: function (a, b) {
            for (var k in b) {
                if (b.hasOwnProperty(k)) {
                    a[k] = b[k];
                }
            }
            return a;
        }
    };

    window.popup = function (cfg) {
        return new Dialog(cfg);
    };
})(window);