var convenience = function () {
    //商家信息
    this.GoodsList = function () {
        var paramsJson = {
            id: "1",
            gotoPage: "1",
            pageSize: "8"
        }
        var data = {
            secretKey: "mobileSecretKey1234567890",
            opt: "getMerchantDetail",
            params: JSON.stringify(paramsJson)
        }
        $.post(interfaceApi, data, function (result) {
            var result = JSON.parse(result);
            if (result.messageCode == 1) {
                $('<p class="name">' + result.resultObject.shopName + '</p><p class="address_main"><a  href="shop_location.html?address=' + encodeURI(encodeURI(result.resultObject.address)) + '"><span style="color: #999;" class="address"><img src="Assets/Images/business_add.png">' + result.resultObject.address + '</span><a><a href="tel:' + result.resultObject.tel + '" class="tel"><img src="Assets/Images/tel.png"/>' + result.resultObject.tel + '</a></p>').appendTo(".convenience_message");
                $("<div class=\"swiper-slide img1\">"
						+"<img src=\'"+ imgdomain + result.resultObject.image1 + "' />"
						+"</div>"+
						"<div class=\"swiper-slide img2\">"
						+"<img src=\'"+ imgdomain + result.resultObject.image2 + "' />"
						+"</div>"+
						"<div class=\"swiper-slide img3\">"
						+"<img src=\'"+ imgdomain + result.resultObject.image3 + "' />"
						+"</div>"+
						"<div class=\"swiper-slide img4\">"
						+"<img src=\'"+ imgdomain + result.resultObject.image4 + "' />"
						+"</div>"+
						"<div class=\"swiper-slide img5\">"
						+"<img src=\'"+ imgdomain + result.resultObject.image5 + "' />"
						+"</div>").appendTo(".swiper-wrapper");
                if (result.resultObject.image1 == "") { $(".img1").remove(); }
                if (result.resultObject.image2 == "") { $(".img2").remove(); }
                if (result.resultObject.image3 == "") { $(".img3").remove(); }
                if (result.resultObject.image4 == "") { $(".img4").remove(); }
                if (result.resultObject.image5 == "") { $(".img5").remove(); }
                var mySwiper = new Swiper('.swiper-container', {
                    loop: true,
                    pagination: '.swiper-pagination',
                    autoplay: 3500,
                    autoplayDisableOnInteraction: false,
                })
                }
            else {
                getBomBbox(result.message);
            }
        });
    }
    //商品信息
    this.goods_list = function () {
        var paramsJson = {
            shopId: "1",
            gotoPage: "1",
            pageSize: "999"
        }
        var data = {
            secretKey: "mobileSecretKey1234567890",
            opt: "getGoodsList",
            params: JSON.stringify(paramsJson)
        }
        $.post(interfaceApi, data, function (result) {
            var result = JSON.parse(result);
            if (result.messageCode == 1) {
                $.each(result.resultObject, function (i, item) {
                    var html = "";
                    var count = 0;
                    if (item.length > 8) {

                        html += '<p class="p_commodity_type p_commodity_typeclick" typeid="' + i.split("_")[1] + '"><span class="top_1"></span><span class="top_2">' + i.split("_")[0] + '<span><span class="top_3" >更多</span></p><div style="overflow: hidden;background-color: #fff;">'
                    }
                    else {
                        html += '<p class="p_commodity_type">' + i.split("_")[0] + '</p><div style="overflow: hidden;background-color: #fff;">'
                        count = 8 - item.length;
                    }
                    $.each(item, function (j, items) {
                        if (j < 8) {
                            html += '<div class="commodity"><p class="commodity_img"><a href="commodity_info.html?id=' + items.id + '"><img src="' + imgdomain + items.image1 + '"/></a></p><p class="commodity_name">' + items.name + '</p><p class="commodity_price">￥' + items.price + '</p></div>';
                        }
                        else { }
                    });
                    for (var i = 0; i < count; i++) {
                        html += '<div class="commodity"></div>';
                    }
                    html += "</div>";
                    $(".content").append(html);
                })
            }
        });
        $(".list").delegate(".p_commodity_typeclick", "click", function () {
            
            location.href = "conve_list.html?typeid=" + $(this).attr("typeid");

        })
    }
    this.shopcar = function () {
        if (JSON.parse(eval($.cookie(managerMemory))) != null) {
            var paramsJson = {
                mobile: JSON.parse(eval($.cookie(managerMemory))).mobile
            }
            var data = {
                secretKey: "mobileSecretKey1234567890",
                opt: "getShopingCart",
                params: JSON.stringify(paramsJson)
            }
            $.post(interfaceApi, data, function (result) {
                var result = JSON.parse(result);
                if (result.messageCode == 1) {
                    if (result.resultObject.length > 0) {
                        $("#carMsgCnt").empty();
                        $('<div><img src="Assets/Images/car_cur.png" /><p style="color:#ff8600">购物车</p></div>').appendTo("#carMsgCnt");
                    }
                } else {
                    getBomBbox(result.message);
                }
            });
        } else {
            $("#carMsgCnt").empty();
            $('<div><img src="Assets/Images/car.png" /><p>购物车</p></div>').appendTo("#carMsgCnt");
        }
        

    }
    


    var init = function () {
        var paramsJson = {
            id: GetQueryString("id"),
        }
        var data = {
            secretKey: "mobileSecretKey1234567890",
            opt: "getGoodsDetail",
            params: JSON.stringify(paramsJson)
        }
        $.post(interfaceApi, data, function (result) {
            var result = JSON.parse(result);
            if (result.messageCode == 1) {
                $("<div class=\"swiper-slide img1\">"
                        + "<img src=\'" + imgdomain + result.resultObject.image1 + "' />"
                    + "</div>" +
                    "<div class=\"swiper-slide img2\">"
                        + "<img src=\'" + imgdomain + result.resultObject.image2 + "' />"
                    + "</div>" +
                    "<div class=\"swiper-slide img3\">"
                        + "<img src=\'" + imgdomain + result.resultObject.image3 + "' />"
                    + "</div>" +
                    "<div class=\"swiper-slide img4\">"
                        + "<img src=\'" + imgdomain + result.resultObject.image4 + "' />"
                    + "</div>" +
                    "<div class=\"swiper-slide img5\">"
                        + "<img src=\'" + imgdomain + result.resultObject.image5 + "' />"
                    + "</div>").appendTo(".swiper-wrapper");
                if (result.resultObject.image1 == "") { $(".img1").remove(); }
                if (result.resultObject.image2 == "") { $(".img2").remove(); }
                if (result.resultObject.image3 == "") { $(".img3").remove(); }
                if (result.resultObject.image4 == "") { $(".img4").remove(); }
                if (result.resultObject.image5 == "") { $(".img5").remove(); }

                var mySwiper = new Swiper('.swiper-container', {
                    //loop: true,
                    pagination: '.swiper-pagination',
                    //autoplay: 3500,
                    //autoplayDisableOnInteraction: false,
                });
                $('.pro_name h4').text(result.resultObject.name);
                $(".pro_name .unit_price").text(result.resultObject.price);
                var num = $(".number").val();
                var price = (parseFloat(result.resultObject.price)) * num;
                $(".price").text("￥" + (price));
                $(".shanimg").html("<img src=\'" + imgdomain + result.resultObject.image1 + "' />")
                $(".shantitle").html('<p>' + result.resultObject.name + '</p><p class="shanprice">￥' + result.resultObject.price + '</p>');
                $("#leftCnt").html("库存：" + result.resultObject.leftCnt);
                leftCnt = result.resultObject.leftCnt;
            }
            else {
                getBomBbox(result.message);
            }
        });


        $(".add").click(function () {
            var ss = parseInt($(this).parent().find(".number").val());
            ss++;
            var price = parseFloat($(".unit_price").text());
            if (ss <= leftCnt) {
                $(this).parent().find(".number").val(ss);
                $(".amount .number").val(ss);
                var money_p = parseFloat(parseFloat(ss * price).toFixed(3)).toFixed(2);
            }
            else {
                $(this).parent().find(".number").val(leftCnt);
                $(".amount .number").val(leftCnt);
                var money_p = parseFloat(parseFloat(leftCnt * price).toFixed(3)).toFixed(2);
            }
            $(".total .price").text("￥" + money_p);
        });

        $(".Red").click(function () {
            var ss = parseInt($(this).parent().find(".number").val());
            ss--;
            var price = parseFloat($(".unit_price").text());
            
            if (ss > 0) {
                $(this).parent().find(".number").val(ss);
                $(".amount .number").val(ss);
                var money_p = parseFloat(parseFloat(ss * price).toFixed(3)).toFixed(2);
            } else {
                $(this).parent().find(".number").val(1);
                $(".amount .number").val(1);
                var money_p = parseFloat(parseFloat( price).toFixed(3)).toFixed(2);
            }
            
            $(".total .price").text("￥" + money_p);
        });
    }
    //商品详细
    this.GoodsDetail = function () {
        $.cookie("productMessage", null, { expires: 365, path: '/' });
        var leftCnt = 0;
        init();
        
        $(".mai").click(function () {
            $(".meng").show();
            $(".mask").show();
        });
        $(".mask").click(function () {
            $(".meng").hide();
            $(".mask").hide();
        });

        $("#mai").click(function () {
            isLogin();
            setCookieNumber(GetQueryString("id"), $(".number").val());
            setCookieState(GetQueryString("id"), 1);
            location.href = "confirm_order.html?type=1" ;
        });

        $("#addcar").click(function () {
            isLogin();
            var paramsJson = {
                mobile: JSON.parse(eval($.cookie(managerMemory))).mobile,
                shopId: "1",
                goodsId: GetQueryString("id"),
                cuponId: "",
                goodsCount: $(".number").val(),
            }
            var data = {
                secretKey: "mobileSecretKey1234567890",
                opt: "addToShopingCart",
                params: JSON.stringify(paramsJson)
            }
            $.post(interfaceApi, data, function (result) {
                var result = JSON.parse(result);
                if (result.messageCode == 1) {
                    getBomBbox("宝贝已加入购物车");
                }
                else {
                    getBomBbox(result.message);
                }
            });
        })
    }
    
    

    //更多商品
    this.more = function () {
        var isCookie = JSON.parse($.cookie("IsmoreCookie"));
        if (isCookie == null) { getBomBbox("↑上拉加载更多"); $.cookie("IsmoreCookie", 1, { expires: 3650, path: "/" }); }
        var paramsJson = {
            goodsTypeId: GetQueryString("typeid"),
            shopId: "1",
            gotoPage: "1",
            pageSize: "8"
        }
        var data = {
            secretKey: "mobileSecretKey1234567890",
            opt: "getGoodsList",
            params: JSON.stringify(paramsJson)
        }
        $.post(interfaceApi, data, function (result) {
            var result = JSON.parse(result);
            if (result.messageCode == 1) {
                $.each(result.resultObject, function (i, item) {
                    $(".top span").html(i.split("_")[0]);
                    $.each(item, function (j, items) {
                        $('<div class="detail"><a class="choose" href="commodity_info.html?id=' + items.id + '&typeid=' + i.split("_")[1] + '"><div class="middle"><div class="images"><img src="' + imgdomain + items.image1 + '" /></div><div class="content"><p class="title">' + items.name + '</p><p class="intro">' + items.remark + '</p><p class="price">￥' + (items.price) + '</p></div></div></a><a id="addshop" goodsId="' + items.id + '">加入购物车</a></div>').appendTo(".list");
                    });
                })
            }
        });

        var pageindex = 2;
        var dropload = $('body').dropload({
            scrollArea: window,
            domDown: {
                domClass: 'dropload-down',
                domRefresh: '<div class="dropload-refresh">↑上拉加载更多</div>',
                domUpdate: '<div class="dropload-update">↓释放加载</div>',
                domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
            },
            loadDownFn: function (me) {
                var paramsJson = {
                    goodsTypeId: GetQueryString("typeid"),
                    shopId: "1",
                    gotoPage: ""+pageindex,
                    pageSize: "8"
                }
                var data = {
                    secretKey: "mobileSecretKey1234567890",
                    opt: "getGoodsList",
                    params: JSON.stringify(paramsJson)
                }
                $.post(interfaceApi, data, function (result) {
                    var result = JSON.parse(result);
                    if (result.messageCode == 1) {
                        $.each(result.resultObject, function (i, item) {
                            $.each(item, function (j, items) {
                                $('<div class="detail"><a class="choose" href="commodity_info.html?id=' + items.id + '"><div class="middle"><div class="images"><img src="' + imgdomain + items.image1 + '" /></div><div class="content"><p class="title">' + items.name + '</p><p class="intro">' + items.remark + '</p><p class="price">￥' + (items.price) + '</p></div></div></a><a id="addshop" goodsId="' + items.id + '">加入购物车</a></div>').appendTo(".list");
                            });
                        })
                        pageindex++;
                        setTimeout(function () {
                            me.resetload();
                        }, 500);
                    } else {
                        $('.dropload-load').text("没有更多数据了哟");
                        setTimeout(function () {
                            me.resetload();
                            //dropload.lock();
                        }, 500);
                    }
                });
            }
        });

        $(".list").delegate("#addshop", "click", function () {
            isLogin();
            var paramsJson = {
                mobile: JSON.parse(eval($.cookie(managerMemory))).mobile,
                shopId: "1",
                goodsId: $(this).attr("goodsId"),
                cuponId: "",
                goodsCount: "1"
            }
            var data = {
                secretKey: "mobileSecretKey1234567890",
                opt: "addToShopingCart",
                params: JSON.stringify(paramsJson)
            }
            $.post(interfaceApi, data, function (result) {
                var result = JSON.parse(result);
                if (result.messageCode == 1) {
                    getBomBbox("宝贝已加入购物车");
                }
                else {
                    getBomBbox(result.message);
                }
            });

        });
    }



    var setCookieNumber = function (goodId, number) {
        if ($.cookie("productMessage") == null) {
            var cookieList = [{ goodId: goodId, number: number, state: 0 }];
            $.cookie("productMessage", JSON.stringify(cookieList), { expires: 365, path: '/' });
        } else {
            var productMessage = JSON.parse($.cookie("productMessage"));
            var ishas = false;
            $.each(productMessage, function (i, item) {
                if (item.goodId == goodId) {
                    ishas = true;
                }
            });
            if (ishas) {
                $.each(productMessage, function (i, item) {
                    if (item.goodId == goodId) {
                        item.number = number
                    }
                });
            } else {
                productMessage.push({ goodId: goodId, number: number, state: 0 });
            }
            $.cookie("productMessage", JSON.stringify(productMessage), { expires: 3650, path: '/' });
        }
    }
    var setCookieState = function (goodId, state) {
        var productMessage = JSON.parse($.cookie("productMessage"));
        if (productMessage != null) {
            $.each(productMessage, function (i, item) {
                if (item.goodId == goodId) {
                    item.state = state
                }
            });
            $.cookie("productMessage", JSON.stringify(productMessage), { expires: 365, path: '/' });
        }

    }
}
