/*--------------------------------------------------------------------------/
功能：实现弹出层功能
参数：opts
制作：lesanc.li by 2012-4-13
修改：lesanc.li by 2012-8-28
/---------------------------------------------------------------------------*/
;
(function ($) {
    $
			.extend({
			    popupBase: {
			        init: function (opts) {

			            if (!opts.div) {
			                return;
			            }

			            var defaults = {
			                div: "",
			                drappable: false,
			                maskable: true,
			                maskClose: true,
			                closeMode: "hide",
			                scroll: false,
			                posx: "center",
			                posy: "center",
			                success: null,
			                error: null,
			                fixbg: true
			            };

			            $.extend(defaults, opts);

			            if (defaults.fixbg) {
			                $.popupBase.fixbg();
			            }

			            if (defaults.maskable) {
			                var mask = $.popupBase.mask();
			                if (defaults.maskClose) {
			                    mask.bind("click", function () {
			                        $.popupBase.close(defaults.div, defaults.closeMode);
			                    });
			                }
			            }

			            _initDiv();
			            _showDiv();
			            _callback(defaults.success);

			            // 设置拖拽
			            if (defaults.drappable) {
			                $.popupBase.drag(defaults.div);
			            }

			            // 关闭层
			            defaults.div.find(".close").bind("click", function () {
			                $.popupBase.close(defaults.div, defaults.closeMode);
			                return false;
			            });

			            if (defaults.scroll) {
			                $(window).scroll(
									function () {
									    $.popupBase.updatePos(defaults.div,
												defaults.posx
														+ $(document)
																.scrollLeft(),
												defaults.posy
														+ $(document)
																.scrollTop());
									});
			            }

			            setTimeout(function () {
			                $(window).bind("scroll", $.popupBase.upMask);
			                $(window).bind("resize", $.popupBase.upMask);
			            }, 0);

			            // 初始化
			            function _initDiv() {

			                // 初始化弹出层
			                if (typeof defaults.div === "string") {
			                    defaults.div = $("<div class=\"popupDiv\">"
										+ defaults.div + "</div>");
			                    defaults.div.css({
			                        "position": "absolute",
			                        "top": "0",
			                        "left": "0",
			                        "display": "none"
			                    });
			                    defaults.div.appendTo("body");
			                }

			                if (defaults.maskable) {
			                    defaults.div.click($.popupBase.upMask);
			                }
			            }

			            // 显示弹出层
			            function _showDiv() {
			                $.popupBase.updatePos(defaults.div, defaults.posx,
									defaults.posy);
			                defaults.div.show();
			                var fixbg = $("#fixedPopupIframe");
			                if (fixbg.length) {
			                    fixbg.css({
			                        "position": "absolute",
			                        "top": defaults.div.offset().top + "px",
			                        "left": defaults.div.offset().left + "px",
			                        "width": defaults.div.outerWidth(),
			                        "height": defaults.div.outerHeight(),
			                        "z-index": "8999",
			                        "filter": "alpha(opacity=1)"
			                    }).show();
			                    defaults.div.click(function () {
			                        fixbg.css({
			                            "top": defaults.div.offset().top + "px",
			                            "left": defaults.div.offset().left + "px",
			                            "width": defaults.div.outerWidth(),
			                            "height": defaults.div.outerHeight()
			                        })
			                    });
			                }

			            } // end _showDiv()

			            // 执行函数
			            function _callback(fn) {
			                if (fn instanceof Function) {
			                    fn();
			                }
			            } // end _callback()
			        }, // end init()
			        id: 1000,
			        items: [],
			        // 更新蒙版大小
			        mask: function (isShow) {

			            var divMask = $("#divMask");
			            if (isShow === false) {
			                if (divMask.length) {
			                    divMask.hide();
			                    return false;
			                } else {
			                    return false;
			                }
			            }
			            if (!divMask.length) {
			                divMask = $("<div id=\"divMask\" style=\"display:none;\"></div>");
			                divMask.appendTo($("body"));
			            }
			            var mBg = "#000";
			            if ($.browser.msie && $.browser.version === "8.0") {
			                mBg = "url(http://img02.zhaopin.cn/2012/img/ui/alpha.png)";
			            }
			            divMask
								.css(
										{
										    "position": "absolute",
										    "top": "0",
										    "left": "0",
										    "width": ($(window).width() > $(
													document).width()) ? $(
													window).width()
													: (($.browser.msie) ? $(
															document).width() - 21
															: $(document)
																	.width())
															+ "px",
										    "height": ($(window).height() > $(
													document).height()) ? $(
													window).height()
													: (($.browser.msie) ? $(
															document).height() - 21
															: $(document)
																	.height())
															+ "px",
										    "background": mBg,
										    "opacity": 0.3,
										    "z-index": "8000"
										}).show();
			            return divMask;
			        },
			        // IE背景修复（iframe）
			        fixbg: function (isShow) {

			            if ($.browser.msie && $.browser.version < "9.0") {

			                var fixbg = $("#fixedPopupIframe");
			                if (isShow === false) {
			                    if (fixbg.length) {
			                        fixbg.hide();
			                    }
			                    return false;
			                }
			                if (!fixbg.length) {
			                    fixbg = $("<iframe id=\"fixedPopupIframe\" frameborder=\"0\" style=\"display:none;\"></iframe>");
			                    fixbg.appendTo($("body"));
			                }
			                return fixbg;
			            }
			        },
			        // 更新蒙板大小
			        upMask: function () {
			            var mask = $("#divMask");
			            if (mask.css("display") === "none") {
			                return;
			            }
			            mask
								.hide()
								.css(
										{
										    "width": ($(window).width() > $(
													document).width()) ? $(
													window).width()
													: (($.browser.msie) ? $(
															document).width() - 21
															: $(document)
																	.width())
															+ "px",
										    "height": ($(window).height() > $(
													document).height()) ? $(
													window).height()
													: (($.browser.msie) ? $(
															document).height() - 21
															: $(document)
																	.height())
															+ "px"
										}).show();
			            return mask;
			        },
			        // 处理异步加载的文件内容
			        getHtml: function (data) {
			            if (data == "") {
			                return "";
			            } else if (typeof data === "string"
								&& data.indexOf("<body") === -1) {
			                return data;
			            }
			            var posBodyStart = data.indexOf("<body");
			            if (posBodyStart > 0) {
			                posBodyStart += data.match(/<body[^>]*>/gi)[0].length;
			            } else {
			                posBodyStart = 0;
			            }
			            var posBodyStartEnd = data.indexOf("</body");
			            if (posBodyStartEnd < 1) {
			                posBodyStartEnd = data.length;
			            }
			            var dataBody = data.substring(posBodyStart,
								posBodyStartEnd);
			            var css = data
								.match(/<link[^>]*href=[\"\' ][^\"\' ]*/gi);
			            var js = data
								.match(/<scrip[^>]*src=[\"\' ][^\"\' ]*/gi);
			            dataBody = dataBody.replace(
								/<link[^>]*href=[\"\' ][^>]*>/gi, "");
			            dataBody = dataBody.replace(
								/<scrip[^>]*src=[\"\' ][^>]*><\/script>/gi, "");
			            var link = "";
			            var script = "";
			            $("link").each(function () {
			                link += $(this).attr("href") + ";";
			            });
			            $("script").each(function () {
			                script += $(this).attr("src") + ";";
			            });
			            while (css && css.length) {
			                var css1 = css.shift().replace(
									/<link.*?href=[\"\' ]/i, "");
			                if (link.indexOf(css1) == -1) {
			                    $("head")
										.append(
												'<link href="'
														+ css1
														+ '" type="text/css" rel="stylesheet" />');
			                }
			            }
			            setTimeout(
								function () {
								    while (js && js.length) {
								        var js1 = js.shift().replace(
												/<scrip.*?src=[\"\' ]/i, "");
								        if (script.indexOf(js1) == -1) {
								            $("head")
													.append(
															'<scr'
																	+ 'ipt src="'
																	+ js1
																	+ '" type="text/javascript" /></scr'
																	+ 'ipt>');
								        }
								    }
								}, 200);
			            return $.trim(dataBody);
			        }, // end _getHtml()
			        // 加载状态提示
			        loading: function (isShow) {

			            var _load = $("#ajaxLoading");

			            // 初始化加载状态
			            if (!_load.length) {

			                _load = $('<div id=\"ajaxLoading\" style=\"display:none;\"><img src="http://img02.zhaopin.cn/myzhaopin/images/new_v3/ani_ajaxload.gif" \/></div>');
			                $("body").append(_load);

			            }
			            if (isShow !== false) {
			                _load
									.css(
											{
											    "position": "absolute",
											    "z-index": "9999",
											    "left": $(window).width() / 2
														- 16 + "px",
											    "top": $(window).height() / 2
														- 16 + "px"
											})
									.html(
											'<img src="http://myimg.zhaopin.com/images/new_v3/ani_ajaxload.gif" \/>')
									.show();
			            } else {
			                _load.hide();
			            }
			        },
			        // 拖动层实现
			        drag: function (obj) {

			            var mObj = obj.find(".move");
			            var movable = false;
			            var diffPosx = 0;
			            var diffPosy = 0;
			            var posx = 0;
			            var posy = 0;
			            var posTop = 0;
			            var posLeft = 0;
			            var timer = null;
			            var scroll = false;

			            mObj
								.css({
								    "cursor": "move"
								})
								.mousedown(
										function (e) {
										    movable = true;
										    $(document).bind("selectstart",
													function () {
													    return false;
													});
										    $("body").css({
										        "-moz-user-select": "none"
										    });
										    if ($.browser.msie) {
										        mObj[0].setCapture();
										    }
										    posx = parseInt(obj.css("left"));
										    posy = parseInt(obj.css("top"));
										    posLeft = $(document).scrollLeft();
										    posTop = $(document).scrollTop();
										    diffPosx = e.clientX - posx;
										    diffPosy = e.clientY - posy;

										    $(window)
													.scroll(
															function () {
															    clearTimeout(timer);
															    scroll = true;
															    var sTop = $(
																		document)
																		.scrollTop(), sLeft = $(
																		document)
																		.scrollLeft();
															    var wHeight = $(
																		window)
																		.height(), wWidth = $(
																		window)
																		.width();
															    if (movable) {
															        if (posLeft > sLeft) {
															            diffPosx += posLeft
																				- sLeft;
															            posx = posLeft = sLeft;
															        } else if (posLeft < sLeft) {
															            diffPosx += posLeft
																				- sLeft;
															            posLeft = sLeft;
															            posx = sLeft
																				+ wWidth;
															        }
															        if (posTop > sTop) {
															            diffPosy += posTop
																				- sTop;
															            posy = posTop = sTop;
															        } else if (posTop < sTop) {
															            diffPosy += posTop
																				- sTop;
															            posTop = sTop;
															            posy = sTop
																				+ wHeight;
															        }

															        $.popupBase
																			.updatePos(
																					obj,
																					posx,
																					posy);

															    }
															    timer = setTimeout(
																		function () {
																		    scroll = false;
																		}, 100);
															});
										    $(document)
													.mousemove(
															function (e) {
															    if (movable
																		&& scroll === false) {
															        posx = e.clientX
																					- diffPosx,
																			posy = e.clientY
																					- diffPosy;
															        $.popupBase
																			.updatePos(
																					obj,
																					posx,
																					posy);
															    }
															})
													.mouseup(
															function () {
															    $(document)
																		.unbind(
																				"mousemove");
															    movable = false;
															    $(document)
																		.unbind(
																				"selectstart");
															    $("body")
																		.css(
																				{
																				    "-moz-user-select": ""
																				});
															    if ($.browser.msie) {
															        mObj[0]
																			.releaseCapture();
															    }
															    return false;
															});
										});
			        }, // end _divMove()
			        // 调整层的位置
			        updatePos: function (jqueryObj, left, top) {

			            var pTop = 0, pLeft = 0;
			            var sTop = $(document).scrollTop(), sLeft = $(document)
								.scrollLeft();
			            var wHeight = $(window).height(), wWidth = $(window)
								.width();
			            var oHeight = jqueryObj.height(), oWidth = jqueryObj
								.width();

			            if (top === "center") {
			                pTop = sTop + wHeight / 2 - oHeight / 2;
			            } else if (top === "bottom"
								|| (typeof top === "number" && top > wHeight
										- oHeight)) {
			                pTop = sTop + wHeight - oHeight;
			            } else if (top === "top"
								|| (typeof top === "number" && top < 0)) {
			                pTop = sTop + 0;
			            } else if (typeof top === "number") {
			                pTop = sTop + top;
			            }

			            if (left === "center") {
			                pLeft = sLeft + wWidth / 2 - oWidth / 2;
			            } else if (left === "right"
								|| (typeof left === "number" && left > wWidth
										- oWidth)) {
			                pLeft = sLeft + wWidth - oWidth;
			            } else if (left === "left"
								|| (typeof left === "number" && left < 0)) {
			                pLeft = sLeft + 0;
			            } else if (typeof left === "number") {
			                pLeft = sLeft + left;
			            }

			            jqueryObj.css({
			                "position": "absolute",
			                "top": pTop + "px",
			                "left": pLeft + "px",
			                "z-index": "9000",
			                "background-color":"white"
			            });
			            var fixbg = $("#fixedPopupIframe");
			            var mask = $("#divMask");
			            if (fixbg.length && !mask.length) {
			                fixbg.css({
			                    "top": pTop + "px",
			                    "left": pLeft + "px",
			                    "width": jqueryObj.outerWidth(),
			                    "height": jqueryObj.outerHeight()
			                }).show();
			            }
			        }, // end _divUpdatePos()
			        // 关闭弹出层
			        close: function (jqueryObj, closeMode) {

			            jqueryObj = $.popupBase.toJqueryObj(jqueryObj);

			            if (jqueryObj === null) {
			                return;
			            }

			            if (jqueryObj.css("display") !== "none") {

			                if (closeMode === "remove") {
			                    jqueryObj.remove();
			                } else {
			                    jqueryObj.hide();
			                }

			                $.popupBase.mask(false);
			                $.popupBase.fixbg(false);
			            }
			        },
			        toJqueryObj: function (jqueryObj) {

			            if (!jqueryObj) {
			                return null;
			            }

			            jqueryObj = $(jqueryObj);

			            if (jqueryObj.length === 0) {
			                return null;
			            }

			            return jqueryObj;
			        }
			    }
			});
})(jQuery);