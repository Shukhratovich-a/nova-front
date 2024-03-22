interface BrowserFlags {
  [key: string]: boolean; // Индексный тип, позволяющий использовать любую строку в качестве ключа
}

export const getPdfSupported = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /iphone|ipad|ipod|android|blackberry|opera mini|iemobile|mobile/i.test(userAgent);

  const browsers: BrowserFlags = {
    edge: /edg/i.test(userAgent) && !/opera|opr/i.test(userAgent),
    chrome: /chrome/i.test(userAgent) && !/edg/i.test(userAgent),
    safari: /safari/i.test(userAgent) && !/chrome/i.test(userAgent),
    firefox: /firefox/i.test(userAgent),
    opera: /opera|opr/i.test(userAgent) && !/chrome/i.test(userAgent),
    ie: /msie|trident/i.test(userAgent) && !/opera|opr/i.test(userAgent),
  };

  const browserName = Object.keys(browsers).find((key) => browsers[key]) || "unknown";
  const browserType = isMobile ? "mobile" : "desktop";

  if (browserType === "mobile" && browserName !== "firefox" && browserName !== "safari") return false;
  else return true;
};
