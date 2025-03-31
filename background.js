let downloadFolder = "Tome 1";  // default folder

// Handle messages from popup and content scripts
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "setFolderName") {
    downloadFolder = message.folderName;
    console.log("Download folder set to:", downloadFolder);
    sendResponse({ status: "Folder name updated" });
  } else if (message.action === "downloadImages") {
    console.log("Received image data:", message.images);
    message.images.forEach((img) => {
      // Use the image element's id as the filename, and the user-provided folder
      const filename = `${downloadFolder}/${img.id}.jpg`;
      browser.downloads.download({
        url: img.src,
        filename: filename
      });
    });
    sendResponse({ status: "Downloads initiated" });
  }
});
