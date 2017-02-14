'use strict';
const gulp = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const nodemon = require('gulp-nodemon');
const del = require('del');

gulp.task('clean', () => {
  return del.sync('./dist');
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

gulp.task('views', () => {
  gulp.src(['./src/views/**/*'])
    .pipe(gulp.dest('./dist/views'));
});

gulp.task('root-files', () => {
  gulp.src(['./src/express-explorer.js', './src/package.json'])
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', () => {
  gulp.watch('./src/static/styles/**/*.scss', ['sass']);
  gulp.watch('./src/static/scripts/**/*.js',  ['js']);
  gulp.watch('./src/views/**/*',              ['views']);
  gulp.watch(['./src/express-explorer.js', './src/package.json'], ['root-files']);
});

gulp.task('dist', ['clean', 'sass', 'js', 'views', 'root-files']);

gulp.task('serve', ['dist'], () => {
  nodemon({
    script: 'test-server.js',
    watch: ['test-server.js', 'src/express-explorer.js', 'src/package.json']
  })
});

gulp.task('default', ['serve', 'watch']);
