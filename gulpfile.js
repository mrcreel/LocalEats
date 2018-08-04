const gulp = require('gulp');

const webp = require('gulp-webp');
const image = require('gulp-image');

gulp.task('test', function() {
  console.log('Gulp js is running');
});

gulp.task('images', function () {
  gulp.src('./img/*.jpg')
  .pipe(image())
  .pipe(webp())
  .pipe(gulp.dest('dist/img'))
});
