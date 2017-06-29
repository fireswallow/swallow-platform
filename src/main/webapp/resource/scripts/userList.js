/**
 * Created by swallow on 2017/6/23.
 */
(function ($) {
    var $ajax = $("#ajax");
    $ajax.on("click", function () {
        $.ajax({
            url: "/user/testAjax1",
            data: JSON.stringify({
                userName: "2233",
                age: "234",
                habit: "34324"
            }),
            contentType: "application/json",
            type: "POST",
            success: function (result) {
                console.log(result);
            },
            error: function (xth, status, throwable) {
                console.log(status);
                console.log(throwable);
            }
        });
    });


    var $asynchronous = $("#asynchronous");
    $asynchronous.on("click", function () {
        $.ajax({
            url: "/user/asynchronous",
            data: JSON.stringify({
                userName: "2233",
                age: "234",
                habit: "34324"
            }),
            contentType: "application/json",
            type: "POST",
            success: function (result) {
                console.log(result);
            },
            error: function (xth, status, throwable) {
                console.log(status);
                console.log(throwable);
            }
        });
    });
})(jQuery);