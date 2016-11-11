define(['jquery'],function($){
	function fixMove(){
		$("#right_content h3").mouseenter(function(event) {
			// console.log($(this).children());
			// console.log($(this).children().first());
			$(this).children().first().hide();
			$(this).children().last().animate({left:"0"}).show();
			$(this).children().last().mouseleave(function(event) {
				$(this).animate({left:"50"},200).hide();
				$(this).prev().show();
			});
		});
		$("#back").click(function(event) {
			$("body").scrollTop(0);
		});;
	}
	return fixMove;
	
})