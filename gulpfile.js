const gulp = require('gulp')
const { series } = require('gulp')
const uglify = require('gulp-uglify')
const uglifycss = require('gulp-uglifycss')
const rename = require('gulp-rename')
const babel = require('gulp-babel')

const minCss = () => {
    return gulp.src('css/*.css')
        .pipe(uglifycss({ 
            "maxLineLen": 80,
            "uglycomments": true 
        }))

        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('css/'))
}

const minJs = () => {
    return gulp.src('js/*.js')
        .pipe(babel( {
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())
        .pipe(rename('index.min.js'))
        .pipe(gulp.dest('js/'))
}

module.exports.default = series(minCss, minJs)