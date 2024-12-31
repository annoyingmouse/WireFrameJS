import { codedMessage } from "./codedMessage.js";

/*
codedMessage.js holds a coded message (well, the name makes it obvious, huh?).

**Task**
- Decode the message!

key.md will help!

**Stretch Goal**
No stretch goal for the final day. Just stretch your legs!
*/

/**
 * abc = klm
 * xyz = "#$
 * abcdefghijklmnopqrstuvwxyz
 * *         *
 */

const b2d = (n) =>
  n
    .split("")
    .reverse()
    .reduce((x, y, i) => (y === "1" ? x + Math.pow(2, i) : x), 0);

const message = codedMessage
  .map((x) =>
    String.fromCharCode(
      b2d(x) - 10 < 32 ? 128 - (32 - (b2d(x) - 10)) : b2d(x) - 10,
    ),
  )
  .join("");

console.log(message);
