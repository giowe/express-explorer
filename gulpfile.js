'use strict';
const gulp = require('gulp');
const shell = require('gulp-shell');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');

gulp.task('connect', shell.task([
    'node .',
]));

gulp.task('sass', () => {
    gulp.src('./src/styles/index.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('styles.min.css'))
        .pipe(cleanCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('./public'));
});

gulp.task('js', () => {
    gulp.src('./src/scripts/**/*.js')
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public'));
});

gulp.task('watch', () => {
    gulp.watch('./src/styles/**/*.scss', ['sass']);
    gulp.watch('./src/scripts/**/*.js', ['js']);
});

gulp.task('default', ['js', 'sass', 'watch']);