> Pomodoro / HIIT style Interval timer right in the console.

Cli tool that lets you create a set of interval sequences.

## Install

```sh
$ npm install --global interval-timer-cli
$ interval-timer --help
```


## Usage

Creating a pomodoro set of 25 minutes, then five minutes that will be repeated twice:
```sh
$ interval-timer --sets 2 --intervals 25,5
```
Creating a practice sequence of 15 minutes, then five minutes then 3 minutes that will be done just once:
```sh
$ interval-timer --intervals 15,5,3
```
The quiet flag can be used to silence the alarm:
```sh
$ interval-timer --quiet --sets 2 --intervals 25,5
```

## License

MIT © [Ricardo de Pena](http://rdepena.com/)
