import $ from './library/jquery.js';
import { cookie } from './library/cookie.js';

(function() {
    let shop = cookie.get('shop');

    if (shop) {
        shop = JSON.parse(shop); //  有cookie数据 才转JSON

        let idList = shop.map(elm => elm.id).join(); // 获取所有id
        // console.log(idList)

        $.ajax({
            type: "get",
            url: "../../interface/getitems.php",
            data: {
                idList: idList
            },
            dataType: "json",
            success: function(res) {
                // console.log(res)
                var template = '';
                res.forEach((elm, i) => {
                    // console.log(elm);
                    let picture = JSON.parse(elm.img);

                    // 让ajax获得的数据结果的id 与 cookie中id  一一对应
                    // 索引值不同

                    // 从cookie中去筛选数据
                    let arr = shop.filter(val => val.id == elm.id);
                    // console.log(arr);

                    template += `
                        <li class="item">
                            <div class="p-box">
                                <input type="checkbox">
                            </div>
                            <div class="p-img">
                                <img src="${picture[0].src}" alt="">
                            </div>
                            <div class="p-title">
                                ${elm.title}
                            </div>
                            <div class="p-num">
                                <input type="number" value="${elm.num}" min="1" max="${elm.num}" class="biaodan">
                            </div>
                            <div class="p-price">
                                单价:<span>${elm.price}</span>
                            </div>
                            <div class="p-sum">
                                总价:<span class="zongji">${(elm.price*elm.num).toFixed(2)}</span>
                            </div>
                            <div class="p-del">
                                <a href="javascript:;">删除</a>
                            </div>
                        </li>`;

                });

                $('.itemlist').append(template);
                // 总价改变事件
                $('.biaodan').on('change', function(ev) {
                    let bt = $(this).val();
                    let pr = $(ev.target.parentNode.parentNode.children[4].children).html();
                    let sum = $(ev.target.parentNode.parentNode.children[5].children);
                    sum.html(bt * pr);
                    let num = 0;
                    $('.zongji').each((index, val) => {
                        num += parseInt($(val).html());
                    })
                    $('#delete .p-aggregate>p>span').html(num);
                });
                //初始时值
                let num = 0;
                $('.zongji').each((index, val) => {
                    num += parseInt($(val).html());
                })
                $('#delete .p-aggregate>p>span').html(num);
            }
        });

    }
    //checked选中事件
    $('#commdity>.p-box input').on('click', function(ev) {
        // console.log(ev.target.checked)
        if (ev.target.checked) {
            // console.log(123)
            $('.itemlist .p-box input').attr({ checked: 'checked' });
            $('#delete .p-box input').attr({ checked: 'checked' });
        } else {
            $('.itemlist .p-box input').removeAttr('checked');
            $('#delete .p-box input').removeAttr('checked');
        }
    });

    //删除事件
    $('.itemlist').on('click', '.p-del>a', function() {
        $(this).parent().parent().remove();
    });

    // 删除checked选中事件
    $('#delete .p-box input').on('click', function(ev) {
        // console.log(ev.target.checked)
        if (ev.target.checked) {
            $('.itemlist .p-box input').attr({ checked: 'checked' });
        } else {
            $('.itemlist .p-box input').removeAttr('checked');
        }
    });

    // 删除全选事件
    $('#delete .p-box a').on('click', function() {
        $('#content .itemlist li').remove();
    });



})();