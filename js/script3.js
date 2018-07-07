$( document ).ready(function( $ ) {
 $("#form2").change(function(event){

                var $form = $("#form2");
                var $inputs = $form.find("input, select, button, textarea");
                var serializedData = $form.serialize();
        

                $('h1').text('Saving your progress..');
       
                request = $.ajax({
                        url: "https://script.google.com/macros/s/AKfycbylHXXpVNEcSJDH-PTR3eVcE71u6spUp2um1NxerWdxE1B1qRjW/exec",
						type: "post",
                        data: serializedData
                });
        

                request.done(function (response, textStatus, jqXHR){
                        // log a message to the console
console.log("Sent data through AJAX to sheets");
                });
        

                request.fail(function (jqXHR, textStatus, errorThrown){
                        // log the error to the console
                        console.error(
                                "The following error occured: "+
                                textStatus, errorThrown
                        );
                });
        


                request.always(function () {
                        // reenable the inputs
$('h1').text('Success!');
                });
        
                // prevent default posting of form
                event.preventDefault();
 });


});