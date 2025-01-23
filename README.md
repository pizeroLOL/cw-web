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
