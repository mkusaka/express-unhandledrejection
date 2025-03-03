// require('express-async-errors');

const express = require('express');
const app = express();

// エラーを発生させる非同期ルート
app.get('/test', async (req, res) => {
  // ここで未処理の Promise rejection を発生させる
  await Promise.reject(new Error("意図的なエラーです！"));
  // この行は実行されない
  res.send("正常なレスポンス");
});

// エラーハンドリングミドルウェア
app.use((err, req, res, next) => {
  console.error("エラーが発生しました:", err);
  res.status(500).send("サーバ内部でエラーが発生しました。");
});

// サーバの起動
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`サーバがポート ${PORT} で起動しました`);
});