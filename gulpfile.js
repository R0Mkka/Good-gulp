const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

const jsFiles = 'src/js/**/*.js';
const scssFiles = 'src/scss/**/*.scss';
const jsDest = 'src/dist';

gulp.task('default', () => {
    browserSync.init({
        server: "./src",
        notify: false
    });

    gulp.watch(jsFiles, () => {
        return gulp.src(jsFiles)
            .pipe(babel({
                presets: ['@babel/preset-env']
            }))
            .pipe(concat('bundle.js'))
            .pipe(uglify())
            .pipe(gulp.dest(jsDest));
    }).on('change', browserSync.reload);

    gulp.watch(scssFiles, () => {
        return gulp.src(scssFiles)
            .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
            .pipe(gulp.dest('src/css'));
    }).on('change', browserSync.reload);

    gulp.watch("src/*.html").on('change', browserSync.reload);
});
