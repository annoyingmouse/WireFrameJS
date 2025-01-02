/**
 * @name DSEG14.js
 * @description DSEG14 font for p5.js
 * @version 1.0.0
 * @license SIL Open Font License 1.1
 * @example
 * let dseg14;
 * function setup() {
 *  createCanvas(400, 400);
 *  dseg14 = new DSEG14(this, 0, 0, 1, "#71797E", "#E5E4E2", "A");
 *  dseg14.draw();
 *  dseg14.setState("B");
 *  dseg14.draw();
 *  dseg14.setState("C");
 *  dseg14.draw();
 *  dseg14.setState("D");
 *  dseg14.draw();
 * }
 */

/**
 * Copyright (c) 2020, keshikan (https://www.keshikan.net),
 * with Reserved Font Name "DSEG".
 *
 *
 * This Font Software is licensed under the SIL Open Font License, Version 1.1.
 * This license is copied below, and is also available with a FAQ at:
 * http://scripts.sil.org/OFL
 *
 *
 * -----------------------------------------------------------
 * SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007
 * -----------------------------------------------------------
 *
 * PREAMBLE
 * The goals of the Open Font License (OFL) are to stimulate worldwide
 * development of collaborative font projects, to support the font creation
 * efforts of academic and linguistic communities, and to provide a free and
 * open framework in which fonts may be shared and improved in partnership
 * with others.
 *
 * The OFL allows the licensed fonts to be used, studied, modified and
 * redistributed freely as long as they are not sold by themselves. The
 * fonts, including any derivative works, can be bundled, embedded,
 * redistributed and/or sold with any software provided that any reserved
 * names are not used by derivative works. The fonts and derivatives,
 * however, cannot be released under any other type of license. The
 * requirement for fonts to remain under this license does not apply
 * to any document created using the fonts or their derivatives.
 *
 * DEFINITIONS
 * "Font Software" refers to the set of files released by the Copyright
 * Holder(s) under this license and clearly marked as such. This may
 * include source files, build scripts and documentation.
 *
 * "Reserved Font Name" refers to any names specified as such after the
 * copyright statement(s).
 *
 * "Original Version" refers to the collection of Font Software components as
 * distributed by the Copyright Holder(s).
 *
 * "Modified Version" refers to any derivative made by adding to, deleting,
 * or substituting -- in part or in whole -- any of the components of the
 * Original Version, by changing formats or by porting the Font Software to a
 * new environment.
 *
 * "Author" refers to any designer, engineer, programmer, technical
 * writer or other person who contributed to the Font Software.
 *
 * PERMISSION & CONDITIONS
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of the Font Software, to use, study, copy, merge, embed, modify,
 * redistribute, and sell modified and unmodified copies of the Font
 * Software, subject to the following conditions:
 *
 * 1) Neither the Font Software nor any of its individual components,
 * in Original or Modified Versions, may be sold by itself.
 *
 * 2) Original or Modified Versions of the Font Software may be bundled,
 * redistributed and/or sold with any software, provided that each copy
 * contains the above copyright notice and this license. These can be
 * included either as stand-alone text files, human-readable headers or
 * in the appropriate machine-readable metadata fields within text or
 * binary files as long as those fields can be easily viewed by the user.
 *
 * 3) No Modified Version of the Font Software may use the Reserved Font
 * Name(s) unless explicit written permission is granted by the corresponding
 * Copyright Holder. This restriction only applies to the primary font name as
 * presented to the users.
 *
 * 4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
 * Software shall not be used to promote, endorse or advertise any
 * Modified Version, except to acknowledge the contribution(s) of the
 * Copyright Holder(s) and the Author(s) or with their explicit written
 * permission.
 *
 * 5) The Font Software, modified or unmodified, in part or in whole,
 * must be distributed entirely under this license, and must not be
 * distributed under any other license. The requirement for fonts to
 * remain under this license does not apply to any document created
 * using the Font Software.
 *
 * TERMINATION
 * This license becomes null and void if any of the above conditions are
 * not met.
 *
 * DISCLAIMER
 * THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
 * OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE
 * COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
 * DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
 * OTHER DEALINGS IN THE FONT SOFTWARE.
 */

export class DSEG14 {
  constructor(p5, x, y, multiplier, on, off, state) {
    this.p5 = p5;
    this.x = x || 0;
    this.y = y || 0;
    this.multiplier = multiplier || 1;
    this.on = on || "#71797E";
    this.off = off || "#E5E4E2";
    this.state = state || " ";
  }
  setState(state) {
    this.state = state;
  }
  states = {
    A: {
      Top: true,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: true,
      LeftMiddle: true,
      RightMiddle: true,
      BottomLeft: true,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: true,
      Bottom: false,
    },
    a: {
      Top: true,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: true,
      LeftMiddle: true,
      RightMiddle: true,
      BottomLeft: true,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: true,
      Bottom: false,
    },
    B: {
      Top: true,
      TopLeft: false,
      TopLeftX: false,
      TopMiddle: true,
      TopRightX: false,
      RightTop: true,
      LeftMiddle: false,
      RightMiddle: true,
      BottomLeft: false,
      BottomLeftX: false,
      BottomMiddle: true,
      BottomRightX: false,
      BottomRight: true,
      Bottom: true,
    },
    b: {
      Top: true,
      TopLeft: false,
      TopLeftX: false,
      TopMiddle: true,
      TopRightX: false,
      RightTop: true,
      LeftMiddle: false,
      RightMiddle: true,
      BottomLeft: false,
      BottomLeftX: false,
      BottomMiddle: true,
      BottomRightX: false,
      BottomRight: true,
      Bottom: true,
    },
    C: {
      Top: true,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: false,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: true,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: false,
      Bottom: true,
    },
    c: {
      Top: true,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: false,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: true,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: false,
      Bottom: true,
    },
    D: {
      Top: true,
      TopLeft: false,
      TopLeftX: false,
      TopMiddle: true,
      TopRightX: false,
      RightTop: true,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: false,
      BottomLeftX: false,
      BottomMiddle: true,
      BottomRightX: false,
      BottomRight: true,
      Bottom: true,
    },
    d: {
      Top: true,
      TopLeft: false,
      TopLeftX: false,
      TopMiddle: true,
      TopRightX: false,
      RightTop: true,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: false,
      BottomLeftX: false,
      BottomMiddle: true,
      BottomRightX: false,
      BottomRight: true,
      Bottom: true,
    },
    E: {
      Top: true,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: false,
      LeftMiddle: true,
      RightMiddle: true,
      BottomLeft: true,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: false,
      Bottom: true,
    },
    e: {
      Top: true,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: false,
      LeftMiddle: true,
      RightMiddle: true,
      BottomLeft: true,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: false,
      Bottom: true,
    },
    F: {
      Top: true,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: false,
      LeftMiddle: true,
      RightMiddle: true,
      BottomLeft: true,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: false,
      Bottom: false,
    },
    f: {
      Top: true,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: false,
      LeftMiddle: true,
      RightMiddle: true,
      BottomLeft: true,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: false,
      Bottom: false,
    },
    G: {
      Top: true,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: false,
      LeftMiddle: false,
      RightMiddle: true,
      BottomLeft: true,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: true,
      Bottom: true,
    },
    g: {
      Top: true,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: false,
      LeftMiddle: false,
      RightMiddle: true,
      BottomLeft: true,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: true,
      Bottom: true,
    },
    H: {
      Top: false,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: true,
      LeftMiddle: true,
      RightMiddle: true,
      BottomLeft: true,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: true,
      Bottom: false,
    },
    h: {
      Top: false,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: true,
      LeftMiddle: true,
      RightMiddle: true,
      BottomLeft: true,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: true,
      Bottom: false,
    },
    I: {
      Top: true,
      TopLeft: false,
      TopLeftX: false,
      TopMiddle: true,
      TopRightX: false,
      RightTop: false,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: false,
      BottomLeftX: false,
      BottomMiddle: true,
      BottomRightX: false,
      BottomRight: false,
      Bottom: true,
    },
    i: {
      Top: true,
      TopLeft: false,
      TopLeftX: false,
      TopMiddle: true,
      TopRightX: false,
      RightTop: false,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: false,
      BottomLeftX: false,
      BottomMiddle: true,
      BottomRightX: false,
      BottomRight: false,
      Bottom: true,
    },
    J: {
      Top: false,
      TopLeft: false,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: true,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: true,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: true,
      Bottom: true,
    },
    j: {
      Top: false,
      TopLeft: false,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: true,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: true,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: true,
      Bottom: true,
    },
    K: {
      Top: false,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: true,
      RightTop: false,
      LeftMiddle: true,
      RightMiddle: false,
      BottomLeft: true,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: true,
      BottomRight: false,
      Bottom: false,
    },
    k: {
      Top: false,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: true,
      RightTop: false,
      LeftMiddle: true,
      RightMiddle: false,
      BottomLeft: true,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: true,
      BottomRight: false,
      Bottom: false,
    },
    L: {
      Top: false,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: false,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: true,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: false,
      Bottom: true,
    },
    l: {
      Top: false,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: false,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: true,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: false,
      Bottom: true,
    },
    // M: {
    //   Top: false,
    //   TopLeft: true,
    //   TopLeftX: true,
    //   TopMiddle: false,
    //   TopRightX: true,
    //   RightTop: true,
    //   LeftMiddle: false,
    //   RightMiddle: false,
    //   BottomLeft: true,
    //   BottomLeftX: false,
    //   BottomMiddle: true,
    //   BottomRightX: false,
    //   BottomRight: true,
    //   Bottom: false,
    // },
    M: {
      Top: false,
      TopLeft: true,
      TopLeftX: true,
      TopMiddle: false,
      TopRightX: true,
      RightTop: true,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: true,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: true,
      Bottom: false,
    },
    m: {
      Top: false,
      TopLeft: true,
      TopLeftX: true,
      TopMiddle: false,
      TopRightX: true,
      RightTop: true,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: true,
      BottomLeftX: false,
      BottomMiddle: true,
      BottomRightX: false,
      BottomRight: true,
      Bottom: false,
    },
    N: {
      Top: false,
      TopLeft: true,
      TopLeftX: true,
      TopMiddle: false,
      TopRightX: false,
      RightTop: true,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: true,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: true,
      BottomRight: true,
      Bottom: false,
    },
    n: {
      Top: false,
      TopLeft: true,
      TopLeftX: true,
      TopMiddle: false,
      TopRightX: false,
      RightTop: true,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: true,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: true,
      BottomRight: true,
      Bottom: false,
    },
    O: {
      Top: true,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: true,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: true,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: true,
      Bottom: true,
    },
    o: {
      Top: true,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: true,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: true,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: true,
      Bottom: true,
    },
    P: {
      Top: true,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: true,
      LeftMiddle: true,
      RightMiddle: true,
      BottomLeft: true,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: false,
      Bottom: false,
    },
    p: {
      Top: true,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: true,
      LeftMiddle: true,
      RightMiddle: true,
      BottomLeft: true,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: false,
      Bottom: false,
    },
    Q: {
      Top: true,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: true,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: true,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: true,
      BottomRight: true,
      Bottom: true,
    },
    q: {
      Top: true,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: true,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: true,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: true,
      BottomRight: true,
      Bottom: true,
    },
    R: {
      Top: true,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: true,
      LeftMiddle: true,
      RightMiddle: true,
      BottomLeft: true,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: true,
      BottomRight: false,
      Bottom: false,
    },
    r: {
      Top: true,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: true,
      LeftMiddle: true,
      RightMiddle: true,
      BottomLeft: true,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: true,
      BottomRight: false,
      Bottom: false,
    },
    S: {
      Top: true,
      TopLeft: true,
      TopLeftX: true,
      TopMiddle: false,
      TopRightX: false,
      RightTop: false,
      LeftMiddle: true,
      RightMiddle: true,
      BottomLeft: false,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: true,
      BottomRight: true,
      Bottom: true,
    },
    s: {
      Top: true,
      TopLeft: true,
      TopLeftX: true,
      TopMiddle: false,
      TopRightX: false,
      RightTop: false,
      LeftMiddle: true,
      RightMiddle: true,
      BottomLeft: false,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: true,
      BottomRight: true,
      Bottom: true,
    },
    T: {
      Top: true,
      TopLeft: false,
      TopLeftX: false,
      TopMiddle: true,
      TopRightX: false,
      RightTop: false,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: false,
      BottomLeftX: false,
      BottomMiddle: true,
      BottomRightX: false,
      BottomRight: false,
      Bottom: false,
    },
    t: {
      Top: true,
      TopLeft: false,
      TopLeftX: false,
      TopMiddle: true,
      TopRightX: false,
      RightTop: false,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: false,
      BottomLeftX: false,
      BottomMiddle: true,
      BottomRightX: false,
      BottomRight: false,
      Bottom: false,
    },
    U: {
      Top: false,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: true,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: true,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: true,
      Bottom: true,
    },
    u: {
      Top: false,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: true,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: true,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: true,
      Bottom: true,
    },
    V: {
      Top: false,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: true,
      RightTop: false,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: true,
      BottomLeftX: true,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: false,
      Bottom: false,
    },
    v: {
      Top: false,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: true,
      RightTop: false,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: true,
      BottomLeftX: true,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: false,
      Bottom: false,
    },
    // W: {
    //   Top: false,
    //   TopLeft: true,
    //   TopLeftX: false,
    //   TopMiddle: true,
    //   TopRightX: false,
    //   RightTop: true,
    //   LeftMiddle: false,
    //   RightMiddle: false,
    //   BottomLeft: true,
    //   BottomLeftX: true,
    //   BottomMiddle: false,
    //   BottomRightX: true,
    //   BottomRight: true,
    //   Bottom: false,
    // },
    W: {
      Top: false,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: true,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: true,
      BottomLeftX: false,
      BottomMiddle: true,
      BottomRightX: false,
      BottomRight: true,
      Bottom: true,
    },
    w: {
      Top: false,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: true,
      TopRightX: false,
      RightTop: true,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: true,
      BottomLeftX: true,
      BottomMiddle: false,
      BottomRightX: true,
      BottomRight: true,
      Bottom: false,
    },
    X: {
      Top: false,
      TopLeft: false,
      TopLeftX: true,
      TopMiddle: false,
      TopRightX: true,
      RightTop: false,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: false,
      BottomLeftX: true,
      BottomMiddle: false,
      BottomRightX: true,
      BottomRight: false,
      Bottom: false,
    },
    x: {
      Top: false,
      TopLeft: false,
      TopLeftX: true,
      TopMiddle: false,
      TopRightX: true,
      RightTop: false,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: false,
      BottomLeftX: true,
      BottomMiddle: false,
      BottomRightX: true,
      BottomRight: false,
      Bottom: false,
    },
    // Y: {
    //   Top: false,
    //   TopLeft: false,
    //   TopLeftX: true,
    //   TopMiddle: false,
    //   TopRightX: true,
    //   RightTop: false,
    //   LeftMiddle: false,
    //   RightMiddle: false,
    //   BottomLeft: false,
    //   BottomLeftX: false,
    //   BottomMiddle: true,
    //   BottomRightX: false,
    //   BottomRight: false,
    //   Bottom: false,
    // },
    Y: {
      Top: false,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: true,
      LeftMiddle: true,
      RightMiddle: true,
      BottomLeft: false,
      BottomLeftX: false,
      BottomMiddle: true,
      BottomRightX: false,
      BottomRight: false,
      Bottom: false,
    },
    y: {
      Top: false,
      TopLeft: false,
      TopLeftX: true,
      TopMiddle: false,
      TopRightX: true,
      RightTop: false,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: false,
      BottomLeftX: false,
      BottomMiddle: true,
      BottomRightX: false,
      BottomRight: false,
      Bottom: false,
    },
    Z: {
      Top: true,
      TopLeft: false,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: true,
      RightTop: false,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: false,
      BottomLeftX: true,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: false,
      Bottom: true,
    },
    z: {
      Top: true,
      TopLeft: false,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: true,
      RightTop: false,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: false,
      BottomLeftX: true,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: false,
      Bottom: true,
    },
    // 1: {
    //   Top: false,
    //   TopLeft: false,
    //   TopLeftX: false,
    //   TopMiddle: false,
    //   TopRightX: false,
    //   RightTop: true,
    //   LeftMiddle: false,
    //   RightMiddle: false,
    //   BottomLeft: false,
    //   BottomLeftX: false,
    //   BottomMiddle: false,
    //   BottomRightX: false,
    //   BottomRight: true,
    //   Bottom: false,
    // },
    1: {
      Top: false,
      TopLeft: false,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: true,
      RightTop: true,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: false,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: true,
      Bottom: false,
    },
    2: {
      Top: true,
      TopLeft: false,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: true,
      LeftMiddle: true,
      RightMiddle: true,
      BottomLeft: true,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: false,
      Bottom: true,
    },
    3: {
      Top: true,
      TopLeft: false,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: true,
      LeftMiddle: true,
      RightMiddle: true,
      BottomLeft: false,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: true,
      Bottom: true,
    },
    4: {
      Top: false,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: true,
      LeftMiddle: true,
      RightMiddle: true,
      BottomLeft: false,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: true,
      Bottom: false,
    },
    5: {
      Top: true,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: false,
      LeftMiddle: true,
      RightMiddle: true,
      BottomLeft: false,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: true,
      Bottom: true,
    },
    6: {
      Top: true,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: false,
      LeftMiddle: true,
      RightMiddle: true,
      BottomLeft: true,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: true,
      Bottom: true,
    },
    // 7: {
    //   Top: true,
    //   TopLeft: true,
    //   TopLeftX: false,
    //   TopMiddle: false,
    //   TopRightX: false,
    //   RightTop: true,
    //   LeftMiddle: false,
    //   RightMiddle: false,
    //   BottomLeft: false,
    //   BottomLeftX: false,
    //   BottomMiddle: false,
    //   BottomRightX: false,
    //   BottomRight: true,
    //   Bottom: false,
    // },
    7: {
      Top: true,
      TopLeft: false,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: true,
      RightTop: false,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: false,
      BottomLeftX: false,
      BottomMiddle: true,
      BottomRightX: false,
      BottomRight: false,
      Bottom: false,
    },
    8: {
      Top: true,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: true,
      LeftMiddle: true,
      RightMiddle: true,
      BottomLeft: true,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: true,
      Bottom: true,
    },
    9: {
      Top: true,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: true,
      LeftMiddle: true,
      RightMiddle: true,
      BottomLeft: false,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: true,
      Bottom: true,
    },
    0: {
      Top: true,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: true,
      RightTop: true,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: true,
      BottomLeftX: true,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: true,
      Bottom: true,
    },
    " ": {
      Top: false,
      TopLeft: false,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: false,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: false,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: false,
      Bottom: false,
    },
    "?": {
      Top: true,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: true,
      LeftMiddle: false,
      RightMiddle: true,
      BottomLeft: false,
      BottomLeftX: false,
      BottomMiddle: true,
      BottomRightX: false,
      BottomRight: false,
      Bottom: false,
    },
    '"': {
      Top: false,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: true,
      TopRightX: false,
      RightTop: false,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: false,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: false,
      Bottom: false,
    },
    $: {
      Top: true,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: true,
      TopRightX: false,
      RightTop: false,
      LeftMiddle: true,
      RightMiddle: true,
      BottomLeft: false,
      BottomLeftX: false,
      BottomMiddle: true,
      BottomRightX: false,
      BottomRight: true,
      Bottom: true,
    },
    "%": {
      Top: false,
      TopLeft: true,
      TopLeftX: true,
      TopMiddle: false,
      TopRightX: true,
      RightTop: false,
      LeftMiddle: true,
      RightMiddle: true,
      BottomLeft: false,
      BottomLeftX: true,
      BottomMiddle: false,
      BottomRightX: true,
      BottomRight: true,
      Bottom: false,
    },
    "&": {
      Top: true,
      TopLeft: false,
      TopLeftX: true,
      TopMiddle: false,
      TopRightX: true,
      RightTop: false,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: false,
      BottomLeftX: true,
      BottomMiddle: false,
      BottomRightX: true,
      BottomRight: true,
      Bottom: true,
    },
    "'": {
      Top: false,
      TopLeft: false,
      TopLeftX: false,
      TopMiddle: true,
      TopRightX: false,
      RightTop: false,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: false,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: false,
      Bottom: false,
    },
    "(": {
      Top: false,
      TopLeft: false,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: true,
      RightTop: false,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: false,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: true,
      BottomRight: false,
      Bottom: false,
    },
    ")": {
      Top: false,
      TopLeft: false,
      TopLeftX: true,
      TopMiddle: false,
      TopRightX: false,
      RightTop: false,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: false,
      BottomLeftX: true,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: false,
      Bottom: false,
    },
    "*": {
      Top: false,
      TopLeft: false,
      TopLeftX: true,
      TopMiddle: true,
      TopRightX: true,
      RightTop: false,
      LeftMiddle: true,
      RightMiddle: true,
      BottomLeft: false,
      BottomLeftX: true,
      BottomMiddle: true,
      BottomRightX: true,
      BottomRight: false,
      Bottom: false,
    },
    "+": {
      Top: false,
      TopLeft: false,
      TopLeftX: false,
      TopMiddle: true,
      TopRightX: false,
      RightTop: false,
      LeftMiddle: true,
      RightMiddle: true,
      BottomLeft: false,
      BottomLeftX: false,
      BottomMiddle: true,
      BottomRightX: false,
      BottomRight: false,
      Bottom: false,
    },
    ",": {
      Top: false,
      TopLeft: false,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: false,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: false,
      BottomLeftX: true,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: false,
      Bottom: false,
    },
    "-": {
      Top: false,
      TopLeft: false,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: false,
      LeftMiddle: true,
      RightMiddle: true,
      BottomLeft: false,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: false,
      Bottom: false,
    },
    "/": {
      Top: false,
      TopLeft: false,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: true,
      RightTop: false,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: false,
      BottomLeftX: true,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: false,
      Bottom: false,
    },
    "<": {
      Top: false,
      TopLeft: false,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: true,
      RightTop: false,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: false,
      BottomLeftX: true,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: false,
      Bottom: true,
    },
    "=": {
      Top: false,
      TopLeft: false,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: false,
      LeftMiddle: true,
      RightMiddle: true,
      BottomLeft: false,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: false,
      Bottom: true,
    },
    ">": {
      Top: false,
      TopLeft: false,
      TopLeftX: true,
      TopMiddle: false,
      TopRightX: false,
      RightTop: false,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: false,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: true,
      BottomRight: false,
      Bottom: true,
    },
    "@": {
      Top: true,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: true,
      LeftMiddle: false,
      RightMiddle: true,
      BottomLeft: true,
      BottomLeftX: false,
      BottomMiddle: true,
      BottomRightX: false,
      BottomRight: true,
      Bottom: true,
    },
    "\\": {
      Top: false,
      TopLeft: false,
      TopLeftX: true,
      TopMiddle: false,
      TopRightX: false,
      RightTop: false,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: false,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: true,
      BottomRight: false,
      Bottom: false,
    },
    "^": {
      Top: false,
      TopLeft: true,
      TopLeftX: true,
      TopMiddle: false,
      TopRightX: false,
      RightTop: false,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: false,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: false,
      Bottom: false,
    },
    _: {
      Top: false,
      TopLeft: false,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: false,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: false,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: false,
      Bottom: true,
    },
    "`": {
      Top: false,
      TopLeft: false,
      TopLeftX: true,
      TopMiddle: false,
      TopRightX: false,
      RightTop: false,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: false,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: false,
      Bottom: false,
    },
    "|": {
      Top: false,
      TopLeft: false,
      TopLeftX: false,
      TopMiddle: true,
      TopRightX: false,
      RightTop: false,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: false,
      BottomLeftX: false,
      BottomMiddle: true,
      BottomRightX: false,
      BottomRight: false,
      Bottom: false,
    },
    "~": {
      Top: true,
      TopLeft: true,
      TopLeftX: true,
      TopMiddle: true,
      TopRightX: true,
      RightTop: true,
      LeftMiddle: true,
      RightMiddle: true,
      BottomLeft: true,
      BottomLeftX: true,
      BottomMiddle: true,
      BottomRightX: true,
      BottomRight: true,
      Bottom: true,
    },
    "¥": {
      Top: false,
      TopLeft: false,
      TopLeftX: true,
      TopMiddle: false,
      TopRightX: true,
      RightTop: false,
      LeftMiddle: true,
      RightMiddle: true,
      BottomLeft: false,
      BottomLeftX: false,
      BottomMiddle: true,
      BottomRightX: false,
      BottomRight: false,
      Bottom: false,
    },
    "¦": {
      Top: false,
      TopLeft: false,
      TopLeftX: false,
      TopMiddle: true,
      TopRightX: false,
      RightTop: false,
      LeftMiddle: false,
      RightMiddle: false,
      BottomLeft: false,
      BottomLeftX: false,
      BottomMiddle: true,
      BottomRightX: false,
      BottomRight: false,
      Bottom: false,
    },
    "°": {
      Top: true,
      TopLeft: true,
      TopLeftX: false,
      TopMiddle: false,
      TopRightX: false,
      RightTop: true,
      LeftMiddle: true,
      RightMiddle: true,
      BottomLeft: false,
      BottomLeftX: false,
      BottomMiddle: false,
      BottomRightX: false,
      BottomRight: false,
      Bottom: false,
    },
    "±": {
      Top: false,
      TopLeft: false,
      TopLeftX: false,
      TopMiddle: true,
      TopRightX: false,
      RightTop: false,
      LeftMiddle: true,
      RightMiddle: true,
      BottomLeft: false,
      BottomLeftX: false,
      BottomMiddle: true,
      BottomRightX: false,
      BottomRight: false,
      Bottom: true,
    },
  };

  draw = () => {
    for (const [key, value] of Object.entries(this.states[this.state])) {
      this.p5.push();
      this.p5.translate(this.x, this.y);
      this[key](value);
      this.p5.pop();
    }
  };

  Top = (state) => {
    this.p5.strokeWeight(0);
    this.p5.strokeJoin(this.p5.ROUND);
    if (state) {
      this.p5.fill(this.on);
    } else {
      this.p5.fill(this.off);
    }
    this.p5.beginShape();
    this.p5.vertex(659.4098 * this.multiplier, 147.72575 * this.multiplier);
    this.p5.bezierVertex(
      630.3268800000001 * this.multiplier,
      118.64284 * this.multiplier,
      601.24398 * this.multiplier,
      89.559927 * this.multiplier,
      572.16106 * this.multiplier,
      60.47701500000001 * this.multiplier,
    );
    this.p5.bezierVertex(
      543.0781400000001 * this.multiplier,
      89.55992700000002 * this.multiplier,
      513.99525 * this.multiplier,
      118.64284 * this.multiplier,
      484.91233 * this.multiplier,
      147.72575 * this.multiplier,
    );
    this.p5.bezierVertex(
      377.71375 * this.multiplier,
      147.72575 * this.multiplier,
      270.51516000000004 * this.multiplier,
      147.72575 * this.multiplier,
      163.31658 * this.multiplier,
      147.72575 * this.multiplier,
    );
    this.p5.bezierVertex(
      115.54465 * this.multiplier,
      99.953729 * this.multiplier,
      67.772719 * this.multiplier,
      52.181711 * this.multiplier,
      20.000789 * this.multiplier,
      4.4096908 * this.multiplier,
    );
    this.p5.bezierVertex(
      388.10851 * this.multiplier,
      4.4096908 * this.multiplier,
      756.21626 * this.multiplier,
      4.4096908 * this.multiplier,
      1124.3239999999998 * this.multiplier,
      4.4096908 * this.multiplier,
    );
    this.p5.bezierVertex(
      1076.552 * this.multiplier,
      52.181711 * this.multiplier,
      1028.7799999999997 * this.multiplier,
      99.95372900000001 * this.multiplier,
      981.0079199999998 * this.multiplier,
      147.72575 * this.multiplier,
    );
    this.p5.bezierVertex(
      873.8085499999997 * this.multiplier,
      147.72575 * this.multiplier,
      766.6091699999997 * this.multiplier,
      147.72575 * this.multiplier,
      659.4097999999998 * this.multiplier,
      147.72575 * this.multiplier,
    );
    this.p5.endShape();
  };
  TopLeft = (state) => {
    this.p5.strokeWeight(0);
    this.p5.strokeJoin(this.p5.ROUND);
    if (state) {
      this.p5.fill(this.on);
    } else {
      this.p5.fill(this.off);
    }
    this.p5.beginShape();
    this.p5.vertex(71.501405 * this.multiplier, 809.18487 * this.multiplier);
    this.p5.bezierVertex(
      51.203207 * this.multiplier,
      804.4688 * this.multiplier,
      -2.8457706 * this.multiplier,
      783.47499 * this.multiplier,
      4.4099515 * this.multiplier,
      801.23353 * this.multiplier,
    );
    this.p5.bezierVertex(
      4.4099515 * this.multiplier,
      540.8228899999999 * this.multiplier,
      4.4099515 * this.multiplier,
      280.41223 * this.multiplier,
      4.4099515 * this.multiplier,
      20.001585999999975 * this.multiplier,
    );
    this.p5.bezierVertex(
      52.181972 * this.multiplier,
      67.773517 * this.multiplier,
      99.95399 * this.multiplier,
      115.54545 * this.multiplier,
      147.72601 * this.multiplier,
      163.31738 * this.multiplier,
    );
    this.p5.bezierVertex(
      147.72601 * this.multiplier,
      353.19825000000003 * this.multiplier,
      147.72601 * this.multiplier,
      543.0791300000001 * this.multiplier,
      147.72601 * this.multiplier,
      732.96 * this.multiplier,
    );
    this.p5.bezierVertex(
      122.31787 * this.multiplier,
      758.3683100000001 * this.multiplier,
      96.909234 * this.multiplier,
      783.77643 * this.multiplier,
      71.501405 * this.multiplier,
      809.18487 * this.multiplier,
    );
    this.p5.endShape();
  };
  TopLeftX = (state) => {
    this.p5.strokeWeight(0);
    this.p5.strokeJoin(this.p5.ROUND);
    if (state) {
      this.p5.fill(this.on);
    } else {
      this.p5.fill(this.off);
    }
    this.p5.beginShape();
    this.p5.vertex(478.45597 * this.multiplier, 726.50258 * this.multiplier);
    this.p5.bezierVertex(
      445.50219 * this.multiplier,
      726.50258 * this.multiplier,
      412.54843999999997 * this.multiplier,
      726.50258 * this.multiplier,
      379.59466999999995 * this.multiplier,
      726.50258 * this.multiplier,
    );
    this.p5.bezierVertex(
      309.6549 * this.multiplier,
      575.41933 * this.multiplier,
      239.71511 * this.multiplier,
      424.33606 * this.multiplier,
      169.77533 * this.multiplier,
      273.25281 * this.multiplier,
    );
    this.p5.bezierVertex(
      169.77533 * this.multiplier,
      238.76005 * this.multiplier,
      169.77533 * this.multiplier,
      204.26729 * this.multiplier,
      169.77533 * this.multiplier,
      169.77454 * this.multiplier,
    );
    this.p5.bezierVertex(
      202.72908999999999 * this.multiplier,
      169.77454 * this.multiplier,
      235.68286 * this.multiplier,
      169.77454 * this.multiplier,
      268.63662 * this.multiplier,
      169.77454 * this.multiplier,
    );
    this.p5.bezierVertex(
      338.5764 * this.multiplier,
      320.85778 * this.multiplier,
      408.51619 * this.multiplier,
      471.94106 * this.multiplier,
      478.45597 * this.multiplier,
      623.0243 * this.multiplier,
    );
    this.p5.bezierVertex(
      478.45597 * this.multiplier,
      657.51705 * this.multiplier,
      478.45597 * this.multiplier,
      692.0098300000001 * this.multiplier,
      478.45597 * this.multiplier,
      726.5025800000001 * this.multiplier,
    );
    this.p5.endShape();
  };
  TopMiddle = (state) => {
    this.p5.strokeWeight(0);
    this.p5.strokeJoin(this.p5.ROUND);
    if (state) {
      this.p5.fill(this.on);
    } else {
      this.p5.fill(this.off);
    }
    this.p5.beginShape();
    this.p5.vertex(572.1608 * this.multiplier, 804.61816 * this.multiplier);
    this.p5.bezierVertex(
      549.28363 * this.multiplier,
      778.98903 * this.multiplier,
      518.66718 * this.multiplier,
      756.5655899999999 * this.multiplier,
      500.5029 * this.multiplier,
      728.98434 * this.multiplier,
    );
    this.p5.bezierVertex(
      500.5029 * this.multiplier,
      540.42869 * this.multiplier,
      500.5029 * this.multiplier,
      351.87302999999997 * this.multiplier,
      500.5029 * this.multiplier,
      163.31737999999996 * this.multiplier,
    );
    this.p5.bezierVertex(
      524.38888 * this.multiplier,
      139.43140999999997 * this.multiplier,
      548.27482 * this.multiplier,
      115.54544999999996 * this.multiplier,
      572.1608 * this.multiplier,
      91.65948299999995 * this.multiplier,
    );
    this.p5.bezierVertex(
      595.03805 * this.multiplier,
      117.28852999999995 * this.multiplier,
      625.6546 * this.multiplier,
      139.71184999999994 * this.multiplier,
      643.81896 * this.multiplier,
      167.29303999999996 * this.multiplier,
    );
    this.p5.bezierVertex(
      643.81896 * this.multiplier,
      355.84869 * this.multiplier,
      643.81896 * this.multiplier,
      544.40434 * this.multiplier,
      643.81896 * this.multiplier,
      732.96 * this.multiplier,
    );
    this.p5.bezierVertex(
      619.93291 * this.multiplier,
      756.84605 * this.multiplier,
      596.04685 * this.multiplier,
      780.73211 * this.multiplier,
      572.1608 * this.multiplier,
      804.61816 * this.multiplier,
    );
    this.p5.endShape();
  };
  TopRightX = (state) => {
    this.p5.strokeWeight(0);
    this.p5.strokeJoin(this.p5.ROUND);
    if (state) {
      this.p5.fill(this.on);
    } else {
      this.p5.fill(this.off);
    }
    this.p5.beginShape();
    this.p5.vertex(665.86828 * this.multiplier, 726.50258 * this.multiplier);
    this.p5.bezierVertex(
      668.17568 * this.multiplier,
      689.8675499999999 * this.multiplier,
      661.2962200000001 * this.multiplier,
      651.20925 * this.multiplier,
      669.20856 * this.multiplier,
      615.8086099999999 * this.multiplier,
    );
    this.p5.bezierVertex(
      738.0349100000001 * this.multiplier,
      467.1305899999999 * this.multiplier,
      806.8612700000001 * this.multiplier,
      318.45255999999995 * this.multiplier,
      875.68762 * this.multiplier,
      169.77453999999994 * this.multiplier,
    );
    this.p5.bezierVertex(
      908.64139 * this.multiplier,
      169.77453999999994 * this.multiplier,
      941.59514 * this.multiplier,
      169.77453999999994 * this.multiplier,
      974.5489200000001 * this.multiplier,
      169.77453999999994 * this.multiplier,
    );
    this.p5.bezierVertex(
      972.2415100000001 * this.multiplier,
      206.40956999999995 * this.multiplier,
      979.12097 * this.multiplier,
      245.06786999999994 * this.multiplier,
      971.2086300000001 * this.multiplier,
      280.46849999999995 * this.multiplier,
    );
    this.p5.bezierVertex(
      902.38228 * this.multiplier,
      429.14653 * this.multiplier,
      833.5559300000001 * this.multiplier,
      577.8245499999999 * this.multiplier,
      764.7295700000001 * this.multiplier,
      726.50258 * this.multiplier,
    );
    this.p5.bezierVertex(
      731.7758000000001 * this.multiplier,
      726.50258 * this.multiplier,
      698.8220500000001 * this.multiplier,
      726.50258 * this.multiplier,
      665.8682800000001 * this.multiplier,
      726.50258 * this.multiplier,
    );
    this.p5.endShape();
  };
  RightTop = (state) => {
    this.p5.strokeWeight(0);
    this.p5.strokeJoin(this.p5.ROUND);
    if (state) {
      this.p5.fill(this.on);
    } else {
      this.p5.fill(this.off);
    }
    this.p5.beginShape();
    this.p5.vertex(1072.8213 * this.multiplier, 809.18487 * this.multiplier);
    this.p5.bezierVertex(
      1047.4131 * this.multiplier,
      783.7766700000001 * this.multiplier,
      1022.0050000000001 * this.multiplier,
      758.36846 * this.multiplier,
      996.5969100000001 * this.multiplier,
      732.9602600000001 * this.multiplier,
    );
    this.p5.bezierVertex(
      996.5969100000001 * this.multiplier,
      543.0793900000001 * this.multiplier,
      996.5969100000001 * this.multiplier,
      353.1985200000001 * this.multiplier,
      996.5969100000001 * this.multiplier,
      163.31765000000007 * this.multiplier,
    );
    this.p5.bezierVertex(
      1044.3689000000002 * this.multiplier,
      115.54571000000007 * this.multiplier,
      1092.1409 * this.multiplier,
      67.77378100000007 * this.multiplier,
      1139.913 * this.multiplier,
      20.001851000000073 * this.multiplier,
    );
    this.p5.bezierVertex(
      1139.913 * this.multiplier,
      283.0629500000001 * this.multiplier,
      1139.913 * this.multiplier,
      546.1240300000001 * this.multiplier,
      1139.913 * this.multiplier,
      809.1851300000001 * this.multiplier,
    );
    this.p5.bezierVertex(
      1117.5491 * this.multiplier,
      809.1849500000001 * this.multiplier,
      1095.1846 * this.multiplier,
      809.1851300000001 * this.multiplier,
      1072.8213 * this.multiplier,
      809.18487 * this.multiplier,
    );
    this.p5.endShape();
  };
  LeftMiddle = (state) => {
    this.p5.strokeWeight(0);
    this.p5.strokeJoin(this.p5.ROUND);
    if (state) {
      this.p5.fill(this.on);
    } else {
      this.p5.fill(this.off);
    }
    this.p5.beginShape();
    this.p5.vertex(91.658686 * this.multiplier, 820.20741 * this.multiplier);
    this.p5.bezierVertex(
      117.28773000000001 * this.multiplier,
      797.33024 * this.multiplier,
      139.71105 * this.multiplier,
      766.71377 * this.multiplier,
      167.29225000000002 * this.multiplier,
      748.5495099999999 * this.multiplier,
    );
    this.p5.bezierVertex(
      273.16560000000004 * this.multiplier,
      748.5495099999999 * this.multiplier,
      379.03897000000006 * this.multiplier,
      748.5495099999999 * this.multiplier,
      484.91233 * this.multiplier,
      748.5495099999999 * this.multiplier,
    );
    this.p5.bezierVertex(
      508.79838 * this.multiplier,
      772.43549 * this.multiplier,
      532.68444 * this.multiplier,
      796.3214399999999 * this.multiplier,
      556.57049 * this.multiplier,
      820.20741 * this.multiplier,
    );
    this.p5.bezierVertex(
      530.9413599999999 * this.multiplier,
      843.08469 * this.multiplier,
      508.51791999999995 * this.multiplier,
      873.70118 * this.multiplier,
      480.93666999999994 * this.multiplier,
      891.8655699999999 * this.multiplier,
    );
    this.p5.bezierVertex(
      375.06330999999994 * this.multiplier,
      891.8655699999999 * this.multiplier,
      269.18994999999995 * this.multiplier,
      891.8655699999999 * this.multiplier,
      163.31657999999993 * this.multiplier,
      891.8655699999999 * this.multiplier,
    );
    this.p5.bezierVertex(
      139.43061999999992 * this.multiplier,
      867.97952 * this.multiplier,
      115.54464999999993 * this.multiplier,
      844.0934599999999 * this.multiplier,
      91.65868599999993 * this.multiplier,
      820.20741 * this.multiplier,
    );
    this.p5.endShape();
  };
  RightMiddle = (state) => {
    this.p5.strokeWeight(0);
    this.p5.strokeJoin(this.p5.ROUND);
    if (state) {
      this.p5.fill(this.on);
    } else {
      this.p5.fill(this.off);
    }
    this.p5.beginShape();
    this.p5.vertex(587.75269 * this.multiplier, 820.20741 * this.multiplier);
    this.p5.bezierVertex(
      613.38174 * this.multiplier,
      797.33024 * this.multiplier,
      635.8050800000001 * this.multiplier,
      766.71377 * this.multiplier,
      663.38625 * this.multiplier,
      748.5495099999999 * this.multiplier,
    );
    this.p5.bezierVertex(
      769.2596100000001 * this.multiplier,
      748.5495099999999 * this.multiplier,
      875.13297 * this.multiplier,
      748.5495099999999 * this.multiplier,
      981.00634 * this.multiplier,
      748.5495099999999 * this.multiplier,
    );
    this.p5.bezierVertex(
      1004.8924000000001 * this.multiplier,
      772.43549 * this.multiplier,
      1028.7784 * this.multiplier,
      796.3214399999999 * this.multiplier,
      1052.6645 * this.multiplier,
      820.20741 * this.multiplier,
    );
    this.p5.bezierVertex(
      1027.0354 * this.multiplier,
      843.08469 * this.multiplier,
      1004.6119000000001 * this.multiplier,
      873.70118 * this.multiplier,
      977.0306800000001 * this.multiplier,
      891.8655699999999 * this.multiplier,
    );
    this.p5.bezierVertex(
      871.15732 * this.multiplier,
      891.8655699999999 * this.multiplier,
      765.28395 * this.multiplier,
      891.8655699999999 * this.multiplier,
      659.4105900000001 * this.multiplier,
      891.8655699999999 * this.multiplier,
    );
    this.p5.bezierVertex(
      635.52462 * this.multiplier,
      867.97952 * this.multiplier,
      611.63867 * this.multiplier,
      844.0934599999999 * this.multiplier,
      587.75269 * this.multiplier,
      820.20741 * this.multiplier,
    );
    this.p5.endShape();
  };
  BottomLeft = (state) => {
    this.p5.strokeWeight(0);
    this.p5.strokeJoin(this.p5.ROUND);
    if (state) {
      this.p5.fill(this.on);
    } else {
      this.p5.fill(this.off);
    }
    this.p5.beginShape();
    this.p5.vertex(71.501405 * this.multiplier, 831.2326 * this.multiplier);
    this.p5.bezierVertex(
      96.90960700000001 * this.multiplier,
      856.6407200000001 * this.multiplier,
      122.31781000000001 * this.multiplier,
      882.0488200000001 * this.multiplier,
      147.72601 * this.multiplier,
      907.45694 * this.multiplier,
    );
    this.p5.bezierVertex(
      147.72601 * this.multiplier,
      1097.3378 * this.multiplier,
      147.72601 * this.multiplier,
      1287.2187 * this.multiplier,
      147.72601 * this.multiplier,
      1477.0996 * this.multiplier,
    );
    this.p5.bezierVertex(
      99.95399 * this.multiplier,
      1524.8716 * this.multiplier,
      52.181972 * this.multiplier,
      1572.6436 * this.multiplier,
      4.409951500000005 * this.multiplier,
      1620.4156 * this.multiplier,
    );
    this.p5.bezierVertex(
      4.409951500000005 * this.multiplier,
      1357.3545 * this.multiplier,
      4.409951500000005 * this.multiplier,
      1094.2934 * this.multiplier,
      4.409951500000005 * this.multiplier,
      831.23233 * this.multiplier,
    );
    this.p5.bezierVertex(
      26.773683000000005 * this.multiplier,
      831.23252 * this.multiplier,
      49.138113000000004 * this.multiplier,
      831.23233 * this.multiplier,
      71.501405 * this.multiplier,
      831.23233 * this.multiplier,
    );
    this.p5.endShape();
  };
  BottomLeftX = (state) => {
    this.p5.strokeWeight(0);
    this.p5.strokeJoin(this.p5.ROUND);
    if (state) {
      this.p5.fill(this.on);
    } else {
      this.p5.fill(this.off);
    }
    this.p5.beginShape();
    this.p5.vertex(168.59925 * this.multiplier, 1470.6432 * this.multiplier);
    this.p5.bezierVertex(
      170.91774 * this.multiplier,
      1434.0172 * this.multiplier,
      164.00563000000002 * this.multiplier,
      1395.3482 * this.multiplier,
      171.95466000000002 * this.multiplier,
      1359.9684 * this.multiplier,
    );
    this.p5.bezierVertex(
      241.16226 * this.multiplier,
      1211.2845 * this.multiplier,
      310.36985000000004 * this.multiplier,
      1062.6006 * this.multiplier,
      379.57747 * this.multiplier,
      913.9167399999999 * this.multiplier,
    );
    this.p5.bezierVertex(
      412.5367 * this.multiplier,
      913.9167399999999 * this.multiplier,
      445.49595 * this.multiplier,
      913.9167399999999 * this.multiplier,
      478.45517 * this.multiplier,
      913.9167399999999 * this.multiplier,
    );
    this.p5.bezierVertex(
      476.13668 * this.multiplier,
      950.5427199999999 * this.multiplier,
      483.04879 * this.multiplier,
      989.2117599999999 * this.multiplier,
      475.09975000000003 * this.multiplier,
      1024.5915 * this.multiplier,
    );
    this.p5.bezierVertex(
      405.89208 * this.multiplier,
      1173.2754 * this.multiplier,
      336.68439 * this.multiplier,
      1321.9593 * this.multiplier,
      267.47669 * this.multiplier,
      1470.6432 * this.multiplier,
    );
    this.p5.bezierVertex(
      234.51754000000003 * this.multiplier,
      1470.6432 * this.multiplier,
      201.5584 * this.multiplier,
      1470.6432 * this.multiplier,
      168.59925 * this.multiplier,
      1470.6432 * this.multiplier,
    );
    this.p5.endShape();
  };
  BottomMiddle = (state) => {
    this.p5.strokeWeight(0);
    this.p5.strokeJoin(this.p5.ROUND);
    if (state) {
      this.p5.fill(this.on);
    } else {
      this.p5.fill(this.off);
    }
    this.p5.beginShape();
    this.p5.vertex(572.1608 * this.multiplier, 1548.7588 * this.multiplier);
    this.p5.bezierVertex(
      549.28363 * this.multiplier,
      1523.1296 * this.multiplier,
      518.66718 * this.multiplier,
      1500.7062 * this.multiplier,
      500.5029 * this.multiplier,
      1473.125 * this.multiplier,
    );
    this.p5.bezierVertex(
      500.5029 * this.multiplier,
      1284.5693 * this.multiplier,
      500.5029 * this.multiplier,
      1096.0137 * this.multiplier,
      500.5029 * this.multiplier,
      907.458 * this.multiplier,
    );
    this.p5.bezierVertex(
      524.38888 * this.multiplier,
      883.57202 * this.multiplier,
      548.27482 * this.multiplier,
      859.68607 * this.multiplier,
      572.1608 * this.multiplier,
      835.8000999999999 * this.multiplier,
    );
    this.p5.bezierVertex(
      595.03805 * this.multiplier,
      861.4291499999999 * this.multiplier,
      625.6546 * this.multiplier,
      883.85245 * this.multiplier,
      643.81896 * this.multiplier,
      911.43365 * this.multiplier,
    );
    this.p5.bezierVertex(
      643.81896 * this.multiplier,
      1099.9893 * this.multiplier,
      643.81896 * this.multiplier,
      1288.545 * this.multiplier,
      643.81896 * this.multiplier,
      1477.1006 * this.multiplier,
    );
    this.p5.bezierVertex(
      619.93291 * this.multiplier,
      1500.9867 * this.multiplier,
      596.04685 * this.multiplier,
      1524.8727 * this.multiplier,
      572.1608 * this.multiplier,
      1548.7588 * this.multiplier,
    );
    this.p5.endShape();
  };
  BottomRightX = (state) => {
    this.p5.strokeWeight(0);
    this.p5.strokeJoin(this.p5.ROUND);
    if (state) {
      this.p5.fill(this.on);
    } else {
      this.p5.fill(this.off);
    }
    this.p5.beginShape();
    this.p5.vertex(974.54971 * this.multiplier, 1470.6432 * this.multiplier);
    this.p5.bezierVertex(
      941.59594 * this.multiplier,
      1470.6432 * this.multiplier,
      908.64219 * this.multiplier,
      1470.6432 * this.multiplier,
      875.68841 * this.multiplier,
      1470.6432 * this.multiplier,
    );
    this.p5.bezierVertex(
      805.74864 * this.multiplier,
      1319.5599 * this.multiplier,
      735.8088399999999 * this.multiplier,
      1168.4767 * this.multiplier,
      665.86907 * this.multiplier,
      1017.3933999999999 * this.multiplier,
    );
    this.p5.bezierVertex(
      665.86907 * this.multiplier,
      982.90068 * this.multiplier,
      665.86907 * this.multiplier,
      948.4078999999999 * this.multiplier,
      665.86907 * this.multiplier,
      913.9151499999999 * this.multiplier,
    );
    this.p5.bezierVertex(
      698.8228399999999 * this.multiplier,
      913.9151499999999 * this.multiplier,
      731.7765899999999 * this.multiplier,
      913.9151499999999 * this.multiplier,
      764.73037 * this.multiplier,
      913.9151499999999 * this.multiplier,
    );
    this.p5.bezierVertex(
      834.67014 * this.multiplier,
      1064.9984 * this.multiplier,
      904.60994 * this.multiplier,
      1216.0817 * this.multiplier,
      974.54971 * this.multiplier,
      1367.1649 * this.multiplier,
    );
    this.p5.bezierVertex(
      974.54971 * this.multiplier,
      1401.6577 * this.multiplier,
      974.54971 * this.multiplier,
      1436.1504 * this.multiplier,
      974.54971 * this.multiplier,
      1470.6432 * this.multiplier,
    );
    this.p5.endShape();
  };
  BottomRight = (state) => {
    this.p5.strokeWeight(0);
    this.p5.strokeJoin(this.p5.ROUND);
    if (state) {
      this.p5.fill(this.on);
    } else {
      this.p5.fill(this.off);
    }
    this.p5.beginShape();
    this.p5.vertex(1072.8213 * this.multiplier, 831.2326 * this.multiplier);
    this.p5.bezierVertex(
      1093.1196 * this.multiplier,
      835.94861 * this.multiplier,
      1147.1688000000001 * this.multiplier,
      856.9424 * this.multiplier,
      1139.913 * this.multiplier,
      839.18393 * this.multiplier,
    );
    this.p5.bezierVertex(
      1139.913 * this.multiplier,
      1099.5946 * this.multiplier,
      1139.913 * this.multiplier,
      1360.0052 * this.multiplier,
      1139.913 * this.multiplier,
      1620.4159 * this.multiplier,
    );
    this.p5.bezierVertex(
      1092.1409 * this.multiplier,
      1572.6439 * this.multiplier,
      1044.3689 * this.multiplier,
      1524.8718 * this.multiplier,
      996.59691 * this.multiplier,
      1477.0998 * this.multiplier,
    );
    this.p5.bezierVertex(
      996.59691 * this.multiplier,
      1287.2188999999998 * this.multiplier,
      996.59691 * this.multiplier,
      1097.3381 * this.multiplier,
      996.59691 * this.multiplier,
      907.4572 * this.multiplier,
    );
    this.p5.bezierVertex(
      1022.005 * this.multiplier,
      882.0489699999999 * this.multiplier,
      1047.4134999999999 * this.multiplier,
      856.64096 * this.multiplier,
      1072.8213 * this.multiplier,
      831.2325999999999 * this.multiplier,
    );
    this.p5.endShape();
  };
  Bottom = (state) => {
    this.p5.strokeWeight(0);
    this.p5.strokeJoin(this.p5.ROUND);
    if (state) {
      this.p5.fill(this.on);
    } else {
      this.p5.fill(this.off);
    }
    this.p5.beginShape();
    this.p5.vertex(484.9118 * this.multiplier, 1492.6909 * this.multiplier);
    this.p5.bezierVertex(
      513.99472 * this.multiplier,
      1521.7738000000002 * this.multiplier,
      543.07761 * this.multiplier,
      1550.8567 * this.multiplier,
      572.16053 * this.multiplier,
      1579.9397000000001 * this.multiplier,
    );
    this.p5.bezierVertex(
      601.2434499999999 * this.multiplier,
      1550.8567 * this.multiplier,
      630.32635 * this.multiplier,
      1521.7738000000002 * this.multiplier,
      659.40927 * this.multiplier,
      1492.6909 * this.multiplier,
    );
    this.p5.bezierVertex(
      766.60785 * this.multiplier,
      1492.6909 * this.multiplier,
      873.80643 * this.multiplier,
      1492.6909 * this.multiplier,
      981.00501 * this.multiplier,
      1492.6909 * this.multiplier,
    );
    this.p5.bezierVertex(
      1028.777 * this.multiplier,
      1540.463 * this.multiplier,
      1076.549 * this.multiplier,
      1588.2350000000001 * this.multiplier,
      1124.3211 * this.multiplier,
      1636.007 * this.multiplier,
    );
    this.p5.bezierVertex(
      756.2133499999999 * this.multiplier,
      1636.007 * this.multiplier,
      388.10559999999987 * this.multiplier,
      1636.007 * this.multiplier,
      19.9978779999999 * this.multiplier,
      1636.007 * this.multiplier,
    );
    this.p5.bezierVertex(
      67.7698089999999 * this.multiplier,
      1588.2350000000001 * this.multiplier,
      115.5417399999999 * this.multiplier,
      1540.463 * this.multiplier,
      163.3136699999999 * this.multiplier,
      1492.6909 * this.multiplier,
    );
    this.p5.bezierVertex(
      270.5130499999999 * this.multiplier,
      1492.6909 * this.multiplier,
      377.7124199999999 * this.multiplier,
      1492.6909 * this.multiplier,
      484.9117999999999 * this.multiplier,
      1492.6909 * this.multiplier,
    );
    this.p5.endShape();
  };
}
