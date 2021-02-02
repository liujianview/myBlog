
    //隐藏错误提示框
    $(".icons").css("display","none");
    $(".input_warn").css("display","none");
    $('#email').val("");
    $('#auth_code').val("");
    $('#username').val("");
    $('#password').val("");

    var email = $("#email");
    var email_null = $("#email_null");
    var email_error = $("#email_error");
    var registerFormBtn = $("#registerFormBtn");

    var email_warn = $("#email_warn");
    var email_warn1 = $("#email_warn1");
    var auth_code_warn = $("#auth_code_warn");
    var username_warn = $('#username_warn');
    var username_warn1 = $('#username_warn1');

    registerFormBtn.addClass("no_submit");
    email.addClass("email_error");
    //邮箱号输入框失去焦点
    email.blur(function () {
        var email_value = email.val();
        var pattren = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        var email_len = email_value.length;
        if(email_len === 0){
            email_null.css("display","block");
            email.removeClass("email_success");
            email.addClass("email_error");
        }
        if(email_len !== 0){
            if(!pattren.test(email_value)){
                email_error.css("display","block");
                email.removeClass("email_success");
                email.addClass("email_error");
            }
            if(pattren.test(email_value)){
                email.removeClass("email_error");
                email.addClass("email_success");
            }
        }
    });
    //获得焦点
    email.focus(function () {
        email_error.css("display","none");
        email_null.css("display","none");
        email_warn.css("display","none");
        email_warn1.css("display","none");
    });

    $('#username').focus(function () {
        username_warn.css("display","none");
        username_warn1.css("display","none");
    });

    // 定义发送时间间隔(s)
    var msg_btn = $("#msg_btn");
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
                msg_btn.attr('disabled',false);
            }
        }, 1000);
    };
    //获取验证码
    msg_btn.click(function () {
        msg_btn.attr('disabled',true);
        if(email.hasClass("email_success")){
            $.ajax({
                type:'post',
                url:'/getCode',
                dataType:'json',
                data:{
                    "email":email.val()
                    /* sign:"register"*/
                },
                success:function (data) {
                    if(parseInt(data['status']) == 0){
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

    //注册表单判断
    var auth_code = $("#auth_code");
    var username = $("#username");
    var password = $("#password");
    var auth_code_null = $("#auth_code_null");
    var username_null = $("#username_null");
    var password_null = $("#password_null");
    var gender_null = $("#gender_null");
    var auth_code_error = $("#auth_code_error");

    registerFormBtn.click(function (){
        var email_value = email.val().length;
        var auth_code_value = auth_code.val().length;
        var username_value = username.val().length;
        var password_value = password.val().length;
        var radio_input = $(".radio_input input");
        if (email_value !== 0 && auth_code_value !== 0 && username_value !== 0 && password_value !== 0 && (radio_input[0].checked || radio_input[1].checked)) {
            registerFormBtn.removeClass("no_submit");
            registerFormBtn.addClass("yes_submit");
        }
        else {
            if (email_value === 0) {
                email_null.css("display","block");
                registerFormBtn.removeClass("yes_submit");
                registerFormBtn.addClass("no_submit");
            }
            if (auth_code_value === 0) {
                auth_code_null.css("display","block");
                registerFormBtn.removeClass("yes_submit");
                registerFormBtn.addClass("no_submit");
            }
            if (username_value === 0) {
                username_null.css("display","block");
                registerFormBtn.removeClass("yes_submit");
                registerFormBtn.addClass("no_submit");
            }
            if (password_value === 0) {
                password_null.css("display","block");
                registerFormBtn.removeClass("yes_submit");
                registerFormBtn.addClass("no_submit");
            }
            if (!(radio_input[0].checked || radio_input[1].checked)) {
                gender_null.css("display","inline");
                registerFormBtn.removeClass("yes_submit");
                registerFormBtn.addClass("no_submit");
            }
        }
    });

    auth_code.focus(function () {
        auth_code_null.css("display","none");
        auth_code_error.css("display","none");
        auth_code_warn.css("display","none");
    });
    username.focus(function () {
        username_null.css("display","none");
    });
    password.focus(function () {
        password_null.css("display","none");
    });
    $(".radio_input input").focus(function () {
        gender_null.css("display","none");
    });

    var gender_value = "";
    var register_clear = $("#register_clear");
    var register_big = $("#register_big");
    // 注册成功显示
    function putIn() {
        register_clear.html('');
        var sec = $('<div class="register_success"></div>');
        var register_success_img = $('<div class="register_success_img">\n' +
            '            <img src="https://images.liujian.cool/img/register_success.gif" class="am-img-thumbnail">\n' +
            '        </div>');
        sec.append(register_success_img);

        var register_success_words = $('<div class="register_success_words">\n' +
            '            <img src="https://images.liujian.cool/img/register_icon.png">\n' +
            '            <p>恭喜注册成功，快去登录吧</p>\n' +
            '        </div>');
        sec.append(register_success_words);

        var login_btn = $('<div class="">\n' +
            '            <a href="/login" type="button" class="am-btn am-btn-success" style="border-radius: 10px;margin-top: 20px">立即登录</a>\n' +
            '        </div>');
        sec.append(login_btn);

        register_big.append(sec);

    }
    //注册提交表单
    // var registerForm = $("#registerForm");
    registerFormBtn.click(function () {
        var email_value = $("#email").val();
        var auth_code_value = $("#auth_code").val();
        var username_value = $("#username").val();
        var password_value = $("#password").val();
        var gender = $(".radio_input input");
        if(gender[0].checked){
            gender_value = "male";
        }
        if(gender[1].checked){
            gender_value = "female";
        }
        if(registerFormBtn.hasClass("yes_submit") && email.hasClass("email_success")){
            $.ajax({
                type: 'post',
                url: '/register',
                dataType: 'json',
                data: {
                    "email":email_value,
                    "authCode":auth_code_value,
                    "username":username_value,
                    "password":password_value,
                    "gender":gender_value
                },
                success: function (data) {
                    if(data['status'] == 902){
                        auth_code_warn.css("display","block");
                        auth_code_error.css("display","block");
                    } else if(data['status'] == 905){
                        email_warn.css("display","block");
                        email_error.css("display","block");
                    } else if(data['status'] == 505){
                        username_warn.css("display","block");
                    } else if(data['status'] == 507){
                        username_warn1.css("display","block");
                    } else if(data['status'] == 904){
                        email_warn1.css("display","block");
                        email_error.css("display","block");
                    } else if (data['status'] == 103){
                        dangerNotice(data['message'] + " 注册失败")
                    } else {
                        putIn();
                    }
                },
                error: function () {
                    alert("注册失败");
                }
            })
        }
    });

