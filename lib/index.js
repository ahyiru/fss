import { createRequire as __WEBPACK_EXTERNAL_createRequire } from "module";
var __webpack_require__ = {};
(() => {
  __webpack_require__.d = (exports, definition) => {
    for (var key in definition) {
      if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
        Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
      }
    }
  };
})();
(() => {
  __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
})();
var __webpack_exports__ = {};
__webpack_require__.d(__webpack_exports__, {
  Z: () => (
    /* binding */
    fs
  )
});
;
const external_node_path_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:path");
;
const external_node_fs_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:fs");
;
const rmfile = async (path, rootpath, sep) => {
  if (!external_node_fs_namespaceObject.existsSync(path)) {
    throw Error(`[${path}] \u6587\u4EF6\u6216\u6587\u4EF6\u5939\u4E0D\u5B58\u5728!`);
  }
  if (path === rootpath) {
    throw Error(`\u8BE5\u6587\u4EF6\u5939\u4E0D\u80FD\u88AB\u5220\u9664!`);
  }
  const stats = await external_node_fs_namespaceObject.statSync(path);
  if (stats.isFile()) {
    await external_node_fs_namespaceObject.unlinkSync(path);
    return path;
  }
  if (stats.isDirectory()) {
    const files = await external_node_fs_namespaceObject.readdirSync(path);
    for (let i = 0, l = files.length; i < l; i++) {
      await rmfile(`${path}${sep}${files[i]}`, rootpath, sep);
    }
    await external_node_fs_namespaceObject.rmdirSync(path);
    return path;
  }
};
const fs_rmfile = rmfile;
;
const getExt = (filename) => {
  const arr = filename.split(".");
  if (arr.filter(Boolean).length < 2) {
    return;
  }
  const name = arr.slice(0, -1).join(".");
  const [ext] = arr.slice(-1);
  return [name, ext];
};
const getFilename = (path = "/", sep) => {
  const pathArr = path.split(sep);
  const dir = pathArr.slice(0, -1).join(sep) || "/";
  const [filename] = pathArr.slice(-1);
  return [filename, dir];
};
;
const copyfile_copyfile = async (src, dst, sep) => {
  if (!external_node_fs_namespaceObject.existsSync(src)) {
    throw Error(`[${src}] \u6587\u4EF6\u6216\u6587\u4EF6\u5939\u4E0D\u5B58\u5728!`);
  }
  const stats = await external_node_fs_namespaceObject.statSync(src);
  if (stats.isFile()) {
    const filename = src.split(sep).slice(-1)[0];
    let dstfile = `${dst}${sep}${filename}`;
    if (external_node_fs_namespaceObject.existsSync(dstfile)) {
      const extname = getExt(filename);
      if (!extname) {
        dstfile = `${dstfile}_copy_${+/* @__PURE__ */ new Date()}`;
      } else {
        const [name, ext] = extname;
        dstfile = `${dst}${sep}${name}_copy_${+/* @__PURE__ */ new Date()}.${ext}`;
      }
    }
    await external_node_fs_namespaceObject.copyFileSync(src, dstfile);
    return dstfile;
  }
  if (stats.isDirectory()) {
    const filename = src.split(sep).slice(-1)[0];
    let dstfile = `${dst}${sep}${filename}`;
    if (external_node_fs_namespaceObject.existsSync(dstfile)) {
      dstfile = `${dstfile}_copy_${+/* @__PURE__ */ new Date()}`;
    }
    await external_node_fs_namespaceObject.mkdirSync(dstfile);
    const files = await external_node_fs_namespaceObject.readdirSync(src);
    for (let i = 0, l = files.length; i < l; i++) {
      await copyfile_copyfile(`${src}${sep}${files[i]}`, dstfile, sep);
    }
    return dstfile;
  }
};
const copyfile_movefile = async (src, dst, rootpath, sep) => {
  if (src === dst) {
    return;
  }
  await copyfile_copyfile(src, dst, sep);
  await fs_rmfile(src, rootpath, sep);
};
;
const createfile_mkdir = async (path, override = false, rootpath, sep) => {
  if (external_node_fs_namespaceObject.existsSync(path)) {
    if (!override) {
      throw Error(`[${path}] \u6587\u4EF6\u5939\u5DF2\u5B58\u5728!`);
    }
    await fs_rmfile(path, rootpath, sep);
  }
  await external_node_fs_namespaceObject.mkdirSync(path);
  return path;
};
const createfile_touch = async (path, override = false, data = "", rootpath, sep) => {
  if (external_node_fs_namespaceObject.existsSync(path)) {
    if (data) {
      await external_node_fs_namespaceObject.writeFileSync(path, data);
      return;
    }
    if (!override) {
      throw Error(`[${path}] \u6587\u4EF6\u5DF2\u5B58\u5728!`);
    }
    await fs_rmfile(path, rootpath, sep);
  }
  await external_node_fs_namespaceObject.writeFileSync(path, data);
  return path;
};
;
const readfile_openfile = async (path, sep) => {
  if (!external_node_fs_namespaceObject.existsSync(path)) {
    throw Error(`[${path}] \u6587\u4EF6\u6216\u6587\u4EF6\u5939\u4E0D\u5B58\u5728!`);
  }
  const stats = await external_node_fs_namespaceObject.statSync(path);
  if (!stats.isFile()) {
    throw Error(`[${path}] \u4E0D\u662F\u4E00\u4E2A\u6587\u4EF6!`);
  }
  const data = await external_node_fs_namespaceObject.readFileSync(path);
  const [filename, dir] = getFilename(path, sep);
  return {
    dir,
    filename,
    type: filename.split(".").slice(-1)[0],
    size: stats.size,
    mtime: stats.mtime,
    birthtime: stats.birthtime,
    data: data.toString()
  };
};
const readfile_readfile = async (path, sep) => {
  if (!external_node_fs_namespaceObject.existsSync(path)) {
    throw Error(`[${path}] \u6587\u4EF6\u6216\u6587\u4EF6\u5939\u4E0D\u5B58\u5728!`);
  }
  const stats = await external_node_fs_namespaceObject.statSync(path);
  const [filename, dir] = getFilename(path, sep);
  if (stats.isFile()) {
    return {
      dir,
      filename,
      type: filename.split(".").slice(-1)[0],
      size: stats.size,
      mtime: stats.mtime,
      birthtime: stats.birthtime
    };
  } else if (stats.isDirectory()) {
    return {
      dir,
      filename,
      type: "dir",
      size: stats.size,
      mtime: stats.ctime,
      birthtime: stats.birthtime
    };
  }
};
const readfile_readdir = async (path, sep) => {
  if (!external_node_fs_namespaceObject.existsSync(path)) {
    throw Error(`[${path}] \u6587\u4EF6\u5939\u4E0D\u5B58\u5728!`);
  }
  const files = await external_node_fs_namespaceObject.readdirSync(path);
  const result = [];
  for (let i = 0, l = files.length; i < l; i++) {
    try {
      const fileInfo = await readfile_readfile(`${path}${sep}${files[i]}`, sep);
      result.push(fileInfo);
    } catch (err) {
      continue;
    }
  }
  return result;
};
const readfile_readAllFile = async (path = "", sep) => {
  if (!external_node_fs_namespaceObject.existsSync(path)) {
    throw Error(`[${path}] \u6587\u4EF6\u5939\u4E0D\u5B58\u5728!`);
  }
  const files = await external_node_fs_namespaceObject.readdirSync(path);
  const result = [];
  for (let i = 0, l = files.length; i < l; i++) {
    const fullname = `${path}${sep}${files[i]}`;
    const stats = await external_node_fs_namespaceObject.statSync(fullname);
    if (stats.isFile()) {
      result.push({
        fullname,
        type: fullname.split(".").slice(-1)[0],
        size: stats.size,
        mtime: stats.mtime,
        birthtime: stats.birthtime
      });
    } else if (stats.isDirectory()) {
      result.push({
        fullname,
        type: "dir",
        size: stats.size,
        mtime: stats.mtime,
        birthtime: stats.birthtime
      });
      const children = await readfile_readAllFile(fullname, sep);
      result.push(...children);
    }
  }
  return result;
};
;
const rnfile = async (path, newpath, rootpath) => {
  if (path === newpath) {
    return;
  }
  if (!external_node_fs_namespaceObject.existsSync(path)) {
    throw Error(`[${path}] \u6587\u4EF6\u6216\u6587\u4EF6\u5939\u4E0D\u5B58\u5728!`);
  }
  if (external_node_fs_namespaceObject.existsSync(newpath)) {
    throw Error(`[${newpath}] \u6587\u4EF6\u6216\u6587\u4EF6\u5939\u5DF2\u5B58\u5728!`);
  }
  if (path === rootpath) {
    throw Error(`\u8BE5\u6587\u4EF6\u5939\u4E0D\u80FD\u88AB\u91CD\u65B0\u547D\u540D!`);
  }
  await external_node_fs_namespaceObject.renameSync(path, newpath);
};
const fs_rnfile = rnfile;
;
;
const fixRoute = (path2, sep) => path2 ? path2.charAt(path2.length - 1) === sep ? path2.slice(0, -1) : path2 : "";
const fixpath = (route = "", rootpath = "/", sep) => {
  if (route.indexOf(`${rootpath}${sep}`) === 0) {
    return fixRoute(route, sep);
  }
  if (route.indexOf(`..${sep}`) !== -1) {
    throw Error("\u4E0D\u652F\u6301\u76F8\u5BF9\u8DEF\u5F84\uFF01");
  }
  return external_node_path_namespaceObject.resolve(rootpath, `${route.indexOf(sep) === 0 ? "." : `.${sep}`}${route}`);
};
const fs_fixpath = fixpath;
;
const fss = (configs) => {
  const sep = external_node_path_namespaceObject.sep;
  const rootpath = configs?.rootpath ?? configs ?? "/";
  const fixedpath = (route) => fs_fixpath(route, rootpath, sep);
  const copyfile = (src, dst) => copyfile_copyfile(fixedpath(src), fixedpath(dst), sep);
  const movefile = (src, dst) => copyfile_movefile(fixedpath(src), fixedpath(dst), rootpath, sep);
  const mkdir = (path2, override) => createfile_mkdir(fixedpath(path2), override, rootpath, sep);
  const touch = (path2, override, data) => createfile_touch(fixedpath(path2), override, data, rootpath, sep);
  const openfile = (path2) => readfile_openfile(fixedpath(path2), sep);
  const readfile = (path2) => readfile_readfile(fixedpath(path2), sep);
  const readdir = (path2) => readfile_readdir(fixedpath(path2), sep);
  const readAllFile = (path2) => readfile_readAllFile(fixedpath(path2), sep);
  const rmfile2 = (path2) => fs_rmfile(fixedpath(path2), rootpath, sep);
  const rnfile2 = (path2, newpath) => fs_rnfile(fixedpath(path2), fixedpath(newpath), rootpath);
  return { copyfile, movefile, mkdir, touch, openfile, readfile, readdir, readAllFile, rmfile: rmfile2, rnfile: rnfile2 };
};
const fs = fss;
var __webpack_exports__default = __webpack_exports__.Z;
export {
  __webpack_exports__default as default
};
