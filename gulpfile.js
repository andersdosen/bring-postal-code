var gulp = require ('gulp');
var watch = require ('gulp-watch');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');

var folderSrc = 'src/';
var folderDist = 'dist/';
var bringJS = folderSrc + 'bring-postal-code.js';

var plumberErrorHandler = {
	errorHandler: notify.onError({
		title: 'Appex build',
		message: 'Error: <%= error.message %>'
	})
};

gulp.task('default', ['watch']);

gulp.task('watch', function(){
	gulp.watch(bringJS, ['eslint', 'js']);
});

gulp.task('js', function() {
	gulp.src(bringJS)
		.pipe(plumber(plumberErrorHandler))
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(concat('bring-postal-code.js'))
		.pipe(gulp.dest(folderDist))
		.pipe(concat('bring-postal-code.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(folderDist));
});

gulp.task('eslint', function() {
	return gulp.src(bringJS).pipe(eslint({
		'rules': {
			'brace-style': ['error', 'stroustrup', {
				'allowSingleLine': false
			}],
			'capitalized-comments': ['error', 'always'],
			'comma-spacing': ['error', {
				'before': false,
				'after': true
			}],
			'consistent-return': 'error',
			'curly': ['error', 'all'],
			'default-case': 'error',
			'eqeqeq': ['error', 'always'],
			'no-alert': 'error',
			'no-continue': 'error',
			'no-empty-function': 'error',
			'no-eval': 'error',
			'no-extra-semi': 'error',
			'no-mixed-spaces-and-tabs': 'error',
			'no-multi-spaces': 'error',
			'no-script-url': 'error',
			'no-trailing-spaces': 'error',
			'no-unreachable': 'error',
			'no-unused-vars': 'error',
			'semi': ['error', 'always'],
			'semi-spacing': ['error', {
				'before': false,
				'after': true
			}],
			'space-before-blocks': ['error', 'always'],
			'space-before-function-paren': ['error', {
				'anonymous': 'never',
				'named': 'never',
				'asyncArrow': 'ignore'
			}],
			'space-in-parens': ['error', 'never'],
			'spaced-comment': ['error', 'always', {
				'block': {
					'balanced': true
				}
			}],
			'strict': ['error', 'global'],
			'template-tag-spacing': ['error', 'always'],
			'quotes': ['error', 'single', {
				'allowTemplateLiterals': true
			}]
		}
	}))
	.pipe(eslint.format())
	.pipe(eslint.failOnError()); // Brick on failure to be super strict
});
