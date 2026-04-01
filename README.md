# 見微知命

這個資料夾已整理成可部署到 GitHub Pages 的純靜態小說網站。

## 站點內容

- `index.html`：首頁與入口導覽
- `pages/overview.html`：作品介紹
- `pages/world.html`：世界觀
- `pages/characters.html`：角色檔案
- `pages/outline.html`：五卷百章章綱
- `pages/volume-one-sample.html`：卷一試閱
- `assets/styles.css`：共用樣式
- `.github/workflows/pages.yml`：GitHub Pages 自動部署流程

## 部署方式

1. 將此資料夾初始化為 Git 倉庫並推到 GitHub 的 `main` 分支。
2. 在 GitHub 倉庫設定中啟用 Pages。
3. 推送後，`.github/workflows/pages.yml` 會自動部署站點。

## 目前限制

這台機器目前沒有安裝 `gh` GitHub CLI，也沒有現成的遠端倉庫設定，因此我可以把網站與工作流程完整建好，但要真正發佈到你的 GitHub 帳號，仍需要你提供倉庫資訊或先完成登入。
