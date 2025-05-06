const clientId = "372abdfa-67fb-4b5f-ab2a-ee6de771d70e";
const teamsRedirectUri = "https://monmon60223ouo.github.io/my-liff-app/liff-teams-callback.html";

async function main() {
  await liff.init({ liffId: "2007365918-80YK42kZ" });

  if (!liff.isLoggedIn()) {
    liff.login();
    return;
  }

  const profile = await liff.getProfile();
  const lineUserId = profile.userId;

  // Redirect to Microsoft login
  const state = encodeURIComponent(lineUserId);
  const loginUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize` +
    `?client_id=${clientId}` +
    `&response_type=code` +
    `&redirect_uri=${encodeURIComponent(teamsRedirectUri)}` +
    `&scope=User.Read` +
    `&state=${state}`;

  window.location.href = loginUrl;
}

main();
