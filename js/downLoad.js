// 延时加载
(function ($) {
    'use strict';
    var downLoad = function (options) {
        if (!(this instanceof downLoad)) return new downLoad(options);
        var _this = this, startPos = null, startTouch = null, movePos = null, moveTouch = null, endPos = null, endTouch = null, isTouch = false;
        var downLoadOptions = {
            scrollable: '.scrollable',
            scrollableBox: '.scrollable-box',
            refresh: '.refresh',
            loading: '.loading',
            type: 'all',
            refreshFn: function () {

            },
            loadingFn: function () {

            }
        };
        $.extend(downLoadOptions, options);

        var scrollableHeight = $(downLoadOptions.scrollableBox).height();
        var refresh = "<div class='scrollable-loading refresh'><div class='loader'><div class='loader-inner line-spin-fade-loader'><div></div><div></div><div></div><div></div> <div></div> <div></div> <div></div> <div></div> </div> </div> <div class='loader-info'> 刷新中 </div> </div>";
        var loading = "<div class='scrollable-loading loading'><div class='loader'><div class='loader-inner line-spin-fade-loader'><div></div><div></div><div></div><div></div> <div></div> <div></div> <div></div> <div></div> </div> </div> <div class='loader-info'> 加载中 </div> </div>";

        $(downLoadOptions.scrollableBox).append(refresh, loading);

        this.prototype = {
            refresh: function (num) {
                console.log(1);
                var _this = this;
                if (num <= 0) {
                    this.end = 60;
                    this.animationStar(this.end, 200);
                    var isRefresh = downLoadOptions.refreshFn();
                    if (isRefresh) {
                        $(downLoadOptions.refresh).find(".loader-info").text("刷新成功");
                    } else {
                        $(downLoadOptions.refresh).find(".loader-info").text("刷新失败");
                    }
                    window.setTimeout(function () {
                        $(downLoadOptions.scrollable).scrollTop(num);
                        _this.animationStar(0, 200);
                        _this.hiddenLoading();
                    }, 800);
                } else {
                    if (_this.options.type == "all") {
                        window.setTimeout(function () {
                            _this.hiddenLoading();
                        }, 800);
                    } else {
                        _this.hiddenLoading();
                    }
                }
            },
            loading: function (num) {
                var _this = this;
                var bodyHeight = scrollableHeight - $(downLoadOptions.scrollable).height();
                var scrollTop = $(downLoadOptions.scrollableBox).height() - $(downLoadOptions.scrollable).height();
                if (num > bodyHeight) {
                    var isLoading = downLoadOptions.loadingFn();
                    if (isLoading) {
                        $(downLoadOptions.loading).find(".loader-info").text("加载成功");
                    } else {
                        $(downLoadOptions.loading).find(".loader-info").text("加载失败");
                    }
                    window.setTimeout(function () {
                        $(downLoadOptions.scrollable).animate({"scrollTop": scrollTop}, 200);
                        _this.hiddenLoading();
                    }, 800);
                } else {
                    if (_this.options.type == "all") {
                        window.setTimeout(function () {
                            _this.hiddenLoading();
                        }, 800);
                    } else {
                        _this.hiddenLoading();
                    }
                }
            },
            animationStar: function (num, time) {
                $(downLoadOptions.scrollableBox).css({
                    "-webkit-transform": "translateY(" + num + "px)",
                    "-moz-transform": "translateY(" + num + "px)",
                    "-ms-transform": "translateY(" + num + "px)",
                    "transform": "translateY(" + num + "px)",
                    "-webkit-transition": time + "ms ease-out",
                    "-moz-transition": time + "ms ease-out",
                    "-ms-transition": time + "ms ease-out",
                    "transition": time + "ms ease-out"
                });
            },
            hiddenLoading: function () {
                window.setTimeout(function () {
                    $(".scrollable-loading").css({opacity: 0});
                }, 500);
                scrollableHeight = $(downLoadOptions.scrollableBox).height();
            },
            showLoading: function () {
                if ($(downLoadOptions.scrollable).scrollTop() <= 0) {
                    $(downLoadOptions.loading).css({opacity: 0});
                    $(downLoadOptions.refresh).css({opacity: 1});
                }
                if ($(downLoadOptions.scrollable).scrollTop() >= $(downLoadOptions.scrollableBox).height() - $(downLoadOptions.scrollable).height()) {
                    $(downLoadOptions.loading).css({opacity: 1});
                    $(downLoadOptions.refresh).css({opacity: 0});
                }
            }
        };
        $(downLoadOptions.scrollableBox).on('touchstart', function (event) {
            startPos = event.originalEvent.changedTouches[0];
            startTouch = {
                x: startPos.pageX,
                y: startPos.pageY
            };
            $(downLoadOptions.refresh).find(".loader-info").text("刷新中");
            $(downLoadOptions.loading).find(".loader-info").text("加载中");
            event.stopPropagation();
        });

        $(downLoadOptions.scrollableBox).on('touchmove', function (event) {
            movePos = event.originalEvent.changedTouches[0];
            moveTouch = {
                x: movePos.pageX - startTouch.x,
                y: movePos.pageY - startTouch.y
            };
            isTouch = moveTouch;
        });

        $(downLoadOptions.scrollableBox).on('touchend', function (event) {
            if (!isTouch) {
                return;
            }
            endPos = event.originalEvent.changedTouches[0];
            endTouch = {
                x: endPos.pageX - startTouch.x,
                y: endPos.pageY - startTouch.y
            };
            if (endTouch.y < 5 && endTouch.y > -5) {
                return;
            }
            if ($(downLoadOptions.scrollableBox).height() < $(downLoadOptions.scrollable).height()) {
                if (moveTouch.y > 0) {
                    $(downLoadOptions.loading).css({opacity: 0});
                    $(downLoadOptions.refresh).css({opacity: 1});
                } else {
                    $(downLoadOptions.loading).css({opacity: 1});
                    $(downLoadOptions.refresh).css({opacity: 0});
                }
            } else {
                _this.prototype.showLoading();
            }
            if (downLoadOptions.type == "loading") {
                _this.prototype.loading($(downLoadOptions.scrollable).scrollTop());
            }
            if (downLoadOptions.type == "refreshFn") {
                _this.prototype.refresh($(downLoadOptions.scrollable).scrollTop());
            }
            if (downLoadOptions.type == "all") {
                if (moveTouch.y > 0) {
                    _this.prototype.refresh($(downLoadOptions.scrollable).scrollTop());
                } else {
                    _this.prototype.loading($(downLoadOptions.scrollable).scrollTop());
                }
            }
        });
    };
    window.downLoad = downLoad; //暴露给外部,以供调用
})($);

