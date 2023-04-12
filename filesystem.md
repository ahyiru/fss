## 文件管理系统

基于 `node.js` 的 `fs` 模块搭建可视化文件管理系统。实现文件（夹）的增删改查功能。

![update1](./update1.png)

### 使用

安装：

```
npm i @huxy/fss
```

使用：

```javascript
import fss from '@huxy/fss';
import configs from './configs/index.js';

const {rootpath, MAXSIZE} = configs;

const apis = fss(rootpath);
```

指定根目录 `rootpath`，默认为 `'/'` 。

### api 示例

#### 读取文件夹

`readdir(path)`

返回当前目录下的文件信息。

```javascript
export const readdir = async (req, res) => {
  const {path} = req.body;
  try {
    const result = await apis.readdir(path);
    res.status(200).send({result});
  } catch (error) {
    res.status(500).send({message: error.message});
  }
};
```

![diraction](./diraction.png)

#### 获取文件信息

`readfile(path)`

```javascript
export const readfile = async (req, res) => {
  const {path} = req.body;
  try {
    const result = await apis.readfile(path);
    res.status(200).send({result});
  } catch (error) {
    res.status(500).send({message: error.message});
  }
};
```

![detail](./detail.png)

#### 读取文件内容

`openfile(path)`

```javascript
export const openfile = async (req, res) => {
  const {path} = req.body;
  try {
    const result = await apis.openfile(path);
    res.status(200).send({result});
  } catch (error) {
    res.status(500).send({message: error.message});
  }
};
```

![update](./update.png)

#### 新建文件夹

`mkdir(path, override)`

```javascript
export const mkdir = async (req, res) => {
  const {path, override} = req.body;
  try {
    await apis.mkdir(path, override);
    res.status(200).send({message: '操作成功！'});
  } catch (error) {
    res.status(500).send({message: error.message});
  }
};
```

![adddir](./adddir.png)

#### 新建文件

`touch(path, override, data)`

```javascript
export const touch = async (req, res) => {
  const {path, override, data} = req.body;
  try {
    await apis.touch(path, override, data);
    res.status(200).send({message: '操作成功！'});
  } catch (error) {
    res.status(500).send({message: error.message});
  }
};
```

![addfile](./addfile.png)

#### 拷贝文件（夹）

`copyfile(src, dst)`

```javascript
export const copyfile = async (req, res) => {
  const {src, dst} = req.body;
  try {
    await apis.copyfile(src, dst);
    res.status(200).send({message: '操作成功！'});
  } catch (error) {
    res.status(500).send({message: error.message});
  }
};
```

![fileaction](./fileaction.png)

#### 移动文件（夹）

`movefile(src, dst)`

```javascript
export const movefile = async (req, res) => {
  const {src, dst} = req.body;
  try {
    await apis.movefile(src, dst);
    res.status(200).send({message: '操作成功！'});
  } catch (error) {
    res.status(500).send({message: error.message});
  }
};
```

![move](./move.png)

#### 删除文件（夹）

`rmfile(path)`

```javascript
export const rmfile = async (req, res) => {
  const {path} = req.body;
  try {
    await apis.rmfile(path);
    res.status(200).send({message: '操作成功！'});
  } catch (error) {
    res.status(500).send({message: error.message});
  }
};
```

![delete](./delete.png)

#### 重命名文件（夹）

`rnfile(path, newpath)`

```javascript
export const rnfile = async (req, res) => {
  const {path, newpath} = req.body;
  try {
    await apis.rnfile(path, newpath);
    res.status(200).send({message: '操作成功！'});
  } catch (error) {
    res.status(500).send({message: error.message});
  }
};
```

![rename](./rename.png)