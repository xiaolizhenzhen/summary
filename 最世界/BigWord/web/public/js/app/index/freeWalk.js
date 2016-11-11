define(["jquery","app/comment/getUrl"],function($,baseUrl){
	var url = baseUrl.getBaseURL();
	function freeWalk(){
		$.ajax({
			url: url+'/FreeWalk',
			type: 'GET',
		})
		.done(function(data) {
			createFree(data);
		})
	};

	function createFree(data){
		//console.log(data);
		for(var i = 0; i < data.length; i++){
			var pa = $("<a></a>").html(data[i].title);
			pa.data("data",data[i].data).mouseenter(function(event) {
				var objArr = $(this).data("data");
				$("#tab a").removeClass('active');
				$("#tab a:first").css("color","#6d6767");
				$(this).addClass('active').css("color","green");
				//console.log(objArr);
				$("#free_walker_content>ul").empty();
				for(var j = 0; j < objArr.length; j++){
					$("#free_walker_content>ul").append(
						$("<li></li>").append(
							$("<dl></dl>").append(
								$("<dt></dt>").append(
									$("<img/>").attr("src",objArr[j].imgUrl)
								).append(
									$("<p></p>").html("机酒")
								).append(
									$("<p></p>").append(
										$("<span></span").html(objArr[j].price)
									).append(
										$("<b></b>").html("元起")
									)
								)
							).append(
								$("<dd></dd>").append(
									$("<p></p>").html(objArr[j].title)
								)
							)
						)
					)
				}
			}).mouseleave(function(event) {
				$(this).removeClass('active').css("color","#6d6767");
			});
			$("#tab").append(pa);
		}
		$("#tab a:first").trigger('mouseenter');

	}
	return freeWalk;
})