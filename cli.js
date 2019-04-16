const meow = require('meow');
const intervalTimerCli= require('./');
const cli = meow({
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

const flags = cli.flags;
const intervals = flags.intervals || flags.i;
const sets = flags.sets || flags.s || 1;
const speak = flags.speak || flags.spk || false;
const labels = flags.labels || flags.l || [];
const pSets = sets > 1 ? 'iterations' : 'iteration';
let intervalInts;

if(intervals === undefined) {
  console.log(cli.help);
  process.exit();
  return;
}
else if(intervals.split) {
  intervalInts = intervals.split(',').map(i => {
    return +i;
  });
} else {
  intervalInts = [+intervals];
}
const pIntervals = intervalInts.map(v => {
  return v + (v > 1 ? ' minutes' : ' minute');
});

console.log('Intervals:', pIntervals, 'for', sets, pSets);
intervalTimerCli(sets, intervalInts, speak, labels);
