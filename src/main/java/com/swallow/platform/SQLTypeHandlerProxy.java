package com.swallow.platform;

import org.apache.ibatis.type.TypeHandler;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.Arrays;

/**
 * Created by swallow on 2017/5/6.
 */
public class SQLTypeHandlerProxy implements InvocationHandler {
    private TypeHandler<?> typeHandler;

    private TypeHandler<?> proxyr;

    public SQLTypeHandlerProxy(TypeHandler<?> typeHandler) {
        this.typeHandler = typeHandler;
    }

    public TypeHandler typeHandlerProxy() {
        return proxyr = (TypeHandler) Proxy.newProxyInstance(this.getClass().getClassLoader(), new Class[]{TypeHandler.class}, this);
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        boolean ise = proxy == proxyr;
        System.out.println(Arrays.toString(args));
        return method.invoke(typeHandler, args);
    }
}
