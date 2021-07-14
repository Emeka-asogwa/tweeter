/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

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
     <div class="hello-world">${tweetData.content.text}</div>

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
    for (let tweet of tweets) {
      const $tweetValue = createTweetElement(tweet);

      $("#tweets-container").append($tweetValue);
    }
  }
  renderTweets(data);

  const $button = $(".form");
  $button.on("submit", function (event) {
    event.preventDefault();
    console.log($(this).serialize());
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: $(this).serialize()
    })
      .then((res) => {
        $("#tweet-text").val("");
        $(".counter").val(140);


        // const articleContainer = $("#tweets-container");
        // articleContainer.append(res);
        console.log(res);

      })

  })

})




// const validateTweet = (tweetText) => {
//   if (!tweetText || tweetText === '\n') {
//     return "Can't be empty";
//   }
//   else if (tweetText.length > 140) {
//     return "Too many characters";
//   }
// };
