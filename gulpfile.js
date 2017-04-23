var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean-css');
var gcmq = require('gulp-group-css-media-queries');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

var config = {
    root: './src',
    css: {
        watch: '/precss/**/*.sass',
        src: '/precss/styles.sass',
        dest: '/css'
    },
    html: {
        src: '/*.html'
    }
};

gulp.task('pack', function(){
    gulp.src(config.root + config.css.dest + '/*.css')
        .pipe(autoprefixer({
            browsers: ['> 0.01%'],
            cascade: false
        }))
        .pipe(clean())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(config.root + config.css.dest))
});

gulp.task('build', function(){
    gulp.src(config.root + config.css.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(gcmq())
        .pipe(gulp.dest(config.root + config.css.dest))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('watch', ['browserSync'], function(){
    gulp.watch(config.root + config.css.watch, ['build']);
    gulp.watch(config.root + config.html.src, browserSync.reload);
});

gulp.task('browserSync', function(){
    browserSync.init({
       server: {
            baseDir: config.root
       }       
    });
});