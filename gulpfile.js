const gulp = require('gulp');
const webp = require('gulp-webp');
const del = require('del');
const imagemin = require('gulp-imagemin');
const imgCompress = require('imagemin-jpeg-recompress');
const { parallel, series } = require('gulp');

function clean() {
  return del(['build/*']);
}
exports.clean = clean;

function webpOptimize() {
  return gulp.src('src/*')
    .pipe(webp())
    .pipe(gulp.dest('build/'));
}
exports.webpOptimize = webpOptimize;

function imgOptimize() {
  return gulp.src('src/*')
    .pipe(imagemin([
      imgCompress({
        loops: 4,
        min: 69,
        max: 80,
        quality: 'high'
      }),
      imagemin.gifsicle(),
      imagemin.optipng(),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('build/'));
}
exports.imgOptimize = imgOptimize;

exports.default = series(clean, parallel(webpOptimize, imgOptimize));
