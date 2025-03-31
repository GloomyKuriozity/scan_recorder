document.addEventListener('DOMContentLoaded', () => {
    const scrapeBtn = document.getElementById("scrapeBtn");
    const status = document.getElementById("status");
  
    // Query the active tab and check its URL
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      if (tabs && tabs.length > 0) {
        const currentUrl = tabs[0].url;
        if (currentUrl.includes("https://manga-scantrad.io/manga/")) {
          scrapeBtn.disabled = false;
          status.textContent = "";
        } else {
          scrapeBtn.disabled = true;
          status.textContent = "URL not supported";
        }
      }
    });
  });
  
  // On clicking the button, update the folder and trigger scraping on the current tab
  document.getElementById("scrapeBtn").addEventListener("click", () => {
    const folder = document.getElementById("downloadFolder").value.trim() || "Tome 1";
  
    // Update the download folder in background.js
    browser.runtime.sendMessage({ action: "setFolderName", folderName: folder })
      .then(response => {
        console.log("Folder updated:", response.status);
      });
  
    // Send a message to the current active tab to start scraping
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      if (tabs && tabs.length > 0) {
        browser.tabs.sendMessage(tabs[0].id, { action: "scrapeImages" });
      }
    });
  });
  