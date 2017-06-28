package com.swallow.platform;

import com.swallow.platform.web.WebConfiguration;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.filter.HiddenHttpMethodFilter;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

import javax.servlet.Filter;
import javax.servlet.ServletContext;

/**
 * Created by swallow on 2017/5/3.
 */
public class WebDispatcherServletInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

    @Override
    protected void registerDispatcherServlet(ServletContext servletContext) {
        super.registerDispatcherServlet(servletContext);
        /*servletContext.addFilter("characterEncodingFilter",
                new CharacterEncodingFilter("UTF-8", true)//true:重写request和response中的编码
        );*/
        //servletContext.addListener("sessionListener");添加监听器
        servletContext.setInitParameter("username","Sprinkle");
    }

    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class[]{AppConfiguration.class};
    }

    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class[]{WebConfiguration.class};
    }

    @Override
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }

    @Override
    protected javax.servlet.Filter[] getServletFilters() {
        return new Filter[]{
                new CharacterEncodingFilter("UTF-8", true),
                new HiddenHttpMethodFilter()
        };
    }
}
