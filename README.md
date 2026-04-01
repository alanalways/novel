# 見微知命

《見微知命》是以純 HTML、CSS、JavaScript 製作的 GitHub Pages 靜態小說網站。

## 目前頁面

- `index.html`：首頁
- `story.html`：作品介紹
- `world.html`：世界觀
- `characters.html`：角色設定
- `outline.html`：五卷一百章章綱
- `chapters/volume-1.html`：第一卷完整正文
- `chapters/volume-2.html`：第二卷完整正文
- `chapters/volume-3.html`：第三卷完整正文
- `chapters/volume-4.html`：第四卷完整正文
- `chapters/volume-5.html`：第五卷完整正文

## 部署方式

1. 把這個資料夾推到 GitHub 倉庫的 `main` 分支。
2. 倉庫內已包含 `.github/workflows/pages.yml`。
3. GitHub Actions 執行完成後，GitHub Pages 會自動部署本站。

## 備註

- `pages/` 目錄保留為相容轉址頁，避免舊連結失效。
- 舊有的其他 HTML 檔案未被刪除，但已不作為本站主導覽的一部分。
