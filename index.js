'use strict';

var log = require('single-line-log').stdout;
var say = require('say');
var growl = require('growl');
var stdin = process.stdin;

stdin.setRawMode( true );
stdin.resume();
stdin.setEncoding( 'utf8' );

module.exports = function createIntervals(sets, intervals, speak) {
  var intervalSet = [];

  while(sets > 0) {
    intervalSet = intervalSet.concat(intervals);
    sets--;
  }

  function runTimer() {
    if (intervalSet.length <= 0) {
      process.exit();
      return;
    }
    startTimer(intervalSet.shift(), runTimer, speak);
  }

  runTimer();
};

function startTimer(minutes, callback, speak) {
  var currentSet = {
    minutes: minutes,
    startTime: Date.now(),
    now: Date.now(),
    speak: speak,
    paused: false
  };
  var removeListener = setKeybindingsForCurrentSet(currentSet);
  tick(currentSet);
  function tick () {
    if (!currentSet.paused) {
      currentSet.now+=1000;
      var timeInSeconds = getRemainingTimeInSeconds(currentSet);

      if (timeInSeconds <= 0) {
        var phrase = 'interval complete';
        console.log(phrase, '\n');
        growl(phrase, { title: 'interval-timer'});
        if (currentSet.speak) {
          say.speak(phrase);
        }
        removeListener();
        callback();
      } else {
        updateTimer(currentSet);
        setTimeout(tick, 1000);
      }
    } else {
      setTimeout(tick, 1000);
    }
  }
}


function getRemainingTimeInSeconds(intervalSet) {
  var minutesInMs = intervalSet.minutes * 60 * 1000;
  return (intervalSet.startTime + minutesInMs - intervalSet.now)/1000;
}

function setKeybindingsForCurrentSet(intervalSet) {
  var listener = function (key) {
      if ( key === '\u0003' ) {
        process.exit();
      }
      if (key === "p" ) {
        intervalSet.paused = !intervalSet.paused;
        updateTimer(intervalSet);
      }
      if (!isNaN(parseFloat(key))) {
        intervalSet.minutes+= +key;
        updateTimer(intervalSet);
      }
      if (key === '-') {
        intervalSet.minutes-= 1;
        updateTimer(intervalSet);
      }
  };
  stdin.on('data', listener);
  return function() {
    stdin.removeListener('data', listener);
  };
}

function updateTimer(intervalSet) {
  var timeRemaining = getRemainingTimeInSeconds(intervalSet);
  var pPaused = intervalSet.paused ? 'paused' : '';
  if (timeRemaining <= 0) {
    timeRemaining = 0;
  }
  var pTime = {
    seconds:Math.floor(timeRemaining % 60),
    minutes:Math.floor(timeRemaining / 60)
  };

  log('Current timer:', pTime.minutes, ':', pTime.seconds, pPaused,'\n');
}
