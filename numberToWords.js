/*!
 * Number-To-Words util
 * @version v1.2.4
 * @link https://github.com/layerupai/number-to-words-hindi
 * @author Martin Eneqvist (https://github.com/marlun78) & Jamsheed Mistri (https://github.com/JamsheedMistri)
 * @contributors Aleksey Pilyugin (https://github.com/pilyugin),Jeremiah Hall (https://github.com/jeremiahrhall),Adriano Melo (https://github.com/adrianomelo),dmrzn (https://github.com/dmrzn)
 * @license MIT
 */
(function () {
    'use strict';

    var root = typeof self == 'object' && self.self === self && self ||
        typeof global == 'object' && global.global === global && global ||
        this;

    // ========== file: /src/maxSafeInteger.js ==========

var MAX_SAFE_INTEGER = 9007199254740991;


// ========== file: /src/isFinite.js ==========

// Simplified https://gist.github.com/marlun78/885eb0021e980c6ce0fb
function isFinite(value) {
    return !(typeof value !== 'number' || value !== value || value === Infinity || value === -Infinity);
}


// ========== file: /src/isSafeNumber.js ==========


function isSafeNumber(value) {
    return typeof value === 'number' && Math.abs(value) <= MAX_SAFE_INTEGER;
}


// ========== file: /src/makeOrdinal.js ==========

var ENDS_WITH_DOUBLE_ZERO_PATTERN = /(hundred|thousand|(m|b|tr|quadr)illion)$/;
var ENDS_WITH_TEEN_PATTERN = /teen$/;
var ENDS_WITH_Y_PATTERN = /y$/;
var ENDS_WITH_ZERO_THROUGH_TWELVE_PATTERN = /(zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)$/;
var ordinalLessThanThirteen = {
    zero: 'zeroth',
    one: 'first',
    two: 'second',
    three: 'third',
    four: 'fourth',
    five: 'fifth',
    six: 'sixth',
    seven: 'seventh',
    eight: 'eighth',
    nine: 'ninth',
    ten: 'tenth',
    eleven: 'eleventh',
    twelve: 'twelfth'
};

/**
 * Converts a number-word into an ordinal number-word.
 * @example makeOrdinal('one') => 'first'
 * @param {string} words
 * @returns {string}
 */
function makeOrdinal(words) {
    // Ends with *00 (100, 1000, etc.) or *teen (13, 14, 15, 16, 17, 18, 19)
    if (ENDS_WITH_DOUBLE_ZERO_PATTERN.test(words) || ENDS_WITH_TEEN_PATTERN.test(words)) {
        return words + 'th';
    }
    // Ends with *y (20, 30, 40, 50, 60, 70, 80, 90)
    else if (ENDS_WITH_Y_PATTERN.test(words)) {
        return words.replace(ENDS_WITH_Y_PATTERN, 'ieth');
    }
    // Ends with one through twelve
    else if (ENDS_WITH_ZERO_THROUGH_TWELVE_PATTERN.test(words)) {
        return words.replace(ENDS_WITH_ZERO_THROUGH_TWELVE_PATTERN, replaceWithOrdinalVariant);
    }
    return words;
}

function replaceWithOrdinalVariant(match, numberWord) {
    return ordinalLessThanThirteen[numberWord];
}


// ========== file: /src/toOrdinal.js ==========


/**
 * Converts an integer into a string with an ordinal postfix.
 * If number is decimal, the decimals will be removed.
 * @example toOrdinal(12) => '12th'
 * @param {number|string} number
 * @returns {string}
 */
function toOrdinal(number) {
    var num = parseInt(number, 10);

    if (!isFinite(num)) {
        throw new TypeError(
            'Not a finite number: ' + number + ' (' + typeof number + ')'
        );
    }
    if (!isSafeNumber(num)) {
        throw new RangeError(
            'Input is not a safe number, it’s either too large or too small.'
        );
    }
    var str = String(num);
    var lastTwoDigits = Math.abs(num % 100);
    var betweenElevenAndThirteen = lastTwoDigits >= 11 && lastTwoDigits <= 13;
    var lastChar = str.charAt(str.length - 1);
    return str + (betweenElevenAndThirteen ? 'th'
            : lastChar === '1' ? 'st'
            : lastChar === '2' ? 'nd'
            : lastChar === '3' ? 'rd'
            : 'th');
}


// ========== file: /src/toWords.js ==========


var TEN = 10;
var ONE_HUNDRED = 100;
var ONE_THOUSAND = 1000;
var ONE_LAKH = 100000; //   1,00,000  (10^5)
var ONE_CRORE = 10000000; //   1,00,00,000  (10^7)
var ONE_ARAB = 1000000000; //   1,00,00,00,000  (10^9)
var ONE_KHARAB = 100000000000; //   1,00,00,00,00,000  (10^11)
var ONE_NEEL = 10000000000000; //   1,00,00,00,00,00,000  (10^13)
var ONE_PADMA = 1000000000000000; //   1,00,00,00,00,00,00,000  (10^15)
var MAX = 9007199254740992; //   JavaScript MAX_SAFE_INTEGER + 1

var LESS_THAN_TWENTY = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen'
];

var TENTHS_LESS_THAN_HUNDRED = [
    'zero',
    'ten',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety'
];

/**
 * Converts an integer into words using Hindi number–group names
 * (thousand → lakh → crore → arab → kharab → neel → padma).
 * Decimals are truncated.
 * @example toWords(123456) => 'one lakh twenty-three thousand four hundred fifty-six'
 * @param {number|string} number
 * @param {boolean} [asOrdinal] – deprecated; use toWordsOrdinal instead.
 * @returns {string}
 */
function toWords(number, asOrdinal) {
    var words;
    var num = parseInt(number, 10);

    if (!isFinite(num)) {
        throw new TypeError(
            'Not a finite number: ' + number + ' (' + typeof number + ')'
        );
    }
    if (!isSafeNumber(num)) {
        throw new RangeError(
            'Input is not a safe number, it’s either too large or too small.'
        );
    }
    words = generateWords(num);
    return asOrdinal ? makeOrdinal(words) : words;
}

function generateWords(number, words) {
    var remainder, word;

    // Base case
    if (number === 0) {
        return !words ? 'zero' : words.join(' ').replace(/,$/, '');
    }

    // Initialise array on first call
    if (!words) {
        words = [];
    }

    // Handle negatives
    if (number < 0) {
        words.push('minus');
        number = Math.abs(number);
    }

    /* ---- < 100 section (same as English) ------------------------------ */
    if (number < 20) {
        remainder = 0;
        word = LESS_THAN_TWENTY[number];
    } else if (number < ONE_HUNDRED) {
        remainder = number % TEN;
        word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / TEN)];
        if (remainder) {
            word += '-' + LESS_THAN_TWENTY[remainder];
            remainder = 0;
        }

        /* ---- 100 – 999 ---------------------------------------------------- */
    } else if (number < ONE_THOUSAND) {
        remainder = number % ONE_HUNDRED;
        word = generateWords(Math.floor(number / ONE_HUNDRED)) + ' hundred';

        /* ---- 1 000 – 99 999 ---------------------------------------------- */
    } else if (number < ONE_LAKH) {
        remainder = number % ONE_THOUSAND;
        word = generateWords(Math.floor(number / ONE_THOUSAND)) + ' thousand,';

        /* ---- 1 00 000 – 99 99 999 (lakh) ---------------------------------- */
    } else if (number < ONE_CRORE) {
        remainder = number % ONE_LAKH;
        word = generateWords(Math.floor(number / ONE_LAKH)) + ' lakh,';

        /* ---- 1 00 00 000 – 99 99 99 999 (crore) --------------------------- */
    } else if (number < ONE_ARAB) {
        remainder = number % ONE_CRORE;
        word = generateWords(Math.floor(number / ONE_CRORE)) + ' crore,';

        /* ---- 1 00 00 00 000 – 99 99 99 99 999 (arab) ---------------------- */
    } else if (number < ONE_KHARAB) {
        remainder = number % ONE_ARAB;
        word = generateWords(Math.floor(number / ONE_ARAB)) + ' arab,';

        /* ---- 1 00 00 00 00 000 – 99 99 99 99 99 999 (kharab) ------------- */
    } else if (number < ONE_NEEL) {
        remainder = number % ONE_KHARAB;
        word = generateWords(Math.floor(number / ONE_KHARAB)) + ' kharab,';

        /* ---- 1 00 00 00 00 00 000 – 99 99 99 99 99 99 999 (neel) --------- */
    } else if (number < ONE_PADMA) {
        remainder = number % ONE_NEEL;
        word = generateWords(Math.floor(number / ONE_NEEL)) + ' neel,';

        /* ---- 1 00 00 00 00 00 00 000 – JS max (padma) --------------------- */
    } else if (number <= MAX) {
        remainder = number % ONE_PADMA;
        word = generateWords(Math.floor(number / ONE_PADMA)) + ' padma,';
    }

    words.push(word);
    return generateWords(remainder, words);
}


// ========== file: /src/toWordsOrdinal.js ==========


/**
 * Converts a number into ordinal words.
 * @example toWordsOrdinal(12) => 'twelfth'
 * @param {number|string} number
 * @returns {string}
 */
function toWordsOrdinal(number) {
    var words = toWords(number);
    return makeOrdinal(words);
}



    var numberToWords = {
        toOrdinal: toOrdinal,
        toWords: toWords,
        toWordsOrdinal: toWordsOrdinal
    };

    if (typeof exports != 'undefined') {
        if (typeof module != 'undefined' && module.exports) {
            exports = module.exports = numberToWords;
        }
        exports.numberToWords = numberToWords;
    } else {
        root.numberToWords = numberToWords;
    }

}());