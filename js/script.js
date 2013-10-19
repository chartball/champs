/* Author: 

*/

/*jslint white: false, debug: false, devel: true, onevar: false, plusplus: false, browser: true, bitwise: false, maxerr: 200 */
/*global jQuery: false, $: false, log: false, window: false, WSJNG: false, _: false */

// Just in case there's a console.log hanging around.... neutralize it on weak browsers
if (!window.console) { window.console = { "log": function() {} }; }

var paper;
var purpClr = "#666";
var theslider, yearLabel;
var thetimer;
var sizeAdj = 0.9;
var dataObj = {};
var getColor = {'NFL':'#8A9B0F','MLB':'#BD1550','NBA':'#E97F02','NCAAM':'#F8CA00','NHL':'#07D4F5'};
var current_state;
var old_state = {i:[]};
var thescale = 1.1;

var minYear = 1900;
var maxYear = 2013;
var theyear = 1950; //the year we start with


var svg, projection;

var gDate = '1-1950';


$(document).ready(function(){
	setup();
});

function setup(){
  
	
	albersMap();
	
	
	$('#controlsHolder').html('<div id="yearLabel"></div>');

	$('#controlsHolder').append('<div id="slider-range" style=""></div>'
		+'<div id="sliderButs">'
		+'<div id="slidePrev" class="sliderBut unselectable" n="prev">Back</div>'
		+'<div id="slidePlayFast" class="sliderBut unselectable" n="play">Play fast</div>'
		+'<div id="slidePlaySlow" class="sliderBut unselectable" n="play">Play slow</div>'
		+'<div id="slideNext" class="sliderBut unselectable" n="next">Forward</div>'
		+'</div>');
	$('#controlsHolder').append('<div id="thetags" style="">'
		+'<div class="champTagHolder" lg="MLB">MLB: <div class="champTags MLB unselectable"></div><a class="teaserDiv" href="" target="_top">Chartball poster &#8594;</a></div><br class="clear" />'
		+'<div class="champTagHolder" lg="NHL">NHL: <div class="champTags NHL unselectable"></div><a class="teaserDiv" href="" target="_top">Chartball poster &#8594;</a></div><br class="clear" />'
		+'<div class="champTagHolder" lg="NFL">NFL: <div class="champTags NFL unselectable"></div><a class="teaserDiv" href="" target="_top">Chartball poster &#8594;</a></div><br class="clear" />'
		+'<div class="champTagHolder" lg="NBA">NBA: <div class="champTags NBA unselectable"></div><a class="teaserDiv" href="" target="_top">Chartball poster &#8594;</a></div><br class="clear" />'
		+'<div class="champTagHolder" lg="NCAAM">NCAAM: <div class="champTags NCAAM unselectable"></div><a class="teaserDiv" href="" target="_top">Chartball poster &#8594;</a></div><br class="clear" />'
	+'</div>');
	
	$('.champTags, .teaserDiv').fadeOut(0);
	
	
	$('#slidePrev').on('click',function(e){
		clearInterval(thetimer);
		theyear = theyear-1;
		if(theyear < minYear){theyear = minyear}
      	changeByYear();		
	});
	$('#slideNext').on('click',function(e){
		clearInterval(thetimer);
		theyear = theyear+1;
		if(theyear > maxYear){theyear = maxyear}
      	changeByYear();		
	});
	$('#slidePlayFast').on('click',function(e){
		clearInterval(thetimer);
		if(theyear == maxYear){ 
			theyear = minYear;
			gDate = "1-"+theyear;
			$('.champTags').fadeOut(0);
			$('.teaserDiv').fadeOut(0);
		}
		playFast();
	});
	$('#slidePlaySlow').on('click',function(e){
		clearInterval(thetimer);
		if(theyear == maxYear){ 
			theyear = minYear;
			gDate = "1-"+theyear;
			$('.champTags').fadeOut(0);
			$('.teaserDiv').fadeOut(0);
		}
		playSlow();
	});
	$('#mainContent').append('<div id="nextDiv">Show me more &#8594;</div>');
	$('#nextDiv').on('click',function(e){
			jumpToNext()
			
	});

	
	theslider = $( "#slider-range" ).slider({
      min: minYear,
      max: maxYear,
      values: [ theyear ],
      step: 1,
      slide: function( event, ui ) {
    	clearInterval(thetimer);
    	//$('#slidePlay').html('<img src="images/play.png"/>');
		//$('#slidePlay').attr('s','stopped');
      	//theyear = ui.value;
      	theyear = ui.value;
      	changeByYear();
      	
      },
      stop: function( event, ui ) {
      	theyear = ui.value;
      	changeByYear();
      
 
      }
    });	

	//check incoming year
    current_state = $.bbq.getState();
    if(current_state.i != undefined && parseInt(current_state.i) >= minYear && parseInt(current_state.i) <= maxYear){
	    theyear = parseInt(current_state.i);
      	changeByYear();
    } else {
	    playFast();

    }
	$('#yearLabel').html(theyear);		


}

function playFast(){
	clearInterval(thetimer);
   	thetimer = setInterval(function(){
		gDate = getDate(gDate,1);
		var nowD = new Date();
		if(nowD.getFullYear() < parseInt(gDate.split('-')[1])){
			clearInterval(thetimer);
		} else {
			changeByMonth();
		}
	},50);	
}
function playSlow(){
	clearInterval(thetimer);
   	thetimer = setInterval(function(){
		gDate = getDate(gDate,1);
		var nowD = new Date();
		if(nowD.getFullYear() < parseInt(gDate.split('-')[1])){
			clearInterval(thetimer);
		} else {
			changeByMonth();
		}
	},300);	
}


function changeByMonth(){
	$.each(allData, function(index) {
		if(allData[index]['dt'] == gDate){
			markDot(allData[index]);
			setTeam(allData[index])
		}		
	});
    theslider.slider( "option", "values", [ parseInt(gDate.split('-')[1]) ] );
    if(gDate.split('-')[1] != theyear){
	    theyear = gDate.split('-')[1];
		$.bbq.pushState({i: gDate.split('-')[1] });
		$('#yearLabel').html(parseInt(gDate.split('-')[1]));		
    }
    
    theyear = parseInt(gDate.split('-')[1]);
	
}
function changeByYear(){
	$('#yearLabel').html(parseInt(theyear));		
	$.each(allData, function(index) {
		if((allData[index]['dt']).split('-')[1] == theyear){
			markDot(allData[index]);
			setTeam(allData[index])
		}		
	});
    theslider.slider( "option", "values", [ theyear ] );
	$.bbq.pushState({i: theyear });
    gDate = '12-'+theyear;
    
    
    //so that we remove them if there are none from that year
    if(theyear < 1946){
		$('[lg="NBA"]').children('.champTags').fadeOut(0);
		$('[lg="NBA"]').children('.teaserDiv').fadeOut(0);
	}
	if(theyear < 1939){
		$('[lg="NCAAM"]').children('.champTags').fadeOut(0);
		$('[lg="NCAAM"]').children('.teaserDiv').fadeOut(0);
	}
	if(theyear < 1915){
		$('[lg="NHL"]').children('.champTags').fadeOut(0);
		$('[lg="NHL"]').children('.teaserDiv').fadeOut(0);
	}
	if(theyear < 1903){
		$('[lg="MLB"]').children('.champTags').fadeOut(0);
		$('[lg="MLB"]').children('.teaserDiv').fadeOut(0);
	}
	if(theyear < 1920){
		$('[lg="NFL"]').children('.champTags').fadeOut(0);
		$('[lg="NFL"]').children('.teaserDiv').fadeOut(0);
	}

    
	
}




function setTeam(thedata){

	//$('[lg='+thedata['lg']+']').slideUp(300).remove();
	
	
	var theitem = $('[lg="'+thedata['lg']+'"]').children('.champTags').fadeOut(10);//.html(thedata['sea']+': '+thedata['chp']+'<span class="trail"> over '+thedata['opp']+'</span>');
	theitem.html(thedata['sea']+': '+thedata['chp']+'<span class="trail"> over '+thedata['opp']+'</span>').fadeIn(100);
	
	//$('[lg="'+thedata['lg']+'"]').children('.champTags')
	
	theitem.unbind();
	theitem.on('click',function(e){
		flashCirc(thedata['lat'],thedata['lng'],getColor[[thedata['lg']]]);
	});
	
	if(thedata['lk'] != "0"){
		$('[lg="'+thedata['lg']+'"]').children('.teaserDiv').show().attr('href','http://www.chartball.com/posters/'+thedata['lk']+'.html');
	} else {
		$('[lg="'+thedata['lg']+'"]').children('.teaserDiv').hide();
	}
	
	
}

function getDate(nowdate,addto){
	var themonth = parseInt(nowdate.split('-')[0]) + addto;
	var theyear = parseInt(nowdate.split('-')[1]);
	
	if(themonth > 12){
		themonth = themonth-12;
		theyear = theyear+1;
	} else if (themonth < 1){
		themonth = themonth+12;
		theyear = theyear-1;
	}
	
	return themonth+"-"+theyear;
	
}




function albersMap(){
    svg = d3.select('#mapHolder').append('svg').attr('width','100%').attr('height','100%');
    projection = d3.geo.albersUsa();
    var states = svg.append('g')
        .attr('id', 'states');
    states.attr('transform', 'scale('+thescale+', '+thescale+')');

    d3.json('js/us-states.json', function(collection) {
        json = collection;
        states.selectAll('path')
            .data(collection.features)
        .enter().append('path')
            .attr('d', d3.geo.path().projection(projection))
            .attr('id', function(d){return d.properties.name.replace(/\s+/g, '')})
            .style('fill', '#222')
            .style('stroke', '#2e2e2e')
            .style('stroke-width', '1');
    });
    
 
}


function markDot(thedata){
	//console.log(thedata);
	
	var coords = projection([thedata['lng'], thedata['lat']]);	
	
	//remove any previous dot from this league
	svg.select("[thelg="+thedata['lg']+"]").remove();
	svg.select("[thelg="+thedata['lg']+"]").remove();
		 
	var thecirc = svg.append('circle')
	.attr('cx', coords[0])
	.attr('cy', coords[1])
	.attr('r', 1)
	.attr('opacity', 0.75)
	.attr('thename', thedata['chp'])
	.attr('transform', 'scale('+thescale+', '+thescale+')')
	.style('fill', getColor[[thedata['lg']]]);
	
	thecirc.transition().attr("r",50).duration(500).delay(80).transition().attr("r",0).remove();
	
	var thecity = svg.append('circle')
	.attr('cx', coords[0])
	.attr('cy', coords[1])
	.attr('r', 3)
	.attr('opacity', 0.4)
	.attr('thelg', thedata['lg'])
	.attr('transform', 'scale('+thescale+', '+thescale+')')
	.style('fill', '#CCC');
	thecity.on("click", function() {
		flashCirc(thedata['lat'],thedata['lng'],getColor[[thedata['lg']]]);
	})
	
	var thelab = svg.append('text')
	.text(thedata['chp'])
	.attr('x', coords[0]+6)
	.attr('y', coords[1])
	.attr('font-family', "sans-serif")
	.attr('font-size', "12px")
	.attr('fill', "white")
	.attr("opacity",0.4)
	.attr("cursor","pointer")
	.attr('thelg', thedata['lg'])
	.attr('transform', 'scale('+thescale+', '+thescale+')')
	
	//thelab.transition().attr("opacity",0).duration(800).delay(200);
	thelab.on("click", function() {
		flashCirc(thedata['lat'],thedata['lng'],getColor[[thedata['lg']]]);
	})
	
	
	
}


function flashCirc(thelat,thelng,theclr){
	var thecoords = projection([thelng, thelat]);	

	var acirc = svg.append('circle')
	.attr('cx', thecoords[0])
	.attr('cy', thecoords[1])
	.attr('r', 1)
	.attr('opacity', 0.75)
	.attr('transform', 'scale('+thescale+', '+thescale+')')
	.style('fill', theclr);
	
	acirc.transition().attr("r",50).duration(500).delay(80).transition().attr("r",4).remove();
		//console.log(d3.select(this).attr('thename'));

	
}


function addToBBQ(newid){
	var returnThis = "";
	var current_i = $.bbq.getState().i;
	//console.log(current_i);
	
	if(current_i == undefined || current_i == ""){
		returnThis = [newid];
	} else {
		var new_i = [];
		$.each(current_i, function(index) {
			if(current_i[index] != newid){
				new_i.push(current_i[index]);
			} 
		});
		new_i.push(newid);
		returnThis = new_i;		
	}
	return returnThis;
};

function removeFromBBQ(theid){
	var current_i = $.bbq.getState().i;
	var new_i = [];
	
	$.each(current_i, function(index) {
		if(current_i[index] != theid){
			new_i.push(current_i[index]);
		} 
	});
	
	returnThis = new_i;	
	return returnThis;
}

function changeState(){
	//thetime = new Date().getMilliseconds();
	//console.log("****** changeState *********");
    current_state = $.bbq.getState();
    var newhash = document.location.hash;
    
		incoming_highlight = $.trim(current_state.i);
				
		if(current_state.i == undefined){
			//current_state.i = "id"+thedata.length;
			//$.bbq.pushState({i: "id"+thedata.length, t:0});
			incoming_highlight = [];
			current_state.i = [];
			//selectGroup(incoming_highlight);

		} else {
			incoming_highlight = incoming_highlight.split(',');			
			
			if(old_state.i.toString() != current_state.i.toString()){
				//selectGroup(incoming_highlight);
			}
		}

	old_state = current_state;
	//oldhash = (document.location.hash);
	//}
	///sss.reset_sharetools();       
	$('#loadingDiv').delay(250).animate({ width: '0px' }, 250);
	
}



















