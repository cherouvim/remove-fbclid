# remove-fbclid
[![npm version](https://img.shields.io/npm/v/remove-fbclid.svg?color=0c0)](https://www.npmjs.com/package/remove-fbclid)
[![build size](https://badgen.net/bundlephobia/minzip/remove-fbclid?color=0c0)](https://bundlephobia.com/result?p=remove-fbclid)
[![travis](https://img.shields.io/travis/cherouvim/remove-fbclid.svg?color=0c0)](https://travis-ci.org/cherouvim/remove-fbclid)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?color=0c0)](http://makeapullrequest.com)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?color=0c0)](https://github.com/prettier/prettier)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?color=0c0)](https://opensource.org/licenses/MIT)

Removes the parameter `fbclid` that facebook adds on some shared URLs.

The `fbclid` parameter will be removed via a `window.history.replaceState` on [current browsers](https://caniuse.com/#search=replacestate) and via `window.location.replace` on older ones.

More info about that parameter:
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

## Other tips (unrelated to this JavaScript library)
Add the following in your `/robots.txt` to prevent indexing:
```
User-agent: *
Disallow: /?fbclid*
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
