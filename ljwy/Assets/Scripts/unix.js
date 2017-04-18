//作者：王拂春

//时间转换

//datetime转换为unix
var datetimeToUnix = function (datetime) {
    if (datetime == undefined) return '';
    return parseInt(datetime / 1000);
};
//unix转换为datetime
var unixToDatetime = function (unix) {
    if (unix == undefined) return '';
    var datetime = new Date(unix * 1000);
    return datetime;
}
//string转换为datetime
var stringToDatetime = function (datestr) {
    if (datestr == undefined) return '';
    try {
        datestr = datestr.replace(/-/g, "/");
        return new Date(datestr);
    } catch (e) {
        return '';
    }
};
//datetime转换为string
var datetimeToString = function (date, format) {
    if (date == undefined) return '';
    try {
        return datetimeFormat(date, format);
    } catch (e) {
        return '';
    }
};

//string转换为unix时间戳
var stringToUnix = function (datestr) {
    if (datestr == undefined) return '';
    try {
        datestr = datestr.replace(/-/g, "/");
        var date = stringToDatetime(datestr);
        return datetimeToUnix(date);
    } catch (e) {
        return '';
    }
};
//unix时间戳转换为string
var unixToString = function (unix, format) {
    if (unix == undefined) return '';
    try {
        var datetime = unixToDatetime(unix);
        return datetimeToString(datetime, format);
    } catch (e) {
        return '';
    }
};
//var NoYYYYstringToUnix = function (datestr) {
//    var is = new Date();
//    datestr = is.getFullYear().toString() +" "+ datestr;
//    if (datestr == undefined) return '';
//    try {
//        datestr = datestr.replace(/-/g, "/");
//        var date = stringToDatetime(datestr);
//        return datetimeToUnix(date);
//    } catch (e) {
//        return '';
//    }
//}
//时间格式化
//date：时间（datetime）
//format：时间格式如"yyyy-MM-dd"
//返回：时间（string）
var datetimeFormat = function (date, format) {
    if (date == undefined) return '';
    if (format == undefined) format = "yyyy-MM-dd HH:mm";
    if (!(date instanceof Date)) return '';
    var dict = {
        "yyyy": date.getFullYear(),
        "M": date.getMonth() + 1,
        "d": date.getDate(),
        "H": date.getHours(),
        "m": date.getMinutes(),
        "s": date.getSeconds(),
        "MM": ("" + (date.getMonth() + 101)).substr(1),
        "dd": ("" + (date.getDate() + 100)).substr(1),
        "HH": ("" + (date.getHours() + 100)).substr(1),
        "mm": ("" + (date.getMinutes() + 100)).substr(1),
        "ss": ("" + (date.getSeconds() + 100)).substr(1)
    };
    return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
        return dict[arguments[0]];
    });
}

//获取周几
//date：时间（unix）
//返回：周几（string）
var getWeekDay = function (data) {
    var date = new Date(unixToString(data)).getDay();
    var str = "";
    switch (date) {
        case 1:
            str = "一";
            break;
        case 2:
            str = "二";
            break;
        case 3:
            str = "三";
            break;
        case 4:
            str = "四";
            break;
        case 5:
            str = "五";
            break;
        case 6:
            str = "六";
            break;
        case 7:
            str = "日";
            break;
        default:
    }
    return str;
};
