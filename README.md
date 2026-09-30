# 效期管家

記錄食材、物品與訂閱會員的到期日，一眼看到所有庫存，並把到期提醒加入 iPhone 行事曆。
資料只存在每個人自己的手機，不需要帳號，也沒有伺服器。

## 檔案說明

| 檔案 | 用途 |
|---|---|
| `index.html` | App 本體（畫面、邏輯、樣式都在這個檔案裡） |
| `manifest.webmanifest` | 「加入主畫面」時使用的 App 名稱、圖示與顏色 |
| `sw.js` | 離線快取，沒有網路時也能開啟 |
| `icons/` | App 圖示 |

## 上線到 GitHub Pages（只需做一次）

1. 登入 GitHub，右上角「＋」→「New repository」。
2. Repository name 輸入 `expiry-keeper`，選 **Public**，按「Create repository」。
3. 在新的 repo 頁面點「uploading an existing file」，把本資料夾內的所有檔案（含 `icons` 資料夾）拖進去，按「Commit changes」。
4. 進入 repo 的「Settings」→ 左側「Pages」→ Source 選「Deploy from a branch」，Branch 選 `main`、資料夾選 `/ (root)`，按「Save」。
5. 約 1～2 分鐘後，網址會是：`https://你的帳號.github.io/expiry-keeper/`

## 更新版本

1. 在 repo 中上傳新的 `index.html`（同名覆蓋）。
2. 同時把 `sw.js` 第 2 行的版本號改大一號（例如 `v1.0.0` → `v1.0.1`），手機才會抓到新版。
3. 使用者重新開啟 App 兩次即會更新。

## 給朋友的使用說明

1. 用 **iPhone 的 Safari** 打開網址（其他瀏覽器無法加入主畫面）。
2. 點下方「分享」按鈕 →「加入主畫面」→「新增」。之後都從主畫面的圖示開啟。
   - 一定要加入主畫面使用，否則 Safari 可能清除長期未開啟網站的資料。
3. 新增項目時，按品名或到期日欄位右側的「掃描」，拍照或從相簿選照片，用手指框住要辨識的那一行文字，再點選結果帶入。
   - 未設定 Gemini 金鑰時，只有品名可掃描；日期請直接輸入（可用簡寫如 115.10.12）。設定金鑰後日期也能掃描。
   - 第一次使用會下載約 8 MB 的離線辨識資料，之後不需再下載；有設定 Gemini 金鑰時會改用 Gemini 辨識。
4. 存檔後進入該項目按「加入行事曆」；或在總覽最下方按「選擇項目加入行事曆」，勾選要加入的項目。到期前 iPhone 就會提醒。
5. 建議每月到「設定」→「匯出備份」一次，存到「檔案」或雲端硬碟。

### 選用：拍照辨識

1. 用 Google 帳號登入 https://aistudio.google.com/apikey ，按「Create API key」並複製。
2. 到 App「設定」→「拍照辨識」貼上金鑰，按「測試連線並取得可用模型」。
3. 之後「新增」會出現「拍照辨識」，每批最多 12 張照片，也可辨識收據。
4. 金鑰只存在自己的手機，不會包含在備份檔中。請勿把金鑰分享給他人。

### 不用金鑰的 AI 辨識：AI貼上匯入

「新增」→「AI貼上匯入」→「複製 AI 指令」，到 Claude／ChatGPT／Gemini App 貼上指令並附上照片，再把回覆整段貼回 App 即可。
