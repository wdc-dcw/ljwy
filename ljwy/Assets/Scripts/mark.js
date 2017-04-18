//作者：王拂春

//痕迹操作类
var Mark = function (markPageName, markParameters) {

    var pageName = null;
    var parameters = null;
    var me = this;


    //有操作痕迹
    this.isHas = function () {
        var cookieParameters = $.cookie(pageName);
        if (cookieParameters != null) {
            return true;
        } else {
            return false;
        }
    };
    //获取单个操作痕迹
    this.getItem = function (name) {
        var value = null;
        if (parameters != null) {
            value = parameters[name];
        }
        return value;
    };
    //获取所有操作痕迹
    this.getFull = function () {
        return parameters;
    };
    //保存操作痕迹
    this.save = function () {
        $.cookie(pageName, "");
        $.cookie(pageName, JSON.stringify(parameters));
    };
    //修改单个操作痕迹
    this.update = function (name, value) {
        if (parameters != null) {
            parameters[name] = value;
        }
        me.save();
    };
    //修改多个操作痕迹
    this.updateList = function (jsonList) {
        if (parameters != null) {
            $.each(jsonList, function (name, value) {
                parameters[name] = value;
            });
        }
        me.save();
    };

    //载入操作痕迹到表单控件(不完善)
    this.loadPage = function () {
        if (parameters != null) {
            $.each(parameters, function (name, value) {
                var input = document.getElementById(name);
                $("#" + name).val(value);
            });
        }
    };

    //构造器
    var init = function () {
        pageName = markPageName + "MarkCookie";
        parameters = markParameters;

        if (me.isHas()) {
            parameters = JSON.parse($.cookie(pageName));
            me.update("isFirst", true);
        } else {
            if (parameters != null) {
                me.save();
            }
        }
    };
    init();
};