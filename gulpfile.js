const {
    src,
    dest,
    watch
} = require('gulp');
const minifyCss = require('gulp-clean-css');
const concat = require('gulp-concat');
/* gulp concat bundled de files */
const bundleCss = () => {
    /* alle css selecteren */
    return src('./public/css/**/*.css')
        /* zet het in een pijplijn (klaarzetten), om vervolgens te minifyen en in de dist folder te zetten */
        .pipe(minifyCss())
        .pipe(concat('bundle.css'))
        .pipe(dest('./public/dist/css'));
}

const automatisch = () => {
    watch('./public/css/**/*.css', bundleCss);
};

exports.bundleCss = bundleCss;
exports.automatisch = automatisch;