var gulp = require('gulp');
var pump = require('pump');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var babel = require('gulp-babel');

// 压缩 public 目录 css
gulp.task('minify-css', function (cb) {
    pump([
            gulp.src('./public/**/*.css'),
            cleanCSS({compatibility: 'ie9'}),
            gulp.dest('./public')
        ],
        cb
    );
});
// 压缩 public 目录 html
gulp.task('minify-html', function (cb) {
    pump([
            gulp.src('./public/**/*.html'),
            htmlmin({
                removeComments: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
                collapseWhitespace: true
            }),
            gulp.dest('./public')
        ],
        cb
    );
});
// 压缩 public/js 目录 js
gulp.task('minify-js', function (cb) {
    pump([
            gulp.src('./public/**/*.js'),
            babel({
	            presets: ['env']
		    }),
            uglify(),
            gulp.dest('./public')
        ],
        cb
    );
});
// 执行 gulp 命令时执行的任务
gulp.task('default', [
    'minify-html', 'minify-css', 'minify-js'
]);
