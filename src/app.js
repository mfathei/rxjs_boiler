import $ from 'jquery';
import Rx from 'rxjs/Rx';

const btn = $('#btn');
const btnStream$ = Rx.Observable.fromEvent(btn, 'click');

btnStream$.subscribe(
    function (event) {
        console.log(event.target.innerHTML);
    },
    function (err) {
        console.error(err);
    },
    function () {
        console.log('completed');
    }
);

const input = $('#input');
const inputStream$ = Rx.Observable.fromEvent(input, 'keyup');

inputStream$.subscribe(
    function (event) {
        console.log(event.target.value);
    },
    function (err) {
        console.error(err);
    },
    function () {
        console.log('completed');
    }
);


const output = $('#output');
const outputStream$ = Rx.Observable.fromEvent(document, 'mousemove');

outputStream$.subscribe(
    function (event) {
        console.log(event.target.value);
        output.html('<h1>X: ' + event.clientX + ' Y: ' + event.clientY + '</h1>');
    },
    function (err) {
        console.error(err);
    },
    function () {
        console.log('completed');
    }
);
