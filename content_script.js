console.log("Gmail拡張機能が読み込まれました");

const checkForSendButton = () => {
  const sendButton = document.querySelector('div[aria-label="送信"]');
  if (sendButton) {
    console.log("✅ 送信ボタンが見つかりました");
    // sendButton.click(); // 必要ならコメント解除
    clearInterval(checkInterval);
  } else {
    console.log("❌ 送信ボタンがまだ見つかりません。再確認中...");
  }
};

const checkInterval = setInterval(checkForSendButton, 1000);
