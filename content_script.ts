console.log("✅ Gmail拡張機能が読み込まれました");

const timerId = setInterval(() => {
  const buttons = Array.from(document.querySelectorAll('[role="button"]')) as HTMLElement[];

  const sendButton = buttons.find((btn) => {
    const tooltip = btn.getAttribute("data-tooltip") || "";
    const aria = btn.getAttribute("aria-label") || "";
    return tooltip.includes("送信") || aria.includes("送信");
  });

  console.log("🔍 ボタン候補数:", buttons.length);

  if (sendButton) {
    console.log("✅ 送信ボタンを検出:", sendButton);
    // sendButton.click(); ← 実行するならここ
    clearInterval(timerId);
  }
}, 1000);
