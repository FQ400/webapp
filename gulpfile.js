'use strict';

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var haml = require('gulp-ruby-haml');
var minifyCSS = require('gulp-minify-css');
var gulpBowerFiles = require('gulp-bower-files');
var express = require("express");
var concat = require('gulp-concat');
var help = require('gulp-task-listing');
var clean = require('gulp-clean');

// ASSETS
gulp.task('build', ['build_html', 'build_css', 'build_bowerfiles', 'build_javascript', 'build_images']);

gulp.task('build_html', function () {
  gulp.src('app/**/*.haml')
    .pipe(haml())
    .pipe(gulp.dest('build'));
});

gulp.task('build_css', function () {
  gulp.src('app/styles/*.scss')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/styles'));
});

gulp.task('build_bowerfiles', function () {
  gulpBowerFiles().pipe(gulp.dest("build/lib"));
});

gulp.task('build_javascript', function () {
  gulp.src('scripts/*.js')
    .pipe(concat('application.js'))
    .pipe(gulp.dest('build'))
});

gulp.task("build_images", function () {
  gulp.src('app/images/*')
    .pipe(gulp.dest('build/images'))
});


// CLEAN
gulp.task('clean', function () {
  gulp.src('build', {read: false})
    .pipe(clean());
});


// SERVER
gulp.task('server', function() {
  var app = express();
  app.use(express.static(__dirname + "/build/"));
  console.log('server runs on port 9000')
  app.listen(9000);
});

gulp.task('watch', ['server'], function () {
  gulp.watch('app/**/*.haml', ['build_html']);
  gulp.watch('app/styles/**/*.scss', ['build_css']);
  gulp.watch('app/scripts/**/*.js', ['build_javascript']);
  gulp.watch('app/images/**/*', ['build_images']);
  gulp.watch('app/bower_components/*', ['build_bowerfiles']);
});


gulp.task('default', help)
gulp.task('help', help)
