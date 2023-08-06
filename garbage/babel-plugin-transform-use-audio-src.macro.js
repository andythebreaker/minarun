// babel-plugin-transform-use-audio-src-macro.js
const { createMacro } = require('babel-plugin-macros');
// ANSI escape codes for colors and styles
const ANSI_RESET = "\x1b[0m";
const ANSI_BG_LIGHT_GREEN = "\x1b[102m";
const ANSI_FG_BLACK = "\x1b[30m";
// Function to print text with the specified background and text color
function printColoredText(text, bgColor, textColor) {
    console.log(bgColor + textColor + text + ANSI_RESET);
  }
function transformUseAudioSrcMacro({ references, state, babel }) {
  const { types: t } = babel;

  references.default.forEach((path) => {
    if (path.parentPath.type === 'VariableDeclarator') {
      const properties = path.parentPath.node.init.properties;

      properties.forEach((property) => {
        printColoredText(`${JSON.stringify(property)}`, ANSI_BG_LIGHT_GREEN, ANSI_FG_BLACK);

        /*if (property.key.name === 'src') {
          const srcValue = property.value.value;
          const newSrcValue = srcValue.replace(/^(?!http|https):\/\//, './assets/');
          property.value = t.stringLiteral(newSrcValue);
        }*/
        
      });
    }
  });
}

module.exports = createMacro(transformUseAudioSrcMacro);
