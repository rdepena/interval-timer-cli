'use strict';

var log = require('single-line-log').stdout,
  say = require('say'),
  growl = require('growl');


module.exports = function createIntervals(sets, intervals, speak) {
  var intervalSet = [];

  while(sets > 0) {
    intervalSet = intervalSet.concat(intervals);
    sets--;
  }

  function runTimer() {
    if (intervalSet.length <= 0) {
      return;
    }
    startTimer(intervalSet.shift(), runTimer, speak);
  }

  runTimer();
};

function startTimer(minutes, callback, speak) {
  var startTime = Date.now(),
    minutesInMs = minutes * 60 * 1000;

  tick();

  function tick () {
    var timeInSeconds = (startTime + minutesInMs - Date.now())/1000;
    if (timeInSeconds <= 0) {
      alertUser('time is up', speak);
      callback();
    } else {
      print(getPrintableTime(minutesInMs/1000), getPrintableTime(timeInSeconds));
      setTimeout(tick, 1000);
    }
  }

}

function getPrintableTime(timestamp) {
  return {
    seconds:Math.floor(timestamp % 60),
    minutes:Math.floor(timestamp / 60)
  };
}
function alertUser(phrase, speak) {
  console.log(phrase, '\n');
  growl(phrase);
  if (speak) {
    say.speak(phrase);
  }
}

function print(startTime, currentTime){
  log('Interval: ', startTime.minutes, ':', startTime.seconds,'Current timer: ', currentTime.minutes, ':', currentTime.seconds, '\n');
}
