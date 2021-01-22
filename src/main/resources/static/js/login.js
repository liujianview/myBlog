
    //隐藏错误提示
    $('.icons').hide();
    $('.modal_icons').hide();

    //登录表单
    var email = $("#email");
    var email_null = $("#email_null");
    var email_error = $("#email_error");
    //输入框失去焦点
    email.blur(function () {
        var email_len = email.val().length;
        if(email_len === 0){
            email_null.show();
        }
        if(email_len !== 0){
            var pattren = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            var email_value = email.val();
            if(!pattren.test(email_value)){
                email_error.show();
            }
        }
    });
    //输入框获得焦点
    var login_error = $('.login_error');
    email.focus(function () {
        email_null.hide();
        email_error.hide();
        login_error.css("visibility","hidden");
    });
    //登录表单提交
    var loginFormSubmit = $("#loginFormSubmit");
    var password = $("#password");
    var password_null = $("#password_null");
    loginFormSubmit.click(function () {
        var password_len = password.val().length;
        var email_len = email.val().length;
        var email_value = email.val();
        var pattren1 = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

        var isemail = checkemail(email_value);
        if(!isemail){
            alert("邮箱输入有误");
            return false;
        }
        console.log(isemail);
        if(password_len !== 0 && email_len !== 0 && pattren1.test(email_value)){
            return true;
        } else {
            if(email_len === 0){
                email_null.show();
            }
            if(!pattren1.test(email_value) && email_len !== 0){
                email_error.show();
            }
            if(password_len === 0){
                password_null.show();
            }
            return false;
        }
    });
    password.focus(function () {
        password_null.hide();
        login_error.css("visibility","hidden");
    });

    //模态框
    var msg_btn=$("#msg_btn");
    var modal_email = $("#modal_email");
    var modal_email_null = $("#modal_email_null");
    var modal_email_error = $("#modal_email_error");
    modal_email.addClass("email_error");
    //模态框中输入邮箱号框失去焦点
    modal_email.blur(function () {
        var modal_email_len = modal_email.val().length;
        var modal_email_value = modal_email.val();
        if(modal_email_len === 0){
            modal_email_null.show();
            modal_email.removeClass("email_success");
            modal_email.addClass("email_error");
        }
        if(modal_email_len !== 0){
            var pattren1 = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if(!pattren1.test(modal_email_value)){
                modal_email_error.show();
                modal_email.removeClass("email_success");
                modal_email.addClass("email_error");
            }
            if(pattren1.test(modal_email_value)){
                modal_email.removeClass("email_error");
                modal_email.addClass("email_success");
            }
        }
    });
    //模态框中输入邮箱号框获得焦点
    modal_email.focus(function () {
        modal_email_error.hide();
        modal_email_null.hide();
        $('.emailNotExitSpan').hide();
    });
    // 定义发送时间间隔(s)
    var my_interval;
    my_interval = 60;
    var timeLeft = my_interval;
    //重新发送计时函数
    var timeCount = function() {
        window.setTimeout(function() {
            if(timeLeft > 0) {
                timeLeft -= 1;
                msg_btn.html(timeLeft + "秒重新发送");
                timeCount();
            } else {
                msg_btn.html("重新发送");
                timeLeft=60;
                $("#msg_btn").attr('disabled',false);
            }
        }, 1000);
    };
    msg_btn.click(function () {
        msg_btn.attr('disabled',true);
        if(modal_email.hasClass("email_success")){
            $.ajax({
                type:'post',
                url:'/getCode',
                dataType:'json',
                data:{
                    "email":modal_email.val()
                },
                success:function (data) {
                    if(parseInt(data['status']) == 0) {
                        alert("验证码发送成功");
                        timeCount();
                    } else {
                        alert("验证码发送异常");
                    }
                },
                error:function () {

                }
            })
        }
        else {
            alert("请正确填写邮箱号");
            msg_btn.attr('disabled',false);
        }
    });

    //判断确认密码与新密码的值是否相等
    var new_password = $("#new_password");
    var check_password = $("#check_password");
    var modal_check_password_error = $("#modal_check_password_error");
    var change_password_btn = $("#change_password_btn");
    change_password_btn.addClass("no_submit");
    change_password_btn.addClass("password_error");
    check_password.blur(function () {
        var new_password_value = new_password.val();
        var check_password_value = check_password.val();
        if(new_password_value !== check_password_value){
            modal_check_password_error.show();
            change_password_btn.removeClass("password_right");
            change_password_btn.addClass("password_error");
        }
        if(new_password_value === check_password_value){
            modal_check_password_error.hide();
            change_password_btn.removeClass("password_error");
            change_password_btn.addClass("password_right");
        }
    });

    //模态框表单提交
    var auth_code = $("#auth_code");
    var auth_code_null = $("#auth_code_null");
    var new_password_null = $("#new_password_null");
    var check_password_null = $("#check_password_null");
    var auth_code_error = $('#auth_code_error');
    change_password_btn.click(function () {
        var modal_email_len = modal_email.val().length;
        var auth_code_len = auth_code.val().length;
        var new_password_len = new_password.val().length;
        var check_password_len = check_password.val().length;
        //点击确认修改时再次检测两次密码是否一致
        var new_password_value = new_password.val();
        var check_password_value = check_password.val();
        if(new_password_value !== check_password_value){
            modal_check_password_error.show();
            change_password_btn.removeClass("password_right");
            change_password_btn.addClass("password_error");
        }
        if(new_password_value === check_password_value){
            modal_check_password_error.hide();
            change_password_btn.removeClass("password_error");
            change_password_btn.addClass("password_right");
        }

        if(modal_email_len !== 0 && auth_code_len !== 0 && new_password_len !== 0 && check_password_len !== 0){
            change_password_btn.removeClass("no_submit");
            change_password_btn.addClass("yes_submit");
        }
        else {
            if(modal_email_len === 0){
                modal_email_null.show();
                change_password_btn.removeClass("yes_submit");
                change_password_btn.addClass("no_submit");
            }
            if(auth_code_len === 0){
                auth_code_null.show();
                change_password_btn.removeClass("yes_submit");
                change_password_btn.addClass("no_submit");
            }
            if(new_password_len === 0){
                new_password_null.show();
                change_password_btn.removeClass("yes_submit");
                change_password_btn.addClass("no_submit");
            }
            if(check_password_len === 0){
                check_password_null.show();
                change_password_btn.removeClass("yes_submit");
                change_password_btn.addClass("no_submit");
            }
        }
    });
    auth_code.focus(function () {
        auth_code_null.hide();
        auth_code_error.hide();
    });
    new_password.focus(function () {
        new_password_null.hide();
    });
    check_password.focus(function () {
        check_password_null.hide();
        modal_check_password_error.hide();
    });

    change_password_btn.click(function () {
        var modal_email_value = modal_email.val();
        var modal_auth_code_value = auth_code.val();
        var modal_new_password_value = new_password.val();
        if(change_password_btn.hasClass("yes_submit") && change_password_btn.hasClass("password_right") && modal_email.hasClass("email_success")){
            $.ajax({
                type:'post',
                url:'/changePassword',
                dataType:'json',
                data:{
                    email:modal_email_value,
                    authCode:modal_auth_code_value,
                    newPassword:modal_new_password_value
                },
                success:function (data) {
                    if(data['status'] == 902){
                        auth_code_error.show();
                    }else if (data['status'] == 506){
                        $('.emailNotExitSpan').show();
                    }else if (data['status'] == 103){
                        alert(data['message'] + " 密码修改失败")
                    }else if(data['status'] == 904){
                        alert("邮箱不正确，请重新输入");
                    }else {
                        alert("密码修改成功，快去登录吧！");
                        window.location.reload();
                    }
                },
                error:function () {
                    alert("修改密码失败");
                }
            })
        }
    });

    function checkemail(email){
        if(!(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email))){
            return false;
        }
        return true;
    }

    //关闭模态框时清空其中的值
    var change_password_cancel_btn = $("#change_password_cancel_btn");
    change_password_cancel_btn.click(function () {
        var modal_value = $(".modal_value");
        var modal_icons = $(".modal_icons");
        modal_value.val("");
        modal_icons.hide();
    });

