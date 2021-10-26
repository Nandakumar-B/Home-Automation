var controlPan=d("control_pan");
var out=d("output");

var db=firebase.database().ref('autohome/bulb');

try{
	var SpeechRecognition=SpeechRecognition||webkitSpeechRecognition;
	var rec=new SpeechRecognition();
	rec.continuous=true;
	rec.lang='en-US';//'ml-IN';//'en-US';
	rec.intermResults=false;
	rec.maxAlternatives=1;
	
	rec.onresult=function(e){
		var highData=e.results[0][0].transcript;
		out.innerHTML=highData;
		if(out.innerText.toLowerCase().includes('alexa')){
			if(out.innerText.toLowerCase().includes('switch')){
				if(out.innerText.toLowerCase().includes('on')){
					if(out.innerText.toLowerCase().includes('one')||
					   out.innerText.toLowerCase().includes('first')||
					   out.innerText.toLowerCase().includes('1')){
						   db.child('bulb0/status').set('on');
					   }
					 if(out.innerText.toLowerCase().includes('two')||
					   out.innerText.toLowerCase().includes('to')||
					   out.innerText.toLowerCase().includes('second')||
					   out.innerText.toLowerCase().includes('2')){
						   db.child('bulb1/status').set('on');
					   }
					 if(out.innerText.toLowerCase().includes('three')||
					   out.innerText.toLowerCase().includes('third')||
					   out.innerText.toLowerCase().includes('3')){
						   db.child('bulb2/status').set('on');
					   }
					  if(out.innerText.toLowerCase().includes('four')||
					   out.innerText.toLowerCase().includes('for')||
					   out.innerText.toLowerCase().includes('fourth')||
					   out.innerText.toLowerCase().includes('4')){
						   db.child('bulb3/status').set('on');
					   }
				}else if(out.innerText.toLowerCase().includes('off')||
				       out.innerText.toLowerCase().includes('of')){
					if(out.innerText.toLowerCase().includes('one')||
					   out.innerText.toLowerCase().includes('first')||
					   out.innerText.toLowerCase().includes('1')){
						   db.child('bulb0/status').set('off');
					   }
					 if(out.innerText.toLowerCase().includes('two')||
					   out.innerText.toLowerCase().includes('to')||
					   out.innerText.toLowerCase().includes('second')||
					   out.innerText.toLowerCase().includes('2')){
						   db.child('bulb1/status').set('off');
					   }
					 if(out.innerText.toLowerCase().includes('three')||
					   out.innerText.toLowerCase().includes('third')||
					   out.innerText.toLowerCase().includes('3')){
						   db.child('bulb2/status').set('off');
					   }
					  if(out.innerText.toLowerCase().includes('four')||
					   out.innerText.toLowerCase().includes('for')||
					   out.innerText.toLowerCase().includes('fourth')||
					   out.innerText.toLowerCase().includes('4')){
						   db.child('bulb3/status').set('off');
					   }
				}
			}
		}
	};
	
	rec.onspeechend=function(){
		rec.stop();
		d("mic").style.animation="none";
	};
	rec.onnomatch=function(e){
		out.innerHTML="I do not understand what you are saying! Please , try again!";
		d("mic").style.animation="none";
	};
	rec.onerror=function(e){
		out.innerHTML="Error occurred in recognition: " + e.error;
		d("mic").style.animation="none";
	};
	
	function speak(){
		rec.start();
		d("mic").style.animation="mic-animation 0.7s ease infinite";
		out.innerHTML="Recognizing your voice...!";
	}
}catch(error){
	alert(error);
}

//for(var i=0;i<4;i++){
	createCard('Lights','fa fa-lightbulb-o',false,0);
	createCard('Lights','fa fa-lightbulb-o',false,1);
	createCard('Lights','fa fa-lightbulb-o',false,2);
	createCard('Lights','fa fa-lightbulb-o',false,3);
//}

function createCard(s,ic,isOn,id){
	
	var card=dc('card');
	var h1=dc('h');
	var h2=dc('h');
	var i=dc('i');
	var lab=dc('label');
	var inp=dc('input');
	var span=dc('span');
	
	inp.id=id;
	h1.innerHTML=isOn?'on':'off';
	h2.innerHTML=s;
	i.className=ic;
	lab.className='switch';
	inp.type='checkbox';
	span.className='slider';
	card.className='passive';
	
	lab.appendChild(inp);
	lab.appendChild(span);
	card.appendChild(h1);
	card.appendChild(i);
	card.appendChild(h2);
	card.appendChild(lab);
	inp.checked=isOn;
	showLoad();
	db.child('bulb'+id+'/status').on('value',function(snap){
		var dm=snap.val();
		switch(dm){
			case 'on':
				inp.checked=true;
				h1.innerHTML='on';
				if(!card.classList.contains("active")&&card.classList.contains("passive")){
		            card.classList.add("active");
			       card.classList.remove("passive");
		         }
				closeLoad();
				break;
			case 'off':
				inp.checked=false;
				h1.innerHTML='off';
				if(!card.classList.contains("passive")&&card.classList.contains("active")){
		           card.classList.add("passive");
			       card.classList.remove("active");
		        }
				closeLoad();
				break;
		}
	});
	inp.addEventListener("click",function(e){
		var sId=e.target.id;
		h1.innerHTML=inp.checked?'on':'off';
		if(!inp.checked){
			db.child('bulb'+sId+'/status').set('off');
			if(!card.classList.contains("passive")&&card.classList.contains("active")){
		        card.classList.add("passive");
			    card.classList.remove("active");
		     }
		}else{
			db.child('bulb'+sId+'/status').set('on');
			if(!card.classList.contains("active")&&card.classList.contains("passive")){
		        card.classList.add("active");
			    card.classList.remove("passive");
		     }
		}
    });
	
	controlPan.appendChild(card);
}
function showLoad(){
	d('pan_load').style.display='flex';
}
function closeLoad(){
	d('pan_load').style.display='none';
}
function d(id){
	return document.getElementById(id);
}
function dc(id){
	return document.createElement(id);
}
