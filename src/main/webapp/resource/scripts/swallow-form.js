/**
 * Created by swallow on 2017/4/15.
 */
if (typeof jQuery === 'undefined') {
    throw new Error('该插件需要jQuery');
}


/**
 * 将元素下的form表单序列化为对象
 * 例:$(".form).unmarshalForm(), $(".div).unmarshalForm(), $("input").unmarshalForm()
 */
+(function ($) {
    'use strict';

    function UnmarshalForm($element, options) {
        this.unmarshal = function () {
            var content = null;
            var $eleArray = [];
            var selector = "[name]:input";
            if (!options.unmarshalFile) {
                selector += ":not(:file)";
            }
            if (!options.unmarshalDisabled) {
                selector += ":enabled";
            }
            if (options.before($element)) {
                content = {};
                if ($element.is(selector)) {
                    $eleArray.push($element);
                }
                $eleArray.push($element.find(selector));
                unmarshalValue($eleArray, options, content);
            }
            if (options.arrayJoin !== undefined && options.arrayJoin !== null) {
                $.each(content, function (key, ele) {
                    if ($.isArray(ele)) {
                        content[key] = ele.join(options.arrayJoin);
                    }
                })
            }
            return options.complete(content, $element);
        }
    }


    UnmarshalForm.DEFAULT_OPTIONS = {
        /**
         * 是否序列化文件域
         * true:序列化, false:不序列化
         */
        unmarshalFile: false,

        /**
         * 是否序列化禁用表單
         * true:序列化, false:不序列化
         */
        unmarshalDisabled: false,

        /**
         * 当该值不为undefined && null时,对于数组类型的值,用该连接符号连接起来,
         */
        arrayJoin: undefined,

        /**
         * 是否将空字符串''转换为null,对输入值有效,对单选,复选,下拉无效
         */
        emptyToNull: true,

        /**
         * 当组件未被序列化时(radio,checkbox未选中):
         * {
         *      "no": "不序列化该值,即序列化后的内容不存在该键",
         *      "empty": "radio序列化为'',checkbox序列化为空数组[]",
         *      其他值: "将用该值去代替"
         * }
         */
        noUnmarshal: null,

        /**
         * 執行序列化前執行的回調行數
         * @param $element 綁定要序列化的組件($form.serializeForm(), 則$element為$form)
         * @returns {boolean} true:執行後續序列化操作, false:不執行序列化,返回null
         */
        before: function ($element) {
            return true;
        },

        /**
         * 每个元素序列化前的回调函数,序列化每一个input都会调用,不是通过name来区分的
         * @param $target 要序列化的元素
         * @returns {boolean} true:序列化该元素, false:不序列化该元素,不会调用postHandle()方法
         */
        preHandle: function ($target) {
            return true;
        },

        /**
         * 每个元素序列化后执行的回调函数,序列化每一个input都会调用,不是通过name来区分的
         * @param $target 要序列化的元素
         * @param value 该元素序列化后的值
         * @returns {*} 返回的内容为序列化的最终值
         */
        postHandle: function ($target, value) {
            return value;
        },

        /**
         * 序列化后的回调函数
         * @param content 返回内容为最终内容
         * @param $element 綁定要序列化的組件($form.serializeForm(), 則$element為$form)
         */
        complete: function (content, $element) {
            return content;
        }
    };

    /**
     * 序列化值
     * @param $eleArray jQuery对象数组
     * @param options 设置选项
     * @param content 序列化内容
     */
    function unmarshalValue($eleArray, options, content) {
        $.each($eleArray, function (i, $ele) {
            $ele.each(function (j, target) {
                var $target = $(target);
                if ($target.is(":radio")) {
                    unmarshalRadio($target, options, content);
                } else if ($target.is(":checkbox")) {
                    unmarshalCheckbox($target, options, content);
                } else if ($target.is("select")) {
                    unmarshalSelect($target, options, content);
                } else {
                    unmarshalText($target, options, content);
                }
            });
        });
    }

    /**
     * 序列化radio
     * @param $target 要序列化的组件
     * @param options 设置选项
     * @param content 序列化内容
     */
    function unmarshalRadio($target, options, content) {
        var key = $target.attr("name");
        if (!Object.prototype.hasOwnProperty.call(content, key)) {
            if (options.noUnmarshal === "empty") {
                content[key] = "";
            } else if (options.noUnmarshal !== "no") {
                content[key] = options.noUnmarshal;
            }
        }
        if ($target.is(":checked")) {
            if (!options.preHandle($target)) {
                return;
            }
            content[key] = options.postHandle($target, $target.val());
        }
    }

    /**
     * 序列化checkbox
     * @param $target 要序列化的组件
     * @param options 设置选项
     * @param content 序列化内容
     */
    function unmarshalCheckbox($target, options, content) {
        var key = $target.attr("name");
        if (!Object.prototype.hasOwnProperty.call(content, key)) {
            if (options.noUnmarshal === "empty") {
                content[key] = [];
            } else if (options.noUnmarshal !== "no") {
                content[key] = options.noUnmarshal;
            }
        }
        if ($target.is(":checked")) {
            if (!options.preHandle($target)) {
                return;
            }
            if (!$.isArray(content[key])) {
                content[key] = [];
            }
            content[key].push(options.postHandle($target, $target.val()));
        }
    }

    /**
     * 序列化select
     * @param $target 要序列化的组件
     * @param options 设置选项
     * @param content 序列化内容
     */
    function unmarshalSelect($target, options, content) {
        var key = $target.attr("name");
        content[key] = options.postHandle($target, $target.val());
    }

    /**
     * 序列化text
     * @param $target 要序列化的组件
     * @param options 设置选项
     * @param content 序列化内容
     */
    function unmarshalText($target, options, content) {
        var key = $target.attr("name");
        var value = $target.val();
        if (options.emptyToNull && value === "") {
            value = null;
        }
        if (!Object.prototype.hasOwnProperty.call(content, key)) {
            if (options.preHandle($target)) {
                content[key] = options.postHandle($target, value);
            }
            return;
        }

        if (!$.isArray(content[key])) {
            content[key] = [].concat(content[key]);
        }
        content[key].push(options.postHandle($target, value))
    }

    /**
     * 解决冲突
     */
    var old = $.fn.unmarshalForm;
    $.fn.unmarshalForm = function (options) {
        return (new UnmarshalForm(this, $.extend({}, UnmarshalForm.DEFAULT_OPTIONS, options))).unmarshal();
    };
    $.fn.noConflict = function () {
        $.fn.unmarshalForm = old;
        return this;
    };

    $.fn.unmarshalForm.Constructor = UnmarshalForm;

})(jQuery);

/**
 * 将数据回显于form表单
 */
+(function ($) {
    'use strict';

    function MarshalForm($element, options, data) {
        this.marshal = function () {
            if (options.before($element, data)) {
                marshalValue($element, options, data);
            }
            options.complete($element);
        }
    }

    MarshalForm.DEFAULT_OPTIONS = {

        /**
         * 如果不为undefined && null,对于checkbox,multiple select,如果对应的值不为数组, 用该分割符去分割
         *
         */
        separator: null,

        before: function ($element, data) {
            return true;
        },

        preHandle: function ($target, key, value) {
            return true;
        },

        postHandle: function ($target) {
        },

        complete: function ($element) {
        }
    };

    function marshalValue($element, options, data) {
        $.each(data, function (key, value) {
            var $elements = $element.find(":input[name='" + key + "']");
            if ($element.is(":input[name='" + key + "']")) {
                if (!$elements.exists()) {
                    $elements = $element;
                } else {
                    $elements.add($element);
                }
            }
            $elements.each(function (index, ele) {
                var temp;
                var $ele = $(ele);
                if ($ele.is(":radio")) {
                    marshalCheck($ele, options, key, value);
                } else if ($ele.is(":checkbox")) {
                    if (value !== undefined && value !== null) {
                        if (options.separator !== undefined && options.separator !== null) {
                            if (!$.isArray(value)) {
                                value = value.split(options.separator);
                            }
                        }
                    } else {
                        temp = value;
                        value = [];
                        value.push(temp);
                    }
                    value = [].concat(value);
                    $.each(value, function (i, v) {
                        marshalCheck($ele, options, key, v);
                    })
                } else if ($ele.is("select")) {
                    marshalSelect($ele, options, key, value);
                } else {
                    if (value !== undefined && value !== null) {
                        if (options.separator !== undefined && options.separator !== null) {
                            if (!$.isArray(value)) {
                                value = value.split(options.separator);
                            }
                        }
                    } else {
                        temp = value;
                        value = [];
                        value.push(temp);
                    }
                    value = [].concat(value);
                    marshalText($ele, options, key, value[index]);
                }
            });
        });
    }

    function marshalCheck($target, options, key, value) {
        if ($target.val() === value) {
            if (options.preHandle($target, key, value)) {
                $target.prop("checked", "checked");
                options.postHandle($target);
            }
        }
    }

    function marshalSelect($target, options, key, value) {
        if ($target.is("[multiple]")) {
            if (options.separator !== undefined && options.separator !== null) {
                if (!$.isArray(value)) {
                    value = value.split(options.separator);
                }
            }
        }

        if (options.preHandle($target, key, value)) {
            value = [].concat(value);
            $.each(value, function (index, v) {
                $target.find("option[value='" + v + "']").prop("selected", "selected");
            });
            options.postHandle($target);
        }
    }

    function marshalText($target, options, key, value) {
        if (options.preHandle($target, key, value)) {
            $target.val(value);
            options.postHandle($target);
        }
    }

    /**
     * 解决冲突
     */
    var old = $.fn.marshalForm;
    $.fn.marshalForm = function (data, options) {
        (new MarshalForm(this, $.extend({}, MarshalForm.DEFAULT_OPTIONS, options), data)).marshal();
        return this;
    };
    $.fn.noConflict = function () {
        $.fn.marshalForm = old;
        return this;
    };

    $.fn.marshalForm.Constructor = MarshalForm;

})(jQuery);

/**
 * 将数据回显于对应文本值
 */
+(function ($) {
    'use strict';

    function MarshalText($element, options, data) {
        this.marshal = function () {
            if (options.before($element, data)) {
                var $collections = $element.find("[" + MarshalText.DEFAULT_OPTIONS.target + "]");
                if ($element.is("[" + MarshalText.DEFAULT_OPTIONS.target + "]")) {
                    if (!$collections.exists()) {
                        $collections = $element;
                    } else {
                        $collections.add($element);
                    }
                }
                $collections.each(function (index, target) {
                    var $target = $(target);
                    var keyName = $target.attr(MarshalText.DEFAULT_OPTIONS.target);
                    var keyNames = keyName.split(MarshalText.DEFAULT_OPTIONS.separator);
                    var value = data;
                    $.each(keyNames, function (index, item) {
                        if (!Object.prototype.hasOwnProperty.call(value, item)) {
                            value = MarshalText.DEFAULT_OPTIONS.defaultText;
                            return false;
                        }
                        value = value[item];
                    });
                    if (MarshalText.DEFAULT_OPTIONS.nullToEmpty) {
                        if (value === undefined || value === null) {
                            value = "";
                        }
                    }
                    marshalText($(target), options, keyName, value);
                });
            }
            options.complete($element);
        }
    }

    MarshalText.DEFAULT_OPTIONS = {
        /**
         * 选择符
         */
        target: "data-sw-text",

        /**
         * 联级分割符
         */
        separator: ".",

        /**
         * 不存在对应的键的默认值
         */
        defaultText: "",

        /**
         * null || undefined 是否转换为""
         */
        nullToEmpty: "true",

        before: function ($element, data) {
            return true;
        },

        preHandle: function ($target, key, value) {
            return true;
        },

        postHandle: function ($target) {
        },

        complete: function ($element) {
        }
    };

    function marshalText($target, options, key, value) {
        if (options.preHandle($target, key, value)) {
            $target.text(value);
            options.postHandle($target);
        }
    }

    /**
     * 解决冲突
     */
    var old = $.fn.marshalText;
    $.fn.marshalText = function (data, options) {
        (new MarshalText(this, $.extend({}, MarshalText.DEFAULT_OPTIONS, options), data)).marshal();
        return this;
    };
    $.fn.noConflict = function () {
        $.fn.marshalText = old;
        return this;
    };

    $.fn.marshalText.Constructor = MarshalText;

})(jQuery);
