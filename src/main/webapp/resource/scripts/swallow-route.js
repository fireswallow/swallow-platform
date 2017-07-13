/**
 * Created by swallow on 2017/4/15.
 */

var Router = {
    routeLocation: function (url, params, options) {
        options = $.extend({}, {
            stringify: true,
            encoded: false
        }, options);
        var paramArray = [];
        var paramStr = "";
        if (url.charAt(0) === "/") {
            url = projectName + url.slice(1);
        }
        if (url.charAt(url.length - 1) !== "?") {
            url += "?";
        }
        $.each(params, function (key, value) {
            if (options.stringify) {
                value = JSON.stringify(value);
                if (options.encoded) {
                    key = encodeURIComponent(key);
                    value = encodeURIComponent(value);
                }
                paramArray.push(key + "=" + value);
            } else {
                if (value === null || value === undefined) {
                    value = "";
                }
                if (options.encoded) {
                    key = encodeURIComponent(key);
                    value = encodeURIComponent(value);
                }
                paramArray.push(key + "=" + value);
            }
            paramStr = paramArray.join("&");
        });

        url += paramStr;
        window.location.href = url;
    },

    routeParam: function (options, url) {
        options = $.extend({}, {
            stringify: true,
            decoded: true
        }, options);
        if ((typeof url) !== "string") {
            url = window.location.href;
        }
        if (url.indexOf("?") === -1 || url.indexOf("?") === url.length - 1) {
            return {};
        }
        url = url.slice(url.indexOf("?") + 1);
        if (url.lastIndexOf("#") !== -1) {
            url.slice(0, url.lastIndexOf());
        }
        var paramContent = {};
        $.each(url.split("&"), function (index, value) {
            var pair = value.split("=");
            var key = pair[0];
            var content = pair[1];
            if (options.decoded) {
                key = decodeURIComponent(key);
                content = decodeURIComponent(content);
            }
            if (options.stringify) {
                content = JSON.parse(content);
            }
            paramContent[key] = content;
        });

        return paramContent;
    },

    routeAjax: function (options) {
        $.ajax(Functions.jsonAjax(options));
    }
};
