# qt demo

- `_template`为模板存放的位置你可以添加任意规模的模板
- `qt.config.js` 配置文件主要就配置了`root`参数即查找模板的位置

## 命令概览

`$ qt new <template> <name> [target]`

- `$ qt new page new-page` 以`page`为模板创建一下新模块`new-page`并输出到当前目录
- `$ qt new pa new-page` 同样是以`page`为模板创建一下新模块`new-page`并输出到当前目录，因为`template`支持简写形式，简写只要满足`startsWith`就会认为其相等的
- `$ qt new page new-page pages` 以`page`为模板创建一下新模块`new-page`并输出到`pages`目录
