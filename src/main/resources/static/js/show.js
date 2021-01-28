    //每日一言
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

    var articleId = "";

    //填充文章
    function putInArticle(data) {
        $('.zhy-article-top').html('');
        $('.zhy-article-footer').html('');
        var articleTop = $('<article-top><div class="article-title">' +
            '<h1>' + data.articleTitle + '</h1>' +
            '</div>' +
            '<div class="article-info row">' +
            '<div class="article-info article-info-type am-badge am-badge-success">' +
            data.articleType +
            '</div>' +
            '<div class="article-info article-info-publishDate">' +
            '<i class="am-icon-calendar"><a class="articleCategoryColor" href="/archives?archive=' + data.publishDate + '"> ' + data.publishDate + '</a></i>' +
            '</div>' +
            '<div class="article-info article-info-originalAuthor">' +
            '<i class="am-icon-user"> ' + data.originalAuthor + '</i>' +
            '</div>' +
            '<div class="article-info article-info-categories">' +
            '<i class="am-icon-folder"> <a class="articleCategoryColor" href="/categories?category=' + data.articleCategories + '">' + data.articleCategories + '</a></i>' +
            '</div>' +
            '</div></article-top><div class="article-i-say">' +
            '<strong><p id="hitokoto">每日一言获取中...</p></strong>' +
            '<p style="text-align: right;"><strong>--- 刘川枫</strong></p>' +
            '</div>');
        $('.zhy-article-top').append(articleTop);
        $("#mdText").text(data.articleContent);
        var wordsView;
        wordsView = editormd.markdownToHTML("wordsView", {
            htmlDecode: "true", // you can filter tags decode
            emoji: true,
            taskList: true,
            tex: true,
            flowChart: true,
            sequenceDiagram: true
        });
        var articleFooter = $('<div class="end-logo">' +
            '<i class="am-icon-btn am-success am-icon-lg">完</i>' +
            '</div>' +
            '<div class="show-weixin">' +
            '<p><i class="weiXinQuoteLeft am-icon-quote-left "></i></p><br>' +
            '<p class="show-weixin-pic">' +
            '<img src="http://images.liujian.cool/img/wx-public.jpg">' +
            '</p>' +
            '<p class="show-weixin-pic">欢迎关注我的微信公众号：程序猿刘川枫</p>' +
            '<p><i class="weiXinQuoteRight am-icon-quote-right "></i></p>' +
            '</div>' +
            '<div>' +
            '<ul class="post-copyright">' +
            '<li><strong>本文作者：</strong><span id="authorFooter">' + data.originalAuthor + '</span></li>' +
            '<li><strong>原文链接：</strong><span id="urlFooter"><a href="' + data.articleUrl + '">' + data.articleUrl + '</a></span></li>' +
            '<li><strong>版权声明：</strong> 本博客所有文章除特别声明外，均采用<span id="copyRightFooter"><a href="https://creativecommons.org/licenses/by/3.0/cn/" target="_blank"> CC BY 3.0 CN协议</a></span>进行许可。转载请署名作者且注明文章出处。</li>' +
            '</ul>' +
            '</div>' +
            '<div class="article-tags">' +

            '</div>' +
            '<hr>' +
            '<div class="two-article">' +
            '<span class="article-last">' +

            '</span>' +
            '<span class="article-next">' +
            '</span>' +
            '</div>');
        $('.zhy-article-footer').append(articleFooter);
        var tags = $('<div class="tags"></div>');
        for(var i=0;i<data.articleTags.length;i++){
            var tag = $('<i class="am-icon-tag"></i><a class="articleTagColor" href="/tags?tag=' + data.articleTags[i] + '"> ' + data.articleTags[i] + '</a>');
            tags.append(tag);
        }
        $('.article-tags').append(tags);
        if(data.lastStatus == "200"){
            var articleLast200 = $('<i class="am-icon-angle-left am-icon-sm"></i>&nbsp;&nbsp;<a class="lastAndNext" href="' + data.lastArticleUrl +'">' + data.lastArticleTitle + '</a>');
            $('.article-last').append(articleLast200);
        } else {
            var articleLast500 = $('<i class="am-icon-angle-left am-icon-sm"></i>&nbsp;&nbsp;<a  class="lastAndNext">' + data.lastInfo + '</a>');
            $('.article-last').append(articleLast500);
        }
        if(data.nextStatus == "200"){
            var articleNext200 = $('<a class="lastAndNext" href="' + data.nextArticleUrl +'">' + data.nextArticleTitle + '</a>' + '&nbsp;&nbsp;<i class="am-icon-angle-right am-icon-sm"></i>');
            $('.article-next').append(articleNext200);
        } else {
            var articleNext500 = $('<a  class="lastAndNext">' + data.nextInfo + '</a>' + '&nbsp;&nbsp;<i class="am-icon-angle-right am-icon-sm"></i>');
            $('.article-next').append(articleNext500);
        }
        var likeBtn = $('<div class="likeBtn am-btn am-btn-danger">' +
            '<div class="likeHeart">' +
            '<i class="am-icon-heart-o">&nbsp;&nbsp;喜欢</i>' +
            '</div>' +
            '<div class="likesNum">' +
            '<span> ' + data.likes + '</span>' +
            '</div>' +
            '</div>');
        $('.other').append(likeBtn);
        if(data.isLiked == 1){
            $('.likeBtn').css({
                "background-color": "#EA6F5A",
                "color":"white"
            });
            $('.likesNum').css({
                "border-left": "1px solid white"
            });
            $('.likeHeart').find('i').removeClass("am-icon-heart-o");
            $('.likeHeart').find('i').addClass("am-icon-heart");
        }
        $('.other').append($('<div class="social-share" data-initialized="true" data-url="http://liujian.cool/article/' + data.articleId  + '"  data-title="' + data.articleTitle + '">' +
            '<a href="#" class="social-share-icon icon-qq" data-am-popover="{content: \'分享至QQ好友\', trigger: \'hover focus\'}"></a>' +
            '<a href="#" class="social-share-icon icon-qzone" data-am-popover="{content: \'分享至QQ空间\', trigger: \'hover focus\'}"></a>' +
            '<a href="#" class="social-share-icon icon-wechat"></a>' +
            '<a href="#" class="social-share-icon icon-weibo" data-am-popover="{content: \'分享至微博\', trigger: \'hover focus\'}"></a>' +
            '</div>'))

        //选中所有需放大的图片加上data-src属性
        $("#wordsView img").each(function(index){
            if(!$(this).hasClass("emoji")){
                var a=$(this).attr('src');
                $(this).attr("data-src",a);

                $(this).addClass("enlargePicture");
            }
        });
        //放大图片框架
        lightGallery(document.getElementById('wordsView'));
    }

    //填充文章评论和回复
    function putInComment(data) {
        $('#comment').val('');
        var comment = $('.comment');
        var commentBottom = $('.comment-bottom');
        commentBottom.html('');
        if(data.length == 0){
            var comments = $('<div class="comments">' +
                '<span class="noComment" style="color: black">还没有评论，快来抢沙发吧！</span>' +
                '</div>');
            commentBottom.append(comments);
            comment.append(commentBottom);
        } else {
            var articleComment = $('<div class="article-comment"></div>');
            var articleCommentTop = $('<div class="article-comment-top">' +
                '<span class="article-comment-word">评论</span>' +
                '<div class="article-comment-line"></div>' +
                '</div>');
            var newComment = $('<div class="new-comment">' +
                '<i class="all-comment am-icon-ellipsis-v"></i>全部评论（<span class="commentNum">' + '' + '</span>）' +
                '</div>');
            articleComment.append(articleCommentTop);
            articleComment.append(newComment);
            var allComments = $('<div class="all-comments"></div>');
            $.each(data,function (index,obj) {
                var visitorReplies = $('<div class="visitorReplies"></div>');
                $.each(obj['replies'],function (index1,obj1) {
                    var visitorReply = $('<div id="p' + obj1['id'] + '" class="visitorReply"></div>');
                    var visitorReplyWords = $('<div class="visitorReplyWords">' +
                        '<a class="answerer">' + obj1['answerer'] + '</a>： <a class="respondent">@' + obj1['respondent'] + ' </a>' + obj1['commentContent'] +
                        '</div>');
                    var visitorReplyTime = $('<div class="visitorReplyTime">' +
                        '<span class="visitorReplyTimeTime">' + obj1['commentDate'] + '</span>' +
                        '<a>' +
                        '<i class="replyReply am-icon-comment-o">&nbsp;&nbsp;回复</i>' +
                        '</a>' +
                        '</div>');
                    visitorReply.append(visitorReplyWords);
                    visitorReply.append(visitorReplyTime);
                    visitorReply.append($('<hr data-am-widget="divider" style="" class="am-divider am-divider-dashed"/>'));
                    visitorReplies.append(visitorReply);
                });
                var subCommentList = $('<div class="sub-comment-list"></div>');
                var moreComment = $('<div class="more-comment">' +
                    '<a>' +
                    '<i class="moreComment am-icon-edit"> 添加新评论</i>' +
                    '</a>' +
                    '</div>');
                subCommentList.append(visitorReplies);
                subCommentList.append(moreComment);
                var subComment = $('<div class="sub-comment"></div>');
                if(obj['replies'].length != 0){
                    subComment.append(subCommentList);
                }
                subComment.append($('<div class="reply-sub-comment-list am-animation-slide-bottom">' +
                    '<div class="replyWord">' +
                    '<div class="replyWordBtn">' +
                    '<textarea class="replyWordTextarea" placeholder="写下你的评论..."></textarea>' +
                    '<button type="button" class="sendReplyWordBtn am-btn am-btn-success">发送</button>' +
                    '<button type="button" class="quitReplyWordBtn am-btn">取消</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>'));

                var amG = $('<div class="am-g"></div>');
                amG.append($('<div class="visitorCommentImg am-u-sm-2 am-u-lg-1">' +
                    '<img src="' + obj['avatarImgUrl'] + '">' +
                    '</div>'));
                var amUSm10 = $('<div class="am-u-sm-10 am-u-lg-11"></div>');
                var visitorInfo = $('<div class="visitorInfo">' +
                    '<span class="visitorFloor">#' + (data.length-index) + '楼</span>' +
                    '<span class="visitorName">' +
                    obj['answerer'] +
                    '</span>' +
                    '<span class="visitorPublishDate">' +
                    obj['commentDate'] +
                    '</span>' +
                    '</div>');
                var visitorSay = $('<div class="visitorSay">' +
                    obj['commentContent'] +
                    '</div>');
                var toolGroup1 = $('<div class="tool-group">' +
                    '<a>' +
                    '<i class="like am-icon-thumbs-o-up">&nbsp;&nbsp;<span>' + obj['likes'] + '</span>人赞</i>' +
                    '</a>' +
                    '<a>' +
                    '<i class="reply am-icon-comment-o">&nbsp;&nbsp;回复</i>' +
                    '</a>' +
                    '</div>');
                var toolGroup2 = $('<div class="tool-group">' +
                    '<a>' +
                    '<i class="like am-icon-thumbs-up text-success">&nbsp;&nbsp;<span>' + obj['likes'] + '</span>人赞</i>' +
                    '</a>' +
                    '<a>' +
                    '<i class="reply am-icon-comment-o">&nbsp;&nbsp;回复</i>' +
                    '</a>' +
                    '</div>');
                amUSm10.append(visitorInfo);
                amUSm10.append(visitorSay);
                if(obj['isLiked'] == 1){
                    amUSm10.append(toolGroup2);
                } else {
                    amUSm10.append(toolGroup1);
                }
                amUSm10.append(subComment);
                amG.append(amUSm10);
                var visitorComment = $('<div class="visitorComment" id="p' + obj['id'] +  '"></div>');
                visitorComment.append(amG);
                visitorComment.append($('<hr>'));
                allComments.append(visitorComment);
            });
            articleComment.append(allComments);
            commentBottom.append(articleComment);
            comment.append(commentBottom);
            //添加评论数
            $('.commentNum').html(data.length);
        }

        var reply = $('.reply');
        var quitReplyWordBtn = $('.quitReplyWordBtn');
        var moreComment = $('.moreComment');
        var replyReply = $('.replyReply');

        var respondent;
        //点击回复显示评论框
        reply.click(function () {
            var $this = $(this);
            $.ajax({
                type:'get',
                url:'/isLogin',
                dataType:'json',
                async:false,
                data:{
                },
                success:function (data) {
                    if(data['status'] == 101){
                        $.get("/toLogin",function(data,status,xhr){
                            window.location.replace("/login");
                        });
                    } else {
                        $this.parent().parent().parent().find($('.reply-sub-comment-list')).find($('.replyWordTextarea')).val('');
                        $this.parent().parent().parent().find($('.reply-sub-comment-list')).css("display","block");
                        $this.parent().parent().parent().find($('.reply-sub-comment-list')).find($('.replyWordTextarea')).focus();

                        respondent = $this.parent().parent().prev().prev().find('.visitorName').html();
                    }
                },
                error:function () {
                }
            });

        });

        //添加新评论显示评论框
        moreComment.click(function () {
            var $this = $(this);
            $.ajax({
                type:'get',
                url:'/isLogin',
                dataType:'json',
                async:false,
                data:{
                },
                success:function (data) {
                    if(data['status'] == 101){
                        $.get("/toLogin",function(data,status,xhr){
                            window.location.replace("/login");
                        });
                    }else {
                        $this.parent().parent().parent().next().find($('.replyWordTextarea')).val('');
                        $this.parent().parent().parent().next().css("display","block");
                        $this.parent().parent().parent().next().find($('.replyWordTextarea')).focus();

                        respondent = $this.parent().parent().parent().parent().parent().find('.visitorInfo').find('.visitorName').html();
                    }
                },
                error:function () {
                }
            });

        });

        //评论中的回复的回复按钮显示评论框
        replyReply.click(function () {
            var $this = $(this);
            $.ajax({
                type:'get',
                url:'/isLogin',
                dataType:'json',
                async:false,
                data:{
                },
                success:function (data) {
                    if (data['status'] == 101) {
                        $.get("/toLogin", function (data, status, xhr) {
                            window.location.replace("/login");
                        });
                    } else {
                        respondent = $this.parent().parent().prev().find($('.answerer')).html();
                        $this.parent().parent().parent().parent().parent().next().css("display","block");
                        $this.parent().parent().parent().parent().parent().next().find($('.replyWordTextarea')).val('@' + respondent + ' ');
                        $this.parent().parent().parent().parent().parent().next().find($('.replyWordTextarea')).focus();
                    }
                },
                error:function () {
                }
            });

        });

        //点击取消隐藏评论框
        quitReplyWordBtn.click(function () {
            $(this).parent().parent().find($('.replyWordTextarea')).val('');
            $(this).parent().parent().parent().css("display","none");
        });

        //发送评论中的回复
        $('.sendReplyWordBtn').click(function () {
            var $this = $(this);
            var replyContent = $this.parent().parent().find($('.replyWordTextarea')).val();
            var pId = $this.parent().parent().parent().parent().parent().parent().parent().attr("id");
            if(replyContent == ""){
                alert("我没看清你要回复啥吖！");
            } else {
                $.ajax({
                    type: 'POST',
                    url: '/publishReply',
                    dataType: 'json',
                    data: {
                        commentContent:replyContent,
                        articleId:articleId,
                        parentId:pId,
                        respondent:respondent
                    },
                    success: function (data) {
                        if(data['status'] == 101){
                            $.get("/toLogin",function(data,status,xhr){
                                window.location.replace("/login");
                            });
                        } else if (data['status'] == 103){
                            dangerNotice(data['message'] + " 发表评论失败")
                        } else if (data['status'] == 801){
                            alert("内容不能为空！");
                        } else {
                            var sub_comment = $this.parent().parent().parent().parent();
                            var visitorReply = $('<div id=p' + data['data']['id'] + ' class="visitorReply"></div>');
                            var visitorReplyWords = $('<div class="visitorReplyWords">' +
                                '<a class="answerer">' + data['data']['answerer'] + '</a>： <a class="respondent">@' + data['data']['respondent'] + ' </a>' + data['data']['commentContent'] +  '' +
                                '</div>');
                            var visitorReplyTime = $('<div class="visitorReplyTime">' +
                                '<span class="visitorReplyTimeTime">' + data['data']['commentDate'] + '</span>' +
                                '<a>' +
                                '<i class="replyReply am-icon-comment-o">&nbsp;&nbsp;回复</i>' +
                                '</a>' +
                                '</div>');
                            visitorReply.append(visitorReplyWords);
                            visitorReply.append(visitorReplyTime);
                            visitorReply.append('<hr data-am-widget="divider" style="" class="am-divider am-divider-dashed" />');

                            if(sub_comment.find('.sub-comment-list').length > 0){
                                sub_comment.find('.visitorReplies').append(visitorReply);
                            }else {
                                var visitorReplies = $('<div class="visitorReplies"></div>');
                                var sub_comment_list = $('<div class="sub-comment-list"></div>');
                                visitorReplies.append(visitorReply);
                                sub_comment_list.append(visitorReplies);
                                sub_comment_list.append($('<div class="more-comment">' +
                                    ' <a>' +
                                    '<i class="moreComment am-icon-edit"> 添加新评论</i>' +
                                    '</a>' +
                                    '</div>'));
                                sub_comment.prepend(sub_comment_list);
                            }

                            //给新加入的评论中的回复和下面的添加新评论添加点击事件
                            $this.parent().parent().parent().parent().find('.visitorReplies>div:last-child').find('.replyReply ').click(function () {
                                respondent = $(this).parent().parent().prev().find($('.answerer')).html();
                                $(this).parent().parent().parent().parent().parent().next().css("display","block");
                                $(this).parent().parent().parent().parent().parent().next().find($('.replyWordTextarea')).val('@' + respondent + ' ');
                                $(this).parent().parent().parent().parent().parent().next().find($('.replyWordTextarea')).focus();
                            });
                            $this.parent().parent().parent().parent().find('.sub-comment-list').find('.more-comment').find('.moreComment').click(function () {
                                $(this).parent().parent().parent().next().find($('.replyWordTextarea')).val('');
                                $(this).parent().parent().parent().next().css("display","block");

                                respondent = $(this).parent().parent().parent().parent().parent().find('.visitorInfo').find('.visitorName').html();
                            });
                            $this.parent().find($('.replyWordTextarea')).val('');
                            $this.parent().parent().parent().css("display","none");
                        }
                    },
                    error: function () {
                        alert("回复失败！");
                    }
                });
            }

        });

        //点击评论中的点赞
        $('.like').click(function () {
            var $this = $(this);
            var respondentId = $this.parent().parent().parent().parent().parent().attr("id");
            $.ajax({
                type:'get',
                url:'/addCommentLike',
                dataType:'json',
                data:{
                    articleId : articleId,
                    respondentId : respondentId
                },
                success:function (data) {
                    if(data['status'] == 101){
                        $.get("/toLogin",function(data,status,xhr){
                            window.location.replace("/login");
                        });
                    } else if (data['status'] == 103){
                        dangerNotice(data['message'] + " 点赞失败")
                    } else if(data['status'] == 802){
                        //已经点过赞了，啥都不干
                    } else {
                        $this.find('span').html(data['data']);
                        $.tipsBox({
                            obj: $this,
                            str: "+1",
                            callback: function () {
                            }
                        });
                        niceIn($this);
                        $this.removeClass("fa-thumbs-o-up");
                        $this.addClass("fa-thumbs-up");
                        $this.addClass("text-danger");
                    }
                },
                error:function () {
                    alert("点赞失败！")
                }
            });
        });
    }

    $.ajax({
        type: 'HEAD', // 获取头信息，type=HEAD即可
        url : window.location.href,
        async:false,
        success:function (data, status, xhr) {
            articleId = xhr.getResponseHeader("articleId");
        }
    });

    //通过文章id请求文章信息
    $.ajax({
        type:'post',
        url:'/getArticleByArticleId',
        dataType:'json',
        async:false,
        data:{
            articleId : articleId,
        },
        success:function (data) {
            if(data['status'] == 0){
                putInArticle(data['data']);

                //通过文章id和原作者请求评论信息
                $.ajax({
                    type:'post',
                    url:'/getAllComment',
                    dataType:'json',
                    data:{
                        articleId : articleId,
                    },
                    success:function (data) {
                        if(data['status'] == 103){
                            dangerNotice(data['message'] + " 获得评论信息失败");
                        } else {
                            putInComment(data['data']);
                        }
                    },
                    error:function () {
                    }
                });
            } else if (data['status'] == 103){
                dangerNotice(data['message'] + " 获得文章失败");
            } else {
                $('.content').html('');
                var error = $('<div class="article"><div class="zhy-article-top"><div class="error">' +
                    '<img src="http://images.liujian.cool/img/register_success.jpg">' +
                    '<p>没有找到这篇文章哦</p>' +
                    '<p>可能不小心被博主手残删掉了吧</p>' +
                    '<div class="row">' +
                    '<a href="/">返回首页</a>' +
                    '</div>' +
                    '</div></div></div>');
                $('.content').append(error);
            }
        },
        error:function () {

        }
    });

    // 文章点赞
    (function ($) {
        $.extend({
            tipsBox: function (options) {
                options = $.extend({
                    obj: null,  //jq对象，要在那个html标签上显示
                    str: "+1",  //字符串，要显示的内容;也可以传一段html，如: "<b style='font-family:Microsoft YaHei;'>+1</b>"
                    startSize: "12px",  //动画开始的文字大小
                    endSize: "30px",    //动画结束的文字大小
                    interval: 600,  //动画时间间隔
                    color: "red",    //文字颜色
                    callback: function () {
                    }    //回调函数
                }, options);
                $("body").append("<span class='num'>" + options.str + "</span>");
                var box = $(".num");
                var left = options.obj.offset().left + options.obj.width() / 2;
                var top = options.obj.offset().top - options.obj.height();
                box.css({
                    "position": "absolute",
                    "left": left + "px",
                    "top": top + "px",
                    "z-index": 9999,
                    "font-size": options.startSize,
                    "line-height": options.endSize,
                    "color": options.color
                });
                box.animate({
                    "font-size": options.endSize,
                    "opacity": "0",
                    "top": top - parseInt(options.endSize) + "px"
                }, options.interval, function () {
                    box.remove();
                    options.callback();
                });
            }
        });
    })(jQuery);

    //点赞喜欢效果
    function niceIn(prop) {
        prop.find('i').addClass('niceIn');
        setTimeout(function () {
            prop.find('i').removeClass('niceIn');
        }, 1000);
    }


    //喜欢按钮
    $(".likeBtn").click(function () {
        var $this = $(this);
        $.ajax({
            type:'get',
            url:'/addArticleLike',
            dataType:'json',
            data:{
                articleId : articleId
            },
            success:function (data) {
                if(data['status'] == 101){
                    $.get("/toLogin",function(data,status,xhr){
                        window.location.replace("/login");
                    });
                } else if(data['status'] == 103){
                    dangerNotice(data['message'] + " 点赞失败");
                } else if(data['status'] == 202){
                    //文章已经点过赞了，啥都不干
                } else {
                    $('.likesNum').find('span').html(data['data']);
                    $('.likeBtn').css({
                        "background-color": "#EA6F5A",
                        "color":"white"
                    });
                    $('.likesNum').css({
                        "border-left": "1px solid white"
                    });
                    $('.likeHeart').find('i').removeClass("am-icon-heart-o");
                    $('.likeHeart').find('i').addClass("am-icon-heart");
                    $.tipsBox({
                        obj: $this,
                        str: "+1个喜欢"
                    });
                    niceIn($this);
                }
            },
            error:function () {
                alert("点赞失败！")
            }
        });
    });

    /**
     * 自定义web弹窗/层：简易风格的msg与可拖放的dialog
     * 依赖jquery
     */
    var tip = {

        /**
         * 初始化
         */
        init: function () {
            var titleDiv = null;//标题元素
            var dialogDiv = null;//窗口元素
            var titleDown = false;//是否在标题元素按下鼠标
            var resizeDown = false;//是否在缩放元素按下鼠标
            var offset = {x: 0, y: 0};//鼠标按下时的坐标系/计算后的坐标
            /*
                使用 on() 方法添加的事件处理程序适用于当前及未来的元素（比如由脚本创建的新元素）。
                问题：事件绑定在div上出现div移动速度跟不上鼠标速度，导致鼠标移动太快时会脱离div，从而无法触发事件。
                解决：把事件绑定在document文档上，无论鼠标在怎么移动，始终是在文档范围之内。
            */
            //鼠标在标题元素按下
            $(document).on("mousedown", ".tip-title", function (e) {
                var event1 = e || window.event;
                titleDiv = $(this);
                dialogDiv = titleDiv.parent();
                titleDown = true;
                offset.x = e.clientX - parseFloat(dialogDiv.css("left"));
                offset.y = e.clientY - parseFloat(dialogDiv.css("top"));
            });
            //鼠标移动
            $(document).on("mousemove", function (e) {
                var event2 = e || window.event;
                var eveX = event2.clientX;             // 获取鼠标相对于浏览器x轴的位置
                var eveY = event2.clientY;             // 获取鼠标相对于浏览器Y轴的位置
                // var height = document.body.clientHeight;//表示HTML文档所在窗口的当前高度；
                // var width = document.body.clientWidth;//表示HTML文档所在窗口的当前宽度；
                var height = window.innerHeight;//浏览器窗口的内部高度；
                var width = window.innerWidth;//浏览器窗口的内部宽度；

                //在标题元素按下
                if (titleDown) {

                    //处理滚动条
                    if (tip.hasXScrollbar()) {
                        height = height - tip.getScrollbarWidth();
                    }
                    if (tip.hasYScrollbar()) {
                        width = width - tip.getScrollbarWidth();
                    }

                    //上边
                    var top = (eveY - offset.y);
                    if (top <= 0) {
                        top = 0;
                    }
                    if (top >= (height - dialogDiv.height())) {
                        top = height - dialogDiv.height() - 5;
                    }

                    //左边
                    var left = (eveX - offset.x);
                    if (left <= 0) {
                        left = 0;
                    }
                    if (left >= (width - dialogDiv.width())) {
                        left = width - dialogDiv.width() - 5;
                    }
                    dialogDiv.css({
                        "top": top + "px",
                        "left": left + "px"
                    });
                }

                //在缩放元素按下
                if (resizeDown) {
                    //避免undefined.XXX报错
                    dialogDiv[0].resize = dialogDiv[0].resize ? dialogDiv[0].resize : {};
                    var newWidth = (dialogDiv[0].resize.width + (eveX - offset.x));
                    if (dialogDiv[0].resize.initWidth >= newWidth) {
                        newWidth = dialogDiv[0].resize.initWidth;
                    }
                    var newHeight = (dialogDiv[0].resize.height + (eveY - offset.y));
                    if (dialogDiv[0].resize.initHeight >= newHeight) {
                        newHeight = dialogDiv[0].resize.initHeight;
                    }

                    dialogDiv.css("width", newWidth + "px");
                    dialogDiv.find(".tip-content").css("height", newHeight + "px");
                }
            });
            //鼠标弹起
            $(document).on("mouseup", function (e) {
                //清空对象
                titleDown = false;
                resizeDown = false;
                titleDiv = null;
                dialogDiv = null;
                offset = {x: 0, y: 0};
            });
            //阻止按钮事件冒泡
            $(document).on("mousedown", ".tip-title-min,.tip-title-max,.tip-title-close", function (e) {
                e.stopPropagation();//阻止事件冒泡
            });
            //最小化
            $(document).on("click", ".tip-title-min", function (e) {
                // var height = document.body.clientHeight;//表示HTML文档所在窗口的当前高度；
                // var width = document.body.clientWidth;//表示HTML文档所在窗口的当前宽度；
                var height = window.innerHeight;//浏览器窗口的内部高度；
                var width = window.innerWidth;//浏览器窗口的内部宽度；
                var $parent = $(this).parents(".tip-dialog");
                //显示浏览器滚动条
                document.body.parentNode.style.overflowY = "auto";

                //当前是否为最大化
                if ($parent[0].isMax) {
                    $parent[0].isMax = false;
                    $parent.css({
                        "top": $parent[0].topMin,
                        "left": $parent[0].leftMin,
                        "height": $parent[0].heightMin,
                        "width": $parent[0].widthMin
                    });
                }
                //当前是否为最小化
                if (!$parent[0].isMin) {
                    $parent[0].isMin = true;
                    $parent[0].bottomMin = $parent.css("bottom");
                    $parent[0].leftMin = $parent.css("left");
                    $parent[0].heightMin = $parent.css("height");
                    $parent[0].widthMin = $parent.css("width");
                    $parent.css({
                        "top": "",
                        "bottom": "5px",
                        "left": 0,
                        "height": "30px",
                        "width": "95px"
                    });
                    $parent.find(".tip-title-text").css("display", "none");
                    $parent.find(".tip-content").css("display", "none");
                } else {
                    $parent[0].isMin = false;
                    $parent.css({
                        "top": $parent[0].topMin,
                        "bottom": $parent[0].bottomMin,
                        "left": $parent[0].leftMin,
                        "height": $parent[0].heightMin,
                        "width": $parent[0].widthMin
                    });
                    $parent.find(".tip-title-text").css("display", "block");
                    $parent.find(".tip-content").css("display", "block");
                }
            });
            //最大化
            $(document).on("click", ".tip-title-max", function (e) {
                // var height = document.body.clientHeight;//表示HTML文档所在窗口的当前高度；
                // var width = document.body.clientWidth;//表示HTML文档所在窗口的当前宽度；
                var height = window.innerHeight;//浏览器窗口的内部高度；
                var width = window.innerWidth;//浏览器窗口的内部宽度；
                var $parent = $(this).parents(".tip-dialog");
                //当前是否为最小化
                if ($parent[0].isMin) {
                    $parent[0].isMin = false;
                    $parent.css({
                        "top": $parent[0].topMin,
                        "bottom": $parent[0].bottomMin,
                        "left": $parent[0].leftMin,
                        "height": $parent[0].heightMin,
                        "width": $parent[0].widthMin
                    });
                    $parent.find(".tip-title h2").css("display", "block");
                }
                //当前是否为最大化
                if (!$parent[0].isMax) {
                    //隐藏浏览器滚动条
                    document.body.parentNode.style.overflowY = "hidden";
                    $parent[0].isMax = true;
                    $parent[0].topMin = $parent.css("top");
                    $parent[0].leftMin = $parent.css("left");
                    $parent[0].heightMin = $parent.css("height");
                    $parent[0].widthMin = $parent.css("width");
                    $parent.css({
                        "top": 0,
                        "left": 0,
                        "height": height - 5 + "px",
                        "width": width - 5 + "px"
                    });
                } else {
                    //显示浏览器滚动条
                    document.body.parentNode.style.overflowY = "auto";
                    $parent[0].isMax = false;
                    $parent.css({
                        "top": $parent[0].topMin,
                        "left": $parent[0].leftMin,
                        "height": $parent[0].heightMin,
                        "width": $parent[0].widthMin
                    });
                }
            });
            //缩放
            $(document).on("mousedown", ".tip-resize", function (e) {
                var event1 = e || window.event;
                dialogDiv = $(this).parent();
                resizeDown = true;
                offset.x = e.clientX;
                offset.y = e.clientY;
                //点击时的宽高
                dialogDiv[0].resize.width = dialogDiv.width();
                dialogDiv[0].resize.height = dialogDiv.find(".tip-content").height();
            });
            //关闭
            $(document).on("click", ".tip-title-close", function (e) {
                $(this).parents(".tip-dialog").parent().remove();
                //显示浏览器滚动条
                document.body.parentNode.style.overflowY = "auto";
            });
            //点击窗口优先显示
            $(document).on("click", ".tip-dialog", function (e) {
                $(".tip-dialog").css("z-index","9999");
                $(this).css("z-index","10000");
            });
        },

        /**
         * 是否存在X轴方向滚动条
         */
        hasXScrollbar: function () {
            return document.body.scrollWidth > (window.innerWidth || document.documentElement.clientWidth);
        },

        /**
         * 是否存在Y轴方向滚动条
         */
        hasYScrollbar: function () {
            return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);
        },

        /**
         * 计算滚动条的宽度
         */
        getScrollbarWidth: function () {
            /*
                思路：生成一个带滚动条的div，分析得到滚动条长度，然后过河拆桥
             */
            var scrollDiv = document.createElement("div");
            scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
            document.body.appendChild(scrollDiv);
            var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
            document.body.removeChild(scrollDiv);

            return scrollbarWidth;

        },

        /**
         * tip提示
         * tip.msg("哈哈哈哈哈");
         * tip.msg({text:"哈哈哈哈哈",time:5000});
         */
        msg: function (setting) {
            var time = setting.time || 2000; // 显示时间（毫秒） 默认延迟2秒关闭
            var text = setting.text || setting; // 文本内容

            //组装HTML
            var tip = "<div class='tip tip-msg'>"
                + text +
                "</div>";

            //删除旧tip
            $(".tip-msg").remove();

            //添加到body
            $("body").append(tip);

            //获取jq对象
            var $tip = $(".tip-msg");

            //动画过渡
            $tip.animate({opacity: 1}, 500);

            //计算位置浏览器窗口上下、左右居中
            // var height = document.body.clientHeight;//表示HTML文档所在窗口的当前高度；
            var width = document.body.clientWidth;//表示HTML文档所在窗口的当前宽度；
            var height = window.innerHeight;//浏览器窗口的内部高度；
            // var width = window.innerWidth;//浏览器窗口的内部宽度；
            width = ((width / 2) - ($tip.css("width").replace("px", "") / 2)) / width;
            height = ((height / 2) - ($tip.css("height").replace("px", "") / 2)) / height;
            $tip.css({
                "top": (height * 100) + "%",
                "left": (width * 100) + "%"
            });

            //延迟删除
            setTimeout(function () {
                //动画过渡
                $tip.animate({opacity: 0}, 500, function () {
                    $tip.remove();
                });
            }, time);
        },

        /**
         可拖放窗口
         tip.dialog({title:"测试弹窗标题",content:"测试弹窗内容"});
         tip.dialog({
            title:"测试弹窗标题",
            class:"myClassName",
            content:"<h1>测试弹窗内容</h1>",
            offset: ['100px', '50px'],
            area:["200px","100px"],
            shade:0,
            callBack:function(){
                console.log('弹窗已加载完毕');
            },
            closeCallBack:function(){
                console.log('你点击了关闭按钮');
            }
         });
         */
        dialog: function (setting) {
            var title = setting.title || "这里是标题"; // 标题
            var clazz = setting.class || ""; // class
            var content = setting.content || "这里是内容"; // 内容
            var area = setting.area; // 宽高
            var offset = setting.offset || "auto"; // 位置 上、左
            var shade = setting.shade !== undefined ? setting.shade : 0.7;//遮阴 为0时无遮阴对象

            //组装HTML
            var tip = "<div>\n" +
                "    <!-- 遮阴层 -->\n" +
                "    <div class=\"tip tip-shade\"></div>\n" +
                "    <!-- 主体 -->\n" +
                "    <div class=\"tip tip-dialog " + clazz + "\">\n" +
                "        <!-- 标题 -->\n" +
                "        <div class=\"tip tip-title\">\n" +
                "            <h2 class=\"tip tip-title-text\"></h2>\n" +
                "            <div class=\"tip tip-title-btn\">\n" +
                "                <button class=\"tip tip-title-min\" title=\"最小化\">--</button>\n" +
                "                <button class=\"tip tip-title-max\" title=\"最大化\">O</button>\n" +
                "                <button class=\"tip tip-title-close\" title=\"关闭\">X</button>\n" +
                "            </div>\n" +
                "        </div>\n" +
                "        <!-- 窗口内容 -->\n" +
                "        <div class=\"tip tip-content\"></div>\n" +
                "        <!-- 右下角改变窗口大小 -->\n" +
                "        <div class=\"tip tip-resize\"></div>\n" +
                "    </div>\n" +
                "</div>";

            var $tip = $(tip);

            //添加到body
            $("body").append($tip);

            //设置遮阴
            $tip.find(".tip-shade").css("opacity", shade);
            if (shade === 0) {
                $tip.find(".tip-shade").css({
                    "width": "0",
                    "height": "0"
                });
            }

            //获取dialog对象
            $tip = $tip.find(".tip-dialog");

            //标题
            $tip.find(".tip-title-text").html(title);

            //内容
            $tip.find(".tip-content").append(content);

            //设置初始宽高
            if (area) {
                $tip.css({
                    "width": area[0],
                });
                $tip.find(".tip-content").css({
                    "height": area[1]
                });
            }

            //动画过渡
            $tip.animate({opacity: 1}, 500);

            //计算位置浏览器窗口上下、左右居中
            if (offset === "auto") {
                // var height = document.body.clientHeight;//表示HTML文档所在窗口的当前高度；
                var width = document.body.clientWidth;//表示HTML文档所在窗口的当前宽度；
                var height = window.innerHeight;//浏览器窗口的内部高度；
                // var width = window.innerWidth;//浏览器窗口的内部宽度；
                width = ((width / 2) - ($tip.css("width").replace("px", "") / 2)) / width;
                height = ((height / 2) - ($tip.css("height").replace("px", "") / 2)) / height;
                $tip.css({
                    "top": (height * 100) + "%",
                    "left": (width * 100) + "%"
                });
            } else if (Array.isArray(offset)) {
                $tip.css({
                    "top": offset[0],
                    "left": offset[1]
                });
            }

            //初始值宽高
            //避免undefined.XXX报错
            $tip[0].resize = $tip[0].resize ? $tip[0].resize : {};
            $tip[0].resize.initWidth = $tip.width();
            $tip[0].resize.initHeight = $tip.find(".tip-content").height();

            //绑定关闭按钮回调
            if(setting.closeCallBack){
                $(".tip-title-close").click(function (e) {
                    setting.closeCallBack();
                });
            }

            //执行回调
            setting.callBack && setting.callBack();
        },

        //生成目录弹窗，锚点信息数组
        navCategoryAnchor : [],

        /**
         * 生成目录弹窗，支持到二级目录
         * {
         *     list1:$('#cnblogs_post_body h2'),//目录的一级标题集合（如何找到一级目录）
         *     list2:"$list1.nextAll('h3')",//目录的二级标题集合，（如何从每个一级目录节点$list1下面找到二级目录）
         *     offset: ['40%', '10%'],//弹窗位置
         *    area:["156px","250px"]//弹窗大小
         * }
         */
        generateContentList : function(setting){
            setting.offset ? setting.offset : setting.offset = ['40%', '10%'];//弹窗位置
            setting.area ? setting.area : setting.area = ["156px","250px"];//弹窗大小

            //点击章节，滚动带动画效果
            $("body").on("click","#navCategory a",function() {
                $("html, body").animate({
                    scrollTop: $($(this).attr("href")).offset().top - 100 + "px"
                }, 800);
                return false;
            });

            //监听鼠标滚动事件
            window.addEventListener('scroll', function () {
                //无需频繁的进行遍历判断
                if(new Date().getTime() % 2 == 0){
                    var scrolled = document.documentElement.scrollTop || document.body.scrollTop
                    for(var i = 0;i<tip.navCategoryAnchor.length;i++){
                        if((i==0) ?
                            (tip.navCategoryAnchor[i+1].offset >= scrolled) :
                            (tip.navCategoryAnchor[i].offset <= scrolled && ((i == tip.navCategoryAnchor.length - 1) ? true : tip.navCategoryAnchor[i + 1].offset >= scrolled))){

                            $("#"+tip.navCategoryAnchor[i].a).css("color","#519cea");
                        }else{
                            $("#"+tip.navCategoryAnchor[i].a).css("color","");
                        }
                    }
                }
            });

            //生成目录索引列表
            var h2_list = setting.list1;//目录的一级标题，找到所有h2

            if(h2_list.length>0){
                //返回顶部，元素之前追加
                $("body").prepend('<a name="_labelTop"></a>');

                var content    = '<div id="navCategory">';
                content    += '<ul>';
                //一级标题
                for(var i =0;i<h2_list.length;i++){
                    var h2_id = "_label_h2" + i;
                    var h2_text = $(h2_list[i]).text();
                    //去左右空格;
                    h2_text = h2_text.replace(/(^\s*)|(\s*$)/g, "");
                    $(h2_list[i]).attr("id",h2_id);
                    //锚点位置
                    tip.navCategoryAnchor.push({a:h2_id+"_a",offset:$(h2_list[i]).offset().top});
                    content += '<li><a id="'+h2_id+'_a" href="#' + h2_id + '">' + h2_text + '</a></li>';
                    //目录的二级标题，找到所有的h3
                    var h3_list = eval(setting.list2.replace("$list1","$(h2_list[i])"));

                    for(var j=0; j<h3_list.length; j++){
                        var tmp = $(h3_list[j]).prevAll('h2').first();
                        if(!tmp.is(h2_list[i])){
                            break;
                        }
                        var h3_id = "_label_h3_" + i + "_" + j;
                        var h3_text = $(h3_list[j]).text();
                        //去左右空格;
                        h3_text = h3_text .replace(/(^\s*)|(\s*$)/g, "");
                        $(h3_list[j]).attr("id",h3_id);
                        //锚点位置
                        tip.navCategoryAnchor.push({a:h3_id+"_a",offset:$(h3_list[j]).offset().top});
                        content += '<li style="padding-left: 25px"><a id="'+h3_id+'_a" href="#' + h3_id + '">' + h3_text + '</a></li>';
                    }
                }
                content += '</ul>';
                content += '</div>';

                //生成目录拖拽弹窗
                tip.dialog({title:"目录",content:content,offset: setting.offset,area:setting.area,shade:0});
            }
        }
    };

    $(function(){
        //初始化
        tip.init();
        //生成目录弹窗
        tip.generateContentList({
            list1:$('#wordsView h2'),//目录的一级标题集合（如何找到一级目录）
            list2:"$list1.nextAll('h3')",//目录的二级标题集合，（如何从每个一级目录节点$list1下面找到二级目录）
            offset: ['25%', '3%'],//弹窗位置
            area:["200px","300px"]//弹窗大小
        });
    });
