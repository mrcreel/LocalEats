const gulp = require('gulp');

var pump = require('pump');

const concat = require('gulp-concat');

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
  .pipe(csso())
  .pipe(rename('main.min.css'))
  .pipe(gulp.dest('./dist/css'))
});

gulp.task('scripts-main', function(){
  gulp.src(['./js/dbhelper.js', './js/main.js', './js/header.js'])
  .pipe(concat('main.min.js'))
  .pipe(gulp.dest('./dist/js'))
})

gulp.task('mini', function(){
  gulp.src('./dist/js/main/min.js')
  .pipe(uglify())
  .pipe(gulp.dest('./dist/js'))
})

gulp.task('watch', ['sass', 'scripts-main',], function(){
  gulp.watch('./scss/**/*.scss', ['sass']);
  gulp.watch('./js/*.js', ['scripts-main']);
});