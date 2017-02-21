/**
 * Created by Administrator on 2016/6/14.
 */

// 弹出层提示框
(function ($) {
    'use strict';
    var alert = function (options) {
        if (!(this instanceof alert)) return new alert(options);
        var _this = this;
        var alertOptions = {
            alertBtn: '.alert-btn',
            alertWarp: '.gxs-alerts',
            alert: '.gxs-alert',
            alertMask: '.gxs-alert-mask',
            time: '3s',
            alertText: '这个是内容',
            isRemove: true,
            default: function () {
            },
            primary: function () {
            }
        };
        $.extend(alertOptions, options);
        this.prototype = {
            alertShow: function () {
                $(alertOptions.alertWarp).fadeIn(200);
            },
            alertRemove: function () {
                $(alertOptions.alertWarp).remove();
            },
            alertHide: function () {
                $(alertOptions.alertWarp).fadeOut(200, function () {
                    if (alertOptions.append === true) {
                        _this.prototype.alertRemove();
                    }
                });

            }
        };
        if (alertOptions.append === true) {
            var date = new Date();
            alertOptions.alertWarp = '.gxs-alerts-' + date.getTime();
            var str = alertOptions.alertWarp.substring(1);
            var alertWarp = $('<div></div>', {
                class: "gxs-alerts"
            }).appendTo('body').addClass(str);
            var alertBox = $('<div></div>', {
                class: "gxs-alert",
                html: "<p>" + alertOptions.alertText + "</p>"
            }).appendTo(alertWarp);
            var alertMask = $('<div></div>', {
                class: "gxs-alert-mask"
            }).appendTo(alertWarp);
            alertOptions.alertWarp = "." + str;
        }
        _this.prototype.alertShow();
        window.setTimeout(function functionName() {
            if (alertOptions.isRemove) {
                _this.prototype.alertHide();
                alertOptions.primary();
            }
        }, 3000);
        $(alertOptions.alertWarp).touchClick(function () {
            _this.prototype.alertHide();
            alertOptions.primary();
            alertOptions.isRemove = false;
        });
        alertOptions.default();
    };
    window.alert = alert; //暴露给外部,以供调用
})($);
