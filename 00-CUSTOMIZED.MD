# Customized
- Download from : https://github.com/Yoast/wordpress-seo/commit/0d7d32d2590ee009635dcb72de05070c8185343f
- Get package `yoastseo`  from [wordpress-seo/packages/yoastseo/](https://github.com/Yoast/wordpress-seo/tree/0d7d32d2590ee009635dcb72de05070c8185343f/packages/yoastseo) - this is the current version ([yoastseo@1.91.0](https://www.npmjs.com/package/yoastseo/v/1.91.0)) on npm (check the version in the package.json file has section `gitHead`)
  - Change file name `spec/stringProcessing/url.js` to `spec/stringProcessing/urlUtils.js` and fix the iimport (Because webpack will import `url.js` instead of `url` from node)
-

### Build translations

```bash
pnpm install
node_modules/.bin/grunt build:translations
# output file to languages/yoast-seo.pot
```

Translate the pot file and save `.po` to the languages folder.

Then run this comand to get the `.json` files:

```bash
node_modules/.bin/grunt po2json
```


### TYPESCRIPT
https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html
```json
{
  // Change this to match your project
  "include": ["src/**/*"],
  "compilerOptions": {
    // Tells TypeScript to read JS files, as
    // normally they are ignored as source files
    "allowJs": true,
        "checkJs": true,
            "strict": false,
    "moduleResolution": "node",
    "target": "es5",
    "module": "esnext",

    // Generate d.ts files
    "declaration": true,
    // This compiler run should
    // only output d.ts files
    "emitDeclarationOnly": true,
    // Types should go into this directory.
    // Removing this would place the .d.ts files
    // next to the .js files
    "outDir": "dist",
    // go to js file when using IDE functions like
    // "Go to Definition" in VSCode
    "declarationMap": true
  }
}
```