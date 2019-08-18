# quickly-template

一个根据已有模板快速生成新的模块的命令行工具，为了解决开发中手动复制粘贴的问题，并且模板是可以动态的添加和设置，
可以满足目前常见的模式`rudux` 小程序 `react` `vue` 都可以。

## 安装

`$ npm i quickly-template -g`

## 命令概览

`$ qt new <template> <name> [target]`

- `$ qt new page new-page` 以`page`为模板创建一下新模块`new-page`并输出到当前目录
- `$ qt new pa new-page` 同样是以`page`为模板创建一下新模块`new-page`并输出到当前目录，因为`template`支持简写形式，简写只要满足`startsWith`就会认为其相等的
- `$ qt new page new-page pages` 以`page`为模板创建一下新模块`new-page`并输出到`pages`目录

## 用法详见`/example/`

## 模板使用[art-tempate](https://github.com/aui/art-template)编译

### 编译前

```jsx
class page {
    'hi, {{name}}'
     'hi, {{name|pascal}}'
}
```

### 编译后

```jsx
class page {
    'hi, newPage.'
    'hi, NewPage.'
}
```

## 向art-template 传入数据源

目前只提供一种方式像模板传入数据源，即编辑`qt.config.js`,如下面的例子就是向`page`模板传入数据源`{v:1}`此外数据默认会包含name属性，所以最终传入的数据源为`{v:1,name:xxx}`

```js
module.exports = {
    root: '_template',
    filter: {
        page: { v: 1 }
    }
}

```

## 默认支持的 art-template filter

除了pascal是我写的其他都是引用lodash的,具体用法参见lodash

- pascal
- camelCase
- capitalize
- lowerCase
- lowerFirst
- startCase
- toLower
- toUpper
- trim
- trimEnd
- trimStart
- escape
- unescape
- upperCase
- upperFirst

## 针对具体模板文件的特殊配置

假设有模板文件名为`some-file[target=page][rename=false]`相当于对此模板文件配置`target`和`rename`参数，并且优先级高于命令行传入的参数，目前支持这俩个配置

### rename 用法例子

#### 模板目录结构

+ some-template
  - page.js
  - page.jsx
  + stroes
    - store[rename=false].js
    - server[rename=false].js

#### 执行`$qt new some-template newPage --rename`生成

+ newPage
  - newPage.js
  - newPage.jsx
  + stroes
    - store.js
    - server.js

### target 用法例子

指定模板文件输出到不同的目录下

#### 模板目录结构

+ some-tempalte
  - action[target=action].js
  - reducer[target=reducer].js
  - index.js

#### 执行`$qt new some-tempalte newPage`生成

+ some-tempalte
  + action
    - action.js
  + reducer
    - reducer.js
  - index.js

## API

```
usage: qt new <template> <name> [target]

选项：
  --version     显示版本号                       [布尔]
  --config      配置文件所在位置
  --root        模板所在根目录,相对目录,基于context来获取root的绝对路径，默认值"_template"[字符串] [默认值: "_template"]
  --context     qt.config.js文件所在目录 > 优先级package.json所在目录 >process.cwd()                  [字符串]
  --target      新生成模块的输出路径，相对process.cwd(),默认"." [字符串] [默认值: "."]
  --template    当前使用的模板，模板可选范围即root下面指定的模板，支持简写即当前有模板page那么p,pa,pag等效             [字符串]
  --name        新生成模块的名称               [字符串]
  --rename, -r  为了兼容微信小程序的形式新生成的模块目录下面的文件名字是否全部改变为跟新模块一致 [布尔] [默认值: false]
  --help, -h    显示帮助信息                     [布尔]
  ```