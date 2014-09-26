# stream-if-env

Create conditional object streams based on `NODE_ENV`. If the environment doesn't match, the stream function is not called, and a through stream is returned instead. If the environment matches, then the passed function is called with all the remaining arguments. Optionally, if a function is not passed, a boolean is returned based on a match of the environment.

## Usage

- `when('development', streamFn, [arg1, arg2, ...])`
  
  If `NODE_ENV` is equal to `development`, `when` returns the value of calling `streamFn` with arguments `arg1`, `arg2`, etc. If not, then a through stream is returned.
  
- `unless('development', streamFn, [arg1, arg2, ...])`

  If `NODE_ENV` is _not_ equal to `development`, `unless` returns the value of calling `streamFn` with arguments `arg1`, `arg2`, etc. If not, then a through stream is returned.

- `when(NODE_ENV)`/`unless(NODE_ENV)`

  If either `when` or `unless` are only called with an environment to test, then the boolean result of the environment match is returned.

## Examples

The examples are based on [`gulp`](https://github.com/gulpjs/gulp), but any stream will do.

```js
var gulp = require('gulp');
var uglify = require('uglify');

var when = require('stream-if-env').when;

gulp.task('scripts', function() {
  return gulp.src('app/*.js')
    .pipe(when('production', uglify, {preserveComments: true}))
    .pipe(gulp.dest('public'));
});
```


```js
var unless = require('stream-if-env').unless;
if (unless('development')) {
  console.log('NODE_ENV is not "development"');
}
```

## Tip

Calling `when` and `unless` with the environment each time is probably not necesarry since you're most likely testing for `production` or `development`. So, create a partial function instead.

```js
var ifProd = require('stream-if-env').when.bind(null, 'production');
//..
  return gulp.src('app/*.js')
    .pipe(ifProd(uglify, {preserveComments: true}))
    .pipe(gulp.dest('public'));
//...
```

```js
var notDev = require('stream-if-env').unless.bind(null, 'development');
if (notDev()) {
  console.log('NODE_ENV is not "development"');
}
```

