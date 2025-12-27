# 图标文件说明

## 需要的图标文件

如果您想使用自定义图标，请将以下文件添加到 `static/` 目录：

### 必需文件（可选）
- `apple-touch-icon.png` - Apple 设备图标（180x180 像素）
- `favicon.ico` - 网站图标（16x16 或 32x32 像素）
- `favicon-16x16.png` - 16x16 图标
- `favicon-32x32.png` - 32x32 图标
- `safari-pinned-tab.svg` - Safari 固定标签图标

## 如何添加图标

1. **准备图标文件**：
   - 使用在线工具生成：https://realfavicongenerator.net/
   - 或使用设计软件创建

2. **放置文件**：
   - 将所有图标文件放到 `static/` 目录

3. **更新配置**：
   - 在 `hugo.yaml` 中取消注释相关配置

## 当前状态

目前图标配置已注释，不会产生 404 错误。您可以：
- 保持现状（使用浏览器默认图标）
- 或添加自定义图标文件

