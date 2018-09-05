import gulp from 'gulp';
import pug from 'gulp-pug';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import cleanCSS from 'gulp-clean-css'
import jsmin from 'gulp-jsmin'
import sourcemaps from 'gulp-sourcemaps'
import sass from 'gulp-sass'
import browserSync from 'browser-sync';


gulp.task('serve', ['sass'], () => {
    browserSync.init({
        server: "./public"
    });
    gulp.watch("./src/sass/*.sass", ['sass']);
    gulp.watch("src/pug/*.pug").on('change', browserSync.reload);
});

gulp.task('default', ['serve'], () => {
    gulp.watch(['./src/pug/**/*.pug'],obj => { gulp.start('views') });
    gulp.watch(['./src/js/**/*.+(js|json)'],obj => { gulp.start('js') });
    gulp.watch(['./src/sass/**/*.sass'], obj => { gulp.start('sass') });
});

gulp.task('sass', function() {
    return gulp.src('./src/sass/**/*.sass')
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('./css/'))
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.stream());
});

gulp.task('views',() => {
    return gulp.src('./src/pug/**/*.pug')
        .pipe(pug())
        // .pipe(pug({pretty: true}))
        .pipe(gulp.dest('public'))
        .pipe(browserSync.stream());
});

gulp.task('js', function () {
    return browserify('./src/js/index.js')
        .transform('babelify', {
            presets: ['env']
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.write('./js/'))
        .pipe(jsmin())
        .pipe(gulp.dest('public/js'))
        .pipe(browserSync.stream());
});


