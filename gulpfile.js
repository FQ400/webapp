var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var haml = require('gulp-haml');
var minifyCSS = require('gulp-minify-css');
var gulpBowerFiles = require('gulp-bower-files');


gulp.task('haml', function() {
  gulp.src('app/templates/*.haml')
    .pipe(haml())
    .pipe(gulp.dest('build/templates'));

  gulp.src('app/*.haml')
    .pipe(haml())
    .pipe(gulp.dest('build'));
});


gulp.task('scss', function() {
  gulp.src('app/styles/*.scss')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/styles'));
});


gulp.task("bower-files", function() {
  gulp.src('app/styles/*.scss')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/styles'));
});

gulp.task("script", function() {
  gulpBowerFiles().pipe(gulp.dest("build/lib"));
});

gulp.task("images", function() {
  gulp.src('app/images/*')
    .pipe(gulp.dest('build/images'))
});


gulp.task('build', function() {
  gulp.run('haml', 'scss', 'bower-files', 'images')
});


gulp.task('default', function() {
  gulp.run('build')
});
