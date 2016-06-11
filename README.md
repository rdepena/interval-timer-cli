> Pomodoro / HIIT style Interval timer right in the console.

Cli tool that lets you create a set of interval sequences.

## Install



### OSX

    $ sudo gem install terminal-notifier

Install [npm](http://npmjs.org/) and run:

    $ npm install --global interval-timer-cli


### Ubuntu (Linux)

    $ sudo apt-get install festival festvox-kallpc16k libnotify-bin

Install [npm](http://npmjs.org/) and run:

    $ npm install --global interval-timer-cli

## Usage
For all options:

    $ interval-timer --help

Creating a pomodoro set of 25 minutes, then five minutes that will be repeated twice:

    $ interval-timer --sets 2 --intervals 25,5

Creating a practice sequence of 15 minutes, then five minutes then 3 minutes that will be done just once:

    $ interval-timer --intervals 15,5,3

The speak flag can be used to enable text to speech for audio feedback:

    $ interval-timer --speak --sets 2 --intervals 25,5

Keybindings:

During a set you can use the following keybindings:

    "p" to pause/resume the timer.

    "1-9" to add 1-9 minutes to the timer

    "-" will remove 1 minute from the timer


## License

MIT © [Ricardo de Pena](http://rdepena.com/)
