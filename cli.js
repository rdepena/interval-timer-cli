#!/usr/bin/env node
'use strict';
var meow = require('meow');
var intervalTimerCli= require('./');
var cli = meow({
  help: [
    'Options',
    '-spk --speak <will enable text to speech for audio feedback>',
    '-i --intervals <desired minutes seperarated by \',\'>',
    '-s --sets <number of repetitions for the intervals>',
    '',
    'Keybindings:',
    'p will pause/resume the timer',
    '1-9 will add 1-9 minutes to the timer',
    '- will remove 1 minute from the timer',
    '',
    'Examples:',
    'interval-timer --sets 2 --intervals 25,5 --speak',
    'interval-timer -s 2 -i 25,5 --spk'
  ].join('\n')
});

var flags = cli.flags;
var intervals = flags.intervals || flags.i;
var sets = flags.sets || flags.s || 1;
var speak = flags.speak || flags.spk || false;
var labels = flags.labels || flags.l || [];
var pSets = sets > 1 ? 'iterations' : 'iteration';
var intervalInts;

if(intervals === undefined) {
  console.log(cli.help);
  process.exit();
  return;
}
else if(intervals.split) {
  intervalInts = intervals.split(',').map(function(i){
    return +i;
  });
} else {
  intervalInts = [+intervals];
}
var pIntervals = intervalInts.map(function(v) {
  return v + (v > 1 ? ' minutes' : ' minute');
});

console.log('Intervals:', pIntervals, 'for', sets, pSets);
intervalTimerCli(sets, intervalInts, speak, labels);
