document.addEventListener("DOMContentLoaded", function () {
  const notificationButton = document.getElementById("notificationButton");

  // Check if the current tab's URL matches LinkedIn notifications URL
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0];
    if (
      currentTab.url &&
      currentTab.url.startsWith(
        "https://www.linkedin.com/notifications/?filter=all"
      )
    ) {
      notificationButton.textContent = "Purge Notifications";
      notificationButton.addEventListener("click", function () {
        // Execute your script to purge notifications here
        chrome.scripting.executeScript({
          target: { tabId: currentTab.id },
          function: () => {
            document
              .querySelectorAll('[href="#trash-medium"]')
              .forEach((trash) => trash.parentNode.parentNode.click());
          },
        });
      });
    } else {
      notificationButton.textContent = "Go to LinkedIn Notifications";
      notificationButton.addEventListener("click", function () {
        // Open a new tab to LinkedIn notifications
        chrome.tabs.create({
          url: "https://www.linkedin.com/notifications/?filter=all",
        });
      });
    }
  });
});
