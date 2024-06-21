export const startMsg =
  'Welcome to <b>DumbBattle</b>, play with your friends in a simple game where you can`t cheat.\n\n We use <a href="https://scroll.io/">Scroll</a> for its speed and low fees, and <a href="https://en.wikipedia.org/wiki/Zero-knowledge_proof">Zero Knowledge</a> technology for the authenticity of the game.';

export const webAppMsg = (
  address: string,
  privateKey: string,
): string => `💠We generated wallet for you, pls fund it with some <b>ETH</b> on #Scroll, min bet amount is 0.0011 ETH\n
<i>press to copy</i>
<code>${address}</code>\n
Save your private key for the safe place:
<span class="tg-spoiler">${privateKey}</span>`;
