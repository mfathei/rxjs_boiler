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
        output.html('<h1>X: ' + event.clientX + ' Y: ' + event.clientY + '</h1>');
    },
    function (err) {
        console.error(err);
    },
    function () {
        console.log('completed');
    }
);

// array
const numbers = [22, 33, 44, 55, 66];
const numbers$ = Rx.Observable.from(numbers);

numbers$.subscribe(
    function (v) {
        console.log(v);
    },
    function (err) {
        console.error(err);
    },
    function () {
        console.log('completed');
    }
);

// array of objects
const posts = [
    { title: "Post One", body: "Post Body" },
    { title: "Post Two", body: "Post Body" },
    { title: "Post Three", body: "Post Body" },
];
const posts$ = Rx.Observable.from(posts);
const postsOutput = $('#posts');

posts$.subscribe(
    function (post) {
        postsOutput.append('<li><h3>' + post.title + '</h3><p>' + post.body + '</p></li>');
    },
    function (err) {
        console.error(err);
    },
    function () {
        console.log('completed');
    }
);

// set
const set = new Set(['Hello', 14, { title: 'test' }]);
const set$ = Rx.Observable.from(set);

set$.subscribe(
    function (v) {
        console.log(v);
    },
    function (err) {
        console.error(err);
    },
    function () {
        console.log('completed');
    }
);

// map
const map = new Map([[1, 3], [5, 14], [7, 19]]);
const map$ = Rx.Observable.from(map);

map$.subscribe(
    function (v) {
        console.log(v);
    },
    function (err) {
        console.error(err);
    },
    function () {
        console.log('completed');
    }
);



// observable from scratch
const source$ = new Rx.Observable(observer => {
    console.log('Crearing Observable');

    observer.next('Hello World!');

    observer.error(new Error('An error occured'));// throw an error

    setTimeout(() => {
        observer.next('Another value');
        observer.complete();
    }, 3000)
});

source$
    .catch(err => Rx.Observable.of(err))// this will give the following err function the control to handle the error
    .subscribe(
        v => {
            console.log(v);
        },
        err => {
            console.error(err);
        },
        () => {
            console.log('completed');
        }
    );

// promise
const promise = new Promise((resolve, reject) => {
    console.log('Creating promise');

    setTimeout(() => {
        resolve('Hello from promise');
    }, 3000);
});

/*
promise.then(
    x => console.log(x),
    err => console.error(err)
);

*/
const promise$ = Rx.Observable.fromPromise(promise);

promise$.subscribe(
    v => {
        console.log(v);
    },
    err => {
        console.error(err);
    },
    () => {
        console.log('completed');
    }
);

function getUser(username) {
    return $.ajax(
        {
            url: 'https://api.github.com/users/' + username,
            dataType: 'json'
        }
    ).promise();
}

const sourcePromise$ = Rx.Observable.fromPromise(getUser('mfathei'));

sourcePromise$.subscribe(
    v => {
        console.log(v);
    },
    err => {
        console.error(err);
    },
    () => {
        console.log('completed');
    }
);


// interval
const interval$ = Rx.Observable.interval(1000);

// interval$.subscribe(x => console.log(x));

// timer
const timer$ = Rx.Observable.timer(1000, 1000)
    .take(5);

timer$.subscribe(
    x => console.log(x),
    err => console.log(err),
    () => console.log('completed')
);


// range
const range$ = Rx.Observable.range(100, 20);

range$.subscribe(
    x => console.log(x),
    err => console.log(err),
    () => console.log('completed')
);

// map
const mapSource$ = Rx.Observable.interval(1000)
    .take(10)
    .map(x => x * 2);

mapSource$.subscribe(
    x => console.log(x),
    err => console.log(err),
    () => console.log('completed')
);

// map
const mapSource2$ = Rx.Observable.from(['tom', 'john', 'shown'])
    .map(v => 'I am ' + v)
    .map(x => x.toUpperCase());

mapSource2$.subscribe(
    x => console.log(x),
    err => console.log(err),
    () => console.log('completed')
);

// pluck
const users = [
    { name: "Tom", age: 50 },
    { name: "John", age: 34 },
    { name: "Shawn", age: 71 }
];

const pluckSource$ = Rx.Observable.from(users)
    .pluck('name');

pluckSource$.subscribe(
    x => console.log(x),
    err => console.log(err),
    () => console.log('completed')
);


// merge
Rx.Observable.of('Hello')
    .merge(Rx.Observable.of('World'))
    .subscribe(x => console.log(x));

Rx.Observable.interval(1000)
    .merge(Rx.Observable.interval(500))
    .take(25)
    .subscribe(x => console.log(x));

    const source1$ = Rx.Observable.interval(1000).map(x => 'Merge1: ' + x);
    const source2$ = Rx.Observable.interval(500).map(x => 'Merge2: ' + x);

    Rx.Observable.merge(source1$, source2$)
    .take(25)
    .subscribe(x => console.log(x));

// concat
const source3$ = Rx.Observable.range(0, 5).map(x => 'Source 1: ' + x);
const source4$ = Rx.Observable.range(5, 5).map(x => 'Source 2: ' + x);

Rx.Observable.concat(source3$, source4$)
.subscribe(x => console.log(x));
