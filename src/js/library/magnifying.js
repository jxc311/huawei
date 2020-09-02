import $ from './jquery.js';
//放大镜
(function() {
    let movebox = $('.movebox'),
        bigpicture = $('.bigpicture'),
        fdj = $('#fdj'),
        big = $('.big');
    // 1. 事件绑定 fdj  mouseover事件
    fdj.on('mouseover', function() {
        // 显示元素

        movebox.addClass('show');
        big.addClass('show');
        // 5. 给movebox设置大小
        movebox.css({
            width: (fdj.width() * big.width() / bigpicture.width()) + 'px',
            height: (fdj.height() * big.height() / bigpicture.height()) + 'px'
        })

        // 3. 让movebox跟随鼠标移动
        fdj.on('mousemove', function(ev) {
            let top = ev.pageY - fdj.position().top - movebox.height() / 2;
            let left = ev.pageX - fdj.position().left - movebox.width() / 2;

            // 4. 计算移动比例
            let ratio = bigpicture.width() / fdj.width(); // 比例必须大于1




            // 边界管理
            if (top <= 0) {
                top = 0;
            } else if (top >= fdj.height() - movebox.height()) {
                top = fdj.height() - movebox.height() - 2;
            }

            if (left <= 0) {
                left = 0;
            } else if (left >= fdj.width() - movebox.width()) {
                left = fdj.width() - movebox.width() - 2;
            }

            movebox.css({
                top: top + 'px',
                left: left + 'px'
            });

            bigpicture.css({
                top: ratio * -top + 'px',
                left: ratio * -left + 'px'
            });
        });

    });

    // 2. 鼠标离开 隐藏元素
    fdj.on('mouseout', function() {
        movebox.removeClass('show');
        big.removeClass('show');
    });

})();