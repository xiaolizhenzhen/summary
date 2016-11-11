define(["jquery","./getUrl"],function($,baseUrl){
	function getKey(){
		var url = baseUrl.getBaseURL();
		// var Arr = [];
		$("#key_search").mouseenter(function(event) {
			$("#key").show('slow');
			$("#key_input").focus(function(event) {
				$("#key_input").keyup(function(event) {
					var keyVal = $("#key_input").val();
					//console.log(keyVal);
					$.ajax({
						url: url+"/getKey/"+keyVal,//方法一
						// url: url+"/getKey",//方法二
						// data:{key:keyVal},//方法二传参
						type: 'GET'
					})
					.done(function(data) {
						//console.log(data);
						var objData = JSON.parse(data);
						var listArr = objData.data.list;
						$("#seach_result").show().empty();

						//console.log(listArr);
						if (listArr.length>0) {
							var oul = $("<ul></ul>");
							for(var i = 0; i < listArr.length; i++){
								if (listArr[i].type_name == "item") {
									$("#seach_result").append(
										$("<dl></dl>").append(
											$("<dt></dt>").append(
												$("<img />").attr("src",listArr[i].src)
											)
										).append(
											$("<dd></dd>").append(
												$("<p></p>").append(
													$("<span></span>").html(listArr[i].cn_name)
												).append(
													$("<span></span>").html(listArr[i].en_name)
												)
											).append(
												$("<p></p>").append(
													$("<span></span>").html(listArr[i].belong_name)
												)
											)
										)
									)
								} else if (listArr[i].type_name == "word"){
									oul.append(
										$("<li></li>").append(
											$("<a></a>").html(listArr[i].word).attr("href",listArr[i].url)
										)
									)
								};
							}
							$("#seach_result").append(oul);
						} else{
							$("#seach_result").append(
								$("<ul><li>没有相关数据</li></ul>")
							)
						}
					})
				});
			}).blur(function(event) {
				$("#seach_result").hide().empty();
				$("#key").hide("slow");
				$("#key_input").val("");
			});

		}).mouseleave(function(event) {
			$("#key_input").val("");
		});
	}

	return getKey;
})