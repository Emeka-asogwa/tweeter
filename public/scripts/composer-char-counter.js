//const lengthOfChar = 140;
$(document).ready(function() {
  
  $('#tweet-text').on("input", function() {
    
    console.log(this.value.length)

    $(".counter")[0].innerHTML = 140 -this.value.length;
    if ($(".counter")[0].innerHTML < 0) {
      $(".counter").css('color', 'red');
    }
    else {
      $(".counter").css('color', 'blue');

    }
  
  
  });

  //})
})
    // const currentLength = $(this).val().length;
    // const remainingLength = lengthOfChar - currentLength;
    

    // change the color of the counter with respect to the left space.
  //   if (remainingLength < 0){
  //     $('.counter').css('color', 'red')

  //   }
  //   else{
  //     $('#tweet-text').css({'color': blue});

  //   }

  