console.log("✅ Chatwork拡張機能が読み込まれました");

// メッセージDOMを取得する（新しいセレクタに変更）
function getAllMessageNodes(): HTMLElement[] {
  return Array.from(document.querySelectorAll('div.sc-dgtOuX')) as HTMLElement[];
}

// 単一メッセージにUIを注入
function injectReplyUI(messageNode: HTMLElement) {
  if (messageNode.querySelector('.my-reply-ui')) return;

  const container = document.createElement('div');
  container.className = 'my-reply-ui';
  container.style.marginTop = '4px';
  container.style.borderTop = '1px solid #ccc';
  container.style.paddingTop = '4px';

  const textarea = document.createElement('textarea');
  textarea.placeholder = '返信を入力...';
  textarea.rows = 2;
  textarea.style.width = '100%';

  const replyButton = document.createElement('button');
  replyButton.textContent = '送信';
  replyButton.style.marginRight = '4px';
  replyButton.onclick = () => {
    console.log('📨 送信ボタンクリック:', textarea.value);
    // 実装に応じて処理を追加
  };

  const generateButton = document.createElement('button');
  generateButton.textContent = '返信案を生成';
  generateButton.onclick = async () => {
    const messageText = messageNode.innerText || '';
    console.log("🤖 元メッセージ:", messageText);

    const apiKey = "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"; // セキュアな保存推奨

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "あなたはビジネスチャットで返信を考えるアシスタントです。" },
          { role: "user", content: `次のメッセージに返信してください：${messageText}` }
        ],
        temperature: 0.7
      })
    });

    const result = await response.json();
    const reply = result.choices?.[0]?.message?.content || "返信案の取得に失敗しました";
    textarea.value = reply;
  };

  container.appendChild(textarea);
  container.appendChild(generateButton);
  container.appendChild(replyButton);
  messageNode.appendChild(container);
}

// 全てのメッセージにUI挿入
function injectReplyUIToAllMessages() {
  const nodes = getAllMessageNodes();
  nodes.forEach(injectReplyUI);
}

// 新規メッセージに対応
const observer = new MutationObserver(() => {
  injectReplyUIToAllMessages();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// 初回実行
injectReplyUIToAllMessages();
