var express = require("express"),
	fs = require("fs"),
	http = require("http");
var app = new express();
//var router = express.Router();
//express.Router 类创建模块化、可挂载的路由句柄。Router 实例是一个完整的中间件和路由系统，因此常称其为一个 “mini-app”。
// app.route()创建路由路径的链式路由句柄。由于路径在一个地方指定，这样做有助于创建模块化的路由，而且减少了代码冗余和拼写错误。

//提供web服务功能
app.use(express.static("public"));

//设置所有的请求都要使用的cross跨域解决方法
app.all("/*",function(req,res,next){
	//console.log('总是执行的文件');
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
   	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
   	next();
})

//存储从文件读取的数据。
var NavData = null;
var BannerData = null;
var MenuData = null;
var freeData = null;
var cityData = null;



//先读取所有的数据，读取成功开启服务器
//避免由于文件没有加载完成时用户发出请求，服务器响应的数据不正确
//读取文件的方式有两种：异步读取和同步读取
//这里使用链式异步读取的方式
fs.readFile("data/nav.json",function(err1,data){
	if (err1) {
		console.log(err1);
	}
	NavData = data;
	fs.readFile("data/index/banner.json",function(err2,dat){
		if (err2) {
			console.log(err2);
		}
		BannerData = dat;
		fs.readFile("data/index/menu.json",function(err3,da){
			if (err3) {
				console.log(err3);
			}
			MenuData = da;
			fs.readFile("data/index/freeWalk.json",function(err4,d){
				if (err4) {
					console.log(err4);
				}
				freeData = d;
				fs.readFile("data/citywalk/cityWalkList.json",function(err5,cData){
					if (err5) {
						console.log(err5);
					} 
					cityData = cData;
					app.listen(8888,function(){
						console.log("服务器启动成功！");
					});
				});
			});
		});
	});
});

//读取首页
app.get("/",function(req,res,next){
	res.sendFile(__dirname + "/public/html/index.html");
});

// 获取导航栏信息
app.get("/znav",function(req,res,next){
	res.header("Content-type","application/json");
	res.send(JSON.parse(NavData));
});

// 获取轮拨图图片信息
app.get("/getloopPic",function(req,res,next){
	res.header("Content-type","application/json");
	res.send(BannerData);
});

//获取menu数据
app.get("/getMenu",function(req,res,next){
	res.header("Content-type","application/json");
	res.send(MenuData);
});

//获取freewalk数据
app.get("/FreeWalk",function(req,res,next){
	res.header("Content-type","application/json");
	res.send(freeData);
});

//页面跳转，加载CityWalk页面数据
app.get("/CityWalk.html",function(req,res,next){
	res.sendFile(__dirname + "/public/html/CityWalk.html");
});

//获取citywalk页面数据
app.get("/getCityWalk",function(req,res,next){
	res.header("Content-type","application/json");
	res.send(cityData);
});


//方法一：
//获取key_seach
//利用suggest组件
app.get("/getKey/:key",function(req,res,next){
	//console.log(req.params.key);
	var keySeach = req.params.key;
	//res.send(keySeach);
	//console.log(keySeach);
	//查询目的机http://z.qyer.com/qcross/home/ajax?action=sitesearch&keyword=guojia&timer=1478747259096&_=1478747227864
	var sreq = http.request({
		host:"z.qyer.com",//目标主机
		path:"/qcross/home/ajax?action=sitesearch&keyword="+keySeach,//目标路径
		method:"get" //请求方式
	},function(sres){
		sres.pipe(res);
		sres.on("end",function(){
			console.log("done");
		});
	});
	if (/POST | PUT/i.test(req.method)) {
		req.pipe(sreq);
	} else{
		sreq.end();
	};
})


//方法二：
/*
	app.get("/getKey",function(req,res){

		//获取用户传递过来的参数
		console.log(req.url);
		var arg = req.query["key"];
		//调用httpSearch函数，传参获取回调函数
		httpSearch(arg,function(info){
			res.send(info);
		});
		console.log(req.query["key"]);
	});

	function httpSearch(kwVal,callback){
		http.get("http://z.qyer.com/qcross/home/ajax?action=sitesearch&keyword=" + kwVal,function(httpRes){
			var buffers = [];
			httpRes.on("data",function(chunk){
				buffers.push(chunk);
			});
			httpRes.on("end",function(chunk){
				var wholeData = Buffer.concat(buffers);
				var dataStr = wholeData.toString("utf8");
				callback(wholeData);
			})
		}).on("error",function(e){
			console.log(e);
		});
	}
*/

//http://qt.qyer.com/click/empty.gif?log_type=2&click_tag=

//获取logoKey
app.get("/getLogoKey",function(req,res){

		//获取用户传递过来的参数
		//console.log(req.url);
		var arg = req.query["keyval"];
		//调用httpLogoSearch函数，传参获取回调函数
		httpLogoSearch(arg,function(info){
			res.send(info);
		});
		//console.log(req.query["keyval"]);
});

	function httpLogoSearch(kwVal,callback){
		http.get("http://z.qyer.com/?action=new_search&keyword=" + kwVal,function(httpRes){
			var buffers = [];
			httpRes.on("data",function(chunk){
				buffers.push(chunk);
			});
			httpRes.on("end",function(chunk){
				var wholeData = Buffer.concat(buffers);
				var dataStr = wholeData.toString("utf8");
				callback(wholeData);
			})
		}).on("error",function(e){
			console.log(e);
		});
	}

