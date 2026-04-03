# 《見微知命》Gemini 插畫生成提示

以下 prompt 是為目前 GitHub Pages 網站的深色懸疑小說風格準備，建議輸出 `webp` 或高品質 `png`，解析度至少 `1920px` 寬。整體方向請維持：

- 繁體中文小說網站用圖
- 女頻懸疑、近未來都市、微玄學
- 高級感、文學感、克制，不做動漫海報感
- 深褐黑、煤黑、霧灰、冷藍、暖金點光
- 不要任何可讀文字、浮水印、Logo、簽名
- 不要 Q 版、不要過度血腥、不要廉價賽博朋克 UI

## 1. 首頁中段插畫

建議檔名：`home-signal-ledger.webp`

```text
Create a premium editorial illustration for a dark Taiwanese mystery novel website.
Theme: a near-future city where a woman's fate has been hidden inside data, old ledgers, and a secret experiment.
Composition: horizontal 16:9, cinematic mid shot, with generous left and right breathing room for website cropping.
Main elements: a worn brass coin, an old orphanage ledger, blurred city skyline at night, faint data nodes and signal lines, drifting mist, subtle traces of handwritten marks and archive tabs.
Mood: elegant, suspenseful, female-oriented mystery, intelligent and emotionally restrained.
Style: literary editorial illustration, semi-realistic, cinematic, textured, premium novel website artwork, not anime, not comic, not poster design.
Color palette: charcoal black, deep brown-black, muted blue-gray, warm gold highlights.
Lighting: dim and moody, with one soft golden focal light and low-contrast atmospheric shadows.
Negative prompt: no text, no watermark, no logo, no readable numbers, no chibi, no exaggerated sci-fi HUD, no horror gore, no oversaturated neon.
```

## 2. 作品介紹頁插畫

建議檔名：`story-machine-memory.webp`

```text
Create a horizontal editorial illustration for a female mystery thriller novel website.
Theme: stolen childhood, altered memory, missing registry, and a machine that categorizes children as data.
Composition: horizontal 3:2, quiet still-life plus abstract narrative layout.
Main elements: an opened old registry book, pencil circles and erased records, faint medical-white room imagery in the background, delicate data lines floating above paper, sealed archive folders, subtle shadows suggesting hidden surveillance.
Mood: literary, cold, eerie but not horror, emotionally heavy, intelligent suspense.
Style: premium mystery editorial illustration, semi-realistic, refined texture, cinematic website artwork, subtle and classy.
Color palette: coal black, aged paper beige, faded gold, desaturated teal-blue glow.
Lighting: soft directional light, dusty atmosphere, restrained contrast.
Negative prompt: no text, no watermark, no visible UI interface, no cheap cyberpunk neon, no blood, no cluttered composition, no anime.
```

## 3. 正文閱讀器卷首橫幅

建議檔名：`reader-banner-volume.webp`

```text
Create an ultra-wide banner illustration for a dark literary web novel reader.
Theme: a young woman raised in a mountain Taoist temple is about to walk down into a modern city and a dangerous truth.
Composition: extra wide 21:9 banner, panoramic, atmospheric, designed for website header use.
Main elements: misty mountain path, distant Taoist temple silhouette, early dawn fog, faint city lights far below, a lone dark figure descending the path, subtle brass-coin motif hidden in the scene.
Mood: quiet, ominous, elegant, emotionally restrained, full of anticipation.
Style: cinematic literary matte painting, premium novel website banner, semi-realistic, textured, not anime, not fantasy poster.
Color palette: blue-black, fog gray, smoky brown-black, dim warm gold highlights.
Lighting: soft dawn edge light with layered mist and subtle depth.
Negative prompt: no text, no logo, no watermark, no fantasy monsters, no bright saturated colors, no front-facing character portrait, no commercial ad look.
```

## 4. 角色頁核心人物群像

建議檔名：`characters-core-cast.webp`

```text
Create a refined ensemble illustration for a female mystery novel website character page.
Theme: three central figures connected by danger, trust, and hidden history in a near-future city.
Composition: horizontal 16:9, editorial character montage, balanced spacing for web layout.
Characters: one calm and sharp-eyed woman in dark clothing, one restrained and powerful corporate man, one steady and watchful detective man. Their relationship should feel tense rather than romantic in a direct way.
Background elements: faint city skyline, blurred archive files, soft data lines, low-key gold and teal accents.
Mood: high-tension, elegant, emotionally layered, female-market suspense.
Style: premium editorial illustration, semi-realistic, cinematic, tasteful, not anime, not idol poster.
Color palette: charcoal, espresso black, muted teal, smoky gold, pale skin highlights.
Negative prompt: no text, no watermark, no glossy idol poster look, no exaggerated action poses, no chibi, no comic style.
```

## 網站替換建議

如果要把現有 SVG 插畫換成 Gemini 圖片，建議優先替換這三個位置：

- `index.html` 的 `Signal / Ledger`
- `story.html` 的 `Machine / Memory`
- 各卷正文頁 `reading-banner` 上方或內部加一張超寬卷首圖

建議圖片路徑：

- `./assets/illustrations/home-signal-ledger.webp`
- `./assets/illustrations/story-machine-memory.webp`
- `./assets/illustrations/reader-banner-volume.webp`
- `./assets/illustrations/characters-core-cast.webp`

等你把 Gemini 生成好的檔案丟進來後，我可以直接幫你接到 HTML 與 CSS，替換現在站上的 SVG 動畫插畫。
