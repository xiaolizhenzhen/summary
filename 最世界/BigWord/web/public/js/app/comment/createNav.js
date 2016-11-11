define(["jquery","./getUrl"],function($,baseurl){
	var url = baseurl.getBaseURL();
	return function(){
		$.ajax({
			url: url+'/znav',
			type: 'GET'
		})
		.done(function(data) {
			var cp = $("<p></p>");
			for(var i = 0; i < data.length;i++){
				cp.append(
					$("<a href='#'></a>").html(data[i]["name"]).attr("href",data[i]["url"]).mouseover(function(event) {
						$(this).css({"background":"#eee","color":"green"});
					}).mouseout(function(event) {
						$(this).css({"background":"#fff","color":"black"});
					})
				);
			}
			// $("#nav p a:last").attr("href","")
			$("#nav").append(cp);
			$("#nav p a:first").trigger('mouseover').css("background","#fff");

		})
	}

})