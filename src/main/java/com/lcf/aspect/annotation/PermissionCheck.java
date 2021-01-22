package com.lcf.aspect.annotation;

import java.lang.annotation.*;

/**
 * @author: liuchuanfeng
 * @Date: 2020/11/1 13:25
 * Describe:
 */
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface PermissionCheck {

    String value();

}
