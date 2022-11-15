'use strict';

const groovyBeautify = require('groovy-beautify');

const name = 'groovy';

module.exports = {
  languages: [
    {
      name: 'Groovy',
      parsers: [name],
      filenames: ['jenkinsfile', 'Jenkinsfile'],
      extensions: ['.jenkinsfile', '.Jenkinsfile', '.groovy'],
      aceMode: 'text',
      tmScope: 'source.groovy',
    },
  ],
  parsers: {
    [name]: {
      astFormat: name,
      parse: (data) => data,
    },
  },
  printers: {
    [name]: {
      print: (path) => groovyBeautify(path.getValue()).trim(),
    },
  },
};
