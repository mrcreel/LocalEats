const gulp = require('gulp');

const uglify = require('gulp-uglify');
const csso = require('gulp-csso');

const rename = require('gulp-rename');

const sass = require('gulp-sass');

const webp = require('gulp-webp');
const image = require('gulp-image');

gulp.task('images', function () {
  gulp.src('./img/*.jpg')
  .pipe(image())
  .pipe(webp())
  .pipe(gulp.dest('dist/img'))
});


gulp.task('sass', function() {
  gulp.src('./scss/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('./dist/css'))
  .pipe(rename('main.min.css'))
  .pipe(csso())
  .pipe(gulp.dest('./dist/css'))
});

gulp.task('watch', ['sass'], function(){
  gulp.watch('./scss/**/*.scss', ['sass'])
});