package com.swallow.platform;

import com.alibaba.druid.pool.DruidDataSourceFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.*;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;
import java.io.InputStream;
import java.util.Properties;

/**
 * Created by swallow on 2017/5/3.
 */
@Configuration
@ComponentScan(basePackages = "com.swallow.platform",
        excludeFilters = {@ComponentScan.Filter(type = FilterType.ASPECTJ, pattern = "com.swallow.platform.web..*")})
@EnableTransactionManagement
@EnableAspectJAutoProxy(proxyTargetClass = true)
@MapperScan("com.swallow.platform.dao")
public class AppConfiguration {

    /**
     * 数据源
     *
     * @return druid数据源
     * @throws Exception 可能抛出的异常
     */
    @Bean
    public DataSource dataSource() throws Exception {
        InputStream inputStream = null;
        try {
            Properties properties = new Properties();
            inputStream = new ClassPathResource("datasource.properties").getInputStream();
            properties.load(inputStream);
            return DruidDataSourceFactory.createDataSource(properties);
        } finally {
            if (inputStream != null) {
                inputStream.close();
            }
        }
    }

    @Bean
    public PlatformTransactionManager transactionManager() throws Exception {
        return new DataSourceTransactionManager(dataSource());
    }

    /**
     * mybatis SqlSessionFactory
     *
     * @return sqlSessionFactoryBean
     * @throws Exception 可能抛出的异常
     */
    @Bean
    public SqlSessionFactoryBean sqlSessionFactory() throws Exception {
        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
        org.apache.ibatis.session.Configuration configuration = new org.apache.ibatis.session.Configuration();
        configuration.setCallSettersOnNulls(true);
        sqlSessionFactoryBean.setConfiguration(configuration);
        sqlSessionFactoryBean.setDataSource(dataSource());

        return sqlSessionFactoryBean;
    }

}
