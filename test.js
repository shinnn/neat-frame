'use strict';

const neatFrame = require('.');
const termSize = require('term-size');
const test = require('tape');

const contentWidth = termSize().columns - '  ┌'.length - '┐  '.length;

test('neatFrame()', t => {
	const lines = neatFrame('A\nB').split('\n');

	t.equal(
		lines.shift(),
		`  ┌${'─'.repeat(contentWidth)}┐`,
		'should starts with an upper frame.'
	);

	t.equal(
		lines.shift(),
		`  │${' '.repeat(contentWidth)}│`,
		'should add 1 vertical padding to the top of contents.'
	);

	t.equal(
		lines.shift(),
		`  │ A${' '.repeat(contentWidth - ' A'.length)}│`,
		'should add 1 horizontal padding to both ends of each line.'
	);

	t.equal(
		lines.shift(),
		`  │ B${' '.repeat(contentWidth - ' B'.length)}│`,
		'should support multiline contents.'
	);

	t.equal(
		lines.shift(),
		`  │${' '.repeat(contentWidth)}│`,
		'should add 1 vertical padding to the bottom of contents.'
	);

	t.equal(
		lines.shift(),
		`  └${'─'.repeat(contentWidth)}┘`,
		'should starts with an lower frame.'
	);

	t.throws(
		() => neatFrame(),
		/^RangeError.*Expected 1 argument \(string\), but got no arguments instead\./,
		'should throw an error when it takes no arguments.'
	);

	t.throws(
		() => neatFrame('a', 'b'),
		/^RangeError.*Expected 1 argument \(string\), but got 2 arguments instead\./,
		'should throw an error when it takes too many arguments.'
	);

	t.throws(
		() => neatFrame(Buffer.from('a')),
		/TypeError.*Expected a string to be framed with box-drawing characters, but got <Buffer 61>\./,
		'should throw an error when it takes a non-string argument.'
	);

	t.end();
});
