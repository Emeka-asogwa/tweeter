const lengthOfChar = 140;
$(document).ready(function() {
  $("#tweet-text").on('input', function(event) {
    const currentLength = $(this).val().length;
    const remainingLength = lengthOfChar - currentLength;

    // change the color of the counter with respect to the left space.
    if (remainingLength < 0){
      $('.counter').css('color', 'red')

    }
    else{
      $('#tweet-text').css({'color': blue});

    }

  });

});