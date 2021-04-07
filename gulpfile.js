import gulp from 'gulp'
import uglify from 'gulp-uglify'
import uglifycss from 'gulp-uglifycss'
import rename from 'gulp-rename'
import babel from 'gulp-babel'

const minCss = () => {
    return gulp.src('static/css/style.css')
        .pipe(uglifycss({ 
            "maxLineLen": 80,
            "uglycomments": true 
        }))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('static/css/'))
}

const minJs = () => {
    return gulp.src('static/js/index.js')
        .pipe(babel( {
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())
        .pipe(rename('index.min.js'))
        .pipe(gulp.dest('static/js/'))
}

const serverGulp = () => {
    return gulp.watch(['static/css/style.css', 'static/js/index.js'], gulp.parallel(minCss, minJs))
}

export default serverGulp