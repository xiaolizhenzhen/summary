define(["jquery","./getUrl"],function($,baseurl){
	var url = baseurl.getBaseURL();
	function getMenu(){
		$.ajax({
			url: url+'/getMenu',
			type: 'GET'
		})
		.done(function(data) {
			//console.log(data);
			createMenuLi(data);
		})
	};

	function createMenuLi(data){
		//console.log(data);
		for(var i = 0; i < data.length; i++){
			var CP = $("<p></p>");
			var li = $("<li></li>");
			$("#menu").append(li);
			li.append(
				$("<dl></dl>").append(
					$("<dt></dt>").append(
						$("<img/>").attr("src","../imgs/list0"+(i+1)+".gif")
					)
				).append(
					$("<dd></dd>").append(
						$("<h6></h6>").append(
							$("<a></a>").html(data[i].title)
						)
					).append(
						CP
					).append(
						$("<p>></p>")
					)
				)
			);
			for(var j = 0; j < data[i].mainCity.length; j++){
				CP.append(
					$("<a></a>").html(data[i].mainCity[j])
				)
			};
			//console.log(data[i]["moreCityImg"]);
			//用data关联数据
			li.data('moreCity',data[i]["moreCity"]).mouseenter(function(event) {
				var itemsObj = $(this).data("moreCity");
				//console.log(itemsObj);
				//console.log($(this).index());

				if ($(this).index() == 5) {
					$(this).append(
						$("<div></div").addClass("menu_content2").empty().show()
					);
						// console.log(itemsObj);
						// console.log(itemsObj.length);
						// console.log(itemsObj[0]);
						var OP = $("<p></p>");
						$(".menu_content2").append(
							$("<h4></h4>").html(itemsObj[0].cityName)
						).append(
							OP
						);
						for(var p = 0; p < itemsObj[0].items.length; p++){
							OP.append(
								$("<img/>").attr("src",itemsObj[0].items[p])
							)
						}
				} else{
					$(this).append(
						$("<div></div").addClass("menu_content1").show().empty().css("display","block")
					);
					//变量数组
					for(var m = 0; m < itemsObj.length; m++){
						var cp = $("<p></p>");
						$(".menu_content1").append(
							$("<div></div>").append(
								$("<h4></h4>").html(itemsObj[m].cityName)
							).append(cp)
						)
						//遍历数组
						for(var n = 0; n < itemsObj[m].items.length; n++){
							//console.log(itemsObj[m].items[n]);
							cp.append(
								$("<a></a>").html(itemsObj[m].items[n])
							)
						}
					}

					$(".menu_content1").append(
						$("<div></div>").append(
							$("<img/>").attr("src",data[$(this).index()]["moreCityImg"])
						)
					)
				};

				$(this).addClass('active');
				$(this).children("dl").children("dd").children("h6").addClass('active_font');

			}).mouseleave(function(event) {
				$("#menu li").removeClass('active');
				$("#menu li dl dd h6").removeClass('active_font');
				$(".menu_content1").hide();
				$(".menu_content2").hide();
			});
		}
	};


	return getMenu;
})