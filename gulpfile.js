// 引入组件
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
// 检查脚本
gulp.task('lint', function() {
    gulp.src('./src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 编译Sass
gulp.task('sass', function() {
    gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'));
});

//html
gulp.task('html', function(){
 gulp.src('./src/html/*.html')
    .pipe(gulp.dest('./dist/html'))
})

//index html
gulp.task('index', function(){
    gulp.src('./src/html/index.html')
        .pipe(gulp.dest('./'))
})

// 合并，压缩文件
gulp.task('scripts', function() {
    gulp.src('./src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

// serve
gulp.task('serve', ['lint', 'sass', 'scripts', 'html', 'index'], function(){
    browserSync.init({
        server: "./"
    });
    // 监听文件变化
    gulp.watch('./src/js/*.js', ['lint', 'scripts'])
    gulp.watch('./src/sass/*.scss', ['sass'])
    gulp.watch('./src/html/*.html', ['html', 'index'])
    gulp.watch(['./src/js/*.js', './src/html/*.html', './src/scss/*.scss'])
        .on('change', reload);
});
//default
gulp.task('default', ['serve']);