package com.swallow.platform.aspectj;

import com.alibaba.fastjson.JSON;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * Created by swallow on 2017/6/17.
 */

@Component
@Aspect
public class LogAspectj {
    private static final Logger LOGGER = LoggerFactory.getLogger(LogAspectj.class);

    @Before("execution(* com.swallow.platform.service..*(..))")
    public void beforeLog(JoinPoint joinPoint) {
        Object target = joinPoint.getTarget();
        LOGGER.info("targetClass===>", target.getClass().getName());
        LOGGER.info("Kind====>", joinPoint.getKind());
        Object[] args = joinPoint.getArgs();
        LOGGER.info("args===>", JSON.toJSONString(args));
    }
}
