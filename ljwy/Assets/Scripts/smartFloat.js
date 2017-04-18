$.fn.smartFloat = function (width_p) {
    var position = function (element) {
        var top = element.position().top, pos = element.css("position");
        $(window).scroll(function () {
            var scrolls = $(this).scrollTop();
            if (scrolls > top) {
                if (window.XMLHttpRequest) {
                    element.css({
                        position: "fixed",
                        width: width_p,
                        top: 0
                    });
                } else {
                    element.css({
                        top: scrolls
                    });
                }
            } else {
                element.css({
                    position: "", //absolute  
                    top: top
                });
            }
        });
    };
    return $(this).each(function () {
        position($(this));
    });
}


