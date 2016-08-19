"use strict";
var gulp = require("gulp");
var gulpNgConfig = require("gulp-ng-config");

gulp.task('local', function () {
    gulp.src('app.config.json')
        .pipe(gulpNgConfig('docApp.Config', {environment: 'local', allEnvironments: 'all'}))
        .pipe(gulp.dest('./app/js'));
});

gulp.task('dev', function () {
    gulp.src('app.config.json')
        .pipe(gulpNgConfig('docApp.Config', {environment: 'dev', allEnvironments: 'all'}))
        .pipe(gulp.dest('./app/js'));
});

gulp.task('staging', function () {
    gulp.src('app.config.json')
        .pipe(gulpNgConfig('docApp.Config', {environment: 'staging', allEnvironments: 'all'}))
        .pipe(gulp.dest('./app/js'));
});

gulp.task('prod', function () {
    gulp.src('app.config.json')
        .pipe(gulpNgConfig('docApp.Config', {environment: 'prod', allEnvironments: 'all'}))
        .pipe(gulp.dest('./app/js'));
});