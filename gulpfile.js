'use strict';
const gulp = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const nodemon = require('gulp-nodemon');
const replace = require('gulp-replace');
const del = require('del');

gulp.task('clean', () => {
  return del.sync('./build');
});

gulp.task('sass', () => {
  gulp.src('./src/static/styles/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.min.css'))
    .pipe(cleanCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('./build/static'));
});

gulp.task('js', () => {
  gulp.src('./src/static/scripts/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/static'));

  gulp.src('./src/static/scripts/vendor/json-formatter.js')
    .pipe(gulp.dest('./build/static'));
});

gulp.task('views', () => {
  gulp.src(['./src/views/**/*'])
    .pipe(gulp.dest('./build/views'));
});

gulp.task('root-files', () => {
  gulp.src('./src/express-explorer.js')
    .pipe(gulp.dest('./build'));
});

gulp.task('package', () => {
  gulp.src('./src/package.json')
    .pipe(replace('"private": true', '"private": false'))
    .pipe(gulp.dest('./build'));
});


gulp.task('watch', () => {
  gulp.watch('./src/static/styles/**/*.scss', ['sass']);
  gulp.watch('./src/static/scripts/**/*.js', ['js']);
  gulp.watch('./src/views/**/*', ['views']);
  gulp.watch('./src/express-explorer.js', ['root-files']);
  gulp.watch('./src/package.json', ['package']);
});

gulp.task('build', ['clean', 'sass', 'js', 'views', 'root-files', 'package']);

gulp.task('serve', ['build'], () => {
  nodemon({
    script: 'test-server.js',
    watch: ['test-server.js', 'src/express-explorer.js', 'src/package.json']
  })
});

gulp.task('default', ['serve', 'watch']);
