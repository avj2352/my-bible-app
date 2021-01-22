/**
 * Helper library for showdown converter
 */
const showdown = require('showdown');
const converter = new showdown.Converter();
// Configuring options
converter.setOption('simplifiedAutoLink', 'true');

export default converter;