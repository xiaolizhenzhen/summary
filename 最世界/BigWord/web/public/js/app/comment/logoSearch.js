define(["jquery",'./getUrl'],function($,baseUrl){
	function getLogKey(){
		var url = baseUrl.getBaseURL();
		// var logoArr = [];
		$("#logo_search").focus(function(event) {
			
			$("#logo_search_result").show("slow");
		}).keyup(function(event) {
			var inputVal = $("#logo_search").val();
			console.log(inputVal);
			$.ajax({
				url: '/getLogoKey',
				type: 'GET',
				data: {keyval: inputVal},
			})
			.done(function(data) {
				$("#logo_search_content").empty();
				var objData = JSON.parse(data)["data"]["keywords"];
				if (objData.length > 0) {
					for(var i = 0; i < objData.length; i++){
						//console.log(objData[i].title);
						$("#logo_search_content").append(
							$("<li></li>").append(
								$("<span></span>").html(objData[i].title)
							).append(
								$("<span></span>").html(objData[i].type)
							)
						)
					}
				} else{
					$("#logo_search_content").append(
						$("<li></li>").html("没有匹配的数据，请从新输入")
					)
				};
			})
			
		}).blur(function(event) {
			$("#logo_search_result").hide("slow");
		});
	}
	return getLogKey;
})