var express = require("express");
var app = new express();
app.use(express.static("public"));
app.listen(8080,function(){
	console.log("服务器启动成功！");
});