/**
 * Created by Administrator on 2016/6/14.
 */

// 弹出层对话框
(function ($) {
    'use strict';
    var dialog = function (options) {
        if (!(this instanceof dialog)) return new dialog(options);
        var _this = this;
        var dialogOptions = {
            dialogWarp: '.gxs-dialogs',
            dialog: '.gxs-dialog',
            dialogMask: '.gxs-dialog-mask',
            dialogBtnDefault: '.gxs-dialog-btn.default',
            dialogBtnPrimary: '.gxs-dialog-btn.primary',
            time: '3s',
            dialogText: '这个是内容',
            dialogTitle: '这个是标题',
            default: function () {
            },
            primary: function () {
            }
        };
        $.extend(dialogOptions, options);
        this.prototype = {
            dialogShow: function () {
                $(dialogOptions.dialogWarp).fadeIn(200);
                $(".gxs-vh").addClass("filter");
            },
            dialogRemove: function () {
                $(dialogOptions.dialogWarp).remove();
            },
            dialogHide: function () {
                $(dialogOptions.dialogWarp).fadeOut(200, function () {
                    $(".gxs-vh").removeClass("filter");
                    if (dialogOptions.append === true) {
                        _this.prototype.dialogRemove();
                    }
                });
            }
        };
        if (dialogOptions.append === true) {
            var date = new Date();
            dialogOptions.dialogWarp = '.gxs-dialogs-' + date.getTime();
            var str = dialogOptions.dialogWarp.substring(1);
            var dialogWarp = $('<div></div>', {
                class: "gxs-dialogs"
            }).appendTo('body').addClass(str);
            var dialogBox = $('<div></div>', {
                class: "gxs-dialog"
            }).appendTo(dialogWarp);
            var dialogMask = $('<div></div>', {
                class: "gxs-dialog-mask"
            }).appendTo(dialogWarp);
            var dialogHd = $('<div></div>', {
                class: "gxs-dialog-hd",
                html: '<h4 class="gxs-dialog-title">' + dialogOptions.dialogTitle + '</h4>'
            }).appendTo(dialogBox);
            var dialogBd = $('<div></div>', {
                class: "gxs-dialog-bd",
                html: '<p>' + dialogOptions.dialogText + '</p>'
            }).appendTo(dialogBox);
            var dialogFt = $('<div></div>', {
                class: "gxs-dialog-ft"
            }).appendTo(dialogBox);
            var dialogBtnDefault = $('<button></button>', {
                class: 'gxs-dialog-btn default',
                text: '取消'
            }).appendTo(dialogFt);
            var dialogBtnPrimary = $('<button></button>', {
                class: 'gxs-dialog-btn primary',
                text: "确定"
            }).appendTo(dialogFt);
            dialogOptions.dialogWarp = "." + str;
        }
        _this.prototype.dialogShow();
        $(dialogOptions.dialogMask).touchClick(function (event) {
            _this.prototype.dialogHide();
        });
        $(dialogOptions.dialogBtnPrimary).off("click").touchClick(function () {
            _this.prototype.dialogHide();
            dialogOptions.primary();
        });
        $(dialogOptions.dialogBtnDefault).off("click").touchClick(function () {
            _this.prototype.dialogHide();
            dialogOptions.default();
        });
    };
    window.dialog = dialog; //暴露给外部,以供调用
})($);
