jQuery.loading = function (isShow) {
    if (isShow) {
        if ($("#loading").length == 0) {
            $("body").append("<div id=\"loading\" style=\"position:fixed;top: 50%;left: 50%;margin-left: -33px;margin-top: -33px;width:66px;height:66px;background:url('/Assets/Plugins/loading/loading.gif') no-repeat;\"><div>");
        }
    } else {
        $("#loading").fadeOut('slow', function() {
            $("#loading").remove();
        });
    }
};