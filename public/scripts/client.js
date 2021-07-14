/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const tweetData = {
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//     "handle": "@SirIsaac"
//   },
//   "content": {
//     "text": "If I have seen further it is by standing on the shoulders of giants"
//   },
//   "created_at": 1461116232227
// };

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

$(document).ready(() => {

  const createTweetElement = function (tweetData) {
    const $tweet = $(`<article class="load-tweet">
     <article class="top-article">
       <div> ${tweetData.user.name}</div>
       <div>
       ${tweetData.user.handle}
         <!-- <button -->
       </div>
     </article>
     <div class="hello-world">${escape(tweetData.content.text)}</div>
     <footer class="tweet-footer">
       <div class="time">${timeago.format((tweetData.created_at))}</div>
       <div class="font-awesome">
         <i class="fa fa-solid fa-heart"></i>
         <i class="fa fa-solid fa-flag"></i>
         <i class="fa fa-solid fa-retweet"></i>
       </div>
     </footer>
   </article>`);
    return $tweet;
  };

  const renderTweets = function (tweets) {
    $("#tweets-container").empty();
    for (let tweet of tweets) {
      const $tweetValue = createTweetElement(tweet);
      $("#tweets-container").prepend($tweetValue);
    }
  }
  //renderTweets(tweets);

  const $button = $(".form");
  $button.on("submit", function (event) {
    event.preventDefault();
    if (validateTweet()) {
      console.log()
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(this).serialize()
      })
        .then((res) => {
          $("#tweet-text").val("");
          $(".counter").val(140);
          $(".counter").css('color', 'black');
          loadTweets();
        })
    }
  })
  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      method: "GET",
      data: $(this).serialize()

    })
      .then((res) => {
        console.log(res);
        renderTweets(res);

      })
  }
  loadTweets();

  const validateTweet = () => {
    const tweetText = $("#tweet-text").val();
    if (!tweetText || tweetText === '\n') {
      alert("Can't be empty");
      return false;
    }
    else if (tweetText.length > 140) {
      alert("Too many characters");
      return false;
    }
    return true;
  };

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
})