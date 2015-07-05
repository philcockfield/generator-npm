'use strict'
var _ = require('lodash');
var generators = require('yeoman-generator');
var chalk = require('chalk');

/**
*  Generator for constructing a simple node module.
*/
module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  /**
  *  Asks for details about the module.
  */
  prompting: function () {
    // See: https://github.com/SBoudrias/Inquirer.js
    var done = this.async();
    this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Module name',
      }, {
        type: 'input',
        name: 'displayName',
        message: 'Readme display name (if different)',
      }, {
        type: 'input',
        name: 'description',
        message: 'Description',
      }, {
        type: 'input',
        name: 'author',
        message: 'Author',
      }, {
        type: 'input',
        name: 'githubUrl',
        message: 'Github URL',
      }
    ], function (answers) {
        // Store values.
        answers.name = answers.name || 'unnamed';
        answers.displayName = answers.displayName || answers.name;
        answers.author = answers.author || 'Someone';
        answers.baseUrl = '';

        if (answers.githubUrl !== '') {
          answers.baseUrl = answers.githubUrl.split('.git')[0]
        }

        this.strings = answers;
        done();
    }.bind(this));
  },



  /**
  *  Copy over the file templates.
  */
  writing: function () {
    var copy = function (file, copyTo, args) {
                  args = args || this.strings;
                  this.fs.copyTpl(
                    this.templatePath(file),
                    this.destinationPath(this.strings.name + '/' + file),
                    this.strings
                  );
                }.bind(this);

    copy('README.md');
    copy('.gitignore');
    copy('package.json');
    copy('gulpfile.js');
    copy('.eslintrc');
    copy('src/index.js');
    copy('test/test.js');
  }
});
