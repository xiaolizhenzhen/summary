	function createXHR(){
		//判断浏览器版本是否支持
		if(typeof XMLHttpRequest !='undefined'){
			return new XMLHttpRequest();
		}else if(typeof ActiveXObject !='undefined'){
			if(typeof arguments.callee.activeXString !='String'){
				var versions=['MSXML2.XMLHttp.6.0', 'MSXMLHttp.3.0', 'MSXML2.XMLHttp'];
				//遍历浏览器版本
				for(var i=0;i<versions.length;i++){
					try{
						new ActiveXObject(versions[i]);
						arguments.callee.activeXString=versions[i];
					}catch(e){

					}
					
				}
			}
			return new ActiveXObject(arguments.callee.activeXString);
		}else{
			throw new Error("没法正常的创建ajax对象");
		}
	}

	//shim:为那些没有使用define()来声明依赖关系、设置模块的"浏览器全局变量注入"型脚本做依赖和导出配置