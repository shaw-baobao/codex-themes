[English](./README.md) | 简体中文

# Codex Themes

为 Codex App 提供可直接导入的精选主题。

每个主题目录包含：

- `theme.json`：主题源定义
- `preview.svg`：生成的预览图
- `import.txt`：生成的导入串

## 安装主题

1. 打开 [`themes/`](./themes) 下的任意主题目录。
2. 复制其中 `import.txt` 的内容。
3. 在 Codex App 里按导入主题的流程粘贴进去。

如果以后 Codex 的导入格式变了，仍然只需要维护 `theme.json`，再更新脚本重新生成即可。

注意：`codeThemeId` 不是随便写的，必须和 Codex 内置代码主题 id 一致，比如 `tokyo-night`、`one-dark`、`nord`、`dracula`、`catppuccin`、`gruvbox`、`solarized`、`github-light`。

## 在 Codex App 中导入

使用目标主题目录下生成好的 `import.txt` 文件。

1. 打开 Codex App 的 `Settings > Appearance`
2. 浅色主题导入到 `Light theme` 区域
3. 深色主题导入到 `Dark theme` 区域
4. 打开本仓库里对应主题的 `import.txt`
5. 复制整行内容，必须从 `codex-theme-v1:` 开始
6. 粘贴到导入弹窗
7. 确认导入

示例：

- [`themes/tokyo-night/import.txt`](./themes/tokyo-night/import.txt)
- [`themes/github-light/import.txt`](./themes/github-light/import.txt)
- [`themes/catppuccin-mocha/import.txt`](./themes/catppuccin-mocha/import.txt)

常见导入失败原因：

- 只复制了 JSON，没有复制 `codex-theme-v1:` 前缀
- 粘贴时带了多余空格或换行
- 把深色主题导入到浅色槽位，或反过来
- 使用了 Codex App 不支持的 `codeThemeId`

## 仓库结构

```text
codex-themes/
├── README.md
├── README.zh-CN.md
├── CONTRIBUTING.md
├── LICENSE
├── package.json
├── docs/
│   └── schema.md
├── schemas/
│   └── theme.schema.json
├── scripts/
│   ├── build-imports.js
│   ├── build.js
│   ├── generate-index.js
│   ├── generate-previews.js
│   ├── generate-readme.js
│   ├── validate.js
│   └── lib/
│       └── theme-utils.js
├── themes/
│   ├── github-light/
│   │   ├── README.md
│   │   ├── import.txt
│   │   ├── preview.svg
│   │   └── theme.json
│   ├── index.json
│   └── tokyo-night/
│       ├── README.md
│       ├── import.txt
│       ├── preview.svg
│       └── theme.json
└── .github/
    └── workflows/
        └── ci.yml
```

## 常用命令

```sh
npm run validate
npm run build
```

`npm run validate` 会检查：

- 必填字段
- slug 一致性
- 主题类型和模式
- 基础颜色格式

`npm run build` 会：

- 重新生成 `themes/*/preview.svg`
- 重新生成 `themes/*/import.txt`
- 重新生成 `themes/index.json`
- 刷新中英文 README 里的主题表格

## 主题列表

<!-- themes:start -->
| 主题 | 模式 | 预览 | 导入 | 标签 |
| --- | --- | --- | --- | --- |
| [Ayu Dark](./themes/ayu-dark/README.md) | 深色 | ![Ayu Dark](./themes/ayu-dark/preview.svg) | [import.txt](./themes/ayu-dark/import.txt) | dark, warm, ayu |
| [Catppuccin Mocha](./themes/catppuccin-mocha/README.md) | 深色 | ![Catppuccin Mocha](./themes/catppuccin-mocha/preview.svg) | [import.txt](./themes/catppuccin-mocha/import.txt) | dark, pastel, mocha |
| [Codex Dark](./themes/codex-dark/README.md) | 深色 | ![Codex Dark](./themes/codex-dark/preview.svg) | [import.txt](./themes/codex-dark/import.txt) | dark, default, codex |
| [Dracula](./themes/dracula/README.md) | 深色 | ![Dracula](./themes/dracula/preview.svg) | [import.txt](./themes/dracula/import.txt) | dark, purple, neon |
| [Everforest Dark](./themes/everforest-dark/README.md) | 深色 | ![Everforest Dark](./themes/everforest-dark/preview.svg) | [import.txt](./themes/everforest-dark/import.txt) | dark, forest, muted |
| [GitHub Dark](./themes/github-dark/README.md) | 深色 | ![GitHub Dark](./themes/github-dark/preview.svg) | [import.txt](./themes/github-dark/import.txt) | dark, github, clean |
| [GitHub Light](./themes/github-light/README.md) | 浅色 | ![GitHub Light](./themes/github-light/preview.svg) | [import.txt](./themes/github-light/import.txt) | light, clean, github |
| [Gruvbox Dark](./themes/gruvbox-dark/README.md) | 深色 | ![Gruvbox Dark](./themes/gruvbox-dark/preview.svg) | [import.txt](./themes/gruvbox-dark/import.txt) | dark, warm, retro |
| [Material Ocean](./themes/material-ocean/README.md) | 深色 | ![Material Ocean](./themes/material-ocean/preview.svg) | [import.txt](./themes/material-ocean/import.txt) | dark, material, ocean |
| [Monokai](./themes/monokai/README.md) | 深色 | ![Monokai](./themes/monokai/preview.svg) | [import.txt](./themes/monokai/import.txt) | dark, classic, monokai |
| [Night Owl](./themes/night-owl/README.md) | 深色 | ![Night Owl](./themes/night-owl/preview.svg) | [import.txt](./themes/night-owl/import.txt) | dark, owl, blue |
| [Nord](./themes/nord/README.md) | 深色 | ![Nord](./themes/nord/preview.svg) | [import.txt](./themes/nord/import.txt) | dark, arctic, calm |
| [One Dark](./themes/one-dark/README.md) | 深色 | ![One Dark](./themes/one-dark/preview.svg) | [import.txt](./themes/one-dark/import.txt) | dark, modern, balanced |
| [Poimandres](./themes/poimandres/README.md) | 深色 | ![Poimandres](./themes/poimandres/preview.svg) | [import.txt](./themes/poimandres/import.txt) | dark, poimandres, soft |
| [Rosé Pine](./themes/rose-pine/README.md) | 深色 | ![Rosé Pine](./themes/rose-pine/preview.svg) | [import.txt](./themes/rose-pine/import.txt) | dark, rose-pine, soft |
| [Solarized Light](./themes/solarized-light/README.md) | 浅色 | ![Solarized Light](./themes/solarized-light/preview.svg) | [import.txt](./themes/solarized-light/import.txt) | light, classic, muted |
| [Tokyo Night](./themes/tokyo-night/README.md) | 深色 | ![Tokyo Night](./themes/tokyo-night/preview.svg) | [import.txt](./themes/tokyo-night/import.txt) | dark, blue, popular |
<!-- themes:end -->

## 主题 Schema

每个主题都只维护一个可读的源文件：

```json
{
  "name": "Tokyo Night",
  "slug": "tokyo-night",
  "author": "enkia / Codex Themes",
  "type": "app",
  "mode": "dark",
  "tags": ["dark", "blue", "popular"],
  "description": "Tokyo Night adapted for Codex App with a soft blue accent.",
  "codeThemeId": "tokyo-night",
  "theme": {
    "accent": "#7aa2f7",
    "background": "#1a1b26",
    "foreground": "#c0caf5",
    "surface": "#24283b",
    "contrast": 52,
    "fonts": {
      "ui": "SF Pro Text",
      "code": "SF Mono"
    }
  }
}
```

生成出来的 `preview.svg` 和 `import.txt` 都不应该手改。

完整字段说明见 [`docs/schema.md`](./docs/schema.md) 和 [`schemas/theme.schema.json`](./schemas/theme.schema.json)。

生成后的导入串和 Codex App 导入结构的映射关系如下：

- `mode` 会导出为顶层 `variant`
- `theme.foreground` 会导出为 `theme.ink`
- `theme.surface` 会导出为 `theme.surface`
- `theme.background` 只用于预览图生成
- `theme.opaqueWindows` 省略时默认是 `false`
- `theme.semanticColors` 省略时会自动补安全默认值

## 贡献流程

1. 在 `themes/<slug>/` 下新增主题目录
2. 添加 `theme.json`
3. 运行 `npm run build`
4. 提交 Pull Request

详细说明见 [`CONTRIBUTING.md`](./CONTRIBUTING.md)。
