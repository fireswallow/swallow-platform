package com.swallow.platform.express;

import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.expression.Expression;
import org.springframework.expression.ExpressionParser;
import org.springframework.expression.spel.standard.SpelExpressionParser;

/**
 * Created by swallow on 2017/6/24.
 */

//@RunWith(SpringRunner.class)
//@ContextConfiguration(classes = AppConfiguration.class)
public class ExpressTest {
    private static Logger logger = LoggerFactory.getLogger(ExpressTest.class);

    @Test
    public void testExpress() {
        ExpressionParser parser = new SpelExpressionParser();
        Expression expression = parser.parseExpression("'Hello World'");
        String value = expression.getValue(String.class);
        logger.info(value);
    }

    @Test
    public void testPrimary() {
        double d = 1 - 0.7;
        System.out.println(d);
    }
}
