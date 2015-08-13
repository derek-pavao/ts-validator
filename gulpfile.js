/**
 * Created by dpavao on 4/28/15.
 */
var gulp = require('gulp');
var jspm = require('jspm');
var conf = require('./gulp.conf');
var tslintRules = require('./tslint.json');
var $ = require('gulp-load-plugins')({lazy: true});


var tsProject = $.typescript.createProject('tsconfig.json', {
    typescript: require('typescript')
});


/**
 * Compilation / Copying Tasks
 */
gulp.task('typescript', function () {
    var tsResult = gulp.src(conf.src.ts)
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.typescript(tsProject));

    return tsResult.js
        .pipe($.sourcemaps.write('./', {
            debug: false,
            includeContent: true
        }))
        .pipe(gulp.dest('.tmp/'));
});

gulp.task('tslint', function () {
    return gulp.src(conf.src.ts)
        .pipe($.plumber())
        .pipe($.tslint())
        .pipe($.tslint.report($.tslintStylish, {
            emitError: true,
            sort: true,
            bell: true
        }));
});



/**
 * Main Tasks
 */
gulp.task('watch', [
    'typescript-watcher',
    'tslint-watcher'
]);

gulp.task('dev-no-watch', [
    'typescript',
    'tslint'
]);

gulp.task('dev', ['dev-no-watch'], function () {
    gulp.start('watch');
});

gulp.task('build', ['dev-no-watch'], function () {
    gulp.src('.tmp/**/*.js', {base: '.tmp'})
        .pipe($.zip('ts-validator.zip'))
        .pipe(gulp.dest('./'));
});
