# number-to-words-hindi

> Convert numbers to words, ordinal words, and ordinal numbers in Hindi number system (Indian grouping: thousand, lakh, crore, arab, kharab, neel, padma).
>
> This is a fork/variant of [number-to-words](https://www.npmjs.com/package/number-to-words) for Hindi/Indian numbering.
>
> See [`src/toWords.js`](src/toWords.js) for implementation details.

---

### Install

`npm install number-to-words-hindi`

---

### API

#### `toOrdinal(number)`

Converts an integer into a string with an ordinal postfix (e.g. `21st`).  
If number is decimal, the decimals will be removed.

```
var converter = require('number-to-words-hindi');
converter.toOrdinal(21); // => "21st"
```

#### `toWords(number)`

Converts an integer into words using Hindi/Indian number grouping.  
If number is decimal, the decimals will be removed.

```
var converter = require('number-to-words-hindi');
converter.toWords(13); // => "thirteen"

// Decimal numbers:
converter.toWords(2.9); // => "two"

// Negative numbers:
converter.toWords(-3); // => "minus three"

// Large numbers (Indian system):
converter.toWords(123456789); // => "twelve crore, thirty-four lakh, fifty-six thousand, seven hundred eighty-nine"
```

#### `toWordsOrdinal(number)`

Converts a number into ordinal words (e.g. "twenty-first").  
If number is decimal, the decimals will be removed.

```
var converter = require('number-to-words-hindi');
converter.toWordsOrdinal(21); // => "twenty-first"
```

---

### Contributions, Comments and Bugs

Contributions, comments and/or bug reports are much appreciated. Open a pull request or add comments on the
[issues page](https://github.com/marlun78/number-to-words/issues). Thanks!

---

### Notes

-   This package uses Hindi/Indian number grouping: thousand, lakh, crore, arab, kharab, neel, padma.
-   Output is in English words, but follows Indian number system.
-   See [`src/toWords.js`](src/toWords.js) for the grouping logic.

---

### Change Log

See [CHANGELOG.md](CHANGELOG.md) for details.
