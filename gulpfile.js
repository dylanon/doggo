const gulp = require('gulp');
const babel = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const notify = require('gulp-notify');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const historyApiFallback = require('connect-history-api-fallback');

gulp.task('assets', () => {
	return gulp.src('./dev/assets/*')
	.pipe(gulp.dest('./public/assets'))
});

gulp.task('styles', () => {
	return gulp.src('./dev/styles/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(concat('style.css'))
		.pipe(gulp.dest('./public/styles'))
});

gulp.task('js', () => {
	return browserify('dev/scripts/app.js', {debug: true})
		.transform('babelify', {
			sourceMaps: true,
			presets: ['es2015','react']
		})
		.bundle()
		.on('error',notify.onError({
			message: "Error: <%= error.message %>",
			title: 'Error in JS 💀'
		}))
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(gulp.dest('public/scripts'))
		.pipe(reload({stream:true}));
});

gulp.task('bs', () => {
	return browserSync.init({
		server: {
			baseDir: './'
		},
		middleware: [historyApiFallback()],
		notify: false
	});
});

gulp.task('default', ['js','styles','assets','bs'], () => {
	gulp.watch('dev/**/*.js',['js']);
	gulp.watch('dev/**/*.scss',['styles']);
	gulp.watch('dev/assets/*',['assets'],reload);
	gulp.watch('./public/styles/style.css',reload);
});
