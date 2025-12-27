/**
 * 密码保护功能
 * 支持按文章或分类设置密码
 */

(function() {
    'use strict';

    // 密码验证函数（使用简单的哈希，仅用于客户端轻度保护）
    function hashPassword(password) {
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash.toString();
    }

    // 检查密码是否正确
    function verifyPassword(inputPassword, correctHash) {
        return hashPassword(inputPassword) === correctHash;
    }

    // 从localStorage获取已解锁的文章/分类
    function getUnlockedItems() {
        try {
            const stored = localStorage.getItem('unlockedContent');
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            return [];
        }
    }

    // 保存已解锁的文章/分类到localStorage
    function saveUnlockedItem(itemId) {
        const unlocked = getUnlockedItems();
        if (!unlocked.includes(itemId)) {
            unlocked.push(itemId);
            localStorage.setItem('unlockedContent', JSON.stringify(unlocked));
        }
    }

    // 检查是否已解锁
    function isUnlocked(itemId) {
        return getUnlockedItems().includes(itemId);
    }

    // 显示密码输入框
    function showPasswordForm(container, itemId, passwordHash, hint) {
        const formHTML = `
            <div class="password-protect-container">
                <div class="password-protect-box">
                    <div class="password-protect-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                    </div>
                    <h3 class="password-protect-title">🔒 此内容受密码保护</h3>
                    ${hint ? `<p class="password-protect-hint">💡 提示：${hint}</p>` : '<p class="password-protect-hint">请输入密码以查看内容</p>'}
                    <form class="password-protect-form" onsubmit="return false;">
                        <input 
                            type="password" 
                            class="password-protect-input" 
                            placeholder="请输入密码" 
                            autocomplete="off"
                            required
                            aria-label="密码输入框"
                        />
                        <button type="submit" class="password-protect-button">解锁内容</button>
                    </form>
                    <p class="password-protect-error" style="display: none;" role="alert"></p>
                </div>
            </div>
        `;
        
        container.innerHTML = formHTML;
        
        const form = container.querySelector('.password-protect-form');
        const input = container.querySelector('.password-protect-input');
        const errorMsg = container.querySelector('.password-protect-error');
        const button = container.querySelector('.password-protect-button');

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const password = input.value.trim();
            
            if (!password) {
                showError('请输入密码');
                return;
            }

            button.disabled = true;
            button.textContent = '验证中...';

            // 模拟验证延迟（防止暴力破解）
            setTimeout(() => {
                if (verifyPassword(password, passwordHash)) {
                    // 密码正确
                    button.textContent = '✓ 验证成功';
                    button.style.background = '#4caf50';
                    setTimeout(() => {
                        saveUnlockedItem(itemId);
                        unlockContent(container, itemId);
                    }, 500);
                } else {
                    // 密码错误
                    showError('密码错误，请重试');
                    input.value = '';
                    input.focus();
                    button.disabled = false;
                    button.textContent = '解锁内容';
                    // 添加错误动画
                    input.style.borderColor = '#e74c3c';
                    setTimeout(() => {
                        input.style.borderColor = '';
                    }, 1000);
                }
            }, 300);
        });

        input.focus();
    }

    // 显示错误信息
    function showError(message) {
        const errorMsg = document.querySelector('.password-protect-error');
        if (errorMsg) {
            errorMsg.textContent = message;
            errorMsg.style.display = 'block';
            setTimeout(() => {
                errorMsg.style.display = 'none';
            }, 3000);
        }
    }

    // 解锁内容
    function unlockContent(container, itemId) {
        const hiddenContent = document.getElementById(`hidden-content-${itemId}`);
        if (hiddenContent) {
            container.style.display = 'none';
            hiddenContent.style.display = 'block';
            // 滚动到内容顶部
            hiddenContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // 初始化密码保护
    function initPasswordProtect() {
        // 检查文章级别的密码保护
        const articlePassword = document.querySelector('[data-password-hash]');
        if (articlePassword) {
            const passwordHash = articlePassword.getAttribute('data-password-hash');
            const itemId = articlePassword.getAttribute('data-item-id') || window.location.pathname;
            const hint = articlePassword.getAttribute('data-password-hint') || '';
            // articlePassword 本身就是容器，不需要查找子元素
            const container = articlePassword;

            if (container) {
                if (isUnlocked(itemId)) {
                    // 已解锁，直接显示内容
                    const hiddenContent = document.getElementById(`hidden-content-${itemId}`);
                    if (hiddenContent) {
                        container.style.display = 'none';
                        hiddenContent.style.display = 'block';
                    }
                } else {
                    // 需要输入密码
                    showPasswordForm(container, itemId, passwordHash, hint);
                }
            }
        }

        // 检查分类级别的密码保护
        const categoryPassword = document.querySelector('[data-category-password-hash]');
        if (categoryPassword) {
            const passwordHash = categoryPassword.getAttribute('data-category-password-hash');
            const categoryId = categoryPassword.getAttribute('data-category-id');
            const hint = categoryPassword.getAttribute('data-password-hint') || '';
            const container = categoryPassword.querySelector('.password-protect-wrapper');

            if (container && categoryId) {
                if (isUnlocked(`category-${categoryId}`)) {
                    // 已解锁
                    const hiddenContent = document.getElementById(`hidden-content-category-${categoryId}`);
                    if (hiddenContent) {
                        container.style.display = 'none';
                        hiddenContent.style.display = 'block';
                    }
                } else {
                    // 需要输入密码
                    showPasswordForm(container, `category-${categoryId}`, passwordHash, hint);
                }
            }
        }
    }

    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPasswordProtect);
    } else {
        initPasswordProtect();
    }

    // 导出清除解锁状态的函数（用于调试）
    window.clearUnlockedContent = function() {
        localStorage.removeItem('unlockedContent');
        location.reload();
    };

})();

