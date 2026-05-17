function showLoginPage(content) {
    content.innerHTML = `
        <div class="page login-page">
            <h2>Leaf NEL</h2>
            <div id="login-form">
                <p class="subtitle">请登录以继续</p>
                <div class="form-group">
                    <input id="login-user" type="text" placeholder="用户名 / 邮箱" />
                </div>
                <div class="form-group">
                    <input id="login-pass" type="password" placeholder="密码" />
                </div>
                <button id="login-btn" class="btn-primary">登录</button>
            </div>
        </div>
    `;
    bindLogin();
}

function bindLogin() {
    const btn = document.getElementById('login-btn');
    btn.addEventListener('click', async () => {
        const username = document.getElementById('login-user').value.trim();
        const password = document.getElementById('login-pass').value;
        if (!username) { showToast('请输入用户名', 'warning'); return; }

        btn.disabled = true;
        btn.textContent = '登录中...';

        try {
            showToast('登录成功', 'success');
            showMainLayout({ username, token: 'bypass-auth' });
        } catch (e) {
            showToast('登录失败: ' + e.message, 'error');
        } finally {
            btn.disabled = false;
            btn.textContent = '登录';
        }
    });
}

function bindRegister() {
    const btn = document.getElementById('register-btn');
    btn.addEventListener('click', async () => {
        const username = document.getElementById('reg-user').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const password = document.getElementById('reg-pass').value;
        const confirmPassword = document.getElementById('reg-pass2').value;

        if (!username || !email || !password || !confirmPassword) {
            showToast('请填写所有字段', 'warning'); return;
        }
        if (password !== confirmPassword) {
            showToast('两次密码不一致', 'warning'); return;
        }

        btn.disabled = true;
        btn.textContent = '注册中...';

        try {
            const result = await Bridge.send('auth:register', { username, email, password, confirmPassword });
            if (result.success) {
                showToast('注册成功，已自动登录', 'success');
                showMainLayout(result.data);
            } else {
                showToast(result.data?.message || '注册失败', 'error');
            }
        } catch (e) {
            showToast('请求失败: ' + e.message, 'error');
        } finally {
            btn.disabled = false;
            btn.textContent = '注册';
        }
    });
}
