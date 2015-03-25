#!/usr/bin/env node
'use strict';
var meow = require('meow');
var nodeIntervalTimer = require('./');

var cli = meow({
  help: [
    'Usage',
    '  node-interval-timer <input>',
    '',
    'Example',
    '  node-interval-timer Unicorn'
  ].join('\n')
});

var flags = cli.flags;

  var intervals = flags.intervals || '0.1, 0.2',
    sets = flags.sets || 1,
    quiet = flags.quiet || false,
    intervalInts = intervals.split(',').map(function(i){
      return +i;
    });

console.log('Will time', intervalInts, 'for ', sets, ' sets');

nodeIntervalTimer(sets, intervalInts, quiet);
