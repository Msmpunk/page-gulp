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

const watchServer = () => {
  browserSync.init({
    server: "./public"
  });
  gulp.watch("./src/sass/*.sass").on('change', browserSync.reload);
  gulp.watch("./src/pug/*.pug").on('change', browserSync.reload);
}

const watchPug = () =>
  gulp.src('./src/pug/**/*.pug')
      .pipe(pug())
      // .pipe(pug({pretty: true}))
      .pipe(gulp.dest('public'))
      .pipe(browserSync.stream());


const watchSass = () =>
  gulp.src('./src/sass/**/*.sass')
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('./css/'))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream());

const watchJs = () =>
  browserify('./src/js/index.js')
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

// Watch files
const watchFiles = () => {
  gulp.watch('./src/pug/**/*.pug', watchPug);
  gulp.watch('./src/sass/**/*.sass', watchSass);
  gulp.watch('./src/js/**/*.+(js|json)',watchJs);
}

gulp.task("dev", gulp.parallel(watchFiles, watchServer));


