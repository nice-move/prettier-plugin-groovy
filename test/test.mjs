import test from 'ava';
import { format } from 'prettier';
import prettier2 from 'prettier-2';

import plugin from '../dist/index.cjs';

async function pretty(t, string, options) {
  const result2 = await prettier2.format(string, {
    plugins: [plugin],
    ...options,
  });

  t.snapshot(result2, 'prettier 2');

  const result3 = await format(string, {
    plugins: [plugin],
    ...options,
  });

  t.snapshot(result3, 'prettier 3');

  t.is(result2, result3);
}

const source = `
def bumpVersion(String target,    String version_type, Boolean reset =   false) {    def
  versionMap =
  ['major':0, 'minor' : 1, 'patch':   2]
              def versionArray = target.findAll(/\\d+\\.\\d+\\.\\d+/)[0].tokenize('.')
          try
  {        def   index =     versionMap.get(version_type);
  versionArray[index] =versionArray[index].toInteger() + 1
  if(   reset )
  {
      for(int i=2;i>index;     i--) {
          versionArray[i]    =    0            }        }
  } catch(       Exception e) {        println("Unrecognized version type \\"version_type\\" (should be major, minor or patch)")    }
  return             versionArray.join(                   '.'                       )
  }
  println(bumpVersion('1.2.3', 'minor', true))
`;

test('format by filename-0', pretty, source, { filepath: 'jenkinsfile' });

test('format by filename-1', pretty, source, { filepath: 'Jenkinsfile' });

test('format by filename-2', pretty, source, { filepath: 'a.jenkinsfile' });

test('format by filename-3', pretty, source, { filepath: 'a.Jenkinsfile' });

test('format by filename-4', pretty, source, { filepath: 'a.groovy' });

test('format by parser', pretty, source, {
  parser: 'groovy',
  printWidth: 20,
});

test(
  'format in markdown',
  pretty,
  `
\`\`\`groovy
${source}
\`\`\`

\`\`\`jenkinsfile
${source}
\`\`\`
`,
  { filepath: 'fake.md' },
);
