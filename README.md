# remove-fbclid
[![npm version](https://img.shields.io/npm/v/remove-fbclid.svg)](https://www.npmjs.com/package/remove-fbclid)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Removes the URL parameter `fbclid` that facebook adds on some shared URLs. More info about that parameter:
- https://fbclid.com/
- https://stackoverflow.com/q/52847475/72478

## Usage
Do the following once, on initial page load:
```js
const removeFbclid = require("remove-fbclid");

removeFbclid();
```
or:
```js
import removeFbclid from "remove-fbclid";

removeFbclid();
```

## License
[MIT](https://choosealicense.com/licenses/mit/)