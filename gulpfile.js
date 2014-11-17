/*!
 * gulp
 */

// Load plugins
var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    minifyhtml = require('gulp-minify-html'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    del = require('del'),
    es = require('event-stream'),
    gzip = require('gulp-gzip');
    usemin = require('gulp-usemin');

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('html', 'styles', 'scripts', 'images');
});

// HTML
gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe(minifyhtml())
    //.pipe(gzip())
    .pipe(gulp.dest('dist/'))
});

// Styles
gulp.task('styles', function() {
  return gulp.src(['src/styles/*'])
    .pipe(minifycss())
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(gzip())
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src(['src/scritps/jquery-1.6.1.min.js', 'src/scripts/jquery.js', 'src/scripts/jquery.l*', 'src/scripts/jquery.nivo.slider.pack.js'])
    .pipe(minifycss())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(gzip())
});

// Images
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
});

// Clean
gulp.task('clean', function(cb) {
    del(['dist/*', 'dist/**' ], cb)
});

// Change css/script to minified references in *.html files
gulp.task('usemin', function() {
  gulp.src('src/*.html')
    .pipe(usemin({
      css: [],
      js: []
    }))
    .pipe(gulp.dest('dist/'));
});
