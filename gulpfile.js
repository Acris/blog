var gulp = require('gulp')
var cleanCSS = require('gulp-clean-css')
var uglify = require('gulp-uglify')
var htmlclean = require('gulp-htmlclean')
var htmlmin = require('gulp-htmlmin')
var babel = require('gulp-babel')

function cssMinify() {
    return gulp.src('./public/**/*.css')
        .pipe(cleanCSS({
            compatibility: 'ie9'
        }))
        .pipe(gulp.dest('./public'))
}

function htmlMinify(cb) {
    return gulp.src('./public/**/*.html')
        .pipe(htmlmin({
            removeComments: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('./public'))
}

function jsMinify(cb) {
    return gulp.src('./public/**/*.js')
        .pipe(babel({
            presets: ['env']
        }),)
        .pipe(uglify())
        .pipe(gulp.dest('./public'))
}

exports.default = gulp.series(clean, gulp.parallel(cssMinify, htmlMinify, jsMinify))
