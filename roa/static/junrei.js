var logDiv;
var rpcRequest;

function log(text){
	var paragraph=document.createElement("P");
	var block=document.createTextNode(text);
	paragraph.appendChild(block);
	logDiv.appendChild(paragraph);
	logDiv.scrollTop=logDiv.scrollHeight;
}

function onRPCResponse() {
	if (rpcRequest.status==200){
		log("rpcRequest.status "+rpcRequest.status);
		var response=rpcRequest.responseText;
		log("onRPCReponse parsing "+response);
		var reply=JSON.parse(response);
		var result=reply.result;
		var error=reply.error;
		log("rpcRequest.response:"+result);
	}else{
		log("rpcRequest.readyState:"+rpcRequest.readyState);	
		log("rpcRequest.status:"+rpcRequest.status);	
//		log("rpcRequest.statusText:"+rpcRequest.statusText);	
	}
//	setTimeout(function(){pollStatus()},500);
//	setClock(localClock,new Date());
}

function rpcQuery(rpc,csrf) {
	rpcRequest.open("POST",rpc);
	try {
		var data={"jsonrpc":"2.0","method":"status","id":1};
        rpcRequest.setRequestHeader("X-CSRFToken", csrf);
        var query=JSON.stringify(data);
		rpcRequest.send(query);
	} catch (exception) {
		console.log("rpcQuery exception " + exception);
	}
}

function initClient(csrf){
	logDiv=document.getElementById("log");
    log("stage2 client initial icing");
    var hasNetwork=true;
    var href=window.location.href;
    var shouldNetwork=href.indexOf("file:")!=0;
    if (hasNetwork){
        rpcRequest=new XMLHttpRequest();
        rpcRequest.onload=onRPCResponse;
        rpcQuery("hello",csrf);
    }
}
