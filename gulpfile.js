var gulp = require('gulp'),
  concat = require('gulp-concat'),
  minifyCss = require('gulp-minify-css'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  jshint = require('gulp-jshint'),
  requireOptimize = require('gulp-requirejs-optimize'),
  browserSync = require('browser-sync'),
  rjs = require('requirejs'),
  gulp_remove_logging = require("gulp-remove-logging"),
  htmlmin = require('gulp-htmlmin'),
  assetRev = require('gulp-asset-rev'),
  runSequence = require('run-sequence'),
  rev = require('gulp-rev'),
  revCollector = require('gulp-rev-collector'),
  del = require('del'),
  imageMin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant');

var paths = {
  scripts: [
    ['./js/**/*.js', './tpls/*.html', './assets/**/*.js',
      './assets/**/**/*.js', './lib/*.js', 'main.js']
  ]
};
//脚本检查
gulp.task('lint', function () {
  gulp.src('./js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
// 上线压缩css
gulp.task('cssmin', function () {
  gulp.src(['./css/*.css'])
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/css/'))
})
// 压缩图片
gulp.task('images', function () {
  gulp.src('./imgs/*.*')
    .pipe(imageMin({
      progressive: true, // 无损压缩JPG图片
      svgoPlugins: [{
        removeViewBox: false
      }], // 不移除svg的viewbox属性
      use: [pngquant()] // 使用pngquant插件进行深度压缩
    }))
    .pipe(gulp.dest('dist/imgs/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});
gulp.task('images-login', function () {
  gulp.src('./imgs/login/*.*')
    .pipe(imageMin({
      progressive: true,
      // 无损压缩JPG图片
      svgoPlugins: [{
        removeViewBox: false
      }],
// 不移除svg的viewbox属性
      use: [pngquant()]
// 使用pngquant插件进行深度压缩
    }))
    .pipe(gulp.dest('dist/imgs/login'))
    .pipe(browserSync.reload({
      stream: true
    }));
});
// 压缩html
gulp.task('htmlmin', function () {
  var options = {
    removeComments: true,
//清除HTML注释
    collapseWhitespace: true,
    //压缩HTML
    collapseBooleanAttributes: true,
//省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true,
//删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true,
//删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true,
    //删除<style>和<link>的type="text/css"
    minifyJS: true, //压缩页面JS
    minifyCSS: true //压缩页面CSS
  };
  gulp.src(['./main.html','./index.html'])
    .pipe(htmlmin(options))
    .pipe(gulp.dest('dist/'));
})
// 压缩lib/js
gulp.task('jsmin', function () {
  gulp.src('./lib/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/lib/'));
})
//文件copy到dist上线
gulp.task('ico', function (cb) {
  gulp.src(['favicon.ico'])
    .pipe(gulp.dest('dist/'))
});

// 将静态文件copy到dist
gulp.task('copy', function () {
  gulp.src(['./assets/**'])
    .pipe(gulp.dest('dist/assets'))
});
gulp.task('copyimgs', function () {
  gulp.src(['./imgs/**'])
    .pipe(gulp.dest('dist/imgs'))
})

// js主文件去除console.log
gulp.task('removelog',function(){
  gulp.src('./js/**/*.js')
    .pipe(gulp_remove_logging({
      namespace: ['console']
    }))
    .pipe(gulp.dest('./js'))
})
//require合并
gulp.task('rjs', function (cb) {
  rjs.optimize({
    baseUrl: "./js",
    mainConfigFile: "main.js",
    preserveLicenseComments: false,
    //去掉头部版权声明
    removeCombined: false,
//自动删除被合并过的文件
  }, function (buildResponse) {
    // console.log('build response', buildResponse);
    cb();
  }, cb)
});

// js主文件合并
gulp.task('build', function (done) {
  condition = false;
  runSequence(
    ['removelog'] ,['rjs'],
    done);
});
// Rerun the task when a file changes
gulp.task('watch', function () {
  var watcher = gulp.watch(paths.scripts, ['rjs']);
  watcher.on('change', function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});
gulp.task('browser', function () {
  browserSync.init({
    files: ['./css/*.css', './*.js', './js/**/*.js', './tpls/*.html'],
    // server:{
    //     baseDir:'./',
    //     index:'index.html'
    // },
    proxy: '127.0.0.1',
    port: 80
  })
})
gulp.task('dev', [ 'browser']);
gulp.task('dist', ['build','cssmin', 'htmlmin', 'jsmin', 'copy', 'ico', 'copyimgs']);