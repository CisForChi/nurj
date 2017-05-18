var chokidar = require('chokidar'),
    path = require('path'),
    shell = require('shelljs'),
    tinylr = require('tiny-lr'),
    exit = require('exit-hook'),
    tinyServer = tinylr();

var watcher = chokidar.watch([
    'src/stylesheets',
    'public/stylesheets',
    'src/javascript',
    'public/assets'
  ], {
    ignored: /[\/\\]\./,
    ignoreInitial: true
  });

tinyServer.listen(35729, function() {
  console.log('Livereload working...')
})

watcher.on("add", function(file) {
  runProcess(file);
})

watcher.on("change", function(file) {
  runProcess(file);
})

watcher.on("unlink", function(file) {
  runProcess(file);
})

function runProcess(file) {
  var filext = path.extname(file);
  if(filext === '.scss') {
    shell.exec('npm run sass', function() {
      console.log('Rebuilt sass');
    });
  } else if (filext === '.js') {
    shell.exec('npm run js', function() {
      console.log('Rebuilt scripts');
    });
  } else {
    tinylr.changed(file);
  }
}

exit(function() {
  console.log('exiting...');
  watcher.close();
  tinyServer.close();
})
