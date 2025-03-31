console.log("Content script loaded on " + window.location.href);

// Listen for messages from the background script.
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Content script received message", message);
  if (message.action === "scrapeImages") {
    // Select all images whose id starts with 'image-'
    const imgElements = document.querySelectorAll("img[id^='image-']");
    console.log("Found " + imgElements.length + " images.");
    
    const images = [];
    imgElements.forEach((img) => {
      const src = img.src;
      const id = img.id;
      if (src && id) {
        images.push({ id, src });
      }
    });
    console.log("Scraped images:", images);
    
    // Send the scraped image data to the background script.
    browser.runtime.sendMessage({ action: "downloadImages", images: images });
    sendResponse({ status: "Scraped images", count: images.length });
  }
});
