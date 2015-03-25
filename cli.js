#!/usr/bin/env node
'use strict';
var meow = require('meow');
var intervalTimerCli= require('./');

var cli = meow({
  help: [
    'Options',
    '--quiet will not use any sound',
    '--intervals <desired minutes seperarated by \',\'>',
    '--sets <number of repetitions for the intervals>',
    'Example',
    'interval-timer --sets 2 --intervals 25,5',
    'interval-timer --quiet --sets 2 --intervals 25,5'
  ].join('\n')
});

var flags = cli.flags;
  var intervals = flags.intervals || '25,5',
    sets = flags.sets || 1,
    quiet = flags.quiet || false,
    intervalInts;
    if(intervals.split) {
      intervalInts = intervals.split(',').map(function(i){
        return +i;
      });
    } else {
      intervalInts = [+intervals];
    }

console.log('Will time', intervalInts, 'for ', sets, ' sets');

intervalTimerCli(sets, intervalInts, quiet);
