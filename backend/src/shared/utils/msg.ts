export const startMsg = (ethAmount: number) => `Welcome to 🐇<b>BunnBattle</b>!\n
Place your 2 rabbits in the 9 cells. Your opponent will do the same. The first to find the other's — wins. Let the hunt begin!

﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉﹉
We use <a href="https://scroll.io/">Scroll</a> L2 solution and zero-knowledge proofs to ensure a fair and secure gameplay experience. Dive in with confidence!

🐰Active players: 22
♦︎ Total ETH to chase: ${ethAmount} ETH
`;

export const webAppMsg = (
  address: string,
  privateKey: string,
): string => `💠We generated wallet for you, pls fund it with some <b>ETH</b> on #Scroll, min bet amount is 0.0011 ETH\n
<i>Press to copy</i>
<code>${address}</code>\n
Save your private key for the safe place:
<span class="tg-spoiler">${privateKey}</span>`;
