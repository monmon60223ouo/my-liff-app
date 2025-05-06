async function register() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const lineId = params.get("state");

  const messageEl = document.getElementById("message");

  if (!code || !lineId) {
    messageEl.innerText = "❌ 資訊不完整，註冊失敗。";
    return;
  }

  try {
    const res = await fetch(`https://your-backend.com/api/auth/callback?code=${code}&lineId=${lineId}`);
    const result = await res.json();

    messageEl.innerText = result.success ? "✅ 註冊成功！" : "❌ 註冊失敗。";
  } catch (error) {
    console.error(error);
    messageEl.innerText = "❌ 發生錯誤，請稍後再試。";
  }
}

register();
