function show(i){
	if(document.getElementById("jt"+i).className=="jiantou_top"){
		document.getElementById("jt"+i).className="jiantou_bottom";
		document.getElementById("content"+i).style.display="";
	}else{
		document.getElementById("jt"+i).className="jiantou_top";
		document.getElementById("content"+i).style.display="none";
	}
}
function showlan(i){
	if(document.getElementById("jtlan"+i).className=="jiantoubottom_lan"){		
		document.getElementById("jtlan"+i).className="jiantoutop_lan";
		document.getElementById("contentlan"+i).style.display="none";
		
	}else{
		document.getElementById("jtlan"+i).className="jiantoubottom_lan";
		document.getElementById("contentlan"+i).style.display="";
	}
}
function showmenu(i){
	if(document.getElementById("jtmenu"+i).className=="jiantoubottom"){	
		document.getElementById("jtmenu"+i).className="jiantoutop";
		document.getElementById("contentmenu"+i).style.display="none";
		
	}else{
		document.getElementById("jtmenu"+i).className="jiantoubottom";
		document.getElementById("contentmenu"+i).style.display="";
	}
}