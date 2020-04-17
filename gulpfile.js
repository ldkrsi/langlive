'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

gulp.task('sass', () => {
	return gulp.src('./main.scss')
		.pipe(sass())
		.pipe(postcss([
			autoprefixer()
		]))
		.pipe(gulp.dest('./docs/css'));
});

gulp.task('babel', () => {
	return gulp.src('./main.js')
		.pipe(babel())
		.pipe(gulp.dest('./docs/js'))
});

gulp.task('default', gulp.parallel('sass', 'babel'));