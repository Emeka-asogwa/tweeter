$(document).ready(function () {

  $('#tweet-text').on("input", function () {

    /* Reference-check: An alternative way to get the value of '.counter';

    # ---Traversing through tree --#
  $('#tweet-text').on("input", function (event) {
    const count = $(event.target).parent().next().find('.counter').val() - this.value.length;
    console.log(count);
  });
*/

    $(".counter")[0].innerHTML = 140 - this.value.length;
    if ($(".counter")[0].innerHTML < 0) {
      $(".counter").css('color', 'red');
    }
    else {
      $(".counter").css('color', 'blue');

    }
  });
});

