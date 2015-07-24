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
        name: 'authorName',
        message: 'Author Name',
      },{
        type: 'input',
        name: 'authorEmail',
        message: 'Author Email',
      },{
        type: 'input',
        name: 'authorUrl',
        message: 'Author Url',
      }, {
        type: 'input',
        name: 'githubUrl',
        message: 'Github Url',
      },{
        name: 'keywords',
        message: 'Key your keywords (comma to split)',
        filter: _.words
      }
    ], function (answers) {
        // Store values.
        answers.name = answers.name || 'unnamed';
        answers.displayName = answers.displayName || answers.name;
        answers.authorName = answers.authorName || 'Someone';
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
                    this.destinationPath(file),
                    this.strings
                  );
                }.bind(this);

    copy('README.md');
    copy('.gitignore');
    copy('package.json');
    copy('gulpfile.js');
    copy('.eslintrc');
    copy('.npmignore');
    copy('src/index.js');
    copy('test/test.js');
  },

  default: function() {
    this.composeWith('license', {
      options: {
        name: this.strings.authorName,
        email: this.strings.authorEmail,
        website: this.strings.authorUrl
      }
    }, {
      local: require.resolve('generator-license/app')
    });
  }
});
