
/**
 * 工具方法集合
 * Created by swallow on 2017/4/15.
 */
var Functions = {
    /** @namespace result.resultCode */

    /**
     *
     * @param url{string} 请求url
     * @returns {string} 计算后的url
     */
    url: function (url) {
        if (url.charAt(0) === "/") {
            url = projectName + url.slice(1);
        }
        return url;
    },
    /**
     * 根据result提示相关信息
     * @param result com.pilelot.yngr.common.Result
     */
    showResult: function (result) {
        var resultType = result.resultType;
        if (!resultType) {
            resultType = result.resultCode === 1 ? "success" : "error";
        }
        toastr[resultType](result.message);
    },

    /**
     * 根据result.resultCode为错误时提示相关信息
     * @param result com.pilelot.yngr.common.Result
     */
    showErrorResult: function (result) {
        if (!result.resultCode) {
            toastr[(result.resultType || "error")](result.message);
            return false;
        }
        return true;
    },

    /**
     * 默认构建一个json ajax
     * @param options {*} 扩展选项
     * @returns {*}
     */
    jsonAjax: function (options) {
        if (Object.prototype.hasOwnProperty.call(options, "url")) {
            var url = options.url;
            if (url !== undefined && url !== null) {
                if (url.charAt(0) === "/") {
                    options.url = projectName + url.slice(1);
                }
            }
        }
        return $.extend({
            data: JSON.stringify({}),
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            error: function (xMLHttpRequest, textStatus, errorThrown) {
                Functions.showErrorResult({
                    resultCode: 1,
                    message: "textStatus:" + textStatus + "<br/>" + "errorThrown:" + errorThrown
                });
            }
        }, options)
    },

    /**
     * 一个简单列定义实现
     * @param options{{smartColumns:[]}}
     */
    simpleDataTableConfig: function (options) {
        options = this.dataTableConfig(options);

        if (options.url && !options.ajax) {
            options.ajax = Functions.jsonAjax({
                url: options.url,
                data: function (data, settings) {
                    var content = options.data;
                    if (options.paging) {
                        content.pagination = Functions.extractPagination(data);
                    }
                    return JSON.stringify(content);
                },
                dataSrc: function (result) {
                    Functions.showErrorResult(result);
                    return result.resultData;
                }
            });
        }


        var smartColumns = options.smartColumns;
        if (smartColumns) {
            var columns = options.columns;
            var columnDefs = options.columnDefs;
            if (!columns) {
                columns = [];
                options.columns = columns;
            }
            if (!columnDefs) {
                columnDefs = [];
                options.columnDefs = columnDefs;
            }
            $.each(smartColumns, function (index, item) {
                if (!columns[index]) {
                    columns[index] = {};
                }
                if (typeof item === "string") {
                    if ($.isEmptyObject(columns[index])) {
                        if (item.slice(0, 1) === "|" && item.slice(item.length - 1) === "|") {
                            columnDefs[columnDefs.length] = {
                                targets: index,
                                data: function(row, type, val, meta){
                                    return item.slice(1, item.length - 1);
                                }
                            };
                        } else {
                            columns[index] = {
                                data: item
                            };
                        }
                    }
                } else if (typeof item === "function") {
                    var hasDef = false;
                    $.each(columnDefs, function (i, ele) {
                        if (ele.targets === index) {
                            hasDef = true;
                            return false;
                        }
                    });
                    if (!hasDef) {
                        columnDefs[columnDefs.length] = {
                            targets: index,
                            data: item
                        };
                    }
                } else if (typeof item === "object") {
                    if (!columns[index]) {
                        var column = {};
                        var count = 0;
                        for (var key in item) {
                            if (item.hasOwnProperty(key)) {
                                count++;
                                columns[index] = {
                                    data: key,
                                    render: item[key]
                                };
                            }
                        }

                        if (count !== 1) {
                            columns[index] = item;
                        }
                    }
                }
            });
        }

        return options;
    },

    /**
     * 构建一个默认的dataTable配置
     * @param options 配置选项
     * @return {*}
     */
    dataTableConfig: function (options) {
        return $.extend({
            serverSide: true,
            paging: true,
            info: false,
            lengthChange: false,
            searching: false,
            ordering: false,
            processing: false,
            language: {url: Functions.url("/js/common/zh_CN.json")}
        }, options);
    },

    /**
     * 从dataTable数据中提取分页对象
     * @param data
     * @returns {{page: number, rows: number, startIndex: number}}
     */
    extractPagination: function (data) {
        return {
            page: data.start / data.length + 1,
            length: data.length,
            start: data.start
        }
    },

    /**
     * 日期时间格式化函数
     * @param options {{pattern string , date Date}}
     */
    formatDate: function (options) {
        options = $.extend({
            pattern: "yyyy-MM-dd",
            date: new Date()
        }, options);
        var date = options.date;
        var month = date.getMonth() + 1;
        var d = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var seconds = date.getSeconds();
        return options.pattern.replace("yyyy", date.getFullYear())
            .replace("yy", date.getYear())
            .replace("MM", month < 10 ? "0" + month : month)
            .replace("M", month)
            .replace("dd", d < 10 ? "0" + d : d)
            .replace("d", d)
            .replace("HH", hour < 10 ? "0" + hour : hour)
            .replace("H", hour)
            .replace("mm", minute < 10 ? "0" + minute : minute)
            .replace("m", minute)
            .replace("ss", seconds < 10 ? "0" + seconds : seconds)
            .replace("s", seconds);
    },

    /**
     * 导出数据
     * @param options
     */
    exportData: function (options) {
        var $form = options.form;
        $form.attr("action", Functions.url(options.url))
            .attr("method", "post")
            .attr("target", "_blank")
            .trigger("submit")
            .removeAttr("action")
            .removeAttr("target");
    }
};
