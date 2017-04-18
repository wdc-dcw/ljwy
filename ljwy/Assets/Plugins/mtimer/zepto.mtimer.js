(function ($) {
    $.fn.mtimer = function(opts){
		var defaults = {
			dateStart : new Date(),
			dateNum : 10,
			timeStart : 9,
			timeNum : 12,
			onOk : null,
			onCancel : null,
		};
		var option = $.extend(defaults, opts);

		var input = $(this),
			itemHeight = 48;
		var picker = {
			input : null,
			init : function(){
				var _this = this;

				//初始化点击input事件
				input.on('tap', function(){
					_this.input = $(this);
					if($('.mt_mask').length){
						_this.hidePanel();
					}else{
						_this.renderHTML();//添加html
						var container = $('.mt_poppanel'),
							mpDate = $('.mt_date', container),
							mpTime = $('.mt_time', container);

						_this.afterRenderHTML(container,mpDate,mpTime);//生成日期选择和滑动事件
						_this.pancelBind(container,mpDate,mpTime);//对html绑定日期选择事件
						_this.showPanel();
						//初始化原有的数据
						_this.setValue();
					}
				});
			},
			renderHTML : function(){
				var stime = option.timeStart + ':00';
				var etime = option.timeStart + option.timeNum + ':00';
				var html = '<div class="mt_mask"></div><div id="mtimer" class="mt_poppanel"><div class="mt_panel"><h3 class="mt_title">请选择时间</h3><div class="mt_body"><div class="mt_date"><ul><li class="mt_note">上下滚动选取时间</li><li></li></ul></div><div class="mt_time"><ul><li class="mt_note">可选时间：'+stime+'-'+etime+'</li><li></li></ul></div><div class="mt_indicate"></div></div><div class="mt_confirm"><a href="javascript:void(0);" class="mt_ok">确定</a> <a href="javascript:void(0);" class="mt_cancel">取消</a></div></div></div>';
				$(document.body).append(html);
			},
			afterRenderHTML : function (container,mpDate,mpTime) {
				var _this = this;
				//初始化date
				var dateStr = '',
					dateStart = option.dateStart,
					sYear = dateStart.getFullYear(),
					sMonth = dateStart.getMonth(),
					sDate = dateStart.getDate();
				for(var i=0; i<option.dateNum; i++){
					var nextDate = new Date(sYear, sMonth, sDate+i),
						m = nextDate.getMonth()+1,
						d = nextDate.getDate(),
						da = nextDate.getDay(),
						w = '日一二三四五六'.charAt(da),
						sel = i == 0 ? 'selected' : '';
					if(m < 10){
						m = '0' + m;
					}
					if(d < 10){
						d = '0' + d;
					}
					dateStr += '<li class="'+sel+'" data-date="'+m+'-'+d+'">'+m+'月'+d+'日&nbsp;星期'+w+'</li>';
				}
				dateStr += '<li></li><li></li>';
				mpDate.find('ul').append(dateStr);

				//初始化time
				var timeStr = '';
				for(var j=0; j<option.timeNum; j++){
					var t = option.timeStart + j,
						sel = j == 0 ? 'selected' : '';
					timeStr += '<li class="'+sel+'" data-time="'+t+':00">'+t+':00</li><li data-time="'+t+':30">'+t+':30</li>';
					if(j==option.timeNum - 1){
						timeStr += '<li data-time="'+(t+1)+':00">'+(t+1)+':00</li>';
					}
				}
				timeStr += '<li></li><li></li>';
				mpTime.find('ul').append(timeStr);

				//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);//阻止默认touch事件
				//初始化scroll
				var elHeight = itemHeight;
				var dateScroll = new IScroll('.mt_date', {
					snap : 'li',
					probeType : 2,
					tap : true
				});
				dateScroll.on('scroll', function(){
					_this.updateSelected(mpDate, this);
				});
				dateScroll.on('scrollEnd', function(){
					_this.updateSelected(mpDate, this);
				});
				var timeScroll = new IScroll('.mt_time', {
					snap : 'li',
					probeType : 2,
					tap : true
				});
				timeScroll.on('scroll', function(){
					_this.updateSelected(mpTime, this);
				});
				timeScroll.on('scrollEnd', function(){
					_this.updateSelected(mpTime, this);
				});

				this.dateScroll = dateScroll;
				this.timeScroll = timeScroll;
			},
			pancelBind : function (container,mpDate,mpTime) {
				var _this = this;
				//初始化点击li
				mpDate.find('li').on('tap', function(){
					_this.checkDate($(this));
				});
				mpTime.find('li').on('tap', function(){
					_this.checkTime($(this));
				});
				//初始化点击事件
				$('.mt_ok', container).on('tap', function(){
					var date = mpDate.find('.selected').data('date');
					var time = mpTime.find('.selected').data('time');
					_this.input.val(date + ' ' + time);
					_this.hidePanel();
					option.onOk && typeof option.onOk=='function' && option.onOk(container);
				});
				$('.mt_cancel', container).on('tap', function(){
					_this.hidePanel();
					option.onCancel && typeof option.onCancel=='function' && option.onCancel(container);
				});
				$('.mt_mask').on('tap', function(){
					_this.hidePanel();
				});
			},
			updateSelected : function(container, iscroll){
				var index = (-iscroll.y) / itemHeight + 2;
				var current = container.find('li').eq(index);
				current.addClass('selected').siblings().removeClass('selected');
			},
			showPanel : function(container){
				$('.mt_poppanel, .mt_mask').addClass('show');
			},
			hidePanel : function(){
				$('.mt_poppanel, .mt_mask').remove();
				this.dateScroll = null;
				this.timeScroll = null;
			},
			setValue : function(){
				var value = this.input.val();
				var dateArr = value.split(' '),
					date = dateArr[0],
					time = dateArr[1],
					dateItem = $('.mt_date li[data-date="'+date+'"]'),
					timeItem = $('.mt_time li[data-time="'+time+'"]');
				this.checkDate(dateItem);
				this.checkTime(timeItem);
			},
			checkDate : function(el){
				var target = el.prev('li').prev('li');
				this.dateScroll.scrollToElement(target[0]);
			},
			checkTime : function(el){
				var target = el.prev('li').prev('li');
				this.timeScroll.scrollToElement(target[0]);
			}
		}
		picker.init();
		return picker;
	}
	return $.fn.mtimer;
})(Zepto);
