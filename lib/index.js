import { createRequire as w } from "module";
var m = {};
(() => {
  m.d = (e, t) => {
    for (var i in t) {
      if (m.o(t, i) && !m.o(e, i)) {
        Object.defineProperty(e, i, { enumerable: true, get: t[i] });
      }
    }
  };
})();
(() => {
  m.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
})();
var F = {};
m.d(F, {
  A: () => (
    /* binding */
    N
  )
});
;
const $ = w(import.meta.url)("node:path");
;
const n = w(import.meta.url)("node:fs");
;
const d = async (e, t, i) => {
  if (!n.existsSync(e)) {
    throw Error(`[${e}] \u6587\u4EF6\u6216\u6587\u4EF6\u5939\u4E0D\u5B58\u5728!`);
  }
  if (e === t) {
    throw Error(`\u8BE5\u6587\u4EF6\u5939\u4E0D\u80FD\u88AB\u5220\u9664!`);
  }
  const r = await n.statSync(e);
  if (r.isFile()) {
    await n.unlinkSync(e);
    return e;
  }
  if (r.isDirectory()) {
    const s = await n.readdirSync(e);
    for (let u = 0, o = s.length; u < o; u++) {
      await d(`${e}${i}${s[u]}`, t, i);
    }
    await n.rmdirSync(e);
    return e;
  }
};
const y = d;
;
const O = (e) => {
  const t = e.split(".");
  if (t.filter(Boolean).length < 2) {
    return;
  }
  const i = t.slice(0, -1).join(".");
  const [r] = t.slice(-1);
  return [i, r];
};
const _ = (e = "/", t) => {
  const i = e.split(t);
  const r = i.slice(0, -1).join(t) || "/";
  const [s] = i.slice(-1);
  return [s, r];
};
;
const E = async (e, t, i) => {
  if (!n.existsSync(e)) {
    throw Error(`[${e}] \u6587\u4EF6\u6216\u6587\u4EF6\u5939\u4E0D\u5B58\u5728!`);
  }
  const r = await n.statSync(e);
  if (r.isFile()) {
    const s = e.split(i).slice(-1)[0];
    let u = `${t}${i}${s}`;
    if (n.existsSync(u)) {
      const o = O(s);
      if (!o) {
        u = `${u}_copy_${+/* @__PURE__ */ new Date()}`;
      } else {
        const [l, f] = o;
        u = `${t}${i}${l}_copy_${+/* @__PURE__ */ new Date()}.${f}`;
      }
    }
    await n.copyFileSync(e, u);
    return u;
  }
  if (r.isDirectory()) {
    const s = e.split(i).slice(-1)[0];
    let u = `${t}${i}${s}`;
    if (n.existsSync(u)) {
      u = `${u}_copy_${+/* @__PURE__ */ new Date()}`;
    }
    await n.mkdirSync(u);
    const o = await n.readdirSync(e);
    for (let l = 0, f = o.length; l < f; l++) {
      await E(`${e}${i}${o[l]}`, u, i);
    }
    return u;
  }
};
const v = async (e, t, i, r) => {
  if (e === t) {
    return;
  }
  await E(e, t, r);
  await y(e, i, r);
};
;
const j = async (e, t = false, i, r) => {
  if (n.existsSync(e)) {
    if (!t) {
      throw Error(`[${e}] \u6587\u4EF6\u5939\u5DF2\u5B58\u5728!`);
    }
    await y(e, i, r);
  }
  await n.mkdirSync(e);
  return e;
};
const k = async (e, t = false, i = "", r, s) => {
  if (n.existsSync(e)) {
    if (i) {
      await n.writeFileSync(e, i);
      return;
    }
    if (!t) {
      throw Error(`[${e}] \u6587\u4EF6\u5DF2\u5B58\u5728!`);
    }
    await y(e, r, s);
  }
  await n.writeFileSync(e, i);
  return e;
};
;
const R = async (e, t) => {
  if (!n.existsSync(e)) {
    throw Error(`[${e}] \u6587\u4EF6\u6216\u6587\u4EF6\u5939\u4E0D\u5B58\u5728!`);
  }
  const i = await n.statSync(e);
  if (!i.isFile()) {
    throw Error(`[${e}] \u4E0D\u662F\u4E00\u4E2A\u6587\u4EF6!`);
  }
  const r = await n.readFileSync(e);
  const [s, u] = _(e, t);
  return {
    dir: u,
    filename: s,
    type: s.split(".").slice(-1)[0],
    size: i.size,
    mtime: i.mtime,
    birthtime: i.birthtime,
    data: r.toString()
  };
};
const S = async (e, t) => {
  if (!n.existsSync(e)) {
    throw Error(`[${e}] \u6587\u4EF6\u6216\u6587\u4EF6\u5939\u4E0D\u5B58\u5728!`);
  }
  const i = await n.statSync(e);
  const [r, s] = _(e, t);
  if (i.isFile()) {
    return {
      dir: s,
      filename: r,
      type: r.split(".").slice(-1)[0],
      size: i.size,
      mtime: i.mtime,
      birthtime: i.birthtime
    };
  } else if (i.isDirectory()) {
    return {
      dir: s,
      filename: r,
      type: "dir",
      size: i.size,
      mtime: i.ctime,
      birthtime: i.birthtime
    };
  }
};
const h = async (e, t) => {
  if (!n.existsSync(e)) {
    throw Error(`[${e}] \u6587\u4EF6\u5939\u4E0D\u5B58\u5728!`);
  }
  const i = await n.readdirSync(e);
  const r = [];
  for (let s = 0, u = i.length; s < u; s++) {
    try {
      const o = await S(`${e}${t}${i[s]}`, t);
      r.push(o);
    } catch (o) {
      continue;
    }
  }
  return r;
};
const x = async (e = "", t) => {
  if (!n.existsSync(e)) {
    throw Error(`[${e}] \u6587\u4EF6\u5939\u4E0D\u5B58\u5728!`);
  }
  const i = await n.readdirSync(e);
  const r = [];
  for (let s = 0, u = i.length; s < u; s++) {
    const o = `${e}${t}${i[s]}`;
    const l = await n.statSync(o);
    if (l.isFile()) {
      r.push({
        fullname: o,
        type: o.split(".").slice(-1)[0],
        size: l.size,
        mtime: l.mtime,
        birthtime: l.birthtime
      });
    } else if (l.isDirectory()) {
      r.push({
        fullname: o,
        type: "dir",
        size: l.size,
        mtime: l.mtime,
        birthtime: l.birthtime
      });
      const f = await x(o, t);
      r.push(...f);
    }
  }
  return r;
};
;
const q = async (e, t, i) => {
  if (e === t) {
    return;
  }
  if (!n.existsSync(e)) {
    throw Error(`[${e}] \u6587\u4EF6\u6216\u6587\u4EF6\u5939\u4E0D\u5B58\u5728!`);
  }
  if (n.existsSync(t)) {
    throw Error(`[${t}] \u6587\u4EF6\u6216\u6587\u4EF6\u5939\u5DF2\u5B58\u5728!`);
  }
  if (e === i) {
    throw Error(`\u8BE5\u6587\u4EF6\u5939\u4E0D\u80FD\u88AB\u91CD\u65B0\u547D\u540D!`);
  }
  await n.renameSync(e, t);
};
const P = q;
;
;
const C = (e, t) => e ? e.charAt(e.length - 1) === t ? e.slice(0, -1) : e : "";
const I = (e = "", t = "/", i) => {
  if (e.indexOf(`${t}${i}`) === 0) {
    return C(e, i);
  }
  if (e.indexOf(`..${i}`) !== -1) {
    throw Error("\u4E0D\u652F\u6301\u76F8\u5BF9\u8DEF\u5F84\uFF01");
  }
  return $.resolve(t, `${e.indexOf(i) === 0 ? "." : `.${i}`}${e}`);
};
const K = I;
;
const L = (e) => {
  const t = $.sep;
  const i = e?.rootpath ?? e ?? "/";
  const r = (c) => K(c, i, t);
  const s = (c, a) => E(r(c), r(a), t);
  const u = (c, a) => v(r(c), r(a), i, t);
  const o = (c, a) => j(r(c), a, i, t);
  const l = (c, a, g) => k(r(c), a, g, i, t);
  const f = (c) => R(r(c), t);
  const D = (c) => S(r(c), t);
  const b = (c) => h(r(c), t);
  const B = (c) => x(r(c), t);
  const A = (c) => y(r(c), i, t);
  const z = (c, a) => P(r(c), r(a), i);
  return { copyfile: s, movefile: u, mkdir: o, touch: l, openfile: f, readfile: D, readdir: b, readAllFile: B, rmfile: A, rnfile: z };
};
const N = L;
var T = F.A;
export {
  T as default
};
