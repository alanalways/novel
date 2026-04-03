document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll("[data-nav]").forEach((link) => {
    const href = link.getAttribute("href");
    const normalizedHref = href ? href.split("/").pop() : "";
    if (normalizedHref === currentPage || (currentPage === "" && normalizedHref === "index.html")) {
      link.classList.add("is-active");
    }
  });

  const yearNode = document.querySelector("[data-year]");
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  const volumeDetails = [...document.querySelectorAll(".volume-detail")];
  document.querySelector("[data-outline-expand]")?.addEventListener("click", () => {
    volumeDetails.forEach((item) => {
      item.open = true;
    });
  });
  document.querySelector("[data-outline-collapse]")?.addEventListener("click", () => {
    volumeDetails.forEach((item, index) => {
      item.open = index === 0;
    });
  });
  volumeDetails.forEach((item) => {
    item.querySelector("summary")?.addEventListener("click", () => {
      if (!item.open) {
        volumeDetails.forEach((other) => {
          if (other !== item) {
            other.open = false;
          }
        });
      }
    });
  });

  const root = document.documentElement;
  const prose = document.querySelector(".reading-shell .prose");
  const isReadingPage = Boolean(prose);
  const mobileQuery = window.matchMedia("(max-width: 760px)");
  document.body.classList.toggle("is-reading-page", isReadingPage);
  document.body.classList.toggle("is-mobile-ui", mobileQuery.matches);

  const prefKey = "jwm-reader-prefs";
  const optionMap = {
    uiScale: [0.94, 1, 1.08, 1.16],
    readerFont: [1.02, 1.12, 1.2, 1.3],
    readerWidth: [820, 900, 980, 1060],
    lineHeight: [1.9, 2.05, 2.2]
  };
  const defaults = {
    uiScale: mobileQuery.matches ? 0.98 : 1,
    readerFont: mobileQuery.matches ? 1.1 : 1.12,
    readerWidth: mobileQuery.matches ? 900 : 980,
    lineHeight: mobileQuery.matches ? 2.02 : 2.05,
    panelOpen: false
  };

  const labels = {
    uiScale: {
      0.94: "緊湊",
      1: "標準",
      1.08: "舒展",
      1.16: "放大"
    },
    readerFont: {
      1.02: "纖細",
      1.12: "標準",
      1.2: "偏大",
      1.3: "沉浸"
    },
    readerWidth: {
      820: "窄版",
      900: "舒適",
      980: "標準",
      1060: "寬版"
    },
    lineHeight: {
      1.9: "緊密",
      2.05: "標準",
      2.2: "寬鬆"
    }
  };

  const loadPrefs = () => {
    try {
      const parsed = JSON.parse(window.localStorage.getItem(prefKey) || "{}");
      return { ...defaults, ...parsed };
    } catch {
      return { ...defaults };
    }
  };

  const prefs = loadPrefs();

  const savePrefs = () => {
    try {
      window.localStorage.setItem(prefKey, JSON.stringify(prefs));
    } catch {
      // 忽略隱私模式或瀏覽器限制造成的儲存失敗
    }
  };

  const snapValue = (key, value) => {
    const options = optionMap[key];
    if (!options) {
      return value;
    }
    return options.reduce((closest, current) => (
      Math.abs(current - value) < Math.abs(closest - value) ? current : closest
    ), options[0]);
  };

  const moveOption = (key, step) => {
    const options = optionMap[key];
    const currentIndex = Math.max(0, options.indexOf(snapValue(key, prefs[key])));
    const nextIndex = Math.min(options.length - 1, Math.max(0, currentIndex + step));
    prefs[key] = options[nextIndex];
  };

  const applyPrefs = () => {
    root.style.setProperty("--ui-scale", String(prefs.uiScale));
    root.style.setProperty("--reader-font-size", `${prefs.readerFont}rem`);
    root.style.setProperty("--reader-width", `${prefs.readerWidth}px`);
    root.style.setProperty("--reader-line-height", String(prefs.lineHeight));
  };

  const getLabel = (key) => labels[key]?.[prefs[key]] || String(prefs[key]);

  const syncViewportState = () => {
    document.body.classList.toggle("is-mobile-ui", mobileQuery.matches);
  };

  const createReaderDock = () => {
    const dock = document.createElement("aside");
    dock.className = "reader-dock";
    dock.innerHTML = `
      <button class="reader-backdrop${prefs.panelOpen ? " is-open" : ""}" type="button" aria-hidden="${prefs.panelOpen ? "false" : "true"}" tabindex="-1"></button>
      <button class="reader-toggle" type="button" aria-expanded="${prefs.panelOpen ? "true" : "false"}" aria-controls="reader-panel">
        <span>Aa</span>
        <span>閱讀設定</span>
      </button>
      <div class="reader-panel${prefs.panelOpen ? " is-open" : ""}" id="reader-panel">
        <div class="reader-panel-head">
          <div class="reader-panel-title">
            <strong>閱讀設定</strong>
            <small>${isReadingPage ? "正文排版" : "站內介面"}</small>
          </div>
          <button class="reader-close" type="button" aria-label="關閉閱讀設定">×</button>
        </div>
        <div class="reader-group reader-group-ui">
          <div class="reader-meta">
            <strong>介面字級</strong>
            <small data-label="uiScale"></small>
          </div>
          <div class="reader-actions">
            <button type="button" data-setting="uiScale" data-step="-1">縮小</button>
            <button type="button" data-setting="uiScale" data-step="1">放大</button>
          </div>
        </div>
        ${isReadingPage ? `
          <div class="reader-group reader-group-font">
            <div class="reader-meta">
              <strong>正文字級</strong>
              <small data-label="readerFont"></small>
            </div>
            <div class="reader-actions">
              <button type="button" data-setting="readerFont" data-step="-1">偏小</button>
              <button type="button" data-setting="readerFont" data-step="1">偏大</button>
            </div>
          </div>
          <div class="reader-group reader-group-width">
            <div class="reader-meta">
              <strong>版心寬度</strong>
              <small data-label="readerWidth"></small>
            </div>
            <div class="reader-actions">
              <button type="button" data-setting="readerWidth" data-step="-1">收窄</button>
              <button type="button" data-setting="readerWidth" data-step="1">放寬</button>
            </div>
          </div>
          <div class="reader-group reader-group-leading">
            <div class="reader-meta">
              <strong>行距</strong>
              <small data-label="lineHeight"></small>
            </div>
            <div class="reader-actions">
              <button type="button" data-setting="lineHeight" data-step="-1">緊一點</button>
              <button type="button" data-setting="lineHeight" data-step="1">鬆一點</button>
            </div>
          </div>
        ` : `
          <p class="reader-hint">目前可調整全站介面字級；進入正文頁後，還能繼續調整正文字級、版心寬度與行距。</p>
        `}
      </div>
    `;

    const updatePanel = () => {
      dock.querySelectorAll("[data-label]").forEach((node) => {
        const key = node.getAttribute("data-label");
        node.textContent = key ? getLabel(key) : "";
      });

      const panel = dock.querySelector(".reader-panel");
      const backdrop = dock.querySelector(".reader-backdrop");
      const toggle = dock.querySelector(".reader-toggle");
      panel?.classList.toggle("is-open", prefs.panelOpen);
      backdrop?.classList.toggle("is-open", prefs.panelOpen);
      backdrop?.setAttribute("aria-hidden", prefs.panelOpen ? "false" : "true");
      toggle?.setAttribute("aria-expanded", prefs.panelOpen ? "true" : "false");
      document.body.classList.toggle("reader-panel-open", prefs.panelOpen);
    };

    dock.querySelector(".reader-toggle")?.addEventListener("click", () => {
      prefs.panelOpen = !prefs.panelOpen;
      savePrefs();
      updatePanel();
    });

    dock.querySelector(".reader-close")?.addEventListener("click", () => {
      prefs.panelOpen = false;
      savePrefs();
      updatePanel();
    });

    dock.querySelector(".reader-backdrop")?.addEventListener("click", () => {
      prefs.panelOpen = false;
      savePrefs();
      updatePanel();
    });

    dock.querySelectorAll("[data-setting]").forEach((button) => {
      button.addEventListener("click", () => {
        const key = button.getAttribute("data-setting");
        const step = Number(button.getAttribute("data-step") || "0");
        if (!key || !step) {
          return;
        }

        moveOption(key, step);
        applyPrefs();
        savePrefs();
        updatePanel();
      });
    });

    updatePanel();
    document.body.appendChild(dock);
  };

  const createReadingProgress = () => {
    if (!isReadingPage || !prose) {
      return;
    }

    const progress = document.createElement("div");
    progress.className = "reader-progress";
    progress.innerHTML = "<span></span>";
    document.body.appendChild(progress);

    const bar = progress.querySelector("span");
    const update = () => {
      const start = prose.offsetTop - window.innerHeight * 0.2;
      const end = start + prose.offsetHeight - window.innerHeight * 0.58;
      const total = Math.max(end - start, 1);
      const ratio = Math.max(0, Math.min(1, (window.scrollY - start) / total));
      if (bar) {
        bar.style.transform = `scaleX(${ratio})`;
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  };

  applyPrefs();
  syncViewportState();
  createReaderDock();
  createReadingProgress();
  mobileQuery.addEventListener?.("change", syncViewportState);
});
