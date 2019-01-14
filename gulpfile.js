const gulp = require('gulp')
const del = require('del')
const cleanCSS = require('gulp-clean-css')
const uglify = require('gulp-uglify')
const htmlclean = require('gulp-htmlclean')
const htmlmin = require('gulp-htmlmin')
const babel = require('gulp-babel')

function clean() {
    return del(['./dist'])
}

function cssMinify() {
    return gulp.src('./public/**/*.css')
        .pipe(cleanCSS({
            compatibility: 'ie9'
        }))
        .pipe(gulp.dest('./public'))
}

function htmlMinify() {
    return gulp.src('./public/**/*.html')
        .pipe(htmlclean())
        .pipe(htmlmin({
            removeComments: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('./public'))
}

function jsMinify() {
    return gulp.src('./public/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }),)
        .pipe(uglify())
        .pipe(gulp.dest('./public'))
}

exports.default = gulp.series(clean, gulp.parallel(cssMinify, htmlMinify, jsMinify))
