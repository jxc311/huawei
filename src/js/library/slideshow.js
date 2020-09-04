import $ from './jquery.js';


$.fn.extend({
    slider: function(options) {
        let main = null, //主函数
            init = null, //初始值
            start = null, //开始
            stop = null, //停止
            prev = null, //上一个
            next = null, //下一个
            timer = null, //定时器
            elm = {}, //装载全局变量
            defaults = {
                speed: 700, //运动缓冲
                delay: 2000 //图片停留时间
            } //默认参数
        $.extend(defaults, options); //参数合并

        //初始值
        init = function() {
            elm.sliderBox = this.children('.img-box');
            elm.sliderDiv = elm.sliderBox.children('img'); //移动的div
            // console.log(elm.sliderDiv)
            elm.btns = this.children('.sliders>.btn'); //获取按钮
            //添加一张图片
            elm.list = this.children('ol').children('li'); //获取Li元素
            elm.index = 0; //保存照片的索引值
            //事件绑定
            this.hover(function() {
                stop();
                $(elm.btns).fadeTo(1000, 1);
                elm.btns.css('display', 'block');
            }, function() {
                elm.btns.css('display', 'none');
                timer = setInterval(start.bind(null, 1), defaults.speed + defaults.delay)
            });

            elm.btns.on('click', function() {
                if (elm.btns.index(this)) {
                    next();
                } else {
                    prev();
                }
            })
            elm.list.on('click', function() {
                let index = $(this).index();
                console.log(elm.sliderDiv.eq(index).index())
                $(elm.sliderDiv.eq(index)).fadeTo(500, 1);
                $(elm.sliderDiv.eq(index)).css('display', 'block').siblings().css('display', 'none');
                $(elm.sliderDiv.eq(index)).css('display', 'block').siblings().css('opacity', 0);
                // $(elm.sliderDiv.eq(elm.index - 1)).css('opacity', 0);
                elm.list.eq(index).addClass('active').siblings().removeClass('active'); //点击li时 添加类名
                elm.sliderDiv.eq(index).addClass('active').siblings().removeClass('active'); //点击Li时 改变图片的位置
                elm.index = index;
            });
        }.bind(this);

        start = function(decide) {
            //添加active 

            elm.index++;
            if (elm.index === 5) {
                elm.index = 0;
            }
            if (elm.index < 0) {
                elm.index = 4;
            }
            $(elm.sliderDiv.eq(elm.index)).fadeTo(500, 1);
            $(elm.sliderDiv.eq(elm.index)).css('display', 'block').siblings().css('display', 'none');
            $(elm.sliderDiv.eq(elm.index)).css('display', 'block').siblings().css('opacity', 0);
            // $(elm.sliderDiv.eq(elm.index - 1)).css('opacity', 0);
            elm.list.eq(elm.index).addClass('active').siblings().removeClass('active'); //点击li时 添加类名
            elm.sliderDiv.eq(elm.index).addClass('active').siblings().removeClass('active'); //点击Li时 改变图片的位置
        }.bind(this);
        prev = function() {
            elm.index--;
            elm.index--;
            start();
        };
        next = function() {
            start();
        };

        stop = function() {
                clearInterval(timer);
                // elm.sliderDiv.stop(true, true);
            }
            //主函数调用
        main = function() {
            init();
            timer = setInterval(start.bind(null), defaults.speed + defaults.delay);
        }
        main();
    }
});
$('.sliders').slider()