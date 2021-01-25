var Liferay = {
  Browser: {
      acceptsGzip: function () {
          return true;
      },
      getMajorVersion: function () {
          return 87;
      },
      getRevision: function () {
          return "537.36";
      },
      getVersion: function () {
          return "87.0";
      },
      isAir: function () {
          return false;
      },
      isChrome: function () {
          return true;
      },
      isFirefox: function () {
          return false;
      },
      isGecko: function () {
          return true;
      },
      isIe: function () {
          return false;
      },
      isIphone: function () {
          return false;
      },
      isLinux: function () {
          return false;
      },
      isMac: function () {
          return true;
      },
      isMobile: function () {
          return false;
      },
      isMozilla: function () {
          return false;
      },
      isOpera: function () {
          return false;
      },
      isRtf: function () {
          return true;
      },
      isSafari: function () {
          return true;
      },
      isSun: function () {
          return false;
      },
      isWap: function () {
          return false;
      },
      isWapXhtml: function () {
          return false;
      },
      isWebKit: function () {
          return true;
      },
      isWindows: function () {
          return false;
      },
      isWml: function () {
          return false;
      },
  },
  Data: {
      NAV_SELECTOR: "#navigation",
      isCustomizationView: function () {
          return false;
      },
      notices: [null],
  },
  ThemeDisplay: {
      getLayoutId: function () {
          return "9";
      },
      getLayoutURL: function () {
          return "./morphological-properties.html";
      },
      getParentLayoutId: function () {
          return "15";
      },
      isPrivateLayout: function () {
          return "false";
      },
      isVirtualLayout: function () {
          return false;
      },
      getBCP47LanguageId: function () {
          return "en-US";
      },
      getCDNBaseURL: function () {
          return "./";
      },
      getCDNDynamicResourcesHost: function () {
          return "";
      },
      getCDNHost: function () {
          return "";
      },
      getCompanyId: function () {
          return "10157";
      },
      getCompanyGroupId: function () {
          return "10197";
      },
      getDefaultLanguageId: function () {
          return "en_US";
      },
      getDoAsUserIdEncoded: function () {
          return "";
      },
      getLanguageId: function () {
          return "en_US";
      },
      getParentGroupId: function () {
          return "10184";
      },
      getPathContext: function () {
          return "./";
      },
      getPathImage: function () {
          return "./image";
      },
      getPathJavaScript: function () {
          return "./html/js";
      },
      getPathMain: function () {
          return "./c";
      },
      getPathThemeImages: function () {
          return "./assets/smw-theme/images";
      },
      getPathThemeRoot: function () {
          return "./smw-theme";
      },
      getPlid: function () {
          return "105840";
      },
      getPortalURL: function () {
          return "./";
      },
      getPortletSetupShowBordersDefault: function () {
          return true;
      },
      getScopeGroupId: function () {
          return "10184";
      },
      getScopeGroupIdOrLiveGroupId: function () {
          return "10184";
      },
      getSessionId: function () {
          return "";
      },
      getSiteGroupId: function () {
          return "10184";
      },
      getURLControlPanel: function () {
          return "./group/control_panel?refererPlid=105840";
      },
      getURLHome: function () {
          return "./welcome.html";
      },
      getUserId: function () {
          return "10161";
      },
      getUserName: function () {
          return "";
      },
      isAddSessionIdToURL: function () {
          return false;
      },
      isFreeformLayout: function () {
          return false;
      },
      isImpersonated: function () {
          return false;
      },
      isSignedIn: function () {
          return false;
      },
      isStateExclusive: function () {
          return false;
      },
      isStateMaximized: function () {
          return false;
      },
      isStatePopUp: function () {
          return false;
      },
  },
  PropsValues: { NTLM_AUTH_ENABLED: false },
};
var themeDisplay = Liferay.ThemeDisplay;
Liferay.AUI = {
  getAvailableLangPath: function () {
      return "available_languages.jsp?browserId=other&themeId=smwtheme_WAR_smwtheme&colorSchemeId=01&minifierType=js&languageId=en_US&b=6200&t=1383330666000";
  },
  getCombine: function () {
      return true;
  },
  getComboPath: function () {
      return "./combo/?browserId=other&minifierType=&languageId=en_US&b=6200&t=1383330666000&";
  },
  getFilter: function () {
      return "min";
  },
  getJavaScriptRootPath: function () {
      return "./html/js";
  },
  getLangPath: function () {
      return "aui_lang.jsp?browserId=other&themeId=smwtheme_WAR_smwtheme&colorSchemeId=01&minifierType=js&languageId=en_US&b=6200&t=1383330666000";
  },
};
Liferay.authToken = "";
Liferay.currentURL = "./";
Liferay.currentURLEncoded = "./";
