gulp = require 'gulp'
browserify = require 'browserify'
coffee = require 'gulp-coffee'
awatch = require 'gulp-autowatch'
transform = require 'vinyl-transform'

gulp.task 'coffee', ->
  gulp.src 'src/**/*.coffee'
  .pipe coffee()
  .pipe gulp.dest 'lib'

gulp.task 'browserify', ['coffee'], ->
  gulp.src 'lib/index.js'
  .pipe transform (filename) ->
    browserify
      entries: filename
      debug: true
    .bundle()
  .pipe gulp.dest '.'

gulp.task 'watch', ['browserify'], ->
  awatch gulp,
    browserify: 'lib/**/*.js'
    coffee: 'src/**/*.coffee'

gulp.task 'default', ['browserify'], ->
