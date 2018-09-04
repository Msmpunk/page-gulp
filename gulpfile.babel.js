import gulp from 'gulp';
import pug from 'gulp-pug';

gulp.task('default',() => {
  gulp.watch(['pug/**/*.pug'],obj => { gulp.start('views') });
});

gulp.task('views',() => {
  return gulp.src('pug/**/*.pug')
  .pipe(pug({pretty: true}))
  .pipe(gulp.dest('public'));
});
