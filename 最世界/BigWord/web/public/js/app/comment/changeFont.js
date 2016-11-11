define(["jquery"],function($){
	function changeFont(){
		var nav_span = ["接送机","Wi-Fi","电话卡","门票","一日游"];
		var cnt = 0; 
		var timer = setInterval(change_font,2000);
		$("#change").mouseover(function(event) {
			clearInterval(timer);
		}).mouseout(function(event) {
			timer = setInterval(change_font,2000);
		});
		//改变文字
		function change_font(){
			if (cnt < nav_span.length-1) {
				cnt++;
			} else{
				cnt = 0;
			};
			//console.log(nav_span[cnt]);
			$("#change").html(nav_span[cnt]);
		}
	}
	return changeFont;
})