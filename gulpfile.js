const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const gcmq = require('gulp-group-css-media-queries');
const less = require('gulp-less');

const isDev = true;
let isProd = !isDev;
const isSync = process.argv.includes('--sync');
/* const isSync = (process.argv.indexOf('--sync') !== -1);   */


console.log(isDev);
console.log(isSync);

/* for use wiithout less
const cssFiles = [
		'./node_modules/normalize.css/normalize.css',
		'./src/css/style.css',
		'./src/css/more.css'
];
*/

const jsFiles = [
	'./src/js/script.js'
];

function styles()
{
	return gulp.src('./src/css/style.less')
<<<<<<< Updated upstream
<<<<<<< Updated upstream
	/* return gulp.src(cssFiles) // for use without less */
				.pipe(gulpif(isDev, sourcemaps.init()))
				.pipe(less())
				/*	.pipe(concat('style.css')) // for use without less */				
=======
	/*	return gulp.src(cssFiles)	//for use without less */
				.pipe(gulpif(isDev, sourcemaps.init()))
				/*	.pipe(concat('style.css'))		//for use without less */
				.pipe(less())		
>>>>>>> Stashed changes
=======
	/*	return gulp.src(cssFiles)	//for use without less */
				.pipe(gulpif(isDev, sourcemaps.init()))
				/*	.pipe(concat('style.css'))		//for use without less */
				.pipe(less())		
>>>>>>> Stashed changes
				.pipe(gcmq())
				.pipe(autoprefixer({
						browsers: ['>0.1%'],
						cascade: false
        				}))
				.pipe(gulpif(isProd, clean({
						compatibility: 'ie8',
						level: 2
				})))
				.pipe(gulpif(isDev, sourcemaps.write()))
				.pipe(gulp.dest('./build/css'))
				.pipe(gulpif(isSync, browserSync.stream()))
	
}

function scripts()
{
	return gulp.src(jsFiles)
				.pipe(concat('main.js'))
				.on('error', console.error.bind(console))
				.pipe(gulpif(isProd, uglify({
					toplevel: true
				})))
				.pipe(gulp.dest('./build/js'))
				.pipe(gulpif(isSync, browserSync.stream()))
}

function html()
{
	return gulp.src('./src/*.html')
			.pipe(gulp.dest('./build'))
			.pipe(gulpif(isSync, browserSync.stream()))
}

function watch()
{
	if(isSync)
	{
	browserSync.init({
        server: {
            baseDir: "./build"
        },
        tunnel: false
    });
	}
	
<<<<<<< Updated upstream
<<<<<<< Updated upstream
	gulp.watch('./src/css/**/*.less', styles);
	/* gulp.watch('./src/css/**\/*.css', styles);	// for use without less  */
=======
	/*	gulp.watch('./src/css/**\/*.css', styles);		//for use without less */
	gulp.watch('./src/css/**/*.less', styles);
>>>>>>> Stashed changes
=======
	/*	gulp.watch('./src/css/**\/*.css', styles);		//for use without less */
	gulp.watch('./src/css/**/*.less', styles);
>>>>>>> Stashed changes
	gulp.watch('./src/js/**/*.js', scripts);
	gulp.watch('./src/*.html',  html);
}

function remove_js()
{
	return del(['./build/js/*']);
}

function remove_css()
{
	return del(['./build/css/*']);
}

function clean_all()
{
	return del(['./build/*']);
}

gulp.task('html', html);
gulp.task('css', styles);
gulp.task('scripts', scripts);
gulp.task('watch', watch);
gulp.task('rmjs', remove_js);
gulp.task('rmcss', remove_css);

gulp.task('build', gulp.series(clean_all,
					gulp.parallel(styles, scripts)));
					
gulp.task('dev', gulp.series('build', 'watch'));					