// 地址详情
/*获取家政服务、社区黄页和商品的详情信息*/
var address = function() {
	/*加载页面*/
	this.addressLocation = function() {
		var paramsJson = {
			id: GetQueryString("id")
		}
		var data = {
			secretKey: "mobileSecretKey1234567890",
			opt: "getMerchantDetail",
			params: JSON.stringify(paramsJson)
		}

		$.post(interfaceApi, data, function(result) {
			var result = JSON.parse(result);
			if (result.messageCode == 1) {
				var id = GetQueryString("id");
				var code = GetQueryString("code");
				$('<a id="pageBack" href="business_detail.html?id=' + result.resultObject.id + '&code=' + result.resultObject.bigType.code + '"><img src="Assets/Images/left.png" /></a><span>地址详情</span>').appendTo(".top");

			}

		});


		var address = decodeURI(GetQueryStringCn("address"));
		var map = new BMap.Map("allmap"); // 创建Map实例
		var point = new BMap.Point(116.331398, 39.897445); // 初始化地图,用坐标设置地图中心点，为上海市



		// 创建地址解析器实例
		var myGeo = new BMap.Geocoder();
		// 将地址解析结果显示在地图上,并调整地图视野
		myGeo.getPoint(address, function(point) {
			if (point) {
				map.centerAndZoom(point, 19);
				var marker = new BMap.Marker(point); //创建标注
				map.addOverlay(marker); //将标注添加到地图

				marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
				map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
				map.setCurrentCity("上海"); // 设置地图显示的城市 此项是必须设置的
				map.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用
				map.enableContinuousZoom(); //启用地图惯性拖拽，默认禁用
				// map.addTileLayer(new BMap.TrafficLayer());// 将图层添加到地图上

				//实例化一个本地搜索服务
				// var local = new BMap.LocalSearch(map, {
				// 	renderOptions: {
				// 		map: map,
				// 		panel: "results"
				// 	}
				// });
				// local.search(address);

				// var ctrl = new BMapLib.TrafficControl({
				// 	showPanel: false //是否显示路况提示面板
				// });
				// map.addControl(ctrl);
				// ctrl.setAnchor(BMAP_ANCHOR_BOTTOM_RIGHT);

				var infoWindow = new BMap.InfoWindow("<p style='font:bold 12px 微软雅黑;'>地址：" + address + "</p>");
				marker.openInfoWindow(infoWindow); //标注的信息
				marker.addEventListener("click", function() { //给标注添加点击事件
					this.openInfoWindow(infoWindow, map.getCenter());
				});


				// 添加带有定位的导航控件
				var navigationControl = new BMap.NavigationControl({
					// 靠左上角位置
					anchor: BMAP_ANCHOR_TOP_LEFT,
					// 控件外观
					type: BMAP_NAVIGATION_CONTROL_LARGE,
					// 启用显示定位
					enableGeolocation: true
				});
				map.addControl(navigationControl);

				// 添加定位控件
				// var geolocationControl = new BMap.GeolocationControl();
				// geolocationControl.addEventListener("locationSuccess", function(e) {
				// 	// 定位成功事件
				// 	var address = '';
				// 	address += e.addressComponent.province;
				// 	address += e.addressComponent.city;
				// 	address += e.addressComponent.district;
				// 	address += e.addressComponent.street;
				// 	address += e.addressComponent.streetNumber;
				// 	getBomBbox("当前定位地址为：" + address);
				// });
				// geolocationControl.addEventListener("locationError", function(e) {
				// 	// 定位失败事件
				// 	getBomBbox(e.message);
				// });
				// map.addControl(geolocationControl);

				var menu = new BMap.ContextMenu();
				var txtMenuItem = [{
					text: '放大',
					callback: function() {
						map.zoomIn()
					}
				}, {
					text: '缩小',
					callback: function() {
						map.zoomOut()
					}
				}];
				for (var i = 0; i < txtMenuItem.length; i++) {
					menu.addItem(new BMap.MenuItem(txtMenuItem[i].text, txtMenuItem[i].callback, 100));
				}
				map.addContextMenu(menu);
			} else {
				getBomBbox("您选择地址没有解析到结果!");
			}
		}, "上海市");



		function G(id) {
			return document.getElementById(id);
		}

		//var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
		//    {
		//        "input": "suggestId"
		//    , "location": map
		//    });

		//ac.addEventListener("onhighlight", function (e) {  //鼠标放在下拉列表上的事件
		//    var str = "";
		//    var _value = e.fromitem.value;
		//    var value = "";
		//    if (e.fromitem.index > -1) {
		//        value = _value.province + _value.city + _value.district + _value.street + _value.business;
		//    }
		//    str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

		//    value = "";
		//    if (e.toitem.index > -1) {
		//        _value = e.toitem.value;
		//        value = _value.province + _value.city + _value.district + _value.street + _value.business;
		//    }
		//    str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
		//    G("searchResultPanel").innerHTML = str;
		//});

		//var myValue;
		//ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
		//    var _value = e.item.value;
		//    myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
		//    G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;

		//    setPlace();
		//});

		function setPlace() {
			map.clearOverlays(); //清除地图上所有覆盖物
			function myFun() {
				var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
				map.centerAndZoom(pp, 18);
				map.addOverlay(new BMap.Marker(pp)); //添加标注
			}
			var local = new BMap.LocalSearch(map, { //智能搜索
				onSearchComplete: myFun
			});
			local.search(myValue);
		}
	}
}