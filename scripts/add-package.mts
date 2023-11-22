import { $, cd } from 'zx';

$.verbose = false;

const PACKAGE_NAME = process.argv[2];

const PACKAGE_DIR = `./packages/${PACKAGE_NAME}`;
const PACKAGE_JSON_FIELDS = [
  'bugs.url',
  'homepage',
  'repository.type',
  'repository.url',
] as const;

const init = async () => {
  if (process.argv.length < 3) {
    console.log(
      'Please add package name, use `pnpm run add-package <packageName>`'
    );
    process.exit(0);
  }
  const packageJsonFieldsValues = new Map<string, string>();
  await $`mkdir -p ${PACKAGE_DIR}`;
  await $`cp -r ./scripts/package-template/ ./packages/${PACKAGE_NAME}`;
  const promises = PACKAGE_JSON_FIELDS.map(async (key: string) => {
    const value = await $`npm pkg get ${key} -ws=false | tr -d \\\"`;
    packageJsonFieldsValues.set(key, value.stdout.trimEnd());
  });
  await Promise.all(promises);
  cd(PACKAGE_DIR);

  await $`npm pkg set name=${PACKAGE_NAME} -ws=false`;
  // can't modify the package.json at the same time using different process(shell script)
  // const setPromises = PACKAGE_JSON_FIELDS.map(async key => {
  //   await $`npm pkg set ${key}=${
  //     packageJsonFieldsValues.get(key) as string
  //   } -ws=false`;
  // });
  // await Promise.all(setPromises);
  for (const key of PACKAGE_JSON_FIELDS) {
    // eslint-disable-next-line no-await-in-loop
    await $`npm pkg set ${key}=${
      packageJsonFieldsValues.get(key) as string
    } -ws=false`;
  }
};

await init();
