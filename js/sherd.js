/**
 * Created by Administrator on 2016/6/14.
 */

$(function () {
    $('.gxs-body').height(window.innerHeight - $('.gxs-header').height() - $('.gxs-footer').height());
});

// 移动端使用touch事件模拟click
$.fn.touchClick = function (fn) {
    var startPos = null;
    for (var i = 0; i < this.length; i++) {
        this[i].addEventListener('touchstart', function (event) {
            var startTouch = event.changedTouches[0];
            startPos = {
                x: startTouch.pageX,
                y: startTouch.pageY,
                time: +new Date()
            };
            event.preventDefault();
        }, false);

        this[i].addEventListener('touchmove', function (event) {
            var moveTouch = event.changedTouches[0];
            var movePos = {
                x: moveTouch.pageX - startPos.x,
                y: moveTouch.pageY - startPos.y
            };
        }, false);

        this[i].addEventListener('touchend', function (event) {
            var duration = +new Date() - startPos.time;
            var endTouch = event.changedTouches[0];
            var endPos = {
                x: endTouch.pageX - startPos.x,
                y: endTouch.pageY - startPos.y
            };
            if (duration < 500 && 20 > endPos.x > -20 && 20 > endPos.y > -20) {
                return fn.call(this, event);//强制吧this指向调用方法的元素
            }
        }, false);
    }
};

//input 清空内容
$(function () {
    var html = $("<i></i>", {
        class: 'gxs-icon gxs-icon-close',
        click: function () {
            $(this).siblings(".gxs-input").val('');
            $(this).fadeOut(100);
        }
    });
    $(".gxs-cells-input").find(".gxs-input").after(html);
    $("input.gxs-input").on("keyup", function () {
        var _this = $(this);
        var ele = $(this).siblings(".gxs-icon-close");
        var seachIcon = $(this).siblings(".gxs-icon-seach");
        var seachBtn = $(this).parents(".gxs-cell-primary").siblings(".gxs-seach-btn");
        seachIcon.fadeOut(200);
        seachBtn.fadeIn(200);
        if (ele.length > 0) {
            ele.show();
        } else {
            var html = $("<i></i>", {
                class: 'gxs-icon gxs-icon-close',
                click: function () {
                    var str = "";
                    $(this).siblings(".gxs-input").val(str);
                    $(this).fadeOut(100);
                    seachIcon.fadeIn(200);
                    seachBtn.fadeOut(200);
                }
            }).append();
            $(html).show();
            $(this).parent().append(html);
        }
        if ($(this).val() == "") {
            ele.fadeOut(100);
            seachIcon.fadeIn(200);
            seachBtn.fadeOut(200);
        }
    });
});