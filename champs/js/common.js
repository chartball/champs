/*
var longmonths = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var shortmonths = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var longdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
*/

function percentageFixer(inNum){
	// input: any string or floating point number representing a percentage between 0-100
	// this will handle the edge cases of < 1 and > 99 and kick them to double digit precision
	// but give single digit precision for all other cases
	// returns just the number, no % sign
	inNum = parseFloat(inNum);
	if((inNum < 1 && inNum > 0)  || (inNum > 99 && inNum < 100) ){
	outNum = inNum.toFixed(2);
	} else if (parseInt(inNum) == 100 || parseInt(inNum) == 0 ){
	outNum = parseInt(inNum);
	} else {
	outNum = inNum.toFixed(1);
	}
	return outNum;
}

function addCommas(nStr){
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	//console.log(x1 + x2);
	return x1 + x2;
}

var en_dash = "&#8211;";
var em_dash = "&#8212;";

var state_names = {'AK':{'state':'Alaska', 'postal':'AK', 'ap':'Alaska'},
'AL':{'state':'Alabama', 'postal':'AL', 'ap':'Ala.'},
'AR':{'state':'Arkansas', 'postal':'AR', 'ap':'Ark.'},
'AZ':{'state':'Arizona', 'postal':'AZ', 'ap':'Ariz.'},
'CA':{'state':'California', 'postal':'CA', 'ap':'Calif.'},
'CO':{'state':'Colorado', 'postal':'CO', 'ap':'Colo.'},
'CT':{'state':'Connecticut', 'postal':'CT', 'ap':'Conn.'},
'DC':{'state':'District of Columbia', 'postal':'DC', 'ap':'D.C.'},
'DE':{'state':'Delaware', 'postal':'DE', 'ap':'Del.'},
'FL':{'state':'Florida', 'postal':'FL', 'ap':'Fla.'},
'GA':{'state':'Georgia', 'postal':'GA', 'ap':'Ga.'},
'HI':{'state':'Hawaii', 'postal':'HI', 'ap':'Hawaii'},
'IA':{'state':'Iowa', 'postal':'IA', 'ap':'Iowa'},
'ID':{'state':'Idaho', 'postal':'ID', 'ap':'Idaho'},
'IL':{'state':'Illinois', 'postal':'IL', 'ap':'Ill.'},
'IN':{'state':'Indiana', 'postal':'IN', 'ap':'Ind.'},
'KS':{'state':'Kansas', 'postal':'KS', 'ap':'Kan.'},
'KY':{'state':'Kentucky', 'postal':'KY', 'ap':'Ky.'},
'LA':{'state':'Louisiana', 'postal':'LA', 'ap':'La.'},
'MA':{'state':'Massachusetts', 'postal':'MA', 'ap':'Mass.'},
'MD':{'state':'Maryland', 'postal':'MD', 'ap':'Md.'},
'ME':{'state':'Maine', 'postal':'ME', 'ap':'Maine'},
'MI':{'state':'Michigan', 'postal':'MI', 'ap':'Mich.'},
'MN':{'state':'Minnesota', 'postal':'MN', 'ap':'Minn.'},
'MO':{'state':'Missouri', 'postal':'MO', 'ap':'Mo.'},
'MS':{'state':'Mississippi', 'postal':'MS', 'ap':'Miss.'},
'MT':{'state':'Montana', 'postal':'MT', 'ap':'Mont.'},
'NC':{'state':'North Carolina', 'postal':'NC', 'ap':'N.C.'},
'ND':{'state':'North Dakota', 'postal':'ND', 'ap':'N.D.'},
'NE':{'state':'Nebraska', 'postal':'NE', 'ap':'Neb.'},
'NH':{'state':'New Hampshire', 'postal':'NH', 'ap':'N.H.'},
'NJ':{'state':'New Jersey', 'postal':'NJ', 'ap':'N.J.'},
'NM':{'state':'New Mexico', 'postal':'NM', 'ap':'N.M.'},
'NV':{'state':'Nevada', 'postal':'NV', 'ap':'Nev.'},
'NY':{'state':'New York', 'postal':'NY', 'ap':'N.Y.'},
'OH':{'state':'Ohio', 'postal':'OH', 'ap':'Ohio'},
'OK':{'state':'Oklahoma', 'postal':'OK', 'ap':'Okla.'},
'OR':{'state':'Oregon', 'postal':'OR', 'ap':'Ore.'},
'PA':{'state':'Pennsylvania', 'postal':'PA', 'ap':'Pa.'},
'RI':{'state':'Rhode Island', 'postal':'RI', 'ap':'R.I.'},
'SC':{'state':'South Carolina', 'postal':'SC', 'ap':'S.C.'},
'SD':{'state':'South Dakota', 'postal':'SD', 'ap':'S.D.'},
'TN':{'state':'Tennessee', 'postal':'TN', 'ap':'Tenn.'},
'TX':{'state':'Texas', 'postal':'TX', 'ap':'Texas'},
'UT':{'state':'Utah', 'postal':'UT', 'ap':'Utah'},
'VA':{'state':'Virginia', 'postal':'VA', 'ap':'Va.'},
'VT':{'state':'Vermont', 'postal':'VT', 'ap':'Vt.'},
'WA':{'state':'Washington', 'postal':'WA', 'ap':'Wash.'},
'WI':{'state':'Wisconsin', 'postal':'WI', 'ap':'Wis.'},
'WV':{'state':'West Virginia', 'postal':'WV', 'ap':'W.Va.'},
'WY':{'state':'Wyoming', 'postal':'WY', 'ap':'Wyo.'}
};