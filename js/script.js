var gas = [];
var l = 0;
var data;

$(document).ready(function () {
	



var map = {
1:"fx/LTTP_Get_Fairy.wav"
}
var audio = new Audio();
audio.volume = 1.0;
audio.loop = false;
audio.src = map[1];

	colorPlz();
	
	$('#form').submit(function (event) {
		audio.play();
			
		event.preventDefault()
		localforage.getItem("cq", function (err, data) {

			if ($('input[type="checkbox"]').is(':checked')) {
				$('input[type=checkbox]:checked').each(function () {

					var clase = $(this).parent().parent().parent().attr('id');
					var del = $(this).parent().prev().prev().text();
	
					var obj = data[clase];

					delete obj[del];
					$(this).parent().parent().remove();
				});
			}
			$('.input').each(function () {
				var item = $(this).val();
				var date = $(this).next().val();
				if (item.length > 0) {
					var clase = $(this).parent().attr('id');
					var Q = data[clase]
					Q[item] = {
						"date": date
					};
					
					gas = ([item,date]);
					console.log(gas);
					$(this).val('');
					$(this).next().val('');

					
				}
			});
			
			
			
			localforage.setItem("cq", data, fetch(data));
			
			
		});
		
	});

});

function colorPlz() {
	var rainbow = new Rainbow();
	rainbow.setSpectrum('#d44b1d', '#fb7035', '#9bd220', '#2a9679', '#15785d');

	$('.square').each(function () {

		var number = Math.floor(Math.random() * 100);
		rainbow.colourAt(number);
		var color = rainbow.colourAt(number)

		$(this).css('background-color', "#" + color);


	});
}



function fetch(data) {
	console.log('Saved: ', data);

	$('#post1').val(JSON.stringify(data));
	$('#post2').val(JSON.stringify(gas));
	
	$('.square').children().not('.input').html('');
	var counter = 0;
	var h = 0;
	var Q = ['CQ1', 'CQ2', 'CQ3', 'CQ4'];
	var q = ['Q1', 'Q2', 'Q3', 'Q4'];
	for (i = 0; i < Q.length; i++) {

		var obj = data[Q[i]]
		
		var names = Object.keys(obj)

		for (j in obj) {

			var keys = Object.keys(obj[j])
			var row = document.createElement('tr');
			var col1 = document.createElement('th');
			var col2 = document.createElement('th');
			var col3 = document.createElement('th');
			var div = document.createElement('div');
			var div2 = document.createElement('div');
			var date = new Date();
			var fecha = obj[j].date
			var fechaF = new Date(fecha);
			console.log(fechaF.getUTCHours());
			fechaF.setUTCHours(5);
	
/*			row.className = Q[i]; //obj[j].gender */
			col1.className = "key";
			col2.className = "fecha";
			div2.className = "hiddenDate";
			div.innerHTML = getDayName(fecha,"mx-MX");
			div.className = "ghostDate";
			div2.innerHTML = fecha;
			div2.hidden = true;
			row.id = counter+q[i];
			row.className = "hide";
			row.draggable = true;
			row.ondragend = function cancel(ev) {$('.hide').fadeIn()};
			row.ondragstart = function drag(ev) {var key = $(this).find('.key').text();var fecha = $(this).find('.hiddenDate').text();console.log("Fecha: "+fecha);var quad = $(this).parent().attr('id');$('.hide').fadeOut();ev.dataTransfer.setData("text",JSON.stringify([ev.target.id,key,fecha,quad]));}
/*			row.className = "table";*/
/*			row.ondrop = function drop(ev){ev.preventDefault();var data = ev.dataTransfer.getData("text");ev.target.appendChild(document.getElementById(data));} */
			col1.innerHTML = names[h];
if (fecha.length > 0) {
			col2.innerHTML = fechaF.toLocaleDateString();
			col2.className = "hoverMe";
}
	
if (fechaF < date.addDays(7)) {
	var dif = (date.addDays(7)).getDate() - fechaF.getDate();
	console.log(dif);
	var rainbow = new Rainbow();
	rainbow.setSpectrum('yellow','red');
	rainbow.setNumberRange(0, 7);
var color = rainbow.colourAt(dif)
col2.style.backgroundColor = "#"+color;
col2.className = "soon";
}

			

			col3.innerHTML = "<input type='checkbox'>";

			var container = document.getElementById(Q[i]);
			container.appendChild(row);
			row.appendChild(col1);
			row.appendChild(col2);
			row.appendChild(col3);
			col2.appendChild(div);
			col2.appendChild(div2);
			h++
			counter++
		}
		var h = 0;
	}
	if (l>0) {
	$("#form2").change();
	}
	l++
	
}

function allowDrop(ev) {
    ev.preventDefault();
}



function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
	var json = JSON.parse(data);
	var targ = ev.target.id;
	


    ev.target.appendChild(document.getElementById(json[0]));
	localforage.getItem("cq", function (err, savedData) {


		var obj = savedData[json[3]] //3 contains old quadrant, 2 contains date, 1 contains name, 0 contains id of item to append.

		delete obj[json[1]];
		var objeto = savedData[targ]
	objeto[json[1]] = {
						"date": json[2]
					};
					
		
localforage.setItem("cq", savedData, fetch(savedData));
	});
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function getDayName(dateStr, locale)
{
    var date = new Date(dateStr);
	date.setUTCHours(5);
    return date.toLocaleDateString(locale, { weekday: 'long' });        
}