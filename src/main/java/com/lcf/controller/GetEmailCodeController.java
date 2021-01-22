package com.lcf.controller;

import com.lcf.redis.StringRedisServiceImpl;
import com.lcf.utils.EmailRandomUtil;
import com.lcf.utils.JsonResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.internet.MimeMessage;

/**
 * @description: 发送邮件获取验证码
 * @author: liuchuanfeng
 * @time: 2020/12/8 15:52
 */
@RestController
@Slf4j
public class GetEmailCodeController {

    @Autowired
    StringRedisServiceImpl stringRedisService;

    @Autowired
    JavaMailSender mailSender;//注入发送邮件的bean

    @Value("${spring.mail.username}")
    private String emailUserName;

    //定义发送的标题
    public static String title="[程序猿刘川枫]获取验证码";

    /**
     * @description: 发送给指定邮箱验证码
     * @param email
     * @return: java.lang.String
     * @author: liuchuanfeng
     * @time: 2020/12/8 16:23
     */
    @PostMapping(value = "/getCode", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public String getEmail(@RequestParam("email") String email) {
        try {
            String body = setEmailBody(email);
            MimeMessage mimeMessage = this.mailSender.createMimeMessage();
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage);
            message.setFrom(emailUserName);//设置发件qq邮箱
            message.setTo(email);		//设置收件人
            message.setSubject(title);	//设置标题
            message.setText(body);  	//第二个参数true表示使用HTML语言来编写邮件
//            FileSystemResource file = new FileSystemResource(
//            File file = new File("图片路径");
//            helper.addAttachment("图片.jpg", file);//添加带附件的邮件
//            helper.addInline("picture",file);//添加带静态资源的邮件
            log.info("getEmail send email message: [{}]", message);
            this.mailSender.send(mimeMessage);
        } catch (Exception e) {
            log.error("[{}] send email message exception", email, e);
            return JsonResult.fail().toJSON();
        }
        return JsonResult.success().toJSON();
    }

    private String setEmailBody(String email){
        //获取邮箱随机验证码
        String emailCode = EmailRandomUtil.randomNumBuilder();
        //在redis中保存邮箱验证码并设置过期时间
        stringRedisService.set(email, emailCode);
        stringRedisService.expire(email, 300);
        StringBuffer body = new StringBuffer();
        body.append("客官您来啦,里面请!\n\n").append("    您的验证码为:  ").append(emailCode+"\n\n");
        body.append("    客官请注意:需要您在收到邮件后5分钟内使用，否则该验证码将会失效。\n\n");
        return body.toString();
    }

}
