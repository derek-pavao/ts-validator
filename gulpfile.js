/**
 * Created by dpavao on 4/28/15.
 */
var gulp = require('gulp');
var jspm = require('jspm');
var conf = require('./gulp.conf');
var $ = require('gulp-load-plugins')({lazy: true});


var tsProject = $.typescript.createProject({
    declarationFiles: true,
    noExternalResolve: true,
    typescript: require('typescript'),
    module: 'amd',
    target: 'ES5'
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
            debug: true,
            srcRoot: '/src/',
            includeContent: true
        }))
        .pipe(gulp.dest('.tmp/'));
});

gulp.task('scss', function () {
    return gulp.src(conf.src.scss)
        .pipe($.plumber())
        .pipe($.sass())
        .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
        .pipe(gulp.dest('.tmp/styles'));
});

gulp.task('dist-css', function () {
    gulp.src('.tmp/styles/main.css')
        .pipe($.minifyCss())
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('templatecache', function () {
    return gulp.src(conf.src.html)
        .pipe($.angularTemplatecache({standalone: true}))
        .pipe(gulp.dest('.tmp'));
});

gulp.task('dist-index-html', function () {
    return gulp.src('src/index.html')
        .pipe($.htmlReplace({
            'js':'' ,
            'module-import': 'bundle.js'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('dist-js', function (cb) {

    jspm.bundleSFX('.tmp/main', 'dist/bundle.js', { mangle: false}).then(function () {
        console.log('------>', 'JSPM bundled');
    }, function () {
        var err = new $.util.PluginError('JSPM', {
            message: 'The jspm bundle failed'
        });
        cb(err);
    });
});

gulp.task('dist-templates', function () {

    gulp.src('.tmp/templates.js')
        .pipe(gulp.dest('dist'));
})


/**
 * Watcher Tasks
 */
gulp.task('typescript-watcher', function () {
    return $.watch(conf.src.ts, function () {
        gulp.start('typescript');
    });
});

gulp.task('scss-watcher', function () {
    return $.watch('src/scss/**/*.scss', function () {
        gulp.start('scss');
    });
});

gulp.task('html-watcher', function () {
    return $.watch(conf.src.html, function () {
        gulp.start('templatecache');
    });
});


/**
 * Main Tasks
 */
gulp.task('watch', [
    'typescript-watcher'
]);

gulp.task('dev-no-watch', [
    'typescript'
]);

gulp.task('dev', ['dev-no-watch'], function () {
    gulp.start('watch');
});

gulp.task('build', ['dev-no-watch'], function () {
    gulp.start('dist-index-html');
    gulp.start('dist-css');
    gulp.start('dist-js');
    gulp.start('dist-templates');
});