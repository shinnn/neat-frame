'use strict';

const boxen = require('boxen');
const neatFrame = require('.');
const wrapAnsi = require('wrap-ansi');

const boxenOption = {
	top: 1,
	bottom: 1,
	left: 1,
	right: 1
};
const contentWidth = process.stdout.columns - 4;
const fixtures = Array.from({length: 200}, (v, k) => Array.from({length: k}, (v2, k2) => 'a'.repeat(Math.max(k2, contentWidth))).join('\n'));
const wrapAnsiOption = {hard: true};

for (const [title, fn] of new Map([
	['neat-frame', v => neatFrame(v)],
	['boxen     ', v => boxen(wrapAnsi(v, contentWidth, wrapAnsiOption), boxenOption)]
])) {
	console.time(title);

	for (const fixture of fixtures) {
		fn(fixture);
	}

	console.timeEnd(title);
}
