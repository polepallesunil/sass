var gulp = require('gulp');
	   webserver = require('gulp-webserver');
	   sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    gutil = require('gulp-util')
    server = require('gulp-express'),
    livereload = require('gulp-livereload');


var tinylr;


gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
  tinylr.listen(35729);
});

gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true,
	    port: 4000
    }));
});


var cssInput = 'app/scss/*.scss';
var cssOutput = 'dist/css';
var htmlInput = 'app/*.html';

gulp.task('styles', function () {
  return gulp
    .src(cssInput)
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest(cssOutput))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest(cssOutput));
    gutil.log('CSS Changes Updated!');
});

gulp.task('html', function() {
    return gulp.src(htmlInput)
       .pipe(gulp.dest('dist'));
       gutil.log('HTML Changes Updated!');
});

gulp.task('watch', function() {
  gulp.watch(htmlInput, ['html']);
  
  gulp.watch(cssInput, ['styles']);
     // .watch(htmlInput, ['html'])
    // When there is a change,
    // log a message in the console
    gulp.on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});



gulp.task('default', ['styles', 'html', 'webserver', 'livereload', 'watch'], function() {
  return gutil.log('Gulp is running!')
});