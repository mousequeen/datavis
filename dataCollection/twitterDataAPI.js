var Twit = require('twit'); //
var fs = require('fs');

var twit = new Twit({
	consumer_key : 'rj0cUFt2IvgUyu6av73PdSNY4',
	consumer_secret : 'qgDnCxealqxFGW45XFHpVqqDirdzJ4TU2qgbhoborE7P0QEJyn',
	access_token : '177695119-bmCDZrSdYGRuqYoe7kuMrxQLwlACZx0UkH7WxiRJ',
	access_token_secret : 'vwfuOXfvAXl9MSaeaoPnpxhVTqQQpiVDaztwqotFL3yqV'
});

var uk = [ '-9.23', '49.84', '2.69', '60.85' ];
// var ch = [ '5.90', '46.15', '10.16', '47.75' ];
// Google maps > right click > What's here?

var stream = twit.stream('statuses/filter', { locations: uk });
// var stream = twit.stream('statuses/filter', { locations: ch });
// var stream = twit.stream('statuses/filter', { track: "snsf,snf, fns" }); // to macth
// better is to use regex



// stream of information where location == uk
// twitter streaming api is not so powerful...


stream.on('tweet', processTweet);
// callback programming
// whenever there's a tweet, log it to the console
// var log = fs.createWriteStream ('tweets.log');

function processTweet(tweet) {
    var regexp=/[Ff]o.*tball|[Ss]aturday/g; // google: regular expression special characters js
//    var regexp=/fns|snf|snsf/g; // google: regular expression special characters js

    if (regexp.test(tweet.text)) {
        console.log (tweet.text);
    }

    // var strTweet = JSON.stringify(tweet); // JSON is a built-in library
    // console.log(tweet);
    // log.write (strTweet+'\n');
};
