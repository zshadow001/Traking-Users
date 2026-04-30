window.addEventListener("load", async () => {

  const startTime = Date.now();

  const scriptTag = document.querySelector("script[data-tracking-id]");
  if (!scriptTag) return;

  const trackingId = scriptTag.dataset.trackingId;
  const serverUrl = scriptTag.dataset.serverUrl;

  if (!trackingId || !serverUrl) return;

  const data = {};

  // 🧠 Basic Info
  data.User_Agent = navigator.userAgent;
  data.Language = navigator.language;
  data.Platform = navigator.platform || "Unknown";
  data.Cookies_Enabled = navigator.cookieEnabled ? "Yes" : "No";
  data.Online_Status = navigator.onLine ? "Online" : "Offline";

  // 📱 Device Type
  if (/Mobi|Android/i.test(navigator.userAgent)) {
    data.Device_Type = "Mobile";
  } else if (/Tablet|iPad/i.test(navigator.userAgent)) {
    data.Device_Type = "Tablet";
  } else {
    data.Device_Type = "Desktop";
  }

  // 🌐 Browser Info
  let browser = "Unknown";
  let engine = "Unknown";

  if (navigator.userAgent.includes("Chrome")) {
    browser = "Chrome";
    engine = "Blink";
  } else if (navigator.userAgent.includes("Firefox")) {
    browser = "Firefox";
    engine = "Gecko";
  } else if (
    navigator.userAgent.includes("Safari") &&
    !navigator.userAgent.includes("Chrome")
  ) {
    browser = "Safari";
    engine = "WebKit";
  }

  data.Browser = browser;
  data.Engine = engine;

  // 🖥️ Display
  data.Screen_Resolution = `${screen.width}x${screen.height}`;
  data.Color_Depth = `${screen.colorDepth}-bit`;
  data.Timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // 🕒 Session Time
  const duration = Math.floor((Date.now() - startTime) / 1000);
  data.Session_Duration = `${duration} sec`;

  // 🎨 FORMATTED OUTPUT
  const formatted = `
📊 VISITOR REPORT

🌐 BASIC
   ├─ Language  : ${data.Language}
   ├─ Platform  : ${data.Platform}
   ├─ Status    : ${data.Online_Status}
   └─ Cookies   : ${data.Cookies_Enabled}

📱 DEVICE
   ├─ Type      : ${data.Device_Type}
   └─ Browser   : ${data.Browser} (${data.Engine})

🖥️ DISPLAY
   ├─ Resolution: ${data.Screen_Resolution}
   ├─ Color     : ${data.Color_Depth}
   └─ Timezone  : ${data.Timezone}

⏳ SESSION
   └─ Duration  : ${data.Session_Duration}
`;

  // 🚀 Send
  await fetch(`${serverUrl}/data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      trackingId,
      pretty: formatted
    })
  }).catch(() => {});

});
