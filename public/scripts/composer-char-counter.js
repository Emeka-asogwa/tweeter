$(document).ready(function () {

  $('#tweet-text').on("input", function () {

    $(".counter")[0].innerHTML = 140 - this.value.length;
    if ($(".counter")[0].innerHTML < 0) {
      $(".counter").css('color', 'red');
    }
    else {
      $(".counter").css('color', 'blue');

    }
  });
});

