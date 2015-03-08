var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rimraf = require('rimraf');

gulp.task('rmrf', function () {
    rimraf.sync('./build');
});

gulp.task('sass', function () {
    gulp.src(['./static/css/normalize.css',
                './static/css/styleguide/styleguide.scss',
                './static/css/*.scss'])
        .pipe(sass())
        .pipe(concat('css.css'))
        .pipe(gulp.dest('./build/css'));
});

gulp.task('default', ['rmrf', 'sass']);

gulp.task('watch', function() {
    gulp.watch('./static/**/*.*', ['default']);
});
