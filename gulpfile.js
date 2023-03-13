"use strict";

const autoprefixer = require("autoprefixer");
const babelify = require("babelify");
const browserify = require("browserify");
const buffer = require("vinyl-buffer");
const cssnano = require("cssnano");
const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const moduleImporter = require("sass-module-importer");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const runSequence = require("gulp4-run-sequence").use(gulp);
const sass = require('gulp-sass')(require('node-sass'));
const source = require("vinyl-source-stream");
const sourcemaps = require("gulp-sourcemaps");
const terser = require("gulp-terser");

const paths = {
    input_scss: ["./assets/scss/style.scss"],
    input_js: ["./assets/js/main.js"],
    input_images: ["./assets/images/**/*"],
};

function styles(done) {
    const plugins = [
        autoprefixer({
            overrideBrowserslist: ["last 3 version"],
            remove: false,
        }),
        cssnano({
            discardComments: {
                removeAll: true,
            },
        }),
    ];

    gulp.src(paths.input_scss)
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sass({ importer: moduleImporter() }))
        .pipe(sass().on("error", sass.logError))
        .pipe(postcss(plugins))
        .pipe(rename({ dirname: "./" }))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("./dist/css/"));

    done();
}

function scripts() {
    // Added babelify to allow for ES6 imports and classes
    return browserify({
        entries: paths.input_js,
        debug: true,
    })
    .transform(
        babelify.configure({
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-proposal-class-properties"],
        })
    )
        .bundle()
        .pipe(source("main.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(terser())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("./dist/js/"));
}

function images() {
    return gulp.src(paths.input_images).pipe(imagemin()).pipe(gulp.dest("./dist/images/"));
}

function watch() {
    runSequence(["styles", "scripts", "images"]);

    gulp.watch("./assets/scss/**/*.scss", styles);
    gulp.watch("./assets/js/**/*.js", scripts);
}

function build(done) {
    runSequence(["styles", "scripts", "images"]);

    done();
}

exports.build = build;
exports.images = images;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;

exports.default = build;
