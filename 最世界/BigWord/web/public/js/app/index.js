define(function(require){
	var $ = require('jquery'),
		header = require('./comment/header'),
		getkey = require('./comment/getKey'),
		createNav = require('./comment/createNav');
		changefont = require('./comment/changeFont');
		getlogkey = require('./comment/logoSearch');
		getloop = require('./index/getLoopPic');
		getmenu = require('./comment/getMenu');
		freewalk = require('./index/freeWalk');
		fixmove = require('./comment/fixed');

	//页面加载时，调用模块内的相应函数
	$(function(){
		header();
		getkey();
		createNav();
		changefont();
		getlogkey();
		getloop();
		getmenu();
		freewalk();
		fixmove();
	})
})