/*首页的图片轮播*/
var index=function(){
	/*加载页面*/
    this.indexList = function () {
        var paramsJson = {}
        var data = {
			opt: "index",
            secretKey: "mobileSecretKey1234567890",
            params: JSON.stringify(paramsJson)
        }
        $.post(interfaceApi, data, function (result) {
            var result = JSON.parse(result);
            if (result.messageCode == 1) {
                $.each(result.resultObject.resultObject, function (i, item) {
					$("<div class=\"swiper-slide img1\">"
							+"<a href=\"recommend_detail.html?id="+item.id+"\">"
								+"<img src=\'"+ imgdomain + item.image1 + "' />"
							+"</a>"
						+"</div>"+
						"<div class=\"swiper-slide img2\">"
							+"<a href=\"recommend_detail.html?id="+item.id+"\">"
								+"<img src=\'"+ imgdomain + item.image2 + "' />"
							+"</a>"
						+"</div>"+
						"<div class=\"swiper-slide img3\">"
							+"<a href=\"recommend_detail.html?id="+item.id+"\">"
								+"<img src=\'"+ imgdomain + item.image3 + "' />"
							+"</a>"
						+"</div>"+
						"<div class=\"swiper-slide img4\">"
							+"<a href=\"recommend_detail.html?id="+item.id+"\">"
								+"<img src=\'"+ imgdomain + item.image4 + "' />"
							+"</a>"
						+"</div>"+
						"<div class=\"swiper-slide img5\">"
							+"<a href=\"recommend_detail.html?id="+item.id+"\">"
								+"<img src=\'"+ imgdomain + item.image5 + "' />"
							+"</a>"
						+"</div>").appendTo(".swiper-wrapper");
						if(item.image1==""){$(".img1").remove();}
						if(item.image2==""){$(".img2").remove();}
						if(item.image3==""){$(".img3").remove();}
						if(item.image4==""){$(".img4").remove();}
						if(item.image5==""){$(".img5").remove();}
				});
				var mySwiper = new Swiper('.swiper-container', {
            		loop: true,
            		pagination: '.swiper-pagination',
            		autoplay: 3500,
            		autoplayDisableOnInteraction: false,
        });
            }
            else if (result.messageCode == 3) {
                getBomBboxyb(result.message);
                setTimeout(function () {
                    location.href = "login.html";
                }, 3000);
            }
            
            else {
                getBomBbox(result.message);
            }
        });
        information();
	}

	this.notice=function(){
		var paramsJson = {
            type: "7",
			gotoPage:"1",
			pageSize:"8"
        }
        var data = {
			opt: "getNoticeOrActiveList",
            secretKey: "mobileSecretKey1234567890",
            params: JSON.stringify(paramsJson)
        }
         $.post(interfaceApi, data, function (result) {
            var result = JSON.parse(result);
            if (result.messageCode == 1) {
            	$.each(result.resultObject, function (i, item) {
            	    $("#scroll_begin").append(item.theContent);
            	});
            	ScrollImgLeft(30);
			}
			
        });
	}

	this.information=function(){
		var paramsJson = {
            type: "8",
			gotoPage:"1",
			pageSize:"1"
        }
        var data = {
			opt: "getNoticeOrActiveList",
            secretKey: "mobileSecretKey1234567890",
            params: JSON.stringify(paramsJson)
        }
         $.post(interfaceApi, data, function (result) {
            var result = JSON.parse(result);
            if (result.messageCode == 1) {
				$.each(result.resultObject, function (i, item) {
		      		$('<a href="information_detail.html?id='+item.id+'"><div class="newsimg"><img src="'+imgdomain+item.image1+'" /></div><div class="news"><p class="bt">'+item.name+'</p><p class="nr">'+item.shortDesc+'</p></div></a>').appendTo(".newscontent");
		       });
            	if(result.resultObject!=null && result.resultObject[0].image1==null && result.resultObject[0].image1==""){
 					$(".newsimg").hide();
            	}
			}
			
        });
	}
}