# 🚀 密码保护功能 - 快速开始

## 立即使用（3步）

### 步骤 1：生成密码哈希

1. 启动 Hugo 服务器：`hugo server`
2. 访问：`http://localhost:1313/password-generator.html`
3. 输入密码（例如：`mypassword123`）
4. 点击"生成哈希值"
5. 复制生成的哈希值

### 步骤 2：添加到文章

在文章的 front matter 中添加：

```yaml
---
title: "我的私密文章"
passwordHash: "复制的哈希值"
passwordHint: "密码提示（可选）"
---
```

### 步骤 3：完成！

保存文件，访问文章时会自动显示密码输入框。

## 📋 完整示例

```yaml
---
title: "🔒 会员专享内容"
date: 2025-01-01
draft: false
tags: ["会员", "专享"]
categories: ["VIP"]
summary: "这是会员专享内容，需要密码才能查看。"
passwordHash: "1234567890"  # 使用工具生成
passwordHint: "提示：我的生日（8位数字）"
---

这里是受保护的内容...
```

## ✨ 功能特点

- ✅ **自动记忆**：验证成功后，浏览器会记住解锁状态
- ✅ **美观界面**：现代化设计，完美适配深色/浅色主题
- ✅ **密码提示**：可设置提示信息帮助用户回忆
- ✅ **列表标识**：文章列表页显示 🔒 图标

## 🧪 测试功能

1. 查看示例文章：`content/posts/password-protected-example.md`
2. 查看测试文章：`content/posts/test-password.md`
3. 使用密码生成器生成测试密码

## 🔧 清除解锁状态

在浏览器控制台执行：

```javascript
clearUnlockedContent()
```

## ⚠️ 重要提示

这是**客户端轻度保护**，适合：
- ✅ 防止普通访客浏览
- ✅ 保护个人隐私内容
- ✅ 会员专享内容展示

**不适合**高度敏感信息！

## 📚 更多信息

- 详细文档：`docs/password-protect-guide.md`
- 密码生成器：`/password-generator.html`

---

**开始使用**：访问 `/password-generator.html` 生成您的第一个密码！

