 
function f_iframeResize(){
	bLoadComplete = true; 
	f_frameStyleResize(self);
}

function f_frameStyleResize(targObj){
 
	 var targWin = targObj.parent.document.all[targObj.name];
	 if(targWin != null) {
		  var HeightValue = targObj.document.body.scrollHeight;
		  if(HeightValue < 800){HeightValue = 800;} 
		 
		  var leftHight =targObj.parent.document.getElementById("sidebar").style.height ;
		  //var leftHight =targObj.parent.document.getElementById("mainContent").style.height ;	 
		  if(leftHight>HeightValue){
		     targWin.style.pixelHeight = leftHight;
		     
		    
		  }else{
		     targWin.style.pixelHeight = HeightValue;
			   parent.document.getElementById("sidebar").style.height =HeightValue;
			 // parent.document.getElementById("contentLeft").style.height =HeightValue;
			 //parent.document.getElementById("contentRight").style.height =HeightValue;
		  }
		 
		  
	 }
}



function showMenu(i) {
	/*var bLoadComplete = false;
    window.onload = f_iframeResize;
	if(document.getElementById("Div_"+i).style.display == "block") {
		 document.getElementById("Div_"+i).style.display = "none";
	}else{
	    document.getElementById("Div_"+i).style.display = "block";
	}*/

	for(n=1;n<4;n++){
		if(n==i) {
			document.getElementById("Div_"+n).style.display = "block";
		 } else {
			document.getElementById("Div_"+n).style.display = "none";
		}
	}
}


function allTrim(inputString)
{
	startPos = 0 ;
	while( startPos < inputString.length)
	{
		if ( inputString.charAt(startPos)!= ' ')
			break ;
		else  startPos ++ ;
	}
	endPos = inputString.length - 1;
	while( endPos >=0 )
	{
		if ( inputString.charAt(endPos) != ' ')
			break ;
		else    endPos -- ;
	}
	if (startPos <= endPos )
		return(inputString.substring(startPos, endPos + 1));
	else return "" ;
}

function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}

function popWindow(href, title, w, h, r, c, status) {
/*This will in control of popup size with proportion base on baseFontSize and curfontSize
Please Change accordingly with style sheet*/
    var curfontSize=12;
    var baseFontSize=11;
/*document.styleSheets[0].rules.item(ruleIndex).style.color*/
/*window.onerror=function(er){alert(er);return true;}*/
// href and title is a must value for pop a window. 
	var sw=screen.width;var sh=screen.height;
	w=new Number(w);h=new Number(h);
	if(!isNaN(w)){w=w*curfontSize/baseFontSize;}if(!isNaN(h)){h=h*curfontSize/baseFontSize;}
	if(new String(status)=="undefined")status="yes";
	if(isNaN(w)){w=500;}else if(sw-w-10<0){w=sw-10;}
	if(isNaN(h)){h=480;}else if(sh-h-58<0){h=sh-58;if(status=='yes'){h-=20;}}
	if(new String(r)=="undefined")r="yes";
	var t=0;var l=0;
	if(new String(c)!="no"){l=(sw-w-10)/2;t=(sh-h-58)/2-10;}
	prop="width="+w+",height="+h+",top="+t+",left="+l+",resizable="+r+",scrollbars=yes,status="+status;
	var popped=window.open(href, title, prop);
	try{popped.focus();}catch(er){}
} 