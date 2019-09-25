(function (window) {
    "use strict";

    var MyLayer = function (cfg) {
        this.extend(this.config, cfg);

        this._init();
    };

    MyLayer.prototype = {
        config: {
            type: 'iframe',
            url: '',
            shade: 0.5,
            area: ['50%', '50%'],
            radius: '5px',
        },

        modelBox: null,
        _mask: null,

        _init: function () {
            var self = this;

            self.render();
        },

        getPath: function () {
            var jsPath = document.currentScript ? document.currentScript.src : function () {
                var js = document.scripts,
                    last = js.length - 1,
                    src;

                for (var i = last; i > 0; i--) {
                    if (js[i].readyState === 'interactive') {
                        src = js[i].src;
                        break;
                    }
                }
                return src || js[last].src;
            }();
            return jsPath.substring(0, jsPath.lastIndexOf('/') + 1);
        },

        //加载css
        loadCss: function () {
            var self = this;

            var head = document.getElementsByTagName("head")[0],
                link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = self.getPath() + 'myLayer.css';
            link.id = 'myLayerCss';

            if (!document.getElementById(link.id)) {
                head.appendChild(link);
            }
        },

        //渲染
        render: function () {
            var self = this;

            //初始渲染容器
            self.renderUI();

            switch (self.config.type) {
                case 'iframe':
                    self.loadCss();

                    //初始盒子
                    self.initBox();

                    //将节点挂载到body上
                    document.body.appendChild(self.modelBox);
                    document.body.appendChild(self._mask);
                    break;
                case 'close':
                    self.close();
                    break;
            }

        },

        //渲染容器
        renderUI: function () {
            var self = this;

            switch (self.config.type) {
                case 'iframe':
                    self.modelBox = document.createElement('div');
                    self.modelBox.id = 'myLayer_box';

                    //遮罩层
                    self._mask = document.createElement('div');
                    self._mask.id = 'myLayer_mask';
                    self._mask.style.opacity = self.config['shade'];
                    self._mask.classList = 'myLayer_mask';
                    break;
                case 'close':
                    break;
            }

        },


        //初始化盒子
        initBox: function () {
            var self = this;

            var winHeight = document.documentElement.clientHeight;
            var winWidth = document.documentElement.clientWidth;


            var percent_w = self.config['area'][0].substring(self.config['area'][0].length - 1) == '%' ? self.config['area'][0].substring(0, self.config['area'][0].length - 1) : self.config['area'][0];
            var percent_h = self.config['area'][1].substring(self.config['area'][1].length - 1) == '%' ? self.config['area'][1].substring(0, self.config['area'][1].length - 1) : self.config['area'][1];


            var top_bottom = winHeight * ((percent_h / 100) / 2);
            var left_right = winWidth * ((percent_w / 100) / 2);

            self.modelBox.style.position = 'absolute';
            self.modelBox.style.zIndex = 1000;
            self.modelBox.style.backgroundColor = 'white';
            self.modelBox.style.left = left_right + 'px';
            self.modelBox.style.right = left_right + 'px';
            self.modelBox.style.top = top_bottom + 'px';
            self.modelBox.style.bottom = top_bottom + 'px';
            self.modelBox.style.borderRadius = self.config['radius'];

            self.modelBox.innerHTML = '<iframe id="myLayer_iframe" src="' + self.config['url'] + '" frameborder="0" width="100%" scrolling="No" height="100%" leftmargin="0" topmargin="0"></iframe>';
        },


        close: function () {
            window.parent.document.getElementById("myLayer_mask").remove();
            window.parent.document.getElementById("myLayer_box").remove();
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


    window.myLayer = function (cfg) {
        return new MyLayer(cfg);
    }

})(window);
