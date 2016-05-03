//Grunt is just JavaScript running in node, after all...
module.exports = function(grunt) {

  // All upfront config goes in a massive nested object.
  grunt.initConfig({
    // You can set arbitrary key-value pairs.
    tempFolder: 'temp',
    distFolder: 'dist',
    // You can also set the value of a key as parsed JSON.
    // Allows us to reference properties we declared in package.json.
    pkg: grunt.file.readJSON('package.json'),
    // Grunt tasks are associated with specific properties.
    // these names generally match their npm package name.
    concat: {
      // Specify some options, usually specific to each plugin.
      options: {
        // Specifies string to be inserted between concatenated files.
        separator: '\n\n'
      },
      // 'dist' is what is called a "target."
      // It's a way of specifying different sub-tasks or modes.
      dist: {
        // The files to concatenate:
        // Notice the wildcard, which is automatically expanded.
        src: ['shared/*.js', 'shared/**/_*.js', 'shared/**/[a-zA-Z]*.js'],
        // The destination file:
        // Notice the angle-bracketed ERB-like templating,
        // which allows you to reference other properties.
        // This is equivalent to 'dist/main.js'.
        dest: '<%= tempFolder %>/hook_components.js'
          // You can reference any grunt config property you want.
          // Ex: '<%= concat.options.separator %>' instead of ';'
      },
      makeMain: {
        src: ['temp/hook_components.js', 'temp/template.js'],
        dest: '<%= distFolder %>/main.js'
      }
    },
    ngtemplates: {
      'SharedComponents': {
        src: 'shared/**/*.html',
        dest: '<%= tempFolder %>/template.js'
      }
    }
  }); // The end of grunt.initConfig

  // We've set up each task's configuration.
  // Now actually load the tasks.
  // This will do a lookup similar to node's require() function.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-angular-templates');
  // Register our own custom task alias.
  grunt.registerTask('build', ['concat:dist','ngtemplates','concat:makeMain']);
};