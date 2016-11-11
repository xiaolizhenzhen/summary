//define 定义一个模块
define(["jquery"],function($){
	function header(){
		//h1导航下拉菜单效果
		$("#shequ").mouseenter(function(event) {
			$("#sq").show();
			$("#lx").mouseenter(function(event) {
				$("#lxlt").show();
			}).mouseleave(function(event) {
				$("#lxlt").hide();
			});
		}).mouseleave(function(event) {
			$("#sq").hide();
		});
		$("#yd").mouseenter(function(event) {
			$("#sqyd").show();
		}).mouseleave(function(event) {
			$("#sqyd").hide();
		});
	}
	return header;
})