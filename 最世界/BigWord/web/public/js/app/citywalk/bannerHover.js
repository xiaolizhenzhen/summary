define(["jquery"],function($){
	function load(){
		$("#menu").hide();
		$("#hot").mouseenter(function(event) {
			$("#hot span").css("color","green");
			$("#menu").show();
		}).mouseleave(function(event) {
			$("#menu").hide();
			$("#hot span").css("color","black");
		});
	}
	return load;
})
