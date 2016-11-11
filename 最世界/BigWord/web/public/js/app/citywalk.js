define(function(require){
	var $ = require('jquery'),
		header = require('./comment/header'),
		getkey = require('./comment/getKey'),
		createNav = require('./comment/createNav');
		changefont = require('./comment/changeFont');
		getlogokey = require('./comment/logoSearch');
		getmenu = require('./comment/getMenu');
		bannerhover = require('./citywalk/bannerHover');
		citydata = require('./citywalk/getCityData');
		fixmove = require('./comment/fixed');

		

	//页面加载时，调用模块内的相应函数
	$(function(){
		header();
		getkey();
		createNav();
		changefont();
		getlogokey();
		getmenu();
		bannerhover();
		citydata();
		fixmove();
	})
})
