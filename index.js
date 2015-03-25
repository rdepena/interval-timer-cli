'use strict';

var log = require('single-line-log').stdout,
  say = require('say');

module.exports = function createIntervals(sets, intervals, quiet) {
  var intervalSet = [];

  while(sets > 0) {
    intervalSet = intervalSet.concat(intervals);
    sets--;
  }

  function runTimer() {
    if (intervalSet.length <= 0) {
      return;
    }
    startTimer(intervalSet.shift(), runTimer, quiet);
  }

  runTimer();
};

function startTimer(minutes, callback, quiet) {
  var startTime = Date.now(),
    minutesInMs = minutes * 60 * 1000;

  tick();

  function tick () {
    var timeInSeconds = (startTime + minutesInMs - Date.now())/1000;
    if (timeInSeconds <= 0) {
      alertUser('time is up', quiet);
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
function alertUser(phrase, quiet) {
  console.log(phrase, '\n');

  if (!quiet) {
    say.speak('Alex',phrase);
  }
}

function print(startTime, currentTime){
  log('Interval: ', startTime.minutes, ':', startTime.seconds,'Current timer: ', currentTime.minutes, ':', currentTime.seconds, '\n');
}
