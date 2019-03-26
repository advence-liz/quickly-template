# qt demo

- `_template`为模板存放的位置，DMEO中两个模板`page`和`component`
- `pages` page的存放目录
- `components` component的存放目录
- `qt.config.js` 配置文件主要就配置了`root`参加即查找模板的位置

## 命令示意

- `$ qt new page test` 就会在当前目录创建一个名为test 的模块，并且配置可以简写即`$ qt new p test`,`$ qt new pa test` 同样有效

- `$ qt new page test pages`同时也可以指定输出模块的位置，这样`test`将创建在`pages`目录内
