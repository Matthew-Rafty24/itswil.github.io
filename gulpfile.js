var gulp = require('gulp');

var rimraf = require('rimraf');

var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');

var jshint = require('gulp-jshint');

var uglify = require('gulp-uglify');


gulp.task('rmrf', function() {
    rimraf.sync('./build');
});

gulp.task('sass', function() {
    gulp.src(['./static/css/normalize.css',
                './static/css/styleguide/styleguide.scss',
                './static/css/*.scss'])
        .pipe(sass())
        .pipe(concat('css.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./build/css'));
});

gulp.task('jshint', function() {
    return gulp.src('./static/js/*.js')
      .pipe(jshint());
});

gulp.task('js', function() {
    gulp.src('./static/js/*.js')
      .pipe(uglify())
      .pipe(concat('js.js'))
      .pipe(gulp.dest('./build/js/'))
});

gulp.task('default', ['rmrf', 'sass', 'jshint', 'js']);

gulp.task('watch', function() {
    gulp.start('default');
    gulp.watch('./static/**/*.*', ['default']);
});
