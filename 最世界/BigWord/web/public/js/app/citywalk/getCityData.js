define(["jquery","app/comment/getUrl"],function($,baseurl){
	var url = baseurl.getBaseURL();

	//获取citywalk页面数据
	function getCityData(){
		$.ajax({
			url: url + '/getCityWalk',
			type: 'GET'
		})
		.done(function(data) {
			createDl(data);
		})
	}

	//动态添加数据到页面
	function createDl(data){
		var totalData = data.length;//获取总数据
		var oneNum = 5;  //定义每页加载多少条数据
		var pageNum= Math.ceil(totalData/oneNum); //向上取整，获取总页数
		var currentPage = 1; //当前页数
		//console.log(totalData);
		//console.log(pageNum);
		//创建分页符
		createPage(pageNum);
		
		//为分页符绑定事件
		var page = $("#fenye span");
		for(var j = 0; j < page.length; j++){
			//console.log(page[j]);
			page[j].addEventListener("click",pageClick);
		}

		function pageClick(){
			//console.log(this);
			
			$("#fenye span").removeClass('active');
			this.setAttribute("class","active");
			currentPage = parseInt(this.innerHTML);
			console.log(currentPage +"  点击 ");
			addDataPage(currentPage,oneNum,data);
		}

		$("#fenye span:first").trigger('click');

		//上一页的点击事件
		$("#bef").on('click', function(event) {
			event.preventDefault();
			if (currentPage > 1) {
				currentPage--;
			} else{
				currentPage = 1;
			};
			console.log(currentPage +"  上一页 ");
			//console.log(page[currentPage]);
			$(page[currentPage-1]).trigger("click");
		}).on('mouseover', function(event) {
			event.preventDefault();
			$(this).css("background","pink");
		}).on('mouseout', function(event) {
			event.preventDefault();
			$(this).css("background","#495");
		});

		//下一页的点击事件
		$("#aft").on('click', function(event) {
			event.preventDefault();
			if (currentPage < pageNum) {
				currentPage++;
			} else{
				currentPage = pageNum;
			};
			console.log(currentPage + "  下一页 ");
			$(page[currentPage-1]).trigger("click");
		}).on('mouseover', function(event) {
			event.preventDefault();
			$(this).css("background","pink");
		}).on('mouseout', function(event) {
			event.preventDefault();
			$(this).css("background","#495");
		});
	}

	//动态创建分页符
	function createPage(p){
		for(var i = 1; i <= p; i++){
			var A = $("<span></span>").html(i);
			$("#fenye").append(A);
		}
	}

	//动态添加数据到页面
	function addDataPage(m,oneNum,data){
		$("#content").empty();
		for(var i = m; i < (m+oneNum); i++){
			//console.log(data[i]);
			var oul = $("<ul></ul>");
			$("#content").append(
				$("<dl></dl>").append(
					$("<dt></dt>").append(
						$("<img/>").attr("src",data[i].imgurl)
					)
				).append(
					$("<dd></dd>").append(
						$("<h6/>").append(
							$("<p/>").html(data[i].address)
						).append(
							$("<p/>").html("浏览量").append(
								$("<span/>").html(data[i].browseCount)
							).append(
								$("<b/>").html("销售量")
							).append(
								$("<span/>").html(data[i].soldCount)
							)
						)
					).append(
						$("<p/>").html(data[i].title)
					).append(
						oul
					).append(
						$("<p/>").html("原价：").append(
							$("<span/>").html(data[i].oldPrice+"元")
						).append(
							$("<b/>").html("现价："+data[i].newPrice)
						)
					).append(
						$("<button/>").html("立即预定")
					)
				)
			);
			for(var index in data[i].introduce){
				oul.append(
					$("<li/>").html(data[i].introduce[index])
				)
			};
		}
	}

	return getCityData;
})