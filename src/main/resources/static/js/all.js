
// 失败消息盒
function dangerNotice(notice) {
    $('.dangerNotice').html(notice);
    $('.dangerNoticeAlert').css("display","block");
    var closeNoticeBox = setTimeout(function () {
        $('.dangerNoticeAlert').css("display","none");
    },3000);
}
// 成功消息盒
function successNotice(notice) {
    $('.successNotice').html(notice);
    $('.successNoticeAlert').css("display","block");
    var closeNoticeBox = setTimeout(function () {
        $('.successNoticeAlert').css("display","none");
    },3000);
}
//设置右侧栏箭头动画显示
var sidebar_toggle = $("#sidebar_toggle");
var sidebar_toggle_line_first = $(".sidebar-toggle-line-first");
var sidebar_toggle_line_middle = $(".sidebar-toggle-line-middle");
var sidebar_toggle_line_last = $(".sidebar-toggle-line-last");
sidebar_toggle.mouseenter(function () {
    sidebar_toggle_line_first.animate({
        width:'50%',
        top:'2px',
        left:'0px'
    },function () {
        sidebar_toggle_line_first.css({
            'transform':'rotate(-45deg)',
            'transition':'transform 0.5',
            'width':'50%',
            'top':'2px',
            'left':'0px'
        })
    });
    sidebar_toggle_line_middle.animate({
        width:'90%',
        top:'0px',
        left:'0px'
    },function () {
        sidebar_toggle_line_middle.css({
            'transform':'rotate(0deg)',
            'transition':'transform 0.5',
            'width':'90%',
            'top':'0px',
            'left':'0px'
        })
    });
    sidebar_toggle_line_last.animate({
        width:'50%',
        top:'-2px',
        left:'0px'
    },function () {
        sidebar_toggle_line_last.css({
            'transform':'rotate(45deg)',
            'transition':'transform 0.5, width 0.5',
            'width':'50%',
            'top':'-2px',
            'left':'0px'
        })
    })
});
sidebar_toggle.mouseleave(function () {
    sidebar_toggle_line_first.animate({
        top:'0px',
        left:'0px'
    },function () {
        sidebar_toggle_line_first.css({
            'transform':'rotateZ(0deg)',
            'transition':'transform 0.5, width 0.5',
            'width':'100%',
            'top':'0px',
            'left':'0px'
        })
    });
    sidebar_toggle_line_middle.animate({
        top:'0px',
        left:'0px'
    },function () {
        sidebar_toggle_line_middle.css({
            'transform':'rotateZ(0deg)',
            'transition':'transform 0.5, width 0.5',
            'width':'100%',
            'top':'0px',
            'left':'0px'
        })
    });
    sidebar_toggle_line_last.animate({
        top:'-0px',
        left:'0px'
    },function () {
        sidebar_toggle_line_last.css({
            'transform':'rotateZ(0deg)',
            'transition':'transform 0.5',
            'width':'100%',
            'top':'-0px',
            'left':'0px'
        })
    })
});

//获得访客量，除文章显示界面外其他界面访客量通用
var pageName = window.location.pathname + window.location.search;
$.ajax({
    type:'get',
    url:'/getVisitorNumByPageName',
    dataType:'json',
    data:{
        pageName:pageName.substring(1)
    },
    success:function (data) {
        if(data['status'] == 103){
            $("#totalVisitors").html(0);
            $("#visitorVolume").html(0);
        } else {
            $("#totalVisitors").html(data['data']['totalVisitor']);
            $("#visitorVolume").html(data['data']['pageVisitor']);
        }
    },
    error:function () {
    }
});

//点击右侧栏获得日志、分类、标签数目以及微信公众号图片
$('#sidebar_toggle').click(function () {
    $.ajax({
        type:'get',
        url:'/findArchivesCategoriesTagsNum',
        dataType:'json',
        data:{
        },
        success:function (data) {
            if(data['status'] == 103){
                dangerNotice(data['message'] + " 获得右侧栏信息失败")
            } else {
                $('.archivesNum').html(data['data']['archivesNum']);
                $('.categoriesNum').html(data['data']['categoriesNum']);
                $('.tagsNum').html(data['data']['tagsNum']);
            }
        },
        error:function () {
        }
    });
    $('.weixinPublic').attr("src","https://images.liujian.cool/img/wx-public.jpg");
});

//获得登录用户未读消息
$.ajax({
    type:'post',
    url:'/getUserNews',
    dataType:'json',
    data:{
    },
    success:function (data) {
        var thisPageName = window.location.pathname + window.location.search;
        var news = $('.news');
        if(data['status'] == 103){
            return;
        }
        if(data['status'] != 101 && data['data']['result'] != 0){
            news.append($('<span class="newsNum am-badge am-badge-danger am-round">' + data['data']['result']['allNewsNum'] + '</span>'));
            if(thisPageName === "/user"){
                if(data['data']['result']['commentNum'] !== 0){
                    $('.commentMessage').find('a').append($('<span class="commentNotReadNum am-margin-right am-fr am-badge am-badge-danger am-round">' + data['data']['result']['commentNum'] + '</span>'));
                }
                if(data['data']['result']['leaveMessageNum'] !== 0){
                    $('.leaveWord').find('a').append($('<span class="leaveMessageNotReadNum am-margin-right am-fr am-badge am-badge-danger am-round">' + data['data']['result']['leaveMessageNum'] + '</span>'));
                }
            }
        }
    },
    error:function () {
    }
});

//反馈
$('.feedbackClick').click(function () {
    $('.feedback').css("display","block")
});
$('.feedbackClose').click(function () {
    $('.feedback').css("display","none")
});
$('.feedbackFormBtn').click(function () {
    var feedbackFormContent = $('#feedbackFormContent');
    var feedbackFormQQ = $('.feedbackFormQQ');
    if(feedbackFormContent.val().length == 0){
        dangerNotice("反馈内容不能为空哦！")
    } else {
        $.ajax({
            type:'POST',
            url:'/submitFeedback',
            dataType:'json',
            data:{
                feedbackContent:feedbackFormContent.val(),
                contactInfo:feedbackFormQQ.val()
            },
            success:function (data) {
                if(data['status'] == 101){
                    $.get("/toLogin",function(data,status,xhr){
                        window.location.replace("/login");
                    });
                } else if (data['status'] == 103){
                    dangerNotice(data['message'] + " 反馈失败")
                }
                else {
                    successNotice("反馈成功，我会尽快解决的！");
                    $('.feedback').css("display","none");
                }
            },
            error:function () {
            }
        });
    }
});


//图片懒加载
$(function() {
    // 获取window的引用:
    var $window = $(window);
    // 获取包含data-src属性的img，并以jQuery对象存入数组:
    var lazyImgs = _.map($('img[data-src]').get(), function (i) {
        return $(i);
    });
    // 定义事件函数:
    var onScroll = function () {
        // 获取页面滚动的高度:
        var wtop = $window.scrollTop();
        // 判断是否还有未加载的img:
        if (lazyImgs.length > 0) {
            // 获取可视区域高度:
            var wheight = $window.height();
            // 存放待删除的索引:
            var loadedIndex = [];
            // 循环处理数组的每个img元素:
            _.each(lazyImgs, function ($i, index) {
                // 判断是否在可视范围内:
                if ($i.offset().top - wtop - 350 < wheight) {
                    // 设置src属性:
                    $i.attr('src', $i.attr('data-src'));
                    // 添加到待删除数组:
                    loadedIndex.unshift(index);
                }
            });
            // 删除已处理的对象:
            _.each(loadedIndex, function (index) {
                lazyImgs.splice(index, 1);
            });
        }
    };
    // 绑定事件:
    $window.scroll(onScroll);
    // 手动触发一次:
    onScroll();
});

//每日一言
$(function() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'https://v1.hitokoto.cn');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var data = JSON.parse(xhr.responseText);
            var hitokoto = document.getElementById('hitokoto');
            hitokoto.innerText = data.hitokoto;
        }
    }
    xhr.send();
});


//设置body背景颜色
$(function() {
    document.body.style.backgroundColor = "#f4f4f4";
});

//鼠标绘制多边形
/**
 * Copyright (c) 2016 hustcc
 * License: MIT
 * Version: v1.0.1
 * GitHub: https://github.com/hustcc/canvas-nest.js
 **/
! function() {
    //封装方法，压缩之后减少文件大小
    function get_attribute(node, attr, default_value) {
        return node.getAttribute(attr) || default_value;
    }
    //封装方法，压缩之后减少文件大小
    function get_by_tagname(name) {
        return document.getElementsByTagName(name);
    }
    //获取配置参数
    function get_config_option() {
        var scripts = get_by_tagname("script"),
            script_len = scripts.length,
            script = scripts[script_len - 1]; //当前加载的script
        return {
            l: script_len, //长度，用于生成id用
            z: get_attribute(script, "zIndex", -1), //z-index
            o: get_attribute(script, "opacity", 0.5), //opacity
            c: get_attribute(script, "color", "0,0,0"), //color
            n: get_attribute(script, "count", 99) //count
        };
    }
    //设置canvas的高宽
    function set_canvas_size() {
        canvas_width = the_canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            canvas_height = the_canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    }

    //绘制过程
    function draw_canvas() {
        context.clearRect(0, 0, canvas_width, canvas_height);
        //随机的线条和当前位置联合数组
        var e, i, d, x_dist, y_dist, dist; //临时节点
        //遍历处理每一个点
        random_points.forEach(function(r, idx) {
            r.x += r.xa,
                r.y += r.ya, //移动
                r.xa *= r.x > canvas_width || r.x < 0 ? -1 : 1,
                r.ya *= r.y > canvas_height || r.y < 0 ? -1 : 1, //碰到边界，反向反弹
                context.fillRect(r.x - 0.5, r.y - 0.5, 1, 1); //绘制一个宽高为1的点
            //从下一个点开始
            for (i = idx + 1; i < all_array.length; i++) {
                e = all_array[i];
                // 当前点存在
                if (null !== e.x && null !== e.y) {
                    x_dist = r.x - e.x; //x轴距离 l
                    y_dist = r.y - e.y; //y轴距离 n
                    dist = x_dist * x_dist + y_dist * y_dist; //总距离, m

                    dist < e.max && (e === current_point && dist >= e.max / 2 && (r.x -= 0.03 * x_dist, r.y -= 0.03 * y_dist), //靠近的时候加速
                        d = (e.max - dist) / e.max,
                        context.beginPath(),
                        context.lineWidth = d / 2,
                        context.strokeStyle = "rgba(" + config.c + "," + (d + 0.2) + ")",
                        context.moveTo(r.x, r.y),
                        context.lineTo(e.x, e.y),
                        context.stroke());
                }
            }
        }), frame_func(draw_canvas);
    }
    //创建画布，并添加到body中
    var the_canvas = document.createElement("canvas"), //画布
        config = get_config_option(), //配置
        canvas_id = "c_n" + config.l, //canvas id
        context = the_canvas.getContext("2d"), canvas_width, canvas_height,
        frame_func = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(func) {
            window.setTimeout(func, 1000 / 45);
        }, random = Math.random,
        current_point = {
            x: null, //当前鼠标x
            y: null, //当前鼠标y
            max: 20000 // 圈半径的平方
        },
        all_array;
    the_canvas.id = canvas_id;
    the_canvas.style.cssText = "position:fixed;top:0;left:0;z-index:" + config.z + ";opacity:" + config.o;
    get_by_tagname("body")[0].appendChild(the_canvas);

    //初始化画布大小
    set_canvas_size();
    window.onresize = set_canvas_size;
    //当时鼠标位置存储，离开的时候，释放当前位置信息
    window.onmousemove = function(e) {
        e = e || window.event;
        current_point.x = e.clientX;
        current_point.y = e.clientY;
    }, window.onmouseout = function() {
        current_point.x = null;
        current_point.y = null;
    };
    //随机生成config.n条线位置信息
    for (var random_points = [], i = 0; config.n > i; i++) {
        var x = random() * canvas_width, //随机位置
            y = random() * canvas_height,
            xa = 2 * random() - 1, //随机运动方向
            ya = 2 * random() - 1;
        // 随机点
        random_points.push({
            x: x,
            y: y,
            xa: xa,
            ya: ya,
            max: 6000 //沾附距离
        });
    }
    all_array = random_points.concat([current_point]);
    //0.1秒后绘制
    setTimeout(function() {
        draw_canvas();
    }, 100);
}();


//鼠标点击爱心
!function(e, t, a) {
    function r() {
        for (var e = 0; e < s.length; e++) s[e].alpha <= 0 ? (t.body.removeChild(s[e].el), s.splice(e, 1)) : (s[e].y--, s[e].scale += .004, s[e].alpha -= .013, s[e].el.style.cssText = "left:" + s[e].x + "px;top:" + s[e].y + "px;opacity:" + s[e].alpha + ";transform:scale(" + s[e].scale + "," + s[e].scale + ") rotate(45deg);background:" + s[e].color + ";z-index:99999");
        requestAnimationFrame(r)
    }
    function n() {
        var t = "function" == typeof e.onclick && e.onclick;
        e.onclick = function(e) {
            t && t(),
                o(e)
        }
    }
    function o(e) {
        var a = t.createElement("div");
        a.className = "heart",
            s.push({
                el: a,
                x: e.clientX - 5,
                y: e.clientY - 5,
                scale: 1,
                alpha: 1,
                color: c()
            }),
            t.body.appendChild(a)
    }
    function i(e) {
        var a = t.createElement("style");
        a.type = "text/css";
        try {
            a.appendChild(t.createTextNode(e))
        } catch(t) {
            a.styleSheet.cssText = e
        }
        t.getElementsByTagName("head")[0].appendChild(a)
    }
    function c() {
        return "rgb(" + ~~ (255 * Math.random()) + "," + ~~ (255 * Math.random()) + "," + ~~ (255 * Math.random()) + ")"
    }
    var s = [];
    e.requestAnimationFrame = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame ||
        function(e) {
            setTimeout(e, 1e3 / 60)
        },
        i(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"),
        n(),
        r()
} (window, document);
