const clientId = "372abdfa-67fb-4b5f-ab2a-ee6de771d70e"; // Microsoft 登入的 clientId
const teamsRedirectUri = "https://monmon60223ouo.github.io/my-liff-app/liff-teams-callback.html"; // Microsoft 登入後的回呼頁面

document.addEventListener("DOMContentLoaded", async function() {
  try {
    // 初始化 LIFF 應用，必須提供你的 LIFF ID
    await liff.init({ liffId: "2007365918-80YK42kZ" });

    // 在 LIFF 初始化後檢查登入狀態
    checkLoginStatus();
  } catch (error) {
    document.getElementById("status").innerText = "載入失敗，請稍後再試。";
    console.error("LIFF 初始化錯誤:", error);
  }
});

async function checkLoginStatus() {
  // 確保 LIFF SDK 加載完畢，並檢查用戶是否已經登入 LINE
  if (!liff.isLoggedIn()) {
    console.log("尚未登入 LINE，進行登入...");
    // 如果尚未登入 LINE，請求登入
    liff.login();
    return;
  }

  // 如果已登入 LINE，繼續進行後續邏輯
  try {
    const profile = await liff.getProfile();
    const lineUserId = profile.userId;

    // 顯示登入成功的訊息
    document.getElementById("status").innerText = "登入成功！";

    // 建立 Microsoft OAuth 登入 URL
    const state = encodeURIComponent(lineUserId); // 傳遞 LINE 用戶 ID 作為 state
    const loginUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?` +
      `client_id=${clientId}` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(teamsRedirectUri)}` +
      `&scope=User.Read` +
      `&state=${state}`;

    // 重定向到 Microsoft 登入頁面
    window.location.href = loginUrl;
  } catch (error) {
    document.getElementById("status").innerText = "載入失敗，請稍後再試。";
    console.error("取得 LINE 使用者資料錯誤:", error);
  }
}
