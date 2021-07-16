/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// --------- Setting the document ready on load --------//
$(document).ready(() => {
  const createTweetElement = function (tweetData) {
    const $tweet = $(`<article class="load-tweet">
     <article class="top-article">
     <div class="avatars">
     <img src=${tweetData.user.avatars}> 
     <div class="names"> 
       ${tweetData.user.name}</div>
       </div>
       <div>
       ${tweetData.user.handle}
       </div>
     </article>
     <div class="hello-world">${escape(tweetData.content.text)}</div>
     <footer class="tweet-footer">
       <div class="time">${timeago.format(tweetData.created_at)}</div>
       <div class="font-awesome">
         <i class="fa fa-solid fa-flag"></i>
         <i class="fa fa-solid fa-retweet"></i>
         <i class="fa fa-solid fa-heart"></i>
       </div>
     </footer>
   </article>`);
    return $tweet;
  };

  // ---------- Function to render all the tweets from the tweet data -----//
  const renderTweets = function (tweets) {
    $("#tweets-container").empty();
    for (let tweet of tweets) {
      const $tweetValue = createTweetElement(tweet);
      $("#tweets-container").prepend($tweetValue);
    }
  };

  // ------- AJAX POST request and error handling --------///
  const $button = $(".form");
  $button.on("submit", function (event) {
    event.preventDefault();
    if (validateTweet() === true) {
      if ($(".error-container").length > 0) {
        $(".error-container").slideUp();
      }
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(this).serialize(),
      }).then(() => {
        $("#tweet-text").val("");
        $(".counter").val(140);
        $(".counter").css("color", "black");
        loadTweets();
      });
    } else {
      $(".error").text(validateTweet());
      $(".error-container").slideDown(function () { });
    }
  });

  // AJAX GET request to grab data and render tweets -----//
  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      method: "GET",
      data: $(this).serialize(),
    }).then((res) => {
      renderTweets(res);
    });
  };
  loadTweets();

  // -------- Function to validate tweet input(field) and returns appropriate error message -----//
  const validateTweet = () => {
    const tweetText = $("#tweet-text").val();
    if (!tweetText || tweetText === "\n") {
      return "Can't be empty";
    } else if (tweetText.length > 140) {
      return "Too many characters";
    }
    return true;
  };

  // --- Escape function for Cross Site Scripting(XSS) prevention ----//
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // ------ Function to show textarea when the button is clicked ----
  const newTweetHandler = () => {
    $(".down-button").on("click", () => {
      if ($(".error-container").text()) {
        $(".error-container").hide();
      }
      if ($(".form").is(":visible")) {
        $(".form").slideUp();
      } else {
        $(".form").slideDown();
        $(".form").focus();
      }
    });
  };
  newTweetHandler();

  // ---- Function that handles the scrollup button as the client scrolls down ----//
  const scrollUpButton = function () {
    $(window).on("scroll", function () {
      if (window.scrollY === 0) {
        $(".up-button").hide();
      } else {
        $(".up-button").show();
      }
    });
    $(".up-button").on("click", function () {
      $(".form").slideDown();
      $(".form").focus();
      $(window).scrollTop(0);
    });
  };
  scrollUpButton();
});
