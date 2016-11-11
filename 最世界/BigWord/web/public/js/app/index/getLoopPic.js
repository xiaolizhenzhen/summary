define(["jquery","app/comment/getUrl","myUtil"],function($,baseUrl,xhr){
	var url = baseUrl.getBaseURL();

	//获取banner图片
	function getLoopPic(){
		var x = xhr(); //创建ajax对象
		x.open("get",url+"/getloopPic");
		x.send(null);
		x.onreadystatechange = function(){
			if (x.readyState == 4) {
				// console.log(x.responseText);
				var data = JSON.parse(x.responseText);
				for(var i = 0; i < data.length; i++){
					//console.log(data[i].imgUrl);
					//console.log(data[i].href);

					$("#banner .banner_pic:first").append(
						// $("<a></a>").attr("href",data[i].href).append(
							$("<img/>").attr("src",data[i].imgUrl)
						// )
					);
				}
				loop();
			} 
		}
	}

	//轮拨图效果
	function loop(){
		var banner_timer = setInterval(change_pic,2000);
		var imgNum = $("#banner .banner_pic:first img");
		var dotNum = $(".banner_dot span");
		var count = 0;
		var current_index = 0; //用于表示当前的图片和小圆点
		$(dotNum[0]).addClass('active');//初始化第一个小点点的颜色
		function change_pic(){
			if (count < imgNum.length-1) {
				count +=1;
			} else{
				count = 0;
			};
			current_index = count;
			// console.log(current_index);
			//console.log(count+"   count");
			$(".banner_pic").animate({left:-current_index*($("#banner").width())});
			$(dotNum).removeClass('active');
			$(dotNum[current_index]).addClass('active');
		};



		//广告栏鼠标移入移出事件
		$("#banner").mouseenter(function(event) {
			$("#banner>img:first").show();
			$("#banner>img:last").show();
			clearInterval(banner_timer);
			
			//左右侧的点击事件
			$("#banner>img:first").on("click",subPic);
			function subPic() {
				if (current_index > 0) {
					current_index -= 1;
				} else{
					current_index = 3;
				};
				$(".banner_pic").animate({left:-current_index*($("#banner").width())}, 500);
				$(dotNum).removeClass('active');
				$(dotNum[current_index]).addClass('active');
				count = current_index;

				//console.log(current_index + "   ----轮拨");
			}

			$("#banner>img:last").on('click', addPic);
			function addPic() {
				if (current_index < 3) {
					current_index += 1;
				} else{
					current_index = 0;
				};
				$(".banner_pic").animate({left:-current_index*($("#banner").width())}, 500);
				$(dotNum).removeClass('active');
				$(dotNum[current_index]).addClass('active');
				count = current_index;

				//console.log(current_index + "   +++++轮拨");

			}

			//小点点的鼠标移入移出事件
			for(var i = 0; i < dotNum.length; i++){
				clearInterval(banner_timer);
				//这里使用闭包保存当前点击的元素
				(function(i){
					var t = i;
					$(dotNum[i]).click(function(event) {
						current_index = t;
						//console.log(current_index);
						$(".banner_pic").animate({left:-current_index*($("#banner").width())});
						$(dotNum).removeClass('active');
						$(dotNum[current_index]).addClass('active');
						count = current_index;
						//console.log(current_index+"  click");
					});
				})(i)
			}
			
		}).mouseleave(function(event) {
			$("#banner>img:first").hide();
			$("#banner>img:last").hide();
			banner_timer = setInterval(change_pic,2000);
		});
	}

	return getLoopPic;
})