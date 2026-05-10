module.exports = function check(str, bracketsConfig) {
  const pairs = Object.fromEntries(bracketsConfig);
  const openBrackets = new Set(Object.keys(pairs));

  const resultStack = str.split('').reduce((stack, char) => {
    // Если стек уже "сломан" (null), просто прокидываем это состояние дальше
    if (stack === null) return null;

    const top = stack[stack.length - 1];

    if (openBrackets.has(char)) {
      // Обработка случая, когда скобки одинаковые (например, '|')
      if (char === pairs[char] && top === char) {
        stack.pop();
      } else {
        stack.push(char);
      }
    } else if (stack.length === 0 || pairs[stack.pop()] !== char) {
      return null;
    }

    return stack;
  }, []);

  return resultStack !== null && resultStack.length === 0;
};
