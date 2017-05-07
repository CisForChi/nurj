var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('js', function () {
  gulp.src('./src/javascript/*.js')
    .pipe(browserify())
    .pipe(gulp.dest('./public/javascript'));
});

gulp.task('default', ['js'])
