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
		localforage.getItem("key", function (err, data) {

			if ($('input[type="checkbox"]').is(':checked')) {
				$('input[type=checkbox]:checked').each(function () {

					var clase = $(this).parent().parent().attr('id');
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
			
			
			
			localforage.setItem("key", data, fetch(data));
			
			
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

	var h = 0;
	var Q = ['Q1', 'Q2', 'Q3', 'Q4'];
	for (i = 0; i < Q.length; i++) {
console.log("Processing: "+data)
		var obj = data[Q[i]]
		
		var names = Object.keys(obj)

		for (j in obj) {

			var keys = Object.keys(obj[j])
			var row = document.createElement('tr');
			var col1 = document.createElement('th');
			var col2 = document.createElement('th');
			var col3 = document.createElement('th');
/*			row.className = Q[i]; //obj[j].gender */
			col1.className = "key";
			col2.className = "fecha";
			row.id = Q[i];
/*			row.className = "table";*/
			col1.innerHTML = names[h];
			col2.innerHTML = obj[j].date;
			col3.innerHTML = "<input type='checkbox'>";

			var container = document.getElementById(Q[i]);
			container.appendChild(row);
			row.appendChild(col1);
			row.appendChild(col2);
			row.appendChild(col3);
			h++
		}
		var h = 0;
	}
	if (l>0) {
	$("#form2").change();
	}
	l++
	
}