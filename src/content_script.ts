(() => {
  console.log("✅ Gmail拡張機能が読み込まれました");

  let tryCount = 0;
  const maxTries = 30;

  const timerId = setInterval(() => {
    tryCount++;

    const buttons = Array.from(document.querySelectorAll('[role="button"]'));
    console.log(`🔍 試行 ${tryCount}: 検出されたボタン数: ${buttons.length}`);

    const sendButton = buttons.find((btn) => {
      const tooltip = btn.getAttribute("data-tooltip") || "";
      const aria = btn.getAttribute("aria-label") || "";
      return tooltip.includes("送信") || aria.includes("送信");
    });

    if (sendButton) {
      console.log("✅ 送信ボタンを検出:", sendButton);
      // sendButton.click(); // ← 実行したい場合はコメントアウトを解除
      clearInterval(timerId);
    }

    if (tryCount >= maxTries) {
      console.log("❌ 送信ボタンの検出に失敗しました");
      clearInterval(timerId);
    }
  }, 1000);
})();
