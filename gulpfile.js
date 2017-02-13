'use strict';
const gulp = require('gulp');
const shell = require('gulp-shell');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');

gulp.task('connect', shell.task([
  'node .',
]));

gulp.task('clean', () => {
  //todo
});

gulp.task('sass', () => {
  gulp.src('./src/static/styles/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.min.css'))
    .pipe(cleanCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist/static'));
});

gulp.task('js', () => {
  gulp.src('./src/static/scripts/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/static'));
});

gulp.task('watch', () => {
  gulp.watch('./src/static/styles/**/*.scss', ['sass']);
  gulp.watch('./src/static/scripts/**/*.js', ['js']);
});

gulp.task('dist', ['clean', 'sass', 'js'], () => {
  //todo

  //copiare pkg
  //copiare views e express-explorer.js
});

gulp.task('default', ['js', 'sass', 'watch']);
