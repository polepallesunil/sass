var gulp = require('gulp');
	   webserver = require('gulp-webserver');
	   sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    gutil = require('gulp-util')
    autoprefixer = require('gulp-autoprefixer'),
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
    .pipe(gulp.dest(cssOutput));
});

gulp.task('html', function() {
    return gulp.src(htmlInput)
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  return gulp
    // Watch the input folder for change,
    // and run `sass` task when something happens
    .watch(cssInput, ['styles'])
   // .watch(htmlInput, ['html'])
    // When there is a change,
    // log a message in the console
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});



gulp.task('default', ['styles', 'webserver', 'livereload', 'watch'], function() {
  return gutil.log('Gulp is running!')
});