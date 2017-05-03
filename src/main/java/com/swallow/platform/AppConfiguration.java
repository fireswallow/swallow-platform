package com.swallow.platform;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.context.annotation.FilterType;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * Created by swallow on 2017/5/3.
 */
@Configuration
@ComponentScan(basePackages = "com.swallow.platform",
        excludeFilters = {@ComponentScan.Filter(type = FilterType.ASPECTJ, pattern = "com.swallow.platform.web..*")})
@EnableTransactionManagement
@EnableAspectJAutoProxy
public class AppConfiguration {
}
