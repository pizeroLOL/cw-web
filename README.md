# 非官方 Class Widgets 首页

闲得没事搓个 qwik 网页玩玩。

## Todo

- [ ] fluent design ui
- [ ] 首页
- [ ] 完成使用 qwik 的链接
- [ ] 想办法在 qwik 中在一个文件夹下展示markdown 文件
- [ ] 升级 eslint
- [ ] 升级 tailwind
- [ ] 准备升级 qwik

## 梗图贡献流程

1. 确认你有安装 `git lfs`
2. fork 本仓库
3. 在 `pulic/meme-img/` 文件夹添加你的图片
4. 在 `src/routes/meme/data.json` 中添加数据，时间填时间，类型填 img，data 填图片地址（`public/meme-img/a.jpg` 填 `/meme-img/a.jpg`），标题填标题
5. 打开 pull request

## 添加集成

```shell
pnpm run qwik add
```

## 开发

[Vite's development server](https://vitejs.dev/)

```shell
pnpm start
```

> Note: during dev mode, Vite may request a significant number of `.js` files. This does not represent a Qwik production build.

## 预览

```shell
pnpm run preview
```

## Production

The production build will generate client and server modules by running both client and server build commands. The build command will use Typescript to run a type check on the source code.

```shell
pnpm run build
```

## 生成静态网页

```shell
pnpm run build.server
```

## 使用的依赖

- class widgets icon
- @fluentui/svg-icons
- qwik
- github api
- 以及前端相关工具链
