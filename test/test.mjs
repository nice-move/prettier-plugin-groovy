/* eslint-disable no-return-await */
import test from 'ava';
import { format } from 'prettier';

import plugin from '../dist/index.cjs';

async function pretty(string, options) {
  return await format(string, {
    plugins: [plugin],
    ...options,
  });
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

test('format by filename', async (t) => {
  const result = await pretty(source, { filepath: 'jenkinsfile' });

  t.snapshot(result);

  t.is(result, await pretty(source, { filepath: 'Jenkinsfile' }));
  t.is(result, await pretty(source, { filepath: 'a.jenkinsfile' }));
  t.is(result, await pretty(source, { filepath: 'a.Jenkinsfile' }));
  t.is(result, await pretty(source, { filepath: 'a.groovy' }));
});

test('format by parser', async (t) => {
  const result = await pretty(source, {
    parser: 'groovy',
    printWidth: 20,
  });

  t.snapshot(result);
});

test('format in markdown', async (t) => {
  const text = `
\`\`\`groovy
${source}
\`\`\`

\`\`\`jenkinsfile
${source}
\`\`\`
`;

  const result = await pretty(text, { filepath: 'fake.md' });

  t.snapshot(result);
});
