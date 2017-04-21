
# gxs-style

## Ui框架
### cell栅格

```html

<div class="gxs-cells gxs-cells-icon gxs-cells-input">
    <div class="gxs-cell">
        <div class="gxs-cell-hd">
            <i class="gxs-icon">
                <img src="images/icon-tg1.png" alt="">
            </i>
        </div>
        <div class="gxs-cell-bd gxs-cell-default">
            <input type="text" class="gxs-input" placeholder="通告主题（不超过30个字符）">
        </div>
        <div class="gxs-cell-ft"></div>
    </div>
    <div class="gxs-cell gxs-cell-arrow">
        <div class="gxs-cell-hd">
            <i class="gxs-icon">
                <img src="images/icon-tg2.png" alt="">
            </i>
        </div>
        <div class="gxs-cell-bd gxs-cell-default">
            <input type="text" class="gxs-input" placeholder="截止时间">
        </div>
        <div class="gxs-cell-ft"></div>
    </div>
</div>
```
<div class="gxs-cells gxs-cells-icon gxs-cells-input">
    <div class="gxs-cell">
        <div class="gxs-cell-hd">
            <i class="gxs-icon">
                <img src="images/icon-tg1.png" alt="">
            </i>
        </div>
        <div class="gxs-cell-bd gxs-cell-default">
            <input type="text" class="gxs-input" placeholder="通告主题（不超过30个字符）">
        </div>
        <div class="gxs-cell-ft"></div>
    </div>
    <div class="gxs-cell gxs-cell-arrow">
        <div class="gxs-cell-hd">
            <i class="gxs-icon">
                <img src="images/icon-tg2.png" alt="">
            </i>
        </div>
        <div class="gxs-cell-bd gxs-cell-default">
            <input type="text" class="gxs-input" placeholder="截止时间">
        </div>
        <div class="gxs-cell-ft"></div>
    </div>
</div>

```html
<div class="gxs-cells gxs-cells-icon gxs-cells-arrow gxs-cells-check">
    <div class="gxs-cell">
        <div class="gxs-cell-hd">
            <label for="d2" class="">
                <input type="checkbox" class="gxs-check" id="d2">
                <i class="gxs-icon"></i>
            </label>
        </div>
        <div class="gxs-cell-bd gxs-cell-default">
            <div class="bm-cell-user gxs-cell gxs-cell-arrow">
                <div class="gxs-cell-hd bm-cell-hd">
                    <div class="gxs-icon">
                        <img src="images/me-info-tx.png" alt="">
                    </div>
                </div>
                <div class="gxs-cell-bd bm-cell-bd gxs-cell-default">
                    <div class="bm-cell-name">月94</div>
                    <div class="bm-cell-infos">
                        <div class="bm-cell-info">模特</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
```

## JavaScript插件
### downLoad（下拉加载，上拉刷新）

```html
<div class="scrollable">
    <div class="scrollable-box">
      <!-- 内容区 -->
    </div>
</div>
```

```javascript
//调用方法
downLoad({
    scrollable: '.scrollable',// 最外围元素
    scrollableBox: '.scrollable-box',// 滚动的元素，主体内容
    refresh: '.refresh',// 刷新
    loading: '.loading',// 加载
    type: 'all',// 类型 all表示调用刷新加载 'loading' 'refreshFn'
    refreshFn: function () {
        // 刷新后执行的方法
    },
    loadingFn: function () {
        // 加载后执行的方法
    }
});

```

### dialog（模态框）

```html
<div class="gxs-dialogs">
    <div class="gxs-dialog">
        <div class="gxs-dialog-hd">
            <h4 class="gxs-dialog-title">弹窗标题</h4>
        </div>
        <div class="gxs-dialog-bd">
            <p>弹窗内容</p>
        </div>
        <div class="gxs-dialog-ft">
            <button class="gxs-dialog-btn default">取消</button>
            <button class="gxs-dialog-btn primary">确定</button>
        </div>
    </div>
    <div class="gxs-dialog-mask"></div>
</div>
```

```javascript
//调用方法
 new dialog({
    append: true,// 是否动态创建dialog
    dialogText: '提示信息',// 指定dialog的内容
    dialogTitle: '提示标题',// 指定dialog的标题
    default: function () {
        // 取消按钮回调
        console.log("取消按钮1")
    },
    primary: function () {
        // 确定按钮回调
        console.log("确定按钮1")
    }
})
// 为了页面中可以多次调用dialog，需要自行绑定事件触发调用方法

// 列子
$('.dialog-btn').click(function (event) {
    new dialog({
        dialogBtn: '.dialog-btn',
        dialogText: '提示信息',
        dialogTitle: '提示标题',
        default: function () {
            console.log("取消按钮1")
        },
        primary: function () {
            console.log("确定按钮1")
        }
    })
})

```

### alert（提示框）

```html
<div class="gxs-alerts">
    <div class="gxs-alert">
        <p>错误提示</p>
    </div>
</div>
``
```

```javascript
//调用方法
new alert({
    append: true,// 是否动态创建alert
    alertText: '提示信息2',// 指定提示的内容
    default: function () {
        console.log("触发提示框")
    },
    primary: function () {
        console.log("提示框消失")
    }
})
// 为了页面中可以多次调用alert，需要自行绑定事件触发调用方法
```

### selectTouch（仿ios滚动选择）

```html
<div class="gxs-selectTouchs">
    <div class="gxs-selectTouch">
        <div class="gxs-selectTouch-hd">
            <button class="gxs-btn default" type="button">取消</button>
            <button class="gxs-btn primary" type="button">选择</button>
        </div>
        <div class="gxs-selectTouch-bd">
            <div class="gxs-selectTouch-border"></div>
            <div class="gxs-selectTouch-slide">
                <div class="gxs-selectTouch-box">
                    <p><span>北京</span></p>
                </div>
                <div class="gxs-selectTouch-box">
                    <p><span>青岛</span></p>
                </div>
                <div class="gxs-selectTouch-box">
                    <p><span>烟台</span></p>
                </div>
                <div class="gxs-selectTouch-box">
                    <p><span>威海</span></p>
                </div>
                <div class="gxs-selectTouch-box">
                    <p><span>潍坊</span></p>
                </div>
            </div>
        </div>
    </div>
    <div class="gxs-selectTouch-bg"></div>
</div>

```

```javascript
//调用方法
new selectTouch({
    append: true,// 是否动态创建alert
    designateSelect: function (text, val) {
        console.log(text, val)
        // 获取选择的值
    }
});
// 为了页面中可以多次调用alert，需要自行绑定事件触发调用方法
```

```html
<!--动态创建示例-->
<button type="button" class="gxs-btn alert-selectTouch1" data-index="modal">选择</button>
<select name="" class="gxs-select" data-index="modal">
    <option>请选择</option>
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
    <option>5</option>
    <option>6</option>
</select>
<!--为了区分不同的selectTouch data-index 的值需要绑定才可以触发-->
```
