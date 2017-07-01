'use strict';
const gulp     = require('gulp');
const concat   = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const sass     = require('gulp-sass');
const cleanCss = require('gulp-clean-css');
const uglify   = require('gulp-uglify');
const nodemon  = require('gulp-nodemon');
const replace  = require('gulp-replace');
const del      = require('del');
const webpack  = require('webpack-stream');
const config   = require('./webpack.config');

gulp.task('clean', () => {
  return del.sync('./build');
});

gulp.task('images', () => {
  return gulp.src('src/static/images/*.*')
    .pipe(imagemin({
      optimizationLevel: 3, //png
      progressive: true,    //jpg
      intralaced: false,    //gif
      mutlipass: false,     //svg
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('build/static/images'));
});

gulp.task('sass', () => {
  return gulp.src('./src/static/styles/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.min.css'))
    .pipe(cleanCss({ compatibility: 'ie8' }))
    .pipe(gulp.dest('./build/static'));
});

gulp.task('js', () => {
  return gulp.src('./src/static/scripts/index.js')
    .pipe(webpack(config))
    .pipe(gulp.dest('./build/static'));
});

gulp.task('views', () => {
  return gulp.src(['./src/views/**/*'])
    .pipe(gulp.dest('./build/views'));
});

gulp.task('root-files', () => {
  return gulp.src('./src/express-explorer.js')
    .pipe(gulp.dest('./build'));
});

gulp.task('package', () => {
  return gulp.src('./package.json')
    .pipe(replace('"private": true', '"private": false'))
    .pipe(replace(/,([^}]+)"devDependencies"([^}]+)}/, ''))
    .pipe(gulp.dest('./build'));
});

gulp.task('misc', () => {
  return gulp.src('./README.md')
    .pipe(gulp.dest('./build'));
});

gulp.task('watch', () => {
  gulp.watch('./src/static/styles/**/*.scss', ['sass']);
  gulp.watch('./src/static/scripts/**/*.js', ['js']);
  gulp.watch('./src/views/**/*', ['views']);
  gulp.watch('./src/express-explorer.js', ['root-files']);
  gulp.watch('./src/package.json', ['package']);
});

gulp.task('build', ['clean', 'images', 'sass', 'js', 'views', 'root-files', 'package']);

gulp.task('serve', ['build'], () => {
  return nodemon({
    script: 'test-server.js',
    watch: ['test-server.js', 'src/express-explorer.js', 'src/package.json']
  })
});

gulp.task('default', ['serve', 'watch']);
