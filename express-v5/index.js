const express = require('express');
const app = express();

// Express v5 では、async 関数内での throw（または Promise の rejection）は自動的にキャッチされます
app.get('/test', async (req, res) => {
  // ここでエラーを発生させる
  throw new Error("Express v5 の async ハンドラーで発生した意図的なエラー");
  // この行は実行されません
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
  console.log(`Express v5 サーバがポート ${PORT} で起動しました`);
});
