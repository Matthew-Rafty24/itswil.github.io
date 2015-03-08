var gulp = require('gulp');

var rimraf = require('rimraf');

var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');


gulp.task('rmrf', function () {
    rimraf.sync('./build');
});

gulp.task('sass', function () {
    gulp.src(['./static/css/normalize.css',
                './static/css/styleguide/styleguide.scss',
                './static/css/*.scss'])
        .pipe(sass())
        .pipe(concat('css.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./build/css'));
});

gulp.task('default', ['rmrf', 'sass']);

gulp.task('watch', function() {
    gulp.watch('./static/**/*.*', ['default']);
});
