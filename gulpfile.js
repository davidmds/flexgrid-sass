// instanciando módulos
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var clean = require('gulp-clean');

// variaveis de entrada e saida
var scss_in = './assets/**/*.scss';
var scss_out = './dist';

gulp.task('clean', function () {
    'use strict';
    gulp.src(scss_out, {read: false})
        .pipe(clean());
});
//compila usando o sass
//gulp sass
gulp.task('sass', function () {
    'use strict';
    gulp.src(scss_in)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({browsers: ['last 5 versions']}))
        .pipe(gulp.dest(scss_out));
});

// Listen for all (just type 'gulp watch' on terminal)
gulp.task('watch', function () {
    'use strict';
    gulp.watch(scss_in, ['sass']);

    // Create LiveReload server
    livereload.listen();
    // Watch any files in "dist/", "app/" "includes/" or "pages/" reload on change
    gulp.watch(['dist/**']).on('change', livereload.changed);
});

// Executes all tasks once a time
gulp.task('default', ['clean', 'sass']);

