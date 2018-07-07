$( document ).ready(function( $ ) {

$('#wrapper').on('click','input[type=checkbox]',function() {
	
if ($(this).is(':checked')) {
$(this).parent().prev().prev().css('text-decoration', 'line-through');
} else {
$(this).parent().prev().prev().css('text-decoration', 'initial');
}
});

});

function googleRun() {

    var url = "https://script.google.com/macros/s/AKfycbylHXXpVNEcSJDH-PTR3eVcE71u6spUp2um1NxerWdxE1B1qRjW/exec?callback=ctrlq&name=";
    var request = jQuery.ajax({
      crossDomain: true,
      url: url + encodeURIComponent(),
      method: "GET",
      dataType: "jsonp"
    });

 }

  // print the returned data
  function ctrlq(e) {
    data = JSON.parse(e.result);
	localforage.setItem("cq", data, fetch(data));
  }