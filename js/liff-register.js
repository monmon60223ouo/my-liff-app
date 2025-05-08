const clientId = "372abdfa-67fb-4b5f-ab2a-ee6de771d70e"; // Microsoft 登入的 clientId
const teamsRedirectUri = "https://monmon60223ouo.github.io/my-liff-app/liff-teams-callback.html"; // Microsoft 登入後的回呼頁面

async function main() {
  try {
    // 初始化 LIFF 應用，必須提供你的 LIFF ID
    await liff.init({ liffId: "2007365918-80YK42kZ" });

    // 檢查是否已登入 LINE
    if (!liff.isLoggedIn()) {
      console.log("尚未登入 LINE，進行登入...");
      // 如果尚未登入 LINE，請求登入
      liff.login();
      return;
    }

    // 如果已登入，則取得使用者資料
    const profile = await liff.getProfile();
    const lineUserId = profile.userId;

    // 顯示登入成功的訊息
    document.getElementById("status").innerText = "登入成功！";

    // 建立 Microsoft OAuth 登入 URL
    const state = encodeURIComponent(lineUserId); // 傳遞 LINE 使用者 ID 作為 state
    const loginUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?` +
      `client_id=${clientId}` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(teamsRedirectUri)}` +
      `&scope=User.Read` +
      `&state=${state}`;

    // 重定向到 Microsoft 登入頁面
    window.location.href = loginUrl;

  } catch (error) {
    // 如果 LIFF 初始化失敗或有其他錯誤，顯示錯誤訊息
    document.getElementById("status").innerText = "載入失敗，請稍後再試。";
    console.error("LIFF 初始化錯誤:", error);
  }
}

// 執行 main 函數，初始化 LIFF 應用
main();
