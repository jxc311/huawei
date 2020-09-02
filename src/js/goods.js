import $ from './library/jquery.js';
import { cookie } from './library/cookie.js';

(function() {
    let id = location.search.split('=')[1]; // 获取id


    $.ajax({
        type: "get",
        url: "../../interface/getitem.php",
        data: {
            id: id
        },
        dataType: "json",
        success: function(res) {
            let picture = JSON.parse(res.img);

            let template = `<div id="gsCount">
                <input type="number" id="Count" value="1" min="1" max="${res.num}">
                <div id="add" class="no-l">
                    <a href="#">+</a>
                </div>
                <div id="reduce" class="no-l">
                    <a href="#">-</a>
                </div>
            </div>
            <a href="./shopcar.html" id="addgwc">加入购物车</a>`

            $('#urlname').html(res.title);
            $('#spname').html(res.title);
            $('#yuan').html('￥' + res.price);
            $('#parameter').append(res.details);
            $('#fdj').css('background', `url(..${picture[1].src})`).css('background-size', '100%');
            $('#li1').css('background', `url(..${picture[1].src})`).css('background-size', '100%');
            $('#li2').css('background', `url(..${picture[2].src})`).css('background-size', '100%');
            $('#li3').css('background', `url(..${picture[3].src})`).css('background-size', '100%');
            $('#li4').css('background', `url(..${picture[4].src})`).css('background-size', '100%');
            $('#li5').css('background', `url(..${picture[5].src})`).css('background-size', '100%');

            $('#qqq>li').on('mouseover', function() {
                $('#fdj').css('background', this.style.background);
                //放大镜图片
                $('.bigpicture').css('background', this.style.background);
            });

            $('#gwcID').append(template).find('#addgwc').on('click', function() {
                addItem(res.id, res.price, $('#Count').val());
            });

        }
    });



    function addItem(id, price, num) {
        let shop = cookie.get('shop'); // 从cookie中获取shop数据

        let product = {
            id: id,
            price: price,
            num: num
        };

        if (shop) { // 判断是否存有购物车数据
            shop = JSON.parse(shop);
            // 购物车中是否已经存在当前这件商品
            if (shop.some(elm => elm.id == id)) {
                // 修改数量
                shop.forEach(elm => {
                    elm.id === id ? elm.num = num : null;
                });
            } else {
                // 添加商品
                shop.push(product);
            }

        } else {
            shop = [];
            shop.push(product);
        }

        cookie.set('shop', JSON.stringify(shop), 1);
    }
})();