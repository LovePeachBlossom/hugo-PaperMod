# 🔐 密码保护功能 - 快速使用指南

## ✅ 功能已就绪！

您的博客现在已支持密码保护功能。可以为任何文章添加密码保护，访客需要输入正确密码才能查看内容。

## 🚀 三步快速使用

### 1️⃣ 生成密码哈希

访问：`http://localhost:1313/password-generator.html`（本地开发）
或：`https://wf0904.cn/password-generator.html`（生产环境）

输入密码 → 点击生成 → 复制哈希值

### 2️⃣ 添加到文章

在文章的 front matter 中添加：

```yaml
---
title: "我的私密文章"
date: 2025-01-01
passwordHash: "生成的哈希值"
passwordHint: "密码提示（可选）"
---
```

### 3️⃣ 完成！

保存文件，访问文章时会自动显示密码输入框。

## 📝 示例

查看示例文章：`content/posts/password-protected-example.md`

## 🎯 功能特点

- ✅ 每篇文章独立密码
- ✅ 自动记住解锁状态
- ✅ 美观的密码输入界面
- ✅ 支持密码提示
- ✅ 列表页显示 🔒 标识
- ✅ 完美适配深色/浅色主题

## 📚 详细文档

查看完整使用指南：`docs/password-protect-guide.md`

## ⚠️ 重要提示

这是**客户端轻度保护**，适合：
- 防止普通访客浏览
- 保护个人隐私内容
- 会员专享内容

**不适合**高度敏感信息！

---

**开始使用**：访问 `/password-generator.html` 生成您的第一个密码哈希！

