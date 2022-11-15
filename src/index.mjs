import groovyBeautify from 'groovy-beautify';

const name = 'groovy';

export const languages = [
  {
    name: 'Groovy',
    parsers: [name],
    filenames: ['jenkinsfile', 'Jenkinsfile'],
    extensions: ['.jenkinsfile', '.Jenkinsfile', '.groovy'],
    aceMode: 'text',
    tmScope: 'source.groovy',
  },
];

export const parsers = {
  [name]: {
    astFormat: name,
    parse: (data) => data,
  },
};

export const printers = {
  [name]: {
    print: (path, { printWidth }) =>
      groovyBeautify(path.getValue(), {
        width: printWidth,
      }).trim(),
  },
};
