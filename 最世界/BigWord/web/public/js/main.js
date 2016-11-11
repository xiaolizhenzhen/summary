requirejs.config({
	baseUrl:"../js/lib", //index.html的根路径
	paths:{
		"app":"../app", //其它js文件
		"jquery":"jquery-3.1.1",
		"myUtil":"../app/comment/myUtil"    //未用define定义的依赖文件的路径
	},
	shim:{   //为未用define定义的依赖做声明
		"myUtil" :{
			exports : "createXHR"
		}
	}
});
