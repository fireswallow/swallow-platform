package com.swallow.platform.interceptor;

import org.apache.ibatis.executor.statement.RoutingStatementHandler;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Invocation;

import java.util.Properties;

/**
 * Created by swallow on 2017/5/6.
 */
public class SQLInterceptor implements Interceptor {
    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        return null;
    }

    @Override
    public Object plugin(Object target) {
        if(target instanceof RoutingStatementHandler){
            RoutingStatementHandler statementHandler = (RoutingStatementHandler) target;
        }
        return null;
    }

    @Override
    public void setProperties(Properties properties) {

    }
}
