import fs from 'fs';
import readline from 'readline';
import { google } from 'googleapis';
import path from 'path';

// 認証に使用するスコープ（Gmail送信）
const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];
const TOKEN_PATH = path.join(__dirname, 'token.json');

// 認証とメール送信のメイン処理
async function main() {
  const credentials = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
  const { client_secret, client_id } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, 'urn:ietf:wg:oauth:2.0:oob');

  // トークンがあれば再利用、なければ新規取得
  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
    oAuth2Client.setCredentials(token);
    await sendEmail(oAuth2Client);
  } else {
    getNewToken(oAuth2Client);
  }
}

// 初回のトークン取得
function getNewToken(oAuth2Client: any) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
  });

  console.log('以下のURLをブラウザで開いて認証コードを取得してください：\n', authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('認証コードをここに貼り付けてください: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err: any, token: any) => {
      if (err) {
        console.error('トークンの取得中にエラーが発生しました', err);
        return;
      }
      oAuth2Client.setCredentials(token);
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
      console.log('トークンを保存しました ->', TOKEN_PATH);
      sendEmail(oAuth2Client);
    });
  });
}

// メールを送信する関数
async function sendEmail(auth: any) {
  const gmail = google.gmail({ version: 'v1', auth });

  const rawMessage = [
    'From: "ozawa shizuka" <so19900905@gmail.com>',
    'To: so19900905@yahoo.co.jp',
    'Subject: テストメール',
    '',
    'これはNode.jsから送信されたテストメールです。',
  ].join('\n');

  const encodedMessage = Buffer.from(rawMessage)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  try {
    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });
    console.log('✅ メールが送信されました');
  } catch (error) {
    console.error('❌ メール送信中にエラーが発生しました:', error);
  }
}

main().catch(console.error);
