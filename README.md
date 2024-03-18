# vscode-material-icons

**[VSCode Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme) wrapper for applications to self-host icons and select icon based on file path.**

For a full list of available icons, see [showcase](https://vscodematerialicons-byr3l7cm.b4a.run/).

## Setup

Install `vscode-material-icons` with your package manager:

<details>
<summary>NPM</summary>

```sh
npm install vscode-material-icons
```

</details>

<details>
<summary>Yarn</summary>

```sh
yarn add vscode-material-icons
```

</details>

<details>
<summary>PNPM</summary>

```sh
pnpm add vscode-material-icons
```

</details>

### Self-hosting icons

If you want to self-host the icons in your front-end app, configure your bundler to copy the `node_modules/vscode-material-icons/generated/icons` folder to your build output.

<details>
<summary>Webpack example</summary>

Use [copy-webpack-plugin](https://webpack.js.org/plugins/copy-webpack-plugin/) in `webpack.config.js`:

```js
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  // ...
  plugins: [
    // ...
    new CopyPlugin({
      patterns: [
        {
          from: 'node_modules/vscode-material-icons/generated/icons',
          to: 'assets/material-icons',
        },
      ],
    }),
  ],
};
```

</details>

<details>
<summary>Angular example</summary>

Append to `assets` in `angular.json` (or `project.json` if using Nx):

```jsonc
{
  // ..
  "targets": {
    "build": {
      "executor": "@angular-devkit/build-angular:browser",
      "options": {
        // ...
        "assets": [
          // ...
          {
            "glob": "**/*",
            "input": "./node_modules/vscode-material-icons/generated/icons",
            "output": "/assets/material-icons/"
          }
        ]
      }
      // ...
    }
  }
}
```

</details>

## Usage

Use exported functions to get an icon name/URL from a file/folder path:

```ts
import {
  getIconForFilePath,
  getIconUrlByName,
  getIconUrlForFilePath,
  type MaterialIcon,
} from 'vscode-material-icons';

// should match output path configured in bundler
const ICONS_URL = '/assets/material-icons';

// example 1: file path -> image URL
const iconUrl: string = getIconUrlForFilePath('src/index.html', ICONS_URL);

// example 2: file path -> icon name
const icon: MaterialIcon = getIconForFilePath('src/app/app.component.ts');

// example 3: icon name -> image URL
const tsIconUrl: string = getIconUrlByName('typescript', ICONS_URL);
```

It's also simple to validate icon names in a type-safe way:

```ts
import {
  isMaterialIcon,
  MATERIAL_ICONS,
  type MaterialIcon,
} from 'vscode-material-icons';

// example 1: use union type for autocomplete
let icon: MaterialIcon;

// example 2: validate icon name with type predicate function
if (isMaterialIcon(value)) {
  icon = value;
}

// example 3: integrate with schema validation library, e.g. Zod
const materialIconSchema = z.enum(MATERIAL_ICONS);
icon = materialIconSchema.parse(value);
```

## Contributing

- Install dependencies with `npm install`.
- Run unit tests with `npm test`.
- Build library with `npm run build`.
- Re-fetch icons from VSCode extension with `npm run fetch-icons`.
- Release new version with `npm run release`.
