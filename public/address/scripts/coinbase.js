(() => {
  var __webpack_modules__ = {
      9016: (t, e, r) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }), (e.CoinbaseWalletSDK = void 0);
        const n = r(2719),
          i = r(9682),
          o = r(3143),
          s = r(3518),
          a = r(6570),
          u = r(7472),
          c = r(4643),
          l =
            { NODE_ENV: 'production', WALLETLINK_URL: void 0, WALLETLINK_VERSION: '3.3.0' }.LINK_API_URL ||
            'https://www.walletlink.org',
          h =
            { NODE_ENV: 'production', WALLETLINK_URL: void 0, WALLETLINK_VERSION: '3.3.0' }.SDK_VERSION ||
            r(626).i8 ||
            'unknown';
        class f {
          constructor(t) {
            var e, r, n;
            (this._appName = ''), (this._appLogoUrl = null), (this._relay = null), (this._relayEventManager = null);
            const o = t.linkAPIUrl || l;
            let c;
            if (
              ((c = t.uiConstructor ? t.uiConstructor : (t) => new s.WalletSDKUI(t)),
              void 0 === t.overrideIsMetaMask
                ? (this._overrideIsMetaMask = !1)
                : (this._overrideIsMetaMask = t.overrideIsMetaMask),
              (this._overrideIsCoinbaseWallet = null === (e = t.overrideIsCoinbaseWallet) || void 0 === e || e),
              (this._overrideIsCoinbaseBrowser = null !== (r = t.overrideIsCoinbaseBrowser) && void 0 !== r && r),
              t.diagnosticLogger && t.eventListener)
            )
              throw new Error(
                'can not have both eventListener and diagnosticLogger options, use only diagnosticLogger',
              );
            t.eventListener
              ? (this._diagnosticLogger = { log: t.eventListener.onEvent })
              : (this._diagnosticLogger = t.diagnosticLogger),
              (this._reloadOnDisconnect = null === (n = t.reloadOnDisconnect) || void 0 === n || n);
            const d = new URL(o),
              p = `${d.protocol}//${d.host}`;
            (this._storage = new i.ScopedLocalStorage(`-walletlink:${p}`)),
              this._storage.setItem('version', f.VERSION),
              this.walletExtension ||
                ((this._relayEventManager = new u.WalletSDKRelayEventManager()),
                (this._relay = new a.WalletSDKRelay({
                  linkAPIUrl: o,
                  version: h,
                  darkMode: !!t.darkMode,
                  uiConstructor: c,
                  storage: this._storage,
                  relayEventManager: this._relayEventManager,
                  diagnosticLogger: this._diagnosticLogger,
                })),
                this.setAppInfo(t.appName, t.appLogoUrl),
                t.headlessMode || this._relay.attachUI());
          }
          makeWeb3Provider(t = '', e = 1) {
            const r = this.walletExtension;
            if (r)
              return (
                this.isCipherProvider(r) || r.setProviderInfo(t, e),
                !1 === this._reloadOnDisconnect &&
                  'function' == typeof r.disableReloadOnDisconnect &&
                  r.disableReloadOnDisconnect(),
                r
              );
            const n = this._relay;
            if (!n || !this._relayEventManager || !this._storage)
              throw new Error('Relay not initialized, should never happen');
            return (
              t || n.setConnectDisabled(!0),
              new o.CoinbaseWalletProvider({
                relayProvider: () => Promise.resolve(n),
                relayEventManager: this._relayEventManager,
                storage: this._storage,
                jsonRpcUrl: t,
                chainId: e,
                qrUrl: this.getQrUrl(),
                diagnosticLogger: this._diagnosticLogger,
                overrideIsMetaMask: this._overrideIsMetaMask,
                overrideIsCoinbaseWallet: this._overrideIsCoinbaseWallet,
                overrideIsCoinbaseBrowser: this._overrideIsCoinbaseBrowser,
              })
            );
          }
          setAppInfo(t, e) {
            var r;
            (this._appName = t || 'DApp'), (this._appLogoUrl = e || (0, c.getFavicon)());
            const n = this.walletExtension;
            n
              ? this.isCipherProvider(n) || n.setAppInfo(this._appName, this._appLogoUrl)
              : null === (r = this._relay) || void 0 === r || r.setAppInfo(this._appName, this._appLogoUrl);
          }
          disconnect() {
            var t;
            const e = this.walletExtension;
            e ? e.close() : null === (t = this._relay) || void 0 === t || t.resetAndReload();
          }
          getQrUrl() {
            var t, e;
            return null !== (e = null === (t = this._relay) || void 0 === t ? void 0 : t.getQRCodeUrl()) && void 0 !== e
              ? e
              : null;
          }
          getCoinbaseWalletLogo(t, e = 240) {
            return (0, n.walletLogo)(t, e);
          }
          get walletExtension() {
            var t;
            return null !== (t = window.coinbaseWalletExtension) && void 0 !== t ? t : window.walletLinkExtension;
          }
          isCipherProvider(t) {
            return 'boolean' == typeof t.isCipher && t.isCipher;
          }
        }
        (e.CoinbaseWalletSDK = f), (f.VERSION = h);
      },
      2719: (t, e) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.walletLogo = void 0),
          (e.walletLogo = (t, e) => {
            let r;
            switch (t) {
              case 'standard':
              default:
                return (
                  (r = e),
                  `data:image/svg+xml,%3Csvg width='${e}' height='${r}' viewBox='0 0 1024 1024' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Crect width='1024' height='1024' fill='%230052FF'/%3E %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M152 512C152 710.823 313.177 872 512 872C710.823 872 872 710.823 872 512C872 313.177 710.823 152 512 152C313.177 152 152 313.177 152 512ZM420 396C406.745 396 396 406.745 396 420V604C396 617.255 406.745 628 420 628H604C617.255 628 628 617.255 628 604V420C628 406.745 617.255 396 604 396H420Z' fill='white'/%3E %3C/svg%3E `
                );
              case 'circle':
                return (
                  (r = e),
                  `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${e}' height='${r}' viewBox='0 0 999.81 999.81'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%230052fe;%7D.cls-2%7Bfill:%23fefefe;%7D.cls-3%7Bfill:%230152fe;%7D%3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='M655-115.9h56c.83,1.59,2.36.88,3.56,1a478,478,0,0,1,75.06,10.42C891.4-81.76,978.33-32.58,1049.19,44q116.7,126,131.94,297.61c.38,4.14-.34,8.53,1.78,12.45v59c-1.58.84-.91,2.35-1,3.56a482.05,482.05,0,0,1-10.38,74.05c-24,106.72-76.64,196.76-158.83,268.93s-178.18,112.82-287.2,122.6c-4.83.43-9.86-.25-14.51,1.77H654c-1-1.68-2.69-.91-4.06-1a496.89,496.89,0,0,1-105.9-18.59c-93.54-27.42-172.78-77.59-236.91-150.94Q199.34,590.1,184.87,426.58c-.47-5.19.25-10.56-1.77-15.59V355c1.68-1,.91-2.7,1-4.06a498.12,498.12,0,0,1,18.58-105.9c26-88.75,72.64-164.9,140.6-227.57q126-116.27,297.21-131.61C645.32-114.57,650.35-113.88,655-115.9Zm377.92,500c0-192.44-156.31-349.49-347.56-350.15-194.13-.68-350.94,155.13-352.29,347.42-1.37,194.55,155.51,352.1,348.56,352.47C876.15,734.23,1032.93,577.84,1032.93,384.11Z' transform='translate(-183.1 115.9)'/%3E%3Cpath class='cls-2' d='M1032.93,384.11c0,193.73-156.78,350.12-351.29,349.74-193-.37-349.93-157.92-348.56-352.47C334.43,189.09,491.24,33.28,685.37,34,876.62,34.62,1032.94,191.67,1032.93,384.11ZM683,496.81q43.74,0,87.48,0c15.55,0,25.32-9.72,25.33-25.21q0-87.48,0-175c0-15.83-9.68-25.46-25.59-25.46H595.77c-15.88,0-25.57,9.64-25.58,25.46q0,87.23,0,174.45c0,16.18,9.59,25.7,25.84,25.71Z' transform='translate(-183.1 115.9)'/%3E%3Cpath class='cls-3' d='M683,496.81H596c-16.25,0-25.84-9.53-25.84-25.71q0-87.23,0-174.45c0-15.82,9.7-25.46,25.58-25.46H770.22c15.91,0,25.59,9.63,25.59,25.46q0,87.47,0,175c0,15.49-9.78,25.2-25.33,25.21Q726.74,496.84,683,496.81Z' transform='translate(-183.1 115.9)'/%3E%3C/svg%3E`
                );
              case 'text':
                return (
                  (r = (0.1 * e).toFixed(2)),
                  `data:image/svg+xml,%3Csvg width='${e}' height='${r}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 528.15 53.64'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%230052ff;%7D%3C/style%3E%3C/defs%3E%3Ctitle%3ECoinbase_Wordmark_SubBrands_ALL%3C/title%3E%3Cpath class='cls-1' d='M164.45,15a15,15,0,0,0-11.74,5.4V0h-8.64V52.92h8.5V48a15,15,0,0,0,11.88,5.62c10.37,0,18.21-8.21,18.21-19.3S174.67,15,164.45,15Zm-1.3,30.67c-6.19,0-10.73-4.83-10.73-11.31S157,23,163.22,23s10.66,4.82,10.66,11.37S169.34,45.65,163.15,45.65Zm83.31-14.91-6.34-.93c-3-.43-5.18-1.44-5.18-3.82,0-2.59,2.8-3.89,6.62-3.89,4.18,0,6.84,1.8,7.42,4.76h8.35c-.94-7.49-6.7-11.88-15.55-11.88-9.15,0-15.2,4.68-15.2,11.3,0,6.34,4,10,12,11.16l6.33.94c3.1.43,4.83,1.65,4.83,4,0,2.95-3,4.17-7.2,4.17-5.12,0-8-2.09-8.43-5.25h-8.49c.79,7.27,6.48,12.38,16.84,12.38,9.44,0,15.7-4.32,15.7-11.74C258.12,35.28,253.58,31.82,246.46,30.74Zm-27.65-2.3c0-8.06-4.9-13.46-15.27-13.46-9.79,0-15.26,5-16.34,12.6h8.57c.43-3,2.73-5.4,7.63-5.4,4.39,0,6.55,1.94,6.55,4.32,0,3.09-4,3.88-8.85,4.39-6.63.72-14.84,3-14.84,11.66,0,6.7,5,11,12.89,11,6.19,0,10.08-2.59,12-6.7.28,3.67,3,6.05,6.84,6.05h5v-7.7h-4.25Zm-8.5,9.36c0,5-4.32,8.64-9.57,8.64-3.24,0-6-1.37-6-4.25,0-3.67,4.39-4.68,8.42-5.11s6-1.22,7.13-2.88ZM281.09,15c-11.09,0-19.23,8.35-19.23,19.36,0,11.6,8.72,19.3,19.37,19.3,9,0,16.06-5.33,17.86-12.89h-9c-1.3,3.31-4.47,5.19-8.71,5.19-5.55,0-9.72-3.46-10.66-9.51H299.3V33.12C299.3,22.46,291.53,15,281.09,15Zm-9.87,15.26c1.37-5.18,5.26-7.7,9.72-7.7,4.9,0,8.64,2.8,9.51,7.7ZM19.3,23a9.84,9.84,0,0,1,9.5,7h9.14c-1.65-8.93-9-15-18.57-15A19,19,0,0,0,0,34.34c0,11.09,8.28,19.3,19.37,19.3,9.36,0,16.85-6,18.5-15H28.8a9.75,9.75,0,0,1-9.43,7.06c-6.27,0-10.66-4.83-10.66-11.31S13,23,19.3,23Zm41.11-8A19,19,0,0,0,41,34.34c0,11.09,8.28,19.3,19.37,19.3A19,19,0,0,0,79.92,34.27C79.92,23.33,71.64,15,60.41,15Zm.07,30.67c-6.19,0-10.73-4.83-10.73-11.31S54.22,23,60.41,23s10.8,4.89,10.8,11.37S66.67,45.65,60.48,45.65ZM123.41,15c-5.62,0-9.29,2.3-11.45,5.54V15.7h-8.57V52.92H112V32.69C112,27,115.63,23,121,23c5,0,8.06,3.53,8.06,8.64V52.92h8.64V31C137.66,21.6,132.84,15,123.41,15ZM92,.36a5.36,5.36,0,0,0-5.55,5.47,5.55,5.55,0,0,0,11.09,0A5.35,5.35,0,0,0,92,.36Zm-9.72,23h5.4V52.92h8.64V15.7h-14Zm298.17-7.7L366.2,52.92H372L375.29,44H392l3.33,8.88h6L386.87,15.7ZM377,39.23l6.45-17.56h.1l6.56,17.56ZM362.66,15.7l-7.88,29h-.11l-8.14-29H341l-8,28.93h-.1l-8-28.87H319L329.82,53h5.45l8.19-29.24h.11L352,53h5.66L368.1,15.7Zm135.25,0v4.86h12.32V52.92h5.6V20.56h12.32V15.7ZM467.82,52.92h25.54V48.06H473.43v-12h18.35V31.35H473.43V20.56h19.93V15.7H467.82ZM443,15.7h-5.6V52.92h24.32V48.06H443Zm-30.45,0h-5.61V52.92h24.32V48.06H412.52Z'/%3E%3C/svg%3E`
                );
              case 'textWithLogo':
                return (
                  (r = (0.25 * e).toFixed(2)),
                  `data:image/svg+xml,%3Csvg width='${e}' height='${r}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 308.44 77.61'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%230052ff;%7D%3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='M142.94,20.2l-7.88,29H135l-8.15-29h-5.55l-8,28.93h-.11l-8-28.87H99.27l10.84,37.27h5.44l8.2-29.24h.1l8.41,29.24h5.66L148.39,20.2Zm17.82,0L146.48,57.42h5.82l3.28-8.88h16.65l3.34,8.88h6L167.16,20.2Zm-3.44,23.52,6.45-17.55h.11l6.56,17.55ZM278.2,20.2v4.86h12.32V57.42h5.6V25.06h12.32V20.2ZM248.11,57.42h25.54V52.55H253.71V40.61h18.35V35.85H253.71V25.06h19.94V20.2H248.11ZM223.26,20.2h-5.61V57.42H242V52.55H223.26Zm-30.46,0h-5.6V57.42h24.32V52.55H192.8Zm-154,38A19.41,19.41,0,1,1,57.92,35.57H77.47a38.81,38.81,0,1,0,0,6.47H57.92A19.39,19.39,0,0,1,38.81,58.21Z'/%3E%3C/svg%3E`
                );
              case 'textLight':
                return (
                  (r = (0.1 * e).toFixed(2)),
                  `data:image/svg+xml,%3Csvg width='${e}' height='${r}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 528.15 53.64'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%23fefefe;%7D%3C/style%3E%3C/defs%3E%3Ctitle%3ECoinbase_Wordmark_SubBrands_ALL%3C/title%3E%3Cpath class='cls-1' d='M164.45,15a15,15,0,0,0-11.74,5.4V0h-8.64V52.92h8.5V48a15,15,0,0,0,11.88,5.62c10.37,0,18.21-8.21,18.21-19.3S174.67,15,164.45,15Zm-1.3,30.67c-6.19,0-10.73-4.83-10.73-11.31S157,23,163.22,23s10.66,4.82,10.66,11.37S169.34,45.65,163.15,45.65Zm83.31-14.91-6.34-.93c-3-.43-5.18-1.44-5.18-3.82,0-2.59,2.8-3.89,6.62-3.89,4.18,0,6.84,1.8,7.42,4.76h8.35c-.94-7.49-6.7-11.88-15.55-11.88-9.15,0-15.2,4.68-15.2,11.3,0,6.34,4,10,12,11.16l6.33.94c3.1.43,4.83,1.65,4.83,4,0,2.95-3,4.17-7.2,4.17-5.12,0-8-2.09-8.43-5.25h-8.49c.79,7.27,6.48,12.38,16.84,12.38,9.44,0,15.7-4.32,15.7-11.74C258.12,35.28,253.58,31.82,246.46,30.74Zm-27.65-2.3c0-8.06-4.9-13.46-15.27-13.46-9.79,0-15.26,5-16.34,12.6h8.57c.43-3,2.73-5.4,7.63-5.4,4.39,0,6.55,1.94,6.55,4.32,0,3.09-4,3.88-8.85,4.39-6.63.72-14.84,3-14.84,11.66,0,6.7,5,11,12.89,11,6.19,0,10.08-2.59,12-6.7.28,3.67,3,6.05,6.84,6.05h5v-7.7h-4.25Zm-8.5,9.36c0,5-4.32,8.64-9.57,8.64-3.24,0-6-1.37-6-4.25,0-3.67,4.39-4.68,8.42-5.11s6-1.22,7.13-2.88ZM281.09,15c-11.09,0-19.23,8.35-19.23,19.36,0,11.6,8.72,19.3,19.37,19.3,9,0,16.06-5.33,17.86-12.89h-9c-1.3,3.31-4.47,5.19-8.71,5.19-5.55,0-9.72-3.46-10.66-9.51H299.3V33.12C299.3,22.46,291.53,15,281.09,15Zm-9.87,15.26c1.37-5.18,5.26-7.7,9.72-7.7,4.9,0,8.64,2.8,9.51,7.7ZM19.3,23a9.84,9.84,0,0,1,9.5,7h9.14c-1.65-8.93-9-15-18.57-15A19,19,0,0,0,0,34.34c0,11.09,8.28,19.3,19.37,19.3,9.36,0,16.85-6,18.5-15H28.8a9.75,9.75,0,0,1-9.43,7.06c-6.27,0-10.66-4.83-10.66-11.31S13,23,19.3,23Zm41.11-8A19,19,0,0,0,41,34.34c0,11.09,8.28,19.3,19.37,19.3A19,19,0,0,0,79.92,34.27C79.92,23.33,71.64,15,60.41,15Zm.07,30.67c-6.19,0-10.73-4.83-10.73-11.31S54.22,23,60.41,23s10.8,4.89,10.8,11.37S66.67,45.65,60.48,45.65ZM123.41,15c-5.62,0-9.29,2.3-11.45,5.54V15.7h-8.57V52.92H112V32.69C112,27,115.63,23,121,23c5,0,8.06,3.53,8.06,8.64V52.92h8.64V31C137.66,21.6,132.84,15,123.41,15ZM92,.36a5.36,5.36,0,0,0-5.55,5.47,5.55,5.55,0,0,0,11.09,0A5.35,5.35,0,0,0,92,.36Zm-9.72,23h5.4V52.92h8.64V15.7h-14Zm298.17-7.7L366.2,52.92H372L375.29,44H392l3.33,8.88h6L386.87,15.7ZM377,39.23l6.45-17.56h.1l6.56,17.56ZM362.66,15.7l-7.88,29h-.11l-8.14-29H341l-8,28.93h-.1l-8-28.87H319L329.82,53h5.45l8.19-29.24h.11L352,53h5.66L368.1,15.7Zm135.25,0v4.86h12.32V52.92h5.6V20.56h12.32V15.7ZM467.82,52.92h25.54V48.06H473.43v-12h18.35V31.35H473.43V20.56h19.93V15.7H467.82ZM443,15.7h-5.6V52.92h24.32V48.06H443Zm-30.45,0h-5.61V52.92h24.32V48.06H412.52Z'/%3E%3C/svg%3E`
                );
              case 'textWithLogoLight':
                return (
                  (r = (0.25 * e).toFixed(2)),
                  `data:image/svg+xml,%3Csvg width='${e}' height='${r}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 308.44 77.61'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%23fefefe;%7D%3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='M142.94,20.2l-7.88,29H135l-8.15-29h-5.55l-8,28.93h-.11l-8-28.87H99.27l10.84,37.27h5.44l8.2-29.24h.1l8.41,29.24h5.66L148.39,20.2Zm17.82,0L146.48,57.42h5.82l3.28-8.88h16.65l3.34,8.88h6L167.16,20.2Zm-3.44,23.52,6.45-17.55h.11l6.56,17.55ZM278.2,20.2v4.86h12.32V57.42h5.6V25.06h12.32V20.2ZM248.11,57.42h25.54V52.55H253.71V40.61h18.35V35.85H253.71V25.06h19.94V20.2H248.11ZM223.26,20.2h-5.61V57.42H242V52.55H223.26Zm-30.46,0h-5.6V57.42h24.32V52.55H192.8Zm-154,38A19.41,19.41,0,1,1,57.92,35.57H77.47a38.81,38.81,0,1,0,0,6.47H57.92A19.39,19.39,0,0,1,38.81,58.21Z'/%3E%3C/svg%3E`
                );
            }
          });
      },
      8202: (t, e, r) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }), (e.LinkFlow = void 0);
        const n = r(6400),
          i = r(4143),
          o = r(101);
        e.LinkFlow = class {
          constructor(t) {
            (this.extensionUI$ = new i.BehaviorSubject({})),
              (this.subscriptions = new i.Subscription()),
              (this.isConnected = !1),
              (this.isOpen = !1),
              (this.onCancel = null),
              (this.root = null),
              (this.connectDisabled = !1),
              (this.darkMode = t.darkMode),
              (this.version = t.version),
              (this.sessionId = t.sessionId),
              (this.sessionSecret = t.sessionSecret),
              (this.linkAPIUrl = t.linkAPIUrl),
              (this.isParentConnection = t.isParentConnection),
              (this.connected$ = t.connected$);
          }
          attach(t) {
            (this.root = document.createElement('div')),
              (this.root.className = '-cbwsdk-link-flow-root'),
              t.appendChild(this.root),
              this.render(),
              this.subscriptions.add(
                this.connected$.subscribe((t) => {
                  this.isConnected !== t && ((this.isConnected = t), this.render());
                }),
              );
          }
          detach() {
            var t;
            this.root &&
              (this.subscriptions.unsubscribe(),
              (0, n.render)(null, this.root),
              null === (t = this.root.parentElement) || void 0 === t || t.removeChild(this.root));
          }
          setConnectDisabled(t) {
            this.connectDisabled = t;
          }
          open(t) {
            (this.isOpen = !0), (this.onCancel = t.onCancel), this.render();
          }
          close() {
            (this.isOpen = !1), (this.onCancel = null), this.render();
          }
          render() {
            if (!this.root) return;
            const t = this.extensionUI$.subscribe(() => {
              this.root &&
                (0, n.render)(
                  (0, n.h)(o.TryExtensionLinkDialog, {
                    darkMode: this.darkMode,
                    version: this.version,
                    sessionId: this.sessionId,
                    sessionSecret: this.sessionSecret,
                    linkAPIUrl: this.linkAPIUrl,
                    isOpen: this.isOpen,
                    isConnected: this.isConnected,
                    isParentConnection: this.isParentConnection,
                    onCancel: this.onCancel,
                    connectDisabled: this.connectDisabled,
                  }),
                  this.root,
                );
            });
            this.subscriptions.add(t);
          }
        };
      },
      381: function (t, e, r) {
        'use strict';
        var n = r(8764).Buffer,
          i =
            (this && this.__importDefault) ||
            function (t) {
              return t && t.__esModule ? t : { default: t };
            };
        Object.defineProperty(e, '__esModule', { value: !0 }), (e.QRCode = void 0);
        const o = r(6400),
          s = r(396),
          a = i(r(7713));
        e.QRCode = (t) => {
          const [e, r] = (0, s.useState)('');
          return (
            (0, s.useEffect)(() => {
              var e, i;
              const o = new a.default({
                  content: t.content,
                  background: t.bgColor || '#ffffff',
                  color: t.fgColor || '#000000',
                  container: 'svg',
                  ecl: 'M',
                  width: null !== (e = t.width) && void 0 !== e ? e : 256,
                  height: null !== (i = t.height) && void 0 !== i ? i : 256,
                  padding: 0,
                  image: t.image,
                }),
                s = n.from(o.svg(), 'utf8').toString('base64');
              r(`data:image/svg+xml;base64,${s}`);
            }),
            e ? (0, o.h)('img', { src: e, alt: 'QR Code' }) : null
          );
        };
      },
      2193: (t, e) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.default =
            '.-cbwsdk-css-reset .-gear-container{margin-left:16px !important;margin-right:9px !important;display:flex;align-items:center;justify-content:center;width:24px;height:24px;transition:opacity .25s}.-cbwsdk-css-reset .-gear-container *{user-select:none}.-cbwsdk-css-reset .-gear-container svg{opacity:0;position:absolute}.-cbwsdk-css-reset .-gear-icon{height:12px;width:12px;z-index:10000}.-cbwsdk-css-reset .-cbwsdk-snackbar{align-items:flex-end;display:flex;flex-direction:column;position:fixed;right:0;top:0;z-index:2147483647}.-cbwsdk-css-reset .-cbwsdk-snackbar *{user-select:none}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance{display:flex;flex-direction:column;margin:8px 16px 0 16px;overflow:visible;text-align:left;transform:translateX(0);transition:opacity .25s,transform .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header:hover .-gear-container svg{opacity:1}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header{display:flex;align-items:center;background:#fff;overflow:hidden;border:1px solid #e7ebee;box-sizing:border-box;border-radius:8px;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header-cblogo{margin:8px 8px 8px 8px}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header *{cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header-message{color:#000;font-size:13px;line-height:1.5;user-select:none}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu{background:#fff;transition:opacity .25s ease-in-out,transform .25s linear,visibility 0s;visibility:hidden;border:1px solid #e7ebee;box-sizing:border-box;border-radius:8px;opacity:0;flex-direction:column;padding-left:8px;padding-right:8px}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:last-child{margin-bottom:8px !important}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:hover{background:#f5f7f8;border-radius:6px;transition:background .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:hover span{color:#050f19;transition:color .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:hover svg path{fill:#000;transition:fill .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item{visibility:inherit;height:35px;margin-top:8px;margin-bottom:0;display:flex;flex-direction:row;align-items:center;padding:8px;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item *{visibility:inherit;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover{background:rgba(223,95,103,.2);transition:background .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover *{cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover svg path{fill:#df5f67;transition:fill .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover span{color:#df5f67;transition:color .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-info{color:#aaa;font-size:13px;margin:0 8px 0 32px;position:absolute}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-hidden{opacity:0;text-align:left;transform:translateX(25%);transition:opacity .5s linear}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-expanded .-cbwsdk-snackbar-instance-menu{opacity:1;display:flex;transform:translateY(8px);visibility:visible}');
      },
      9934: function (t, e, r) {
        'use strict';
        var n =
          (this && this.__importDefault) ||
          function (t) {
            return t && t.__esModule ? t : { default: t };
          };
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.SnackbarInstance = e.SnackbarContainer = e.Snackbar = void 0);
        const i = n(r(6010)),
          o = r(6400),
          s = r(396),
          a = n(r(2193));
        (e.Snackbar = class {
          constructor(t) {
            (this.items = new Map()), (this.nextItemKey = 0), (this.root = null), (this.darkMode = t.darkMode);
          }
          attach(t) {
            (this.root = document.createElement('div')),
              (this.root.className = '-cbwsdk-snackbar-root'),
              t.appendChild(this.root),
              this.render();
          }
          presentItem(t) {
            const e = this.nextItemKey++;
            return (
              this.items.set(e, t),
              this.render(),
              () => {
                this.items.delete(e), this.render();
              }
            );
          }
          clear() {
            this.items.clear(), this.render();
          }
          render() {
            this.root &&
              (0, o.render)(
                (0, o.h)(
                  'div',
                  null,
                  (0, o.h)(
                    e.SnackbarContainer,
                    { darkMode: this.darkMode },
                    Array.from(this.items.entries()).map(([t, r]) =>
                      (0, o.h)(e.SnackbarInstance, Object.assign({}, r, { key: t })),
                    ),
                  ),
                ),
                this.root,
              );
          }
        }),
          (e.SnackbarContainer = (t) =>
            (0, o.h)(
              'div',
              { class: (0, i.default)('-cbwsdk-snackbar-container') },
              (0, o.h)('style', null, a.default),
              (0, o.h)('div', { class: '-cbwsdk-snackbar' }, t.children),
            )),
          (e.SnackbarInstance = ({ autoExpand: t, message: e, menuItems: r }) => {
            const [n, a] = (0, s.useState)(!0),
              [u, c] = (0, s.useState)(null != t && t);
            return (
              (0, s.useEffect)(() => {
                const t = [
                  window.setTimeout(() => {
                    a(!1);
                  }, 1),
                  window.setTimeout(() => {
                    c(!0);
                  }, 1e4),
                ];
                return () => {
                  t.forEach(window.clearTimeout);
                };
              }),
              (0, o.h)(
                'div',
                {
                  class: (0, i.default)(
                    '-cbwsdk-snackbar-instance',
                    n && '-cbwsdk-snackbar-instance-hidden',
                    u && '-cbwsdk-snackbar-instance-expanded',
                  ),
                },
                (0, o.h)(
                  'div',
                  {
                    class: '-cbwsdk-snackbar-instance-header',
                    onClick: () => {
                      c(!u);
                    },
                  },
                  (0, o.h)('img', {
                    src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEuNDkyIDEwLjQxOWE4LjkzIDguOTMgMCAwMTguOTMtOC45M2gxMS4xNjNhOC45MyA4LjkzIDAgMDE4LjkzIDguOTN2MTEuMTYzYTguOTMgOC45MyAwIDAxLTguOTMgOC45M0gxMC40MjJhOC45MyA4LjkzIDAgMDEtOC45My04LjkzVjEwLjQxOXoiIGZpbGw9IiMxNjUyRjAiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEwLjQxOSAwSDIxLjU4QzI3LjMzNSAwIDMyIDQuNjY1IDMyIDEwLjQxOVYyMS41OEMzMiAyNy4zMzUgMjcuMzM1IDMyIDIxLjU4MSAzMkgxMC40MkM0LjY2NSAzMiAwIDI3LjMzNSAwIDIxLjU4MVYxMC40MkMwIDQuNjY1IDQuNjY1IDAgMTAuNDE5IDB6bTAgMS40ODhhOC45MyA4LjkzIDAgMDAtOC45MyA4LjkzdjExLjE2M2E4LjkzIDguOTMgMCAwMDguOTMgOC45M0gyMS41OGE4LjkzIDguOTMgMCAwMDguOTMtOC45M1YxMC40MmE4LjkzIDguOTMgMCAwMC04LjkzLTguOTNIMTAuNDJ6IiBmaWxsPSIjZmZmIi8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNS45OTggMjYuMDQ5Yy01LjU0OSAwLTEwLjA0Ny00LjQ5OC0xMC4wNDctMTAuMDQ3IDAtNS41NDggNC40OTgtMTAuMDQ2IDEwLjA0Ny0xMC4wNDYgNS41NDggMCAxMC4wNDYgNC40OTggMTAuMDQ2IDEwLjA0NiAwIDUuNTQ5LTQuNDk4IDEwLjA0Ny0xMC4wNDYgMTAuMDQ3eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xMi43NjIgMTQuMjU0YzAtLjgyMi42NjctMS40ODkgMS40ODktMS40ODloMy40OTdjLjgyMiAwIDEuNDg4LjY2NiAxLjQ4OCAxLjQ4OXYzLjQ5N2MwIC44MjItLjY2NiAxLjQ4OC0xLjQ4OCAxLjQ4OGgtMy40OTdhMS40ODggMS40ODggMCAwMS0xLjQ4OS0xLjQ4OHYtMy40OTh6IiBmaWxsPSIjMTY1MkYwIi8+PC9zdmc+',
                    class: '-cbwsdk-snackbar-instance-header-cblogo',
                  }),
                  (0, o.h)('div', { class: '-cbwsdk-snackbar-instance-header-message' }, e),
                  (0, o.h)(
                    'div',
                    { class: '-gear-container' },
                    !u &&
                      (0, o.h)(
                        'svg',
                        {
                          width: '24',
                          height: '24',
                          viewBox: '0 0 24 24',
                          fill: 'none',
                          xmlns: 'http://www.w3.org/2000/svg',
                        },
                        (0, o.h)('circle', { cx: '12', cy: '12', r: '12', fill: '#F5F7F8' }),
                      ),
                    (0, o.h)('img', {
                      src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyIDYuNzV2LTEuNWwtMS43Mi0uNTdjLS4wOC0uMjctLjE5LS41Mi0uMzItLjc3bC44MS0xLjYyLTEuMDYtMS4wNi0xLjYyLjgxYy0uMjQtLjEzLS41LS4yNC0uNzctLjMyTDYuNzUgMGgtMS41bC0uNTcgMS43MmMtLjI3LjA4LS41My4xOS0uNzcuMzJsLTEuNjItLjgxLTEuMDYgMS4wNi44MSAxLjYyYy0uMTMuMjQtLjI0LjUtLjMyLjc3TDAgNS4yNXYxLjVsMS43Mi41N2MuMDguMjcuMTkuNTMuMzIuNzdsLS44MSAxLjYyIDEuMDYgMS4wNiAxLjYyLS44MWMuMjQuMTMuNS4yMy43Ny4zMkw1LjI1IDEyaDEuNWwuNTctMS43MmMuMjctLjA4LjUyLS4xOS43Ny0uMzJsMS42Mi44MSAxLjA2LTEuMDYtLjgxLTEuNjJjLjEzLS4yNC4yMy0uNS4zMi0uNzdMMTIgNi43NXpNNiA4LjVhMi41IDIuNSAwIDAxMC01IDIuNSAyLjUgMCAwMTAgNXoiIGZpbGw9IiMwNTBGMTkiLz48L3N2Zz4=',
                      class: '-gear-icon',
                      title: 'Expand',
                    }),
                  ),
                ),
                r &&
                  r.length > 0 &&
                  (0, o.h)(
                    'div',
                    { class: '-cbwsdk-snackbar-instance-menu' },
                    r.map((t, e) =>
                      (0, o.h)(
                        'div',
                        {
                          class: (0, i.default)(
                            '-cbwsdk-snackbar-instance-menu-item',
                            t.isRed && '-cbwsdk-snackbar-instance-menu-item-is-red',
                          ),
                          onClick: t.onClick,
                          key: e,
                        },
                        (0, o.h)(
                          'svg',
                          {
                            width: t.svgWidth,
                            height: t.svgHeight,
                            viewBox: '0 0 10 11',
                            fill: 'none',
                            xmlns: 'http://www.w3.org/2000/svg',
                          },
                          (0, o.h)('path', {
                            'fill-rule': t.defaultFillRule,
                            'clip-rule': t.defaultClipRule,
                            d: t.path,
                            fill: '#AAAAAA',
                          }),
                        ),
                        (0, o.h)(
                          'span',
                          {
                            class: (0, i.default)(
                              '-cbwsdk-snackbar-instance-menu-item-info',
                              t.isRed && '-cbwsdk-snackbar-instance-menu-item-info-is-red',
                            ),
                          },
                          t.info,
                        ),
                      ),
                    ),
                  ),
              )
            );
          });
      },
      1964: (t, e) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.default =
            '.-cbwsdk-css-reset .-cbwsdk-spinner{display:inline-block}.-cbwsdk-css-reset .-cbwsdk-spinner svg{display:inline-block;animation:2s linear infinite -cbwsdk-spinner-svg}.-cbwsdk-css-reset .-cbwsdk-spinner svg circle{animation:1.9s ease-in-out infinite both -cbwsdk-spinner-circle;display:block;fill:rgba(0,0,0,0);stroke-dasharray:283;stroke-dashoffset:280;stroke-linecap:round;stroke-width:10px;transform-origin:50% 50%}@keyframes -cbwsdk-spinner-svg{0%{transform:rotateZ(0deg)}100%{transform:rotateZ(360deg)}}@keyframes -cbwsdk-spinner-circle{0%,25%{stroke-dashoffset:280;transform:rotate(0)}50%,75%{stroke-dashoffset:75;transform:rotate(45deg)}100%{stroke-dashoffset:280;transform:rotate(360deg)}}');
      },
      6148: function (t, e, r) {
        'use strict';
        var n =
          (this && this.__importDefault) ||
          function (t) {
            return t && t.__esModule ? t : { default: t };
          };
        Object.defineProperty(e, '__esModule', { value: !0 }), (e.Spinner = void 0);
        const i = r(6400),
          o = n(r(1964));
        e.Spinner = (t) => {
          var e;
          const r = null !== (e = t.size) && void 0 !== e ? e : 64,
            n = t.color || '#000';
          return (0, i.h)(
            'div',
            { class: '-cbwsdk-spinner' },
            (0, i.h)('style', null, o.default),
            (0, i.h)(
              'svg',
              { viewBox: '0 0 100 100', xmlns: 'http://www.w3.org/2000/svg', style: { width: r, height: r } },
              (0, i.h)('circle', { style: { cx: 50, cy: 50, r: 45, stroke: n } }),
            ),
          );
        };
      },
      421: (t, e) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.default =
            '.-cbwsdk-css-reset .-cbwsdk-extension-dialog{z-index:2147483647;position:fixed;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-backdrop{z-index:2147483647;position:fixed;top:0;left:0;right:0;bottom:0;transition:opacity .25s}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-backdrop.light{background-color:rgba(0,0,0,.5)}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-backdrop.dark{background-color:rgba(50,53,61,.4)}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-backdrop-hidden{opacity:0}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box{display:flex;position:relative;max-width:500px;flex-direction:column;transform:scale(1);transition:opacity .25s,transform .25s}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-hidden{opacity:0;transform:scale(0.85)}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-top{display:flex;flex-direction:row;border-radius:8px;overflow:hidden;min-height:300px}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-top.dark{color:#fff;background-color:#000;box-shadow:0 4px 16px rgba(255,255,255,.05)}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-top.light{background-color:#fff}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-top-subtext{margin-top:15px;font-size:12px;line-height:1.5}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-top-install-region{display:flex;flex-basis:50%;flex-direction:column;justify-content:center;padding:32px}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-top-install-region button{display:block;border-radius:8px;background-color:#1652f0;color:#fff;width:90%;min-width:fit-content;height:44px;margin-top:16px;font-size:16px;padding-left:16px;padding-right:16px;cursor:pointer;font-weight:500;text-align:center}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-top-install-region button.dark{background-color:#3773f5}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-top-info-region{display:flex;flex-basis:50%;flex-direction:column;justify-content:center}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-top-info-region.light{background-color:#fafbfc}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-top-info-region.dark{background-color:#141519}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-top-description{display:flex;flex-direction:row;align-items:center;padding-top:14px;padding-bottom:14px;padding-left:24px;padding-right:32px}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-top-description-icon-wrapper{display:block;position:relative;width:40px;height:40px;flex-shrink:0;flex-grow:0;border-radius:20px;background-color:#fff;box-shadow:0px 0px 8px rgba(0,0,0,.04),0px 16px 24px rgba(0,0,0,.06)}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-top-description-icon-wrapper img{position:absolute;top:0;bottom:0;left:0;right:0;margin:auto}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-top-description-text{margin-left:16px;flex-grow:1;font-size:13px;line-height:19px;align-self:center}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-top-description-text.light{color:#000}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-top-description-text.dark{color:#fff}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-bottom{display:flex;flex-direction:row;overflow:hidden;border-radius:8px;margin-top:8px}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-bottom.light{background-color:#fff}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-bottom.dark{background-color:#000;box-shadow:0 4px 16px rgba(255,255,255,.05)}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-bottom-description-region{display:flex;flex-direction:column;justify-content:center;padding:32px;flex-grow:1}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-bottom-description{font-size:13px;line-height:19px;margin-top:12px;color:#aaa}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-bottom-description.dark{color:#fff}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-bottom-description.dark a{color:#3773f5}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-bottom-description a{font-size:inherit;line-height:inherit;color:#1652f0;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-bottom-qr-region{position:relative;flex-shrink:0;display:flex;flex-direction:column;justify-content:center;padding-left:24px;padding-right:24px;padding-top:16px;padding-bottom:16px}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-bottom-qr-wrapper{position:relative;display:block;padding:8px;border-radius:8px;box-shadow:0px 4px 12px rgba(0,0,0,.1);background-color:#fff}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-bottom-qr-wrapper img{display:block}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-bottom-qr-connecting{position:absolute;top:0;bottom:0;left:0;right:0;display:flex;flex-direction:column;align-items:center;justify-content:center}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-bottom-qr-connecting.light{background-color:rgba(255,255,255,.95)}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-bottom-qr-connecting.light>p{color:#000}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-bottom-qr-connecting.dark{background-color:rgba(20,21,25,.9)}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-bottom-qr-connecting.dark>p{color:#fff}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-bottom-qr-connecting>p{font-size:12px;font-weight:bold;margin-top:16px}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-cancel{position:absolute;-webkit-appearance:none;display:flex;align-items:center;justify-content:center;top:16px;right:16px;width:24px;height:24px;border-radius:12px;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-cancel.light{background-color:#fafbfc}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-cancel.dark{background-color:#141519}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-cancel-x{position:relative;display:block;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-cancel-x.light::before,.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-cancel-x.light::after{background-color:#000}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-cancel-x.dark::before,.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-cancel-x.dark::after{background-color:#fff}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-cancel-x::before,.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-cancel-x::after{content:"";position:absolute;display:block;top:-1px;left:-7px;width:14px;height:1px;transition:background-color .2s}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-cancel-x::before{transform:rotate(45deg)}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-cancel-x::after{transform:rotate(135deg)}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-cancel:hover .-cbwsdk-link-dialog-box-cancel-x-a,.-cbwsdk-css-reset .-cbwsdk-extension-dialog-box-cancel:hover .-cbwsdk-link-dialog-box-cancel-x-b{background-color:#000}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-container{display:block}.-cbwsdk-css-reset .-cbwsdk-extension-dialog-container-hidden{display:none}.-cbwsdk-css-reset .-cbwsdk-extension-dialog h2{display:block;text-align:left;font-size:22px;font-weight:600;line-height:28px}.-cbwsdk-css-reset .-cbwsdk-extension-dialog h2.light{color:#000}.-cbwsdk-css-reset .-cbwsdk-extension-dialog h2.dark{color:#fff}');
      },
      101: function (t, e, r) {
        'use strict';
        var n =
          (this && this.__importDefault) ||
          function (t) {
            return t && t.__esModule ? t : { default: t };
          };
        Object.defineProperty(e, '__esModule', { value: !0 }), (e.TryExtensionLinkDialog = void 0);
        const i = n(r(6010)),
          o = r(6400),
          s = r(396),
          a = r(4643),
          u = r(3604),
          c = n(r(4744)),
          l = n(r(4475)),
          h = n(r(8714)),
          f = n(r(8196)),
          d = r(381),
          p = r(6148),
          y = n(r(421));
        e.TryExtensionLinkDialog = (t) => {
          const { isOpen: e, darkMode: r } = t,
            [n, a] = (0, s.useState)(!e),
            [u, c] = (0, s.useState)(!e);
          (0, s.useEffect)(() => {
            const t = [
              window.setTimeout(() => {
                c(!e);
              }, 10),
            ];
            return (
              e
                ? a(!1)
                : t.push(
                    window.setTimeout(() => {
                      a(!0);
                    }, 360),
                  ),
              () => {
                t.forEach(window.clearTimeout);
              }
            );
          }, [t.isOpen]);
          const l = r ? 'dark' : 'light';
          return (0, o.h)(
            'div',
            {
              class: (0, i.default)(
                '-cbwsdk-extension-dialog-container',
                n && '-cbwsdk-extension-dialog-container-hidden',
              ),
            },
            (0, o.h)('style', null, y.default),
            (0, o.h)('div', {
              class: (0, i.default)(
                '-cbwsdk-extension-dialog-backdrop',
                l,
                u && '-cbwsdk-extension-dialog-backdrop-hidden',
              ),
            }),
            (0, o.h)(
              'div',
              { class: '-cbwsdk-extension-dialog' },
              (0, o.h)(
                'div',
                { class: (0, i.default)('-cbwsdk-extension-dialog-box', u && '-cbwsdk-extension-dialog-box-hidden') },
                (0, o.h)(g, {
                  darkMode: r,
                  onInstallClick: () => {
                    window.open('https://api.wallet.coinbase.com/rpc/v2/desktop/chrome', '_blank');
                  },
                }),
                t.connectDisabled
                  ? null
                  : (0, o.h)(b, {
                      darkMode: r,
                      version: t.version,
                      sessionId: t.sessionId,
                      sessionSecret: t.sessionSecret,
                      linkAPIUrl: t.linkAPIUrl,
                      isConnected: t.isConnected,
                      isParentConnection: t.isParentConnection,
                    }),
                t.onCancel && (0, o.h)(v, { darkMode: r, onClick: t.onCancel }),
              ),
            ),
          );
        };
        const g = ({ darkMode: t, onInstallClick: e }) => {
            const [r, n] = (0, s.useState)(!1),
              a = (0, s.useCallback)(() => {
                r ? window.location.reload() : (e(), n(!0));
              }, [e, r]),
              u = t ? 'dark' : 'light';
            return (0, o.h)(
              'div',
              { class: (0, i.default)('-cbwsdk-extension-dialog-box-top', u) },
              (0, o.h)(
                'div',
                { class: '-cbwsdk-extension-dialog-box-top-install-region' },
                (0, o.h)('h2', { class: u }, 'Try the Coinbase Wallet extension'),
                r &&
                  (0, o.h)(
                    'div',
                    { class: '-cbwsdk-extension-dialog-box-top-subtext' },
                    'After installing Coinbase Wallet, refresh the page and connect again.',
                  ),
                (0, o.h)('button', { type: 'button', onClick: a }, r ? 'Refresh' : 'Install'),
              ),
              (0, o.h)(
                'div',
                { class: (0, i.default)('-cbwsdk-extension-dialog-box-top-info-region', u) },
                (0, o.h)(m, { darkMode: t, icon: l.default, text: 'Connect to crypto apps with one click' }),
                (0, o.h)(m, { darkMode: t, icon: h.default, text: 'Your private key is stored securely' }),
                (0, o.h)(m, { darkMode: t, icon: c.default, text: 'Works with Ethereum, Polygon, and more' }),
              ),
            );
          },
          b = (t) => {
            const e = (0, a.createQrUrl)(t.sessionId, t.sessionSecret, t.linkAPIUrl, t.isParentConnection),
              r = t.darkMode ? 'dark' : 'light';
            return (0, o.h)(
              'div',
              { 'data-testid': 'scan-qr-box', class: (0, i.default)('-cbwsdk-extension-dialog-box-bottom', r) },
              (0, o.h)(
                'div',
                { class: '-cbwsdk-extension-dialog-box-bottom-description-region' },
                (0, o.h)('h2', { class: r }, 'Or scan to connect'),
                (0, o.h)(
                  'body',
                  { class: (0, i.default)('-cbwsdk-extension-dialog-box-bottom-description', r) },
                  'Open',
                  ' ',
                  (0, o.h)(
                    'a',
                    { href: 'https://wallet.coinbase.com/', target: '_blank', rel: 'noopener noreferrer' },
                    'Coinbase Wallet',
                  ),
                  ' ',
                  'on your mobile phone and scan',
                ),
              ),
              (0, o.h)(
                'div',
                { class: '-cbwsdk-extension-dialog-box-bottom-qr-region' },
                (0, o.h)(
                  'div',
                  { class: '-cbwsdk-extension-dialog-box-bottom-qr-wrapper' },
                  (0, o.h)(d.QRCode, {
                    content: e,
                    width: 150,
                    height: 150,
                    fgColor: '#000',
                    bgColor: 'transparent',
                    image: { svg: f.default, width: 34, height: 34 },
                  }),
                ),
                (0, o.h)('input', { type: 'hidden', name: 'cbwsdk-version', value: u.LIB_VERSION }),
                (0, o.h)('input', { type: 'hidden', value: e }),
                !t.isConnected &&
                  (0, o.h)(
                    'div',
                    {
                      'data-testid': 'connecting-spinner',
                      class: (0, i.default)('-cbwsdk-extension-dialog-box-bottom-qr-connecting', r),
                    },
                    (0, o.h)(p.Spinner, { size: 36, color: t.darkMode ? '#FFF' : '#000' }),
                    (0, o.h)('p', null, 'Connecting...'),
                  ),
              ),
            );
          },
          m = (t) => {
            const e = t.darkMode ? 'dark' : 'light';
            return (0, o.h)(
              'div',
              { class: '-cbwsdk-extension-dialog-box-top-description' },
              (0, o.h)(
                'div',
                { class: '-cbwsdk-extension-dialog-box-top-description-icon-wrapper' },
                (0, o.h)('img', { src: t.icon }),
              ),
              (0, o.h)(
                'body',
                { class: (0, i.default)('-cbwsdk-extension-dialog-box-top-description-text', e) },
                t.text,
              ),
            );
          },
          v = (t) => {
            const e = t.darkMode ? 'dark' : 'light';
            return (0, o.h)(
              'button',
              { type: 'button', class: (0, i.default)('-cbwsdk-extension-dialog-box-cancel', e), onClick: t.onClick },
              (0, o.h)('div', { class: (0, i.default)('-cbwsdk-extension-dialog-box-cancel-x', e) }),
            );
          };
      },
      8196: (t, e) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.default =
            '<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">\n<circle cx="50" cy="50" r="50" fill="white"/>\n<circle cx="49.9996" cy="49.9996" r="43.6363" fill="#1B53E4"/>\n<circle cx="49.9996" cy="49.9996" r="43.6363" stroke="white"/>\n<path fill-rule="evenodd" clip-rule="evenodd" d="M19.3379 49.9484C19.3379 66.8508 33.04 80.553 49.9425 80.553C66.8449 80.553 80.5471 66.8508 80.5471 49.9484C80.5471 33.0459 66.8449 19.3438 49.9425 19.3438C33.04 19.3438 19.3379 33.0459 19.3379 49.9484ZM44.0817 40.0799C41.8725 40.0799 40.0817 41.8708 40.0817 44.0799V55.8029C40.0817 58.012 41.8725 59.8029 44.0817 59.8029H55.8046C58.0138 59.8029 59.8046 58.012 59.8046 55.8029V44.0799C59.8046 41.8708 58.0138 40.0799 55.8046 40.0799H44.0817Z" fill="white"/>\n</svg>\n\n');
      },
      4744: (t, e) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.default =
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTggMEMzLjU4IDAgMCAzLjU4IDAgOHMzLjU4IDggOCA4IDgtMy41OCA4LTgtMy41OC04LTgtOFptNS45MSA3aC0xLjk0Yy0uMS0xLjU3LS40Mi0zLS45MS00LjE1IDEuNDguODggMi41NSAyLjM4IDIuODUgNC4xNVpNOCAxNGMtLjQ1IDAtMS43Mi0xLjc3LTEuOTUtNWgzLjljLS4yMyAzLjIzLTEuNSA1LTEuOTUgNVpNNi4wNSA3QzYuMjggMy43NyA3LjU1IDIgOCAyYy40NSAwIDEuNzIgMS43NyAxLjk1IDVoLTMuOVpNNC45NCAyLjg1QzQuNDYgNCA0LjEzIDUuNDMgNC4wMyA3SDIuMDljLjMtMS43NyAxLjM3LTMuMjcgMi44NS00LjE1Wk0yLjA5IDloMS45NGMuMSAxLjU3LjQyIDMgLjkxIDQuMTVBNS45OTggNS45OTggMCAwIDEgMi4wOSA5Wm04Ljk3IDQuMTVjLjQ4LTEuMTUuODEtMi41OC45MS00LjE1aDEuOTRhNS45OTggNS45OTggMCAwIDEtMi44NSA0LjE1WiIgZmlsbD0iIzE2NTJGMCIvPjwvc3ZnPg==');
      },
      4475: (t, e) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.default =
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTciIGhlaWdodD0iMTciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE1LjYzNSAyLjExN2EzLjg4OSAzLjg4OSAwIDAgMC01LjUyMSAwTDYuODkgNS4zMzVBMy44OTQgMy44OTQgMCAwIDAgNS44IDguNzM5Yy4wODMuNTA2LjI2OCAxLjAxMS41NTMgMS40NjYuMTUxLjI1My4zMzYuNDcyLjUzNy42OTFsLjYyMS42MjQgMS4xNDEtMS4xNDYtLjYyLS42MjRhMi4xMDUgMi4xMDUgMCAwIDEtLjQ4Ny0uNzQxIDIuMzQgMi4zNCAwIDAgMSAuNTAzLTIuNTFsMy4yMDYtMy4yMmEyLjI5MyAyLjI5MyAwIDAgMSAzLjIzOSAwYy44OS44OTQuODkgMi4zNDMgMCAzLjI1M2wtMS41MjcgMS41MzNjLjIzNC42NC4zMzUgMS4zMzEuMzAyIDIuMDA1bDIuMzgzLTIuMzkyYzEuNTEtMS41MzQgMS40OTMtNC4wMjgtLjAxNy01LjU2MVoiIGZpbGw9IiMxNjUyRjAiLz48cGF0aCBkPSJNMTEuMjcxIDcuNzQ1YTMuMTMgMy4xMyAwIDAgMC0uNTU0LS42OWwtLjYyLS42MjQtMS4xNDIgMS4xNDYuNjIxLjYyM2MuMjE4LjIyLjM4Ni40ODkuNDg3Ljc1OC4zMzUuODI2LjE2NyAxLjgyLS41MDQgMi40OTRsLTMuMjA1IDMuMjE5YTIuMjkzIDIuMjkzIDAgMCAxLTMuMjQgMCAyLjMxNiAyLjMxNiAwIDAgMSAwLTMuMjUybDEuNTI4LTEuNTM0YTQuODE1IDQuODE1IDAgMCAxLS4yODUtMi4wMDVsLTIuMzgzIDIuMzkzYTMuOTI3IDMuOTI3IDAgMCAwIDAgNS41NDQgMy45MDkgMy45MDkgMCAwIDAgNS41MzggMGwzLjIwNS0zLjIxOWEzLjk1OCAzLjk1OCAwIDAgMCAxLjA5MS0zLjQwNCA0LjIxMSA0LjIxMSAwIDAgMC0uNTM3LTEuNDQ5WiIgZmlsbD0iIzE2NTJGMCIvPjwvc3ZnPg==');
      },
      8714: (t, e) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.default =
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgN3Y5aDE0VjdIMVptNy41IDQuMzlWMTRoLTF2LTIuNjFjLS40NC0uMTktLjc1LS42My0uNzUtMS4xNGExLjI1IDEuMjUgMCAwIDEgMi41IDBjMCAuNTEtLjMxLjk1LS43NSAxLjE0Wk01LjY3IDZWNC4zM0M1LjY3IDMuMDUgNi43MSAyIDggMnMyLjMzIDEuMDUgMi4zMyAyLjMzVjZoMlY0LjMzQzEyLjMzIDEuOTQgMTAuMzkgMCA4IDBTMy42NyAxLjk0IDMuNjcgNC4zM1Y2aDJaIiBmaWxsPSIjMTY1MkYwIi8+PC9zdmc+');
      },
      5755: (t, e) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.ClientMessagePublishEvent =
            e.ClientMessageSetSessionConfig =
            e.ClientMessageGetSessionConfig =
            e.ClientMessageIsLinked =
            e.ClientMessageHostSession =
              void 0),
          (e.ClientMessageHostSession = function (t) {
            return Object.assign({ type: 'HostSession' }, t);
          }),
          (e.ClientMessageIsLinked = function (t) {
            return Object.assign({ type: 'IsLinked' }, t);
          }),
          (e.ClientMessageGetSessionConfig = function (t) {
            return Object.assign({ type: 'GetSessionConfig' }, t);
          }),
          (e.ClientMessageSetSessionConfig = function (t) {
            return Object.assign({ type: 'SetSessionConfig' }, t);
          }),
          (e.ClientMessagePublishEvent = function (t) {
            return Object.assign({ type: 'PublishEvent' }, t);
          });
      },
      2191: (t, e) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.EVENTS = void 0),
          (e.EVENTS = {
            STARTED_CONNECTING: 'walletlink_sdk.started.connecting',
            CONNECTED_STATE_CHANGE: 'walletlink_sdk.connected',
            DISCONNECTED: 'walletlink_sdk.disconnected',
            METADATA_DESTROYED: 'walletlink_sdk_metadata_destroyed',
            LINKED: 'walletlink_sdk.linked',
            FAILURE: 'walletlink_sdk.generic_failure',
            SESSION_config_RECEIVED: 'walletlink_sdk.session_config_event_received',
            ETH_ACCOUNTS_STATE: 'walletlink_sdk.eth_accounts_state',
            SESSION_STATE_CHANGE: 'walletlink_sdk.session_state_change',
            UNLINKED_ERROR_STATE: 'walletlink_sdk.unlinked_error_state',
            SKIPPED_CLEARING_SESSION: 'walletlink_sdk.skipped_clearing_session',
            GENERAL_ERROR: 'walletlink_sdk.general_error',
            WEB3_REQUEST: 'walletlink_sdk.web3.request',
            WEB3_REQUEST_PUBLISHED: 'walletlink_sdk.web3.request_published',
            WEB3_RESPONSE: 'walletlink_sdk.web3.response',
            UNKNOWN_ADDRESS_ENCOUNTERED: 'walletlink_sdk.unknown_address_encountered',
          });
      },
      179: (t, e, r) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }), (e.RxWebSocket = e.ConnectionState = void 0);
        const n = r(4143),
          i = r(1717);
        var o;
        !(function (t) {
          (t[(t.DISCONNECTED = 0)] = 'DISCONNECTED'),
            (t[(t.CONNECTING = 1)] = 'CONNECTING'),
            (t[(t.CONNECTED = 2)] = 'CONNECTED');
        })((o = e.ConnectionState || (e.ConnectionState = {}))),
          (e.RxWebSocket = class {
            constructor(t, e = WebSocket) {
              (this.WebSocketClass = e),
                (this.webSocket = null),
                (this.connectionStateSubject = new n.BehaviorSubject(o.DISCONNECTED)),
                (this.incomingDataSubject = new n.Subject()),
                (this.url = t.replace(/^http/, 'ws'));
            }
            connect() {
              return this.webSocket
                ? (0, n.throwError)(new Error('webSocket object is not null'))
                : new n.Observable((t) => {
                    let e;
                    try {
                      this.webSocket = e = new this.WebSocketClass(this.url);
                    } catch (e) {
                      return void t.error(e);
                    }
                    this.connectionStateSubject.next(o.CONNECTING),
                      (e.onclose = (e) => {
                        this.clearWebSocket(),
                          t.error(new Error(`websocket error ${e.code}: ${e.reason}`)),
                          this.connectionStateSubject.next(o.DISCONNECTED);
                      }),
                      (e.onopen = (e) => {
                        t.next(), t.complete(), this.connectionStateSubject.next(o.CONNECTED);
                      }),
                      (e.onmessage = (t) => {
                        this.incomingDataSubject.next(t.data);
                      });
                  }).pipe((0, i.take)(1));
            }
            disconnect() {
              const { webSocket: t } = this;
              if (t) {
                this.clearWebSocket(), this.connectionStateSubject.next(o.DISCONNECTED);
                try {
                  t.close();
                } catch (t) {}
              }
            }
            get connectionState$() {
              return this.connectionStateSubject.asObservable();
            }
            get incomingData$() {
              return this.incomingDataSubject.asObservable();
            }
            get incomingJSONData$() {
              return this.incomingData$.pipe(
                (0, i.flatMap)((t) => {
                  let e;
                  try {
                    e = JSON.parse(t);
                  } catch (t) {
                    return (0, n.empty)();
                  }
                  return (0, n.of)(e);
                }),
              );
            }
            sendData(t) {
              const { webSocket: e } = this;
              if (!e) throw new Error('websocket is not connected');
              e.send(t);
            }
            clearWebSocket() {
              const { webSocket: t } = this;
              t &&
                ((this.webSocket = null),
                (t.onclose = null),
                (t.onerror = null),
                (t.onmessage = null),
                (t.onopen = null));
            }
          });
      },
      6156: (t, e) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.isServerMessageFail = void 0),
          (e.isServerMessageFail = function (t) {
            return (
              t &&
              'Fail' === t.type &&
              'number' == typeof t.id &&
              'string' == typeof t.sessionId &&
              'string' == typeof t.error
            );
          });
      },
      8876: (t, e, r) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }), (e.WalletSDKConnection = void 0);
        const n = r(4143),
          i = r(1717),
          o = r(3526),
          s = r(1295),
          a = r(5755),
          u = r(2191),
          c = r(179),
          l = r(6156);
        e.WalletSDKConnection = class {
          constructor(t, e, r, a, l = WebSocket) {
            (this.sessionId = t),
              (this.sessionKey = e),
              (this.diagnostic = a),
              (this.subscriptions = new n.Subscription()),
              (this.destroyed = !1),
              (this.lastHeartbeatResponse = 0),
              (this.nextReqId = (0, s.IntNumber)(1)),
              (this.connectedSubject = new n.BehaviorSubject(!1)),
              (this.linkedSubject = new n.BehaviorSubject(!1)),
              (this.sessionConfigSubject = new n.ReplaySubject(1));
            const h = new c.RxWebSocket(r + '/rpc', l);
            (this.ws = h),
              this.subscriptions.add(
                h.connectionState$
                  .pipe(
                    (0, i.tap)((e) => {
                      var r;
                      return null === (r = this.diagnostic) || void 0 === r
                        ? void 0
                        : r.log(u.EVENTS.CONNECTED_STATE_CHANGE, { state: e, sessionIdHash: o.Session.hash(t) });
                    }),
                    (0, i.skip)(1),
                    (0, i.filter)((t) => t === c.ConnectionState.DISCONNECTED && !this.destroyed),
                    (0, i.delay)(5e3),
                    (0, i.filter)((t) => !this.destroyed),
                    (0, i.flatMap)((t) => h.connect()),
                    (0, i.retry)(),
                  )
                  .subscribe(),
              ),
              this.subscriptions.add(
                h.connectionState$
                  .pipe(
                    (0, i.skip)(2),
                    (0, i.switchMap)((t) =>
                      (0, n.iif)(
                        () => t === c.ConnectionState.CONNECTED,
                        this.authenticate().pipe(
                          (0, i.tap)((t) => this.sendIsLinked()),
                          (0, i.tap)((t) => this.sendGetSessionConfig()),
                          (0, i.map)((t) => !0),
                        ),
                        (0, n.of)(!1),
                      ),
                    ),
                    (0, i.distinctUntilChanged)(),
                    (0, i.catchError)((t) => (0, n.of)(!1)),
                  )
                  .subscribe((t) => this.connectedSubject.next(t)),
              ),
              this.subscriptions.add(
                h.connectionState$
                  .pipe(
                    (0, i.skip)(1),
                    (0, i.switchMap)((t) => (0, n.iif)(() => t === c.ConnectionState.CONNECTED, (0, n.timer)(0, 1e4))),
                  )
                  .subscribe((t) => (0 === t ? this.updateLastHeartbeat() : this.heartbeat())),
              ),
              this.subscriptions.add(
                h.incomingData$.pipe((0, i.filter)((t) => 'h' === t)).subscribe((t) => this.updateLastHeartbeat()),
              ),
              this.subscriptions.add(
                h.incomingJSONData$
                  .pipe((0, i.filter)((t) => ['IsLinkedOK', 'Linked'].includes(t.type)))
                  .subscribe((e) => {
                    var r;
                    const n = e;
                    null === (r = this.diagnostic) ||
                      void 0 === r ||
                      r.log(u.EVENTS.LINKED, {
                        sessionIdHash: o.Session.hash(t),
                        linked: n.linked,
                        type: e.type,
                        onlineGuests: n.onlineGuests,
                      }),
                      this.linkedSubject.next(n.linked || n.onlineGuests > 0);
                  }),
              ),
              this.subscriptions.add(
                h.incomingJSONData$
                  .pipe((0, i.filter)((t) => ['GetSessionConfigOK', 'SessionConfigUpdated'].includes(t.type)))
                  .subscribe((e) => {
                    var r;
                    const n = e;
                    null === (r = this.diagnostic) ||
                      void 0 === r ||
                      r.log(u.EVENTS.SESSION_config_RECEIVED, {
                        sessionIdHash: o.Session.hash(t),
                        metadata_keys: n && n.metadata ? Object.keys(n.metadata) : void 0,
                      }),
                      this.sessionConfigSubject.next({
                        webhookId: n.webhookId,
                        webhookUrl: n.webhookUrl,
                        metadata: n.metadata,
                      });
                  }),
              );
          }
          connect() {
            var t;
            if (this.destroyed) throw new Error('instance is destroyed');
            null === (t = this.diagnostic) ||
              void 0 === t ||
              t.log(u.EVENTS.STARTED_CONNECTING, { sessionIdHash: o.Session.hash(this.sessionId) }),
              this.ws.connect().subscribe();
          }
          destroy() {
            var t;
            this.subscriptions.unsubscribe(),
              this.ws.disconnect(),
              null === (t = this.diagnostic) ||
                void 0 === t ||
                t.log(u.EVENTS.DISCONNECTED, { sessionIdHash: o.Session.hash(this.sessionId) }),
              (this.destroyed = !0);
          }
          get isDestroyed() {
            return this.destroyed;
          }
          get connected$() {
            return this.connectedSubject.asObservable();
          }
          get onceConnected$() {
            return this.connected$.pipe(
              (0, i.filter)((t) => t),
              (0, i.take)(1),
              (0, i.map)(() => {}),
            );
          }
          get linked$() {
            return this.linkedSubject.asObservable();
          }
          get onceLinked$() {
            return this.linked$.pipe(
              (0, i.filter)((t) => t),
              (0, i.take)(1),
              (0, i.map)(() => {}),
            );
          }
          get sessionConfig$() {
            return this.sessionConfigSubject.asObservable();
          }
          get incomingEvent$() {
            return this.ws.incomingJSONData$.pipe(
              (0, i.filter)((t) => {
                if ('Event' !== t.type) return !1;
                const e = t;
                return (
                  'string' == typeof e.sessionId &&
                  'string' == typeof e.eventId &&
                  'string' == typeof e.event &&
                  'string' == typeof e.data
                );
              }),
              (0, i.map)((t) => t),
            );
          }
          setSessionMetadata(t, e) {
            const r = (0, a.ClientMessageSetSessionConfig)({
              id: (0, s.IntNumber)(this.nextReqId++),
              sessionId: this.sessionId,
              metadata: { [t]: e },
            });
            return this.onceConnected$.pipe(
              (0, i.flatMap)((t) => this.makeRequest(r)),
              (0, i.map)((t) => {
                if ((0, l.isServerMessageFail)(t)) throw new Error(t.error || 'failed to set session metadata');
              }),
            );
          }
          publishEvent(t, e, r = !1) {
            const n = (0, a.ClientMessagePublishEvent)({
              id: (0, s.IntNumber)(this.nextReqId++),
              sessionId: this.sessionId,
              event: t,
              data: e,
              callWebhook: r,
            });
            return this.onceLinked$.pipe(
              (0, i.flatMap)((t) => this.makeRequest(n)),
              (0, i.map)((t) => {
                if ((0, l.isServerMessageFail)(t)) throw new Error(t.error || 'failed to publish event');
                return t.eventId;
              }),
            );
          }
          sendData(t) {
            this.ws.sendData(JSON.stringify(t));
          }
          updateLastHeartbeat() {
            this.lastHeartbeatResponse = Date.now();
          }
          heartbeat() {
            if (Date.now() - this.lastHeartbeatResponse > 2e4) this.ws.disconnect();
            else
              try {
                this.ws.sendData('h');
              } catch (t) {}
          }
          makeRequest(t, e = 6e4) {
            const r = t.id;
            try {
              this.sendData(t);
            } catch (t) {
              return (0, n.throwError)(t);
            }
            return this.ws.incomingJSONData$.pipe(
              (0, i.timeoutWith)(e, (0, n.throwError)(new Error(`request ${r} timed out`))),
              (0, i.filter)((t) => t.id === r),
              (0, i.take)(1),
            );
          }
          authenticate() {
            const t = (0, a.ClientMessageHostSession)({
              id: (0, s.IntNumber)(this.nextReqId++),
              sessionId: this.sessionId,
              sessionKey: this.sessionKey,
            });
            return this.makeRequest(t).pipe(
              (0, i.map)((t) => {
                if ((0, l.isServerMessageFail)(t)) throw new Error(t.error || 'failed to authentcate');
              }),
            );
          }
          sendIsLinked() {
            const t = (0, a.ClientMessageIsLinked)({
              id: (0, s.IntNumber)(this.nextReqId++),
              sessionId: this.sessionId,
            });
            this.sendData(t);
          }
          sendGetSessionConfig() {
            const t = (0, a.ClientMessageGetSessionConfig)({
              id: (0, s.IntNumber)(this.nextReqId++),
              sessionId: this.sessionId,
            });
            this.sendData(t);
          }
        };
      },
      5811: (t, e, r) => {
        'use strict';
        const n = r(9016),
          i = r(3143);
        r(9016), r(3143);
        n.CoinbaseWalletSDK,
          'undefined' != typeof window &&
            ((window.CoinbaseWalletSDK = n.CoinbaseWalletSDK),
            (window.CoinbaseWalletProvider = i.CoinbaseWalletProvider),
            (window.WalletLink = n.CoinbaseWalletSDK),
            (window.WalletLinkProvider = i.CoinbaseWalletProvider));
      },
      9682: (t, e) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.ScopedLocalStorage = void 0),
          (e.ScopedLocalStorage = class {
            constructor(t) {
              this.scope = t;
            }
            setItem(t, e) {
              localStorage.setItem(this.scopedKey(t), e);
            }
            getItem(t) {
              return localStorage.getItem(this.scopedKey(t));
            }
            removeItem(t) {
              localStorage.removeItem(this.scopedKey(t));
            }
            clear() {
              const t = this.scopedKey(''),
                e = [];
              for (let r = 0; r < localStorage.length; r++) {
                const n = localStorage.key(r);
                'string' == typeof n && n.startsWith(t) && e.push(n);
              }
              e.forEach((t) => localStorage.removeItem(t));
            }
            scopedKey(t) {
              return `${this.scope}:${t}`;
            }
          });
      },
      1119: (t, e) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.default =
            '@namespace svg "http://www.w3.org/2000/svg";.-cbwsdk-css-reset,.-cbwsdk-css-reset *{animation:none;animation-delay:0;animation-direction:normal;animation-duration:0;animation-fill-mode:none;animation-iteration-count:1;animation-name:none;animation-play-state:running;animation-timing-function:ease;backface-visibility:visible;background:0;background-attachment:scroll;background-clip:border-box;background-color:rgba(0,0,0,0);background-image:none;background-origin:padding-box;background-position:0 0;background-position-x:0;background-position-y:0;background-repeat:repeat;background-size:auto auto;border:0;border-style:none;border-width:medium;border-color:inherit;border-bottom:0;border-bottom-color:inherit;border-bottom-left-radius:0;border-bottom-right-radius:0;border-bottom-style:none;border-bottom-width:medium;border-collapse:separate;border-image:none;border-left:0;border-left-color:inherit;border-left-style:none;border-left-width:medium;border-radius:0;border-right:0;border-right-color:inherit;border-right-style:none;border-right-width:medium;border-spacing:0;border-top:0;border-top-color:inherit;border-top-left-radius:0;border-top-right-radius:0;border-top-style:none;border-top-width:medium;bottom:auto;box-shadow:none;box-sizing:border-box;caption-side:top;clear:none;clip:auto;color:inherit;columns:auto;column-count:auto;column-fill:balance;column-gap:normal;column-rule:medium none currentColor;column-rule-color:currentColor;column-rule-style:none;column-rule-width:none;column-span:1;column-width:auto;content:normal;counter-increment:none;counter-reset:none;cursor:auto;direction:ltr;display:block;empty-cells:show;float:none;font:normal;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif;font-size:medium;font-style:normal;font-variant:normal;font-weight:normal;height:auto;hyphens:none;left:auto;letter-spacing:normal;line-height:normal;list-style:none;list-style-image:none;list-style-position:outside;list-style-type:disc;margin:0;margin-bottom:0;margin-left:0;margin-right:0;margin-top:0;max-height:none;max-width:none;min-height:0;min-width:0;opacity:1;orphans:0;outline:0;outline-color:invert;outline-style:none;outline-width:medium;overflow:visible;overflow-x:visible;overflow-y:visible;padding:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;page-break-after:auto;page-break-before:auto;page-break-inside:auto;perspective:none;perspective-origin:50% 50%;pointer-events:auto;position:static;quotes:"\\201C" "\\201D" "\\2018" "\\2019";right:auto;tab-size:8;table-layout:auto;text-align:inherit;text-align-last:auto;text-decoration:none;text-decoration-color:inherit;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-shadow:none;text-transform:none;top:auto;transform:none;transform-style:flat;transition:none;transition-delay:0s;transition-duration:0s;transition-property:none;transition-timing-function:ease;unicode-bidi:normal;vertical-align:baseline;visibility:visible;white-space:normal;widows:0;width:auto;word-spacing:normal;z-index:auto}.-cbwsdk-css-reset *{box-sizing:border-box;display:initial;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif;line-height:1}.-cbwsdk-css-reset [class*=container]{margin:0;padding:0}.-cbwsdk-css-reset style{display:none}');
      },
      7162: function (t, e, r) {
        'use strict';
        var n =
          (this && this.__importDefault) ||
          function (t) {
            return t && t.__esModule ? t : { default: t };
          };
        Object.defineProperty(e, '__esModule', { value: !0 }), (e.injectCssReset = void 0);
        const i = n(r(1119));
        e.injectCssReset = function () {
          const t = document.createElement('style');
          (t.type = 'text/css'),
            t.appendChild(document.createTextNode(i.default)),
            document.documentElement.appendChild(t);
        };
      },
      3143: function (t, e, r) {
        'use strict';
        var n = r(8764).Buffer,
          i =
            (this && this.__importDefault) ||
            function (t) {
              return t && t.__esModule ? t : { default: t };
            };
        Object.defineProperty(e, '__esModule', { value: !0 }), (e.CoinbaseWalletProvider = void 0);
        const o = i(r(9394)),
          s = i(r(3550)),
          a = r(9826),
          u = r(2191),
          c = r(3526),
          l = r(5633),
          h = r(4643),
          f = i(r(4497)),
          d = r(3648),
          p = r(8565),
          y = r(5313),
          g = 'DefaultChainId',
          b = 'DefaultJsonRpcUrl',
          m = 'HasChainBeenSwitched',
          v = 'HasChainOverriddenFromRelay';
        class w extends o.default {
          constructor(t) {
            var e, r;
            super(),
              (this._filterPolyfill = new d.FilterPolyfill(this)),
              (this._subscriptionManager = new y.SubscriptionManager(this)),
              (this._relay = null),
              (this._addresses = []),
              (this.hasMadeFirstChainChangedEmission = !1),
              (this._send = this.send.bind(this)),
              (this._sendAsync = this.sendAsync.bind(this)),
              (this.setProviderInfo = this.setProviderInfo.bind(this)),
              (this.updateProviderInfo = this.updateProviderInfo.bind(this)),
              (this.getChainId = this.getChainId.bind(this)),
              (this.setAppInfo = this.setAppInfo.bind(this)),
              (this.enable = this.enable.bind(this)),
              (this.close = this.close.bind(this)),
              (this.send = this.send.bind(this)),
              (this.sendAsync = this.sendAsync.bind(this)),
              (this.request = this.request.bind(this)),
              (this._setAddresses = this._setAddresses.bind(this)),
              (this.scanQRCode = this.scanQRCode.bind(this)),
              (this.genericRequest = this.genericRequest.bind(this)),
              (this._jsonRpcUrlFromOpts = t.jsonRpcUrl),
              (this._overrideIsMetaMask = t.overrideIsMetaMask),
              (this._relayProvider = t.relayProvider),
              (this._storage = t.storage),
              (this._relayEventManager = t.relayEventManager),
              (this.diagnostic = t.diagnosticLogger),
              (this.reloadOnDisconnect = !0),
              (this.isCoinbaseWallet = null === (e = t.overrideIsCoinbaseWallet) || void 0 === e || e),
              (this.isCoinbaseBrowser = null !== (r = t.overrideIsCoinbaseBrowser) && void 0 !== r && r),
              (this.qrUrl = t.qrUrl),
              (this.supportsAddressSwitching = t.supportsAddressSwitching);
            const n = this.getChainId(),
              i = (0, h.prepend0x)(n.toString(16));
            this.emit('connect', { chainIdStr: i });
            const o = this._storage.getItem(l.LOCAL_STORAGE_ADDRESSES_KEY);
            if (o) {
              const t = o.split(' ');
              '' !== t[0] &&
                ((this._addresses = t.map((t) => (0, h.ensureAddressString)(t))), this.emit('accountsChanged', t));
            }
            this._subscriptionManager.events.on('notification', (t) => {
              this.emit('message', { type: t.method, data: t.params });
            }),
              this._addresses.length > 0 && this.initializeRelay(),
              window.addEventListener('message', (t) => {
                var e;
                if ('walletLinkMessage' === t.data.type && 'defaultChainChanged' === t.data.data.action) {
                  const r = t.data.data.chainId,
                    n = null !== (e = t.data.data.jsonRpcUrl) && void 0 !== e ? e : this.jsonRpcUrl;
                  this.updateProviderInfo(n, Number(r), !0);
                }
              });
          }
          get selectedAddress() {
            return this._addresses[0] || void 0;
          }
          get networkVersion() {
            return this.getChainId().toString(10);
          }
          get chainId() {
            return (0, h.prepend0x)(this.getChainId().toString(16));
          }
          get isWalletLink() {
            return !0;
          }
          get isMetaMask() {
            return this._overrideIsMetaMask;
          }
          get host() {
            return this.jsonRpcUrl;
          }
          get connected() {
            return !0;
          }
          isConnected() {
            return !0;
          }
          get jsonRpcUrl() {
            var t;
            return null !== (t = this._storage.getItem(b)) && void 0 !== t ? t : this._jsonRpcUrlFromOpts;
          }
          set jsonRpcUrl(t) {
            this._storage.setItem(b, t);
          }
          get isChainOverridden() {
            return 'true' === this._storage.getItem(v);
          }
          set isChainOverridden(t) {
            this._storage.setItem(v, t.toString());
          }
          disableReloadOnDisconnect() {
            this.reloadOnDisconnect = !1;
          }
          setProviderInfo(t, e) {
            this.isChainOverridden || this.updateProviderInfo(t, this.getChainId(), !1);
          }
          updateProviderInfo(t, e, r) {
            if ('true' === this._storage.getItem(m) && r) return;
            r && (this.isChainOverridden = !0), (this.jsonRpcUrl = t);
            const n = this.getChainId();
            this._storage.setItem(g, e.toString(10)),
              ((0, h.ensureIntNumber)(e) === n && this.hasMadeFirstChainChangedEmission) ||
                (this.emit('chainChanged', this.getChainId()), (this.hasMadeFirstChainChangedEmission = !0));
          }
          async watchAsset(t, e, r, n, i, o) {
            const s = await this.initializeRelay();
            return !!(await s.watchAsset(t, e, r, n, i, null == o ? void 0 : o.toString()).promise).result;
          }
          async addEthereumChain(t, e, r, n, i, o) {
            var s, a;
            if ((0, h.ensureIntNumber)(t) === this.getChainId()) return !1;
            const u = await this.initializeRelay(),
              c = u.inlineAddEthereumChain(t.toString());
            this._isAuthorized() || c || (await u.requestEthereumAccounts().promise);
            const l = await u.addEthereumChain(t.toString(), e, i, r, n, o).promise;
            return (
              !0 === (null === (s = l.result) || void 0 === s ? void 0 : s.isApproved) &&
                (this._storage.setItem(m, 'true'), this.updateProviderInfo(e[0], t, !1)),
              !0 === (null === (a = l.result) || void 0 === a ? void 0 : a.isApproved)
            );
          }
          async switchEthereumChain(t) {
            if ((0, h.ensureIntNumber)(t) === this.getChainId()) return;
            const e = await this.initializeRelay(),
              r = await e.switchEthereumChain(t.toString(10)).promise;
            if (r.errorCode) throw a.ethErrors.provider.custom({ code: r.errorCode });
            const n = r.result;
            n.isApproved &&
              n.rpcUrl.length > 0 &&
              (this._storage.setItem(m, 'true'), this.updateProviderInfo(n.rpcUrl, t, !1));
          }
          setAppInfo(t, e) {
            this.initializeRelay().then((r) => r.setAppInfo(t, e));
          }
          async enable() {
            var t;
            return (
              null === (t = this.diagnostic) ||
                void 0 === t ||
                t.log(u.EVENTS.ETH_ACCOUNTS_STATE, {
                  method: 'provider::enable',
                  addresses_length: this._addresses.length,
                  sessionIdHash: this._relay ? c.Session.hash(this._relay.session.id) : void 0,
                }),
              this._addresses.length > 0 ? [...this._addresses] : await this._send(p.JSONRPCMethod.eth_requestAccounts)
            );
          }
          async close() {
            (await this.initializeRelay()).resetAndReload();
          }
          send(t, e) {
            if ('string' == typeof t) {
              const r = { jsonrpc: '2.0', id: 0, method: t, params: Array.isArray(e) ? e : void 0 !== e ? [e] : [] };
              return this._sendRequestAsync(r).then((t) => t.result);
            }
            if ('function' == typeof e) {
              const r = t,
                n = e;
              return this._sendAsync(r, n);
            }
            if (Array.isArray(t)) return t.map((t) => this._sendRequest(t));
            const r = t;
            return this._sendRequest(r);
          }
          async sendAsync(t, e) {
            if ('function' != typeof e) throw new Error('callback is required');
            if (Array.isArray(t)) {
              const r = e;
              return void this._sendMultipleRequestsAsync(t)
                .then((t) => r(null, t))
                .catch((t) => r(t, null));
            }
            const r = e;
            return this._sendRequestAsync(t)
              .then((t) => r(null, t))
              .catch((t) => r(t, null));
          }
          async request(t) {
            if (!t || 'object' != typeof t || Array.isArray(t))
              throw a.ethErrors.rpc.invalidRequest({
                message: 'Expected a single, non-array, object argument.',
                data: t,
              });
            const { method: e, params: r } = t;
            if ('string' != typeof e || 0 === e.length)
              throw a.ethErrors.rpc.invalidRequest({ message: "'args.method' must be a non-empty string.", data: t });
            if (void 0 !== r && !Array.isArray(r) && ('object' != typeof r || null === r))
              throw a.ethErrors.rpc.invalidRequest({
                message: "'args.params' must be an object or array if provided.",
                data: t,
              });
            const n = void 0 === r ? [] : r,
              i = this._relayEventManager.makeRequestId();
            return (await this._sendRequestAsync({ method: e, params: n, jsonrpc: '2.0', id: i })).result;
          }
          async scanQRCode(t) {
            const e = await this.initializeRelay(),
              r = await e.scanQRCode((0, h.ensureRegExpString)(t)).promise;
            if ('string' != typeof r.result) throw new Error('result was not a string');
            return r.result;
          }
          async genericRequest(t, e) {
            const r = await this.initializeRelay(),
              n = await r.genericRequest(t, e).promise;
            if ('string' != typeof n.result) throw new Error('result was not a string');
            return n.result;
          }
          async selectProvider(t) {
            const e = await this.initializeRelay(),
              r = await e.selectProvider(t).promise;
            if ('string' != typeof r.result) throw new Error('result was not a string');
            return r.result;
          }
          supportsSubscriptions() {
            return !1;
          }
          subscribe() {
            throw new Error('Subscriptions are not supported');
          }
          unsubscribe() {
            throw new Error('Subscriptions are not supported');
          }
          disconnect() {
            return !0;
          }
          _sendRequest(t) {
            const e = { jsonrpc: '2.0', id: t.id },
              { method: r } = t;
            if (((e.result = this._handleSynchronousMethods(t)), void 0 === e.result))
              throw new Error(
                `Coinbase Wallet does not support calling ${r} synchronously without a callback. Please provide a callback parameter to call ${r} asynchronously.`,
              );
            return e;
          }
          _setAddresses(t, e) {
            if (!Array.isArray(t)) throw new Error('addresses is not an array');
            const r = t.map((t) => (0, h.ensureAddressString)(t));
            JSON.stringify(r) !== JSON.stringify(this._addresses) &&
              ((this._addresses.length > 0 && !1 === this.supportsAddressSwitching && !e) ||
                ((this._addresses = r),
                this.emit('accountsChanged', this._addresses),
                this._storage.setItem(l.LOCAL_STORAGE_ADDRESSES_KEY, r.join(' '))));
          }
          _sendRequestAsync(t) {
            return new Promise((e, r) => {
              try {
                const n = this._handleSynchronousMethods(t);
                if (void 0 !== n) return e({ jsonrpc: '2.0', id: t.id, result: n });
                const i = this._handleAsynchronousFilterMethods(t);
                if (void 0 !== i)
                  return void i.then((r) => e(Object.assign(Object.assign({}, r), { id: t.id }))).catch((t) => r(t));
                const o = this._handleSubscriptionMethods(t);
                if (void 0 !== o)
                  return void o.then((r) => e({ jsonrpc: '2.0', id: t.id, result: r.result })).catch((t) => r(t));
              } catch (t) {
                return r(t);
              }
              this._handleAsynchronousMethods(t)
                .then((r) => r && e(Object.assign(Object.assign({}, r), { id: t.id })))
                .catch((t) => r(t));
            });
          }
          _sendMultipleRequestsAsync(t) {
            return Promise.all(t.map((t) => this._sendRequestAsync(t)));
          }
          _handleSynchronousMethods(t) {
            const { method: e } = t,
              r = t.params || [];
            switch (e) {
              case p.JSONRPCMethod.eth_accounts:
                return this._eth_accounts();
              case p.JSONRPCMethod.eth_coinbase:
                return this._eth_coinbase();
              case p.JSONRPCMethod.eth_uninstallFilter:
                return this._eth_uninstallFilter(r);
              case p.JSONRPCMethod.net_version:
                return this._net_version();
              case p.JSONRPCMethod.eth_chainId:
                return this._eth_chainId();
              default:
                return;
            }
          }
          async _handleAsynchronousMethods(t) {
            const { method: e } = t,
              r = t.params || [];
            switch (e) {
              case p.JSONRPCMethod.eth_requestAccounts:
                return this._eth_requestAccounts();
              case p.JSONRPCMethod.eth_sign:
                return this._eth_sign(r);
              case p.JSONRPCMethod.eth_ecRecover:
                return this._eth_ecRecover(r);
              case p.JSONRPCMethod.personal_sign:
                return this._personal_sign(r);
              case p.JSONRPCMethod.personal_ecRecover:
                return this._personal_ecRecover(r);
              case p.JSONRPCMethod.eth_signTransaction:
                return this._eth_signTransaction(r);
              case p.JSONRPCMethod.eth_sendRawTransaction:
                return this._eth_sendRawTransaction(r);
              case p.JSONRPCMethod.eth_sendTransaction:
                return this._eth_sendTransaction(r);
              case p.JSONRPCMethod.eth_signTypedData_v1:
                return this._eth_signTypedData_v1(r);
              case p.JSONRPCMethod.eth_signTypedData_v2:
                return this._throwUnsupportedMethodError();
              case p.JSONRPCMethod.eth_signTypedData_v3:
                return this._eth_signTypedData_v3(r);
              case p.JSONRPCMethod.eth_signTypedData_v4:
              case p.JSONRPCMethod.eth_signTypedData:
                return this._eth_signTypedData_v4(r);
              case p.JSONRPCMethod.cbWallet_arbitrary:
                return this._cbwallet_arbitrary(r);
              case p.JSONRPCMethod.wallet_addEthereumChain:
                return this._wallet_addEthereumChain(r);
              case p.JSONRPCMethod.wallet_switchEthereumChain:
                return this._wallet_switchEthereumChain(r);
              case p.JSONRPCMethod.wallet_watchAsset:
                return this._wallet_watchAsset(r);
            }
            return (await this.initializeRelay()).makeEthereumJSONRPCRequest(t, this.jsonRpcUrl);
          }
          _handleAsynchronousFilterMethods(t) {
            const { method: e } = t,
              r = t.params || [];
            switch (e) {
              case p.JSONRPCMethod.eth_newFilter:
                return this._eth_newFilter(r);
              case p.JSONRPCMethod.eth_newBlockFilter:
                return this._eth_newBlockFilter();
              case p.JSONRPCMethod.eth_newPendingTransactionFilter:
                return this._eth_newPendingTransactionFilter();
              case p.JSONRPCMethod.eth_getFilterChanges:
                return this._eth_getFilterChanges(r);
              case p.JSONRPCMethod.eth_getFilterLogs:
                return this._eth_getFilterLogs(r);
            }
          }
          _handleSubscriptionMethods(t) {
            switch (t.method) {
              case p.JSONRPCMethod.eth_subscribe:
              case p.JSONRPCMethod.eth_unsubscribe:
                return this._subscriptionManager.handleRequest(t);
            }
          }
          _isKnownAddress(t) {
            try {
              const e = (0, h.ensureAddressString)(t);
              return this._addresses.map((t) => (0, h.ensureAddressString)(t)).includes(e);
            } catch (t) {}
            return !1;
          }
          _ensureKnownAddress(t) {
            var e;
            if (!this._isKnownAddress(t))
              throw (
                (null === (e = this.diagnostic) || void 0 === e || e.log(u.EVENTS.UNKNOWN_ADDRESS_ENCOUNTERED),
                new Error('Unknown Ethereum address'))
              );
          }
          _prepareTransactionParams(t) {
            const e = t.from ? (0, h.ensureAddressString)(t.from) : this.selectedAddress;
            if (!e) throw new Error('Ethereum address is unavailable');
            return (
              this._ensureKnownAddress(e),
              {
                fromAddress: e,
                toAddress: t.to ? (0, h.ensureAddressString)(t.to) : null,
                weiValue: null != t.value ? (0, h.ensureBN)(t.value) : new s.default(0),
                data: t.data ? (0, h.ensureBuffer)(t.data) : n.alloc(0),
                nonce: null != t.nonce ? (0, h.ensureIntNumber)(t.nonce) : null,
                gasPriceInWei: null != t.gasPrice ? (0, h.ensureBN)(t.gasPrice) : null,
                maxFeePerGas: null != t.maxFeePerGas ? (0, h.ensureBN)(t.maxFeePerGas) : null,
                maxPriorityFeePerGas: null != t.maxPriorityFeePerGas ? (0, h.ensureBN)(t.maxPriorityFeePerGas) : null,
                gasLimit: null != t.gas ? (0, h.ensureBN)(t.gas) : null,
                chainId: this.getChainId(),
              }
            );
          }
          _isAuthorized() {
            return this._addresses.length > 0;
          }
          _requireAuthorization() {
            if (!this._isAuthorized()) throw a.ethErrors.provider.unauthorized({});
          }
          _throwUnsupportedMethodError() {
            throw a.ethErrors.provider.unsupportedMethod({});
          }
          async _signEthereumMessage(t, e, r, n) {
            this._ensureKnownAddress(e);
            try {
              const i = await this.initializeRelay();
              return { jsonrpc: '2.0', id: 0, result: (await i.signEthereumMessage(t, e, r, n).promise).result };
            } catch (t) {
              if ('string' == typeof t.message && t.message.match(/(denied|rejected)/i))
                throw a.ethErrors.provider.userRejectedRequest('User denied message signature');
              throw t;
            }
          }
          async _ethereumAddressFromSignedMessage(t, e, r) {
            const n = await this.initializeRelay();
            return {
              jsonrpc: '2.0',
              id: 0,
              result: (await n.ethereumAddressFromSignedMessage(t, e, r).promise).result,
            };
          }
          _eth_accounts() {
            return [...this._addresses];
          }
          _eth_coinbase() {
            return this.selectedAddress || null;
          }
          _net_version() {
            return this.getChainId().toString(10);
          }
          _eth_chainId() {
            return (0, h.hexStringFromIntNumber)(this.getChainId());
          }
          getChainId() {
            const t = this._storage.getItem(g) || '1',
              e = parseInt(t, 10);
            return (0, h.ensureIntNumber)(e);
          }
          async _eth_requestAccounts() {
            var t;
            if (
              (null === (t = this.diagnostic) ||
                void 0 === t ||
                t.log(u.EVENTS.ETH_ACCOUNTS_STATE, {
                  method: 'provider::_eth_requestAccounts',
                  addresses_length: this._addresses.length,
                  sessionIdHash: this._relay ? c.Session.hash(this._relay.session.id) : void 0,
                }),
              this._addresses.length > 0)
            )
              return Promise.resolve({ jsonrpc: '2.0', id: 0, result: this._addresses });
            let e;
            try {
              const t = await this.initializeRelay();
              e = await t.requestEthereumAccounts().promise;
            } catch (t) {
              if ('string' == typeof t.message && t.message.match(/(denied|rejected)/i))
                throw a.ethErrors.provider.userRejectedRequest('User denied account authorization');
              throw t;
            }
            if (!e.result) throw new Error('accounts received is empty');
            return this._setAddresses(e.result), { jsonrpc: '2.0', id: 0, result: this._addresses };
          }
          _eth_sign(t) {
            this._requireAuthorization();
            const e = (0, h.ensureAddressString)(t[0]),
              r = (0, h.ensureBuffer)(t[1]);
            return this._signEthereumMessage(r, e, !1);
          }
          _eth_ecRecover(t) {
            const e = (0, h.ensureBuffer)(t[0]),
              r = (0, h.ensureBuffer)(t[1]);
            return this._ethereumAddressFromSignedMessage(e, r, !1);
          }
          _personal_sign(t) {
            this._requireAuthorization();
            const e = (0, h.ensureBuffer)(t[0]),
              r = (0, h.ensureAddressString)(t[1]);
            return this._signEthereumMessage(e, r, !0);
          }
          _personal_ecRecover(t) {
            const e = (0, h.ensureBuffer)(t[0]),
              r = (0, h.ensureBuffer)(t[1]);
            return this._ethereumAddressFromSignedMessage(e, r, !0);
          }
          async _eth_signTransaction(t) {
            this._requireAuthorization();
            const e = this._prepareTransactionParams(t[0] || {});
            try {
              const t = await this.initializeRelay();
              return { jsonrpc: '2.0', id: 0, result: (await t.signEthereumTransaction(e).promise).result };
            } catch (t) {
              if ('string' == typeof t.message && t.message.match(/(denied|rejected)/i))
                throw a.ethErrors.provider.userRejectedRequest('User denied transaction signature');
              throw t;
            }
          }
          async _eth_sendRawTransaction(t) {
            const e = (0, h.ensureBuffer)(t[0]),
              r = await this.initializeRelay();
            return {
              jsonrpc: '2.0',
              id: 0,
              result: (await r.submitEthereumTransaction(e, this.getChainId()).promise).result,
            };
          }
          async _eth_sendTransaction(t) {
            this._requireAuthorization();
            const e = this._prepareTransactionParams(t[0] || {});
            try {
              const t = await this.initializeRelay();
              return { jsonrpc: '2.0', id: 0, result: (await t.signAndSubmitEthereumTransaction(e).promise).result };
            } catch (t) {
              if ('string' == typeof t.message && t.message.match(/(denied|rejected)/i))
                throw a.ethErrors.provider.userRejectedRequest('User denied transaction signature');
              throw t;
            }
          }
          async _eth_signTypedData_v1(t) {
            this._requireAuthorization();
            const e = (0, h.ensureParsedJSONObject)(t[0]),
              r = (0, h.ensureAddressString)(t[1]);
            this._ensureKnownAddress(r);
            const n = f.default.hashForSignTypedDataLegacy({ data: e }),
              i = JSON.stringify(e, null, 2);
            return this._signEthereumMessage(n, r, !1, i);
          }
          async _eth_signTypedData_v3(t) {
            this._requireAuthorization();
            const e = (0, h.ensureAddressString)(t[0]),
              r = (0, h.ensureParsedJSONObject)(t[1]);
            this._ensureKnownAddress(e);
            const n = f.default.hashForSignTypedData_v3({ data: r }),
              i = JSON.stringify(r, null, 2);
            return this._signEthereumMessage(n, e, !1, i);
          }
          async _eth_signTypedData_v4(t) {
            this._requireAuthorization();
            const e = (0, h.ensureAddressString)(t[0]),
              r = (0, h.ensureParsedJSONObject)(t[1]);
            this._ensureKnownAddress(e);
            const n = f.default.hashForSignTypedData_v4({ data: r }),
              i = JSON.stringify(r, null, 2);
            return this._signEthereumMessage(n, e, !1, i);
          }
          async _cbwallet_arbitrary(t) {
            const e = t[0],
              r = t[1];
            if ('string' != typeof r) throw new Error('parameter must be a string');
            if ('object' != typeof e || null === e) throw new Error('parameter must be an object');
            return { jsonrpc: '2.0', id: 0, result: await this.genericRequest(e, r) };
          }
          async _wallet_addEthereumChain(t) {
            var e, r, n, i;
            const o = t[0];
            if (0 === (null === (e = o.rpcUrls) || void 0 === e ? void 0 : e.length))
              return { jsonrpc: '2.0', id: 0, error: { code: 2, message: 'please pass in at least 1 rpcUrl' } };
            if (!o.chainName || '' === o.chainName.trim())
              throw a.ethErrors.provider.custom({ code: 0, message: 'chainName is a required field' });
            if (!o.nativeCurrency)
              throw a.ethErrors.provider.custom({ code: 0, message: 'nativeCurrency is a required field' });
            const s = parseInt(o.chainId, 16);
            return (await this.addEthereumChain(
              s,
              null !== (r = o.rpcUrls) && void 0 !== r ? r : [],
              null !== (n = o.blockExplorerUrls) && void 0 !== n ? n : [],
              o.chainName,
              null !== (i = o.iconUrls) && void 0 !== i ? i : [],
              o.nativeCurrency,
            ))
              ? { jsonrpc: '2.0', id: 0, result: null }
              : { jsonrpc: '2.0', id: 0, error: { code: 2, message: 'unable to add ethereum chain' } };
          }
          async _wallet_switchEthereumChain(t) {
            const e = t[0];
            return await this.switchEthereumChain(parseInt(e.chainId, 16)), { jsonrpc: '2.0', id: 0, result: null };
          }
          async _wallet_watchAsset(t) {
            const e = Array.isArray(t) ? t[0] : t;
            if (!e.type) throw a.ethErrors.rpc.invalidParams({ message: 'Type is required' });
            if ('ERC20' !== (null == e ? void 0 : e.type))
              throw a.ethErrors.rpc.invalidParams({ message: `Asset of type '${e.type}' is not supported` });
            if (!(null == e ? void 0 : e.options))
              throw a.ethErrors.rpc.invalidParams({ message: 'Options are required' });
            if (!(null == e ? void 0 : e.options.address))
              throw a.ethErrors.rpc.invalidParams({ message: 'Address is required' });
            const r = this.getChainId(),
              { address: n, symbol: i, image: o, decimals: s } = e.options;
            return { jsonrpc: '2.0', id: 0, result: await this.watchAsset(e.type, n, i, s, o, r) };
          }
          _eth_uninstallFilter(t) {
            const e = (0, h.ensureHexString)(t[0]);
            return this._filterPolyfill.uninstallFilter(e);
          }
          async _eth_newFilter(t) {
            const e = t[0];
            return { jsonrpc: '2.0', id: 0, result: await this._filterPolyfill.newFilter(e) };
          }
          async _eth_newBlockFilter() {
            return { jsonrpc: '2.0', id: 0, result: await this._filterPolyfill.newBlockFilter() };
          }
          async _eth_newPendingTransactionFilter() {
            return { jsonrpc: '2.0', id: 0, result: await this._filterPolyfill.newPendingTransactionFilter() };
          }
          _eth_getFilterChanges(t) {
            const e = (0, h.ensureHexString)(t[0]);
            return this._filterPolyfill.getFilterChanges(e);
          }
          _eth_getFilterLogs(t) {
            const e = (0, h.ensureHexString)(t[0]);
            return this._filterPolyfill.getFilterLogs(e);
          }
          initializeRelay() {
            return this._relay
              ? Promise.resolve(this._relay)
              : this._relayProvider().then(
                  (t) => (
                    t.setAccountsCallback((t, e) => this._setAddresses(t, e)),
                    t.setChainCallback((t, e) => {
                      this.updateProviderInfo(e, parseInt(t, 10), !0);
                    }),
                    (this._relay = t),
                    t
                  ),
                );
          }
        }
        e.CoinbaseWalletProvider = w;
      },
      3648: (t, e, r) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }), (e.filterFromParam = e.FilterPolyfill = void 0);
        const n = r(1295),
          i = r(4643),
          o = { jsonrpc: '2.0', id: 0 };
        function s(t) {
          return {
            fromBlock: u(t.fromBlock),
            toBlock: u(t.toBlock),
            addresses: void 0 === t.address ? null : Array.isArray(t.address) ? t.address : [t.address],
            topics: t.topics || [],
          };
        }
        function a(t) {
          const e = { fromBlock: c(t.fromBlock), toBlock: c(t.toBlock), topics: t.topics };
          return null !== t.addresses && (e.address = t.addresses), e;
        }
        function u(t) {
          if (void 0 === t || 'latest' === t || 'pending' === t) return 'latest';
          if ('earliest' === t) return (0, n.IntNumber)(0);
          if ((0, i.isHexString)(t)) return (0, i.intNumberFromHexString)(t);
          throw new Error(`Invalid block option: ${String(t)}`);
        }
        function c(t) {
          return 'latest' === t ? t : (0, i.hexStringFromIntNumber)(t);
        }
        function l() {
          return Object.assign(Object.assign({}, o), { error: { code: -32e3, message: 'filter not found' } });
        }
        function h() {
          return Object.assign(Object.assign({}, o), { result: [] });
        }
        (e.FilterPolyfill = class {
          constructor(t) {
            (this.logFilters = new Map()),
              (this.blockFilters = new Set()),
              (this.pendingTransactionFilters = new Set()),
              (this.cursors = new Map()),
              (this.timeouts = new Map()),
              (this.nextFilterId = (0, n.IntNumber)(1)),
              (this.provider = t);
          }
          async newFilter(t) {
            const e = s(t),
              r = this.makeFilterId(),
              n = await this.setInitialCursorPosition(r, e.fromBlock);
            return (
              console.log(`Installing new log filter(${r}):`, e, 'initial cursor position:', n),
              this.logFilters.set(r, e),
              this.setFilterTimeout(r),
              (0, i.hexStringFromIntNumber)(r)
            );
          }
          async newBlockFilter() {
            const t = this.makeFilterId(),
              e = await this.setInitialCursorPosition(t, 'latest');
            return (
              console.log(`Installing new block filter (${t}) with initial cursor position:`, e),
              this.blockFilters.add(t),
              this.setFilterTimeout(t),
              (0, i.hexStringFromIntNumber)(t)
            );
          }
          async newPendingTransactionFilter() {
            const t = this.makeFilterId(),
              e = await this.setInitialCursorPosition(t, 'latest');
            return (
              console.log(`Installing new block filter (${t}) with initial cursor position:`, e),
              this.pendingTransactionFilters.add(t),
              this.setFilterTimeout(t),
              (0, i.hexStringFromIntNumber)(t)
            );
          }
          uninstallFilter(t) {
            const e = (0, i.intNumberFromHexString)(t);
            return console.log(`Uninstalling filter (${e})`), this.deleteFilter(e), !0;
          }
          getFilterChanges(t) {
            const e = (0, i.intNumberFromHexString)(t);
            return (
              this.timeouts.has(e) && this.setFilterTimeout(e),
              this.logFilters.has(e)
                ? this.getLogFilterChanges(e)
                : this.blockFilters.has(e)
                  ? this.getBlockFilterChanges(e)
                  : this.pendingTransactionFilters.has(e)
                    ? this.getPendingTransactionFilterChanges(e)
                    : Promise.resolve(l())
            );
          }
          async getFilterLogs(t) {
            const e = (0, i.intNumberFromHexString)(t),
              r = this.logFilters.get(e);
            return r
              ? this.sendAsyncPromise(Object.assign(Object.assign({}, o), { method: 'eth_getLogs', params: [a(r)] }))
              : l();
          }
          makeFilterId() {
            return (0, n.IntNumber)(++this.nextFilterId);
          }
          sendAsyncPromise(t) {
            return new Promise((e, r) => {
              this.provider.sendAsync(t, (t, n) =>
                t
                  ? r(t)
                  : Array.isArray(n) || null == n
                    ? r(new Error(`unexpected response received: ${JSON.stringify(n)}`))
                    : void e(n),
              );
            });
          }
          deleteFilter(t) {
            console.log(`Deleting filter (${t})`),
              this.logFilters.delete(t),
              this.blockFilters.delete(t),
              this.pendingTransactionFilters.delete(t),
              this.cursors.delete(t),
              this.timeouts.delete(t);
          }
          async getLogFilterChanges(t) {
            const e = this.logFilters.get(t),
              r = this.cursors.get(t);
            if (!r || !e) return l();
            const s = await this.getCurrentBlockHeight(),
              u = 'latest' === e.toBlock ? s : e.toBlock;
            if (r > s) return h();
            if (r > e.toBlock) return h();
            console.log(`Fetching logs from ${r} to ${u} for filter ${t}`);
            const c = await this.sendAsyncPromise(
              Object.assign(Object.assign({}, o), {
                method: 'eth_getLogs',
                params: [a(Object.assign(Object.assign({}, e), { fromBlock: r, toBlock: u }))],
              }),
            );
            if (Array.isArray(c.result)) {
              const e = c.result.map((t) => (0, i.intNumberFromHexString)(t.blockNumber || '0x0')),
                o = Math.max(...e);
              if (o && o > r) {
                const e = (0, n.IntNumber)(o + 1);
                console.log(`Moving cursor position for filter (${t}) from ${r} to ${e}`), this.cursors.set(t, e);
              }
            }
            return c;
          }
          async getBlockFilterChanges(t) {
            const e = this.cursors.get(t);
            if (!e) return l();
            const r = await this.getCurrentBlockHeight();
            if (e > r) return h();
            console.log(`Fetching blocks from ${e} to ${r} for filter (${t})`);
            const s = (
                await Promise.all((0, i.range)(e, r + 1).map((t) => this.getBlockHashByNumber((0, n.IntNumber)(t))))
              ).filter((t) => !!t),
              a = (0, n.IntNumber)(e + s.length);
            return (
              console.log(`Moving cursor position for filter (${t}) from ${e} to ${a}`),
              this.cursors.set(t, a),
              Object.assign(Object.assign({}, o), { result: s })
            );
          }
          async getPendingTransactionFilterChanges(t) {
            return Promise.resolve(h());
          }
          async setInitialCursorPosition(t, e) {
            const r = await this.getCurrentBlockHeight(),
              n = 'number' == typeof e && e > r ? e : r;
            return this.cursors.set(t, n), n;
          }
          setFilterTimeout(t) {
            const e = this.timeouts.get(t);
            e && window.clearTimeout(e);
            const r = window.setTimeout(() => {
              console.log(`Filter (${t}) timed out`), this.deleteFilter(t);
            }, 3e5);
            this.timeouts.set(t, r);
          }
          async getCurrentBlockHeight() {
            const { result: t } = await this.sendAsyncPromise(
              Object.assign(Object.assign({}, o), { method: 'eth_blockNumber', params: [] }),
            );
            return (0, i.intNumberFromHexString)((0, i.ensureHexString)(t));
          }
          async getBlockHashByNumber(t) {
            const e = await this.sendAsyncPromise(
              Object.assign(Object.assign({}, o), {
                method: 'eth_getBlockByNumber',
                params: [(0, i.hexStringFromIntNumber)(t), !1],
              }),
            );
            return e.result && 'string' == typeof e.result.hash ? (0, i.ensureHexString)(e.result.hash) : null;
          }
        }),
          (e.filterFromParam = s);
      },
      8565: (t, e) => {
        'use strict';
        var r;
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.JSONRPCMethod = void 0),
          ((r = e.JSONRPCMethod || (e.JSONRPCMethod = {})).eth_accounts = 'eth_accounts'),
          (r.eth_coinbase = 'eth_coinbase'),
          (r.net_version = 'net_version'),
          (r.eth_chainId = 'eth_chainId'),
          (r.eth_uninstallFilter = 'eth_uninstallFilter'),
          (r.eth_requestAccounts = 'eth_requestAccounts'),
          (r.eth_sign = 'eth_sign'),
          (r.eth_ecRecover = 'eth_ecRecover'),
          (r.personal_sign = 'personal_sign'),
          (r.personal_ecRecover = 'personal_ecRecover'),
          (r.eth_signTransaction = 'eth_signTransaction'),
          (r.eth_sendRawTransaction = 'eth_sendRawTransaction'),
          (r.eth_sendTransaction = 'eth_sendTransaction'),
          (r.eth_signTypedData_v1 = 'eth_signTypedData_v1'),
          (r.eth_signTypedData_v2 = 'eth_signTypedData_v2'),
          (r.eth_signTypedData_v3 = 'eth_signTypedData_v3'),
          (r.eth_signTypedData_v4 = 'eth_signTypedData_v4'),
          (r.eth_signTypedData = 'eth_signTypedData'),
          (r.cbWallet_arbitrary = 'walletlink_arbitrary'),
          (r.wallet_addEthereumChain = 'wallet_addEthereumChain'),
          (r.wallet_switchEthereumChain = 'wallet_switchEthereumChain'),
          (r.wallet_watchAsset = 'wallet_watchAsset'),
          (r.eth_subscribe = 'eth_subscribe'),
          (r.eth_unsubscribe = 'eth_unsubscribe'),
          (r.eth_newFilter = 'eth_newFilter'),
          (r.eth_newBlockFilter = 'eth_newBlockFilter'),
          (r.eth_newPendingTransactionFilter = 'eth_newPendingTransactionFilter'),
          (r.eth_getFilterChanges = 'eth_getFilterChanges'),
          (r.eth_getFilterLogs = 'eth_getFilterLogs');
      },
      5313: (t, e, r) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }), (e.SubscriptionManager = void 0);
        const n = r(5012),
          i = r(8961),
          o = () => {};
        e.SubscriptionManager = class {
          constructor(t) {
            const e = new n({ provider: t, pollingInterval: 15e3, setSkipCacheFlag: !0 }),
              { events: r, middleware: o } = i({ blockTracker: e, provider: t });
            (this.events = r), (this.subscriptionMiddleware = o);
          }
          async handleRequest(t) {
            const e = {};
            return await this.subscriptionMiddleware(t, e, o, o), e;
          }
          destroy() {
            this.subscriptionMiddleware.destroy();
          }
        };
      },
      3518: (t, e, r) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }), (e.WalletSDKUI = void 0);
        const n = r(8202),
          i = r(9934),
          o = r(7162);
        e.WalletSDKUI = class {
          constructor(t) {
            (this.standalone = null),
              (this.attached = !1),
              (this.snackbar = new i.Snackbar({ darkMode: t.darkMode })),
              (this.linkFlow = new n.LinkFlow({
                darkMode: t.darkMode,
                version: t.version,
                sessionId: t.session.id,
                sessionSecret: t.session.secret,
                linkAPIUrl: t.linkAPIUrl,
                connected$: t.connected$,
                isParentConnection: !1,
              }));
          }
          attach() {
            if (this.attached) throw new Error('Coinbase Wallet SDK UI is already attached');
            const t = document.documentElement,
              e = document.createElement('div');
            (e.className = '-cbwsdk-css-reset'),
              t.appendChild(e),
              this.linkFlow.attach(e),
              this.snackbar.attach(e),
              (this.attached = !0),
              (0, o.injectCssReset)();
          }
          setConnectDisabled(t) {
            this.linkFlow.setConnectDisabled(t);
          }
          addEthereumChain(t) {}
          watchAsset(t) {}
          switchEthereumChain(t) {}
          requestEthereumAccounts(t) {
            this.linkFlow.open({ onCancel: t.onCancel });
          }
          hideRequestEthereumAccounts() {
            this.linkFlow.close();
          }
          signEthereumMessage(t) {}
          signEthereumTransaction(t) {}
          submitEthereumTransaction(t) {}
          ethereumAddressFromSignedMessage(t) {}
          showConnecting(t) {
            let e;
            return (
              (e = t.isUnlinkedErrorState
                ? {
                    autoExpand: !0,
                    message: 'Connection lost',
                    menuItems: [
                      {
                        isRed: !1,
                        info: 'Reset connection',
                        svgWidth: '10',
                        svgHeight: '11',
                        path: 'M5.00008 0.96875C6.73133 0.96875 8.23758 1.94375 9.00008 3.375L10.0001 2.375V5.5H9.53133H7.96883H6.87508L7.80633 4.56875C7.41258 3.3875 6.31258 2.53125 5.00008 2.53125C3.76258 2.53125 2.70633 3.2875 2.25633 4.36875L0.812576 3.76875C1.50008 2.125 3.11258 0.96875 5.00008 0.96875ZM2.19375 6.43125C2.5875 7.6125 3.6875 8.46875 5 8.46875C6.2375 8.46875 7.29375 7.7125 7.74375 6.63125L9.1875 7.23125C8.5 8.875 6.8875 10.0312 5 10.0312C3.26875 10.0312 1.7625 9.05625 1 7.625L0 8.625V5.5H0.46875H2.03125H3.125L2.19375 6.43125Z',
                        defaultFillRule: 'evenodd',
                        defaultClipRule: 'evenodd',
                        onClick: t.onResetConnection,
                      },
                    ],
                  }
                : {
                    message: 'Confirm on phone',
                    menuItems: [
                      {
                        isRed: !0,
                        info: 'Cancel transaction',
                        svgWidth: '11',
                        svgHeight: '11',
                        path: 'M10.3711 1.52346L9.21775 0.370117L5.37109 4.21022L1.52444 0.370117L0.371094 1.52346L4.2112 5.37012L0.371094 9.21677L1.52444 10.3701L5.37109 6.53001L9.21775 10.3701L10.3711 9.21677L6.53099 5.37012L10.3711 1.52346Z',
                        defaultFillRule: 'inherit',
                        defaultClipRule: 'inherit',
                        onClick: t.onCancel,
                      },
                      {
                        isRed: !1,
                        info: 'Reset connection',
                        svgWidth: '10',
                        svgHeight: '11',
                        path: 'M5.00008 0.96875C6.73133 0.96875 8.23758 1.94375 9.00008 3.375L10.0001 2.375V5.5H9.53133H7.96883H6.87508L7.80633 4.56875C7.41258 3.3875 6.31258 2.53125 5.00008 2.53125C3.76258 2.53125 2.70633 3.2875 2.25633 4.36875L0.812576 3.76875C1.50008 2.125 3.11258 0.96875 5.00008 0.96875ZM2.19375 6.43125C2.5875 7.6125 3.6875 8.46875 5 8.46875C6.2375 8.46875 7.29375 7.7125 7.74375 6.63125L9.1875 7.23125C8.5 8.875 6.8875 10.0312 5 10.0312C3.26875 10.0312 1.7625 9.05625 1 7.625L0 8.625V5.5H0.46875H2.03125H3.125L2.19375 6.43125Z',
                        defaultFillRule: 'evenodd',
                        defaultClipRule: 'evenodd',
                        onClick: t.onResetConnection,
                      },
                    ],
                  }),
              this.snackbar.presentItem(e)
            );
          }
          reloadUI() {
            document.location.reload();
          }
          inlineAccountsResponse() {
            return !1;
          }
          inlineAddEthereumChain(t) {
            return !1;
          }
          inlineWatchAsset() {
            return !1;
          }
          inlineSwitchEthereumChain() {
            return !1;
          }
          setStandalone(t) {
            this.standalone = t;
          }
          isStandalone() {
            var t;
            return null !== (t = this.standalone) && void 0 !== t && t;
          }
        };
      },
      4493: (t, e) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }), (e.WalletUIError = void 0);
        class r extends Error {
          constructor(t, e) {
            super(t), (this.message = t), (this.errorCode = e);
          }
        }
        (e.WalletUIError = r),
          (r.UserRejectedRequest = new r('User rejected request')),
          (r.SwitchEthereumChainUnsupportedChainId = new r('Unsupported chainId', 4902));
      },
      5813: (t, e) => {
        'use strict';
        var r;
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.RelayMessageType = void 0),
          ((r = e.RelayMessageType || (e.RelayMessageType = {})).SESSION_ID_REQUEST = 'SESSION_ID_REQUEST'),
          (r.SESSION_ID_RESPONSE = 'SESSION_ID_RESPONSE'),
          (r.LINKED = 'LINKED'),
          (r.UNLINKED = 'UNLINKED'),
          (r.WEB3_REQUEST = 'WEB3_REQUEST'),
          (r.WEB3_REQUEST_CANCELED = 'WEB3_REQUEST_CANCELED'),
          (r.WEB3_RESPONSE = 'WEB3_RESPONSE');
      },
      3526: (t, e, r) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }), (e.Session = void 0);
        const n = r(2023),
          i = r(4143),
          o = r(1717),
          s = r(4643),
          a = 'session:id',
          u = 'session:secret',
          c = 'session:linked';
        class l {
          constructor(t, e, r, i) {
            (this._storage = t),
              (this._id = e || (0, s.randomBytesHex)(16)),
              (this._secret = r || (0, s.randomBytesHex)(32));
            const o = n.sha256.create();
            o.update(`${this._id}, ${this._secret} WalletLink`), (this._key = o.hex()), (this._linked = !!i);
          }
          static load(t) {
            const e = t.getItem(a),
              r = t.getItem(c),
              n = t.getItem(u);
            return e && n ? new l(t, e, n, '1' === r) : null;
          }
          static get persistedSessionIdChange$() {
            return (0, i.fromEvent)(window, 'storage').pipe(
              (0, o.filter)((t) => t.key === a),
              (0, o.map)((t) => ({ oldValue: t.oldValue || null, newValue: t.newValue || null })),
            );
          }
          static hash(t) {
            return n.sha256.create().update(t).hex();
          }
          get id() {
            return this._id;
          }
          get secret() {
            return this._secret;
          }
          get key() {
            return this._key;
          }
          get linked() {
            return this._linked;
          }
          set linked(t) {
            (this._linked = t), this.persistLinked();
          }
          save() {
            return (
              this._storage.setItem(a, this._id), this._storage.setItem(u, this._secret), this.persistLinked(), this
            );
          }
          persistLinked() {
            this._storage.setItem(c, this._linked ? '1' : '0');
          }
        }
        e.Session = l;
      },
      6570: function (t, e, r) {
        'use strict';
        var n =
            (this && this.__createBinding) ||
            (Object.create
              ? function (t, e, r, n) {
                  void 0 === n && (n = r),
                    Object.defineProperty(t, n, {
                      enumerable: !0,
                      get: function () {
                        return e[r];
                      },
                    });
                }
              : function (t, e, r, n) {
                  void 0 === n && (n = r), (t[n] = e[r]);
                }),
          i =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (t, e) {
                  Object.defineProperty(t, 'default', { enumerable: !0, value: e });
                }
              : function (t, e) {
                  t.default = e;
                }),
          o =
            (this && this.__decorate) ||
            function (t, e, r, n) {
              var i,
                o = arguments.length,
                s = o < 3 ? e : null === n ? (n = Object.getOwnPropertyDescriptor(e, r)) : n;
              if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) s = Reflect.decorate(t, e, r, n);
              else
                for (var a = t.length - 1; a >= 0; a--)
                  (i = t[a]) && (s = (o < 3 ? i(s) : o > 3 ? i(e, r, s) : i(e, r)) || s);
              return o > 3 && s && Object.defineProperty(e, r, s), s;
            },
          s =
            (this && this.__importStar) ||
            function (t) {
              if (t && t.__esModule) return t;
              var e = {};
              if (null != t)
                for (var r in t) 'default' !== r && Object.prototype.hasOwnProperty.call(t, r) && n(e, t, r);
              return i(e, t), e;
            },
          a =
            (this && this.__importDefault) ||
            function (t) {
              return t && t.__esModule ? t : { default: t };
            };
        Object.defineProperty(e, '__esModule', { value: !0 }), (e.WalletSDKRelay = void 0);
        const u = a(r(7056)),
          c = r(9826),
          l = r(4143),
          h = r(1717),
          f = r(2191),
          d = r(8876),
          p = r(4493),
          y = r(1295),
          g = r(4643),
          b = s(r(235)),
          m = r(3526),
          v = r(5633),
          w = r(9739),
          _ = r(5186),
          S = r(3770),
          E = r(7386),
          x = r(287);
        class M extends v.WalletSDKRelayAbstract {
          constructor(t) {
            var e;
            super(),
              (this.accountsCallback = null),
              (this.chainCallback = null),
              (this.appName = ''),
              (this.appLogoUrl = null),
              (this.subscriptions = new l.Subscription()),
              (this.linkAPIUrl = t.linkAPIUrl),
              (this.storage = t.storage),
              (this.options = t);
            const { session: r, ui: n, connection: i } = this.subscribe();
            if (
              ((this._session = r),
              (this.connection = i),
              (this.relayEventManager = t.relayEventManager),
              t.diagnosticLogger && t.eventListener)
            )
              throw new Error(
                'can not have both eventListener and diagnosticLogger options, use only diagnosticLogger',
              );
            t.eventListener
              ? (this.diagnostic = { log: t.eventListener.onEvent })
              : (this.diagnostic = t.diagnosticLogger),
              (this._reloadOnDisconnect = null === (e = t.reloadOnDisconnect) || void 0 === e || e),
              (this.ui = n);
          }
          subscribe() {
            const t = m.Session.load(this.storage) || new m.Session(this.storage).save(),
              e = new d.WalletSDKConnection(t.id, t.key, this.linkAPIUrl, this.diagnostic);
            this.subscriptions.add(
              e.sessionConfig$.subscribe({
                next: (t) => {
                  this.onSessionConfigChanged(t);
                },
                error: () => {
                  var t;
                  null === (t = this.diagnostic) ||
                    void 0 === t ||
                    t.log(f.EVENTS.GENERAL_ERROR, { message: 'error while invoking session config callback' });
                },
              }),
            ),
              this.subscriptions.add(
                e.incomingEvent$
                  .pipe((0, h.filter)((t) => 'Web3Response' === t.event))
                  .subscribe({ next: this.handleIncomingEvent }),
              ),
              this.subscriptions.add(
                e.linked$
                  .pipe(
                    (0, h.skip)(1),
                    (0, h.tap)((t) => {
                      var e;
                      this.isLinked = t;
                      const r = this.storage.getItem(v.LOCAL_STORAGE_ADDRESSES_KEY);
                      if ((t && (this.session.linked = t), (this.isUnlinkedErrorState = !1), r)) {
                        const n = r.split(' '),
                          i = 'true' === this.storage.getItem('IsStandaloneSigning');
                        if ('' !== n[0] && !t && this.session.linked && !i) {
                          this.isUnlinkedErrorState = !0;
                          const t = this.getSessionIdHash();
                          null === (e = this.diagnostic) ||
                            void 0 === e ||
                            e.log(f.EVENTS.UNLINKED_ERROR_STATE, { sessionIdHash: t });
                        }
                      }
                    }),
                  )
                  .subscribe(),
              ),
              this.subscriptions.add(
                e.sessionConfig$
                  .pipe((0, h.filter)((t) => !!t.metadata && '1' === t.metadata.__destroyed))
                  .subscribe(() => {
                    var t;
                    const r = e.isDestroyed;
                    return (
                      null === (t = this.diagnostic) ||
                        void 0 === t ||
                        t.log(f.EVENTS.METADATA_DESTROYED, {
                          alreadyDestroyed: r,
                          sessionIdHash: this.getSessionIdHash(),
                        }),
                      this.resetAndReload()
                    );
                  }),
              ),
              this.subscriptions.add(
                e.sessionConfig$
                  .pipe((0, h.filter)((t) => t.metadata && void 0 !== t.metadata.WalletUsername))
                  .pipe((0, h.mergeMap)((e) => b.decrypt(e.metadata.WalletUsername, t.secret)))
                  .subscribe({
                    next: (t) => {
                      this.storage.setItem(v.WALLET_USER_NAME_KEY, t);
                    },
                    error: () => {
                      var t;
                      null === (t = this.diagnostic) ||
                        void 0 === t ||
                        t.log(f.EVENTS.GENERAL_ERROR, { message: 'Had error decrypting', value: 'username' });
                    },
                  }),
              ),
              this.subscriptions.add(
                e.sessionConfig$
                  .pipe((0, h.filter)((t) => t.metadata && void 0 !== t.metadata.AppVersion))
                  .pipe((0, h.mergeMap)((e) => b.decrypt(e.metadata.AppVersion, t.secret)))
                  .subscribe({
                    next: (t) => {
                      this.storage.setItem(v.APP_VERSION_KEY, t);
                    },
                    error: () => {
                      var t;
                      null === (t = this.diagnostic) ||
                        void 0 === t ||
                        t.log(f.EVENTS.GENERAL_ERROR, { message: 'Had error decrypting', value: 'appversion' });
                    },
                  }),
              ),
              this.subscriptions.add(
                e.sessionConfig$
                  .pipe(
                    (0, h.filter)(
                      (t) => t.metadata && void 0 !== t.metadata.ChainId && void 0 !== t.metadata.JsonRpcUrl,
                    ),
                  )
                  .pipe(
                    (0, h.mergeMap)((e) =>
                      (0, l.zip)(b.decrypt(e.metadata.ChainId, t.secret), b.decrypt(e.metadata.JsonRpcUrl, t.secret)),
                    ),
                  )
                  .pipe((0, h.distinctUntilChanged)())
                  .subscribe({
                    next: ([t, e]) => {
                      this.chainCallback && this.chainCallback(t, e);
                    },
                    error: () => {
                      var t;
                      null === (t = this.diagnostic) ||
                        void 0 === t ||
                        t.log(f.EVENTS.GENERAL_ERROR, { message: 'Had error decrypting', value: 'chainId|jsonRpcUrl' });
                    },
                  }),
              ),
              this.subscriptions.add(
                e.sessionConfig$
                  .pipe((0, h.filter)((t) => t.metadata && void 0 !== t.metadata.EthereumAddress))
                  .pipe((0, h.mergeMap)((e) => b.decrypt(e.metadata.EthereumAddress, t.secret)))
                  .subscribe({
                    next: (t) => {
                      this.accountsCallback && this.accountsCallback([t]),
                        M.accountRequestCallbackIds.size > 0 &&
                          (Array.from(M.accountRequestCallbackIds.values()).forEach((e) => {
                            const r = (0, x.Web3ResponseMessage)({
                              id: e,
                              response: (0, E.RequestEthereumAccountsResponse)([t]),
                            });
                            this.invokeCallback(Object.assign(Object.assign({}, r), { id: e }));
                          }),
                          M.accountRequestCallbackIds.clear());
                    },
                    error: () => {
                      var t;
                      null === (t = this.diagnostic) ||
                        void 0 === t ||
                        t.log(f.EVENTS.GENERAL_ERROR, { message: 'Had error decrypting', value: 'selectedAddress' });
                    },
                  }),
              );
            const r = this.options.uiConstructor({
              linkAPIUrl: this.options.linkAPIUrl,
              version: this.options.version,
              darkMode: this.options.darkMode,
              session: t,
              connected$: e.connected$,
            });
            return e.connect(), { session: t, ui: r, connection: e };
          }
          attachUI() {
            this.ui.attach();
          }
          resetAndReload() {
            this.connection
              .setSessionMetadata('__destroyed', '1')
              .pipe(
                (0, h.timeout)(1e3),
                (0, h.catchError)((t) => (0, l.of)(null)),
              )
              .subscribe(
                (t) => {
                  var e, r, n;
                  const i = this.ui.isStandalone();
                  try {
                    this.subscriptions.unsubscribe();
                  } catch (t) {
                    null === (e = this.diagnostic) ||
                      void 0 === e ||
                      e.log(f.EVENTS.GENERAL_ERROR, { message: 'Had error unsubscribing' });
                  }
                  null === (r = this.diagnostic) ||
                    void 0 === r ||
                    r.log(f.EVENTS.SESSION_STATE_CHANGE, {
                      method: 'relay::resetAndReload',
                      sessionMetadataChange: '__destroyed, 1',
                      sessionIdHash: this.getSessionIdHash(),
                    }),
                    this.connection.destroy();
                  const o = m.Session.load(this.storage);
                  if (
                    ((null == o ? void 0 : o.id) === this._session.id
                      ? this.storage.clear()
                      : o &&
                        (null === (n = this.diagnostic) ||
                          void 0 === n ||
                          n.log(f.EVENTS.SKIPPED_CLEARING_SESSION, {
                            sessionIdHash: this.getSessionIdHash(),
                            storedSessionIdHash: m.Session.hash(o.id),
                          })),
                    this._reloadOnDisconnect)
                  )
                    return void this.ui.reloadUI();
                  this.accountsCallback && this.accountsCallback([], !0);
                  const { session: s, ui: a, connection: u } = this.subscribe();
                  (this._session = s),
                    (this.connection = u),
                    (this.ui = a),
                    i && this.ui.setStandalone && this.ui.setStandalone(!0),
                    this.attachUI();
                },
                (t) => {
                  var e;
                  null === (e = this.diagnostic) ||
                    void 0 === e ||
                    e.log(f.EVENTS.FAILURE, {
                      method: 'relay::resetAndReload',
                      message: `failed to reset and reload with ${t}`,
                      sessionIdHash: this.getSessionIdHash(),
                    });
                },
              );
          }
          setAppInfo(t, e) {
            (this.appName = t), (this.appLogoUrl = e);
          }
          getStorageItem(t) {
            return this.storage.getItem(t);
          }
          get session() {
            return this._session;
          }
          setStorageItem(t, e) {
            this.storage.setItem(t, e);
          }
          signEthereumMessage(t, e, r, n) {
            return this.sendRequest({
              method: w.Web3Method.signEthereumMessage,
              params: {
                message: (0, g.hexStringFromBuffer)(t, !0),
                address: e,
                addPrefix: r,
                typedDataJson: n || null,
              },
            });
          }
          ethereumAddressFromSignedMessage(t, e, r) {
            return this.sendRequest({
              method: w.Web3Method.ethereumAddressFromSignedMessage,
              params: {
                message: (0, g.hexStringFromBuffer)(t, !0),
                signature: (0, g.hexStringFromBuffer)(e, !0),
                addPrefix: r,
              },
            });
          }
          signEthereumTransaction(t) {
            return this.sendRequest({
              method: w.Web3Method.signEthereumTransaction,
              params: {
                fromAddress: t.fromAddress,
                toAddress: t.toAddress,
                weiValue: (0, g.bigIntStringFromBN)(t.weiValue),
                data: (0, g.hexStringFromBuffer)(t.data, !0),
                nonce: t.nonce,
                gasPriceInWei: t.gasPriceInWei ? (0, g.bigIntStringFromBN)(t.gasPriceInWei) : null,
                maxFeePerGas: t.gasPriceInWei ? (0, g.bigIntStringFromBN)(t.gasPriceInWei) : null,
                maxPriorityFeePerGas: t.gasPriceInWei ? (0, g.bigIntStringFromBN)(t.gasPriceInWei) : null,
                gasLimit: t.gasLimit ? (0, g.bigIntStringFromBN)(t.gasLimit) : null,
                chainId: t.chainId,
                shouldSubmit: !1,
              },
            });
          }
          signAndSubmitEthereumTransaction(t) {
            return this.sendRequest({
              method: w.Web3Method.signEthereumTransaction,
              params: {
                fromAddress: t.fromAddress,
                toAddress: t.toAddress,
                weiValue: (0, g.bigIntStringFromBN)(t.weiValue),
                data: (0, g.hexStringFromBuffer)(t.data, !0),
                nonce: t.nonce,
                gasPriceInWei: t.gasPriceInWei ? (0, g.bigIntStringFromBN)(t.gasPriceInWei) : null,
                maxFeePerGas: t.maxFeePerGas ? (0, g.bigIntStringFromBN)(t.maxFeePerGas) : null,
                maxPriorityFeePerGas: t.maxPriorityFeePerGas ? (0, g.bigIntStringFromBN)(t.maxPriorityFeePerGas) : null,
                gasLimit: t.gasLimit ? (0, g.bigIntStringFromBN)(t.gasLimit) : null,
                chainId: t.chainId,
                shouldSubmit: !0,
              },
            });
          }
          submitEthereumTransaction(t, e) {
            return this.sendRequest({
              method: w.Web3Method.submitEthereumTransaction,
              params: { signedTransaction: (0, g.hexStringFromBuffer)(t, !0), chainId: e },
            });
          }
          scanQRCode(t) {
            return this.sendRequest({ method: w.Web3Method.scanQRCode, params: { regExp: t } });
          }
          getQRCodeUrl() {
            return (0, g.createQrUrl)(this._session.id, this._session.secret, this.linkAPIUrl, !1);
          }
          genericRequest(t, e) {
            return this.sendRequest({ method: w.Web3Method.generic, params: { action: e, data: t } });
          }
          sendGenericMessage(t) {
            return this.sendRequest(t);
          }
          sendRequest(t) {
            let e = null;
            const r = (0, g.randomBytesHex)(8),
              n = (n) => {
                this.publishWeb3RequestCanceledEvent(r), this.handleErrorResponse(r, t.method, n), null == e || e();
              };
            return {
              promise: new Promise((i, o) => {
                this.ui.isStandalone() ||
                  (e = this.ui.showConnecting({
                    isUnlinkedErrorState: this.isUnlinkedErrorState,
                    onCancel: n,
                    onResetConnection: this.resetAndReload,
                  })),
                  this.relayEventManager.callbacks.set(r, (t) => {
                    if ((null == e || e(), t.errorMessage)) return o(new Error(t.errorMessage));
                    i(t);
                  }),
                  this.ui.isStandalone() ? this.sendRequestStandalone(r, t) : this.publishWeb3RequestEvent(r, t);
              }),
              cancel: n,
            };
          }
          setConnectDisabled(t) {
            this.ui.setConnectDisabled(t);
          }
          setAccountsCallback(t) {
            this.accountsCallback = t;
          }
          setChainCallback(t) {
            this.chainCallback = t;
          }
          publishWeb3RequestEvent(t, e) {
            var r;
            const n = (0, S.Web3RequestMessage)({ id: t, request: e }),
              i = m.Session.load(this.storage);
            null === (r = this.diagnostic) ||
              void 0 === r ||
              r.log(f.EVENTS.WEB3_REQUEST, {
                eventId: n.id,
                method: `relay::${n.request.method}`,
                sessionIdHash: this.getSessionIdHash(),
                storedSessionIdHash: i ? m.Session.hash(i.id) : '',
                isSessionMismatched: ((null == i ? void 0 : i.id) !== this._session.id).toString(),
              }),
              this.subscriptions.add(
                this.publishEvent('Web3Request', n, !0).subscribe({
                  next: (t) => {
                    var e;
                    null === (e = this.diagnostic) ||
                      void 0 === e ||
                      e.log(f.EVENTS.WEB3_REQUEST_PUBLISHED, {
                        eventId: n.id,
                        method: `relay::${n.request.method}`,
                        sessionIdHash: this.getSessionIdHash(),
                        storedSessionIdHash: i ? m.Session.hash(i.id) : '',
                        isSessionMismatched: ((null == i ? void 0 : i.id) !== this._session.id).toString(),
                      });
                  },
                  error: (t) => {
                    this.handleWeb3ResponseMessage(
                      (0, x.Web3ResponseMessage)({
                        id: n.id,
                        response: { method: n.request.method, errorMessage: t.message },
                      }),
                    );
                  },
                }),
              );
          }
          publishWeb3RequestCanceledEvent(t) {
            const e = (0, _.Web3RequestCanceledMessage)(t);
            this.subscriptions.add(this.publishEvent('Web3RequestCanceled', e, !1).subscribe());
          }
          publishEvent(t, e, r) {
            const n = this.session.secret;
            return new l.Observable((t) => {
              b.encrypt(JSON.stringify(Object.assign(Object.assign({}, e), { origin: location.origin })), n).then(
                (e) => {
                  t.next(e), t.complete();
                },
              );
            }).pipe((0, h.mergeMap)((e) => this.connection.publishEvent(t, e, r)));
          }
          handleIncomingEvent(t) {
            try {
              this.subscriptions.add(
                b
                  .decrypt(t.data, this.session.secret)
                  .pipe((0, h.map)((t) => JSON.parse(t)))
                  .subscribe({
                    next: (t) => {
                      const e = (0, x.isWeb3ResponseMessage)(t) ? t : null;
                      e && this.handleWeb3ResponseMessage(e);
                    },
                    error: () => {
                      var t;
                      null === (t = this.diagnostic) ||
                        void 0 === t ||
                        t.log(f.EVENTS.GENERAL_ERROR, { message: 'Had error decrypting', value: 'incomingEvent' });
                    },
                  }),
              );
            } catch (t) {
              return;
            }
          }
          handleWeb3ResponseMessage(t) {
            var e;
            const { response: r } = t;
            if (
              (null === (e = this.diagnostic) ||
                void 0 === e ||
                e.log(f.EVENTS.WEB3_RESPONSE, {
                  eventId: t.id,
                  method: `relay::${r.method}`,
                  sessionIdHash: this.getSessionIdHash(),
                }),
              (0, E.isRequestEthereumAccountsResponse)(r))
            )
              return (
                M.accountRequestCallbackIds.forEach((e) =>
                  this.invokeCallback(Object.assign(Object.assign({}, t), { id: e })),
                ),
                void M.accountRequestCallbackIds.clear()
              );
            this.invokeCallback(t);
          }
          handleErrorResponse(t, e, r, n) {
            this.handleWeb3ResponseMessage(
              (0, x.Web3ResponseMessage)({
                id: t,
                response: (0, E.ErrorResponse)(e, (null != r ? r : p.WalletUIError.UserRejectedRequest).message, n),
              }),
            );
          }
          invokeCallback(t) {
            const e = this.relayEventManager.callbacks.get(t.id);
            e && (e(t.response), this.relayEventManager.callbacks.delete(t.id));
          }
          requestEthereumAccounts() {
            const t = {
                method: w.Web3Method.requestEthereumAccounts,
                params: { appName: this.appName, appLogoUrl: this.appLogoUrl || null },
              },
              e = (0, g.randomBytesHex)(8),
              r = (r) => {
                this.publishWeb3RequestCanceledEvent(e), this.handleErrorResponse(e, t.method, r);
              };
            return {
              promise: new Promise((n, i) => {
                var o;
                this.relayEventManager.callbacks.set(e, (t) => {
                  if ((this.ui.hideRequestEthereumAccounts(), t.errorMessage)) return i(new Error(t.errorMessage));
                  n(t);
                });
                const s =
                  (null === (o = null === window || void 0 === window ? void 0 : window.navigator) || void 0 === o
                    ? void 0
                    : o.userAgent) || null;
                if (s && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(s))
                  window.location.href = `https://go.cb-w.com/xoXnYwQimhb?cb_url=${encodeURIComponent(
                    window.location.href,
                  )}`;
                else {
                  if (this.ui.inlineAccountsResponse()) {
                    const t = (t) => {
                      this.handleWeb3ResponseMessage(
                        (0, x.Web3ResponseMessage)({ id: e, response: (0, E.RequestEthereumAccountsResponse)(t) }),
                      );
                    };
                    this.ui.requestEthereumAccounts({ onCancel: r, onAccounts: t });
                  } else this.ui.requestEthereumAccounts({ onCancel: r });
                  M.accountRequestCallbackIds.add(e),
                    this.ui.inlineAccountsResponse() || this.ui.isStandalone() || this.publishWeb3RequestEvent(e, t);
                }
              }),
              cancel: r,
            };
          }
          selectProvider(t) {
            const e = { method: w.Web3Method.selectProvider, params: { providerOptions: t } },
              r = (0, g.randomBytesHex)(8);
            return {
              cancel: (t) => {
                this.publishWeb3RequestCanceledEvent(r), this.handleErrorResponse(r, e.method, t);
              },
              promise: new Promise((e, n) => {
                this.relayEventManager.callbacks.set(r, (t) => {
                  if (t.errorMessage) return n(new Error(t.errorMessage));
                  e(t);
                }),
                  this.ui.selectProvider &&
                    this.ui.selectProvider({
                      onApprove: (t) => {
                        this.handleWeb3ResponseMessage(
                          (0, x.Web3ResponseMessage)({ id: r, response: (0, E.SelectProviderResponse)(t) }),
                        );
                      },
                      onCancel: (t) => {
                        this.handleWeb3ResponseMessage(
                          (0, x.Web3ResponseMessage)({
                            id: r,
                            response: (0, E.SelectProviderResponse)(y.ProviderType.Unselected),
                          }),
                        );
                      },
                      providerOptions: t,
                    });
              }),
            };
          }
          watchAsset(t, e, r, n, i, o) {
            const s = {
              method: w.Web3Method.watchAsset,
              params: { type: t, options: { address: e, symbol: r, decimals: n, image: i }, chainId: o },
            };
            let a = null;
            const u = (0, g.randomBytesHex)(8),
              c = (t) => {
                this.publishWeb3RequestCanceledEvent(u), this.handleErrorResponse(u, s.method, t), null == a || a();
              };
            return (
              this.ui.inlineWatchAsset() ||
                (a = this.ui.showConnecting({
                  isUnlinkedErrorState: this.isUnlinkedErrorState,
                  onCancel: c,
                  onResetConnection: this.resetAndReload,
                })),
              {
                cancel: c,
                promise: new Promise((c, l) => {
                  this.relayEventManager.callbacks.set(u, (t) => {
                    if ((null == a || a(), t.errorMessage)) return l(new Error(t.errorMessage));
                    c(t);
                  });
                  this.ui.inlineWatchAsset() &&
                    this.ui.watchAsset({
                      onApprove: () => {
                        this.handleWeb3ResponseMessage(
                          (0, x.Web3ResponseMessage)({ id: u, response: (0, E.WatchAssetReponse)(!0) }),
                        );
                      },
                      onCancel: (t) => {
                        this.handleWeb3ResponseMessage(
                          (0, x.Web3ResponseMessage)({ id: u, response: (0, E.WatchAssetReponse)(!1) }),
                        );
                      },
                      type: t,
                      address: e,
                      symbol: r,
                      decimals: n,
                      image: i,
                      chainId: o,
                    }),
                    this.ui.inlineWatchAsset() || this.ui.isStandalone() || this.publishWeb3RequestEvent(u, s);
                }),
              }
            );
          }
          addEthereumChain(t, e, r, n, i, o) {
            const s = {
              method: w.Web3Method.addEthereumChain,
              params: { chainId: t, rpcUrls: e, blockExplorerUrls: n, chainName: i, iconUrls: r, nativeCurrency: o },
            };
            let a = null;
            const u = (0, g.randomBytesHex)(8),
              c = (t) => {
                this.publishWeb3RequestCanceledEvent(u), this.handleErrorResponse(u, s.method, t), null == a || a();
              };
            return (
              this.ui.inlineAddEthereumChain(t) ||
                (a = this.ui.showConnecting({
                  isUnlinkedErrorState: this.isUnlinkedErrorState,
                  onCancel: c,
                  onResetConnection: this.resetAndReload,
                })),
              {
                promise: new Promise((e, r) => {
                  this.relayEventManager.callbacks.set(u, (t) => {
                    if ((null == a || a(), t.errorMessage)) return r(new Error(t.errorMessage));
                    e(t);
                  });
                  this.ui.inlineAddEthereumChain(t) &&
                    this.ui.addEthereumChain({
                      onCancel: (t) => {
                        this.handleWeb3ResponseMessage(
                          (0, x.Web3ResponseMessage)({
                            id: u,
                            response: (0, E.AddEthereumChainResponse)({ isApproved: !1, rpcUrl: '' }),
                          }),
                        );
                      },
                      onApprove: (t) => {
                        this.handleWeb3ResponseMessage(
                          (0, x.Web3ResponseMessage)({
                            id: u,
                            response: (0, E.AddEthereumChainResponse)({ isApproved: !0, rpcUrl: t }),
                          }),
                        );
                      },
                      chainId: s.params.chainId,
                      rpcUrls: s.params.rpcUrls,
                      blockExplorerUrls: s.params.blockExplorerUrls,
                      chainName: s.params.chainName,
                      iconUrls: s.params.iconUrls,
                      nativeCurrency: s.params.nativeCurrency,
                    }),
                    this.ui.inlineAddEthereumChain(t) || this.ui.isStandalone() || this.publishWeb3RequestEvent(u, s);
                }),
                cancel: c,
              }
            );
          }
          switchEthereumChain(t) {
            const e = { method: w.Web3Method.switchEthereumChain, params: { chainId: t } };
            let r = null;
            const n = (0, g.randomBytesHex)(8),
              i = (t) => {
                this.publishWeb3RequestCanceledEvent(n), this.handleErrorResponse(n, e.method, t), null == r || r();
              };
            return (
              this.ui.inlineSwitchEthereumChain() ||
                (r = this.ui.showConnecting({
                  isUnlinkedErrorState: this.isUnlinkedErrorState,
                  onCancel: i,
                  onResetConnection: this.resetAndReload,
                })),
              {
                promise: new Promise((t, i) => {
                  this.relayEventManager.callbacks.set(
                    n,
                    (e) => (
                      null == r || r(),
                      e.errorMessage && e.errorCode
                        ? i(
                            c.ethErrors.provider.custom({
                              code: e.errorCode,
                              message: 'Unrecognized chain ID. Try adding the chain using addEthereumChain first.',
                            }),
                          )
                        : e.errorMessage
                          ? i(new Error(e.errorMessage))
                          : void t(e)
                    ),
                  ),
                    this.ui.switchEthereumChain({
                      onCancel: (t) => {
                        if ('number' == typeof t) {
                          const e = t;
                          this.handleWeb3ResponseMessage(
                            (0, x.Web3ResponseMessage)({
                              id: n,
                              response: (0, E.ErrorResponse)(
                                w.Web3Method.switchEthereumChain,
                                p.WalletUIError.SwitchEthereumChainUnsupportedChainId.message,
                                e,
                              ),
                            }),
                          );
                        } else
                          t instanceof p.WalletUIError
                            ? this.handleErrorResponse(n, w.Web3Method.switchEthereumChain, t, t.errorCode)
                            : this.handleWeb3ResponseMessage(
                                (0, x.Web3ResponseMessage)({
                                  id: n,
                                  response: (0, E.SwitchEthereumChainResponse)({ isApproved: !1, rpcUrl: '' }),
                                }),
                              );
                      },
                      onApprove: (t) => {
                        this.handleWeb3ResponseMessage(
                          (0, x.Web3ResponseMessage)({
                            id: n,
                            response: (0, E.SwitchEthereumChainResponse)({ isApproved: !0, rpcUrl: t }),
                          }),
                        );
                      },
                      chainId: e.params.chainId,
                    }),
                    this.ui.inlineSwitchEthereumChain() || this.ui.isStandalone() || this.publishWeb3RequestEvent(n, e);
                }),
                cancel: i,
              }
            );
          }
          inlineAddEthereumChain(t) {
            return this.ui.inlineAddEthereumChain(t);
          }
          getSessionIdHash() {
            return m.Session.hash(this._session.id);
          }
          sendRequestStandalone(t, e) {
            const r = (r) => {
                this.handleErrorResponse(t, e.method, r);
              },
              n = (e) => {
                this.handleWeb3ResponseMessage((0, x.Web3ResponseMessage)({ id: t, response: e }));
              };
            switch (e.method) {
              case w.Web3Method.signEthereumMessage:
                this.ui.signEthereumMessage({ request: e, onSuccess: n, onCancel: r });
                break;
              case w.Web3Method.signEthereumTransaction:
                this.ui.signEthereumTransaction({ request: e, onSuccess: n, onCancel: r });
                break;
              case w.Web3Method.submitEthereumTransaction:
                this.ui.submitEthereumTransaction({ request: e, onSuccess: n, onCancel: r });
                break;
              case w.Web3Method.ethereumAddressFromSignedMessage:
                this.ui.ethereumAddressFromSignedMessage({ request: e, onSuccess: n });
                break;
              default:
                r();
            }
          }
          onSessionConfigChanged(t) {}
        }
        (M.accountRequestCallbackIds = new Set()),
          o([u.default], M.prototype, 'resetAndReload', null),
          o([u.default], M.prototype, 'handleIncomingEvent', null),
          (e.WalletSDKRelay = M);
      },
      5633: (t, e, r) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.WalletSDKRelayAbstract =
            e.APP_VERSION_KEY =
            e.LOCAL_STORAGE_ADDRESSES_KEY =
            e.WALLET_USER_NAME_KEY =
              void 0);
        const n = r(9826);
        (e.WALLET_USER_NAME_KEY = 'walletUsername'),
          (e.LOCAL_STORAGE_ADDRESSES_KEY = 'Addresses'),
          (e.APP_VERSION_KEY = 'AppVersion'),
          (e.WalletSDKRelayAbstract = class {
            async makeEthereumJSONRPCRequest(t, e) {
              if (!e) throw new Error('Error: No jsonRpcUrl provided');
              return window
                .fetch(e, {
                  method: 'POST',
                  body: JSON.stringify(t),
                  mode: 'cors',
                  headers: { 'Content-Type': 'application/json' },
                })
                .then((t) => t.json())
                .then((t) => {
                  if (!t) throw n.ethErrors.rpc.parse({});
                  const e = t,
                    { error: r } = e;
                  if (r) throw (0, n.serializeError)(r);
                  return e;
                });
            }
          });
      },
      7472: (t, e, r) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }), (e.WalletSDKRelayEventManager = void 0);
        const n = r(4643);
        e.WalletSDKRelayEventManager = class {
          constructor() {
            (this._nextRequestId = 0), (this.callbacks = new Map());
          }
          makeRequestId() {
            this._nextRequestId = (this._nextRequestId + 1) % 2147483647;
            const t = this._nextRequestId,
              e = (0, n.prepend0x)(t.toString(16));
            return this.callbacks.get(e) && this.callbacks.delete(e), t;
          }
        };
      },
      9739: (t, e) => {
        'use strict';
        var r;
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.Web3Method = void 0),
          ((r = e.Web3Method || (e.Web3Method = {})).requestEthereumAccounts = 'requestEthereumAccounts'),
          (r.signEthereumMessage = 'signEthereumMessage'),
          (r.signEthereumTransaction = 'signEthereumTransaction'),
          (r.submitEthereumTransaction = 'submitEthereumTransaction'),
          (r.ethereumAddressFromSignedMessage = 'ethereumAddressFromSignedMessage'),
          (r.scanQRCode = 'scanQRCode'),
          (r.generic = 'generic'),
          (r.childRequestEthereumAccounts = 'childRequestEthereumAccounts'),
          (r.addEthereumChain = 'addEthereumChain'),
          (r.switchEthereumChain = 'switchEthereumChain'),
          (r.makeEthereumJSONRPCRequest = 'makeEthereumJSONRPCRequest'),
          (r.watchAsset = 'watchAsset'),
          (r.selectProvider = 'selectProvider');
      },
      5186: (t, e, r) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }), (e.Web3RequestCanceledMessage = void 0);
        const n = r(5813);
        e.Web3RequestCanceledMessage = function (t) {
          return { type: n.RelayMessageType.WEB3_REQUEST_CANCELED, id: t };
        };
      },
      3770: (t, e, r) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }), (e.Web3RequestMessage = void 0);
        const n = r(5813);
        e.Web3RequestMessage = function (t) {
          return Object.assign({ type: n.RelayMessageType.WEB3_REQUEST }, t);
        };
      },
      7386: (t, e, r) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.EthereumAddressFromSignedMessageResponse =
            e.SubmitEthereumTransactionResponse =
            e.SignEthereumTransactionResponse =
            e.SignEthereumMessageResponse =
            e.isRequestEthereumAccountsResponse =
            e.SelectProviderResponse =
            e.WatchAssetReponse =
            e.RequestEthereumAccountsResponse =
            e.SwitchEthereumChainResponse =
            e.AddEthereumChainResponse =
            e.ErrorResponse =
              void 0);
        const n = r(9739);
        (e.ErrorResponse = function (t, e, r) {
          return { method: t, errorMessage: e, errorCode: r };
        }),
          (e.AddEthereumChainResponse = function (t) {
            return { method: n.Web3Method.addEthereumChain, result: t };
          }),
          (e.SwitchEthereumChainResponse = function (t) {
            return { method: n.Web3Method.switchEthereumChain, result: t };
          }),
          (e.RequestEthereumAccountsResponse = function (t) {
            return { method: n.Web3Method.requestEthereumAccounts, result: t };
          }),
          (e.WatchAssetReponse = function (t) {
            return { method: n.Web3Method.watchAsset, result: t };
          }),
          (e.SelectProviderResponse = function (t) {
            return { method: n.Web3Method.selectProvider, result: t };
          }),
          (e.isRequestEthereumAccountsResponse = function (t) {
            return t && t.method === n.Web3Method.requestEthereumAccounts;
          }),
          (e.SignEthereumMessageResponse = function (t) {
            return { method: n.Web3Method.signEthereumMessage, result: t };
          }),
          (e.SignEthereumTransactionResponse = function (t) {
            return { method: n.Web3Method.signEthereumTransaction, result: t };
          }),
          (e.SubmitEthereumTransactionResponse = function (t) {
            return { method: n.Web3Method.submitEthereumTransaction, result: t };
          }),
          (e.EthereumAddressFromSignedMessageResponse = function (t) {
            return { method: n.Web3Method.ethereumAddressFromSignedMessage, result: t };
          });
      },
      287: (t, e, r) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.isWeb3ResponseMessage = e.Web3ResponseMessage = void 0);
        const n = r(5813);
        (e.Web3ResponseMessage = function (t) {
          return Object.assign({ type: n.RelayMessageType.WEB3_RESPONSE }, t);
        }),
          (e.isWeb3ResponseMessage = function (t) {
            return t && t.type === n.RelayMessageType.WEB3_RESPONSE;
          });
      },
      235: (t, e, r) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }), (e.decrypt = e.encrypt = void 0);
        const n = r(4143),
          i = r(4643);
        (e.encrypt = async function (t, e) {
          if (64 !== e.length) throw Error('secret must be 256 bits');
          const r = crypto.getRandomValues(new Uint8Array(12)),
            n = await crypto.subtle.importKey('raw', (0, i.hexStringToUint8Array)(e), { name: 'aes-gcm' }, !1, [
              'encrypt',
              'decrypt',
            ]),
            o = new TextEncoder(),
            s = await window.crypto.subtle.encrypt({ name: 'AES-GCM', iv: r }, n, o.encode(t)),
            a = s.slice(s.byteLength - 16),
            u = s.slice(0, s.byteLength - 16),
            c = new Uint8Array(a),
            l = new Uint8Array(u),
            h = new Uint8Array([...r, ...c, ...l]);
          return (0, i.uint8ArrayToHex)(h);
        }),
          (e.decrypt = function (t, e) {
            if (64 !== e.length) throw Error('secret must be 256 bits');
            return new n.Observable((r) => {
              !(async function () {
                const n = await crypto.subtle.importKey(
                    'raw',
                    (0, i.hexStringToUint8Array)(e),
                    { name: 'aes-gcm' },
                    !1,
                    ['encrypt', 'decrypt'],
                  ),
                  o = (0, i.hexStringToUint8Array)(t),
                  s = o.slice(0, 12),
                  a = o.slice(12, 28),
                  u = o.slice(28),
                  c = new Uint8Array([...u, ...a]),
                  l = { name: 'AES-GCM', iv: new Uint8Array(s) };
                try {
                  const t = await window.crypto.subtle.decrypt(l, n, c),
                    e = new TextDecoder();
                  r.next(e.decode(t)), r.complete();
                } catch (t) {
                  r.error(t);
                }
              })();
            });
          });
      },
      1295: (t, e) => {
        'use strict';
        var r;
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.ProviderType =
            e.RegExpString =
            e.IntNumber =
            e.BigIntString =
            e.AddressString =
            e.HexString =
            e.OpaqueType =
              void 0),
          (e.OpaqueType = function () {
            return (t) => t;
          }),
          (e.HexString = (t) => t),
          (e.AddressString = (t) => t),
          (e.BigIntString = (t) => t),
          (e.IntNumber = function (t) {
            return Math.floor(t);
          }),
          (e.RegExpString = (t) => t),
          ((r = e.ProviderType || (e.ProviderType = {})).CoinbaseWallet = 'CoinbaseWallet'),
          (r.MetaMask = 'MetaMask'),
          (r.Unselected = '');
      },
      4643: function (t, e, r) {
        'use strict';
        var n = r(8764).Buffer,
          i =
            (this && this.__importDefault) ||
            function (t) {
              return t && t.__esModule ? t : { default: t };
            };
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.createQrUrl =
            e.getFavicon =
            e.range =
            e.isBigNumber =
            e.ensureParsedJSONObject =
            e.ensureBN =
            e.ensureRegExpString =
            e.ensureIntNumber =
            e.ensureBuffer =
            e.ensureAddressString =
            e.ensureEvenLengthHexString =
            e.ensureHexString =
            e.isHexString =
            e.prepend0x =
            e.strip0x =
            e.has0xPrefix =
            e.hexStringFromIntNumber =
            e.intNumberFromHexString =
            e.bigIntStringFromBN =
            e.hexStringFromBuffer =
            e.hexStringToUint8Array =
            e.uint8ArrayToHex =
            e.randomBytesHex =
              void 0);
        const o = i(r(3550)),
          s = r(129),
          a = r(1295),
          u = /^[0-9]*$/,
          c = /^[a-f0-9]*$/;
        function l(t) {
          return [...t].map((t) => t.toString(16).padStart(2, '0')).join('');
        }
        function h(t) {
          return t.startsWith('0x') || t.startsWith('0X');
        }
        function f(t) {
          return h(t) ? t.slice(2) : t;
        }
        function d(t) {
          return h(t) ? '0x' + t.slice(2) : '0x' + t;
        }
        function p(t) {
          if ('string' != typeof t) return !1;
          const e = f(t).toLowerCase();
          return c.test(e);
        }
        function y(t, e = !1) {
          if ('string' == typeof t) {
            const r = f(t).toLowerCase();
            if (c.test(r)) return (0, a.HexString)(e ? '0x' + r : r);
          }
          throw new Error(`"${String(t)}" is not a hexadecimal string`);
        }
        function g(t, e = !1) {
          let r = y(t, !1);
          return r.length % 2 == 1 && (r = (0, a.HexString)('0' + r)), e ? (0, a.HexString)('0x' + r) : r;
        }
        function b(t) {
          if ('number' == typeof t && Number.isInteger(t)) return (0, a.IntNumber)(t);
          if ('string' == typeof t) {
            if (u.test(t)) return (0, a.IntNumber)(Number(t));
            if (p(t)) return (0, a.IntNumber)(new o.default(g(t, !1), 16).toNumber());
          }
          throw new Error(`Not an integer: ${String(t)}`);
        }
        function m(t) {
          if (null == t || 'function' != typeof t.constructor) return !1;
          const { constructor: e } = t;
          return 'function' == typeof e.config && 'number' == typeof e.EUCLID;
        }
        (e.randomBytesHex = function (t) {
          return l(crypto.getRandomValues(new Uint8Array(t)));
        }),
          (e.uint8ArrayToHex = l),
          (e.hexStringToUint8Array = function (t) {
            return new Uint8Array(t.match(/.{1,2}/g).map((t) => parseInt(t, 16)));
          }),
          (e.hexStringFromBuffer = function (t, e = !1) {
            const r = t.toString('hex');
            return (0, a.HexString)(e ? '0x' + r : r);
          }),
          (e.bigIntStringFromBN = function (t) {
            return (0, a.BigIntString)(t.toString(10));
          }),
          (e.intNumberFromHexString = function (t) {
            return (0, a.IntNumber)(new o.default(g(t, !1), 16).toNumber());
          }),
          (e.hexStringFromIntNumber = function (t) {
            return (0, a.HexString)('0x' + new o.default(t).toString(16));
          }),
          (e.has0xPrefix = h),
          (e.strip0x = f),
          (e.prepend0x = d),
          (e.isHexString = p),
          (e.ensureHexString = y),
          (e.ensureEvenLengthHexString = g),
          (e.ensureAddressString = function (t) {
            if ('string' == typeof t) {
              const e = f(t).toLowerCase();
              if (p(e) && 40 === e.length) return (0, a.AddressString)(d(e));
            }
            throw new Error(`Invalid Ethereum address: ${String(t)}`);
          }),
          (e.ensureBuffer = function (t) {
            if (n.isBuffer(t)) return t;
            if ('string' == typeof t) {
              if (p(t)) {
                const e = g(t, !1);
                return n.from(e, 'hex');
              }
              return n.from(t, 'utf8');
            }
            throw new Error(`Not binary data: ${String(t)}`);
          }),
          (e.ensureIntNumber = b),
          (e.ensureRegExpString = function (t) {
            if (t instanceof RegExp) return (0, a.RegExpString)(t.toString());
            throw new Error(`Not a RegExp: ${String(t)}`);
          }),
          (e.ensureBN = function (t) {
            if (null !== t && (o.default.isBN(t) || m(t))) return new o.default(t.toString(10), 10);
            if ('number' == typeof t) return new o.default(b(t));
            if ('string' == typeof t) {
              if (u.test(t)) return new o.default(t, 10);
              if (p(t)) return new o.default(g(t, !1), 16);
            }
            throw new Error(`Not an integer: ${String(t)}`);
          }),
          (e.ensureParsedJSONObject = function (t) {
            if ('string' == typeof t) return JSON.parse(t);
            if ('object' == typeof t) return t;
            throw new Error(`Not a JSON string or an object: ${String(t)}`);
          }),
          (e.isBigNumber = m),
          (e.range = function (t, e) {
            return Array.from({ length: e - t }, (e, r) => t + r);
          }),
          (e.getFavicon = function () {
            const t =
                document.querySelector('link[sizes="192x192"]') ||
                document.querySelector('link[sizes="180x180"]') ||
                document.querySelector('link[rel="icon"]') ||
                document.querySelector('link[rel="shortcut icon"]'),
              { protocol: e, host: r } = document.location,
              n = t ? t.getAttribute('href') : null;
            return !n || n.startsWith('javascript:')
              ? null
              : n.startsWith('http://') || n.startsWith('https://') || n.startsWith('data:')
                ? n
                : n.startsWith('//')
                  ? e + n
                  : `${e}//${r}${n}`;
          }),
          (e.createQrUrl = function (t, e, r, n) {
            const i = n ? 'parent-id' : 'id';
            return `${r}/#/link?${(0, s.stringify)({ [i]: t, secret: e, server: r, v: '1' })}`;
          });
      },
      6089: (t, e, r) => {
        var n = r(8764).Buffer;
        const i = r(2518),
          o = r(3550);
        function s(t) {
          return t.startsWith('int[')
            ? 'int256' + t.slice(3)
            : 'int' === t
              ? 'int256'
              : t.startsWith('uint[')
                ? 'uint256' + t.slice(4)
                : 'uint' === t
                  ? 'uint256'
                  : t.startsWith('fixed[')
                    ? 'fixed128x128' + t.slice(5)
                    : 'fixed' === t
                      ? 'fixed128x128'
                      : t.startsWith('ufixed[')
                        ? 'ufixed128x128' + t.slice(6)
                        : 'ufixed' === t
                          ? 'ufixed128x128'
                          : t;
        }
        function a(t) {
          return parseInt(/^\D+(\d+)$/.exec(t)[1], 10);
        }
        function u(t) {
          var e = /^\D+(\d+)x(\d+)$/.exec(t);
          return [parseInt(e[1], 10), parseInt(e[2], 10)];
        }
        function c(t) {
          var e = t.match(/(.*)\[(.*?)\]$/);
          return e ? ('' === e[2] ? 'dynamic' : parseInt(e[2], 10)) : null;
        }
        function l(t) {
          var e = typeof t;
          if ('string' === e) return i.isHexString(t) ? new o(i.stripHexPrefix(t), 16) : new o(t, 10);
          if ('number' === e) return new o(t);
          if (t.toArray) return t;
          throw new Error('Argument is not a number');
        }
        function h(t, e) {
          var r, s, f, d;
          if ('address' === t) return h('uint160', l(e));
          if ('bool' === t) return h('uint8', e ? 1 : 0);
          if ('string' === t) return h('bytes', new n(e, 'utf8'));
          if (
            (function (t) {
              return t.lastIndexOf(']') === t.length - 1;
            })(t)
          ) {
            if (void 0 === e.length) throw new Error('Not an array?');
            if ('dynamic' !== (r = c(t)) && 0 !== r && e.length > r)
              throw new Error('Elements exceed array size: ' + r);
            for (d in ((f = []), (t = t.slice(0, t.lastIndexOf('['))), 'string' == typeof e && (e = JSON.parse(e)), e))
              f.push(h(t, e[d]));
            if ('dynamic' === r) {
              var p = h('uint256', e.length);
              f.unshift(p);
            }
            return n.concat(f);
          }
          if ('bytes' === t)
            return (
              (e = new n(e)),
              (f = n.concat([h('uint256', e.length), e])),
              e.length % 32 != 0 && (f = n.concat([f, i.zeros(32 - (e.length % 32))])),
              f
            );
          if (t.startsWith('bytes')) {
            if ((r = a(t)) < 1 || r > 32) throw new Error('Invalid bytes<N> width: ' + r);
            return i.setLengthRight(e, 32);
          }
          if (t.startsWith('uint')) {
            if ((r = a(t)) % 8 || r < 8 || r > 256) throw new Error('Invalid uint<N> width: ' + r);
            if ((s = l(e)).bitLength() > r)
              throw new Error('Supplied uint exceeds width: ' + r + ' vs ' + s.bitLength());
            if (s < 0) throw new Error('Supplied uint is negative');
            return s.toArrayLike(n, 'be', 32);
          }
          if (t.startsWith('int')) {
            if ((r = a(t)) % 8 || r < 8 || r > 256) throw new Error('Invalid int<N> width: ' + r);
            if ((s = l(e)).bitLength() > r)
              throw new Error('Supplied int exceeds width: ' + r + ' vs ' + s.bitLength());
            return s.toTwos(256).toArrayLike(n, 'be', 32);
          }
          if (t.startsWith('ufixed')) {
            if (((r = u(t)), (s = l(e)) < 0)) throw new Error('Supplied ufixed is negative');
            return h('uint256', s.mul(new o(2).pow(new o(r[1]))));
          }
          if (t.startsWith('fixed')) return (r = u(t)), h('int256', l(e).mul(new o(2).pow(new o(r[1]))));
          throw new Error('Unsupported or invalid type: ' + t);
        }
        function f(t) {
          return 'string' === t || 'bytes' === t || 'dynamic' === c(t);
        }
        function d(t, e) {
          if (t.length !== e.length) throw new Error('Number of types are not matching the values');
          for (var r, o, u = [], c = 0; c < t.length; c++) {
            var h = s(t[c]),
              f = e[c];
            if ('bytes' === h) u.push(f);
            else if ('string' === h) u.push(new n(f, 'utf8'));
            else if ('bool' === h) u.push(new n(f ? '01' : '00', 'hex'));
            else if ('address' === h) u.push(i.setLength(f, 20));
            else if (h.startsWith('bytes')) {
              if ((r = a(h)) < 1 || r > 32) throw new Error('Invalid bytes<N> width: ' + r);
              u.push(i.setLengthRight(f, r));
            } else if (h.startsWith('uint')) {
              if ((r = a(h)) % 8 || r < 8 || r > 256) throw new Error('Invalid uint<N> width: ' + r);
              if ((o = l(f)).bitLength() > r)
                throw new Error('Supplied uint exceeds width: ' + r + ' vs ' + o.bitLength());
              u.push(o.toArrayLike(n, 'be', r / 8));
            } else {
              if (!h.startsWith('int')) throw new Error('Unsupported or invalid type: ' + h);
              if ((r = a(h)) % 8 || r < 8 || r > 256) throw new Error('Invalid int<N> width: ' + r);
              if ((o = l(f)).bitLength() > r)
                throw new Error('Supplied int exceeds width: ' + r + ' vs ' + o.bitLength());
              u.push(o.toTwos(r).toArrayLike(n, 'be', r / 8));
            }
          }
          return n.concat(u);
        }
        t.exports = {
          rawEncode: function (t, e) {
            var r = [],
              i = [],
              o = 32 * t.length;
            for (var a in t) {
              var u = s(t[a]),
                c = h(u, e[a]);
              f(u) ? (r.push(h('uint256', o)), i.push(c), (o += c.length)) : r.push(c);
            }
            return n.concat(r.concat(i));
          },
          solidityPack: d,
          soliditySHA3: function (t, e) {
            return i.keccak(d(t, e));
          },
        };
      },
      4497: (t, e, r) => {
        var n = r(8764).Buffer;
        const i = r(2518),
          o = r(6089),
          s = {
            type: 'object',
            properties: {
              types: {
                type: 'object',
                additionalProperties: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: { name: { type: 'string' }, type: { type: 'string' } },
                    required: ['name', 'type'],
                  },
                },
              },
              primaryType: { type: 'string' },
              domain: { type: 'object' },
              message: { type: 'object' },
            },
            required: ['types', 'primaryType', 'domain', 'message'],
          },
          a = {
            encodeData(t, e, r, s = !0) {
              const a = ['bytes32'],
                u = [this.hashType(t, r)];
              if (s) {
                const c = (t, e, a) => {
                  if (void 0 !== r[e])
                    return [
                      'bytes32',
                      null == a
                        ? '0x0000000000000000000000000000000000000000000000000000000000000000'
                        : i.keccak(this.encodeData(e, a, r, s)),
                    ];
                  if (void 0 === a) throw new Error(`missing value for field ${t} of type ${e}`);
                  if ('bytes' === e) return ['bytes32', i.keccak(a)];
                  if ('string' === e) return 'string' == typeof a && (a = n.from(a, 'utf8')), ['bytes32', i.keccak(a)];
                  if (e.lastIndexOf(']') === e.length - 1) {
                    const r = e.slice(0, e.lastIndexOf('[')),
                      n = a.map((e) => c(t, r, e));
                    return [
                      'bytes32',
                      i.keccak(
                        o.rawEncode(
                          n.map(([t]) => t),
                          n.map(([, t]) => t),
                        ),
                      ),
                    ];
                  }
                  return [e, a];
                };
                for (const n of r[t]) {
                  const [t, r] = c(n.name, n.type, e[n.name]);
                  a.push(t), u.push(r);
                }
              } else
                for (const o of r[t]) {
                  let t = e[o.name];
                  if (void 0 !== t)
                    if ('bytes' === o.type) a.push('bytes32'), (t = i.keccak(t)), u.push(t);
                    else if ('string' === o.type)
                      a.push('bytes32'), 'string' == typeof t && (t = n.from(t, 'utf8')), (t = i.keccak(t)), u.push(t);
                    else if (void 0 !== r[o.type])
                      a.push('bytes32'), (t = i.keccak(this.encodeData(o.type, t, r, s))), u.push(t);
                    else {
                      if (o.type.lastIndexOf(']') === o.type.length - 1)
                        throw new Error('Arrays currently unimplemented in encodeData');
                      a.push(o.type), u.push(t);
                    }
                }
              return o.rawEncode(a, u);
            },
            encodeType(t, e) {
              let r = '',
                n = this.findTypeDependencies(t, e).filter((e) => e !== t);
              n = [t].concat(n.sort());
              for (const t of n) {
                if (!e[t]) throw new Error('No type definition specified: ' + t);
                r += t + '(' + e[t].map(({ name: t, type: e }) => e + ' ' + t).join(',') + ')';
              }
              return r;
            },
            findTypeDependencies(t, e, r = []) {
              if (((t = t.match(/^\w*/)[0]), r.includes(t) || void 0 === e[t])) return r;
              r.push(t);
              for (const n of e[t])
                for (const t of this.findTypeDependencies(n.type, e, r)) !r.includes(t) && r.push(t);
              return r;
            },
            hashStruct(t, e, r, n = !0) {
              return i.keccak(this.encodeData(t, e, r, n));
            },
            hashType(t, e) {
              return i.keccak(this.encodeType(t, e));
            },
            sanitizeData(t) {
              const e = {};
              for (const r in s.properties) t[r] && (e[r] = t[r]);
              return e.types && (e.types = Object.assign({ EIP712Domain: [] }, e.types)), e;
            },
            hash(t, e = !0) {
              const r = this.sanitizeData(t),
                o = [n.from('1901', 'hex')];
              return (
                o.push(this.hashStruct('EIP712Domain', r.domain, r.types, e)),
                'EIP712Domain' !== r.primaryType && o.push(this.hashStruct(r.primaryType, r.message, r.types, e)),
                i.keccak(n.concat(o))
              );
            },
          };
        t.exports = {
          TYPED_MESSAGE_SCHEMA: s,
          TypedDataUtils: a,
          hashForSignTypedDataLegacy: function (t) {
            return (function (t) {
              const e = new Error('Expect argument to be non-empty array');
              if ('object' != typeof t || !t.length) throw e;
              const r = t.map(function (t) {
                  return 'bytes' === t.type ? i.toBuffer(t.value) : t.value;
                }),
                n = t.map(function (t) {
                  return t.type;
                }),
                s = t.map(function (t) {
                  if (!t.name) throw e;
                  return t.type + ' ' + t.name;
                });
              return o.soliditySHA3(
                ['bytes32', 'bytes32'],
                [o.soliditySHA3(new Array(t.length).fill('string'), s), o.soliditySHA3(n, r)],
              );
            })(t.data);
          },
          hashForSignTypedData_v3: function (t) {
            return a.hash(t.data, !1);
          },
          hashForSignTypedData_v4: function (t) {
            return a.hash(t.data);
          },
        };
      },
      2518: (t, e, r) => {
        var n = r(8764).Buffer;
        const i = r(8598),
          o = r(3550);
        function s(t) {
          return n.allocUnsafe(t).fill(0);
        }
        function a(t, e, r) {
          const n = s(e);
          return (
            (t = u(t)),
            r
              ? t.length < e
                ? (t.copy(n), n)
                : t.slice(0, e)
              : t.length < e
                ? (t.copy(n, e - t.length), n)
                : t.slice(-e)
          );
        }
        function u(t) {
          if (!n.isBuffer(t))
            if (Array.isArray(t)) t = n.from(t);
            else if ('string' == typeof t) t = c(t) ? n.from((e = l(t)).length % 2 ? '0' + e : e, 'hex') : n.from(t);
            else if ('number' == typeof t) t = intToBuffer(t);
            else if (null == t) t = n.allocUnsafe(0);
            else if (o.isBN(t)) t = t.toArrayLike(n);
            else {
              if (!t.toArray) throw new Error('invalid type');
              t = n.from(t.toArray());
            }
          var e;
          return t;
        }
        function c(t) {
          return 'string' == typeof t && t.match(/^0x[0-9A-Fa-f]*$/);
        }
        function l(t) {
          return 'string' == typeof t && t.startsWith('0x') ? t.slice(2) : t;
        }
        t.exports = {
          zeros: s,
          setLength: a,
          setLengthRight: function (t, e) {
            return a(t, e, !0);
          },
          isHexString: c,
          stripHexPrefix: l,
          toBuffer: u,
          bufferToHex: function (t) {
            return '0x' + (t = u(t)).toString('hex');
          },
          keccak: function (t, e) {
            return (
              (t = u(t)),
              e || (e = 256),
              i('keccak' + e)
                .update(t)
                .digest()
            );
          },
        };
      },
      7713: (t) => {
        function e(t) {
          (this.mode = n.MODE_8BIT_BYTE), (this.data = t), (this.parsedData = []);
          for (var e = 0, r = this.data.length; e < r; e++) {
            var i = [],
              o = this.data.charCodeAt(e);
            o > 65536
              ? ((i[0] = 240 | ((1835008 & o) >>> 18)),
                (i[1] = 128 | ((258048 & o) >>> 12)),
                (i[2] = 128 | ((4032 & o) >>> 6)),
                (i[3] = 128 | (63 & o)))
              : o > 2048
                ? ((i[0] = 224 | ((61440 & o) >>> 12)), (i[1] = 128 | ((4032 & o) >>> 6)), (i[2] = 128 | (63 & o)))
                : o > 128
                  ? ((i[0] = 192 | ((1984 & o) >>> 6)), (i[1] = 128 | (63 & o)))
                  : (i[0] = o),
              this.parsedData.push(i);
          }
          (this.parsedData = Array.prototype.concat.apply([], this.parsedData)),
            this.parsedData.length != this.data.length &&
              (this.parsedData.unshift(191), this.parsedData.unshift(187), this.parsedData.unshift(239));
        }
        function r(t, e) {
          (this.typeNumber = t),
            (this.errorCorrectLevel = e),
            (this.modules = null),
            (this.moduleCount = 0),
            (this.dataCache = null),
            (this.dataList = []);
        }
        (e.prototype = {
          getLength: function (t) {
            return this.parsedData.length;
          },
          write: function (t) {
            for (var e = 0, r = this.parsedData.length; e < r; e++) t.put(this.parsedData[e], 8);
          },
        }),
          (r.prototype = {
            addData: function (t) {
              var r = new e(t);
              this.dataList.push(r), (this.dataCache = null);
            },
            isDark: function (t, e) {
              if (t < 0 || this.moduleCount <= t || e < 0 || this.moduleCount <= e) throw new Error(t + ',' + e);
              return this.modules[t][e];
            },
            getModuleCount: function () {
              return this.moduleCount;
            },
            make: function () {
              this.makeImpl(!1, this.getBestMaskPattern());
            },
            makeImpl: function (t, e) {
              (this.moduleCount = 4 * this.typeNumber + 17), (this.modules = new Array(this.moduleCount));
              for (var n = 0; n < this.moduleCount; n++) {
                this.modules[n] = new Array(this.moduleCount);
                for (var i = 0; i < this.moduleCount; i++) this.modules[n][i] = null;
              }
              this.setupPositionProbePattern(0, 0),
                this.setupPositionProbePattern(this.moduleCount - 7, 0),
                this.setupPositionProbePattern(0, this.moduleCount - 7),
                this.setupPositionAdjustPattern(),
                this.setupTimingPattern(),
                this.setupTypeInfo(t, e),
                this.typeNumber >= 7 && this.setupTypeNumber(t),
                null == this.dataCache &&
                  (this.dataCache = r.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)),
                this.mapData(this.dataCache, e);
            },
            setupPositionProbePattern: function (t, e) {
              for (var r = -1; r <= 7; r++)
                if (!(t + r <= -1 || this.moduleCount <= t + r))
                  for (var n = -1; n <= 7; n++)
                    e + n <= -1 ||
                      this.moduleCount <= e + n ||
                      (this.modules[t + r][e + n] =
                        (0 <= r && r <= 6 && (0 == n || 6 == n)) ||
                        (0 <= n && n <= 6 && (0 == r || 6 == r)) ||
                        (2 <= r && r <= 4 && 2 <= n && n <= 4));
            },
            getBestMaskPattern: function () {
              for (var t = 0, e = 0, r = 0; r < 8; r++) {
                this.makeImpl(!0, r);
                var n = i.getLostPoint(this);
                (0 == r || t > n) && ((t = n), (e = r));
              }
              return e;
            },
            createMovieClip: function (t, e, r) {
              var n = t.createEmptyMovieClip(e, r);
              this.make();
              for (var i = 0; i < this.modules.length; i++)
                for (var o = 1 * i, s = 0; s < this.modules[i].length; s++) {
                  var a = 1 * s;
                  this.modules[i][s] &&
                    (n.beginFill(0, 100),
                    n.moveTo(a, o),
                    n.lineTo(a + 1, o),
                    n.lineTo(a + 1, o + 1),
                    n.lineTo(a, o + 1),
                    n.endFill());
                }
              return n;
            },
            setupTimingPattern: function () {
              for (var t = 8; t < this.moduleCount - 8; t++)
                null == this.modules[t][6] && (this.modules[t][6] = t % 2 == 0);
              for (var e = 8; e < this.moduleCount - 8; e++)
                null == this.modules[6][e] && (this.modules[6][e] = e % 2 == 0);
            },
            setupPositionAdjustPattern: function () {
              for (var t = i.getPatternPosition(this.typeNumber), e = 0; e < t.length; e++)
                for (var r = 0; r < t.length; r++) {
                  var n = t[e],
                    o = t[r];
                  if (null == this.modules[n][o])
                    for (var s = -2; s <= 2; s++)
                      for (var a = -2; a <= 2; a++)
                        this.modules[n + s][o + a] = -2 == s || 2 == s || -2 == a || 2 == a || (0 == s && 0 == a);
                }
            },
            setupTypeNumber: function (t) {
              for (var e = i.getBCHTypeNumber(this.typeNumber), r = 0; r < 18; r++) {
                var n = !t && 1 == ((e >> r) & 1);
                this.modules[Math.floor(r / 3)][(r % 3) + this.moduleCount - 8 - 3] = n;
              }
              for (r = 0; r < 18; r++)
                (n = !t && 1 == ((e >> r) & 1)),
                  (this.modules[(r % 3) + this.moduleCount - 8 - 3][Math.floor(r / 3)] = n);
            },
            setupTypeInfo: function (t, e) {
              for (var r = (this.errorCorrectLevel << 3) | e, n = i.getBCHTypeInfo(r), o = 0; o < 15; o++) {
                var s = !t && 1 == ((n >> o) & 1);
                o < 6
                  ? (this.modules[o][8] = s)
                  : o < 8
                    ? (this.modules[o + 1][8] = s)
                    : (this.modules[this.moduleCount - 15 + o][8] = s);
              }
              for (o = 0; o < 15; o++)
                (s = !t && 1 == ((n >> o) & 1)),
                  o < 8
                    ? (this.modules[8][this.moduleCount - o - 1] = s)
                    : o < 9
                      ? (this.modules[8][15 - o - 1 + 1] = s)
                      : (this.modules[8][15 - o - 1] = s);
              this.modules[this.moduleCount - 8][8] = !t;
            },
            mapData: function (t, e) {
              for (var r = -1, n = this.moduleCount - 1, o = 7, s = 0, a = this.moduleCount - 1; a > 0; a -= 2)
                for (6 == a && a--; ; ) {
                  for (var u = 0; u < 2; u++)
                    if (null == this.modules[n][a - u]) {
                      var c = !1;
                      s < t.length && (c = 1 == ((t[s] >>> o) & 1)),
                        i.getMask(e, n, a - u) && (c = !c),
                        (this.modules[n][a - u] = c),
                        -1 == --o && (s++, (o = 7));
                    }
                  if ((n += r) < 0 || this.moduleCount <= n) {
                    (n -= r), (r = -r);
                    break;
                  }
                }
            },
          }),
          (r.PAD0 = 236),
          (r.PAD1 = 17),
          (r.createData = function (t, e, n) {
            for (var o = u.getRSBlocks(t, e), s = new c(), a = 0; a < n.length; a++) {
              var l = n[a];
              s.put(l.mode, 4), s.put(l.getLength(), i.getLengthInBits(l.mode, t)), l.write(s);
            }
            var h = 0;
            for (a = 0; a < o.length; a++) h += o[a].dataCount;
            if (s.getLengthInBits() > 8 * h)
              throw new Error('code length overflow. (' + s.getLengthInBits() + '>' + 8 * h + ')');
            for (s.getLengthInBits() + 4 <= 8 * h && s.put(0, 4); s.getLengthInBits() % 8 != 0; ) s.putBit(!1);
            for (; !(s.getLengthInBits() >= 8 * h || (s.put(r.PAD0, 8), s.getLengthInBits() >= 8 * h)); )
              s.put(r.PAD1, 8);
            return r.createBytes(s, o);
          }),
          (r.createBytes = function (t, e) {
            for (var r = 0, n = 0, o = 0, s = new Array(e.length), u = new Array(e.length), c = 0; c < e.length; c++) {
              var l = e[c].dataCount,
                h = e[c].totalCount - l;
              (n = Math.max(n, l)), (o = Math.max(o, h)), (s[c] = new Array(l));
              for (var f = 0; f < s[c].length; f++) s[c][f] = 255 & t.buffer[f + r];
              r += l;
              var d = i.getErrorCorrectPolynomial(h),
                p = new a(s[c], d.getLength() - 1).mod(d);
              for (u[c] = new Array(d.getLength() - 1), f = 0; f < u[c].length; f++) {
                var y = f + p.getLength() - u[c].length;
                u[c][f] = y >= 0 ? p.get(y) : 0;
              }
            }
            var g = 0;
            for (f = 0; f < e.length; f++) g += e[f].totalCount;
            var b = new Array(g),
              m = 0;
            for (f = 0; f < n; f++) for (c = 0; c < e.length; c++) f < s[c].length && (b[m++] = s[c][f]);
            for (f = 0; f < o; f++) for (c = 0; c < e.length; c++) f < u[c].length && (b[m++] = u[c][f]);
            return b;
          });
        for (
          var n = { MODE_NUMBER: 1, MODE_ALPHA_NUM: 2, MODE_8BIT_BYTE: 4, MODE_KANJI: 8 },
            i = {
              PATTERN_POSITION_TABLE: [
                [],
                [6, 18],
                [6, 22],
                [6, 26],
                [6, 30],
                [6, 34],
                [6, 22, 38],
                [6, 24, 42],
                [6, 26, 46],
                [6, 28, 50],
                [6, 30, 54],
                [6, 32, 58],
                [6, 34, 62],
                [6, 26, 46, 66],
                [6, 26, 48, 70],
                [6, 26, 50, 74],
                [6, 30, 54, 78],
                [6, 30, 56, 82],
                [6, 30, 58, 86],
                [6, 34, 62, 90],
                [6, 28, 50, 72, 94],
                [6, 26, 50, 74, 98],
                [6, 30, 54, 78, 102],
                [6, 28, 54, 80, 106],
                [6, 32, 58, 84, 110],
                [6, 30, 58, 86, 114],
                [6, 34, 62, 90, 118],
                [6, 26, 50, 74, 98, 122],
                [6, 30, 54, 78, 102, 126],
                [6, 26, 52, 78, 104, 130],
                [6, 30, 56, 82, 108, 134],
                [6, 34, 60, 86, 112, 138],
                [6, 30, 58, 86, 114, 142],
                [6, 34, 62, 90, 118, 146],
                [6, 30, 54, 78, 102, 126, 150],
                [6, 24, 50, 76, 102, 128, 154],
                [6, 28, 54, 80, 106, 132, 158],
                [6, 32, 58, 84, 110, 136, 162],
                [6, 26, 54, 82, 110, 138, 166],
                [6, 30, 58, 86, 114, 142, 170],
              ],
              G15: 1335,
              G18: 7973,
              G15_MASK: 21522,
              getBCHTypeInfo: function (t) {
                for (var e = t << 10; i.getBCHDigit(e) - i.getBCHDigit(i.G15) >= 0; )
                  e ^= i.G15 << (i.getBCHDigit(e) - i.getBCHDigit(i.G15));
                return ((t << 10) | e) ^ i.G15_MASK;
              },
              getBCHTypeNumber: function (t) {
                for (var e = t << 12; i.getBCHDigit(e) - i.getBCHDigit(i.G18) >= 0; )
                  e ^= i.G18 << (i.getBCHDigit(e) - i.getBCHDigit(i.G18));
                return (t << 12) | e;
              },
              getBCHDigit: function (t) {
                for (var e = 0; 0 != t; ) e++, (t >>>= 1);
                return e;
              },
              getPatternPosition: function (t) {
                return i.PATTERN_POSITION_TABLE[t - 1];
              },
              getMask: function (t, e, r) {
                switch (t) {
                  case 0:
                    return (e + r) % 2 == 0;
                  case 1:
                    return e % 2 == 0;
                  case 2:
                    return r % 3 == 0;
                  case 3:
                    return (e + r) % 3 == 0;
                  case 4:
                    return (Math.floor(e / 2) + Math.floor(r / 3)) % 2 == 0;
                  case 5:
                    return ((e * r) % 2) + ((e * r) % 3) == 0;
                  case 6:
                    return (((e * r) % 2) + ((e * r) % 3)) % 2 == 0;
                  case 7:
                    return (((e * r) % 3) + ((e + r) % 2)) % 2 == 0;
                  default:
                    throw new Error('bad maskPattern:' + t);
                }
              },
              getErrorCorrectPolynomial: function (t) {
                for (var e = new a([1], 0), r = 0; r < t; r++) e = e.multiply(new a([1, o.gexp(r)], 0));
                return e;
              },
              getLengthInBits: function (t, e) {
                if (1 <= e && e < 10)
                  switch (t) {
                    case n.MODE_NUMBER:
                      return 10;
                    case n.MODE_ALPHA_NUM:
                      return 9;
                    case n.MODE_8BIT_BYTE:
                    case n.MODE_KANJI:
                      return 8;
                    default:
                      throw new Error('mode:' + t);
                  }
                else if (e < 27)
                  switch (t) {
                    case n.MODE_NUMBER:
                      return 12;
                    case n.MODE_ALPHA_NUM:
                      return 11;
                    case n.MODE_8BIT_BYTE:
                      return 16;
                    case n.MODE_KANJI:
                      return 10;
                    default:
                      throw new Error('mode:' + t);
                  }
                else {
                  if (!(e < 41)) throw new Error('type:' + e);
                  switch (t) {
                    case n.MODE_NUMBER:
                      return 14;
                    case n.MODE_ALPHA_NUM:
                      return 13;
                    case n.MODE_8BIT_BYTE:
                      return 16;
                    case n.MODE_KANJI:
                      return 12;
                    default:
                      throw new Error('mode:' + t);
                  }
                }
              },
              getLostPoint: function (t) {
                for (var e = t.getModuleCount(), r = 0, n = 0; n < e; n++)
                  for (var i = 0; i < e; i++) {
                    for (var o = 0, s = t.isDark(n, i), a = -1; a <= 1; a++)
                      if (!(n + a < 0 || e <= n + a))
                        for (var u = -1; u <= 1; u++)
                          i + u < 0 || e <= i + u || (0 == a && 0 == u) || (s == t.isDark(n + a, i + u) && o++);
                    o > 5 && (r += 3 + o - 5);
                  }
                for (n = 0; n < e - 1; n++)
                  for (i = 0; i < e - 1; i++) {
                    var c = 0;
                    t.isDark(n, i) && c++,
                      t.isDark(n + 1, i) && c++,
                      t.isDark(n, i + 1) && c++,
                      t.isDark(n + 1, i + 1) && c++,
                      (0 != c && 4 != c) || (r += 3);
                  }
                for (n = 0; n < e; n++)
                  for (i = 0; i < e - 6; i++)
                    t.isDark(n, i) &&
                      !t.isDark(n, i + 1) &&
                      t.isDark(n, i + 2) &&
                      t.isDark(n, i + 3) &&
                      t.isDark(n, i + 4) &&
                      !t.isDark(n, i + 5) &&
                      t.isDark(n, i + 6) &&
                      (r += 40);
                for (i = 0; i < e; i++)
                  for (n = 0; n < e - 6; n++)
                    t.isDark(n, i) &&
                      !t.isDark(n + 1, i) &&
                      t.isDark(n + 2, i) &&
                      t.isDark(n + 3, i) &&
                      t.isDark(n + 4, i) &&
                      !t.isDark(n + 5, i) &&
                      t.isDark(n + 6, i) &&
                      (r += 40);
                var l = 0;
                for (i = 0; i < e; i++) for (n = 0; n < e; n++) t.isDark(n, i) && l++;
                return r + (Math.abs((100 * l) / e / e - 50) / 5) * 10;
              },
            },
            o = {
              glog: function (t) {
                if (t < 1) throw new Error('glog(' + t + ')');
                return o.LOG_TABLE[t];
              },
              gexp: function (t) {
                for (; t < 0; ) t += 255;
                for (; t >= 256; ) t -= 255;
                return o.EXP_TABLE[t];
              },
              EXP_TABLE: new Array(256),
              LOG_TABLE: new Array(256),
            },
            s = 0;
          s < 8;
          s++
        )
          o.EXP_TABLE[s] = 1 << s;
        for (s = 8; s < 256; s++)
          o.EXP_TABLE[s] = o.EXP_TABLE[s - 4] ^ o.EXP_TABLE[s - 5] ^ o.EXP_TABLE[s - 6] ^ o.EXP_TABLE[s - 8];
        for (s = 0; s < 255; s++) o.LOG_TABLE[o.EXP_TABLE[s]] = s;
        function a(t, e) {
          if (null == t.length) throw new Error(t.length + '/' + e);
          for (var r = 0; r < t.length && 0 == t[r]; ) r++;
          this.num = new Array(t.length - r + e);
          for (var n = 0; n < t.length - r; n++) this.num[n] = t[n + r];
        }
        function u(t, e) {
          (this.totalCount = t), (this.dataCount = e);
        }
        function c() {
          (this.buffer = []), (this.length = 0);
        }
        (a.prototype = {
          get: function (t) {
            return this.num[t];
          },
          getLength: function () {
            return this.num.length;
          },
          multiply: function (t) {
            for (var e = new Array(this.getLength() + t.getLength() - 1), r = 0; r < this.getLength(); r++)
              for (var n = 0; n < t.getLength(); n++) e[r + n] ^= o.gexp(o.glog(this.get(r)) + o.glog(t.get(n)));
            return new a(e, 0);
          },
          mod: function (t) {
            if (this.getLength() - t.getLength() < 0) return this;
            for (
              var e = o.glog(this.get(0)) - o.glog(t.get(0)), r = new Array(this.getLength()), n = 0;
              n < this.getLength();
              n++
            )
              r[n] = this.get(n);
            for (n = 0; n < t.getLength(); n++) r[n] ^= o.gexp(o.glog(t.get(n)) + e);
            return new a(r, 0).mod(t);
          },
        }),
          (u.RS_BLOCK_TABLE = [
            [1, 26, 19],
            [1, 26, 16],
            [1, 26, 13],
            [1, 26, 9],
            [1, 44, 34],
            [1, 44, 28],
            [1, 44, 22],
            [1, 44, 16],
            [1, 70, 55],
            [1, 70, 44],
            [2, 35, 17],
            [2, 35, 13],
            [1, 100, 80],
            [2, 50, 32],
            [2, 50, 24],
            [4, 25, 9],
            [1, 134, 108],
            [2, 67, 43],
            [2, 33, 15, 2, 34, 16],
            [2, 33, 11, 2, 34, 12],
            [2, 86, 68],
            [4, 43, 27],
            [4, 43, 19],
            [4, 43, 15],
            [2, 98, 78],
            [4, 49, 31],
            [2, 32, 14, 4, 33, 15],
            [4, 39, 13, 1, 40, 14],
            [2, 121, 97],
            [2, 60, 38, 2, 61, 39],
            [4, 40, 18, 2, 41, 19],
            [4, 40, 14, 2, 41, 15],
            [2, 146, 116],
            [3, 58, 36, 2, 59, 37],
            [4, 36, 16, 4, 37, 17],
            [4, 36, 12, 4, 37, 13],
            [2, 86, 68, 2, 87, 69],
            [4, 69, 43, 1, 70, 44],
            [6, 43, 19, 2, 44, 20],
            [6, 43, 15, 2, 44, 16],
            [4, 101, 81],
            [1, 80, 50, 4, 81, 51],
            [4, 50, 22, 4, 51, 23],
            [3, 36, 12, 8, 37, 13],
            [2, 116, 92, 2, 117, 93],
            [6, 58, 36, 2, 59, 37],
            [4, 46, 20, 6, 47, 21],
            [7, 42, 14, 4, 43, 15],
            [4, 133, 107],
            [8, 59, 37, 1, 60, 38],
            [8, 44, 20, 4, 45, 21],
            [12, 33, 11, 4, 34, 12],
            [3, 145, 115, 1, 146, 116],
            [4, 64, 40, 5, 65, 41],
            [11, 36, 16, 5, 37, 17],
            [11, 36, 12, 5, 37, 13],
            [5, 109, 87, 1, 110, 88],
            [5, 65, 41, 5, 66, 42],
            [5, 54, 24, 7, 55, 25],
            [11, 36, 12],
            [5, 122, 98, 1, 123, 99],
            [7, 73, 45, 3, 74, 46],
            [15, 43, 19, 2, 44, 20],
            [3, 45, 15, 13, 46, 16],
            [1, 135, 107, 5, 136, 108],
            [10, 74, 46, 1, 75, 47],
            [1, 50, 22, 15, 51, 23],
            [2, 42, 14, 17, 43, 15],
            [5, 150, 120, 1, 151, 121],
            [9, 69, 43, 4, 70, 44],
            [17, 50, 22, 1, 51, 23],
            [2, 42, 14, 19, 43, 15],
            [3, 141, 113, 4, 142, 114],
            [3, 70, 44, 11, 71, 45],
            [17, 47, 21, 4, 48, 22],
            [9, 39, 13, 16, 40, 14],
            [3, 135, 107, 5, 136, 108],
            [3, 67, 41, 13, 68, 42],
            [15, 54, 24, 5, 55, 25],
            [15, 43, 15, 10, 44, 16],
            [4, 144, 116, 4, 145, 117],
            [17, 68, 42],
            [17, 50, 22, 6, 51, 23],
            [19, 46, 16, 6, 47, 17],
            [2, 139, 111, 7, 140, 112],
            [17, 74, 46],
            [7, 54, 24, 16, 55, 25],
            [34, 37, 13],
            [4, 151, 121, 5, 152, 122],
            [4, 75, 47, 14, 76, 48],
            [11, 54, 24, 14, 55, 25],
            [16, 45, 15, 14, 46, 16],
            [6, 147, 117, 4, 148, 118],
            [6, 73, 45, 14, 74, 46],
            [11, 54, 24, 16, 55, 25],
            [30, 46, 16, 2, 47, 17],
            [8, 132, 106, 4, 133, 107],
            [8, 75, 47, 13, 76, 48],
            [7, 54, 24, 22, 55, 25],
            [22, 45, 15, 13, 46, 16],
            [10, 142, 114, 2, 143, 115],
            [19, 74, 46, 4, 75, 47],
            [28, 50, 22, 6, 51, 23],
            [33, 46, 16, 4, 47, 17],
            [8, 152, 122, 4, 153, 123],
            [22, 73, 45, 3, 74, 46],
            [8, 53, 23, 26, 54, 24],
            [12, 45, 15, 28, 46, 16],
            [3, 147, 117, 10, 148, 118],
            [3, 73, 45, 23, 74, 46],
            [4, 54, 24, 31, 55, 25],
            [11, 45, 15, 31, 46, 16],
            [7, 146, 116, 7, 147, 117],
            [21, 73, 45, 7, 74, 46],
            [1, 53, 23, 37, 54, 24],
            [19, 45, 15, 26, 46, 16],
            [5, 145, 115, 10, 146, 116],
            [19, 75, 47, 10, 76, 48],
            [15, 54, 24, 25, 55, 25],
            [23, 45, 15, 25, 46, 16],
            [13, 145, 115, 3, 146, 116],
            [2, 74, 46, 29, 75, 47],
            [42, 54, 24, 1, 55, 25],
            [23, 45, 15, 28, 46, 16],
            [17, 145, 115],
            [10, 74, 46, 23, 75, 47],
            [10, 54, 24, 35, 55, 25],
            [19, 45, 15, 35, 46, 16],
            [17, 145, 115, 1, 146, 116],
            [14, 74, 46, 21, 75, 47],
            [29, 54, 24, 19, 55, 25],
            [11, 45, 15, 46, 46, 16],
            [13, 145, 115, 6, 146, 116],
            [14, 74, 46, 23, 75, 47],
            [44, 54, 24, 7, 55, 25],
            [59, 46, 16, 1, 47, 17],
            [12, 151, 121, 7, 152, 122],
            [12, 75, 47, 26, 76, 48],
            [39, 54, 24, 14, 55, 25],
            [22, 45, 15, 41, 46, 16],
            [6, 151, 121, 14, 152, 122],
            [6, 75, 47, 34, 76, 48],
            [46, 54, 24, 10, 55, 25],
            [2, 45, 15, 64, 46, 16],
            [17, 152, 122, 4, 153, 123],
            [29, 74, 46, 14, 75, 47],
            [49, 54, 24, 10, 55, 25],
            [24, 45, 15, 46, 46, 16],
            [4, 152, 122, 18, 153, 123],
            [13, 74, 46, 32, 75, 47],
            [48, 54, 24, 14, 55, 25],
            [42, 45, 15, 32, 46, 16],
            [20, 147, 117, 4, 148, 118],
            [40, 75, 47, 7, 76, 48],
            [43, 54, 24, 22, 55, 25],
            [10, 45, 15, 67, 46, 16],
            [19, 148, 118, 6, 149, 119],
            [18, 75, 47, 31, 76, 48],
            [34, 54, 24, 34, 55, 25],
            [20, 45, 15, 61, 46, 16],
          ]),
          (u.getRSBlocks = function (t, e) {
            var r = u.getRsBlockTable(t, e);
            if (null == r) throw new Error('bad rs block @ typeNumber:' + t + '/errorCorrectLevel:' + e);
            for (var n = r.length / 3, i = [], o = 0; o < n; o++)
              for (var s = r[3 * o + 0], a = r[3 * o + 1], c = r[3 * o + 2], l = 0; l < s; l++) i.push(new u(a, c));
            return i;
          }),
          (u.getRsBlockTable = function (t, e) {
            switch (e) {
              case 1:
                return u.RS_BLOCK_TABLE[4 * (t - 1) + 0];
              case 0:
                return u.RS_BLOCK_TABLE[4 * (t - 1) + 1];
              case 3:
                return u.RS_BLOCK_TABLE[4 * (t - 1) + 2];
              case 2:
                return u.RS_BLOCK_TABLE[4 * (t - 1) + 3];
              default:
                return;
            }
          }),
          (c.prototype = {
            get: function (t) {
              var e = Math.floor(t / 8);
              return 1 == ((this.buffer[e] >>> (7 - (t % 8))) & 1);
            },
            put: function (t, e) {
              for (var r = 0; r < e; r++) this.putBit(1 == ((t >>> (e - r - 1)) & 1));
            },
            getLengthInBits: function () {
              return this.length;
            },
            putBit: function (t) {
              var e = Math.floor(this.length / 8);
              this.buffer.length <= e && this.buffer.push(0),
                t && (this.buffer[e] |= 128 >>> this.length % 8),
                this.length++;
            },
          });
        var l = [
          [17, 14, 11, 7],
          [32, 26, 20, 14],
          [53, 42, 32, 24],
          [78, 62, 46, 34],
          [106, 84, 60, 44],
          [134, 106, 74, 58],
          [154, 122, 86, 64],
          [192, 152, 108, 84],
          [230, 180, 130, 98],
          [271, 213, 151, 119],
          [321, 251, 177, 137],
          [367, 287, 203, 155],
          [425, 331, 241, 177],
          [458, 362, 258, 194],
          [520, 412, 292, 220],
          [586, 450, 322, 250],
          [644, 504, 364, 280],
          [718, 560, 394, 310],
          [792, 624, 442, 338],
          [858, 666, 482, 382],
          [929, 711, 509, 403],
          [1003, 779, 565, 439],
          [1091, 857, 611, 461],
          [1171, 911, 661, 511],
          [1273, 997, 715, 535],
          [1367, 1059, 751, 593],
          [1465, 1125, 805, 625],
          [1528, 1190, 868, 658],
          [1628, 1264, 908, 698],
          [1732, 1370, 982, 742],
          [1840, 1452, 1030, 790],
          [1952, 1538, 1112, 842],
          [2068, 1628, 1168, 898],
          [2188, 1722, 1228, 958],
          [2303, 1809, 1283, 983],
          [2431, 1911, 1351, 1051],
          [2563, 1989, 1423, 1093],
          [2699, 2099, 1499, 1139],
          [2809, 2213, 1579, 1219],
          [2953, 2331, 1663, 1273],
        ];
        function h(t) {
          if (
            ((this.options = {
              padding: 4,
              width: 256,
              height: 256,
              typeNumber: 4,
              color: '#000000',
              background: '#ffffff',
              ecl: 'M',
              image: { svg: '', width: 0, height: 0 },
            }),
            'string' == typeof t && (t = { content: t }),
            t)
          )
            for (var e in t) this.options[e] = t[e];
          if ('string' != typeof this.options.content) throw new Error("Expected 'content' as string!");
          if (0 === this.options.content.length) throw new Error("Expected 'content' to be non-empty!");
          if (!(this.options.padding >= 0)) throw new Error("Expected 'padding' value to be non-negative!");
          if (!(this.options.width > 0 && this.options.height > 0))
            throw new Error("Expected 'width' or 'height' value to be higher than zero!");
          var n = this.options.content,
            i = (function (t, e) {
              for (
                var r = (function (t) {
                    var e = encodeURI(t)
                      .toString()
                      .replace(/\%[0-9a-fA-F]{2}/g, 'a');
                    return e.length + (e.length != t ? 3 : 0);
                  })(t),
                  n = 1,
                  i = 0,
                  o = 0,
                  s = l.length;
                o <= s;
                o++
              ) {
                var a = l[o];
                if (!a) throw new Error('Content too long: expected ' + i + ' but got ' + r);
                switch (e) {
                  case 'L':
                    i = a[0];
                    break;
                  case 'M':
                    i = a[1];
                    break;
                  case 'Q':
                    i = a[2];
                    break;
                  case 'H':
                    i = a[3];
                    break;
                  default:
                    throw new Error('Unknwon error correction level: ' + e);
                }
                if (r <= i) break;
                n++;
              }
              if (n > l.length) throw new Error('Content too long');
              return n;
            })(n, this.options.ecl),
            o = (function (t) {
              switch (t) {
                case 'L':
                  return 1;
                case 'M':
                  return 0;
                case 'Q':
                  return 3;
                case 'H':
                  return 2;
                default:
                  throw new Error('Unknwon error correction level: ' + t);
              }
            })(this.options.ecl);
          (this.qrcode = new r(i, o)), this.qrcode.addData(n), this.qrcode.make();
        }
        (h.prototype.svg = function (t) {
          var e = this.options || {},
            r = this.qrcode.modules;
          void 0 === t && (t = { container: e.container || 'svg' });
          for (
            var n = void 0 === e.pretty || !!e.pretty,
              i = n ? '  ' : '',
              o = n ? '\r\n' : '',
              s = e.width,
              a = e.height,
              u = r.length,
              c = s / (u + 2 * e.padding),
              l = a / (u + 2 * e.padding),
              h = void 0 !== e.join && !!e.join,
              f = void 0 !== e.swap && !!e.swap,
              d = void 0 === e.xmlDeclaration || !!e.xmlDeclaration,
              p = void 0 !== e.predefined && !!e.predefined,
              y = p
                ? i +
                  '<defs><path id="qrmodule" d="M0 0 h' +
                  l +
                  ' v' +
                  c +
                  ' H0 z" style="fill:' +
                  e.color +
                  ';shape-rendering:crispEdges;" /></defs>' +
                  o
                : '',
              g =
                i +
                '<rect x="0" y="0" width="' +
                s +
                '" height="' +
                a +
                '" style="fill:' +
                e.background +
                ';shape-rendering:crispEdges;"/>' +
                o,
              b = '',
              m = '',
              v = 0;
            v < u;
            v++
          )
            for (var w = 0; w < u; w++)
              if (r[w][v]) {
                var _ = w * c + e.padding * c,
                  S = v * l + e.padding * l;
                if (f) {
                  var E = _;
                  (_ = S), (S = E);
                }
                if (h) {
                  var x = c + _,
                    M = l + S;
                  (_ = Number.isInteger(_) ? Number(_) : _.toFixed(2)),
                    (S = Number.isInteger(S) ? Number(S) : S.toFixed(2)),
                    (x = Number.isInteger(x) ? Number(x) : x.toFixed(2)),
                    (m +=
                      'M' +
                      _ +
                      ',' +
                      S +
                      ' V' +
                      (M = Number.isInteger(M) ? Number(M) : M.toFixed(2)) +
                      ' H' +
                      x +
                      ' V' +
                      S +
                      ' H' +
                      _ +
                      ' Z ');
                } else
                  b += p
                    ? i + '<use x="' + _.toString() + '" y="' + S.toString() + '" href="#qrmodule" />' + o
                    : i +
                      '<rect x="' +
                      _.toString() +
                      '" y="' +
                      S.toString() +
                      '" width="' +
                      c +
                      '" height="' +
                      l +
                      '" style="fill:' +
                      e.color +
                      ';shape-rendering:crispEdges;"/>' +
                      o;
              }
          h && (b = i + '<path x="0" y="0" style="fill:' + e.color + ';shape-rendering:crispEdges;" d="' + m + '" />');
          let k = '';
          if (void 0 !== this.options.image && this.options.image.svg) {
            const t = (s * this.options.image.width) / 100,
              e = (a * this.options.image.height) / 100;
            (k += `<svg x="${s / 2 - t / 2}" y="${
              a / 2 - e / 2
            }" width="${t}" height="${e}" viewBox="0 0 100 100" preserveAspectRatio="xMinYMin meet">`),
              (k += this.options.image.svg + o),
              (k += '</svg>');
          }
          var A = '';
          switch (t.container) {
            case 'svg':
              d && (A += '<?xml version="1.0" standalone="yes"?>' + o),
                (A +=
                  '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="' + s + '" height="' + a + '">' + o),
                (A += y + g + b),
                (A += k),
                (A += '</svg>');
              break;
            case 'svg-viewbox':
              d && (A += '<?xml version="1.0" standalone="yes"?>' + o),
                (A += '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 ' + s + ' ' + a + '">' + o),
                (A += y + g + b),
                (A += k),
                (A += '</svg>');
              break;
            case 'g':
              (A += '<g width="' + s + '" height="' + a + '">' + o), (A += y + g + b), (A += k), (A += '</g>');
              break;
            default:
              A += (y + g + b + k).replace(/^\s+/, '');
          }
          return A;
        }),
          (t.exports = h);
      },
      3604: (t, e) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }), (e.LIB_VERSION = void 0), (e.LIB_VERSION = '3.3.0');
      },
      9394: (t, e, r) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 });
        const n = r(7187);
        function i(t, e, r) {
          try {
            Reflect.apply(t, e, r);
          } catch (t) {
            setTimeout(() => {
              throw t;
            });
          }
        }
        class o extends n.EventEmitter {
          emit(t, ...e) {
            let r = 'error' === t;
            const n = this._events;
            if (void 0 !== n) r = r && void 0 === n.error;
            else if (!r) return !1;
            if (r) {
              let t;
              if ((e.length > 0 && ([t] = e), t instanceof Error)) throw t;
              const r = new Error('Unhandled error.' + (t ? ` (${t.message})` : ''));
              throw ((r.context = t), r);
            }
            const o = n[t];
            if (void 0 === o) return !1;
            if ('function' == typeof o) i(o, this, e);
            else {
              const t = o.length,
                r = (function (t) {
                  const e = t.length,
                    r = new Array(e);
                  for (let n = 0; n < e; n += 1) r[n] = t[n];
                  return r;
                })(o);
              for (let n = 0; n < t; n += 1) i(r[n], this, e);
            }
            return !0;
          }
        }
        e.default = o;
      },
      5078: (t, e, r) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 });
        var n = r(655),
          i = r(2403),
          o = (function () {
            function t() {
              this._semaphore = new i.default(1);
            }
            return (
              (t.prototype.acquire = function () {
                return n.__awaiter(this, void 0, void 0, function () {
                  return n.__generator(this, function (t) {
                    switch (t.label) {
                      case 0:
                        return [4, this._semaphore.acquire()];
                      case 1:
                        return [2, t.sent()[1]];
                    }
                  });
                });
              }),
              (t.prototype.runExclusive = function (t) {
                return this._semaphore.runExclusive(function () {
                  return t();
                });
              }),
              (t.prototype.isLocked = function () {
                return this._semaphore.isLocked();
              }),
              (t.prototype.release = function () {
                this._semaphore.release();
              }),
              t
            );
          })();
        e.default = o;
      },
      2403: (t, e, r) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 });
        var n = r(655),
          i = (function () {
            function t(t) {
              if (((this._maxConcurrency = t), (this._queue = []), t <= 0))
                throw new Error('semaphore must be initialized to a positive value');
              this._value = t;
            }
            return (
              (t.prototype.acquire = function () {
                var t = this,
                  e = this.isLocked(),
                  r = new Promise(function (e) {
                    return t._queue.push(e);
                  });
                return e || this._dispatch(), r;
              }),
              (t.prototype.runExclusive = function (t) {
                return n.__awaiter(this, void 0, void 0, function () {
                  var e, r, i;
                  return n.__generator(this, function (n) {
                    switch (n.label) {
                      case 0:
                        return [4, this.acquire()];
                      case 1:
                        (e = n.sent()), (r = e[0]), (i = e[1]), (n.label = 2);
                      case 2:
                        return n.trys.push([2, , 4, 5]), [4, t(r)];
                      case 3:
                        return [2, n.sent()];
                      case 4:
                        return i(), [7];
                      case 5:
                        return [2];
                    }
                  });
                });
              }),
              (t.prototype.isLocked = function () {
                return this._value <= 0;
              }),
              (t.prototype.release = function () {
                if (this._maxConcurrency > 1)
                  throw new Error(
                    'this method is unavailabel on semaphores with concurrency > 1; use the scoped release returned by acquire instead',
                  );
                if (this._currentReleaser) {
                  var t = this._currentReleaser;
                  (this._currentReleaser = void 0), t();
                }
              }),
              (t.prototype._dispatch = function () {
                var t = this,
                  e = this._queue.shift();
                if (e) {
                  var r = !1;
                  (this._currentReleaser = function () {
                    r || ((r = !0), t._value++, t._dispatch());
                  }),
                    e([this._value--, this._currentReleaser]);
                }
              }),
              t
            );
          })();
        e.default = i;
      },
      8125: (t, e, r) => {
        'use strict';
        e.WU = void 0;
        var n = r(5078);
        Object.defineProperty(e, 'WU', {
          enumerable: !0,
          get: function () {
            return n.default;
          },
        });
        r(2403), r(1960);
      },
      1960: (t, e, r) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }), (e.withTimeout = void 0);
        var n = r(655);
        e.withTimeout = function (t, e, r) {
          var i = this;
          return (
            void 0 === r && (r = new Error('timeout')),
            {
              acquire: function () {
                return new Promise(function (o, s) {
                  return n.__awaiter(i, void 0, void 0, function () {
                    var i, a;
                    return n.__generator(this, function (n) {
                      switch (n.label) {
                        case 0:
                          return (
                            (i = !1),
                            setTimeout(function () {
                              (i = !0), s(r);
                            }, e),
                            [4, t.acquire()]
                          );
                        case 1:
                          return (a = n.sent()), i ? (Array.isArray(a) ? a[1] : a)() : o(a), [2];
                      }
                    });
                  });
                });
              },
              runExclusive: function (t) {
                return n.__awaiter(this, void 0, void 0, function () {
                  var e, r;
                  return n.__generator(this, function (n) {
                    switch (n.label) {
                      case 0:
                        (e = function () {}), (n.label = 1);
                      case 1:
                        return n.trys.push([1, , 7, 8]), [4, this.acquire()];
                      case 2:
                        return (r = n.sent()), Array.isArray(r) ? ((e = r[1]), [4, t(r[0])]) : [3, 4];
                      case 3:
                        return [2, n.sent()];
                      case 4:
                        return (e = r), [4, t()];
                      case 5:
                        return [2, n.sent()];
                      case 6:
                        return [3, 8];
                      case 7:
                        return e(), [7];
                      case 8:
                        return [2];
                    }
                  });
                });
              },
              release: function () {
                t.release();
              },
              isLocked: function () {
                return t.isLocked();
              },
            }
          );
        };
      },
      9742: (t, e) => {
        'use strict';
        (e.byteLength = function (t) {
          var e = u(t),
            r = e[0],
            n = e[1];
          return (3 * (r + n)) / 4 - n;
        }),
          (e.toByteArray = function (t) {
            var e,
              r,
              o = u(t),
              s = o[0],
              a = o[1],
              c = new i(
                (function (t, e, r) {
                  return (3 * (e + r)) / 4 - r;
                })(0, s, a),
              ),
              l = 0,
              h = a > 0 ? s - 4 : s;
            for (r = 0; r < h; r += 4)
              (e =
                (n[t.charCodeAt(r)] << 18) |
                (n[t.charCodeAt(r + 1)] << 12) |
                (n[t.charCodeAt(r + 2)] << 6) |
                n[t.charCodeAt(r + 3)]),
                (c[l++] = (e >> 16) & 255),
                (c[l++] = (e >> 8) & 255),
                (c[l++] = 255 & e);
            return (
              2 === a && ((e = (n[t.charCodeAt(r)] << 2) | (n[t.charCodeAt(r + 1)] >> 4)), (c[l++] = 255 & e)),
              1 === a &&
                ((e = (n[t.charCodeAt(r)] << 10) | (n[t.charCodeAt(r + 1)] << 4) | (n[t.charCodeAt(r + 2)] >> 2)),
                (c[l++] = (e >> 8) & 255),
                (c[l++] = 255 & e)),
              c
            );
          }),
          (e.fromByteArray = function (t) {
            for (var e, n = t.length, i = n % 3, o = [], s = 16383, a = 0, u = n - i; a < u; a += s)
              o.push(c(t, a, a + s > u ? u : a + s));
            return (
              1 === i
                ? ((e = t[n - 1]), o.push(r[e >> 2] + r[(e << 4) & 63] + '=='))
                : 2 === i &&
                  ((e = (t[n - 2] << 8) + t[n - 1]), o.push(r[e >> 10] + r[(e >> 4) & 63] + r[(e << 2) & 63] + '=')),
              o.join('')
            );
          });
        for (
          var r = [],
            n = [],
            i = 'undefined' != typeof Uint8Array ? Uint8Array : Array,
            o = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
            s = 0,
            a = o.length;
          s < a;
          ++s
        )
          (r[s] = o[s]), (n[o.charCodeAt(s)] = s);
        function u(t) {
          var e = t.length;
          if (e % 4 > 0) throw new Error('Invalid string. Length must be a multiple of 4');
          var r = t.indexOf('=');
          return -1 === r && (r = e), [r, r === e ? 0 : 4 - (r % 4)];
        }
        function c(t, e, n) {
          for (var i, o, s = [], a = e; a < n; a += 3)
            (i = ((t[a] << 16) & 16711680) + ((t[a + 1] << 8) & 65280) + (255 & t[a + 2])),
              s.push(r[((o = i) >> 18) & 63] + r[(o >> 12) & 63] + r[(o >> 6) & 63] + r[63 & o]);
          return s.join('');
        }
        (n['-'.charCodeAt(0)] = 62), (n['_'.charCodeAt(0)] = 63);
      },
      7056: (t, e) => {
        'use strict';
        var r;
        function n(t, e, n) {
          if (!n || typeof n.value !== r.typeOfFunction)
            throw new TypeError('Only methods can be decorated with @bind. <' + e + '> is not a method!');
          return {
            configurable: r.boolTrue,
            get: function () {
              var t = n.value.bind(this);
              return Object.defineProperty(this, e, { value: t, configurable: r.boolTrue, writable: r.boolTrue }), t;
            },
          };
        }
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (function (t) {
            (t.typeOfFunction = 'function'), (t.boolTrue = !0);
          })(r || (r = {})),
          (e.bind = n),
          (e.default = n);
      },
      3550: function (t, e, r) {
        !(function (t, e) {
          'use strict';
          function n(t, e) {
            if (!t) throw new Error(e || 'Assertion failed');
          }
          function i(t, e) {
            t.super_ = e;
            var r = function () {};
            (r.prototype = e.prototype), (t.prototype = new r()), (t.prototype.constructor = t);
          }
          function o(t, e, r) {
            if (o.isBN(t)) return t;
            (this.negative = 0),
              (this.words = null),
              (this.length = 0),
              (this.red = null),
              null !== t && (('le' !== e && 'be' !== e) || ((r = e), (e = 10)), this._init(t || 0, e || 10, r || 'be'));
          }
          var s;
          'object' == typeof t ? (t.exports = o) : (e.BN = o), (o.BN = o), (o.wordSize = 26);
          try {
            s = 'undefined' != typeof window && void 0 !== window.Buffer ? window.Buffer : r(6601).Buffer;
          } catch (t) {}
          function a(t, e) {
            var r = t.charCodeAt(e);
            return r >= 48 && r <= 57
              ? r - 48
              : r >= 65 && r <= 70
                ? r - 55
                : r >= 97 && r <= 102
                  ? r - 87
                  : void n(!1, 'Invalid character in ' + t);
          }
          function u(t, e, r) {
            var n = a(t, r);
            return r - 1 >= e && (n |= a(t, r - 1) << 4), n;
          }
          function c(t, e, r, i) {
            for (var o = 0, s = 0, a = Math.min(t.length, r), u = e; u < a; u++) {
              var c = t.charCodeAt(u) - 48;
              (o *= i),
                (s = c >= 49 ? c - 49 + 10 : c >= 17 ? c - 17 + 10 : c),
                n(c >= 0 && s < i, 'Invalid character'),
                (o += s);
            }
            return o;
          }
          function l(t, e) {
            (t.words = e.words), (t.length = e.length), (t.negative = e.negative), (t.red = e.red);
          }
          if (
            ((o.isBN = function (t) {
              return (
                t instanceof o ||
                (null !== t && 'object' == typeof t && t.constructor.wordSize === o.wordSize && Array.isArray(t.words))
              );
            }),
            (o.max = function (t, e) {
              return t.cmp(e) > 0 ? t : e;
            }),
            (o.min = function (t, e) {
              return t.cmp(e) < 0 ? t : e;
            }),
            (o.prototype._init = function (t, e, r) {
              if ('number' == typeof t) return this._initNumber(t, e, r);
              if ('object' == typeof t) return this._initArray(t, e, r);
              'hex' === e && (e = 16), n(e === (0 | e) && e >= 2 && e <= 36);
              var i = 0;
              '-' === (t = t.toString().replace(/\s+/g, ''))[0] && (i++, (this.negative = 1)),
                i < t.length &&
                  (16 === e
                    ? this._parseHex(t, i, r)
                    : (this._parseBase(t, e, i), 'le' === r && this._initArray(this.toArray(), e, r)));
            }),
            (o.prototype._initNumber = function (t, e, r) {
              t < 0 && ((this.negative = 1), (t = -t)),
                t < 67108864
                  ? ((this.words = [67108863 & t]), (this.length = 1))
                  : t < 4503599627370496
                    ? ((this.words = [67108863 & t, (t / 67108864) & 67108863]), (this.length = 2))
                    : (n(t < 9007199254740992),
                      (this.words = [67108863 & t, (t / 67108864) & 67108863, 1]),
                      (this.length = 3)),
                'le' === r && this._initArray(this.toArray(), e, r);
            }),
            (o.prototype._initArray = function (t, e, r) {
              if ((n('number' == typeof t.length), t.length <= 0)) return (this.words = [0]), (this.length = 1), this;
              (this.length = Math.ceil(t.length / 3)), (this.words = new Array(this.length));
              for (var i = 0; i < this.length; i++) this.words[i] = 0;
              var o,
                s,
                a = 0;
              if ('be' === r)
                for (i = t.length - 1, o = 0; i >= 0; i -= 3)
                  (s = t[i] | (t[i - 1] << 8) | (t[i - 2] << 16)),
                    (this.words[o] |= (s << a) & 67108863),
                    (this.words[o + 1] = (s >>> (26 - a)) & 67108863),
                    (a += 24) >= 26 && ((a -= 26), o++);
              else if ('le' === r)
                for (i = 0, o = 0; i < t.length; i += 3)
                  (s = t[i] | (t[i + 1] << 8) | (t[i + 2] << 16)),
                    (this.words[o] |= (s << a) & 67108863),
                    (this.words[o + 1] = (s >>> (26 - a)) & 67108863),
                    (a += 24) >= 26 && ((a -= 26), o++);
              return this._strip();
            }),
            (o.prototype._parseHex = function (t, e, r) {
              (this.length = Math.ceil((t.length - e) / 6)), (this.words = new Array(this.length));
              for (var n = 0; n < this.length; n++) this.words[n] = 0;
              var i,
                o = 0,
                s = 0;
              if ('be' === r)
                for (n = t.length - 1; n >= e; n -= 2)
                  (i = u(t, e, n) << o),
                    (this.words[s] |= 67108863 & i),
                    o >= 18 ? ((o -= 18), (s += 1), (this.words[s] |= i >>> 26)) : (o += 8);
              else
                for (n = (t.length - e) % 2 == 0 ? e + 1 : e; n < t.length; n += 2)
                  (i = u(t, e, n) << o),
                    (this.words[s] |= 67108863 & i),
                    o >= 18 ? ((o -= 18), (s += 1), (this.words[s] |= i >>> 26)) : (o += 8);
              this._strip();
            }),
            (o.prototype._parseBase = function (t, e, r) {
              (this.words = [0]), (this.length = 1);
              for (var n = 0, i = 1; i <= 67108863; i *= e) n++;
              n--, (i = (i / e) | 0);
              for (var o = t.length - r, s = o % n, a = Math.min(o, o - s) + r, u = 0, l = r; l < a; l += n)
                (u = c(t, l, l + n, e)),
                  this.imuln(i),
                  this.words[0] + u < 67108864 ? (this.words[0] += u) : this._iaddn(u);
              if (0 !== s) {
                var h = 1;
                for (u = c(t, l, t.length, e), l = 0; l < s; l++) h *= e;
                this.imuln(h), this.words[0] + u < 67108864 ? (this.words[0] += u) : this._iaddn(u);
              }
              this._strip();
            }),
            (o.prototype.copy = function (t) {
              t.words = new Array(this.length);
              for (var e = 0; e < this.length; e++) t.words[e] = this.words[e];
              (t.length = this.length), (t.negative = this.negative), (t.red = this.red);
            }),
            (o.prototype._move = function (t) {
              l(t, this);
            }),
            (o.prototype.clone = function () {
              var t = new o(null);
              return this.copy(t), t;
            }),
            (o.prototype._expand = function (t) {
              for (; this.length < t; ) this.words[this.length++] = 0;
              return this;
            }),
            (o.prototype._strip = function () {
              for (; this.length > 1 && 0 === this.words[this.length - 1]; ) this.length--;
              return this._normSign();
            }),
            (o.prototype._normSign = function () {
              return 1 === this.length && 0 === this.words[0] && (this.negative = 0), this;
            }),
            'undefined' != typeof Symbol && 'function' == typeof Symbol.for)
          )
            try {
              o.prototype[Symbol.for('nodejs.util.inspect.custom')] = h;
            } catch (t) {
              o.prototype.inspect = h;
            }
          else o.prototype.inspect = h;
          function h() {
            return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>';
          }
          var f = [
              '',
              '0',
              '00',
              '000',
              '0000',
              '00000',
              '000000',
              '0000000',
              '00000000',
              '000000000',
              '0000000000',
              '00000000000',
              '000000000000',
              '0000000000000',
              '00000000000000',
              '000000000000000',
              '0000000000000000',
              '00000000000000000',
              '000000000000000000',
              '0000000000000000000',
              '00000000000000000000',
              '000000000000000000000',
              '0000000000000000000000',
              '00000000000000000000000',
              '000000000000000000000000',
              '0000000000000000000000000',
            ],
            d = [
              0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
              5, 5, 5,
            ],
            p = [
              0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171,
              35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632,
              6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393,
              45435424, 52521875, 60466176,
            ];
          function y(t, e, r) {
            r.negative = e.negative ^ t.negative;
            var n = (t.length + e.length) | 0;
            (r.length = n), (n = (n - 1) | 0);
            var i = 0 | t.words[0],
              o = 0 | e.words[0],
              s = i * o,
              a = 67108863 & s,
              u = (s / 67108864) | 0;
            r.words[0] = a;
            for (var c = 1; c < n; c++) {
              for (
                var l = u >>> 26, h = 67108863 & u, f = Math.min(c, e.length - 1), d = Math.max(0, c - t.length + 1);
                d <= f;
                d++
              ) {
                var p = (c - d) | 0;
                (l += ((s = (i = 0 | t.words[p]) * (o = 0 | e.words[d]) + h) / 67108864) | 0), (h = 67108863 & s);
              }
              (r.words[c] = 0 | h), (u = 0 | l);
            }
            return 0 !== u ? (r.words[c] = 0 | u) : r.length--, r._strip();
          }
          (o.prototype.toString = function (t, e) {
            var r;
            if (((e = 0 | e || 1), 16 === (t = t || 10) || 'hex' === t)) {
              r = '';
              for (var i = 0, o = 0, s = 0; s < this.length; s++) {
                var a = this.words[s],
                  u = (16777215 & ((a << i) | o)).toString(16);
                (o = (a >>> (24 - i)) & 16777215),
                  (i += 2) >= 26 && ((i -= 26), s--),
                  (r = 0 !== o || s !== this.length - 1 ? f[6 - u.length] + u + r : u + r);
              }
              for (0 !== o && (r = o.toString(16) + r); r.length % e != 0; ) r = '0' + r;
              return 0 !== this.negative && (r = '-' + r), r;
            }
            if (t === (0 | t) && t >= 2 && t <= 36) {
              var c = d[t],
                l = p[t];
              r = '';
              var h = this.clone();
              for (h.negative = 0; !h.isZero(); ) {
                var y = h.modrn(l).toString(t);
                r = (h = h.idivn(l)).isZero() ? y + r : f[c - y.length] + y + r;
              }
              for (this.isZero() && (r = '0' + r); r.length % e != 0; ) r = '0' + r;
              return 0 !== this.negative && (r = '-' + r), r;
            }
            n(!1, 'Base should be between 2 and 36');
          }),
            (o.prototype.toNumber = function () {
              var t = this.words[0];
              return (
                2 === this.length
                  ? (t += 67108864 * this.words[1])
                  : 3 === this.length && 1 === this.words[2]
                    ? (t += 4503599627370496 + 67108864 * this.words[1])
                    : this.length > 2 && n(!1, 'Number can only safely store up to 53 bits'),
                0 !== this.negative ? -t : t
              );
            }),
            (o.prototype.toJSON = function () {
              return this.toString(16, 2);
            }),
            s &&
              (o.prototype.toBuffer = function (t, e) {
                return this.toArrayLike(s, t, e);
              }),
            (o.prototype.toArray = function (t, e) {
              return this.toArrayLike(Array, t, e);
            }),
            (o.prototype.toArrayLike = function (t, e, r) {
              this._strip();
              var i = this.byteLength(),
                o = r || Math.max(1, i);
              n(i <= o, 'byte array longer than desired length'), n(o > 0, 'Requested array length <= 0');
              var s = (function (t, e) {
                return t.allocUnsafe ? t.allocUnsafe(e) : new t(e);
              })(t, o);
              return this['_toArrayLike' + ('le' === e ? 'LE' : 'BE')](s, i), s;
            }),
            (o.prototype._toArrayLikeLE = function (t, e) {
              for (var r = 0, n = 0, i = 0, o = 0; i < this.length; i++) {
                var s = (this.words[i] << o) | n;
                (t[r++] = 255 & s),
                  r < t.length && (t[r++] = (s >> 8) & 255),
                  r < t.length && (t[r++] = (s >> 16) & 255),
                  6 === o ? (r < t.length && (t[r++] = (s >> 24) & 255), (n = 0), (o = 0)) : ((n = s >>> 24), (o += 2));
              }
              if (r < t.length) for (t[r++] = n; r < t.length; ) t[r++] = 0;
            }),
            (o.prototype._toArrayLikeBE = function (t, e) {
              for (var r = t.length - 1, n = 0, i = 0, o = 0; i < this.length; i++) {
                var s = (this.words[i] << o) | n;
                (t[r--] = 255 & s),
                  r >= 0 && (t[r--] = (s >> 8) & 255),
                  r >= 0 && (t[r--] = (s >> 16) & 255),
                  6 === o ? (r >= 0 && (t[r--] = (s >> 24) & 255), (n = 0), (o = 0)) : ((n = s >>> 24), (o += 2));
              }
              if (r >= 0) for (t[r--] = n; r >= 0; ) t[r--] = 0;
            }),
            Math.clz32
              ? (o.prototype._countBits = function (t) {
                  return 32 - Math.clz32(t);
                })
              : (o.prototype._countBits = function (t) {
                  var e = t,
                    r = 0;
                  return (
                    e >= 4096 && ((r += 13), (e >>>= 13)),
                    e >= 64 && ((r += 7), (e >>>= 7)),
                    e >= 8 && ((r += 4), (e >>>= 4)),
                    e >= 2 && ((r += 2), (e >>>= 2)),
                    r + e
                  );
                }),
            (o.prototype._zeroBits = function (t) {
              if (0 === t) return 26;
              var e = t,
                r = 0;
              return (
                0 == (8191 & e) && ((r += 13), (e >>>= 13)),
                0 == (127 & e) && ((r += 7), (e >>>= 7)),
                0 == (15 & e) && ((r += 4), (e >>>= 4)),
                0 == (3 & e) && ((r += 2), (e >>>= 2)),
                0 == (1 & e) && r++,
                r
              );
            }),
            (o.prototype.bitLength = function () {
              var t = this.words[this.length - 1],
                e = this._countBits(t);
              return 26 * (this.length - 1) + e;
            }),
            (o.prototype.zeroBits = function () {
              if (this.isZero()) return 0;
              for (var t = 0, e = 0; e < this.length; e++) {
                var r = this._zeroBits(this.words[e]);
                if (((t += r), 26 !== r)) break;
              }
              return t;
            }),
            (o.prototype.byteLength = function () {
              return Math.ceil(this.bitLength() / 8);
            }),
            (o.prototype.toTwos = function (t) {
              return 0 !== this.negative ? this.abs().inotn(t).iaddn(1) : this.clone();
            }),
            (o.prototype.fromTwos = function (t) {
              return this.testn(t - 1) ? this.notn(t).iaddn(1).ineg() : this.clone();
            }),
            (o.prototype.isNeg = function () {
              return 0 !== this.negative;
            }),
            (o.prototype.neg = function () {
              return this.clone().ineg();
            }),
            (o.prototype.ineg = function () {
              return this.isZero() || (this.negative ^= 1), this;
            }),
            (o.prototype.iuor = function (t) {
              for (; this.length < t.length; ) this.words[this.length++] = 0;
              for (var e = 0; e < t.length; e++) this.words[e] = this.words[e] | t.words[e];
              return this._strip();
            }),
            (o.prototype.ior = function (t) {
              return n(0 == (this.negative | t.negative)), this.iuor(t);
            }),
            (o.prototype.or = function (t) {
              return this.length > t.length ? this.clone().ior(t) : t.clone().ior(this);
            }),
            (o.prototype.uor = function (t) {
              return this.length > t.length ? this.clone().iuor(t) : t.clone().iuor(this);
            }),
            (o.prototype.iuand = function (t) {
              var e;
              e = this.length > t.length ? t : this;
              for (var r = 0; r < e.length; r++) this.words[r] = this.words[r] & t.words[r];
              return (this.length = e.length), this._strip();
            }),
            (o.prototype.iand = function (t) {
              return n(0 == (this.negative | t.negative)), this.iuand(t);
            }),
            (o.prototype.and = function (t) {
              return this.length > t.length ? this.clone().iand(t) : t.clone().iand(this);
            }),
            (o.prototype.uand = function (t) {
              return this.length > t.length ? this.clone().iuand(t) : t.clone().iuand(this);
            }),
            (o.prototype.iuxor = function (t) {
              var e, r;
              this.length > t.length ? ((e = this), (r = t)) : ((e = t), (r = this));
              for (var n = 0; n < r.length; n++) this.words[n] = e.words[n] ^ r.words[n];
              if (this !== e) for (; n < e.length; n++) this.words[n] = e.words[n];
              return (this.length = e.length), this._strip();
            }),
            (o.prototype.ixor = function (t) {
              return n(0 == (this.negative | t.negative)), this.iuxor(t);
            }),
            (o.prototype.xor = function (t) {
              return this.length > t.length ? this.clone().ixor(t) : t.clone().ixor(this);
            }),
            (o.prototype.uxor = function (t) {
              return this.length > t.length ? this.clone().iuxor(t) : t.clone().iuxor(this);
            }),
            (o.prototype.inotn = function (t) {
              n('number' == typeof t && t >= 0);
              var e = 0 | Math.ceil(t / 26),
                r = t % 26;
              this._expand(e), r > 0 && e--;
              for (var i = 0; i < e; i++) this.words[i] = 67108863 & ~this.words[i];
              return r > 0 && (this.words[i] = ~this.words[i] & (67108863 >> (26 - r))), this._strip();
            }),
            (o.prototype.notn = function (t) {
              return this.clone().inotn(t);
            }),
            (o.prototype.setn = function (t, e) {
              n('number' == typeof t && t >= 0);
              var r = (t / 26) | 0,
                i = t % 26;
              return (
                this._expand(r + 1),
                (this.words[r] = e ? this.words[r] | (1 << i) : this.words[r] & ~(1 << i)),
                this._strip()
              );
            }),
            (o.prototype.iadd = function (t) {
              var e, r, n;
              if (0 !== this.negative && 0 === t.negative)
                return (this.negative = 0), (e = this.isub(t)), (this.negative ^= 1), this._normSign();
              if (0 === this.negative && 0 !== t.negative)
                return (t.negative = 0), (e = this.isub(t)), (t.negative = 1), e._normSign();
              this.length > t.length ? ((r = this), (n = t)) : ((r = t), (n = this));
              for (var i = 0, o = 0; o < n.length; o++)
                (e = (0 | r.words[o]) + (0 | n.words[o]) + i), (this.words[o] = 67108863 & e), (i = e >>> 26);
              for (; 0 !== i && o < r.length; o++)
                (e = (0 | r.words[o]) + i), (this.words[o] = 67108863 & e), (i = e >>> 26);
              if (((this.length = r.length), 0 !== i)) (this.words[this.length] = i), this.length++;
              else if (r !== this) for (; o < r.length; o++) this.words[o] = r.words[o];
              return this;
            }),
            (o.prototype.add = function (t) {
              var e;
              return 0 !== t.negative && 0 === this.negative
                ? ((t.negative = 0), (e = this.sub(t)), (t.negative ^= 1), e)
                : 0 === t.negative && 0 !== this.negative
                  ? ((this.negative = 0), (e = t.sub(this)), (this.negative = 1), e)
                  : this.length > t.length
                    ? this.clone().iadd(t)
                    : t.clone().iadd(this);
            }),
            (o.prototype.isub = function (t) {
              if (0 !== t.negative) {
                t.negative = 0;
                var e = this.iadd(t);
                return (t.negative = 1), e._normSign();
              }
              if (0 !== this.negative) return (this.negative = 0), this.iadd(t), (this.negative = 1), this._normSign();
              var r,
                n,
                i = this.cmp(t);
              if (0 === i) return (this.negative = 0), (this.length = 1), (this.words[0] = 0), this;
              i > 0 ? ((r = this), (n = t)) : ((r = t), (n = this));
              for (var o = 0, s = 0; s < n.length; s++)
                (o = (e = (0 | r.words[s]) - (0 | n.words[s]) + o) >> 26), (this.words[s] = 67108863 & e);
              for (; 0 !== o && s < r.length; s++)
                (o = (e = (0 | r.words[s]) + o) >> 26), (this.words[s] = 67108863 & e);
              if (0 === o && s < r.length && r !== this) for (; s < r.length; s++) this.words[s] = r.words[s];
              return (this.length = Math.max(this.length, s)), r !== this && (this.negative = 1), this._strip();
            }),
            (o.prototype.sub = function (t) {
              return this.clone().isub(t);
            });
          var g = function (t, e, r) {
            var n,
              i,
              o,
              s = t.words,
              a = e.words,
              u = r.words,
              c = 0,
              l = 0 | s[0],
              h = 8191 & l,
              f = l >>> 13,
              d = 0 | s[1],
              p = 8191 & d,
              y = d >>> 13,
              g = 0 | s[2],
              b = 8191 & g,
              m = g >>> 13,
              v = 0 | s[3],
              w = 8191 & v,
              _ = v >>> 13,
              S = 0 | s[4],
              E = 8191 & S,
              x = S >>> 13,
              M = 0 | s[5],
              k = 8191 & M,
              A = M >>> 13,
              C = 0 | s[6],
              R = 8191 & C,
              I = C >>> 13,
              T = 0 | s[7],
              O = 8191 & T,
              N = T >>> 13,
              j = 0 | s[8],
              L = 8191 & j,
              P = j >>> 13,
              D = 0 | s[9],
              B = 8191 & D,
              U = D >>> 13,
              F = 0 | a[0],
              H = 8191 & F,
              W = F >>> 13,
              z = 0 | a[1],
              V = 8191 & z,
              q = z >>> 13,
              Z = 0 | a[2],
              $ = 8191 & Z,
              G = Z >>> 13,
              Y = 0 | a[3],
              J = 8191 & Y,
              K = Y >>> 13,
              Q = 0 | a[4],
              X = 8191 & Q,
              tt = Q >>> 13,
              et = 0 | a[5],
              rt = 8191 & et,
              nt = et >>> 13,
              it = 0 | a[6],
              ot = 8191 & it,
              st = it >>> 13,
              at = 0 | a[7],
              ut = 8191 & at,
              ct = at >>> 13,
              lt = 0 | a[8],
              ht = 8191 & lt,
              ft = lt >>> 13,
              dt = 0 | a[9],
              pt = 8191 & dt,
              yt = dt >>> 13;
            (r.negative = t.negative ^ e.negative), (r.length = 19);
            var gt =
              (((c + (n = Math.imul(h, H))) | 0) +
                ((8191 & (i = ((i = Math.imul(h, W)) + Math.imul(f, H)) | 0)) << 13)) |
              0;
            (c = ((((o = Math.imul(f, W)) + (i >>> 13)) | 0) + (gt >>> 26)) | 0),
              (gt &= 67108863),
              (n = Math.imul(p, H)),
              (i = ((i = Math.imul(p, W)) + Math.imul(y, H)) | 0),
              (o = Math.imul(y, W));
            var bt =
              (((c + (n = (n + Math.imul(h, V)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(h, q)) | 0) + Math.imul(f, V)) | 0)) << 13)) |
              0;
            (c = ((((o = (o + Math.imul(f, q)) | 0) + (i >>> 13)) | 0) + (bt >>> 26)) | 0),
              (bt &= 67108863),
              (n = Math.imul(b, H)),
              (i = ((i = Math.imul(b, W)) + Math.imul(m, H)) | 0),
              (o = Math.imul(m, W)),
              (n = (n + Math.imul(p, V)) | 0),
              (i = ((i = (i + Math.imul(p, q)) | 0) + Math.imul(y, V)) | 0),
              (o = (o + Math.imul(y, q)) | 0);
            var mt =
              (((c + (n = (n + Math.imul(h, $)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(h, G)) | 0) + Math.imul(f, $)) | 0)) << 13)) |
              0;
            (c = ((((o = (o + Math.imul(f, G)) | 0) + (i >>> 13)) | 0) + (mt >>> 26)) | 0),
              (mt &= 67108863),
              (n = Math.imul(w, H)),
              (i = ((i = Math.imul(w, W)) + Math.imul(_, H)) | 0),
              (o = Math.imul(_, W)),
              (n = (n + Math.imul(b, V)) | 0),
              (i = ((i = (i + Math.imul(b, q)) | 0) + Math.imul(m, V)) | 0),
              (o = (o + Math.imul(m, q)) | 0),
              (n = (n + Math.imul(p, $)) | 0),
              (i = ((i = (i + Math.imul(p, G)) | 0) + Math.imul(y, $)) | 0),
              (o = (o + Math.imul(y, G)) | 0);
            var vt =
              (((c + (n = (n + Math.imul(h, J)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(h, K)) | 0) + Math.imul(f, J)) | 0)) << 13)) |
              0;
            (c = ((((o = (o + Math.imul(f, K)) | 0) + (i >>> 13)) | 0) + (vt >>> 26)) | 0),
              (vt &= 67108863),
              (n = Math.imul(E, H)),
              (i = ((i = Math.imul(E, W)) + Math.imul(x, H)) | 0),
              (o = Math.imul(x, W)),
              (n = (n + Math.imul(w, V)) | 0),
              (i = ((i = (i + Math.imul(w, q)) | 0) + Math.imul(_, V)) | 0),
              (o = (o + Math.imul(_, q)) | 0),
              (n = (n + Math.imul(b, $)) | 0),
              (i = ((i = (i + Math.imul(b, G)) | 0) + Math.imul(m, $)) | 0),
              (o = (o + Math.imul(m, G)) | 0),
              (n = (n + Math.imul(p, J)) | 0),
              (i = ((i = (i + Math.imul(p, K)) | 0) + Math.imul(y, J)) | 0),
              (o = (o + Math.imul(y, K)) | 0);
            var wt =
              (((c + (n = (n + Math.imul(h, X)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(h, tt)) | 0) + Math.imul(f, X)) | 0)) << 13)) |
              0;
            (c = ((((o = (o + Math.imul(f, tt)) | 0) + (i >>> 13)) | 0) + (wt >>> 26)) | 0),
              (wt &= 67108863),
              (n = Math.imul(k, H)),
              (i = ((i = Math.imul(k, W)) + Math.imul(A, H)) | 0),
              (o = Math.imul(A, W)),
              (n = (n + Math.imul(E, V)) | 0),
              (i = ((i = (i + Math.imul(E, q)) | 0) + Math.imul(x, V)) | 0),
              (o = (o + Math.imul(x, q)) | 0),
              (n = (n + Math.imul(w, $)) | 0),
              (i = ((i = (i + Math.imul(w, G)) | 0) + Math.imul(_, $)) | 0),
              (o = (o + Math.imul(_, G)) | 0),
              (n = (n + Math.imul(b, J)) | 0),
              (i = ((i = (i + Math.imul(b, K)) | 0) + Math.imul(m, J)) | 0),
              (o = (o + Math.imul(m, K)) | 0),
              (n = (n + Math.imul(p, X)) | 0),
              (i = ((i = (i + Math.imul(p, tt)) | 0) + Math.imul(y, X)) | 0),
              (o = (o + Math.imul(y, tt)) | 0);
            var _t =
              (((c + (n = (n + Math.imul(h, rt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(h, nt)) | 0) + Math.imul(f, rt)) | 0)) << 13)) |
              0;
            (c = ((((o = (o + Math.imul(f, nt)) | 0) + (i >>> 13)) | 0) + (_t >>> 26)) | 0),
              (_t &= 67108863),
              (n = Math.imul(R, H)),
              (i = ((i = Math.imul(R, W)) + Math.imul(I, H)) | 0),
              (o = Math.imul(I, W)),
              (n = (n + Math.imul(k, V)) | 0),
              (i = ((i = (i + Math.imul(k, q)) | 0) + Math.imul(A, V)) | 0),
              (o = (o + Math.imul(A, q)) | 0),
              (n = (n + Math.imul(E, $)) | 0),
              (i = ((i = (i + Math.imul(E, G)) | 0) + Math.imul(x, $)) | 0),
              (o = (o + Math.imul(x, G)) | 0),
              (n = (n + Math.imul(w, J)) | 0),
              (i = ((i = (i + Math.imul(w, K)) | 0) + Math.imul(_, J)) | 0),
              (o = (o + Math.imul(_, K)) | 0),
              (n = (n + Math.imul(b, X)) | 0),
              (i = ((i = (i + Math.imul(b, tt)) | 0) + Math.imul(m, X)) | 0),
              (o = (o + Math.imul(m, tt)) | 0),
              (n = (n + Math.imul(p, rt)) | 0),
              (i = ((i = (i + Math.imul(p, nt)) | 0) + Math.imul(y, rt)) | 0),
              (o = (o + Math.imul(y, nt)) | 0);
            var St =
              (((c + (n = (n + Math.imul(h, ot)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(h, st)) | 0) + Math.imul(f, ot)) | 0)) << 13)) |
              0;
            (c = ((((o = (o + Math.imul(f, st)) | 0) + (i >>> 13)) | 0) + (St >>> 26)) | 0),
              (St &= 67108863),
              (n = Math.imul(O, H)),
              (i = ((i = Math.imul(O, W)) + Math.imul(N, H)) | 0),
              (o = Math.imul(N, W)),
              (n = (n + Math.imul(R, V)) | 0),
              (i = ((i = (i + Math.imul(R, q)) | 0) + Math.imul(I, V)) | 0),
              (o = (o + Math.imul(I, q)) | 0),
              (n = (n + Math.imul(k, $)) | 0),
              (i = ((i = (i + Math.imul(k, G)) | 0) + Math.imul(A, $)) | 0),
              (o = (o + Math.imul(A, G)) | 0),
              (n = (n + Math.imul(E, J)) | 0),
              (i = ((i = (i + Math.imul(E, K)) | 0) + Math.imul(x, J)) | 0),
              (o = (o + Math.imul(x, K)) | 0),
              (n = (n + Math.imul(w, X)) | 0),
              (i = ((i = (i + Math.imul(w, tt)) | 0) + Math.imul(_, X)) | 0),
              (o = (o + Math.imul(_, tt)) | 0),
              (n = (n + Math.imul(b, rt)) | 0),
              (i = ((i = (i + Math.imul(b, nt)) | 0) + Math.imul(m, rt)) | 0),
              (o = (o + Math.imul(m, nt)) | 0),
              (n = (n + Math.imul(p, ot)) | 0),
              (i = ((i = (i + Math.imul(p, st)) | 0) + Math.imul(y, ot)) | 0),
              (o = (o + Math.imul(y, st)) | 0);
            var Et =
              (((c + (n = (n + Math.imul(h, ut)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(h, ct)) | 0) + Math.imul(f, ut)) | 0)) << 13)) |
              0;
            (c = ((((o = (o + Math.imul(f, ct)) | 0) + (i >>> 13)) | 0) + (Et >>> 26)) | 0),
              (Et &= 67108863),
              (n = Math.imul(L, H)),
              (i = ((i = Math.imul(L, W)) + Math.imul(P, H)) | 0),
              (o = Math.imul(P, W)),
              (n = (n + Math.imul(O, V)) | 0),
              (i = ((i = (i + Math.imul(O, q)) | 0) + Math.imul(N, V)) | 0),
              (o = (o + Math.imul(N, q)) | 0),
              (n = (n + Math.imul(R, $)) | 0),
              (i = ((i = (i + Math.imul(R, G)) | 0) + Math.imul(I, $)) | 0),
              (o = (o + Math.imul(I, G)) | 0),
              (n = (n + Math.imul(k, J)) | 0),
              (i = ((i = (i + Math.imul(k, K)) | 0) + Math.imul(A, J)) | 0),
              (o = (o + Math.imul(A, K)) | 0),
              (n = (n + Math.imul(E, X)) | 0),
              (i = ((i = (i + Math.imul(E, tt)) | 0) + Math.imul(x, X)) | 0),
              (o = (o + Math.imul(x, tt)) | 0),
              (n = (n + Math.imul(w, rt)) | 0),
              (i = ((i = (i + Math.imul(w, nt)) | 0) + Math.imul(_, rt)) | 0),
              (o = (o + Math.imul(_, nt)) | 0),
              (n = (n + Math.imul(b, ot)) | 0),
              (i = ((i = (i + Math.imul(b, st)) | 0) + Math.imul(m, ot)) | 0),
              (o = (o + Math.imul(m, st)) | 0),
              (n = (n + Math.imul(p, ut)) | 0),
              (i = ((i = (i + Math.imul(p, ct)) | 0) + Math.imul(y, ut)) | 0),
              (o = (o + Math.imul(y, ct)) | 0);
            var xt =
              (((c + (n = (n + Math.imul(h, ht)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(h, ft)) | 0) + Math.imul(f, ht)) | 0)) << 13)) |
              0;
            (c = ((((o = (o + Math.imul(f, ft)) | 0) + (i >>> 13)) | 0) + (xt >>> 26)) | 0),
              (xt &= 67108863),
              (n = Math.imul(B, H)),
              (i = ((i = Math.imul(B, W)) + Math.imul(U, H)) | 0),
              (o = Math.imul(U, W)),
              (n = (n + Math.imul(L, V)) | 0),
              (i = ((i = (i + Math.imul(L, q)) | 0) + Math.imul(P, V)) | 0),
              (o = (o + Math.imul(P, q)) | 0),
              (n = (n + Math.imul(O, $)) | 0),
              (i = ((i = (i + Math.imul(O, G)) | 0) + Math.imul(N, $)) | 0),
              (o = (o + Math.imul(N, G)) | 0),
              (n = (n + Math.imul(R, J)) | 0),
              (i = ((i = (i + Math.imul(R, K)) | 0) + Math.imul(I, J)) | 0),
              (o = (o + Math.imul(I, K)) | 0),
              (n = (n + Math.imul(k, X)) | 0),
              (i = ((i = (i + Math.imul(k, tt)) | 0) + Math.imul(A, X)) | 0),
              (o = (o + Math.imul(A, tt)) | 0),
              (n = (n + Math.imul(E, rt)) | 0),
              (i = ((i = (i + Math.imul(E, nt)) | 0) + Math.imul(x, rt)) | 0),
              (o = (o + Math.imul(x, nt)) | 0),
              (n = (n + Math.imul(w, ot)) | 0),
              (i = ((i = (i + Math.imul(w, st)) | 0) + Math.imul(_, ot)) | 0),
              (o = (o + Math.imul(_, st)) | 0),
              (n = (n + Math.imul(b, ut)) | 0),
              (i = ((i = (i + Math.imul(b, ct)) | 0) + Math.imul(m, ut)) | 0),
              (o = (o + Math.imul(m, ct)) | 0),
              (n = (n + Math.imul(p, ht)) | 0),
              (i = ((i = (i + Math.imul(p, ft)) | 0) + Math.imul(y, ht)) | 0),
              (o = (o + Math.imul(y, ft)) | 0);
            var Mt =
              (((c + (n = (n + Math.imul(h, pt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(h, yt)) | 0) + Math.imul(f, pt)) | 0)) << 13)) |
              0;
            (c = ((((o = (o + Math.imul(f, yt)) | 0) + (i >>> 13)) | 0) + (Mt >>> 26)) | 0),
              (Mt &= 67108863),
              (n = Math.imul(B, V)),
              (i = ((i = Math.imul(B, q)) + Math.imul(U, V)) | 0),
              (o = Math.imul(U, q)),
              (n = (n + Math.imul(L, $)) | 0),
              (i = ((i = (i + Math.imul(L, G)) | 0) + Math.imul(P, $)) | 0),
              (o = (o + Math.imul(P, G)) | 0),
              (n = (n + Math.imul(O, J)) | 0),
              (i = ((i = (i + Math.imul(O, K)) | 0) + Math.imul(N, J)) | 0),
              (o = (o + Math.imul(N, K)) | 0),
              (n = (n + Math.imul(R, X)) | 0),
              (i = ((i = (i + Math.imul(R, tt)) | 0) + Math.imul(I, X)) | 0),
              (o = (o + Math.imul(I, tt)) | 0),
              (n = (n + Math.imul(k, rt)) | 0),
              (i = ((i = (i + Math.imul(k, nt)) | 0) + Math.imul(A, rt)) | 0),
              (o = (o + Math.imul(A, nt)) | 0),
              (n = (n + Math.imul(E, ot)) | 0),
              (i = ((i = (i + Math.imul(E, st)) | 0) + Math.imul(x, ot)) | 0),
              (o = (o + Math.imul(x, st)) | 0),
              (n = (n + Math.imul(w, ut)) | 0),
              (i = ((i = (i + Math.imul(w, ct)) | 0) + Math.imul(_, ut)) | 0),
              (o = (o + Math.imul(_, ct)) | 0),
              (n = (n + Math.imul(b, ht)) | 0),
              (i = ((i = (i + Math.imul(b, ft)) | 0) + Math.imul(m, ht)) | 0),
              (o = (o + Math.imul(m, ft)) | 0);
            var kt =
              (((c + (n = (n + Math.imul(p, pt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(p, yt)) | 0) + Math.imul(y, pt)) | 0)) << 13)) |
              0;
            (c = ((((o = (o + Math.imul(y, yt)) | 0) + (i >>> 13)) | 0) + (kt >>> 26)) | 0),
              (kt &= 67108863),
              (n = Math.imul(B, $)),
              (i = ((i = Math.imul(B, G)) + Math.imul(U, $)) | 0),
              (o = Math.imul(U, G)),
              (n = (n + Math.imul(L, J)) | 0),
              (i = ((i = (i + Math.imul(L, K)) | 0) + Math.imul(P, J)) | 0),
              (o = (o + Math.imul(P, K)) | 0),
              (n = (n + Math.imul(O, X)) | 0),
              (i = ((i = (i + Math.imul(O, tt)) | 0) + Math.imul(N, X)) | 0),
              (o = (o + Math.imul(N, tt)) | 0),
              (n = (n + Math.imul(R, rt)) | 0),
              (i = ((i = (i + Math.imul(R, nt)) | 0) + Math.imul(I, rt)) | 0),
              (o = (o + Math.imul(I, nt)) | 0),
              (n = (n + Math.imul(k, ot)) | 0),
              (i = ((i = (i + Math.imul(k, st)) | 0) + Math.imul(A, ot)) | 0),
              (o = (o + Math.imul(A, st)) | 0),
              (n = (n + Math.imul(E, ut)) | 0),
              (i = ((i = (i + Math.imul(E, ct)) | 0) + Math.imul(x, ut)) | 0),
              (o = (o + Math.imul(x, ct)) | 0),
              (n = (n + Math.imul(w, ht)) | 0),
              (i = ((i = (i + Math.imul(w, ft)) | 0) + Math.imul(_, ht)) | 0),
              (o = (o + Math.imul(_, ft)) | 0);
            var At =
              (((c + (n = (n + Math.imul(b, pt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(b, yt)) | 0) + Math.imul(m, pt)) | 0)) << 13)) |
              0;
            (c = ((((o = (o + Math.imul(m, yt)) | 0) + (i >>> 13)) | 0) + (At >>> 26)) | 0),
              (At &= 67108863),
              (n = Math.imul(B, J)),
              (i = ((i = Math.imul(B, K)) + Math.imul(U, J)) | 0),
              (o = Math.imul(U, K)),
              (n = (n + Math.imul(L, X)) | 0),
              (i = ((i = (i + Math.imul(L, tt)) | 0) + Math.imul(P, X)) | 0),
              (o = (o + Math.imul(P, tt)) | 0),
              (n = (n + Math.imul(O, rt)) | 0),
              (i = ((i = (i + Math.imul(O, nt)) | 0) + Math.imul(N, rt)) | 0),
              (o = (o + Math.imul(N, nt)) | 0),
              (n = (n + Math.imul(R, ot)) | 0),
              (i = ((i = (i + Math.imul(R, st)) | 0) + Math.imul(I, ot)) | 0),
              (o = (o + Math.imul(I, st)) | 0),
              (n = (n + Math.imul(k, ut)) | 0),
              (i = ((i = (i + Math.imul(k, ct)) | 0) + Math.imul(A, ut)) | 0),
              (o = (o + Math.imul(A, ct)) | 0),
              (n = (n + Math.imul(E, ht)) | 0),
              (i = ((i = (i + Math.imul(E, ft)) | 0) + Math.imul(x, ht)) | 0),
              (o = (o + Math.imul(x, ft)) | 0);
            var Ct =
              (((c + (n = (n + Math.imul(w, pt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(w, yt)) | 0) + Math.imul(_, pt)) | 0)) << 13)) |
              0;
            (c = ((((o = (o + Math.imul(_, yt)) | 0) + (i >>> 13)) | 0) + (Ct >>> 26)) | 0),
              (Ct &= 67108863),
              (n = Math.imul(B, X)),
              (i = ((i = Math.imul(B, tt)) + Math.imul(U, X)) | 0),
              (o = Math.imul(U, tt)),
              (n = (n + Math.imul(L, rt)) | 0),
              (i = ((i = (i + Math.imul(L, nt)) | 0) + Math.imul(P, rt)) | 0),
              (o = (o + Math.imul(P, nt)) | 0),
              (n = (n + Math.imul(O, ot)) | 0),
              (i = ((i = (i + Math.imul(O, st)) | 0) + Math.imul(N, ot)) | 0),
              (o = (o + Math.imul(N, st)) | 0),
              (n = (n + Math.imul(R, ut)) | 0),
              (i = ((i = (i + Math.imul(R, ct)) | 0) + Math.imul(I, ut)) | 0),
              (o = (o + Math.imul(I, ct)) | 0),
              (n = (n + Math.imul(k, ht)) | 0),
              (i = ((i = (i + Math.imul(k, ft)) | 0) + Math.imul(A, ht)) | 0),
              (o = (o + Math.imul(A, ft)) | 0);
            var Rt =
              (((c + (n = (n + Math.imul(E, pt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(E, yt)) | 0) + Math.imul(x, pt)) | 0)) << 13)) |
              0;
            (c = ((((o = (o + Math.imul(x, yt)) | 0) + (i >>> 13)) | 0) + (Rt >>> 26)) | 0),
              (Rt &= 67108863),
              (n = Math.imul(B, rt)),
              (i = ((i = Math.imul(B, nt)) + Math.imul(U, rt)) | 0),
              (o = Math.imul(U, nt)),
              (n = (n + Math.imul(L, ot)) | 0),
              (i = ((i = (i + Math.imul(L, st)) | 0) + Math.imul(P, ot)) | 0),
              (o = (o + Math.imul(P, st)) | 0),
              (n = (n + Math.imul(O, ut)) | 0),
              (i = ((i = (i + Math.imul(O, ct)) | 0) + Math.imul(N, ut)) | 0),
              (o = (o + Math.imul(N, ct)) | 0),
              (n = (n + Math.imul(R, ht)) | 0),
              (i = ((i = (i + Math.imul(R, ft)) | 0) + Math.imul(I, ht)) | 0),
              (o = (o + Math.imul(I, ft)) | 0);
            var It =
              (((c + (n = (n + Math.imul(k, pt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(k, yt)) | 0) + Math.imul(A, pt)) | 0)) << 13)) |
              0;
            (c = ((((o = (o + Math.imul(A, yt)) | 0) + (i >>> 13)) | 0) + (It >>> 26)) | 0),
              (It &= 67108863),
              (n = Math.imul(B, ot)),
              (i = ((i = Math.imul(B, st)) + Math.imul(U, ot)) | 0),
              (o = Math.imul(U, st)),
              (n = (n + Math.imul(L, ut)) | 0),
              (i = ((i = (i + Math.imul(L, ct)) | 0) + Math.imul(P, ut)) | 0),
              (o = (o + Math.imul(P, ct)) | 0),
              (n = (n + Math.imul(O, ht)) | 0),
              (i = ((i = (i + Math.imul(O, ft)) | 0) + Math.imul(N, ht)) | 0),
              (o = (o + Math.imul(N, ft)) | 0);
            var Tt =
              (((c + (n = (n + Math.imul(R, pt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(R, yt)) | 0) + Math.imul(I, pt)) | 0)) << 13)) |
              0;
            (c = ((((o = (o + Math.imul(I, yt)) | 0) + (i >>> 13)) | 0) + (Tt >>> 26)) | 0),
              (Tt &= 67108863),
              (n = Math.imul(B, ut)),
              (i = ((i = Math.imul(B, ct)) + Math.imul(U, ut)) | 0),
              (o = Math.imul(U, ct)),
              (n = (n + Math.imul(L, ht)) | 0),
              (i = ((i = (i + Math.imul(L, ft)) | 0) + Math.imul(P, ht)) | 0),
              (o = (o + Math.imul(P, ft)) | 0);
            var Ot =
              (((c + (n = (n + Math.imul(O, pt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(O, yt)) | 0) + Math.imul(N, pt)) | 0)) << 13)) |
              0;
            (c = ((((o = (o + Math.imul(N, yt)) | 0) + (i >>> 13)) | 0) + (Ot >>> 26)) | 0),
              (Ot &= 67108863),
              (n = Math.imul(B, ht)),
              (i = ((i = Math.imul(B, ft)) + Math.imul(U, ht)) | 0),
              (o = Math.imul(U, ft));
            var Nt =
              (((c + (n = (n + Math.imul(L, pt)) | 0)) | 0) +
                ((8191 & (i = ((i = (i + Math.imul(L, yt)) | 0) + Math.imul(P, pt)) | 0)) << 13)) |
              0;
            (c = ((((o = (o + Math.imul(P, yt)) | 0) + (i >>> 13)) | 0) + (Nt >>> 26)) | 0), (Nt &= 67108863);
            var jt =
              (((c + (n = Math.imul(B, pt))) | 0) +
                ((8191 & (i = ((i = Math.imul(B, yt)) + Math.imul(U, pt)) | 0)) << 13)) |
              0;
            return (
              (c = ((((o = Math.imul(U, yt)) + (i >>> 13)) | 0) + (jt >>> 26)) | 0),
              (jt &= 67108863),
              (u[0] = gt),
              (u[1] = bt),
              (u[2] = mt),
              (u[3] = vt),
              (u[4] = wt),
              (u[5] = _t),
              (u[6] = St),
              (u[7] = Et),
              (u[8] = xt),
              (u[9] = Mt),
              (u[10] = kt),
              (u[11] = At),
              (u[12] = Ct),
              (u[13] = Rt),
              (u[14] = It),
              (u[15] = Tt),
              (u[16] = Ot),
              (u[17] = Nt),
              (u[18] = jt),
              0 !== c && ((u[19] = c), r.length++),
              r
            );
          };
          function b(t, e, r) {
            (r.negative = e.negative ^ t.negative), (r.length = t.length + e.length);
            for (var n = 0, i = 0, o = 0; o < r.length - 1; o++) {
              var s = i;
              i = 0;
              for (
                var a = 67108863 & n, u = Math.min(o, e.length - 1), c = Math.max(0, o - t.length + 1);
                c <= u;
                c++
              ) {
                var l = o - c,
                  h = (0 | t.words[l]) * (0 | e.words[c]),
                  f = 67108863 & h;
                (a = 67108863 & (f = (f + a) | 0)),
                  (i += (s = ((s = (s + ((h / 67108864) | 0)) | 0) + (f >>> 26)) | 0) >>> 26),
                  (s &= 67108863);
              }
              (r.words[o] = a), (n = s), (s = i);
            }
            return 0 !== n ? (r.words[o] = n) : r.length--, r._strip();
          }
          function m(t, e, r) {
            return b(t, e, r);
          }
          function v(t, e) {
            (this.x = t), (this.y = e);
          }
          Math.imul || (g = y),
            (o.prototype.mulTo = function (t, e) {
              var r = this.length + t.length;
              return 10 === this.length && 10 === t.length
                ? g(this, t, e)
                : r < 63
                  ? y(this, t, e)
                  : r < 1024
                    ? b(this, t, e)
                    : m(this, t, e);
            }),
            (v.prototype.makeRBT = function (t) {
              for (var e = new Array(t), r = o.prototype._countBits(t) - 1, n = 0; n < t; n++)
                e[n] = this.revBin(n, r, t);
              return e;
            }),
            (v.prototype.revBin = function (t, e, r) {
              if (0 === t || t === r - 1) return t;
              for (var n = 0, i = 0; i < e; i++) (n |= (1 & t) << (e - i - 1)), (t >>= 1);
              return n;
            }),
            (v.prototype.permute = function (t, e, r, n, i, o) {
              for (var s = 0; s < o; s++) (n[s] = e[t[s]]), (i[s] = r[t[s]]);
            }),
            (v.prototype.transform = function (t, e, r, n, i, o) {
              this.permute(o, t, e, r, n, i);
              for (var s = 1; s < i; s <<= 1)
                for (
                  var a = s << 1, u = Math.cos((2 * Math.PI) / a), c = Math.sin((2 * Math.PI) / a), l = 0;
                  l < i;
                  l += a
                )
                  for (var h = u, f = c, d = 0; d < s; d++) {
                    var p = r[l + d],
                      y = n[l + d],
                      g = r[l + d + s],
                      b = n[l + d + s],
                      m = h * g - f * b;
                    (b = h * b + f * g),
                      (g = m),
                      (r[l + d] = p + g),
                      (n[l + d] = y + b),
                      (r[l + d + s] = p - g),
                      (n[l + d + s] = y - b),
                      d !== a && ((m = u * h - c * f), (f = u * f + c * h), (h = m));
                  }
            }),
            (v.prototype.guessLen13b = function (t, e) {
              var r = 1 | Math.max(e, t),
                n = 1 & r,
                i = 0;
              for (r = (r / 2) | 0; r; r >>>= 1) i++;
              return 1 << (i + 1 + n);
            }),
            (v.prototype.conjugate = function (t, e, r) {
              if (!(r <= 1))
                for (var n = 0; n < r / 2; n++) {
                  var i = t[n];
                  (t[n] = t[r - n - 1]), (t[r - n - 1] = i), (i = e[n]), (e[n] = -e[r - n - 1]), (e[r - n - 1] = -i);
                }
            }),
            (v.prototype.normalize13b = function (t, e) {
              for (var r = 0, n = 0; n < e / 2; n++) {
                var i = 8192 * Math.round(t[2 * n + 1] / e) + Math.round(t[2 * n] / e) + r;
                (t[n] = 67108863 & i), (r = i < 67108864 ? 0 : (i / 67108864) | 0);
              }
              return t;
            }),
            (v.prototype.convert13b = function (t, e, r, i) {
              for (var o = 0, s = 0; s < e; s++)
                (o += 0 | t[s]), (r[2 * s] = 8191 & o), (o >>>= 13), (r[2 * s + 1] = 8191 & o), (o >>>= 13);
              for (s = 2 * e; s < i; ++s) r[s] = 0;
              n(0 === o), n(0 == (-8192 & o));
            }),
            (v.prototype.stub = function (t) {
              for (var e = new Array(t), r = 0; r < t; r++) e[r] = 0;
              return e;
            }),
            (v.prototype.mulp = function (t, e, r) {
              var n = 2 * this.guessLen13b(t.length, e.length),
                i = this.makeRBT(n),
                o = this.stub(n),
                s = new Array(n),
                a = new Array(n),
                u = new Array(n),
                c = new Array(n),
                l = new Array(n),
                h = new Array(n),
                f = r.words;
              (f.length = n),
                this.convert13b(t.words, t.length, s, n),
                this.convert13b(e.words, e.length, c, n),
                this.transform(s, o, a, u, n, i),
                this.transform(c, o, l, h, n, i);
              for (var d = 0; d < n; d++) {
                var p = a[d] * l[d] - u[d] * h[d];
                (u[d] = a[d] * h[d] + u[d] * l[d]), (a[d] = p);
              }
              return (
                this.conjugate(a, u, n),
                this.transform(a, u, f, o, n, i),
                this.conjugate(f, o, n),
                this.normalize13b(f, n),
                (r.negative = t.negative ^ e.negative),
                (r.length = t.length + e.length),
                r._strip()
              );
            }),
            (o.prototype.mul = function (t) {
              var e = new o(null);
              return (e.words = new Array(this.length + t.length)), this.mulTo(t, e);
            }),
            (o.prototype.mulf = function (t) {
              var e = new o(null);
              return (e.words = new Array(this.length + t.length)), m(this, t, e);
            }),
            (o.prototype.imul = function (t) {
              return this.clone().mulTo(t, this);
            }),
            (o.prototype.imuln = function (t) {
              var e = t < 0;
              e && (t = -t), n('number' == typeof t), n(t < 67108864);
              for (var r = 0, i = 0; i < this.length; i++) {
                var o = (0 | this.words[i]) * t,
                  s = (67108863 & o) + (67108863 & r);
                (r >>= 26), (r += (o / 67108864) | 0), (r += s >>> 26), (this.words[i] = 67108863 & s);
              }
              return 0 !== r && ((this.words[i] = r), this.length++), e ? this.ineg() : this;
            }),
            (o.prototype.muln = function (t) {
              return this.clone().imuln(t);
            }),
            (o.prototype.sqr = function () {
              return this.mul(this);
            }),
            (o.prototype.isqr = function () {
              return this.imul(this.clone());
            }),
            (o.prototype.pow = function (t) {
              var e = (function (t) {
                for (var e = new Array(t.bitLength()), r = 0; r < e.length; r++) {
                  var n = (r / 26) | 0,
                    i = r % 26;
                  e[r] = (t.words[n] >>> i) & 1;
                }
                return e;
              })(t);
              if (0 === e.length) return new o(1);
              for (var r = this, n = 0; n < e.length && 0 === e[n]; n++, r = r.sqr());
              if (++n < e.length) for (var i = r.sqr(); n < e.length; n++, i = i.sqr()) 0 !== e[n] && (r = r.mul(i));
              return r;
            }),
            (o.prototype.iushln = function (t) {
              n('number' == typeof t && t >= 0);
              var e,
                r = t % 26,
                i = (t - r) / 26,
                o = (67108863 >>> (26 - r)) << (26 - r);
              if (0 !== r) {
                var s = 0;
                for (e = 0; e < this.length; e++) {
                  var a = this.words[e] & o,
                    u = ((0 | this.words[e]) - a) << r;
                  (this.words[e] = u | s), (s = a >>> (26 - r));
                }
                s && ((this.words[e] = s), this.length++);
              }
              if (0 !== i) {
                for (e = this.length - 1; e >= 0; e--) this.words[e + i] = this.words[e];
                for (e = 0; e < i; e++) this.words[e] = 0;
                this.length += i;
              }
              return this._strip();
            }),
            (o.prototype.ishln = function (t) {
              return n(0 === this.negative), this.iushln(t);
            }),
            (o.prototype.iushrn = function (t, e, r) {
              var i;
              n('number' == typeof t && t >= 0), (i = e ? (e - (e % 26)) / 26 : 0);
              var o = t % 26,
                s = Math.min((t - o) / 26, this.length),
                a = 67108863 ^ ((67108863 >>> o) << o),
                u = r;
              if (((i -= s), (i = Math.max(0, i)), u)) {
                for (var c = 0; c < s; c++) u.words[c] = this.words[c];
                u.length = s;
              }
              if (0 === s);
              else if (this.length > s)
                for (this.length -= s, c = 0; c < this.length; c++) this.words[c] = this.words[c + s];
              else (this.words[0] = 0), (this.length = 1);
              var l = 0;
              for (c = this.length - 1; c >= 0 && (0 !== l || c >= i); c--) {
                var h = 0 | this.words[c];
                (this.words[c] = (l << (26 - o)) | (h >>> o)), (l = h & a);
              }
              return (
                u && 0 !== l && (u.words[u.length++] = l),
                0 === this.length && ((this.words[0] = 0), (this.length = 1)),
                this._strip()
              );
            }),
            (o.prototype.ishrn = function (t, e, r) {
              return n(0 === this.negative), this.iushrn(t, e, r);
            }),
            (o.prototype.shln = function (t) {
              return this.clone().ishln(t);
            }),
            (o.prototype.ushln = function (t) {
              return this.clone().iushln(t);
            }),
            (o.prototype.shrn = function (t) {
              return this.clone().ishrn(t);
            }),
            (o.prototype.ushrn = function (t) {
              return this.clone().iushrn(t);
            }),
            (o.prototype.testn = function (t) {
              n('number' == typeof t && t >= 0);
              var e = t % 26,
                r = (t - e) / 26,
                i = 1 << e;
              return !(this.length <= r || !(this.words[r] & i));
            }),
            (o.prototype.imaskn = function (t) {
              n('number' == typeof t && t >= 0);
              var e = t % 26,
                r = (t - e) / 26;
              if ((n(0 === this.negative, 'imaskn works only with positive numbers'), this.length <= r)) return this;
              if ((0 !== e && r++, (this.length = Math.min(r, this.length)), 0 !== e)) {
                var i = 67108863 ^ ((67108863 >>> e) << e);
                this.words[this.length - 1] &= i;
              }
              return this._strip();
            }),
            (o.prototype.maskn = function (t) {
              return this.clone().imaskn(t);
            }),
            (o.prototype.iaddn = function (t) {
              return (
                n('number' == typeof t),
                n(t < 67108864),
                t < 0
                  ? this.isubn(-t)
                  : 0 !== this.negative
                    ? 1 === this.length && (0 | this.words[0]) <= t
                      ? ((this.words[0] = t - (0 | this.words[0])), (this.negative = 0), this)
                      : ((this.negative = 0), this.isubn(t), (this.negative = 1), this)
                    : this._iaddn(t)
              );
            }),
            (o.prototype._iaddn = function (t) {
              this.words[0] += t;
              for (var e = 0; e < this.length && this.words[e] >= 67108864; e++)
                (this.words[e] -= 67108864), e === this.length - 1 ? (this.words[e + 1] = 1) : this.words[e + 1]++;
              return (this.length = Math.max(this.length, e + 1)), this;
            }),
            (o.prototype.isubn = function (t) {
              if ((n('number' == typeof t), n(t < 67108864), t < 0)) return this.iaddn(-t);
              if (0 !== this.negative) return (this.negative = 0), this.iaddn(t), (this.negative = 1), this;
              if (((this.words[0] -= t), 1 === this.length && this.words[0] < 0))
                (this.words[0] = -this.words[0]), (this.negative = 1);
              else
                for (var e = 0; e < this.length && this.words[e] < 0; e++)
                  (this.words[e] += 67108864), (this.words[e + 1] -= 1);
              return this._strip();
            }),
            (o.prototype.addn = function (t) {
              return this.clone().iaddn(t);
            }),
            (o.prototype.subn = function (t) {
              return this.clone().isubn(t);
            }),
            (o.prototype.iabs = function () {
              return (this.negative = 0), this;
            }),
            (o.prototype.abs = function () {
              return this.clone().iabs();
            }),
            (o.prototype._ishlnsubmul = function (t, e, r) {
              var i,
                o,
                s = t.length + r;
              this._expand(s);
              var a = 0;
              for (i = 0; i < t.length; i++) {
                o = (0 | this.words[i + r]) + a;
                var u = (0 | t.words[i]) * e;
                (a = ((o -= 67108863 & u) >> 26) - ((u / 67108864) | 0)), (this.words[i + r] = 67108863 & o);
              }
              for (; i < this.length - r; i++)
                (a = (o = (0 | this.words[i + r]) + a) >> 26), (this.words[i + r] = 67108863 & o);
              if (0 === a) return this._strip();
              for (n(-1 === a), a = 0, i = 0; i < this.length; i++)
                (a = (o = -(0 | this.words[i]) + a) >> 26), (this.words[i] = 67108863 & o);
              return (this.negative = 1), this._strip();
            }),
            (o.prototype._wordDiv = function (t, e) {
              var r = (this.length, t.length),
                n = this.clone(),
                i = t,
                s = 0 | i.words[i.length - 1];
              0 != (r = 26 - this._countBits(s)) && ((i = i.ushln(r)), n.iushln(r), (s = 0 | i.words[i.length - 1]));
              var a,
                u = n.length - i.length;
              if ('mod' !== e) {
                ((a = new o(null)).length = u + 1), (a.words = new Array(a.length));
                for (var c = 0; c < a.length; c++) a.words[c] = 0;
              }
              var l = n.clone()._ishlnsubmul(i, 1, u);
              0 === l.negative && ((n = l), a && (a.words[u] = 1));
              for (var h = u - 1; h >= 0; h--) {
                var f = 67108864 * (0 | n.words[i.length + h]) + (0 | n.words[i.length + h - 1]);
                for (f = Math.min((f / s) | 0, 67108863), n._ishlnsubmul(i, f, h); 0 !== n.negative; )
                  f--, (n.negative = 0), n._ishlnsubmul(i, 1, h), n.isZero() || (n.negative ^= 1);
                a && (a.words[h] = f);
              }
              return a && a._strip(), n._strip(), 'div' !== e && 0 !== r && n.iushrn(r), { div: a || null, mod: n };
            }),
            (o.prototype.divmod = function (t, e, r) {
              return (
                n(!t.isZero()),
                this.isZero()
                  ? { div: new o(0), mod: new o(0) }
                  : 0 !== this.negative && 0 === t.negative
                    ? ((a = this.neg().divmod(t, e)),
                      'mod' !== e && (i = a.div.neg()),
                      'div' !== e && ((s = a.mod.neg()), r && 0 !== s.negative && s.iadd(t)),
                      { div: i, mod: s })
                    : 0 === this.negative && 0 !== t.negative
                      ? ((a = this.divmod(t.neg(), e)), 'mod' !== e && (i = a.div.neg()), { div: i, mod: a.mod })
                      : 0 != (this.negative & t.negative)
                        ? ((a = this.neg().divmod(t.neg(), e)),
                          'div' !== e && ((s = a.mod.neg()), r && 0 !== s.negative && s.isub(t)),
                          { div: a.div, mod: s })
                        : t.length > this.length || this.cmp(t) < 0
                          ? { div: new o(0), mod: this }
                          : 1 === t.length
                            ? 'div' === e
                              ? { div: this.divn(t.words[0]), mod: null }
                              : 'mod' === e
                                ? { div: null, mod: new o(this.modrn(t.words[0])) }
                                : { div: this.divn(t.words[0]), mod: new o(this.modrn(t.words[0])) }
                            : this._wordDiv(t, e)
              );
              var i, s, a;
            }),
            (o.prototype.div = function (t) {
              return this.divmod(t, 'div', !1).div;
            }),
            (o.prototype.mod = function (t) {
              return this.divmod(t, 'mod', !1).mod;
            }),
            (o.prototype.umod = function (t) {
              return this.divmod(t, 'mod', !0).mod;
            }),
            (o.prototype.divRound = function (t) {
              var e = this.divmod(t);
              if (e.mod.isZero()) return e.div;
              var r = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
                n = t.ushrn(1),
                i = t.andln(1),
                o = r.cmp(n);
              return o < 0 || (1 === i && 0 === o) ? e.div : 0 !== e.div.negative ? e.div.isubn(1) : e.div.iaddn(1);
            }),
            (o.prototype.modrn = function (t) {
              var e = t < 0;
              e && (t = -t), n(t <= 67108863);
              for (var r = (1 << 26) % t, i = 0, o = this.length - 1; o >= 0; o--)
                i = (r * i + (0 | this.words[o])) % t;
              return e ? -i : i;
            }),
            (o.prototype.modn = function (t) {
              return this.modrn(t);
            }),
            (o.prototype.idivn = function (t) {
              var e = t < 0;
              e && (t = -t), n(t <= 67108863);
              for (var r = 0, i = this.length - 1; i >= 0; i--) {
                var o = (0 | this.words[i]) + 67108864 * r;
                (this.words[i] = (o / t) | 0), (r = o % t);
              }
              return this._strip(), e ? this.ineg() : this;
            }),
            (o.prototype.divn = function (t) {
              return this.clone().idivn(t);
            }),
            (o.prototype.egcd = function (t) {
              n(0 === t.negative), n(!t.isZero());
              var e = this,
                r = t.clone();
              e = 0 !== e.negative ? e.umod(t) : e.clone();
              for (var i = new o(1), s = new o(0), a = new o(0), u = new o(1), c = 0; e.isEven() && r.isEven(); )
                e.iushrn(1), r.iushrn(1), ++c;
              for (var l = r.clone(), h = e.clone(); !e.isZero(); ) {
                for (var f = 0, d = 1; 0 == (e.words[0] & d) && f < 26; ++f, d <<= 1);
                if (f > 0)
                  for (e.iushrn(f); f-- > 0; )
                    (i.isOdd() || s.isOdd()) && (i.iadd(l), s.isub(h)), i.iushrn(1), s.iushrn(1);
                for (var p = 0, y = 1; 0 == (r.words[0] & y) && p < 26; ++p, y <<= 1);
                if (p > 0)
                  for (r.iushrn(p); p-- > 0; )
                    (a.isOdd() || u.isOdd()) && (a.iadd(l), u.isub(h)), a.iushrn(1), u.iushrn(1);
                e.cmp(r) >= 0 ? (e.isub(r), i.isub(a), s.isub(u)) : (r.isub(e), a.isub(i), u.isub(s));
              }
              return { a, b: u, gcd: r.iushln(c) };
            }),
            (o.prototype._invmp = function (t) {
              n(0 === t.negative), n(!t.isZero());
              var e = this,
                r = t.clone();
              e = 0 !== e.negative ? e.umod(t) : e.clone();
              for (var i, s = new o(1), a = new o(0), u = r.clone(); e.cmpn(1) > 0 && r.cmpn(1) > 0; ) {
                for (var c = 0, l = 1; 0 == (e.words[0] & l) && c < 26; ++c, l <<= 1);
                if (c > 0) for (e.iushrn(c); c-- > 0; ) s.isOdd() && s.iadd(u), s.iushrn(1);
                for (var h = 0, f = 1; 0 == (r.words[0] & f) && h < 26; ++h, f <<= 1);
                if (h > 0) for (r.iushrn(h); h-- > 0; ) a.isOdd() && a.iadd(u), a.iushrn(1);
                e.cmp(r) >= 0 ? (e.isub(r), s.isub(a)) : (r.isub(e), a.isub(s));
              }
              return (i = 0 === e.cmpn(1) ? s : a).cmpn(0) < 0 && i.iadd(t), i;
            }),
            (o.prototype.gcd = function (t) {
              if (this.isZero()) return t.abs();
              if (t.isZero()) return this.abs();
              var e = this.clone(),
                r = t.clone();
              (e.negative = 0), (r.negative = 0);
              for (var n = 0; e.isEven() && r.isEven(); n++) e.iushrn(1), r.iushrn(1);
              for (;;) {
                for (; e.isEven(); ) e.iushrn(1);
                for (; r.isEven(); ) r.iushrn(1);
                var i = e.cmp(r);
                if (i < 0) {
                  var o = e;
                  (e = r), (r = o);
                } else if (0 === i || 0 === r.cmpn(1)) break;
                e.isub(r);
              }
              return r.iushln(n);
            }),
            (o.prototype.invm = function (t) {
              return this.egcd(t).a.umod(t);
            }),
            (o.prototype.isEven = function () {
              return 0 == (1 & this.words[0]);
            }),
            (o.prototype.isOdd = function () {
              return 1 == (1 & this.words[0]);
            }),
            (o.prototype.andln = function (t) {
              return this.words[0] & t;
            }),
            (o.prototype.bincn = function (t) {
              n('number' == typeof t);
              var e = t % 26,
                r = (t - e) / 26,
                i = 1 << e;
              if (this.length <= r) return this._expand(r + 1), (this.words[r] |= i), this;
              for (var o = i, s = r; 0 !== o && s < this.length; s++) {
                var a = 0 | this.words[s];
                (o = (a += o) >>> 26), (a &= 67108863), (this.words[s] = a);
              }
              return 0 !== o && ((this.words[s] = o), this.length++), this;
            }),
            (o.prototype.isZero = function () {
              return 1 === this.length && 0 === this.words[0];
            }),
            (o.prototype.cmpn = function (t) {
              var e,
                r = t < 0;
              if (0 !== this.negative && !r) return -1;
              if (0 === this.negative && r) return 1;
              if ((this._strip(), this.length > 1)) e = 1;
              else {
                r && (t = -t), n(t <= 67108863, 'Number is too big');
                var i = 0 | this.words[0];
                e = i === t ? 0 : i < t ? -1 : 1;
              }
              return 0 !== this.negative ? 0 | -e : e;
            }),
            (o.prototype.cmp = function (t) {
              if (0 !== this.negative && 0 === t.negative) return -1;
              if (0 === this.negative && 0 !== t.negative) return 1;
              var e = this.ucmp(t);
              return 0 !== this.negative ? 0 | -e : e;
            }),
            (o.prototype.ucmp = function (t) {
              if (this.length > t.length) return 1;
              if (this.length < t.length) return -1;
              for (var e = 0, r = this.length - 1; r >= 0; r--) {
                var n = 0 | this.words[r],
                  i = 0 | t.words[r];
                if (n !== i) {
                  n < i ? (e = -1) : n > i && (e = 1);
                  break;
                }
              }
              return e;
            }),
            (o.prototype.gtn = function (t) {
              return 1 === this.cmpn(t);
            }),
            (o.prototype.gt = function (t) {
              return 1 === this.cmp(t);
            }),
            (o.prototype.gten = function (t) {
              return this.cmpn(t) >= 0;
            }),
            (o.prototype.gte = function (t) {
              return this.cmp(t) >= 0;
            }),
            (o.prototype.ltn = function (t) {
              return -1 === this.cmpn(t);
            }),
            (o.prototype.lt = function (t) {
              return -1 === this.cmp(t);
            }),
            (o.prototype.lten = function (t) {
              return this.cmpn(t) <= 0;
            }),
            (o.prototype.lte = function (t) {
              return this.cmp(t) <= 0;
            }),
            (o.prototype.eqn = function (t) {
              return 0 === this.cmpn(t);
            }),
            (o.prototype.eq = function (t) {
              return 0 === this.cmp(t);
            }),
            (o.red = function (t) {
              return new k(t);
            }),
            (o.prototype.toRed = function (t) {
              return (
                n(!this.red, 'Already a number in reduction context'),
                n(0 === this.negative, 'red works only with positives'),
                t.convertTo(this)._forceRed(t)
              );
            }),
            (o.prototype.fromRed = function () {
              return n(this.red, 'fromRed works only with numbers in reduction context'), this.red.convertFrom(this);
            }),
            (o.prototype._forceRed = function (t) {
              return (this.red = t), this;
            }),
            (o.prototype.forceRed = function (t) {
              return n(!this.red, 'Already a number in reduction context'), this._forceRed(t);
            }),
            (o.prototype.redAdd = function (t) {
              return n(this.red, 'redAdd works only with red numbers'), this.red.add(this, t);
            }),
            (o.prototype.redIAdd = function (t) {
              return n(this.red, 'redIAdd works only with red numbers'), this.red.iadd(this, t);
            }),
            (o.prototype.redSub = function (t) {
              return n(this.red, 'redSub works only with red numbers'), this.red.sub(this, t);
            }),
            (o.prototype.redISub = function (t) {
              return n(this.red, 'redISub works only with red numbers'), this.red.isub(this, t);
            }),
            (o.prototype.redShl = function (t) {
              return n(this.red, 'redShl works only with red numbers'), this.red.shl(this, t);
            }),
            (o.prototype.redMul = function (t) {
              return (
                n(this.red, 'redMul works only with red numbers'), this.red._verify2(this, t), this.red.mul(this, t)
              );
            }),
            (o.prototype.redIMul = function (t) {
              return (
                n(this.red, 'redMul works only with red numbers'), this.red._verify2(this, t), this.red.imul(this, t)
              );
            }),
            (o.prototype.redSqr = function () {
              return n(this.red, 'redSqr works only with red numbers'), this.red._verify1(this), this.red.sqr(this);
            }),
            (o.prototype.redISqr = function () {
              return n(this.red, 'redISqr works only with red numbers'), this.red._verify1(this), this.red.isqr(this);
            }),
            (o.prototype.redSqrt = function () {
              return n(this.red, 'redSqrt works only with red numbers'), this.red._verify1(this), this.red.sqrt(this);
            }),
            (o.prototype.redInvm = function () {
              return n(this.red, 'redInvm works only with red numbers'), this.red._verify1(this), this.red.invm(this);
            }),
            (o.prototype.redNeg = function () {
              return n(this.red, 'redNeg works only with red numbers'), this.red._verify1(this), this.red.neg(this);
            }),
            (o.prototype.redPow = function (t) {
              return n(this.red && !t.red, 'redPow(normalNum)'), this.red._verify1(this), this.red.pow(this, t);
            });
          var w = { k256: null, p224: null, p192: null, p25519: null };
          function _(t, e) {
            (this.name = t),
              (this.p = new o(e, 16)),
              (this.n = this.p.bitLength()),
              (this.k = new o(1).iushln(this.n).isub(this.p)),
              (this.tmp = this._tmp());
          }
          function S() {
            _.call(this, 'k256', 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f');
          }
          function E() {
            _.call(this, 'p224', 'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001');
          }
          function x() {
            _.call(this, 'p192', 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff');
          }
          function M() {
            _.call(this, '25519', '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed');
          }
          function k(t) {
            if ('string' == typeof t) {
              var e = o._prime(t);
              (this.m = e.p), (this.prime = e);
            } else n(t.gtn(1), 'modulus must be greater than 1'), (this.m = t), (this.prime = null);
          }
          function A(t) {
            k.call(this, t),
              (this.shift = this.m.bitLength()),
              this.shift % 26 != 0 && (this.shift += 26 - (this.shift % 26)),
              (this.r = new o(1).iushln(this.shift)),
              (this.r2 = this.imod(this.r.sqr())),
              (this.rinv = this.r._invmp(this.m)),
              (this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)),
              (this.minv = this.minv.umod(this.r)),
              (this.minv = this.r.sub(this.minv));
          }
          (_.prototype._tmp = function () {
            var t = new o(null);
            return (t.words = new Array(Math.ceil(this.n / 13))), t;
          }),
            (_.prototype.ireduce = function (t) {
              var e,
                r = t;
              do {
                this.split(r, this.tmp), (e = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength());
              } while (e > this.n);
              var n = e < this.n ? -1 : r.ucmp(this.p);
              return (
                0 === n
                  ? ((r.words[0] = 0), (r.length = 1))
                  : n > 0
                    ? r.isub(this.p)
                    : void 0 !== r.strip
                      ? r.strip()
                      : r._strip(),
                r
              );
            }),
            (_.prototype.split = function (t, e) {
              t.iushrn(this.n, 0, e);
            }),
            (_.prototype.imulK = function (t) {
              return t.imul(this.k);
            }),
            i(S, _),
            (S.prototype.split = function (t, e) {
              for (var r = 4194303, n = Math.min(t.length, 9), i = 0; i < n; i++) e.words[i] = t.words[i];
              if (((e.length = n), t.length <= 9)) return (t.words[0] = 0), void (t.length = 1);
              var o = t.words[9];
              for (e.words[e.length++] = o & r, i = 10; i < t.length; i++) {
                var s = 0 | t.words[i];
                (t.words[i - 10] = ((s & r) << 4) | (o >>> 22)), (o = s);
              }
              (o >>>= 22), (t.words[i - 10] = o), 0 === o && t.length > 10 ? (t.length -= 10) : (t.length -= 9);
            }),
            (S.prototype.imulK = function (t) {
              (t.words[t.length] = 0), (t.words[t.length + 1] = 0), (t.length += 2);
              for (var e = 0, r = 0; r < t.length; r++) {
                var n = 0 | t.words[r];
                (e += 977 * n), (t.words[r] = 67108863 & e), (e = 64 * n + ((e / 67108864) | 0));
              }
              return 0 === t.words[t.length - 1] && (t.length--, 0 === t.words[t.length - 1] && t.length--), t;
            }),
            i(E, _),
            i(x, _),
            i(M, _),
            (M.prototype.imulK = function (t) {
              for (var e = 0, r = 0; r < t.length; r++) {
                var n = 19 * (0 | t.words[r]) + e,
                  i = 67108863 & n;
                (n >>>= 26), (t.words[r] = i), (e = n);
              }
              return 0 !== e && (t.words[t.length++] = e), t;
            }),
            (o._prime = function (t) {
              if (w[t]) return w[t];
              var e;
              if ('k256' === t) e = new S();
              else if ('p224' === t) e = new E();
              else if ('p192' === t) e = new x();
              else {
                if ('p25519' !== t) throw new Error('Unknown prime ' + t);
                e = new M();
              }
              return (w[t] = e), e;
            }),
            (k.prototype._verify1 = function (t) {
              n(0 === t.negative, 'red works only with positives'), n(t.red, 'red works only with red numbers');
            }),
            (k.prototype._verify2 = function (t, e) {
              n(0 == (t.negative | e.negative), 'red works only with positives'),
                n(t.red && t.red === e.red, 'red works only with red numbers');
            }),
            (k.prototype.imod = function (t) {
              return this.prime ? this.prime.ireduce(t)._forceRed(this) : (l(t, t.umod(this.m)._forceRed(this)), t);
            }),
            (k.prototype.neg = function (t) {
              return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this);
            }),
            (k.prototype.add = function (t, e) {
              this._verify2(t, e);
              var r = t.add(e);
              return r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this);
            }),
            (k.prototype.iadd = function (t, e) {
              this._verify2(t, e);
              var r = t.iadd(e);
              return r.cmp(this.m) >= 0 && r.isub(this.m), r;
            }),
            (k.prototype.sub = function (t, e) {
              this._verify2(t, e);
              var r = t.sub(e);
              return r.cmpn(0) < 0 && r.iadd(this.m), r._forceRed(this);
            }),
            (k.prototype.isub = function (t, e) {
              this._verify2(t, e);
              var r = t.isub(e);
              return r.cmpn(0) < 0 && r.iadd(this.m), r;
            }),
            (k.prototype.shl = function (t, e) {
              return this._verify1(t), this.imod(t.ushln(e));
            }),
            (k.prototype.imul = function (t, e) {
              return this._verify2(t, e), this.imod(t.imul(e));
            }),
            (k.prototype.mul = function (t, e) {
              return this._verify2(t, e), this.imod(t.mul(e));
            }),
            (k.prototype.isqr = function (t) {
              return this.imul(t, t.clone());
            }),
            (k.prototype.sqr = function (t) {
              return this.mul(t, t);
            }),
            (k.prototype.sqrt = function (t) {
              if (t.isZero()) return t.clone();
              var e = this.m.andln(3);
              if ((n(e % 2 == 1), 3 === e)) {
                var r = this.m.add(new o(1)).iushrn(2);
                return this.pow(t, r);
              }
              for (var i = this.m.subn(1), s = 0; !i.isZero() && 0 === i.andln(1); ) s++, i.iushrn(1);
              n(!i.isZero());
              var a = new o(1).toRed(this),
                u = a.redNeg(),
                c = this.m.subn(1).iushrn(1),
                l = this.m.bitLength();
              for (l = new o(2 * l * l).toRed(this); 0 !== this.pow(l, c).cmp(u); ) l.redIAdd(u);
              for (
                var h = this.pow(l, i), f = this.pow(t, i.addn(1).iushrn(1)), d = this.pow(t, i), p = s;
                0 !== d.cmp(a);

              ) {
                for (var y = d, g = 0; 0 !== y.cmp(a); g++) y = y.redSqr();
                n(g < p);
                var b = this.pow(h, new o(1).iushln(p - g - 1));
                (f = f.redMul(b)), (h = b.redSqr()), (d = d.redMul(h)), (p = g);
              }
              return f;
            }),
            (k.prototype.invm = function (t) {
              var e = t._invmp(this.m);
              return 0 !== e.negative ? ((e.negative = 0), this.imod(e).redNeg()) : this.imod(e);
            }),
            (k.prototype.pow = function (t, e) {
              if (e.isZero()) return new o(1).toRed(this);
              if (0 === e.cmpn(1)) return t.clone();
              var r = new Array(16);
              (r[0] = new o(1).toRed(this)), (r[1] = t);
              for (var n = 2; n < r.length; n++) r[n] = this.mul(r[n - 1], t);
              var i = r[0],
                s = 0,
                a = 0,
                u = e.bitLength() % 26;
              for (0 === u && (u = 26), n = e.length - 1; n >= 0; n--) {
                for (var c = e.words[n], l = u - 1; l >= 0; l--) {
                  var h = (c >> l) & 1;
                  i !== r[0] && (i = this.sqr(i)),
                    0 !== h || 0 !== s
                      ? ((s <<= 1),
                        (s |= h),
                        (4 == ++a || (0 === n && 0 === l)) && ((i = this.mul(i, r[s])), (a = 0), (s = 0)))
                      : (a = 0);
                }
                u = 26;
              }
              return i;
            }),
            (k.prototype.convertTo = function (t) {
              var e = t.umod(this.m);
              return e === t ? e.clone() : e;
            }),
            (k.prototype.convertFrom = function (t) {
              var e = t.clone();
              return (e.red = null), e;
            }),
            (o.mont = function (t) {
              return new A(t);
            }),
            i(A, k),
            (A.prototype.convertTo = function (t) {
              return this.imod(t.ushln(this.shift));
            }),
            (A.prototype.convertFrom = function (t) {
              var e = this.imod(t.mul(this.rinv));
              return (e.red = null), e;
            }),
            (A.prototype.imul = function (t, e) {
              if (t.isZero() || e.isZero()) return (t.words[0] = 0), (t.length = 1), t;
              var r = t.imul(e),
                n = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                i = r.isub(n).iushrn(this.shift),
                o = i;
              return (
                i.cmp(this.m) >= 0 ? (o = i.isub(this.m)) : i.cmpn(0) < 0 && (o = i.iadd(this.m)), o._forceRed(this)
              );
            }),
            (A.prototype.mul = function (t, e) {
              if (t.isZero() || e.isZero()) return new o(0)._forceRed(this);
              var r = t.mul(e),
                n = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                i = r.isub(n).iushrn(this.shift),
                s = i;
              return (
                i.cmp(this.m) >= 0 ? (s = i.isub(this.m)) : i.cmpn(0) < 0 && (s = i.iadd(this.m)), s._forceRed(this)
              );
            }),
            (A.prototype.invm = function (t) {
              return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this);
            });
        })((t = r.nmd(t)), this);
      },
      8764: (t, e, r) => {
        'use strict';
        const n = r(9742),
          i = r(645),
          o =
            'function' == typeof Symbol && 'function' == typeof Symbol.for
              ? Symbol.for('nodejs.util.inspect.custom')
              : null;
        (e.Buffer = u),
          (e.SlowBuffer = function (t) {
            return +t != t && (t = 0), u.alloc(+t);
          }),
          (e.INSPECT_MAX_BYTES = 50);
        const s = 2147483647;
        function a(t) {
          if (t > s) throw new RangeError('The value "' + t + '" is invalid for option "size"');
          const e = new Uint8Array(t);
          return Object.setPrototypeOf(e, u.prototype), e;
        }
        function u(t, e, r) {
          if ('number' == typeof t) {
            if ('string' == typeof e)
              throw new TypeError('The "string" argument must be of type string. Received type number');
            return h(t);
          }
          return c(t, e, r);
        }
        function c(t, e, r) {
          if ('string' == typeof t)
            return (function (t, e) {
              if ((('string' == typeof e && '' !== e) || (e = 'utf8'), !u.isEncoding(e)))
                throw new TypeError('Unknown encoding: ' + e);
              const r = 0 | y(t, e);
              let n = a(r);
              const i = n.write(t, e);
              return i !== r && (n = n.slice(0, i)), n;
            })(t, e);
          if (ArrayBuffer.isView(t))
            return (function (t) {
              if (Y(t, Uint8Array)) {
                const e = new Uint8Array(t);
                return d(e.buffer, e.byteOffset, e.byteLength);
              }
              return f(t);
            })(t);
          if (null == t)
            throw new TypeError(
              'The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' +
                typeof t,
            );
          if (Y(t, ArrayBuffer) || (t && Y(t.buffer, ArrayBuffer))) return d(t, e, r);
          if (
            'undefined' != typeof SharedArrayBuffer &&
            (Y(t, SharedArrayBuffer) || (t && Y(t.buffer, SharedArrayBuffer)))
          )
            return d(t, e, r);
          if ('number' == typeof t)
            throw new TypeError('The "value" argument must not be of type number. Received type number');
          const n = t.valueOf && t.valueOf();
          if (null != n && n !== t) return u.from(n, e, r);
          const i = (function (t) {
            if (u.isBuffer(t)) {
              const e = 0 | p(t.length),
                r = a(e);
              return 0 === r.length || t.copy(r, 0, 0, e), r;
            }
            return void 0 !== t.length
              ? 'number' != typeof t.length || J(t.length)
                ? a(0)
                : f(t)
              : 'Buffer' === t.type && Array.isArray(t.data)
                ? f(t.data)
                : void 0;
          })(t);
          if (i) return i;
          if ('undefined' != typeof Symbol && null != Symbol.toPrimitive && 'function' == typeof t[Symbol.toPrimitive])
            return u.from(t[Symbol.toPrimitive]('string'), e, r);
          throw new TypeError(
            'The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' +
              typeof t,
          );
        }
        function l(t) {
          if ('number' != typeof t) throw new TypeError('"size" argument must be of type number');
          if (t < 0) throw new RangeError('The value "' + t + '" is invalid for option "size"');
        }
        function h(t) {
          return l(t), a(t < 0 ? 0 : 0 | p(t));
        }
        function f(t) {
          const e = t.length < 0 ? 0 : 0 | p(t.length),
            r = a(e);
          for (let n = 0; n < e; n += 1) r[n] = 255 & t[n];
          return r;
        }
        function d(t, e, r) {
          if (e < 0 || t.byteLength < e) throw new RangeError('"offset" is outside of buffer bounds');
          if (t.byteLength < e + (r || 0)) throw new RangeError('"length" is outside of buffer bounds');
          let n;
          return (
            (n =
              void 0 === e && void 0 === r
                ? new Uint8Array(t)
                : void 0 === r
                  ? new Uint8Array(t, e)
                  : new Uint8Array(t, e, r)),
            Object.setPrototypeOf(n, u.prototype),
            n
          );
        }
        function p(t) {
          if (t >= s)
            throw new RangeError('Attempt to allocate Buffer larger than maximum size: 0x' + s.toString(16) + ' bytes');
          return 0 | t;
        }
        function y(t, e) {
          if (u.isBuffer(t)) return t.length;
          if (ArrayBuffer.isView(t) || Y(t, ArrayBuffer)) return t.byteLength;
          if ('string' != typeof t)
            throw new TypeError(
              'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof t,
            );
          const r = t.length,
            n = arguments.length > 2 && !0 === arguments[2];
          if (!n && 0 === r) return 0;
          let i = !1;
          for (;;)
            switch (e) {
              case 'ascii':
              case 'latin1':
              case 'binary':
                return r;
              case 'utf8':
              case 'utf-8':
                return Z(t).length;
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return 2 * r;
              case 'hex':
                return r >>> 1;
              case 'base64':
                return $(t).length;
              default:
                if (i) return n ? -1 : Z(t).length;
                (e = ('' + e).toLowerCase()), (i = !0);
            }
        }
        function g(t, e, r) {
          let n = !1;
          if (((void 0 === e || e < 0) && (e = 0), e > this.length)) return '';
          if (((void 0 === r || r > this.length) && (r = this.length), r <= 0)) return '';
          if ((r >>>= 0) <= (e >>>= 0)) return '';
          for (t || (t = 'utf8'); ; )
            switch (t) {
              case 'hex':
                return I(this, e, r);
              case 'utf8':
              case 'utf-8':
                return k(this, e, r);
              case 'ascii':
                return C(this, e, r);
              case 'latin1':
              case 'binary':
                return R(this, e, r);
              case 'base64':
                return M(this, e, r);
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return T(this, e, r);
              default:
                if (n) throw new TypeError('Unknown encoding: ' + t);
                (t = (t + '').toLowerCase()), (n = !0);
            }
        }
        function b(t, e, r) {
          const n = t[e];
          (t[e] = t[r]), (t[r] = n);
        }
        function m(t, e, r, n, i) {
          if (0 === t.length) return -1;
          if (
            ('string' == typeof r
              ? ((n = r), (r = 0))
              : r > 2147483647
                ? (r = 2147483647)
                : r < -2147483648 && (r = -2147483648),
            J((r = +r)) && (r = i ? 0 : t.length - 1),
            r < 0 && (r = t.length + r),
            r >= t.length)
          ) {
            if (i) return -1;
            r = t.length - 1;
          } else if (r < 0) {
            if (!i) return -1;
            r = 0;
          }
          if (('string' == typeof e && (e = u.from(e, n)), u.isBuffer(e)))
            return 0 === e.length ? -1 : v(t, e, r, n, i);
          if ('number' == typeof e)
            return (
              (e &= 255),
              'function' == typeof Uint8Array.prototype.indexOf
                ? i
                  ? Uint8Array.prototype.indexOf.call(t, e, r)
                  : Uint8Array.prototype.lastIndexOf.call(t, e, r)
                : v(t, [e], r, n, i)
            );
          throw new TypeError('val must be string, number or Buffer');
        }
        function v(t, e, r, n, i) {
          let o,
            s = 1,
            a = t.length,
            u = e.length;
          if (
            void 0 !== n &&
            ('ucs2' === (n = String(n).toLowerCase()) || 'ucs-2' === n || 'utf16le' === n || 'utf-16le' === n)
          ) {
            if (t.length < 2 || e.length < 2) return -1;
            (s = 2), (a /= 2), (u /= 2), (r /= 2);
          }
          function c(t, e) {
            return 1 === s ? t[e] : t.readUInt16BE(e * s);
          }
          if (i) {
            let n = -1;
            for (o = r; o < a; o++)
              if (c(t, o) === c(e, -1 === n ? 0 : o - n)) {
                if ((-1 === n && (n = o), o - n + 1 === u)) return n * s;
              } else -1 !== n && (o -= o - n), (n = -1);
          } else
            for (r + u > a && (r = a - u), o = r; o >= 0; o--) {
              let r = !0;
              for (let n = 0; n < u; n++)
                if (c(t, o + n) !== c(e, n)) {
                  r = !1;
                  break;
                }
              if (r) return o;
            }
          return -1;
        }
        function w(t, e, r, n) {
          r = Number(r) || 0;
          const i = t.length - r;
          n ? (n = Number(n)) > i && (n = i) : (n = i);
          const o = e.length;
          let s;
          for (n > o / 2 && (n = o / 2), s = 0; s < n; ++s) {
            const n = parseInt(e.substr(2 * s, 2), 16);
            if (J(n)) return s;
            t[r + s] = n;
          }
          return s;
        }
        function _(t, e, r, n) {
          return G(Z(e, t.length - r), t, r, n);
        }
        function S(t, e, r, n) {
          return G(
            (function (t) {
              const e = [];
              for (let r = 0; r < t.length; ++r) e.push(255 & t.charCodeAt(r));
              return e;
            })(e),
            t,
            r,
            n,
          );
        }
        function E(t, e, r, n) {
          return G($(e), t, r, n);
        }
        function x(t, e, r, n) {
          return G(
            (function (t, e) {
              let r, n, i;
              const o = [];
              for (let s = 0; s < t.length && !((e -= 2) < 0); ++s)
                (r = t.charCodeAt(s)), (n = r >> 8), (i = r % 256), o.push(i), o.push(n);
              return o;
            })(e, t.length - r),
            t,
            r,
            n,
          );
        }
        function M(t, e, r) {
          return 0 === e && r === t.length ? n.fromByteArray(t) : n.fromByteArray(t.slice(e, r));
        }
        function k(t, e, r) {
          r = Math.min(t.length, r);
          const n = [];
          let i = e;
          for (; i < r; ) {
            const e = t[i];
            let o = null,
              s = e > 239 ? 4 : e > 223 ? 3 : e > 191 ? 2 : 1;
            if (i + s <= r) {
              let r, n, a, u;
              switch (s) {
                case 1:
                  e < 128 && (o = e);
                  break;
                case 2:
                  (r = t[i + 1]), 128 == (192 & r) && ((u = ((31 & e) << 6) | (63 & r)), u > 127 && (o = u));
                  break;
                case 3:
                  (r = t[i + 1]),
                    (n = t[i + 2]),
                    128 == (192 & r) &&
                      128 == (192 & n) &&
                      ((u = ((15 & e) << 12) | ((63 & r) << 6) | (63 & n)),
                      u > 2047 && (u < 55296 || u > 57343) && (o = u));
                  break;
                case 4:
                  (r = t[i + 1]),
                    (n = t[i + 2]),
                    (a = t[i + 3]),
                    128 == (192 & r) &&
                      128 == (192 & n) &&
                      128 == (192 & a) &&
                      ((u = ((15 & e) << 18) | ((63 & r) << 12) | ((63 & n) << 6) | (63 & a)),
                      u > 65535 && u < 1114112 && (o = u));
              }
            }
            null === o
              ? ((o = 65533), (s = 1))
              : o > 65535 && ((o -= 65536), n.push(((o >>> 10) & 1023) | 55296), (o = 56320 | (1023 & o))),
              n.push(o),
              (i += s);
          }
          return (function (t) {
            const e = t.length;
            if (e <= A) return String.fromCharCode.apply(String, t);
            let r = '',
              n = 0;
            for (; n < e; ) r += String.fromCharCode.apply(String, t.slice(n, (n += A)));
            return r;
          })(n);
        }
        (e.kMaxLength = s),
          (u.TYPED_ARRAY_SUPPORT = (function () {
            try {
              const t = new Uint8Array(1),
                e = {
                  foo: function () {
                    return 42;
                  },
                };
              return Object.setPrototypeOf(e, Uint8Array.prototype), Object.setPrototypeOf(t, e), 42 === t.foo();
            } catch (t) {
              return !1;
            }
          })()),
          u.TYPED_ARRAY_SUPPORT ||
            'undefined' == typeof console ||
            'function' != typeof console.error ||
            console.error(
              'This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.',
            ),
          Object.defineProperty(u.prototype, 'parent', {
            enumerable: !0,
            get: function () {
              if (u.isBuffer(this)) return this.buffer;
            },
          }),
          Object.defineProperty(u.prototype, 'offset', {
            enumerable: !0,
            get: function () {
              if (u.isBuffer(this)) return this.byteOffset;
            },
          }),
          (u.poolSize = 8192),
          (u.from = function (t, e, r) {
            return c(t, e, r);
          }),
          Object.setPrototypeOf(u.prototype, Uint8Array.prototype),
          Object.setPrototypeOf(u, Uint8Array),
          (u.alloc = function (t, e, r) {
            return (function (t, e, r) {
              return (
                l(t), t <= 0 ? a(t) : void 0 !== e ? ('string' == typeof r ? a(t).fill(e, r) : a(t).fill(e)) : a(t)
              );
            })(t, e, r);
          }),
          (u.allocUnsafe = function (t) {
            return h(t);
          }),
          (u.allocUnsafeSlow = function (t) {
            return h(t);
          }),
          (u.isBuffer = function (t) {
            return null != t && !0 === t._isBuffer && t !== u.prototype;
          }),
          (u.compare = function (t, e) {
            if (
              (Y(t, Uint8Array) && (t = u.from(t, t.offset, t.byteLength)),
              Y(e, Uint8Array) && (e = u.from(e, e.offset, e.byteLength)),
              !u.isBuffer(t) || !u.isBuffer(e))
            )
              throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
            if (t === e) return 0;
            let r = t.length,
              n = e.length;
            for (let i = 0, o = Math.min(r, n); i < o; ++i)
              if (t[i] !== e[i]) {
                (r = t[i]), (n = e[i]);
                break;
              }
            return r < n ? -1 : n < r ? 1 : 0;
          }),
          (u.isEncoding = function (t) {
            switch (String(t).toLowerCase()) {
              case 'hex':
              case 'utf8':
              case 'utf-8':
              case 'ascii':
              case 'latin1':
              case 'binary':
              case 'base64':
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return !0;
              default:
                return !1;
            }
          }),
          (u.concat = function (t, e) {
            if (!Array.isArray(t)) throw new TypeError('"list" argument must be an Array of Buffers');
            if (0 === t.length) return u.alloc(0);
            let r;
            if (void 0 === e) for (e = 0, r = 0; r < t.length; ++r) e += t[r].length;
            const n = u.allocUnsafe(e);
            let i = 0;
            for (r = 0; r < t.length; ++r) {
              let e = t[r];
              if (Y(e, Uint8Array))
                i + e.length > n.length
                  ? (u.isBuffer(e) || (e = u.from(e)), e.copy(n, i))
                  : Uint8Array.prototype.set.call(n, e, i);
              else {
                if (!u.isBuffer(e)) throw new TypeError('"list" argument must be an Array of Buffers');
                e.copy(n, i);
              }
              i += e.length;
            }
            return n;
          }),
          (u.byteLength = y),
          (u.prototype._isBuffer = !0),
          (u.prototype.swap16 = function () {
            const t = this.length;
            if (t % 2 != 0) throw new RangeError('Buffer size must be a multiple of 16-bits');
            for (let e = 0; e < t; e += 2) b(this, e, e + 1);
            return this;
          }),
          (u.prototype.swap32 = function () {
            const t = this.length;
            if (t % 4 != 0) throw new RangeError('Buffer size must be a multiple of 32-bits');
            for (let e = 0; e < t; e += 4) b(this, e, e + 3), b(this, e + 1, e + 2);
            return this;
          }),
          (u.prototype.swap64 = function () {
            const t = this.length;
            if (t % 8 != 0) throw new RangeError('Buffer size must be a multiple of 64-bits');
            for (let e = 0; e < t; e += 8)
              b(this, e, e + 7), b(this, e + 1, e + 6), b(this, e + 2, e + 5), b(this, e + 3, e + 4);
            return this;
          }),
          (u.prototype.toString = function () {
            const t = this.length;
            return 0 === t ? '' : 0 === arguments.length ? k(this, 0, t) : g.apply(this, arguments);
          }),
          (u.prototype.toLocaleString = u.prototype.toString),
          (u.prototype.equals = function (t) {
            if (!u.isBuffer(t)) throw new TypeError('Argument must be a Buffer');
            return this === t || 0 === u.compare(this, t);
          }),
          (u.prototype.inspect = function () {
            let t = '';
            const r = e.INSPECT_MAX_BYTES;
            return (
              (t = this.toString('hex', 0, r)
                .replace(/(.{2})/g, '$1 ')
                .trim()),
              this.length > r && (t += ' ... '),
              '<Buffer ' + t + '>'
            );
          }),
          o && (u.prototype[o] = u.prototype.inspect),
          (u.prototype.compare = function (t, e, r, n, i) {
            if ((Y(t, Uint8Array) && (t = u.from(t, t.offset, t.byteLength)), !u.isBuffer(t)))
              throw new TypeError(
                'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof t,
              );
            if (
              (void 0 === e && (e = 0),
              void 0 === r && (r = t ? t.length : 0),
              void 0 === n && (n = 0),
              void 0 === i && (i = this.length),
              e < 0 || r > t.length || n < 0 || i > this.length)
            )
              throw new RangeError('out of range index');
            if (n >= i && e >= r) return 0;
            if (n >= i) return -1;
            if (e >= r) return 1;
            if (this === t) return 0;
            let o = (i >>>= 0) - (n >>>= 0),
              s = (r >>>= 0) - (e >>>= 0);
            const a = Math.min(o, s),
              c = this.slice(n, i),
              l = t.slice(e, r);
            for (let t = 0; t < a; ++t)
              if (c[t] !== l[t]) {
                (o = c[t]), (s = l[t]);
                break;
              }
            return o < s ? -1 : s < o ? 1 : 0;
          }),
          (u.prototype.includes = function (t, e, r) {
            return -1 !== this.indexOf(t, e, r);
          }),
          (u.prototype.indexOf = function (t, e, r) {
            return m(this, t, e, r, !0);
          }),
          (u.prototype.lastIndexOf = function (t, e, r) {
            return m(this, t, e, r, !1);
          }),
          (u.prototype.write = function (t, e, r, n) {
            if (void 0 === e) (n = 'utf8'), (r = this.length), (e = 0);
            else if (void 0 === r && 'string' == typeof e) (n = e), (r = this.length), (e = 0);
            else {
              if (!isFinite(e))
                throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
              (e >>>= 0), isFinite(r) ? ((r >>>= 0), void 0 === n && (n = 'utf8')) : ((n = r), (r = void 0));
            }
            const i = this.length - e;
            if (((void 0 === r || r > i) && (r = i), (t.length > 0 && (r < 0 || e < 0)) || e > this.length))
              throw new RangeError('Attempt to write outside buffer bounds');
            n || (n = 'utf8');
            let o = !1;
            for (;;)
              switch (n) {
                case 'hex':
                  return w(this, t, e, r);
                case 'utf8':
                case 'utf-8':
                  return _(this, t, e, r);
                case 'ascii':
                case 'latin1':
                case 'binary':
                  return S(this, t, e, r);
                case 'base64':
                  return E(this, t, e, r);
                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                  return x(this, t, e, r);
                default:
                  if (o) throw new TypeError('Unknown encoding: ' + n);
                  (n = ('' + n).toLowerCase()), (o = !0);
              }
          }),
          (u.prototype.toJSON = function () {
            return { type: 'Buffer', data: Array.prototype.slice.call(this._arr || this, 0) };
          });
        const A = 4096;
        function C(t, e, r) {
          let n = '';
          r = Math.min(t.length, r);
          for (let i = e; i < r; ++i) n += String.fromCharCode(127 & t[i]);
          return n;
        }
        function R(t, e, r) {
          let n = '';
          r = Math.min(t.length, r);
          for (let i = e; i < r; ++i) n += String.fromCharCode(t[i]);
          return n;
        }
        function I(t, e, r) {
          const n = t.length;
          (!e || e < 0) && (e = 0), (!r || r < 0 || r > n) && (r = n);
          let i = '';
          for (let n = e; n < r; ++n) i += K[t[n]];
          return i;
        }
        function T(t, e, r) {
          const n = t.slice(e, r);
          let i = '';
          for (let t = 0; t < n.length - 1; t += 2) i += String.fromCharCode(n[t] + 256 * n[t + 1]);
          return i;
        }
        function O(t, e, r) {
          if (t % 1 != 0 || t < 0) throw new RangeError('offset is not uint');
          if (t + e > r) throw new RangeError('Trying to access beyond buffer length');
        }
        function N(t, e, r, n, i, o) {
          if (!u.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
          if (e > i || e < o) throw new RangeError('"value" argument is out of bounds');
          if (r + n > t.length) throw new RangeError('Index out of range');
        }
        function j(t, e, r, n, i) {
          W(e, n, i, t, r, 7);
          let o = Number(e & BigInt(4294967295));
          (t[r++] = o), (o >>= 8), (t[r++] = o), (o >>= 8), (t[r++] = o), (o >>= 8), (t[r++] = o);
          let s = Number((e >> BigInt(32)) & BigInt(4294967295));
          return (t[r++] = s), (s >>= 8), (t[r++] = s), (s >>= 8), (t[r++] = s), (s >>= 8), (t[r++] = s), r;
        }
        function L(t, e, r, n, i) {
          W(e, n, i, t, r, 7);
          let o = Number(e & BigInt(4294967295));
          (t[r + 7] = o), (o >>= 8), (t[r + 6] = o), (o >>= 8), (t[r + 5] = o), (o >>= 8), (t[r + 4] = o);
          let s = Number((e >> BigInt(32)) & BigInt(4294967295));
          return (t[r + 3] = s), (s >>= 8), (t[r + 2] = s), (s >>= 8), (t[r + 1] = s), (s >>= 8), (t[r] = s), r + 8;
        }
        function P(t, e, r, n, i, o) {
          if (r + n > t.length) throw new RangeError('Index out of range');
          if (r < 0) throw new RangeError('Index out of range');
        }
        function D(t, e, r, n, o) {
          return (e = +e), (r >>>= 0), o || P(t, 0, r, 4), i.write(t, e, r, n, 23, 4), r + 4;
        }
        function B(t, e, r, n, o) {
          return (e = +e), (r >>>= 0), o || P(t, 0, r, 8), i.write(t, e, r, n, 52, 8), r + 8;
        }
        (u.prototype.slice = function (t, e) {
          const r = this.length;
          (t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r),
            (e = void 0 === e ? r : ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r),
            e < t && (e = t);
          const n = this.subarray(t, e);
          return Object.setPrototypeOf(n, u.prototype), n;
        }),
          (u.prototype.readUintLE = u.prototype.readUIntLE =
            function (t, e, r) {
              (t >>>= 0), (e >>>= 0), r || O(t, e, this.length);
              let n = this[t],
                i = 1,
                o = 0;
              for (; ++o < e && (i *= 256); ) n += this[t + o] * i;
              return n;
            }),
          (u.prototype.readUintBE = u.prototype.readUIntBE =
            function (t, e, r) {
              (t >>>= 0), (e >>>= 0), r || O(t, e, this.length);
              let n = this[t + --e],
                i = 1;
              for (; e > 0 && (i *= 256); ) n += this[t + --e] * i;
              return n;
            }),
          (u.prototype.readUint8 = u.prototype.readUInt8 =
            function (t, e) {
              return (t >>>= 0), e || O(t, 1, this.length), this[t];
            }),
          (u.prototype.readUint16LE = u.prototype.readUInt16LE =
            function (t, e) {
              return (t >>>= 0), e || O(t, 2, this.length), this[t] | (this[t + 1] << 8);
            }),
          (u.prototype.readUint16BE = u.prototype.readUInt16BE =
            function (t, e) {
              return (t >>>= 0), e || O(t, 2, this.length), (this[t] << 8) | this[t + 1];
            }),
          (u.prototype.readUint32LE = u.prototype.readUInt32LE =
            function (t, e) {
              return (
                (t >>>= 0),
                e || O(t, 4, this.length),
                (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) + 16777216 * this[t + 3]
              );
            }),
          (u.prototype.readUint32BE = u.prototype.readUInt32BE =
            function (t, e) {
              return (
                (t >>>= 0),
                e || O(t, 4, this.length),
                16777216 * this[t] + ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
              );
            }),
          (u.prototype.readBigUInt64LE = Q(function (t) {
            z((t >>>= 0), 'offset');
            const e = this[t],
              r = this[t + 7];
            (void 0 !== e && void 0 !== r) || V(t, this.length - 8);
            const n = e + 256 * this[++t] + 65536 * this[++t] + this[++t] * 2 ** 24,
              i = this[++t] + 256 * this[++t] + 65536 * this[++t] + r * 2 ** 24;
            return BigInt(n) + (BigInt(i) << BigInt(32));
          })),
          (u.prototype.readBigUInt64BE = Q(function (t) {
            z((t >>>= 0), 'offset');
            const e = this[t],
              r = this[t + 7];
            (void 0 !== e && void 0 !== r) || V(t, this.length - 8);
            const n = e * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + this[++t],
              i = this[++t] * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + r;
            return (BigInt(n) << BigInt(32)) + BigInt(i);
          })),
          (u.prototype.readIntLE = function (t, e, r) {
            (t >>>= 0), (e >>>= 0), r || O(t, e, this.length);
            let n = this[t],
              i = 1,
              o = 0;
            for (; ++o < e && (i *= 256); ) n += this[t + o] * i;
            return (i *= 128), n >= i && (n -= Math.pow(2, 8 * e)), n;
          }),
          (u.prototype.readIntBE = function (t, e, r) {
            (t >>>= 0), (e >>>= 0), r || O(t, e, this.length);
            let n = e,
              i = 1,
              o = this[t + --n];
            for (; n > 0 && (i *= 256); ) o += this[t + --n] * i;
            return (i *= 128), o >= i && (o -= Math.pow(2, 8 * e)), o;
          }),
          (u.prototype.readInt8 = function (t, e) {
            return (t >>>= 0), e || O(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t];
          }),
          (u.prototype.readInt16LE = function (t, e) {
            (t >>>= 0), e || O(t, 2, this.length);
            const r = this[t] | (this[t + 1] << 8);
            return 32768 & r ? 4294901760 | r : r;
          }),
          (u.prototype.readInt16BE = function (t, e) {
            (t >>>= 0), e || O(t, 2, this.length);
            const r = this[t + 1] | (this[t] << 8);
            return 32768 & r ? 4294901760 | r : r;
          }),
          (u.prototype.readInt32LE = function (t, e) {
            return (
              (t >>>= 0),
              e || O(t, 4, this.length),
              this[t] | (this[t + 1] << 8) | (this[t + 2] << 16) | (this[t + 3] << 24)
            );
          }),
          (u.prototype.readInt32BE = function (t, e) {
            return (
              (t >>>= 0),
              e || O(t, 4, this.length),
              (this[t] << 24) | (this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3]
            );
          }),
          (u.prototype.readBigInt64LE = Q(function (t) {
            z((t >>>= 0), 'offset');
            const e = this[t],
              r = this[t + 7];
            (void 0 !== e && void 0 !== r) || V(t, this.length - 8);
            const n = this[t + 4] + 256 * this[t + 5] + 65536 * this[t + 6] + (r << 24);
            return (BigInt(n) << BigInt(32)) + BigInt(e + 256 * this[++t] + 65536 * this[++t] + this[++t] * 2 ** 24);
          })),
          (u.prototype.readBigInt64BE = Q(function (t) {
            z((t >>>= 0), 'offset');
            const e = this[t],
              r = this[t + 7];
            (void 0 !== e && void 0 !== r) || V(t, this.length - 8);
            const n = (e << 24) + 65536 * this[++t] + 256 * this[++t] + this[++t];
            return (BigInt(n) << BigInt(32)) + BigInt(this[++t] * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + r);
          })),
          (u.prototype.readFloatLE = function (t, e) {
            return (t >>>= 0), e || O(t, 4, this.length), i.read(this, t, !0, 23, 4);
          }),
          (u.prototype.readFloatBE = function (t, e) {
            return (t >>>= 0), e || O(t, 4, this.length), i.read(this, t, !1, 23, 4);
          }),
          (u.prototype.readDoubleLE = function (t, e) {
            return (t >>>= 0), e || O(t, 8, this.length), i.read(this, t, !0, 52, 8);
          }),
          (u.prototype.readDoubleBE = function (t, e) {
            return (t >>>= 0), e || O(t, 8, this.length), i.read(this, t, !1, 52, 8);
          }),
          (u.prototype.writeUintLE = u.prototype.writeUIntLE =
            function (t, e, r, n) {
              (t = +t), (e >>>= 0), (r >>>= 0), n || N(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
              let i = 1,
                o = 0;
              for (this[e] = 255 & t; ++o < r && (i *= 256); ) this[e + o] = (t / i) & 255;
              return e + r;
            }),
          (u.prototype.writeUintBE = u.prototype.writeUIntBE =
            function (t, e, r, n) {
              (t = +t), (e >>>= 0), (r >>>= 0), n || N(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
              let i = r - 1,
                o = 1;
              for (this[e + i] = 255 & t; --i >= 0 && (o *= 256); ) this[e + i] = (t / o) & 255;
              return e + r;
            }),
          (u.prototype.writeUint8 = u.prototype.writeUInt8 =
            function (t, e, r) {
              return (t = +t), (e >>>= 0), r || N(this, t, e, 1, 255, 0), (this[e] = 255 & t), e + 1;
            }),
          (u.prototype.writeUint16LE = u.prototype.writeUInt16LE =
            function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || N(this, t, e, 2, 65535, 0),
                (this[e] = 255 & t),
                (this[e + 1] = t >>> 8),
                e + 2
              );
            }),
          (u.prototype.writeUint16BE = u.prototype.writeUInt16BE =
            function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || N(this, t, e, 2, 65535, 0),
                (this[e] = t >>> 8),
                (this[e + 1] = 255 & t),
                e + 2
              );
            }),
          (u.prototype.writeUint32LE = u.prototype.writeUInt32LE =
            function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || N(this, t, e, 4, 4294967295, 0),
                (this[e + 3] = t >>> 24),
                (this[e + 2] = t >>> 16),
                (this[e + 1] = t >>> 8),
                (this[e] = 255 & t),
                e + 4
              );
            }),
          (u.prototype.writeUint32BE = u.prototype.writeUInt32BE =
            function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || N(this, t, e, 4, 4294967295, 0),
                (this[e] = t >>> 24),
                (this[e + 1] = t >>> 16),
                (this[e + 2] = t >>> 8),
                (this[e + 3] = 255 & t),
                e + 4
              );
            }),
          (u.prototype.writeBigUInt64LE = Q(function (t, e = 0) {
            return j(this, t, e, BigInt(0), BigInt('0xffffffffffffffff'));
          })),
          (u.prototype.writeBigUInt64BE = Q(function (t, e = 0) {
            return L(this, t, e, BigInt(0), BigInt('0xffffffffffffffff'));
          })),
          (u.prototype.writeIntLE = function (t, e, r, n) {
            if (((t = +t), (e >>>= 0), !n)) {
              const n = Math.pow(2, 8 * r - 1);
              N(this, t, e, r, n - 1, -n);
            }
            let i = 0,
              o = 1,
              s = 0;
            for (this[e] = 255 & t; ++i < r && (o *= 256); )
              t < 0 && 0 === s && 0 !== this[e + i - 1] && (s = 1), (this[e + i] = (((t / o) >> 0) - s) & 255);
            return e + r;
          }),
          (u.prototype.writeIntBE = function (t, e, r, n) {
            if (((t = +t), (e >>>= 0), !n)) {
              const n = Math.pow(2, 8 * r - 1);
              N(this, t, e, r, n - 1, -n);
            }
            let i = r - 1,
              o = 1,
              s = 0;
            for (this[e + i] = 255 & t; --i >= 0 && (o *= 256); )
              t < 0 && 0 === s && 0 !== this[e + i + 1] && (s = 1), (this[e + i] = (((t / o) >> 0) - s) & 255);
            return e + r;
          }),
          (u.prototype.writeInt8 = function (t, e, r) {
            return (
              (t = +t),
              (e >>>= 0),
              r || N(this, t, e, 1, 127, -128),
              t < 0 && (t = 255 + t + 1),
              (this[e] = 255 & t),
              e + 1
            );
          }),
          (u.prototype.writeInt16LE = function (t, e, r) {
            return (
              (t = +t),
              (e >>>= 0),
              r || N(this, t, e, 2, 32767, -32768),
              (this[e] = 255 & t),
              (this[e + 1] = t >>> 8),
              e + 2
            );
          }),
          (u.prototype.writeInt16BE = function (t, e, r) {
            return (
              (t = +t),
              (e >>>= 0),
              r || N(this, t, e, 2, 32767, -32768),
              (this[e] = t >>> 8),
              (this[e + 1] = 255 & t),
              e + 2
            );
          }),
          (u.prototype.writeInt32LE = function (t, e, r) {
            return (
              (t = +t),
              (e >>>= 0),
              r || N(this, t, e, 4, 2147483647, -2147483648),
              (this[e] = 255 & t),
              (this[e + 1] = t >>> 8),
              (this[e + 2] = t >>> 16),
              (this[e + 3] = t >>> 24),
              e + 4
            );
          }),
          (u.prototype.writeInt32BE = function (t, e, r) {
            return (
              (t = +t),
              (e >>>= 0),
              r || N(this, t, e, 4, 2147483647, -2147483648),
              t < 0 && (t = 4294967295 + t + 1),
              (this[e] = t >>> 24),
              (this[e + 1] = t >>> 16),
              (this[e + 2] = t >>> 8),
              (this[e + 3] = 255 & t),
              e + 4
            );
          }),
          (u.prototype.writeBigInt64LE = Q(function (t, e = 0) {
            return j(this, t, e, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'));
          })),
          (u.prototype.writeBigInt64BE = Q(function (t, e = 0) {
            return L(this, t, e, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'));
          })),
          (u.prototype.writeFloatLE = function (t, e, r) {
            return D(this, t, e, !0, r);
          }),
          (u.prototype.writeFloatBE = function (t, e, r) {
            return D(this, t, e, !1, r);
          }),
          (u.prototype.writeDoubleLE = function (t, e, r) {
            return B(this, t, e, !0, r);
          }),
          (u.prototype.writeDoubleBE = function (t, e, r) {
            return B(this, t, e, !1, r);
          }),
          (u.prototype.copy = function (t, e, r, n) {
            if (!u.isBuffer(t)) throw new TypeError('argument should be a Buffer');
            if (
              (r || (r = 0),
              n || 0 === n || (n = this.length),
              e >= t.length && (e = t.length),
              e || (e = 0),
              n > 0 && n < r && (n = r),
              n === r)
            )
              return 0;
            if (0 === t.length || 0 === this.length) return 0;
            if (e < 0) throw new RangeError('targetStart out of bounds');
            if (r < 0 || r >= this.length) throw new RangeError('Index out of range');
            if (n < 0) throw new RangeError('sourceEnd out of bounds');
            n > this.length && (n = this.length), t.length - e < n - r && (n = t.length - e + r);
            const i = n - r;
            return (
              this === t && 'function' == typeof Uint8Array.prototype.copyWithin
                ? this.copyWithin(e, r, n)
                : Uint8Array.prototype.set.call(t, this.subarray(r, n), e),
              i
            );
          }),
          (u.prototype.fill = function (t, e, r, n) {
            if ('string' == typeof t) {
              if (
                ('string' == typeof e
                  ? ((n = e), (e = 0), (r = this.length))
                  : 'string' == typeof r && ((n = r), (r = this.length)),
                void 0 !== n && 'string' != typeof n)
              )
                throw new TypeError('encoding must be a string');
              if ('string' == typeof n && !u.isEncoding(n)) throw new TypeError('Unknown encoding: ' + n);
              if (1 === t.length) {
                const e = t.charCodeAt(0);
                (('utf8' === n && e < 128) || 'latin1' === n) && (t = e);
              }
            } else 'number' == typeof t ? (t &= 255) : 'boolean' == typeof t && (t = Number(t));
            if (e < 0 || this.length < e || this.length < r) throw new RangeError('Out of range index');
            if (r <= e) return this;
            let i;
            if (((e >>>= 0), (r = void 0 === r ? this.length : r >>> 0), t || (t = 0), 'number' == typeof t))
              for (i = e; i < r; ++i) this[i] = t;
            else {
              const o = u.isBuffer(t) ? t : u.from(t, n),
                s = o.length;
              if (0 === s) throw new TypeError('The value "' + t + '" is invalid for argument "value"');
              for (i = 0; i < r - e; ++i) this[i + e] = o[i % s];
            }
            return this;
          });
        const U = {};
        function F(t, e, r) {
          U[t] = class extends r {
            constructor() {
              super(),
                Object.defineProperty(this, 'message', {
                  value: e.apply(this, arguments),
                  writable: !0,
                  configurable: !0,
                }),
                (this.name = `${this.name} [${t}]`),
                this.stack,
                delete this.name;
            }
            get code() {
              return t;
            }
            set code(t) {
              Object.defineProperty(this, 'code', { configurable: !0, enumerable: !0, value: t, writable: !0 });
            }
            toString() {
              return `${this.name} [${t}]: ${this.message}`;
            }
          };
        }
        function H(t) {
          let e = '',
            r = t.length;
          const n = '-' === t[0] ? 1 : 0;
          for (; r >= n + 4; r -= 3) e = `_${t.slice(r - 3, r)}${e}`;
          return `${t.slice(0, r)}${e}`;
        }
        function W(t, e, r, n, i, o) {
          if (t > r || t < e) {
            const n = 'bigint' == typeof e ? 'n' : '';
            let i;
            throw (
              ((i =
                o > 3
                  ? 0 === e || e === BigInt(0)
                    ? `>= 0${n} and < 2${n} ** ${8 * (o + 1)}${n}`
                    : `>= -(2${n} ** ${8 * (o + 1) - 1}${n}) and < 2 ** ${8 * (o + 1) - 1}${n}`
                  : `>= ${e}${n} and <= ${r}${n}`),
              new U.ERR_OUT_OF_RANGE('value', i, t))
            );
          }
          !(function (t, e, r) {
            z(e, 'offset'), (void 0 !== t[e] && void 0 !== t[e + r]) || V(e, t.length - (r + 1));
          })(n, i, o);
        }
        function z(t, e) {
          if ('number' != typeof t) throw new U.ERR_INVALID_ARG_TYPE(e, 'number', t);
        }
        function V(t, e, r) {
          if (Math.floor(t) !== t) throw (z(t, r), new U.ERR_OUT_OF_RANGE(r || 'offset', 'an integer', t));
          if (e < 0) throw new U.ERR_BUFFER_OUT_OF_BOUNDS();
          throw new U.ERR_OUT_OF_RANGE(r || 'offset', `>= ${r ? 1 : 0} and <= ${e}`, t);
        }
        F(
          'ERR_BUFFER_OUT_OF_BOUNDS',
          function (t) {
            return t ? `${t} is outside of buffer bounds` : 'Attempt to access memory outside buffer bounds';
          },
          RangeError,
        ),
          F(
            'ERR_INVALID_ARG_TYPE',
            function (t, e) {
              return `The "${t}" argument must be of type number. Received type ${typeof e}`;
            },
            TypeError,
          ),
          F(
            'ERR_OUT_OF_RANGE',
            function (t, e, r) {
              let n = `The value of "${t}" is out of range.`,
                i = r;
              return (
                Number.isInteger(r) && Math.abs(r) > 2 ** 32
                  ? (i = H(String(r)))
                  : 'bigint' == typeof r &&
                    ((i = String(r)),
                    (r > BigInt(2) ** BigInt(32) || r < -(BigInt(2) ** BigInt(32))) && (i = H(i)),
                    (i += 'n')),
                (n += ` It must be ${e}. Received ${i}`),
                n
              );
            },
            RangeError,
          );
        const q = /[^+/0-9A-Za-z-_]/g;
        function Z(t, e) {
          let r;
          e = e || 1 / 0;
          const n = t.length;
          let i = null;
          const o = [];
          for (let s = 0; s < n; ++s) {
            if (((r = t.charCodeAt(s)), r > 55295 && r < 57344)) {
              if (!i) {
                if (r > 56319) {
                  (e -= 3) > -1 && o.push(239, 191, 189);
                  continue;
                }
                if (s + 1 === n) {
                  (e -= 3) > -1 && o.push(239, 191, 189);
                  continue;
                }
                i = r;
                continue;
              }
              if (r < 56320) {
                (e -= 3) > -1 && o.push(239, 191, 189), (i = r);
                continue;
              }
              r = 65536 + (((i - 55296) << 10) | (r - 56320));
            } else i && (e -= 3) > -1 && o.push(239, 191, 189);
            if (((i = null), r < 128)) {
              if ((e -= 1) < 0) break;
              o.push(r);
            } else if (r < 2048) {
              if ((e -= 2) < 0) break;
              o.push((r >> 6) | 192, (63 & r) | 128);
            } else if (r < 65536) {
              if ((e -= 3) < 0) break;
              o.push((r >> 12) | 224, ((r >> 6) & 63) | 128, (63 & r) | 128);
            } else {
              if (!(r < 1114112)) throw new Error('Invalid code point');
              if ((e -= 4) < 0) break;
              o.push((r >> 18) | 240, ((r >> 12) & 63) | 128, ((r >> 6) & 63) | 128, (63 & r) | 128);
            }
          }
          return o;
        }
        function $(t) {
          return n.toByteArray(
            (function (t) {
              if ((t = (t = t.split('=')[0]).trim().replace(q, '')).length < 2) return '';
              for (; t.length % 4 != 0; ) t += '=';
              return t;
            })(t),
          );
        }
        function G(t, e, r, n) {
          let i;
          for (i = 0; i < n && !(i + r >= e.length || i >= t.length); ++i) e[i + r] = t[i];
          return i;
        }
        function Y(t, e) {
          return (
            t instanceof e ||
            (null != t && null != t.constructor && null != t.constructor.name && t.constructor.name === e.name)
          );
        }
        function J(t) {
          return t != t;
        }
        const K = (function () {
          const t = '0123456789abcdef',
            e = new Array(256);
          for (let r = 0; r < 16; ++r) {
            const n = 16 * r;
            for (let i = 0; i < 16; ++i) e[n + i] = t[r] + t[i];
          }
          return e;
        })();
        function Q(t) {
          return 'undefined' == typeof BigInt ? X : t;
        }
        function X() {
          throw new Error('BigInt not supported');
        }
      },
      1924: (t, e, r) => {
        'use strict';
        var n = r(210),
          i = r(5559),
          o = i(n('String.prototype.indexOf'));
        t.exports = function (t, e) {
          var r = n(t, !!e);
          return 'function' == typeof r && o(t, '.prototype.') > -1 ? i(r) : r;
        };
      },
      5559: (t, e, r) => {
        'use strict';
        var n = r(8612),
          i = r(210),
          o = i('%Function.prototype.apply%'),
          s = i('%Function.prototype.call%'),
          a = i('%Reflect.apply%', !0) || n.call(s, o),
          u = i('%Object.getOwnPropertyDescriptor%', !0),
          c = i('%Object.defineProperty%', !0),
          l = i('%Math.max%');
        if (c)
          try {
            c({}, 'a', { value: 1 });
          } catch (t) {
            c = null;
          }
        t.exports = function (t) {
          var e = a(n, s, arguments);
          if (u && c) {
            var r = u(e, 'length');
            r.configurable && c(e, 'length', { value: 1 + l(0, t.length - (arguments.length - 1)) });
          }
          return e;
        };
        var h = function () {
          return a(n, o, arguments);
        };
        c ? c(t.exports, 'apply', { value: h }) : (t.exports.apply = h);
      },
      6010: (t, e, r) => {
        'use strict';
        function n(t) {
          var e,
            r,
            i = '';
          if ('string' == typeof t || 'number' == typeof t) i += t;
          else if ('object' == typeof t)
            if (Array.isArray(t)) for (e = 0; e < t.length; e++) t[e] && (r = n(t[e])) && (i && (i += ' '), (i += r));
            else for (e in t) t[e] && (i && (i += ' '), (i += e));
          return i;
        }
        function i() {
          for (var t, e, r = 0, i = ''; r < arguments.length; )
            (t = arguments[r++]) && (e = n(t)) && (i && (i += ' '), (i += e));
          return i;
        }
        r.r(e), r.d(e, { default: () => i });
      },
      2696: (t, e, r) => {
        r(5682), r(2352);
        const n = r(7253),
          i = (t, e) => t + e,
          o = ['sync', 'latest'];
        function s(t) {
          return Number.parseInt(t, 16);
        }
        t.exports = class extends n {
          constructor(t = {}) {
            super(),
              (this._blockResetDuration = t.blockResetDuration || 2e4),
              this._blockResetTimeout,
              (this._currentBlock = null),
              (this._isRunning = !1),
              (this._onNewListener = this._onNewListener.bind(this)),
              (this._onRemoveListener = this._onRemoveListener.bind(this)),
              (this._resetCurrentBlock = this._resetCurrentBlock.bind(this)),
              this._setupInternalEvents();
          }
          isRunning() {
            return this._isRunning;
          }
          getCurrentBlock() {
            return this._currentBlock;
          }
          async getLatestBlock() {
            return this._currentBlock ? this._currentBlock : await new Promise((t) => this.once('latest', t));
          }
          removeAllListeners(t) {
            t ? super.removeAllListeners(t) : super.removeAllListeners(),
              this._setupInternalEvents(),
              this._onRemoveListener();
          }
          _start() {}
          _end() {}
          _setupInternalEvents() {
            this.removeListener('newListener', this._onNewListener),
              this.removeListener('removeListener', this._onRemoveListener),
              this.on('newListener', this._onNewListener),
              this.on('removeListener', this._onRemoveListener);
          }
          _onNewListener(t, e) {
            o.includes(t) && this._maybeStart();
          }
          _onRemoveListener(t, e) {
            this._getBlockTrackerEventCount() > 0 || this._maybeEnd();
          }
          _maybeStart() {
            this._isRunning || ((this._isRunning = !0), this._cancelBlockResetTimeout(), this._start());
          }
          _maybeEnd() {
            this._isRunning && ((this._isRunning = !1), this._setupBlockResetTimeout(), this._end());
          }
          _getBlockTrackerEventCount() {
            return o.map((t) => this.listenerCount(t)).reduce(i);
          }
          _newPotentialLatest(t) {
            const e = this._currentBlock;
            (e && s(t) <= s(e)) || this._setCurrentBlock(t);
          }
          _setCurrentBlock(t) {
            const e = this._currentBlock;
            (this._currentBlock = t), this.emit('latest', t), this.emit('sync', { oldBlock: e, newBlock: t });
          }
          _setupBlockResetTimeout() {
            this._cancelBlockResetTimeout(),
              (this._blockResetTimeout = setTimeout(this._resetCurrentBlock, this._blockResetDuration)),
              this._blockResetTimeout.unref && this._blockResetTimeout.unref();
          }
          _cancelBlockResetTimeout() {
            clearTimeout(this._blockResetTimeout);
          }
          _resetCurrentBlock() {
            this._currentBlock = null;
          }
        };
      },
      5012: (t, e, r) => {
        const n = r(2352),
          i = r(2696);
        function o(t, e) {
          return new Promise((r) => {
            const n = setTimeout(r, t);
            n.unref && e && n.unref();
          });
        }
        t.exports = class extends i {
          constructor(t = {}) {
            if (!t.provider) throw new Error('PollingBlockTracker - no provider specified.');
            const e = t.pollingInterval || 2e4,
              r = t.retryTimeout || e / 10,
              n = void 0 === t.keepEventLoopActive || t.keepEventLoopActive,
              i = t.setSkipCacheFlag || !1;
            super(Object.assign({ blockResetDuration: e }, t)),
              (this._provider = t.provider),
              (this._pollingInterval = e),
              (this._retryTimeout = r),
              (this._keepEventLoopActive = n),
              (this._setSkipCacheFlag = i);
          }
          async checkForLatestBlock() {
            return await this._updateLatestBlock(), await this.getLatestBlock();
          }
          _start() {
            this._performSync().catch((t) => this.emit('error', t));
          }
          async _performSync() {
            for (; this._isRunning; )
              try {
                await this._updateLatestBlock(), await o(this._pollingInterval, !this._keepEventLoopActive);
              } catch (t) {
                const e = new Error(
                  `PollingBlockTracker - encountered an error while attempting to update latest block:\n${t.stack}`,
                );
                try {
                  this.emit('error', e);
                } catch (t) {
                  console.error(e);
                }
                await o(this._retryTimeout, !this._keepEventLoopActive);
              }
          }
          async _updateLatestBlock() {
            const t = await this._fetchLatestBlock();
            this._newPotentialLatest(t);
          }
          async _fetchLatestBlock() {
            const t = { jsonrpc: '2.0', id: 1, method: 'eth_blockNumber', params: [] };
            this._setSkipCacheFlag && (t.skipCache = !0);
            const e = await n((e) => this._provider.sendAsync(t, e))();
            if (e.error) throw new Error(`PollingBlockTracker - encountered error fetching block:\n${e.error}`);
            return e.result;
          }
        };
      },
      3256: (t, e, r) => {
        const n = r(6622);
        t.exports = class extends n {
          constructor() {
            super(), (this.allResults = []);
          }
          async update() {
            throw new Error('BaseFilterWithHistory - no update method specified');
          }
          addResults(t) {
            (this.allResults = this.allResults.concat(t)), super.addResults(t);
          }
          addInitialResults(t) {
            (this.allResults = this.allResults.concat(t)), super.addInitialResults(t);
          }
          getAllResults() {
            return this.allResults;
          }
        };
      },
      6622: (t, e, r) => {
        const n = r(9394).default;
        t.exports = class extends n {
          constructor() {
            super(), (this.updates = []);
          }
          async initialize() {}
          async update() {
            throw new Error('BaseFilter - no update method specified');
          }
          addResults(t) {
            (this.updates = this.updates.concat(t)), t.forEach((t) => this.emit('update', t));
          }
          addInitialResults(t) {}
          getChangesAndClear() {
            const t = this.updates;
            return (this.updates = []), t;
          }
        };
      },
      2785: (t, e, r) => {
        const n = r(6622),
          i = r(207),
          { incrementHexInt: o } = r(8112);
        t.exports = class extends n {
          constructor({ provider: t, params: e }) {
            super(), (this.type = 'block'), (this.provider = t);
          }
          async update({ oldBlock: t, newBlock: e }) {
            const r = e,
              n = o(t),
              s = (await i({ provider: this.provider, fromBlock: n, toBlock: r })).map((t) => t.hash);
            this.addResults(s);
          }
        };
      },
      207: (t) => {
        function e(t) {
          return null == t ? t : Number.parseInt(t, 16);
        }
        function r(t) {
          return null == t ? t : '0x' + t.toString(16);
        }
        t.exports = async function ({ provider: t, fromBlock: n, toBlock: i }) {
          n || (n = i);
          const o = e(n),
            s = e(i),
            a = Array(s - o + 1)
              .fill()
              .map((t, e) => o + e)
              .map(r);
          return await Promise.all(
            a.map((e) =>
              (function (t, e, r) {
                return new Promise((e, n) => {
                  t.sendAsync({ id: 1, jsonrpc: '2.0', method: 'eth_getBlockByNumber', params: r }, (t, r) => {
                    if (t) return n(t);
                    e(r.result);
                  });
                });
              })(t, 0, [e, !1]),
            ),
          );
        };
      },
      8112: (t) => {
        function e(t) {
          return t.sort((t, e) =>
            'latest' === t || 'earliest' === e ? 1 : 'latest' === e || 'earliest' === t ? -1 : r(t) - r(e),
          );
        }
        function r(t) {
          return null == t ? t : Number.parseInt(t, 16);
        }
        function n(t) {
          if (null == t) return t;
          let e = t.toString(16);
          return e.length % 2 && (e = '0' + e), '0x' + e;
        }
        function i() {
          return Math.floor(16 * Math.random()).toString(16);
        }
        t.exports = {
          minBlockRef: function (...t) {
            return e(t)[0];
          },
          maxBlockRef: function (...t) {
            const r = e(t);
            return r[r.length - 1];
          },
          sortBlockRefs: e,
          bnToHex: function (t) {
            return '0x' + t.toString(16);
          },
          blockRefIsNumber: function (t) {
            return t && !['earliest', 'latest', 'pending'].includes(t);
          },
          hexToInt: r,
          incrementHexInt: function (t) {
            return null == t ? t : n(r(t) + 1);
          },
          intToHex: n,
          unsafeRandomBytes: function (t) {
            let e = '0x';
            for (let r = 0; r < t; r++) (e += i()), (e += i());
            return e;
          },
        };
      },
      8406: (t, e, r) => {
        const n = r(8125).WU,
          { createAsyncMiddleware: i } = r(8625),
          o = r(7688),
          s = r(1663),
          a = r(2785),
          u = r(5792),
          { intToHex: c, hexToInt: l } = r(8112);
        function h(t) {
          return f(async (...e) => {
            const r = await t(...e);
            return c(r.id);
          });
        }
        function f(t) {
          return i(async (e, r) => {
            const n = await t.apply(null, e.params);
            r.result = n;
          });
        }
        function d(t, e) {
          const r = [];
          for (let e in t) r.push(t[e]);
          return r;
        }
        t.exports = function ({ blockTracker: t, provider: e }) {
          let r = 0,
            i = {};
          const p = new n(),
            y = (function ({ mutex: t }) {
              return (e) => async (r, n, i, o) => {
                (await t.acquire())(), e(r, n, i, o);
              };
            })({ mutex: p }),
            g = o({
              eth_newFilter: y(h(m)),
              eth_newBlockFilter: y(h(v)),
              eth_newPendingTransactionFilter: y(h(w)),
              eth_uninstallFilter: y(f(E)),
              eth_getFilterChanges: y(f(_)),
              eth_getFilterLogs: y(f(S)),
            }),
            b = async ({ oldBlock: t, newBlock: e }) => {
              if (0 === i.length) return;
              const r = await p.acquire();
              try {
                await Promise.all(
                  d(i).map(async (r) => {
                    try {
                      await r.update({ oldBlock: t, newBlock: e });
                    } catch (t) {
                      console.error(t);
                    }
                  }),
                );
              } catch (t) {
                console.error(t);
              }
              r();
            };
          return (
            (g.newLogFilter = m),
            (g.newBlockFilter = v),
            (g.newPendingTransactionFilter = w),
            (g.uninstallFilter = E),
            (g.getFilterChanges = _),
            (g.getFilterLogs = S),
            (g.destroy = () => {
              !(async function () {
                const t = d(i).length;
                (i = {}), M({ prevFilterCount: t, newFilterCount: 0 });
              })();
            }),
            g
          );
          async function m(t) {
            const r = new s({ provider: e, params: t });
            return await x(r), r;
          }
          async function v() {
            const t = new a({ provider: e });
            return await x(t), t;
          }
          async function w() {
            const t = new u({ provider: e });
            return await x(t), t;
          }
          async function _(t) {
            const e = l(t),
              r = i[e];
            if (!r) throw new Error(`No filter for index "${e}"`);
            return r.getChangesAndClear();
          }
          async function S(t) {
            const e = l(t),
              r = i[e];
            if (!r) throw new Error(`No filter for index "${e}"`);
            return 'log' === r.type ? (results = r.getAllResults()) : (results = []), results;
          }
          async function E(t) {
            const e = l(t),
              r = i[e],
              n = Boolean(r);
            return (
              n &&
                (await (async function (t) {
                  const e = d(i).length;
                  delete i[t];
                  M({ prevFilterCount: e, newFilterCount: d(i).length });
                })(e)),
              n
            );
          }
          async function x(e) {
            const n = d(i).length,
              o = await t.getLatestBlock();
            return (
              await e.initialize({ currentBlock: o }),
              r++,
              (i[r] = e),
              (e.id = r),
              (e.idHex = c(r)),
              M({ prevFilterCount: n, newFilterCount: d(i).length }),
              r
            );
          }
          function M({ prevFilterCount: e, newFilterCount: r }) {
            0 === e && r > 0 ? t.on('sync', b) : e > 0 && 0 === r && t.removeListener('sync', b);
          }
        };
      },
      1663: (t, e, r) => {
        const n = r(5682),
          i = r(6417),
          o = r(3256),
          { bnToHex: s, hexToInt: a, incrementHexInt: u, minBlockRef: c, blockRefIsNumber: l } = r(8112);
        t.exports = class extends o {
          constructor({ provider: t, params: e }) {
            super(),
              (this.type = 'log'),
              (this.ethQuery = new n(t)),
              (this.params = Object.assign({ fromBlock: 'latest', toBlock: 'latest', address: void 0, topics: [] }, e)),
              this.params.address &&
                (Array.isArray(this.params.address) || (this.params.address = [this.params.address]),
                (this.params.address = this.params.address.map((t) => t.toLowerCase())));
          }
          async initialize({ currentBlock: t }) {
            let e = this.params.fromBlock;
            ['latest', 'pending'].includes(e) && (e = t), 'earliest' === e && (e = '0x0'), (this.params.fromBlock = e);
            const r = c(this.params.toBlock, t),
              n = Object.assign({}, this.params, { toBlock: r }),
              i = await this._fetchLogs(n);
            this.addInitialResults(i);
          }
          async update({ oldBlock: t, newBlock: e }) {
            const r = e;
            let n;
            n = t ? u(t) : e;
            const i = Object.assign({}, this.params, { fromBlock: n, toBlock: r }),
              o = (await this._fetchLogs(i)).filter((t) => this.matchLog(t));
            this.addResults(o);
          }
          async _fetchLogs(t) {
            return await i((e) => this.ethQuery.getLogs(t, e))();
          }
          matchLog(t) {
            if (a(this.params.fromBlock) >= a(t.blockNumber)) return !1;
            if (l(this.params.toBlock) && a(this.params.toBlock) <= a(t.blockNumber)) return !1;
            const e = t.address && t.address.toLowerCase();
            return (
              !(this.params.address && e && !this.params.address.includes(e)) &&
              this.params.topics.every((e, r) => {
                let n = t.topics[r];
                if (!n) return !1;
                n = n.toLowerCase();
                let i = Array.isArray(e) ? e : [e];
                return !!i.includes(null) || ((i = i.map((t) => t.toLowerCase())), i.includes(n));
              })
            );
          }
        };
      },
      6417: (t) => {
        'use strict';
        const e = (t, e, r, n) =>
            function (...i) {
              return new (0, e.promiseModule)((o, s) => {
                e.multiArgs
                  ? i.push((...t) => {
                      e.errorFirst ? (t[0] ? s(t) : (t.shift(), o(t))) : o(t);
                    })
                  : e.errorFirst
                    ? i.push((t, e) => {
                        t ? s(t) : o(e);
                      })
                    : i.push(o);
                const a = this === r ? n : this;
                Reflect.apply(t, a, i);
              });
            },
          r = new WeakMap();
        t.exports = (t, n) => {
          n = { exclude: [/.+(?:Sync|Stream)$/], errorFirst: !0, promiseModule: Promise, ...n };
          const i = typeof t;
          if (null === t || ('object' !== i && 'function' !== i))
            throw new TypeError(
              `Expected \`input\` to be a \`Function\` or \`Object\`, got \`${null === t ? 'null' : i}\``,
            );
          const o = new WeakMap(),
            s = new Proxy(t, {
              apply(t, r, i) {
                const a = o.get(t);
                if (a) return Reflect.apply(a, r, i);
                const u = n.excludeMain ? t : e(t, n, s, t);
                return o.set(t, u), Reflect.apply(u, r, i);
              },
              get(t, i) {
                const a = t[i];
                if (
                  !((t, e) => {
                    let i = r.get(t);
                    if ((i || ((i = {}), r.set(t, i)), e in i)) return i[e];
                    const o = (t) => ('string' == typeof t || 'symbol' == typeof e ? e === t : t.test(e)),
                      s = Reflect.getOwnPropertyDescriptor(t, e),
                      a = void 0 === s || s.writable || s.configurable,
                      u = (n.include ? n.include.some(o) : !n.exclude.some(o)) && a;
                    return (i[e] = u), u;
                  })(t, i) ||
                  a === Function.prototype[i]
                )
                  return a;
                const u = o.get(a);
                if (u) return u;
                if ('function' == typeof a) {
                  const r = e(a, n, s, t);
                  return o.set(a, r), r;
                }
                return a;
              },
            });
          return s;
        };
      },
      8961: (t, e, r) => {
        const n = r(9394).default,
          i = r(7688),
          { createAsyncMiddleware: o } = r(8625),
          s = r(8406),
          { unsafeRandomBytes: a, incrementHexInt: u } = r(8112),
          c = r(207);
        function l(t) {
          return {
            hash: t.hash,
            parentHash: t.parentHash,
            sha3Uncles: t.sha3Uncles,
            miner: t.miner,
            stateRoot: t.stateRoot,
            transactionsRoot: t.transactionsRoot,
            receiptsRoot: t.receiptsRoot,
            logsBloom: t.logsBloom,
            difficulty: t.difficulty,
            number: t.number,
            gasLimit: t.gasLimit,
            gasUsed: t.gasUsed,
            nonce: t.nonce,
            mixHash: t.mixHash,
            timestamp: t.timestamp,
            extraData: t.extraData,
          };
        }
        t.exports = function ({ blockTracker: t, provider: e }) {
          const r = {},
            h = s({ blockTracker: t, provider: e });
          let f = !1;
          const d = new n(),
            p = i({
              eth_subscribe: o(async function (n, i) {
                if (f) throw new Error('SubscriptionManager - attempting to use after destroying');
                const o = n.params[0],
                  s = a(16);
                let d;
                switch (o) {
                  case 'newHeads':
                    d = (function ({ subId: r }) {
                      const n = {
                        type: o,
                        destroy: async () => {
                          t.removeListener('sync', n.update);
                        },
                        update: async ({ oldBlock: t, newBlock: n }) => {
                          const i = n,
                            o = u(t);
                          (await c({ provider: e, fromBlock: o, toBlock: i })).map(l).forEach((t) => {
                            y(r, t);
                          });
                        },
                      };
                      return t.on('sync', n.update), n;
                    })({ subId: s });
                    break;
                  case 'logs':
                    const r = n.params[1];
                    d = (function ({ subId: t, filter: e }) {
                      return (
                        e.on('update', (e) => y(t, e)),
                        { type: o, destroy: async () => await h.uninstallFilter(e.idHex) }
                      );
                    })({ subId: s, filter: await h.newLogFilter(r) });
                    break;
                  default:
                    throw new Error(`SubscriptionManager - unsupported subscription type "${o}"`);
                }
                return (r[s] = d), void (i.result = s);
              }),
              eth_unsubscribe: o(async function (t, e) {
                if (f) throw new Error('SubscriptionManager - attempting to use after destroying');
                const n = t.params[0],
                  i = r[n];
                i ? (delete r[n], await i.destroy(), (e.result = !0)) : (e.result = !1);
              }),
            });
          return (
            (p.destroy = function () {
              d.removeAllListeners();
              for (const t in r) r[t].destroy(), delete r[t];
              f = !0;
            }),
            { events: d, middleware: p }
          );
          function y(t, e) {
            d.emit('notification', {
              jsonrpc: '2.0',
              method: 'eth_subscription',
              params: { subscription: t, result: e },
            });
          }
        };
      },
      5792: (t, e, r) => {
        const n = r(6622),
          i = r(207),
          { incrementHexInt: o } = r(8112);
        t.exports = class extends n {
          constructor({ provider: t }) {
            super(), (this.type = 'tx'), (this.provider = t);
          }
          async update({ oldBlock: t }) {
            const e = t,
              r = o(t),
              n = await i({ provider: this.provider, fromBlock: r, toBlock: e }),
              s = [];
            for (const t of n) s.push(...t.transactions);
            this.addResults(s);
          }
        };
      },
      9721: (t) => {
        t.exports = function (t) {
          return (e, r, n, i) => {
            const o = t[e.method];
            return void 0 === o ? n() : 'function' == typeof o ? o(e, r, n, i) : ((r.result = o), i());
          };
        };
      },
      7688: (t, e, r) => {
        t.exports = r(9721);
      },
      5682: (t, e, r) => {
        const n = r(7529),
          i = r(3420)();
        function o(t) {
          this.currentProvider = t;
        }
        function s(t) {
          return function () {
            const e = this;
            var r = [].slice.call(arguments),
              n = r.pop();
            e.sendAsync({ method: t, params: r }, n);
          };
        }
        function a(t, e) {
          return function () {
            const r = this;
            var n = [].slice.call(arguments),
              i = n.pop();
            n.length < t && n.push('latest'), r.sendAsync({ method: e, params: n }, i);
          };
        }
        (t.exports = o),
          (o.prototype.getBalance = a(2, 'eth_getBalance')),
          (o.prototype.getCode = a(2, 'eth_getCode')),
          (o.prototype.getTransactionCount = a(2, 'eth_getTransactionCount')),
          (o.prototype.getStorageAt = a(3, 'eth_getStorageAt')),
          (o.prototype.call = a(2, 'eth_call')),
          (o.prototype.protocolVersion = s('eth_protocolVersion')),
          (o.prototype.syncing = s('eth_syncing')),
          (o.prototype.coinbase = s('eth_coinbase')),
          (o.prototype.mining = s('eth_mining')),
          (o.prototype.hashrate = s('eth_hashrate')),
          (o.prototype.gasPrice = s('eth_gasPrice')),
          (o.prototype.accounts = s('eth_accounts')),
          (o.prototype.blockNumber = s('eth_blockNumber')),
          (o.prototype.getBlockTransactionCountByHash = s('eth_getBlockTransactionCountByHash')),
          (o.prototype.getBlockTransactionCountByNumber = s('eth_getBlockTransactionCountByNumber')),
          (o.prototype.getUncleCountByBlockHash = s('eth_getUncleCountByBlockHash')),
          (o.prototype.getUncleCountByBlockNumber = s('eth_getUncleCountByBlockNumber')),
          (o.prototype.sign = s('eth_sign')),
          (o.prototype.sendTransaction = s('eth_sendTransaction')),
          (o.prototype.sendRawTransaction = s('eth_sendRawTransaction')),
          (o.prototype.estimateGas = s('eth_estimateGas')),
          (o.prototype.getBlockByHash = s('eth_getBlockByHash')),
          (o.prototype.getBlockByNumber = s('eth_getBlockByNumber')),
          (o.prototype.getTransactionByHash = s('eth_getTransactionByHash')),
          (o.prototype.getTransactionByBlockHashAndIndex = s('eth_getTransactionByBlockHashAndIndex')),
          (o.prototype.getTransactionByBlockNumberAndIndex = s('eth_getTransactionByBlockNumberAndIndex')),
          (o.prototype.getTransactionReceipt = s('eth_getTransactionReceipt')),
          (o.prototype.getUncleByBlockHashAndIndex = s('eth_getUncleByBlockHashAndIndex')),
          (o.prototype.getUncleByBlockNumberAndIndex = s('eth_getUncleByBlockNumberAndIndex')),
          (o.prototype.getCompilers = s('eth_getCompilers')),
          (o.prototype.compileLLL = s('eth_compileLLL')),
          (o.prototype.compileSolidity = s('eth_compileSolidity')),
          (o.prototype.compileSerpent = s('eth_compileSerpent')),
          (o.prototype.newFilter = s('eth_newFilter')),
          (o.prototype.newBlockFilter = s('eth_newBlockFilter')),
          (o.prototype.newPendingTransactionFilter = s('eth_newPendingTransactionFilter')),
          (o.prototype.uninstallFilter = s('eth_uninstallFilter')),
          (o.prototype.getFilterChanges = s('eth_getFilterChanges')),
          (o.prototype.getFilterLogs = s('eth_getFilterLogs')),
          (o.prototype.getLogs = s('eth_getLogs')),
          (o.prototype.getWork = s('eth_getWork')),
          (o.prototype.submitWork = s('eth_submitWork')),
          (o.prototype.submitHashrate = s('eth_submitHashrate')),
          (o.prototype.sendAsync = function (t, e) {
            var r;
            this.currentProvider.sendAsync(((r = t), n({ id: i(), jsonrpc: '2.0', params: [] }, r)), function (t, r) {
              if ((!t && r.error && (t = new Error('EthQuery - RPC Error - ' + r.error.message)), t)) return e(t);
              e(null, r.result);
            });
          });
      },
      2294: (t, e, r) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }), (e.EthereumProviderError = e.EthereumRpcError = void 0);
        const n = r(4445);
        class i extends Error {
          constructor(t, e, r) {
            if (!Number.isInteger(t)) throw new Error('"code" must be an integer.');
            if (!e || 'string' != typeof e) throw new Error('"message" must be a nonempty string.');
            super(e), (this.code = t), void 0 !== r && (this.data = r);
          }
          serialize() {
            const t = { code: this.code, message: this.message };
            return void 0 !== this.data && (t.data = this.data), this.stack && (t.stack = this.stack), t;
          }
          toString() {
            return n.default(this.serialize(), o, 2);
          }
        }
        function o(t, e) {
          if ('[Circular]' !== e) return e;
        }
        (e.EthereumRpcError = i),
          (e.EthereumProviderError = class extends i {
            constructor(t, e, r) {
              if (
                !(function (t) {
                  return Number.isInteger(t) && t >= 1e3 && t <= 4999;
                })(t)
              )
                throw new Error('"code" must be an integer such that: 1000 <= code <= 4999');
              super(t, e, r);
            }
          });
      },
      2662: (t, e) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.errorValues = e.errorCodes = void 0),
          (e.errorCodes = {
            rpc: {
              invalidInput: -32e3,
              resourceNotFound: -32001,
              resourceUnavailable: -32002,
              transactionRejected: -32003,
              methodNotSupported: -32004,
              limitExceeded: -32005,
              parse: -32700,
              invalidRequest: -32600,
              methodNotFound: -32601,
              invalidParams: -32602,
              internal: -32603,
            },
            provider: {
              userRejectedRequest: 4001,
              unauthorized: 4100,
              unsupportedMethod: 4200,
              disconnected: 4900,
              chainDisconnected: 4901,
            },
          }),
          (e.errorValues = {
            '-32700': {
              standard: 'JSON RPC 2.0',
              message:
                'Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.',
            },
            '-32600': { standard: 'JSON RPC 2.0', message: 'The JSON sent is not a valid Request object.' },
            '-32601': { standard: 'JSON RPC 2.0', message: 'The method does not exist / is not available.' },
            '-32602': { standard: 'JSON RPC 2.0', message: 'Invalid method parameter(s).' },
            '-32603': { standard: 'JSON RPC 2.0', message: 'Internal JSON-RPC error.' },
            '-32000': { standard: 'EIP-1474', message: 'Invalid input.' },
            '-32001': { standard: 'EIP-1474', message: 'Resource not found.' },
            '-32002': { standard: 'EIP-1474', message: 'Resource unavailable.' },
            '-32003': { standard: 'EIP-1474', message: 'Transaction rejected.' },
            '-32004': { standard: 'EIP-1474', message: 'Method not supported.' },
            '-32005': { standard: 'EIP-1474', message: 'Request limit exceeded.' },
            4001: { standard: 'EIP-1193', message: 'User rejected the request.' },
            4100: {
              standard: 'EIP-1193',
              message: 'The requested account and/or method has not been authorized by the user.',
            },
            4200: { standard: 'EIP-1193', message: 'The requested method is not supported by this Ethereum provider.' },
            4900: { standard: 'EIP-1193', message: 'The provider is disconnected from all chains.' },
            4901: { standard: 'EIP-1193', message: 'The provider is disconnected from the specified chain.' },
          });
      },
      8797: (t, e, r) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }), (e.ethErrors = void 0);
        const n = r(2294),
          i = r(8753),
          o = r(2662);
        function s(t, e) {
          const [r, o] = u(e);
          return new n.EthereumRpcError(t, r || i.getMessageFromCode(t), o);
        }
        function a(t, e) {
          const [r, o] = u(e);
          return new n.EthereumProviderError(t, r || i.getMessageFromCode(t), o);
        }
        function u(t) {
          if (t) {
            if ('string' == typeof t) return [t];
            if ('object' == typeof t && !Array.isArray(t)) {
              const { message: e, data: r } = t;
              if (e && 'string' != typeof e) throw new Error('Must specify string message.');
              return [e || void 0, r];
            }
          }
          return [];
        }
        e.ethErrors = {
          rpc: {
            parse: (t) => s(o.errorCodes.rpc.parse, t),
            invalidRequest: (t) => s(o.errorCodes.rpc.invalidRequest, t),
            invalidParams: (t) => s(o.errorCodes.rpc.invalidParams, t),
            methodNotFound: (t) => s(o.errorCodes.rpc.methodNotFound, t),
            internal: (t) => s(o.errorCodes.rpc.internal, t),
            server: (t) => {
              if (!t || 'object' != typeof t || Array.isArray(t))
                throw new Error('Ethereum RPC Server errors must provide single object argument.');
              const { code: e } = t;
              if (!Number.isInteger(e) || e > -32005 || e < -32099)
                throw new Error('"code" must be an integer such that: -32099 <= code <= -32005');
              return s(e, t);
            },
            invalidInput: (t) => s(o.errorCodes.rpc.invalidInput, t),
            resourceNotFound: (t) => s(o.errorCodes.rpc.resourceNotFound, t),
            resourceUnavailable: (t) => s(o.errorCodes.rpc.resourceUnavailable, t),
            transactionRejected: (t) => s(o.errorCodes.rpc.transactionRejected, t),
            methodNotSupported: (t) => s(o.errorCodes.rpc.methodNotSupported, t),
            limitExceeded: (t) => s(o.errorCodes.rpc.limitExceeded, t),
          },
          provider: {
            userRejectedRequest: (t) => a(o.errorCodes.provider.userRejectedRequest, t),
            unauthorized: (t) => a(o.errorCodes.provider.unauthorized, t),
            unsupportedMethod: (t) => a(o.errorCodes.provider.unsupportedMethod, t),
            disconnected: (t) => a(o.errorCodes.provider.disconnected, t),
            chainDisconnected: (t) => a(o.errorCodes.provider.chainDisconnected, t),
            custom: (t) => {
              if (!t || 'object' != typeof t || Array.isArray(t))
                throw new Error('Ethereum Provider custom errors must provide single object argument.');
              const { code: e, message: r, data: i } = t;
              if (!r || 'string' != typeof r) throw new Error('"message" must be a nonempty string');
              return new n.EthereumProviderError(e, r, i);
            },
          },
        };
      },
      9826: (t, e, r) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.getMessageFromCode =
            e.serializeError =
            e.EthereumProviderError =
            e.EthereumRpcError =
            e.ethErrors =
            e.errorCodes =
              void 0);
        const n = r(2294);
        Object.defineProperty(e, 'EthereumRpcError', {
          enumerable: !0,
          get: function () {
            return n.EthereumRpcError;
          },
        }),
          Object.defineProperty(e, 'EthereumProviderError', {
            enumerable: !0,
            get: function () {
              return n.EthereumProviderError;
            },
          });
        const i = r(8753);
        Object.defineProperty(e, 'serializeError', {
          enumerable: !0,
          get: function () {
            return i.serializeError;
          },
        }),
          Object.defineProperty(e, 'getMessageFromCode', {
            enumerable: !0,
            get: function () {
              return i.getMessageFromCode;
            },
          });
        const o = r(8797);
        Object.defineProperty(e, 'ethErrors', {
          enumerable: !0,
          get: function () {
            return o.ethErrors;
          },
        });
        const s = r(2662);
        Object.defineProperty(e, 'errorCodes', {
          enumerable: !0,
          get: function () {
            return s.errorCodes;
          },
        });
      },
      8753: (t, e, r) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.serializeError = e.isValidCode = e.getMessageFromCode = e.JSON_RPC_SERVER_ERROR_MESSAGE = void 0);
        const n = r(2662),
          i = r(2294),
          o = n.errorCodes.rpc.internal,
          s = { code: o, message: a(o) };
        function a(t, r = 'Unspecified error message. This is a bug, please report it.') {
          if (Number.isInteger(t)) {
            const r = t.toString();
            if (h(n.errorValues, r)) return n.errorValues[r].message;
            if (c(t)) return e.JSON_RPC_SERVER_ERROR_MESSAGE;
          }
          return r;
        }
        function u(t) {
          if (!Number.isInteger(t)) return !1;
          const e = t.toString();
          return !!n.errorValues[e] || !!c(t);
        }
        function c(t) {
          return t >= -32099 && t <= -32e3;
        }
        function l(t) {
          return t && 'object' == typeof t && !Array.isArray(t) ? Object.assign({}, t) : t;
        }
        function h(t, e) {
          return Object.prototype.hasOwnProperty.call(t, e);
        }
        (e.JSON_RPC_SERVER_ERROR_MESSAGE = 'Unspecified server error.'),
          (e.getMessageFromCode = a),
          (e.isValidCode = u),
          (e.serializeError = function (t, { fallbackError: e = s, shouldIncludeStack: r = !1 } = {}) {
            var n, o;
            if (!e || !Number.isInteger(e.code) || 'string' != typeof e.message)
              throw new Error('Must provide fallback error with integer number code and string message.');
            if (t instanceof i.EthereumRpcError) return t.serialize();
            const c = {};
            if (t && 'object' == typeof t && !Array.isArray(t) && h(t, 'code') && u(t.code)) {
              const e = t;
              (c.code = e.code),
                e.message && 'string' == typeof e.message
                  ? ((c.message = e.message), h(e, 'data') && (c.data = e.data))
                  : ((c.message = a(c.code)), (c.data = { originalError: l(t) }));
            } else {
              c.code = e.code;
              const r = null === (n = t) || void 0 === n ? void 0 : n.message;
              (c.message = r && 'string' == typeof r ? r : e.message), (c.data = { originalError: l(t) });
            }
            const f = null === (o = t) || void 0 === o ? void 0 : o.stack;
            return r && t && f && 'string' == typeof f && (c.stack = f), c;
          });
      },
      7187: (t) => {
        'use strict';
        var e,
          r = 'object' == typeof Reflect ? Reflect : null,
          n =
            r && 'function' == typeof r.apply
              ? r.apply
              : function (t, e, r) {
                  return Function.prototype.apply.call(t, e, r);
                };
        e =
          r && 'function' == typeof r.ownKeys
            ? r.ownKeys
            : Object.getOwnPropertySymbols
              ? function (t) {
                  return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
                }
              : function (t) {
                  return Object.getOwnPropertyNames(t);
                };
        var i =
          Number.isNaN ||
          function (t) {
            return t != t;
          };
        function o() {
          o.init.call(this);
        }
        (t.exports = o),
          (t.exports.once = function (t, e) {
            return new Promise(function (r, n) {
              function i(r) {
                t.removeListener(e, o), n(r);
              }
              function o() {
                'function' == typeof t.removeListener && t.removeListener('error', i), r([].slice.call(arguments));
              }
              y(t, e, o, { once: !0 }),
                'error' !== e &&
                  (function (t, e, r) {
                    'function' == typeof t.on && y(t, 'error', e, { once: !0 });
                  })(t, i);
            });
          }),
          (o.EventEmitter = o),
          (o.prototype._events = void 0),
          (o.prototype._eventsCount = 0),
          (o.prototype._maxListeners = void 0);
        var s = 10;
        function a(t) {
          if ('function' != typeof t)
            throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof t);
        }
        function u(t) {
          return void 0 === t._maxListeners ? o.defaultMaxListeners : t._maxListeners;
        }
        function c(t, e, r, n) {
          var i, o, s, c;
          if (
            (a(r),
            void 0 === (o = t._events)
              ? ((o = t._events = Object.create(null)), (t._eventsCount = 0))
              : (void 0 !== o.newListener && (t.emit('newListener', e, r.listener ? r.listener : r), (o = t._events)),
                (s = o[e])),
            void 0 === s)
          )
            (s = o[e] = r), ++t._eventsCount;
          else if (
            ('function' == typeof s ? (s = o[e] = n ? [r, s] : [s, r]) : n ? s.unshift(r) : s.push(r),
            (i = u(t)) > 0 && s.length > i && !s.warned)
          ) {
            s.warned = !0;
            var l = new Error(
              'Possible EventEmitter memory leak detected. ' +
                s.length +
                ' ' +
                String(e) +
                ' listeners added. Use emitter.setMaxListeners() to increase limit',
            );
            (l.name = 'MaxListenersExceededWarning'),
              (l.emitter = t),
              (l.type = e),
              (l.count = s.length),
              (c = l),
              console && console.warn && console.warn(c);
          }
          return t;
        }
        function l() {
          if (!this.fired)
            return (
              this.target.removeListener(this.type, this.wrapFn),
              (this.fired = !0),
              0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
            );
        }
        function h(t, e, r) {
          var n = { fired: !1, wrapFn: void 0, target: t, type: e, listener: r },
            i = l.bind(n);
          return (i.listener = r), (n.wrapFn = i), i;
        }
        function f(t, e, r) {
          var n = t._events;
          if (void 0 === n) return [];
          var i = n[e];
          return void 0 === i
            ? []
            : 'function' == typeof i
              ? r
                ? [i.listener || i]
                : [i]
              : r
                ? (function (t) {
                    for (var e = new Array(t.length), r = 0; r < e.length; ++r) e[r] = t[r].listener || t[r];
                    return e;
                  })(i)
                : p(i, i.length);
        }
        function d(t) {
          var e = this._events;
          if (void 0 !== e) {
            var r = e[t];
            if ('function' == typeof r) return 1;
            if (void 0 !== r) return r.length;
          }
          return 0;
        }
        function p(t, e) {
          for (var r = new Array(e), n = 0; n < e; ++n) r[n] = t[n];
          return r;
        }
        function y(t, e, r, n) {
          if ('function' == typeof t.on) n.once ? t.once(e, r) : t.on(e, r);
          else {
            if ('function' != typeof t.addEventListener)
              throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof t);
            t.addEventListener(e, function i(o) {
              n.once && t.removeEventListener(e, i), r(o);
            });
          }
        }
        Object.defineProperty(o, 'defaultMaxListeners', {
          enumerable: !0,
          get: function () {
            return s;
          },
          set: function (t) {
            if ('number' != typeof t || t < 0 || i(t))
              throw new RangeError(
                'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
                  t +
                  '.',
              );
            s = t;
          },
        }),
          (o.init = function () {
            (void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events) ||
              ((this._events = Object.create(null)), (this._eventsCount = 0)),
              (this._maxListeners = this._maxListeners || void 0);
          }),
          (o.prototype.setMaxListeners = function (t) {
            if ('number' != typeof t || t < 0 || i(t))
              throw new RangeError(
                'The value of "n" is out of range. It must be a non-negative number. Received ' + t + '.',
              );
            return (this._maxListeners = t), this;
          }),
          (o.prototype.getMaxListeners = function () {
            return u(this);
          }),
          (o.prototype.emit = function (t) {
            for (var e = [], r = 1; r < arguments.length; r++) e.push(arguments[r]);
            var i = 'error' === t,
              o = this._events;
            if (void 0 !== o) i = i && void 0 === o.error;
            else if (!i) return !1;
            if (i) {
              var s;
              if ((e.length > 0 && (s = e[0]), s instanceof Error)) throw s;
              var a = new Error('Unhandled error.' + (s ? ' (' + s.message + ')' : ''));
              throw ((a.context = s), a);
            }
            var u = o[t];
            if (void 0 === u) return !1;
            if ('function' == typeof u) n(u, this, e);
            else {
              var c = u.length,
                l = p(u, c);
              for (r = 0; r < c; ++r) n(l[r], this, e);
            }
            return !0;
          }),
          (o.prototype.addListener = function (t, e) {
            return c(this, t, e, !1);
          }),
          (o.prototype.on = o.prototype.addListener),
          (o.prototype.prependListener = function (t, e) {
            return c(this, t, e, !0);
          }),
          (o.prototype.once = function (t, e) {
            return a(e), this.on(t, h(this, t, e)), this;
          }),
          (o.prototype.prependOnceListener = function (t, e) {
            return a(e), this.prependListener(t, h(this, t, e)), this;
          }),
          (o.prototype.removeListener = function (t, e) {
            var r, n, i, o, s;
            if ((a(e), void 0 === (n = this._events))) return this;
            if (void 0 === (r = n[t])) return this;
            if (r === e || r.listener === e)
              0 == --this._eventsCount
                ? (this._events = Object.create(null))
                : (delete n[t], n.removeListener && this.emit('removeListener', t, r.listener || e));
            else if ('function' != typeof r) {
              for (i = -1, o = r.length - 1; o >= 0; o--)
                if (r[o] === e || r[o].listener === e) {
                  (s = r[o].listener), (i = o);
                  break;
                }
              if (i < 0) return this;
              0 === i
                ? r.shift()
                : (function (t, e) {
                    for (; e + 1 < t.length; e++) t[e] = t[e + 1];
                    t.pop();
                  })(r, i),
                1 === r.length && (n[t] = r[0]),
                void 0 !== n.removeListener && this.emit('removeListener', t, s || e);
            }
            return this;
          }),
          (o.prototype.off = o.prototype.removeListener),
          (o.prototype.removeAllListeners = function (t) {
            var e, r, n;
            if (void 0 === (r = this._events)) return this;
            if (void 0 === r.removeListener)
              return (
                0 === arguments.length
                  ? ((this._events = Object.create(null)), (this._eventsCount = 0))
                  : void 0 !== r[t] && (0 == --this._eventsCount ? (this._events = Object.create(null)) : delete r[t]),
                this
              );
            if (0 === arguments.length) {
              var i,
                o = Object.keys(r);
              for (n = 0; n < o.length; ++n) 'removeListener' !== (i = o[n]) && this.removeAllListeners(i);
              return (
                this.removeAllListeners('removeListener'),
                (this._events = Object.create(null)),
                (this._eventsCount = 0),
                this
              );
            }
            if ('function' == typeof (e = r[t])) this.removeListener(t, e);
            else if (void 0 !== e) for (n = e.length - 1; n >= 0; n--) this.removeListener(t, e[n]);
            return this;
          }),
          (o.prototype.listeners = function (t) {
            return f(this, t, !0);
          }),
          (o.prototype.rawListeners = function (t) {
            return f(this, t, !1);
          }),
          (o.listenerCount = function (t, e) {
            return 'function' == typeof t.listenerCount ? t.listenerCount(e) : d.call(t, e);
          }),
          (o.prototype.listenerCount = d),
          (o.prototype.eventNames = function () {
            return this._eventsCount > 0 ? e(this._events) : [];
          });
      },
      4445: (t) => {
        (t.exports = s), (s.default = s), (s.stable = l), (s.stableStringify = l);
        var e = '[...]',
          r = '[Circular]',
          n = [],
          i = [];
        function o() {
          return { depthLimit: Number.MAX_SAFE_INTEGER, edgesLimit: Number.MAX_SAFE_INTEGER };
        }
        function s(t, e, r, s) {
          var a;
          void 0 === s && (s = o()), u(t, '', 0, [], void 0, 0, s);
          try {
            a = 0 === i.length ? JSON.stringify(t, e, r) : JSON.stringify(t, f(e), r);
          } catch (t) {
            return JSON.stringify('[unable to serialize, circular reference is too complex to analyze]');
          } finally {
            for (; 0 !== n.length; ) {
              var c = n.pop();
              4 === c.length ? Object.defineProperty(c[0], c[1], c[3]) : (c[0][c[1]] = c[2]);
            }
          }
          return a;
        }
        function a(t, e, r, o) {
          var s = Object.getOwnPropertyDescriptor(o, r);
          void 0 !== s.get
            ? s.configurable
              ? (Object.defineProperty(o, r, { value: t }), n.push([o, r, e, s]))
              : i.push([e, r, t])
            : ((o[r] = t), n.push([o, r, e]));
        }
        function u(t, n, i, o, s, c, l) {
          var h;
          if (((c += 1), 'object' == typeof t && null !== t)) {
            for (h = 0; h < o.length; h++) if (o[h] === t) return void a(r, t, n, s);
            if (void 0 !== l.depthLimit && c > l.depthLimit) return void a(e, t, n, s);
            if (void 0 !== l.edgesLimit && i + 1 > l.edgesLimit) return void a(e, t, n, s);
            if ((o.push(t), Array.isArray(t))) for (h = 0; h < t.length; h++) u(t[h], h, h, o, t, c, l);
            else {
              var f = Object.keys(t);
              for (h = 0; h < f.length; h++) {
                var d = f[h];
                u(t[d], d, h, o, t, c, l);
              }
            }
            o.pop();
          }
        }
        function c(t, e) {
          return t < e ? -1 : t > e ? 1 : 0;
        }
        function l(t, e, r, s) {
          void 0 === s && (s = o());
          var a,
            u = h(t, '', 0, [], void 0, 0, s) || t;
          try {
            a = 0 === i.length ? JSON.stringify(u, e, r) : JSON.stringify(u, f(e), r);
          } catch (t) {
            return JSON.stringify('[unable to serialize, circular reference is too complex to analyze]');
          } finally {
            for (; 0 !== n.length; ) {
              var c = n.pop();
              4 === c.length ? Object.defineProperty(c[0], c[1], c[3]) : (c[0][c[1]] = c[2]);
            }
          }
          return a;
        }
        function h(t, i, o, s, u, l, f) {
          var d;
          if (((l += 1), 'object' == typeof t && null !== t)) {
            for (d = 0; d < s.length; d++) if (s[d] === t) return void a(r, t, i, u);
            try {
              if ('function' == typeof t.toJSON) return;
            } catch (t) {
              return;
            }
            if (void 0 !== f.depthLimit && l > f.depthLimit) return void a(e, t, i, u);
            if (void 0 !== f.edgesLimit && o + 1 > f.edgesLimit) return void a(e, t, i, u);
            if ((s.push(t), Array.isArray(t))) for (d = 0; d < t.length; d++) h(t[d], d, d, s, t, l, f);
            else {
              var p = {},
                y = Object.keys(t).sort(c);
              for (d = 0; d < y.length; d++) {
                var g = y[d];
                h(t[g], g, d, s, t, l, f), (p[g] = t[g]);
              }
              if (void 0 === u) return p;
              n.push([u, i, t]), (u[i] = p);
            }
            s.pop();
          }
        }
        function f(t) {
          return (
            (t =
              void 0 !== t
                ? t
                : function (t, e) {
                    return e;
                  }),
            function (e, r) {
              if (i.length > 0)
                for (var n = 0; n < i.length; n++) {
                  var o = i[n];
                  if (o[1] === e && o[0] === r) {
                    (r = o[2]), i.splice(n, 1);
                    break;
                  }
                }
              return t.call(this, e, r);
            }
          );
        }
      },
      4029: (t, e, r) => {
        'use strict';
        var n = r(5320),
          i = Object.prototype.toString,
          o = Object.prototype.hasOwnProperty,
          s = function (t, e, r) {
            for (var n = 0, i = t.length; n < i; n++)
              o.call(t, n) && (null == r ? e(t[n], n, t) : e.call(r, t[n], n, t));
          },
          a = function (t, e, r) {
            for (var n = 0, i = t.length; n < i; n++) null == r ? e(t.charAt(n), n, t) : e.call(r, t.charAt(n), n, t);
          },
          u = function (t, e, r) {
            for (var n in t) o.call(t, n) && (null == r ? e(t[n], n, t) : e.call(r, t[n], n, t));
          };
        t.exports = function (t, e, r) {
          if (!n(e)) throw new TypeError('iterator must be a function');
          var o;
          arguments.length >= 3 && (o = r),
            '[object Array]' === i.call(t) ? s(t, e, o) : 'string' == typeof t ? a(t, e, o) : u(t, e, o);
        };
      },
      7648: (t) => {
        'use strict';
        var e = 'Function.prototype.bind called on incompatible ',
          r = Array.prototype.slice,
          n = Object.prototype.toString,
          i = '[object Function]';
        t.exports = function (t) {
          var o = this;
          if ('function' != typeof o || n.call(o) !== i) throw new TypeError(e + o);
          for (
            var s,
              a = r.call(arguments, 1),
              u = function () {
                if (this instanceof s) {
                  var e = o.apply(this, a.concat(r.call(arguments)));
                  return Object(e) === e ? e : this;
                }
                return o.apply(t, a.concat(r.call(arguments)));
              },
              c = Math.max(0, o.length - a.length),
              l = [],
              h = 0;
            h < c;
            h++
          )
            l.push('$' + h);
          if (
            ((s = Function(
              'binder',
              'return function (' + l.join(',') + '){ return binder.apply(this,arguments); }',
            )(u)),
            o.prototype)
          ) {
            var f = function () {};
            (f.prototype = o.prototype), (s.prototype = new f()), (f.prototype = null);
          }
          return s;
        };
      },
      8612: (t, e, r) => {
        'use strict';
        var n = r(7648);
        t.exports = Function.prototype.bind || n;
      },
      210: (t, e, r) => {
        'use strict';
        var n,
          i = SyntaxError,
          o = Function,
          s = TypeError,
          a = function (t) {
            try {
              return o('"use strict"; return (' + t + ').constructor;')();
            } catch (t) {}
          },
          u = Object.getOwnPropertyDescriptor;
        if (u)
          try {
            u({}, '');
          } catch (t) {
            u = null;
          }
        var c = function () {
            throw new s();
          },
          l = u
            ? (function () {
                try {
                  return c;
                } catch (t) {
                  try {
                    return u(arguments, 'callee').get;
                  } catch (t) {
                    return c;
                  }
                }
              })()
            : c,
          h = r(1405)(),
          f =
            Object.getPrototypeOf ||
            function (t) {
              return t.__proto__;
            },
          d = {},
          p = 'undefined' == typeof Uint8Array ? n : f(Uint8Array),
          y = {
            '%AggregateError%': 'undefined' == typeof AggregateError ? n : AggregateError,
            '%Array%': Array,
            '%ArrayBuffer%': 'undefined' == typeof ArrayBuffer ? n : ArrayBuffer,
            '%ArrayIteratorPrototype%': h ? f([][Symbol.iterator]()) : n,
            '%AsyncFromSyncIteratorPrototype%': n,
            '%AsyncFunction%': d,
            '%AsyncGenerator%': d,
            '%AsyncGeneratorFunction%': d,
            '%AsyncIteratorPrototype%': d,
            '%Atomics%': 'undefined' == typeof Atomics ? n : Atomics,
            '%BigInt%': 'undefined' == typeof BigInt ? n : BigInt,
            '%Boolean%': Boolean,
            '%DataView%': 'undefined' == typeof DataView ? n : DataView,
            '%Date%': Date,
            '%decodeURI%': decodeURI,
            '%decodeURIComponent%': decodeURIComponent,
            '%encodeURI%': encodeURI,
            '%encodeURIComponent%': encodeURIComponent,
            '%Error%': Error,
            '%eval%': eval,
            '%EvalError%': EvalError,
            '%Float32Array%': 'undefined' == typeof Float32Array ? n : Float32Array,
            '%Float64Array%': 'undefined' == typeof Float64Array ? n : Float64Array,
            '%FinalizationRegistry%': 'undefined' == typeof FinalizationRegistry ? n : FinalizationRegistry,
            '%Function%': o,
            '%GeneratorFunction%': d,
            '%Int8Array%': 'undefined' == typeof Int8Array ? n : Int8Array,
            '%Int16Array%': 'undefined' == typeof Int16Array ? n : Int16Array,
            '%Int32Array%': 'undefined' == typeof Int32Array ? n : Int32Array,
            '%isFinite%': isFinite,
            '%isNaN%': isNaN,
            '%IteratorPrototype%': h ? f(f([][Symbol.iterator]())) : n,
            '%JSON%': 'object' == typeof JSON ? JSON : n,
            '%Map%': 'undefined' == typeof Map ? n : Map,
            '%MapIteratorPrototype%': 'undefined' != typeof Map && h ? f(new Map()[Symbol.iterator]()) : n,
            '%Math%': Math,
            '%Number%': Number,
            '%Object%': Object,
            '%parseFloat%': parseFloat,
            '%parseInt%': parseInt,
            '%Promise%': 'undefined' == typeof Promise ? n : Promise,
            '%Proxy%': 'undefined' == typeof Proxy ? n : Proxy,
            '%RangeError%': RangeError,
            '%ReferenceError%': ReferenceError,
            '%Reflect%': 'undefined' == typeof Reflect ? n : Reflect,
            '%RegExp%': RegExp,
            '%Set%': 'undefined' == typeof Set ? n : Set,
            '%SetIteratorPrototype%': 'undefined' != typeof Set && h ? f(new Set()[Symbol.iterator]()) : n,
            '%SharedArrayBuffer%': 'undefined' == typeof SharedArrayBuffer ? n : SharedArrayBuffer,
            '%String%': String,
            '%StringIteratorPrototype%': h ? f(''[Symbol.iterator]()) : n,
            '%Symbol%': h ? Symbol : n,
            '%SyntaxError%': i,
            '%ThrowTypeError%': l,
            '%TypedArray%': p,
            '%TypeError%': s,
            '%Uint8Array%': 'undefined' == typeof Uint8Array ? n : Uint8Array,
            '%Uint8ClampedArray%': 'undefined' == typeof Uint8ClampedArray ? n : Uint8ClampedArray,
            '%Uint16Array%': 'undefined' == typeof Uint16Array ? n : Uint16Array,
            '%Uint32Array%': 'undefined' == typeof Uint32Array ? n : Uint32Array,
            '%URIError%': URIError,
            '%WeakMap%': 'undefined' == typeof WeakMap ? n : WeakMap,
            '%WeakRef%': 'undefined' == typeof WeakRef ? n : WeakRef,
            '%WeakSet%': 'undefined' == typeof WeakSet ? n : WeakSet,
          },
          g = function t(e) {
            var r;
            if ('%AsyncFunction%' === e) r = a('async function () {}');
            else if ('%GeneratorFunction%' === e) r = a('function* () {}');
            else if ('%AsyncGeneratorFunction%' === e) r = a('async function* () {}');
            else if ('%AsyncGenerator%' === e) {
              var n = t('%AsyncGeneratorFunction%');
              n && (r = n.prototype);
            } else if ('%AsyncIteratorPrototype%' === e) {
              var i = t('%AsyncGenerator%');
              i && (r = f(i.prototype));
            }
            return (y[e] = r), r;
          },
          b = {
            '%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
            '%ArrayPrototype%': ['Array', 'prototype'],
            '%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
            '%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
            '%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
            '%ArrayProto_values%': ['Array', 'prototype', 'values'],
            '%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
            '%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
            '%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
            '%BooleanPrototype%': ['Boolean', 'prototype'],
            '%DataViewPrototype%': ['DataView', 'prototype'],
            '%DatePrototype%': ['Date', 'prototype'],
            '%ErrorPrototype%': ['Error', 'prototype'],
            '%EvalErrorPrototype%': ['EvalError', 'prototype'],
            '%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
            '%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
            '%FunctionPrototype%': ['Function', 'prototype'],
            '%Generator%': ['GeneratorFunction', 'prototype'],
            '%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
            '%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
            '%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
            '%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
            '%JSONParse%': ['JSON', 'parse'],
            '%JSONStringify%': ['JSON', 'stringify'],
            '%MapPrototype%': ['Map', 'prototype'],
            '%NumberPrototype%': ['Number', 'prototype'],
            '%ObjectPrototype%': ['Object', 'prototype'],
            '%ObjProto_toString%': ['Object', 'prototype', 'toString'],
            '%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
            '%PromisePrototype%': ['Promise', 'prototype'],
            '%PromiseProto_then%': ['Promise', 'prototype', 'then'],
            '%Promise_all%': ['Promise', 'all'],
            '%Promise_reject%': ['Promise', 'reject'],
            '%Promise_resolve%': ['Promise', 'resolve'],
            '%RangeErrorPrototype%': ['RangeError', 'prototype'],
            '%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
            '%RegExpPrototype%': ['RegExp', 'prototype'],
            '%SetPrototype%': ['Set', 'prototype'],
            '%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
            '%StringPrototype%': ['String', 'prototype'],
            '%SymbolPrototype%': ['Symbol', 'prototype'],
            '%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
            '%TypedArrayPrototype%': ['TypedArray', 'prototype'],
            '%TypeErrorPrototype%': ['TypeError', 'prototype'],
            '%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
            '%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
            '%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
            '%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
            '%URIErrorPrototype%': ['URIError', 'prototype'],
            '%WeakMapPrototype%': ['WeakMap', 'prototype'],
            '%WeakSetPrototype%': ['WeakSet', 'prototype'],
          },
          m = r(8612),
          v = r(7642),
          w = m.call(Function.call, Array.prototype.concat),
          _ = m.call(Function.apply, Array.prototype.splice),
          S = m.call(Function.call, String.prototype.replace),
          E = m.call(Function.call, String.prototype.slice),
          x = m.call(Function.call, RegExp.prototype.exec),
          M = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,
          k = /\\(\\)?/g,
          A = function (t) {
            var e = E(t, 0, 1),
              r = E(t, -1);
            if ('%' === e && '%' !== r) throw new i('invalid intrinsic syntax, expected closing `%`');
            if ('%' === r && '%' !== e) throw new i('invalid intrinsic syntax, expected opening `%`');
            var n = [];
            return (
              S(t, M, function (t, e, r, i) {
                n[n.length] = r ? S(i, k, '$1') : e || t;
              }),
              n
            );
          },
          C = function (t, e) {
            var r,
              n = t;
            if ((v(b, n) && (n = '%' + (r = b[n])[0] + '%'), v(y, n))) {
              var o = y[n];
              if ((o === d && (o = g(n)), void 0 === o && !e))
                throw new s('intrinsic ' + t + ' exists, but is not available. Please file an issue!');
              return { alias: r, name: n, value: o };
            }
            throw new i('intrinsic ' + t + ' does not exist!');
          };
        t.exports = function (t, e) {
          if ('string' != typeof t || 0 === t.length) throw new s('intrinsic name must be a non-empty string');
          if (arguments.length > 1 && 'boolean' != typeof e) throw new s('"allowMissing" argument must be a boolean');
          if (null === x(/^%?[^%]*%?$/g, t))
            throw new i('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
          var r = A(t),
            n = r.length > 0 ? r[0] : '',
            o = C('%' + n + '%', e),
            a = o.name,
            c = o.value,
            l = !1,
            h = o.alias;
          h && ((n = h[0]), _(r, w([0, 1], h)));
          for (var f = 1, d = !0; f < r.length; f += 1) {
            var p = r[f],
              g = E(p, 0, 1),
              b = E(p, -1);
            if (('"' === g || "'" === g || '`' === g || '"' === b || "'" === b || '`' === b) && g !== b)
              throw new i('property names with quotes must have matching quotes');
            if ((('constructor' !== p && d) || (l = !0), v(y, (a = '%' + (n += '.' + p) + '%')))) c = y[a];
            else if (null != c) {
              if (!(p in c)) {
                if (!e) throw new s('base intrinsic for ' + t + ' exists, but the property is not available.');
                return;
              }
              if (u && f + 1 >= r.length) {
                var m = u(c, p);
                c = (d = !!m) && 'get' in m && !('originalValue' in m.get) ? m.get : c[p];
              } else (d = v(c, p)), (c = c[p]);
              d && !l && (y[a] = c);
            }
          }
          return c;
        };
      },
      1405: (t, e, r) => {
        'use strict';
        var n = 'undefined' != typeof Symbol && Symbol,
          i = r(5419);
        t.exports = function () {
          return (
            'function' == typeof n &&
            'function' == typeof Symbol &&
            'symbol' == typeof n('foo') &&
            'symbol' == typeof Symbol('bar') &&
            i()
          );
        };
      },
      5419: (t) => {
        'use strict';
        t.exports = function () {
          if ('function' != typeof Symbol || 'function' != typeof Object.getOwnPropertySymbols) return !1;
          if ('symbol' == typeof Symbol.iterator) return !0;
          var t = {},
            e = Symbol('test'),
            r = Object(e);
          if ('string' == typeof e) return !1;
          if ('[object Symbol]' !== Object.prototype.toString.call(e)) return !1;
          if ('[object Symbol]' !== Object.prototype.toString.call(r)) return !1;
          for (e in ((t[e] = 42), t)) return !1;
          if ('function' == typeof Object.keys && 0 !== Object.keys(t).length) return !1;
          if ('function' == typeof Object.getOwnPropertyNames && 0 !== Object.getOwnPropertyNames(t).length) return !1;
          var n = Object.getOwnPropertySymbols(t);
          if (1 !== n.length || n[0] !== e) return !1;
          if (!Object.prototype.propertyIsEnumerable.call(t, e)) return !1;
          if ('function' == typeof Object.getOwnPropertyDescriptor) {
            var i = Object.getOwnPropertyDescriptor(t, e);
            if (42 !== i.value || !0 !== i.enumerable) return !1;
          }
          return !0;
        };
      },
      6410: (t, e, r) => {
        'use strict';
        var n = r(5419);
        t.exports = function () {
          return n() && !!Symbol.toStringTag;
        };
      },
      7642: (t, e, r) => {
        'use strict';
        var n = r(8612);
        t.exports = n.call(Function.call, Object.prototype.hasOwnProperty);
      },
      645: (t, e) => {
        (e.read = function (t, e, r, n, i) {
          var o,
            s,
            a = 8 * i - n - 1,
            u = (1 << a) - 1,
            c = u >> 1,
            l = -7,
            h = r ? i - 1 : 0,
            f = r ? -1 : 1,
            d = t[e + h];
          for (h += f, o = d & ((1 << -l) - 1), d >>= -l, l += a; l > 0; o = 256 * o + t[e + h], h += f, l -= 8);
          for (s = o & ((1 << -l) - 1), o >>= -l, l += n; l > 0; s = 256 * s + t[e + h], h += f, l -= 8);
          if (0 === o) o = 1 - c;
          else {
            if (o === u) return s ? NaN : (1 / 0) * (d ? -1 : 1);
            (s += Math.pow(2, n)), (o -= c);
          }
          return (d ? -1 : 1) * s * Math.pow(2, o - n);
        }),
          (e.write = function (t, e, r, n, i, o) {
            var s,
              a,
              u,
              c = 8 * o - i - 1,
              l = (1 << c) - 1,
              h = l >> 1,
              f = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
              d = n ? 0 : o - 1,
              p = n ? 1 : -1,
              y = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0;
            for (
              e = Math.abs(e),
                isNaN(e) || e === 1 / 0
                  ? ((a = isNaN(e) ? 1 : 0), (s = l))
                  : ((s = Math.floor(Math.log(e) / Math.LN2)),
                    e * (u = Math.pow(2, -s)) < 1 && (s--, (u *= 2)),
                    (e += s + h >= 1 ? f / u : f * Math.pow(2, 1 - h)) * u >= 2 && (s++, (u /= 2)),
                    s + h >= l
                      ? ((a = 0), (s = l))
                      : s + h >= 1
                        ? ((a = (e * u - 1) * Math.pow(2, i)), (s += h))
                        : ((a = e * Math.pow(2, h - 1) * Math.pow(2, i)), (s = 0)));
              i >= 8;
              t[r + d] = 255 & a, d += p, a /= 256, i -= 8
            );
            for (s = (s << i) | a, c += i; c > 0; t[r + d] = 255 & s, d += p, s /= 256, c -= 8);
            t[r + d - p] |= 128 * y;
          });
      },
      5717: (t) => {
        'function' == typeof Object.create
          ? (t.exports = function (t, e) {
              e &&
                ((t.super_ = e),
                (t.prototype = Object.create(e.prototype, {
                  constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 },
                })));
            })
          : (t.exports = function (t, e) {
              if (e) {
                t.super_ = e;
                var r = function () {};
                (r.prototype = e.prototype), (t.prototype = new r()), (t.prototype.constructor = t);
              }
            });
      },
      2584: (t, e, r) => {
        'use strict';
        var n = r(6410)(),
          i = r(1924)('Object.prototype.toString'),
          o = function (t) {
            return !(n && t && 'object' == typeof t && Symbol.toStringTag in t) && '[object Arguments]' === i(t);
          },
          s = function (t) {
            return (
              !!o(t) ||
              (null !== t &&
                'object' == typeof t &&
                'number' == typeof t.length &&
                t.length >= 0 &&
                '[object Array]' !== i(t) &&
                '[object Function]' === i(t.callee))
            );
          },
          a = (function () {
            return o(arguments);
          })();
        (o.isLegacyArguments = s), (t.exports = a ? o : s);
      },
      5320: (t) => {
        'use strict';
        var e,
          r,
          n = Function.prototype.toString,
          i = 'object' == typeof Reflect && null !== Reflect && Reflect.apply;
        if ('function' == typeof i && 'function' == typeof Object.defineProperty)
          try {
            (e = Object.defineProperty({}, 'length', {
              get: function () {
                throw r;
              },
            })),
              (r = {}),
              i(
                function () {
                  throw 42;
                },
                null,
                e,
              );
          } catch (t) {
            t !== r && (i = null);
          }
        else i = null;
        var o = /^\s*class\b/,
          s = function (t) {
            try {
              var e = n.call(t);
              return o.test(e);
            } catch (t) {
              return !1;
            }
          },
          a = Object.prototype.toString,
          u = 'function' == typeof Symbol && !!Symbol.toStringTag,
          c = 'object' == typeof document && void 0 === document.all && void 0 !== document.all ? document.all : {};
        t.exports = i
          ? function (t) {
              if (t === c) return !0;
              if (!t) return !1;
              if ('function' != typeof t && 'object' != typeof t) return !1;
              if ('function' == typeof t && !t.prototype) return !0;
              try {
                i(t, null, e);
              } catch (t) {
                if (t !== r) return !1;
              }
              return !s(t);
            }
          : function (t) {
              if (t === c) return !0;
              if (!t) return !1;
              if ('function' != typeof t && 'object' != typeof t) return !1;
              if ('function' == typeof t && !t.prototype) return !0;
              if (u)
                return (function (t) {
                  try {
                    return !s(t) && (n.call(t), !0);
                  } catch (t) {
                    return !1;
                  }
                })(t);
              if (s(t)) return !1;
              var e = a.call(t);
              return '[object Function]' === e || '[object GeneratorFunction]' === e;
            };
      },
      8662: (t, e, r) => {
        'use strict';
        var n,
          i = Object.prototype.toString,
          o = Function.prototype.toString,
          s = /^\s*(?:function)?\*/,
          a = r(6410)(),
          u = Object.getPrototypeOf;
        t.exports = function (t) {
          if ('function' != typeof t) return !1;
          if (s.test(o.call(t))) return !0;
          if (!a) return '[object GeneratorFunction]' === i.call(t);
          if (!u) return !1;
          if (void 0 === n) {
            var e = (function () {
              if (!a) return !1;
              try {
                return Function('return function*() {}')();
              } catch (t) {}
            })();
            n = !!e && u(e);
          }
          return u(t) === n;
        };
      },
      5692: (t, e, r) => {
        'use strict';
        var n = r(4029),
          i = r(3083),
          o = r(1924),
          s = o('Object.prototype.toString'),
          a = r(6410)(),
          u = 'undefined' == typeof globalThis ? r.g : globalThis,
          c = i(),
          l =
            o('Array.prototype.indexOf', !0) ||
            function (t, e) {
              for (var r = 0; r < t.length; r += 1) if (t[r] === e) return r;
              return -1;
            },
          h = o('String.prototype.slice'),
          f = {},
          d = r(882),
          p = Object.getPrototypeOf;
        a &&
          d &&
          p &&
          n(c, function (t) {
            var e = new u[t]();
            if (Symbol.toStringTag in e) {
              var r = p(e),
                n = d(r, Symbol.toStringTag);
              if (!n) {
                var i = p(r);
                n = d(i, Symbol.toStringTag);
              }
              f[t] = n.get;
            }
          }),
          (t.exports = function (t) {
            if (!t || 'object' != typeof t) return !1;
            if (!a || !(Symbol.toStringTag in t)) {
              var e = h(s(t), 8, -1);
              return l(c, e) > -1;
            }
            return (
              !!d &&
              (function (t) {
                var e = !1;
                return (
                  n(f, function (r, n) {
                    if (!e)
                      try {
                        e = r.call(t) === n;
                      } catch (t) {}
                  }),
                  e
                );
              })(t)
            );
          });
      },
      2023: (module, exports, __webpack_require__) => {
        var __WEBPACK_AMD_DEFINE_RESULT__;
        (function () {
          'use strict';
          var ERROR = 'input is invalid type',
            WINDOW = 'object' == typeof window,
            root = WINDOW ? window : {};
          root.JS_SHA256_NO_WINDOW && (WINDOW = !1);
          var WEB_WORKER = !WINDOW && 'object' == typeof self,
            NODE_JS =
              !root.JS_SHA256_NO_NODE_JS && 'object' == typeof process && process.versions && process.versions.node;
          NODE_JS ? (root = __webpack_require__.g) : WEB_WORKER && (root = self);
          var COMMON_JS = !root.JS_SHA256_NO_COMMON_JS && module.exports,
            AMD = __webpack_require__.amdO,
            ARRAY_BUFFER = !root.JS_SHA256_NO_ARRAY_BUFFER && 'undefined' != typeof ArrayBuffer,
            HEX_CHARS = '0123456789abcdef'.split(''),
            EXTRA = [-2147483648, 8388608, 32768, 128],
            SHIFT = [24, 16, 8, 0],
            K = [
              1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080,
              310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774,
              264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808,
              3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
              1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771,
              3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571,
              1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474,
              2756734187, 3204031479, 3329325298,
            ],
            OUTPUT_TYPES = ['hex', 'array', 'digest', 'arrayBuffer'],
            blocks = [];
          (!root.JS_SHA256_NO_NODE_JS && Array.isArray) ||
            (Array.isArray = function (t) {
              return '[object Array]' === Object.prototype.toString.call(t);
            }),
            !ARRAY_BUFFER ||
              (!root.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW && ArrayBuffer.isView) ||
              (ArrayBuffer.isView = function (t) {
                return 'object' == typeof t && t.buffer && t.buffer.constructor === ArrayBuffer;
              });
          var createOutputMethod = function (t, e) {
              return function (r) {
                return new Sha256(e, !0).update(r)[t]();
              };
            },
            createMethod = function (t) {
              var e = createOutputMethod('hex', t);
              NODE_JS && (e = nodeWrap(e, t)),
                (e.create = function () {
                  return new Sha256(t);
                }),
                (e.update = function (t) {
                  return e.create().update(t);
                });
              for (var r = 0; r < OUTPUT_TYPES.length; ++r) {
                var n = OUTPUT_TYPES[r];
                e[n] = createOutputMethod(n, t);
              }
              return e;
            },
            nodeWrap = function (method, is224) {
              var crypto = eval("require('crypto')"),
                Buffer = eval("require('buffer').Buffer"),
                algorithm = is224 ? 'sha224' : 'sha256',
                nodeMethod = function (t) {
                  if ('string' == typeof t) return crypto.createHash(algorithm).update(t, 'utf8').digest('hex');
                  if (null == t) throw new Error(ERROR);
                  return (
                    t.constructor === ArrayBuffer && (t = new Uint8Array(t)),
                    Array.isArray(t) || ArrayBuffer.isView(t) || t.constructor === Buffer
                      ? crypto.createHash(algorithm).update(new Buffer(t)).digest('hex')
                      : method(t)
                  );
                };
              return nodeMethod;
            },
            createHmacOutputMethod = function (t, e) {
              return function (r, n) {
                return new HmacSha256(r, e, !0).update(n)[t]();
              };
            },
            createHmacMethod = function (t) {
              var e = createHmacOutputMethod('hex', t);
              (e.create = function (e) {
                return new HmacSha256(e, t);
              }),
                (e.update = function (t, r) {
                  return e.create(t).update(r);
                });
              for (var r = 0; r < OUTPUT_TYPES.length; ++r) {
                var n = OUTPUT_TYPES[r];
                e[n] = createHmacOutputMethod(n, t);
              }
              return e;
            };
          function Sha256(t, e) {
            e
              ? ((blocks[0] =
                  blocks[16] =
                  blocks[1] =
                  blocks[2] =
                  blocks[3] =
                  blocks[4] =
                  blocks[5] =
                  blocks[6] =
                  blocks[7] =
                  blocks[8] =
                  blocks[9] =
                  blocks[10] =
                  blocks[11] =
                  blocks[12] =
                  blocks[13] =
                  blocks[14] =
                  blocks[15] =
                    0),
                (this.blocks = blocks))
              : (this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
              t
                ? ((this.h0 = 3238371032),
                  (this.h1 = 914150663),
                  (this.h2 = 812702999),
                  (this.h3 = 4144912697),
                  (this.h4 = 4290775857),
                  (this.h5 = 1750603025),
                  (this.h6 = 1694076839),
                  (this.h7 = 3204075428))
                : ((this.h0 = 1779033703),
                  (this.h1 = 3144134277),
                  (this.h2 = 1013904242),
                  (this.h3 = 2773480762),
                  (this.h4 = 1359893119),
                  (this.h5 = 2600822924),
                  (this.h6 = 528734635),
                  (this.h7 = 1541459225)),
              (this.block = this.start = this.bytes = this.hBytes = 0),
              (this.finalized = this.hashed = !1),
              (this.first = !0),
              (this.is224 = t);
          }
          function HmacSha256(t, e, r) {
            var n,
              i = typeof t;
            if ('string' === i) {
              var o,
                s = [],
                a = t.length,
                u = 0;
              for (n = 0; n < a; ++n)
                (o = t.charCodeAt(n)) < 128
                  ? (s[u++] = o)
                  : o < 2048
                    ? ((s[u++] = 192 | (o >> 6)), (s[u++] = 128 | (63 & o)))
                    : o < 55296 || o >= 57344
                      ? ((s[u++] = 224 | (o >> 12)), (s[u++] = 128 | ((o >> 6) & 63)), (s[u++] = 128 | (63 & o)))
                      : ((o = 65536 + (((1023 & o) << 10) | (1023 & t.charCodeAt(++n)))),
                        (s[u++] = 240 | (o >> 18)),
                        (s[u++] = 128 | ((o >> 12) & 63)),
                        (s[u++] = 128 | ((o >> 6) & 63)),
                        (s[u++] = 128 | (63 & o)));
              t = s;
            } else {
              if ('object' !== i) throw new Error(ERROR);
              if (null === t) throw new Error(ERROR);
              if (ARRAY_BUFFER && t.constructor === ArrayBuffer) t = new Uint8Array(t);
              else if (!(Array.isArray(t) || (ARRAY_BUFFER && ArrayBuffer.isView(t)))) throw new Error(ERROR);
            }
            t.length > 64 && (t = new Sha256(e, !0).update(t).array());
            var c = [],
              l = [];
            for (n = 0; n < 64; ++n) {
              var h = t[n] || 0;
              (c[n] = 92 ^ h), (l[n] = 54 ^ h);
            }
            Sha256.call(this, e, r), this.update(l), (this.oKeyPad = c), (this.inner = !0), (this.sharedMemory = r);
          }
          (Sha256.prototype.update = function (t) {
            if (!this.finalized) {
              var e,
                r = typeof t;
              if ('string' !== r) {
                if ('object' !== r) throw new Error(ERROR);
                if (null === t) throw new Error(ERROR);
                if (ARRAY_BUFFER && t.constructor === ArrayBuffer) t = new Uint8Array(t);
                else if (!(Array.isArray(t) || (ARRAY_BUFFER && ArrayBuffer.isView(t)))) throw new Error(ERROR);
                e = !0;
              }
              for (var n, i, o = 0, s = t.length, a = this.blocks; o < s; ) {
                if (
                  (this.hashed &&
                    ((this.hashed = !1),
                    (a[0] = this.block),
                    (a[16] =
                      a[1] =
                      a[2] =
                      a[3] =
                      a[4] =
                      a[5] =
                      a[6] =
                      a[7] =
                      a[8] =
                      a[9] =
                      a[10] =
                      a[11] =
                      a[12] =
                      a[13] =
                      a[14] =
                      a[15] =
                        0)),
                  e)
                )
                  for (i = this.start; o < s && i < 64; ++o) a[i >> 2] |= t[o] << SHIFT[3 & i++];
                else
                  for (i = this.start; o < s && i < 64; ++o)
                    (n = t.charCodeAt(o)) < 128
                      ? (a[i >> 2] |= n << SHIFT[3 & i++])
                      : n < 2048
                        ? ((a[i >> 2] |= (192 | (n >> 6)) << SHIFT[3 & i++]),
                          (a[i >> 2] |= (128 | (63 & n)) << SHIFT[3 & i++]))
                        : n < 55296 || n >= 57344
                          ? ((a[i >> 2] |= (224 | (n >> 12)) << SHIFT[3 & i++]),
                            (a[i >> 2] |= (128 | ((n >> 6) & 63)) << SHIFT[3 & i++]),
                            (a[i >> 2] |= (128 | (63 & n)) << SHIFT[3 & i++]))
                          : ((n = 65536 + (((1023 & n) << 10) | (1023 & t.charCodeAt(++o)))),
                            (a[i >> 2] |= (240 | (n >> 18)) << SHIFT[3 & i++]),
                            (a[i >> 2] |= (128 | ((n >> 12) & 63)) << SHIFT[3 & i++]),
                            (a[i >> 2] |= (128 | ((n >> 6) & 63)) << SHIFT[3 & i++]),
                            (a[i >> 2] |= (128 | (63 & n)) << SHIFT[3 & i++]));
                (this.lastByteIndex = i),
                  (this.bytes += i - this.start),
                  i >= 64
                    ? ((this.block = a[16]), (this.start = i - 64), this.hash(), (this.hashed = !0))
                    : (this.start = i);
              }
              return (
                this.bytes > 4294967295 &&
                  ((this.hBytes += (this.bytes / 4294967296) << 0), (this.bytes = this.bytes % 4294967296)),
                this
              );
            }
          }),
            (Sha256.prototype.finalize = function () {
              if (!this.finalized) {
                this.finalized = !0;
                var t = this.blocks,
                  e = this.lastByteIndex;
                (t[16] = this.block),
                  (t[e >> 2] |= EXTRA[3 & e]),
                  (this.block = t[16]),
                  e >= 56 &&
                    (this.hashed || this.hash(),
                    (t[0] = this.block),
                    (t[16] =
                      t[1] =
                      t[2] =
                      t[3] =
                      t[4] =
                      t[5] =
                      t[6] =
                      t[7] =
                      t[8] =
                      t[9] =
                      t[10] =
                      t[11] =
                      t[12] =
                      t[13] =
                      t[14] =
                      t[15] =
                        0)),
                  (t[14] = (this.hBytes << 3) | (this.bytes >>> 29)),
                  (t[15] = this.bytes << 3),
                  this.hash();
              }
            }),
            (Sha256.prototype.hash = function () {
              var t,
                e,
                r,
                n,
                i,
                o,
                s,
                a,
                u,
                c = this.h0,
                l = this.h1,
                h = this.h2,
                f = this.h3,
                d = this.h4,
                p = this.h5,
                y = this.h6,
                g = this.h7,
                b = this.blocks;
              for (t = 16; t < 64; ++t)
                (e = (((i = b[t - 15]) >>> 7) | (i << 25)) ^ ((i >>> 18) | (i << 14)) ^ (i >>> 3)),
                  (r = (((i = b[t - 2]) >>> 17) | (i << 15)) ^ ((i >>> 19) | (i << 13)) ^ (i >>> 10)),
                  (b[t] = (b[t - 16] + e + b[t - 7] + r) << 0);
              for (u = l & h, t = 0; t < 64; t += 4)
                this.first
                  ? (this.is224
                      ? ((o = 300032), (g = ((i = b[0] - 1413257819) - 150054599) << 0), (f = (i + 24177077) << 0))
                      : ((o = 704751109), (g = ((i = b[0] - 210244248) - 1521486534) << 0), (f = (i + 143694565) << 0)),
                    (this.first = !1))
                  : ((e = ((c >>> 2) | (c << 30)) ^ ((c >>> 13) | (c << 19)) ^ ((c >>> 22) | (c << 10))),
                    (n = (o = c & l) ^ (c & h) ^ u),
                    (g =
                      (f +
                        (i =
                          g +
                          (r = ((d >>> 6) | (d << 26)) ^ ((d >>> 11) | (d << 21)) ^ ((d >>> 25) | (d << 7))) +
                          ((d & p) ^ (~d & y)) +
                          K[t] +
                          b[t])) <<
                      0),
                    (f = (i + (e + n)) << 0)),
                  (e = ((f >>> 2) | (f << 30)) ^ ((f >>> 13) | (f << 19)) ^ ((f >>> 22) | (f << 10))),
                  (n = (s = f & c) ^ (f & l) ^ o),
                  (y =
                    (h +
                      (i =
                        y +
                        (r = ((g >>> 6) | (g << 26)) ^ ((g >>> 11) | (g << 21)) ^ ((g >>> 25) | (g << 7))) +
                        ((g & d) ^ (~g & p)) +
                        K[t + 1] +
                        b[t + 1])) <<
                    0),
                  (e =
                    (((h = (i + (e + n)) << 0) >>> 2) | (h << 30)) ^
                    ((h >>> 13) | (h << 19)) ^
                    ((h >>> 22) | (h << 10))),
                  (n = (a = h & f) ^ (h & c) ^ s),
                  (p =
                    (l +
                      (i =
                        p +
                        (r = ((y >>> 6) | (y << 26)) ^ ((y >>> 11) | (y << 21)) ^ ((y >>> 25) | (y << 7))) +
                        ((y & g) ^ (~y & d)) +
                        K[t + 2] +
                        b[t + 2])) <<
                    0),
                  (e =
                    (((l = (i + (e + n)) << 0) >>> 2) | (l << 30)) ^
                    ((l >>> 13) | (l << 19)) ^
                    ((l >>> 22) | (l << 10))),
                  (n = (u = l & h) ^ (l & f) ^ a),
                  (d =
                    (c +
                      (i =
                        d +
                        (r = ((p >>> 6) | (p << 26)) ^ ((p >>> 11) | (p << 21)) ^ ((p >>> 25) | (p << 7))) +
                        ((p & y) ^ (~p & g)) +
                        K[t + 3] +
                        b[t + 3])) <<
                    0),
                  (c = (i + (e + n)) << 0);
              (this.h0 = (this.h0 + c) << 0),
                (this.h1 = (this.h1 + l) << 0),
                (this.h2 = (this.h2 + h) << 0),
                (this.h3 = (this.h3 + f) << 0),
                (this.h4 = (this.h4 + d) << 0),
                (this.h5 = (this.h5 + p) << 0),
                (this.h6 = (this.h6 + y) << 0),
                (this.h7 = (this.h7 + g) << 0);
            }),
            (Sha256.prototype.hex = function () {
              this.finalize();
              var t = this.h0,
                e = this.h1,
                r = this.h2,
                n = this.h3,
                i = this.h4,
                o = this.h5,
                s = this.h6,
                a = this.h7,
                u =
                  HEX_CHARS[(t >> 28) & 15] +
                  HEX_CHARS[(t >> 24) & 15] +
                  HEX_CHARS[(t >> 20) & 15] +
                  HEX_CHARS[(t >> 16) & 15] +
                  HEX_CHARS[(t >> 12) & 15] +
                  HEX_CHARS[(t >> 8) & 15] +
                  HEX_CHARS[(t >> 4) & 15] +
                  HEX_CHARS[15 & t] +
                  HEX_CHARS[(e >> 28) & 15] +
                  HEX_CHARS[(e >> 24) & 15] +
                  HEX_CHARS[(e >> 20) & 15] +
                  HEX_CHARS[(e >> 16) & 15] +
                  HEX_CHARS[(e >> 12) & 15] +
                  HEX_CHARS[(e >> 8) & 15] +
                  HEX_CHARS[(e >> 4) & 15] +
                  HEX_CHARS[15 & e] +
                  HEX_CHARS[(r >> 28) & 15] +
                  HEX_CHARS[(r >> 24) & 15] +
                  HEX_CHARS[(r >> 20) & 15] +
                  HEX_CHARS[(r >> 16) & 15] +
                  HEX_CHARS[(r >> 12) & 15] +
                  HEX_CHARS[(r >> 8) & 15] +
                  HEX_CHARS[(r >> 4) & 15] +
                  HEX_CHARS[15 & r] +
                  HEX_CHARS[(n >> 28) & 15] +
                  HEX_CHARS[(n >> 24) & 15] +
                  HEX_CHARS[(n >> 20) & 15] +
                  HEX_CHARS[(n >> 16) & 15] +
                  HEX_CHARS[(n >> 12) & 15] +
                  HEX_CHARS[(n >> 8) & 15] +
                  HEX_CHARS[(n >> 4) & 15] +
                  HEX_CHARS[15 & n] +
                  HEX_CHARS[(i >> 28) & 15] +
                  HEX_CHARS[(i >> 24) & 15] +
                  HEX_CHARS[(i >> 20) & 15] +
                  HEX_CHARS[(i >> 16) & 15] +
                  HEX_CHARS[(i >> 12) & 15] +
                  HEX_CHARS[(i >> 8) & 15] +
                  HEX_CHARS[(i >> 4) & 15] +
                  HEX_CHARS[15 & i] +
                  HEX_CHARS[(o >> 28) & 15] +
                  HEX_CHARS[(o >> 24) & 15] +
                  HEX_CHARS[(o >> 20) & 15] +
                  HEX_CHARS[(o >> 16) & 15] +
                  HEX_CHARS[(o >> 12) & 15] +
                  HEX_CHARS[(o >> 8) & 15] +
                  HEX_CHARS[(o >> 4) & 15] +
                  HEX_CHARS[15 & o] +
                  HEX_CHARS[(s >> 28) & 15] +
                  HEX_CHARS[(s >> 24) & 15] +
                  HEX_CHARS[(s >> 20) & 15] +
                  HEX_CHARS[(s >> 16) & 15] +
                  HEX_CHARS[(s >> 12) & 15] +
                  HEX_CHARS[(s >> 8) & 15] +
                  HEX_CHARS[(s >> 4) & 15] +
                  HEX_CHARS[15 & s];
              return (
                this.is224 ||
                  (u +=
                    HEX_CHARS[(a >> 28) & 15] +
                    HEX_CHARS[(a >> 24) & 15] +
                    HEX_CHARS[(a >> 20) & 15] +
                    HEX_CHARS[(a >> 16) & 15] +
                    HEX_CHARS[(a >> 12) & 15] +
                    HEX_CHARS[(a >> 8) & 15] +
                    HEX_CHARS[(a >> 4) & 15] +
                    HEX_CHARS[15 & a]),
                u
              );
            }),
            (Sha256.prototype.toString = Sha256.prototype.hex),
            (Sha256.prototype.digest = function () {
              this.finalize();
              var t = this.h0,
                e = this.h1,
                r = this.h2,
                n = this.h3,
                i = this.h4,
                o = this.h5,
                s = this.h6,
                a = this.h7,
                u = [
                  (t >> 24) & 255,
                  (t >> 16) & 255,
                  (t >> 8) & 255,
                  255 & t,
                  (e >> 24) & 255,
                  (e >> 16) & 255,
                  (e >> 8) & 255,
                  255 & e,
                  (r >> 24) & 255,
                  (r >> 16) & 255,
                  (r >> 8) & 255,
                  255 & r,
                  (n >> 24) & 255,
                  (n >> 16) & 255,
                  (n >> 8) & 255,
                  255 & n,
                  (i >> 24) & 255,
                  (i >> 16) & 255,
                  (i >> 8) & 255,
                  255 & i,
                  (o >> 24) & 255,
                  (o >> 16) & 255,
                  (o >> 8) & 255,
                  255 & o,
                  (s >> 24) & 255,
                  (s >> 16) & 255,
                  (s >> 8) & 255,
                  255 & s,
                ];
              return this.is224 || u.push((a >> 24) & 255, (a >> 16) & 255, (a >> 8) & 255, 255 & a), u;
            }),
            (Sha256.prototype.array = Sha256.prototype.digest),
            (Sha256.prototype.arrayBuffer = function () {
              this.finalize();
              var t = new ArrayBuffer(this.is224 ? 28 : 32),
                e = new DataView(t);
              return (
                e.setUint32(0, this.h0),
                e.setUint32(4, this.h1),
                e.setUint32(8, this.h2),
                e.setUint32(12, this.h3),
                e.setUint32(16, this.h4),
                e.setUint32(20, this.h5),
                e.setUint32(24, this.h6),
                this.is224 || e.setUint32(28, this.h7),
                t
              );
            }),
            (HmacSha256.prototype = new Sha256()),
            (HmacSha256.prototype.finalize = function () {
              if ((Sha256.prototype.finalize.call(this), this.inner)) {
                this.inner = !1;
                var t = this.array();
                Sha256.call(this, this.is224, this.sharedMemory),
                  this.update(this.oKeyPad),
                  this.update(t),
                  Sha256.prototype.finalize.call(this);
              }
            });
          var exports = createMethod();
          (exports.sha256 = exports),
            (exports.sha224 = createMethod(!0)),
            (exports.sha256.hmac = createHmacMethod()),
            (exports.sha224.hmac = createHmacMethod(!0)),
            COMMON_JS
              ? (module.exports = exports)
              : ((root.sha256 = exports.sha256),
                (root.sha224 = exports.sha224),
                AMD &&
                  ((__WEBPACK_AMD_DEFINE_RESULT__ = function () {
                    return exports;
                  }.call(exports, __webpack_require__, exports, module)),
                  void 0 === __WEBPACK_AMD_DEFINE_RESULT__ || (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)));
        })();
      },
      7398: function (t, e, r) {
        'use strict';
        var n =
          (this && this.__importDefault) ||
          function (t) {
            return t && t.__esModule ? t : { default: t };
          };
        Object.defineProperty(e, '__esModule', { value: !0 }), (e.JsonRpcEngine = void 0);
        const i = n(r(9394)),
          o = r(9826);
        class s extends i.default {
          constructor() {
            super(), (this._middleware = []);
          }
          push(t) {
            this._middleware.push(t);
          }
          handle(t, e) {
            if (e && 'function' != typeof e) throw new Error('"callback" must be a function if provided.');
            return Array.isArray(t)
              ? e
                ? this._handleBatch(t, e)
                : this._handleBatch(t)
              : e
                ? this._handle(t, e)
                : this._promiseHandle(t);
          }
          asMiddleware() {
            return async (t, e, r, n) => {
              try {
                const [i, o, a] = await s._runAllMiddleware(t, e, this._middleware);
                return o
                  ? (await s._runReturnHandlers(a), n(i))
                  : r(async (t) => {
                      try {
                        await s._runReturnHandlers(a);
                      } catch (e) {
                        return t(e);
                      }
                      return t();
                    });
              } catch (t) {
                return n(t);
              }
            };
          }
          async _handleBatch(t, e) {
            try {
              const r = await Promise.all(t.map(this._promiseHandle.bind(this)));
              return e ? e(null, r) : r;
            } catch (t) {
              if (e) return e(t);
              throw t;
            }
          }
          _promiseHandle(t) {
            return new Promise((e) => {
              this._handle(t, (t, r) => {
                e(r);
              });
            });
          }
          async _handle(t, e) {
            if (!t || Array.isArray(t) || 'object' != typeof t) {
              const r = new o.EthereumRpcError(
                o.errorCodes.rpc.invalidRequest,
                'Requests must be plain objects. Received: ' + typeof t,
                { request: t },
              );
              return e(r, { id: void 0, jsonrpc: '2.0', error: r });
            }
            if ('string' != typeof t.method) {
              const r = new o.EthereumRpcError(
                o.errorCodes.rpc.invalidRequest,
                'Must specify a string method. Received: ' + typeof t.method,
                { request: t },
              );
              return e(r, { id: t.id, jsonrpc: '2.0', error: r });
            }
            const r = Object.assign({}, t),
              n = { id: r.id, jsonrpc: r.jsonrpc };
            let i = null;
            try {
              await this._processRequest(r, n);
            } catch (t) {
              i = t;
            }
            return i && (delete n.result, n.error || (n.error = o.serializeError(i))), e(i, n);
          }
          async _processRequest(t, e) {
            const [r, n, i] = await s._runAllMiddleware(t, e, this._middleware);
            if ((s._checkForCompletion(t, e, n), await s._runReturnHandlers(i), r)) throw r;
          }
          static async _runAllMiddleware(t, e, r) {
            const n = [];
            let i = null,
              o = !1;
            for (const a of r) if ((([i, o] = await s._runMiddleware(t, e, a, n)), o)) break;
            return [i, o, n.reverse()];
          }
          static _runMiddleware(t, e, r, n) {
            return new Promise((i) => {
              const s = (t) => {
                  const r = t || e.error;
                  r && (e.error = o.serializeError(r)), i([r, !0]);
                },
                u = (r) => {
                  e.error
                    ? s(e.error)
                    : (r &&
                        ('function' != typeof r &&
                          s(
                            new o.EthereumRpcError(
                              o.errorCodes.rpc.internal,
                              `JsonRpcEngine: "next" return handlers must be functions. Received "${typeof r}" for request:\n${a(
                                t,
                              )}`,
                              { request: t },
                            ),
                          ),
                        n.push(r)),
                      i([null, !1]));
                };
              try {
                r(t, e, u, s);
              } catch (t) {
                s(t);
              }
            });
          }
          static async _runReturnHandlers(t) {
            for (const e of t)
              await new Promise((t, r) => {
                e((e) => (e ? r(e) : t()));
              });
          }
          static _checkForCompletion(t, e, r) {
            if (!('result' in e) && !('error' in e))
              throw new o.EthereumRpcError(
                o.errorCodes.rpc.internal,
                `JsonRpcEngine: Response has no error or result for request:\n${a(t)}`,
                { request: t },
              );
            if (!r)
              throw new o.EthereumRpcError(
                o.errorCodes.rpc.internal,
                `JsonRpcEngine: Nothing ended request:\n${a(t)}`,
                { request: t },
              );
          }
        }
        function a(t) {
          return JSON.stringify(t, null, 2);
        }
        e.JsonRpcEngine = s;
      },
      1841: (t, e) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.createAsyncMiddleware = void 0),
          (e.createAsyncMiddleware = function (t) {
            return async (e, r, n, i) => {
              let o;
              const s = new Promise((t) => {
                o = t;
              });
              let a = null,
                u = !1;
              const c = async () => {
                (u = !0),
                  n((t) => {
                    (a = t), o();
                  }),
                  await s;
              };
              try {
                await t(e, r, c), u ? (await s, a(null)) : i(null);
              } catch (t) {
                a ? a(t) : i(t);
              }
            };
          });
      },
      8508: (t, e) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.createScaffoldMiddleware = void 0),
          (e.createScaffoldMiddleware = function (t) {
            return (e, r, n, i) => {
              const o = t[e.method];
              return void 0 === o ? n() : 'function' == typeof o ? o(e, r, n, i) : ((r.result = o), i());
            };
          });
      },
      3107: (t, e) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }), (e.getUniqueId = void 0);
        const r = 4294967295;
        let n = Math.floor(Math.random() * r);
        e.getUniqueId = function () {
          return (n = (n + 1) % r), n;
        };
      },
      5086: (t, e, r) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }), (e.createIdRemapMiddleware = void 0);
        const n = r(3107);
        e.createIdRemapMiddleware = function () {
          return (t, e, r, i) => {
            const o = t.id,
              s = n.getUniqueId();
            (t.id = s),
              (e.id = s),
              r((r) => {
                (t.id = o), (e.id = o), r();
              });
          };
        };
      },
      8625: function (t, e, r) {
        'use strict';
        var n =
            (this && this.__createBinding) ||
            (Object.create
              ? function (t, e, r, n) {
                  void 0 === n && (n = r),
                    Object.defineProperty(t, n, {
                      enumerable: !0,
                      get: function () {
                        return e[r];
                      },
                    });
                }
              : function (t, e, r, n) {
                  void 0 === n && (n = r), (t[n] = e[r]);
                }),
          i =
            (this && this.__exportStar) ||
            function (t, e) {
              for (var r in t) 'default' === r || Object.prototype.hasOwnProperty.call(e, r) || n(e, t, r);
            };
        Object.defineProperty(e, '__esModule', { value: !0 }),
          i(r(5086), e),
          i(r(1841), e),
          i(r(8508), e),
          i(r(3107), e),
          i(r(7398), e),
          i(r(9962), e);
      },
      9962: (t, e, r) => {
        'use strict';
        Object.defineProperty(e, '__esModule', { value: !0 }), (e.mergeMiddleware = void 0);
        const n = r(7398);
        e.mergeMiddleware = function (t) {
          const e = new n.JsonRpcEngine();
          return t.forEach((t) => e.push(t)), e.asMiddleware();
        };
      },
      3420: (t) => {
        t.exports = function (t) {
          var e = (t = t || {}).max || Number.MAX_SAFE_INTEGER,
            r = void 0 !== t.start ? t.start : Math.floor(Math.random() * e);
          return function () {
            return (r %= e), r++;
          };
        };
      },
      8598: (t, e, r) => {
        t.exports = r(6066)(r(9653));
      },
      6066: (t, e, r) => {
        const n = r(7016),
          i = r(5675);
        t.exports = function (t) {
          const e = n(t),
            r = i(t);
          return function (t, n) {
            switch ('string' == typeof t ? t.toLowerCase() : t) {
              case 'keccak224':
                return new e(1152, 448, null, 224, n);
              case 'keccak256':
                return new e(1088, 512, null, 256, n);
              case 'keccak384':
                return new e(832, 768, null, 384, n);
              case 'keccak512':
                return new e(576, 1024, null, 512, n);
              case 'sha3-224':
                return new e(1152, 448, 6, 224, n);
              case 'sha3-256':
                return new e(1088, 512, 6, 256, n);
              case 'sha3-384':
                return new e(832, 768, 6, 384, n);
              case 'sha3-512':
                return new e(576, 1024, 6, 512, n);
              case 'shake128':
                return new r(1344, 256, 31, n);
              case 'shake256':
                return new r(1088, 512, 31, n);
              default:
                throw new Error('Invald algorithm: ' + t);
            }
          };
        };
      },
      7016: (t, e, r) => {
        var n = r(8764).Buffer;
        const { Transform: i } = r(8473);
        t.exports = (t) =>
          class e extends i {
            constructor(e, r, n, i, o) {
              super(o),
                (this._rate = e),
                (this._capacity = r),
                (this._delimitedSuffix = n),
                (this._hashBitLength = i),
                (this._options = o),
                (this._state = new t()),
                this._state.initialize(e, r),
                (this._finalized = !1);
            }
            _transform(t, e, r) {
              let n = null;
              try {
                this.update(t, e);
              } catch (t) {
                n = t;
              }
              r(n);
            }
            _flush(t) {
              let e = null;
              try {
                this.push(this.digest());
              } catch (t) {
                e = t;
              }
              t(e);
            }
            update(t, e) {
              if (!n.isBuffer(t) && 'string' != typeof t) throw new TypeError('Data must be a string or a buffer');
              if (this._finalized) throw new Error('Digest already called');
              return n.isBuffer(t) || (t = n.from(t, e)), this._state.absorb(t), this;
            }
            digest(t) {
              if (this._finalized) throw new Error('Digest already called');
              (this._finalized = !0), this._delimitedSuffix && this._state.absorbLastFewBits(this._delimitedSuffix);
              let e = this._state.squeeze(this._hashBitLength / 8);
              return void 0 !== t && (e = e.toString(t)), this._resetState(), e;
            }
            _resetState() {
              return this._state.initialize(this._rate, this._capacity), this;
            }
            _clone() {
              const t = new e(this._rate, this._capacity, this._delimitedSuffix, this._hashBitLength, this._options);
              return this._state.copy(t._state), (t._finalized = this._finalized), t;
            }
          };
      },
      5675: (t, e, r) => {
        var n = r(8764).Buffer;
        const { Transform: i } = r(8473);
        t.exports = (t) =>
          class e extends i {
            constructor(e, r, n, i) {
              super(i),
                (this._rate = e),
                (this._capacity = r),
                (this._delimitedSuffix = n),
                (this._options = i),
                (this._state = new t()),
                this._state.initialize(e, r),
                (this._finalized = !1);
            }
            _transform(t, e, r) {
              let n = null;
              try {
                this.update(t, e);
              } catch (t) {
                n = t;
              }
              r(n);
            }
            _flush() {}
            _read(t) {
              this.push(this.squeeze(t));
            }
            update(t, e) {
              if (!n.isBuffer(t) && 'string' != typeof t) throw new TypeError('Data must be a string or a buffer');
              if (this._finalized) throw new Error('Squeeze already called');
              return n.isBuffer(t) || (t = n.from(t, e)), this._state.absorb(t), this;
            }
            squeeze(t, e) {
              this._finalized || ((this._finalized = !0), this._state.absorbLastFewBits(this._delimitedSuffix));
              let r = this._state.squeeze(t);
              return void 0 !== e && (r = r.toString(e)), r;
            }
            _resetState() {
              return this._state.initialize(this._rate, this._capacity), this;
            }
            _clone() {
              const t = new e(this._rate, this._capacity, this._delimitedSuffix, this._options);
              return this._state.copy(t._state), (t._finalized = this._finalized), t;
            }
          };
      },
      4040: (t, e) => {
        const r = [
          1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649, 0, 2147516545, 2147483648,
          32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905,
          2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648,
          2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648,
        ];
        e.p1600 = function (t) {
          for (let e = 0; e < 24; ++e) {
            const n = t[0] ^ t[10] ^ t[20] ^ t[30] ^ t[40],
              i = t[1] ^ t[11] ^ t[21] ^ t[31] ^ t[41],
              o = t[2] ^ t[12] ^ t[22] ^ t[32] ^ t[42],
              s = t[3] ^ t[13] ^ t[23] ^ t[33] ^ t[43],
              a = t[4] ^ t[14] ^ t[24] ^ t[34] ^ t[44],
              u = t[5] ^ t[15] ^ t[25] ^ t[35] ^ t[45],
              c = t[6] ^ t[16] ^ t[26] ^ t[36] ^ t[46],
              l = t[7] ^ t[17] ^ t[27] ^ t[37] ^ t[47],
              h = t[8] ^ t[18] ^ t[28] ^ t[38] ^ t[48],
              f = t[9] ^ t[19] ^ t[29] ^ t[39] ^ t[49];
            let d = h ^ ((o << 1) | (s >>> 31)),
              p = f ^ ((s << 1) | (o >>> 31));
            const y = t[0] ^ d,
              g = t[1] ^ p,
              b = t[10] ^ d,
              m = t[11] ^ p,
              v = t[20] ^ d,
              w = t[21] ^ p,
              _ = t[30] ^ d,
              S = t[31] ^ p,
              E = t[40] ^ d,
              x = t[41] ^ p;
            (d = n ^ ((a << 1) | (u >>> 31))), (p = i ^ ((u << 1) | (a >>> 31)));
            const M = t[2] ^ d,
              k = t[3] ^ p,
              A = t[12] ^ d,
              C = t[13] ^ p,
              R = t[22] ^ d,
              I = t[23] ^ p,
              T = t[32] ^ d,
              O = t[33] ^ p,
              N = t[42] ^ d,
              j = t[43] ^ p;
            (d = o ^ ((c << 1) | (l >>> 31))), (p = s ^ ((l << 1) | (c >>> 31)));
            const L = t[4] ^ d,
              P = t[5] ^ p,
              D = t[14] ^ d,
              B = t[15] ^ p,
              U = t[24] ^ d,
              F = t[25] ^ p,
              H = t[34] ^ d,
              W = t[35] ^ p,
              z = t[44] ^ d,
              V = t[45] ^ p;
            (d = a ^ ((h << 1) | (f >>> 31))), (p = u ^ ((f << 1) | (h >>> 31)));
            const q = t[6] ^ d,
              Z = t[7] ^ p,
              $ = t[16] ^ d,
              G = t[17] ^ p,
              Y = t[26] ^ d,
              J = t[27] ^ p,
              K = t[36] ^ d,
              Q = t[37] ^ p,
              X = t[46] ^ d,
              tt = t[47] ^ p;
            (d = c ^ ((n << 1) | (i >>> 31))), (p = l ^ ((i << 1) | (n >>> 31)));
            const et = t[8] ^ d,
              rt = t[9] ^ p,
              nt = t[18] ^ d,
              it = t[19] ^ p,
              ot = t[28] ^ d,
              st = t[29] ^ p,
              at = t[38] ^ d,
              ut = t[39] ^ p,
              ct = t[48] ^ d,
              lt = t[49] ^ p,
              ht = y,
              ft = g,
              dt = (m << 4) | (b >>> 28),
              pt = (b << 4) | (m >>> 28),
              yt = (v << 3) | (w >>> 29),
              gt = (w << 3) | (v >>> 29),
              bt = (S << 9) | (_ >>> 23),
              mt = (_ << 9) | (S >>> 23),
              vt = (E << 18) | (x >>> 14),
              wt = (x << 18) | (E >>> 14),
              _t = (M << 1) | (k >>> 31),
              St = (k << 1) | (M >>> 31),
              Et = (C << 12) | (A >>> 20),
              xt = (A << 12) | (C >>> 20),
              Mt = (R << 10) | (I >>> 22),
              kt = (I << 10) | (R >>> 22),
              At = (O << 13) | (T >>> 19),
              Ct = (T << 13) | (O >>> 19),
              Rt = (N << 2) | (j >>> 30),
              It = (j << 2) | (N >>> 30),
              Tt = (P << 30) | (L >>> 2),
              Ot = (L << 30) | (P >>> 2),
              Nt = (D << 6) | (B >>> 26),
              jt = (B << 6) | (D >>> 26),
              Lt = (F << 11) | (U >>> 21),
              Pt = (U << 11) | (F >>> 21),
              Dt = (H << 15) | (W >>> 17),
              Bt = (W << 15) | (H >>> 17),
              Ut = (V << 29) | (z >>> 3),
              Ft = (z << 29) | (V >>> 3),
              Ht = (q << 28) | (Z >>> 4),
              Wt = (Z << 28) | (q >>> 4),
              zt = (G << 23) | ($ >>> 9),
              Vt = ($ << 23) | (G >>> 9),
              qt = (Y << 25) | (J >>> 7),
              Zt = (J << 25) | (Y >>> 7),
              $t = (K << 21) | (Q >>> 11),
              Gt = (Q << 21) | (K >>> 11),
              Yt = (tt << 24) | (X >>> 8),
              Jt = (X << 24) | (tt >>> 8),
              Kt = (et << 27) | (rt >>> 5),
              Qt = (rt << 27) | (et >>> 5),
              Xt = (nt << 20) | (it >>> 12),
              te = (it << 20) | (nt >>> 12),
              ee = (st << 7) | (ot >>> 25),
              re = (ot << 7) | (st >>> 25),
              ne = (at << 8) | (ut >>> 24),
              ie = (ut << 8) | (at >>> 24),
              oe = (ct << 14) | (lt >>> 18),
              se = (lt << 14) | (ct >>> 18);
            (t[0] = ht ^ (~Et & Lt)),
              (t[1] = ft ^ (~xt & Pt)),
              (t[10] = Ht ^ (~Xt & yt)),
              (t[11] = Wt ^ (~te & gt)),
              (t[20] = _t ^ (~Nt & qt)),
              (t[21] = St ^ (~jt & Zt)),
              (t[30] = Kt ^ (~dt & Mt)),
              (t[31] = Qt ^ (~pt & kt)),
              (t[40] = Tt ^ (~zt & ee)),
              (t[41] = Ot ^ (~Vt & re)),
              (t[2] = Et ^ (~Lt & $t)),
              (t[3] = xt ^ (~Pt & Gt)),
              (t[12] = Xt ^ (~yt & At)),
              (t[13] = te ^ (~gt & Ct)),
              (t[22] = Nt ^ (~qt & ne)),
              (t[23] = jt ^ (~Zt & ie)),
              (t[32] = dt ^ (~Mt & Dt)),
              (t[33] = pt ^ (~kt & Bt)),
              (t[42] = zt ^ (~ee & bt)),
              (t[43] = Vt ^ (~re & mt)),
              (t[4] = Lt ^ (~$t & oe)),
              (t[5] = Pt ^ (~Gt & se)),
              (t[14] = yt ^ (~At & Ut)),
              (t[15] = gt ^ (~Ct & Ft)),
              (t[24] = qt ^ (~ne & vt)),
              (t[25] = Zt ^ (~ie & wt)),
              (t[34] = Mt ^ (~Dt & Yt)),
              (t[35] = kt ^ (~Bt & Jt)),
              (t[44] = ee ^ (~bt & Rt)),
              (t[45] = re ^ (~mt & It)),
              (t[6] = $t ^ (~oe & ht)),
              (t[7] = Gt ^ (~se & ft)),
              (t[16] = At ^ (~Ut & Ht)),
              (t[17] = Ct ^ (~Ft & Wt)),
              (t[26] = ne ^ (~vt & _t)),
              (t[27] = ie ^ (~wt & St)),
              (t[36] = Dt ^ (~Yt & Kt)),
              (t[37] = Bt ^ (~Jt & Qt)),
              (t[46] = bt ^ (~Rt & Tt)),
              (t[47] = mt ^ (~It & Ot)),
              (t[8] = oe ^ (~ht & Et)),
              (t[9] = se ^ (~ft & xt)),
              (t[18] = Ut ^ (~Ht & Xt)),
              (t[19] = Ft ^ (~Wt & te)),
              (t[28] = vt ^ (~_t & Nt)),
              (t[29] = wt ^ (~St & jt)),
              (t[38] = Yt ^ (~Kt & dt)),
              (t[39] = Jt ^ (~Qt & pt)),
              (t[48] = Rt ^ (~Tt & zt)),
              (t[49] = It ^ (~Ot & Vt)),
              (t[0] ^= r[2 * e]),
              (t[1] ^= r[2 * e + 1]);
          }
        };
      },
      9653: (t, e, r) => {
        var n = r(8764).Buffer;
        const i = r(4040);
        function o() {
          (this.state = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
            (this.blockSize = null),
            (this.count = 0),
            (this.squeezing = !1);
        }
        (o.prototype.initialize = function (t, e) {
          for (let t = 0; t < 50; ++t) this.state[t] = 0;
          (this.blockSize = t / 8), (this.count = 0), (this.squeezing = !1);
        }),
          (o.prototype.absorb = function (t) {
            for (let e = 0; e < t.length; ++e)
              (this.state[~~(this.count / 4)] ^= t[e] << ((this.count % 4) * 8)),
                (this.count += 1),
                this.count === this.blockSize && (i.p1600(this.state), (this.count = 0));
          }),
          (o.prototype.absorbLastFewBits = function (t) {
            (this.state[~~(this.count / 4)] ^= t << ((this.count % 4) * 8)),
              0 != (128 & t) && this.count === this.blockSize - 1 && i.p1600(this.state),
              (this.state[~~((this.blockSize - 1) / 4)] ^= 128 << (((this.blockSize - 1) % 4) * 8)),
              i.p1600(this.state),
              (this.count = 0),
              (this.squeezing = !0);
          }),
          (o.prototype.squeeze = function (t) {
            this.squeezing || this.absorbLastFewBits(1);
            const e = n.alloc(t);
            for (let r = 0; r < t; ++r)
              (e[r] = (this.state[~~(this.count / 4)] >>> ((this.count % 4) * 8)) & 255),
                (this.count += 1),
                this.count === this.blockSize && (i.p1600(this.state), (this.count = 0));
            return e;
          }),
          (o.prototype.copy = function (t) {
            for (let e = 0; e < 50; ++e) t.state[e] = this.state[e];
            (t.blockSize = this.blockSize), (t.count = this.count), (t.squeezing = this.squeezing);
          }),
          (t.exports = o);
      },
      631: (t, e, r) => {
        var n = 'function' == typeof Map && Map.prototype,
          i = Object.getOwnPropertyDescriptor && n ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null,
          o = n && i && 'function' == typeof i.get ? i.get : null,
          s = n && Map.prototype.forEach,
          a = 'function' == typeof Set && Set.prototype,
          u = Object.getOwnPropertyDescriptor && a ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null,
          c = a && u && 'function' == typeof u.get ? u.get : null,
          l = a && Set.prototype.forEach,
          h = 'function' == typeof WeakMap && WeakMap.prototype ? WeakMap.prototype.has : null,
          f = 'function' == typeof WeakSet && WeakSet.prototype ? WeakSet.prototype.has : null,
          d = 'function' == typeof WeakRef && WeakRef.prototype ? WeakRef.prototype.deref : null,
          p = Boolean.prototype.valueOf,
          y = Object.prototype.toString,
          g = Function.prototype.toString,
          b = String.prototype.match,
          m = String.prototype.slice,
          v = String.prototype.replace,
          w = String.prototype.toUpperCase,
          _ = String.prototype.toLowerCase,
          S = RegExp.prototype.test,
          E = Array.prototype.concat,
          x = Array.prototype.join,
          M = Array.prototype.slice,
          k = Math.floor,
          A = 'function' == typeof BigInt ? BigInt.prototype.valueOf : null,
          C = Object.getOwnPropertySymbols,
          R = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? Symbol.prototype.toString : null,
          I = 'function' == typeof Symbol && 'object' == typeof Symbol.iterator,
          T = 'function' == typeof Symbol && Symbol.toStringTag && (Symbol.toStringTag, 1) ? Symbol.toStringTag : null,
          O = Object.prototype.propertyIsEnumerable,
          N =
            ('function' == typeof Reflect ? Reflect.getPrototypeOf : Object.getPrototypeOf) ||
            ([].__proto__ === Array.prototype
              ? function (t) {
                  return t.__proto__;
                }
              : null);
        function j(t, e) {
          if (t === 1 / 0 || t === -1 / 0 || t != t || (t && t > -1e3 && t < 1e3) || S.call(/e/, e)) return e;
          var r = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
          if ('number' == typeof t) {
            var n = t < 0 ? -k(-t) : k(t);
            if (n !== t) {
              var i = String(n),
                o = m.call(e, i.length + 1);
              return v.call(i, r, '$&_') + '.' + v.call(v.call(o, /([0-9]{3})/g, '$&_'), /_$/, '');
            }
          }
          return v.call(e, r, '$&_');
        }
        var L = r(4654),
          P = L.custom,
          D = W(P) ? P : null;
        function B(t, e, r) {
          var n = 'double' === (r.quoteStyle || e) ? '"' : "'";
          return n + t + n;
        }
        function U(t) {
          return v.call(String(t), /"/g, '&quot;');
        }
        function F(t) {
          return !('[object Array]' !== q(t) || (T && 'object' == typeof t && T in t));
        }
        function H(t) {
          return !('[object RegExp]' !== q(t) || (T && 'object' == typeof t && T in t));
        }
        function W(t) {
          if (I) return t && 'object' == typeof t && t instanceof Symbol;
          if ('symbol' == typeof t) return !0;
          if (!t || 'object' != typeof t || !R) return !1;
          try {
            return R.call(t), !0;
          } catch (t) {}
          return !1;
        }
        t.exports = function t(e, r, n, i) {
          var a = r || {};
          if (V(a, 'quoteStyle') && 'single' !== a.quoteStyle && 'double' !== a.quoteStyle)
            throw new TypeError('option "quoteStyle" must be "single" or "double"');
          if (
            V(a, 'maxStringLength') &&
            ('number' == typeof a.maxStringLength
              ? a.maxStringLength < 0 && a.maxStringLength !== 1 / 0
              : null !== a.maxStringLength)
          )
            throw new TypeError(
              'option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`',
            );
          var u = !V(a, 'customInspect') || a.customInspect;
          if ('boolean' != typeof u && 'symbol' !== u)
            throw new TypeError('option "customInspect", if provided, must be `true`, `false`, or `\'symbol\'`');
          if (
            V(a, 'indent') &&
            null !== a.indent &&
            '\t' !== a.indent &&
            !(parseInt(a.indent, 10) === a.indent && a.indent > 0)
          )
            throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
          if (V(a, 'numericSeparator') && 'boolean' != typeof a.numericSeparator)
            throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
          var y = a.numericSeparator;
          if (void 0 === e) return 'undefined';
          if (null === e) return 'null';
          if ('boolean' == typeof e) return e ? 'true' : 'false';
          if ('string' == typeof e) return $(e, a);
          if ('number' == typeof e) {
            if (0 === e) return 1 / 0 / e > 0 ? '0' : '-0';
            var w = String(e);
            return y ? j(e, w) : w;
          }
          if ('bigint' == typeof e) {
            var S = String(e) + 'n';
            return y ? j(e, S) : S;
          }
          var k = void 0 === a.depth ? 5 : a.depth;
          if ((void 0 === n && (n = 0), n >= k && k > 0 && 'object' == typeof e)) return F(e) ? '[Array]' : '[Object]';
          var C,
            P = (function (t, e) {
              var r;
              if ('\t' === t.indent) r = '\t';
              else {
                if (!('number' == typeof t.indent && t.indent > 0)) return null;
                r = x.call(Array(t.indent + 1), ' ');
              }
              return { base: r, prev: x.call(Array(e + 1), r) };
            })(a, n);
          if (void 0 === i) i = [];
          else if (Z(i, e) >= 0) return '[Circular]';
          function z(e, r, o) {
            if ((r && (i = M.call(i)).push(r), o)) {
              var s = { depth: a.depth };
              return V(a, 'quoteStyle') && (s.quoteStyle = a.quoteStyle), t(e, s, n + 1, i);
            }
            return t(e, a, n + 1, i);
          }
          if ('function' == typeof e && !H(e)) {
            var G = (function (t) {
                if (t.name) return t.name;
                var e = b.call(g.call(t), /^function\s*([\w$]+)/);
                return e ? e[1] : null;
              })(e),
              tt = X(e, z);
            return (
              '[Function' +
              (G ? ': ' + G : ' (anonymous)') +
              ']' +
              (tt.length > 0 ? ' { ' + x.call(tt, ', ') + ' }' : '')
            );
          }
          if (W(e)) {
            var et = I ? v.call(String(e), /^(Symbol\(.*\))_[^)]*$/, '$1') : R.call(e);
            return 'object' != typeof e || I ? et : Y(et);
          }
          if (
            (C = e) &&
            'object' == typeof C &&
            (('undefined' != typeof HTMLElement && C instanceof HTMLElement) ||
              ('string' == typeof C.nodeName && 'function' == typeof C.getAttribute))
          ) {
            for (var rt = '<' + _.call(String(e.nodeName)), nt = e.attributes || [], it = 0; it < nt.length; it++)
              rt += ' ' + nt[it].name + '=' + B(U(nt[it].value), 'double', a);
            return (
              (rt += '>'),
              e.childNodes && e.childNodes.length && (rt += '...'),
              rt + '</' + _.call(String(e.nodeName)) + '>'
            );
          }
          if (F(e)) {
            if (0 === e.length) return '[]';
            var ot = X(e, z);
            return P &&
              !(function (t) {
                for (var e = 0; e < t.length; e++) if (Z(t[e], '\n') >= 0) return !1;
                return !0;
              })(ot)
              ? '[' + Q(ot, P) + ']'
              : '[ ' + x.call(ot, ', ') + ' ]';
          }
          if (
            (function (t) {
              return !('[object Error]' !== q(t) || (T && 'object' == typeof t && T in t));
            })(e)
          ) {
            var st = X(e, z);
            return 'cause' in Error.prototype || !('cause' in e) || O.call(e, 'cause')
              ? 0 === st.length
                ? '[' + String(e) + ']'
                : '{ [' + String(e) + '] ' + x.call(st, ', ') + ' }'
              : '{ [' + String(e) + '] ' + x.call(E.call('[cause]: ' + z(e.cause), st), ', ') + ' }';
          }
          if ('object' == typeof e && u) {
            if (D && 'function' == typeof e[D] && L) return L(e, { depth: k - n });
            if ('symbol' !== u && 'function' == typeof e.inspect) return e.inspect();
          }
          if (
            (function (t) {
              if (!o || !t || 'object' != typeof t) return !1;
              try {
                o.call(t);
                try {
                  c.call(t);
                } catch (t) {
                  return !0;
                }
                return t instanceof Map;
              } catch (t) {}
              return !1;
            })(e)
          ) {
            var at = [];
            return (
              s.call(e, function (t, r) {
                at.push(z(r, e, !0) + ' => ' + z(t, e));
              }),
              K('Map', o.call(e), at, P)
            );
          }
          if (
            (function (t) {
              if (!c || !t || 'object' != typeof t) return !1;
              try {
                c.call(t);
                try {
                  o.call(t);
                } catch (t) {
                  return !0;
                }
                return t instanceof Set;
              } catch (t) {}
              return !1;
            })(e)
          ) {
            var ut = [];
            return (
              l.call(e, function (t) {
                ut.push(z(t, e));
              }),
              K('Set', c.call(e), ut, P)
            );
          }
          if (
            (function (t) {
              if (!h || !t || 'object' != typeof t) return !1;
              try {
                h.call(t, h);
                try {
                  f.call(t, f);
                } catch (t) {
                  return !0;
                }
                return t instanceof WeakMap;
              } catch (t) {}
              return !1;
            })(e)
          )
            return J('WeakMap');
          if (
            (function (t) {
              if (!f || !t || 'object' != typeof t) return !1;
              try {
                f.call(t, f);
                try {
                  h.call(t, h);
                } catch (t) {
                  return !0;
                }
                return t instanceof WeakSet;
              } catch (t) {}
              return !1;
            })(e)
          )
            return J('WeakSet');
          if (
            (function (t) {
              if (!d || !t || 'object' != typeof t) return !1;
              try {
                return d.call(t), !0;
              } catch (t) {}
              return !1;
            })(e)
          )
            return J('WeakRef');
          if (
            (function (t) {
              return !('[object Number]' !== q(t) || (T && 'object' == typeof t && T in t));
            })(e)
          )
            return Y(z(Number(e)));
          if (
            (function (t) {
              if (!t || 'object' != typeof t || !A) return !1;
              try {
                return A.call(t), !0;
              } catch (t) {}
              return !1;
            })(e)
          )
            return Y(z(A.call(e)));
          if (
            (function (t) {
              return !('[object Boolean]' !== q(t) || (T && 'object' == typeof t && T in t));
            })(e)
          )
            return Y(p.call(e));
          if (
            (function (t) {
              return !('[object String]' !== q(t) || (T && 'object' == typeof t && T in t));
            })(e)
          )
            return Y(z(String(e)));
          if (
            !(function (t) {
              return !('[object Date]' !== q(t) || (T && 'object' == typeof t && T in t));
            })(e) &&
            !H(e)
          ) {
            var ct = X(e, z),
              lt = N ? N(e) === Object.prototype : e instanceof Object || e.constructor === Object,
              ht = e instanceof Object ? '' : 'null prototype',
              ft = !lt && T && Object(e) === e && T in e ? m.call(q(e), 8, -1) : ht ? 'Object' : '',
              dt =
                (lt || 'function' != typeof e.constructor ? '' : e.constructor.name ? e.constructor.name + ' ' : '') +
                (ft || ht ? '[' + x.call(E.call([], ft || [], ht || []), ': ') + '] ' : '');
            return 0 === ct.length ? dt + '{}' : P ? dt + '{' + Q(ct, P) + '}' : dt + '{ ' + x.call(ct, ', ') + ' }';
          }
          return String(e);
        };
        var z =
          Object.prototype.hasOwnProperty ||
          function (t) {
            return t in this;
          };
        function V(t, e) {
          return z.call(t, e);
        }
        function q(t) {
          return y.call(t);
        }
        function Z(t, e) {
          if (t.indexOf) return t.indexOf(e);
          for (var r = 0, n = t.length; r < n; r++) if (t[r] === e) return r;
          return -1;
        }
        function $(t, e) {
          if (t.length > e.maxStringLength) {
            var r = t.length - e.maxStringLength,
              n = '... ' + r + ' more character' + (r > 1 ? 's' : '');
            return $(m.call(t, 0, e.maxStringLength), e) + n;
          }
          return B(v.call(v.call(t, /(['\\])/g, '\\$1'), /[\x00-\x1f]/g, G), 'single', e);
        }
        function G(t) {
          var e = t.charCodeAt(0),
            r = { 8: 'b', 9: 't', 10: 'n', 12: 'f', 13: 'r' }[e];
          return r ? '\\' + r : '\\x' + (e < 16 ? '0' : '') + w.call(e.toString(16));
        }
        function Y(t) {
          return 'Object(' + t + ')';
        }
        function J(t) {
          return t + ' { ? }';
        }
        function K(t, e, r, n) {
          return t + ' (' + e + ') {' + (n ? Q(r, n) : x.call(r, ', ')) + '}';
        }
        function Q(t, e) {
          if (0 === t.length) return '';
          var r = '\n' + e.prev + e.base;
          return r + x.call(t, ',' + r) + '\n' + e.prev;
        }
        function X(t, e) {
          var r = F(t),
            n = [];
          if (r) {
            n.length = t.length;
            for (var i = 0; i < t.length; i++) n[i] = V(t, i) ? e(t[i], t) : '';
          }
          var o,
            s = 'function' == typeof C ? C(t) : [];
          if (I) {
            o = {};
            for (var a = 0; a < s.length; a++) o['$' + s[a]] = s[a];
          }
          for (var u in t)
            V(t, u) &&
              ((r && String(Number(u)) === u && u < t.length) ||
                (I && o['$' + u] instanceof Symbol) ||
                (S.call(/[^\w$]/, u) ? n.push(e(u, t) + ': ' + e(t[u], t)) : n.push(u + ': ' + e(t[u], t))));
          if ('function' == typeof C)
            for (var c = 0; c < s.length; c++) O.call(t, s[c]) && n.push('[' + e(s[c]) + ']: ' + e(t[s[c]], t));
          return n;
        }
      },
      2352: (t) => {
        'use strict';
        const e = (t, e) =>
          function () {
            const r = e.promiseModule,
              n = new Array(arguments.length);
            for (let t = 0; t < arguments.length; t++) n[t] = arguments[t];
            return new r((r, i) => {
              e.errorFirst
                ? n.push(function (t, n) {
                    if (e.multiArgs) {
                      const e = new Array(arguments.length - 1);
                      for (let t = 1; t < arguments.length; t++) e[t - 1] = arguments[t];
                      t ? (e.unshift(t), i(e)) : r(e);
                    } else t ? i(t) : r(n);
                  })
                : n.push(function (t) {
                    if (e.multiArgs) {
                      const t = new Array(arguments.length - 1);
                      for (let e = 0; e < arguments.length; e++) t[e] = arguments[e];
                      r(t);
                    } else r(t);
                  }),
                t.apply(this, n);
            });
          };
        t.exports = (t, r) => {
          r = Object.assign({ exclude: [/.+(Sync|Stream)$/], errorFirst: !0, promiseModule: Promise }, r);
          const n = (t) => {
            const e = (e) => ('string' == typeof e ? t === e : e.test(t));
            return r.include ? r.include.some(e) : !r.exclude.some(e);
          };
          let i;
          i =
            'function' == typeof t
              ? function () {
                  return r.excludeMain ? t.apply(this, arguments) : e(t, r).apply(this, arguments);
                }
              : Object.create(Object.getPrototypeOf(t));
          for (const o in t) {
            const s = t[o];
            i[o] = 'function' == typeof s && n(o) ? e(s, r) : s;
          }
          return i;
        };
      },
      6400: (t, e, r) => {
        'use strict';
        r.r(e),
          r.d(e, {
            Component: () => w,
            Fragment: () => v,
            cloneElement: () => H,
            createContext: () => W,
            createElement: () => g,
            createRef: () => m,
            h: () => g,
            hydrate: () => F,
            isValidElement: () => s,
            options: () => i,
            render: () => U,
            toChildArray: () => A,
          });
        var n,
          i,
          o,
          s,
          a,
          u,
          c,
          l,
          h = {},
          f = [],
          d = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
        function p(t, e) {
          for (var r in e) t[r] = e[r];
          return t;
        }
        function y(t) {
          var e = t.parentNode;
          e && e.removeChild(t);
        }
        function g(t, e, r) {
          var i,
            o,
            s,
            a = {};
          for (s in e) 'key' == s ? (i = e[s]) : 'ref' == s ? (o = e[s]) : (a[s] = e[s]);
          if (
            (arguments.length > 2 && (a.children = arguments.length > 3 ? n.call(arguments, 2) : r),
            'function' == typeof t && null != t.defaultProps)
          )
            for (s in t.defaultProps) void 0 === a[s] && (a[s] = t.defaultProps[s]);
          return b(t, a, i, o, null);
        }
        function b(t, e, r, n, s) {
          var a = {
            type: t,
            props: e,
            key: r,
            ref: n,
            __k: null,
            __: null,
            __b: 0,
            __e: null,
            __d: void 0,
            __c: null,
            __h: null,
            constructor: void 0,
            __v: null == s ? ++o : s,
          };
          return null == s && null != i.vnode && i.vnode(a), a;
        }
        function m() {
          return { current: null };
        }
        function v(t) {
          return t.children;
        }
        function w(t, e) {
          (this.props = t), (this.context = e);
        }
        function _(t, e) {
          if (null == e) return t.__ ? _(t.__, t.__.__k.indexOf(t) + 1) : null;
          for (var r; e < t.__k.length; e++) if (null != (r = t.__k[e]) && null != r.__e) return r.__e;
          return 'function' == typeof t.type ? _(t) : null;
        }
        function S(t) {
          var e, r;
          if (null != (t = t.__) && null != t.__c) {
            for (t.__e = t.__c.base = null, e = 0; e < t.__k.length; e++)
              if (null != (r = t.__k[e]) && null != r.__e) {
                t.__e = t.__c.base = r.__e;
                break;
              }
            return S(t);
          }
        }
        function E(t) {
          ((!t.__d && (t.__d = !0) && a.push(t) && !x.__r++) || c !== i.debounceRendering) &&
            ((c = i.debounceRendering) || u)(x);
        }
        function x() {
          for (var t; (x.__r = a.length); )
            (t = a.sort(function (t, e) {
              return t.__v.__b - e.__v.__b;
            })),
              (a = []),
              t.some(function (t) {
                var e, r, n, i, o, s;
                t.__d &&
                  ((o = (i = (e = t).__v).__e),
                  (s = e.__P) &&
                    ((r = []),
                    ((n = p({}, i)).__v = i.__v + 1),
                    N(
                      s,
                      i,
                      n,
                      e.__n,
                      void 0 !== s.ownerSVGElement,
                      null != i.__h ? [o] : null,
                      r,
                      null == o ? _(i) : o,
                      i.__h,
                    ),
                    j(r, i),
                    i.__e != o && S(i)));
              });
        }
        function M(t, e, r, n, i, o, s, a, u, c) {
          var l,
            d,
            p,
            y,
            g,
            m,
            w,
            S = (n && n.__k) || f,
            E = S.length;
          for (r.__k = [], l = 0; l < e.length; l++)
            if (
              null !=
              (y = r.__k[l] =
                null == (y = e[l]) || 'boolean' == typeof y
                  ? null
                  : 'string' == typeof y || 'number' == typeof y || 'bigint' == typeof y
                    ? b(null, y, null, null, y)
                    : Array.isArray(y)
                      ? b(v, { children: y }, null, null, null)
                      : y.__b > 0
                        ? b(y.type, y.props, y.key, null, y.__v)
                        : y)
            ) {
              if (((y.__ = r), (y.__b = r.__b + 1), null === (p = S[l]) || (p && y.key == p.key && y.type === p.type)))
                S[l] = void 0;
              else
                for (d = 0; d < E; d++) {
                  if ((p = S[d]) && y.key == p.key && y.type === p.type) {
                    S[d] = void 0;
                    break;
                  }
                  p = null;
                }
              N(t, y, (p = p || h), i, o, s, a, u, c),
                (g = y.__e),
                (d = y.ref) && p.ref != d && (w || (w = []), p.ref && w.push(p.ref, null, y), w.push(d, y.__c || g, y)),
                null != g
                  ? (null == m && (m = g),
                    'function' == typeof y.type && y.__k === p.__k
                      ? (y.__d = u = k(y, u, t))
                      : (u = C(t, y, p, S, g, u)),
                    'function' == typeof r.type && (r.__d = u))
                  : u && p.__e == u && u.parentNode != t && (u = _(p));
            }
          for (r.__e = m, l = E; l--; )
            null != S[l] &&
              ('function' == typeof r.type && null != S[l].__e && S[l].__e == r.__d && (r.__d = _(n, l + 1)),
              D(S[l], S[l]));
          if (w) for (l = 0; l < w.length; l++) P(w[l], w[++l], w[++l]);
        }
        function k(t, e, r) {
          for (var n, i = t.__k, o = 0; i && o < i.length; o++)
            (n = i[o]) && ((n.__ = t), (e = 'function' == typeof n.type ? k(n, e, r) : C(r, n, n, i, n.__e, e)));
          return e;
        }
        function A(t, e) {
          return (
            (e = e || []),
            null == t ||
              'boolean' == typeof t ||
              (Array.isArray(t)
                ? t.some(function (t) {
                    A(t, e);
                  })
                : e.push(t)),
            e
          );
        }
        function C(t, e, r, n, i, o) {
          var s, a, u;
          if (void 0 !== e.__d) (s = e.__d), (e.__d = void 0);
          else if (null == r || i != o || null == i.parentNode)
            t: if (null == o || o.parentNode !== t) t.appendChild(i), (s = null);
            else {
              for (a = o, u = 0; (a = a.nextSibling) && u < n.length; u += 2) if (a == i) break t;
              t.insertBefore(i, o), (s = o);
            }
          return void 0 !== s ? s : i.nextSibling;
        }
        function R(t, e, r) {
          '-' === e[0]
            ? t.setProperty(e, r)
            : (t[e] = null == r ? '' : 'number' != typeof r || d.test(e) ? r : r + 'px');
        }
        function I(t, e, r, n, i) {
          var o;
          t: if ('style' === e)
            if ('string' == typeof r) t.style.cssText = r;
            else {
              if (('string' == typeof n && (t.style.cssText = n = ''), n))
                for (e in n) (r && e in r) || R(t.style, e, '');
              if (r) for (e in r) (n && r[e] === n[e]) || R(t.style, e, r[e]);
            }
          else if ('o' === e[0] && 'n' === e[1])
            (o = e !== (e = e.replace(/Capture$/, ''))),
              (e = e.toLowerCase() in t ? e.toLowerCase().slice(2) : e.slice(2)),
              t.l || (t.l = {}),
              (t.l[e + o] = r),
              r ? n || t.addEventListener(e, o ? O : T, o) : t.removeEventListener(e, o ? O : T, o);
          else if ('dangerouslySetInnerHTML' !== e) {
            if (i) e = e.replace(/xlink(H|:h)/, 'h').replace(/sName$/, 's');
            else if ('href' !== e && 'list' !== e && 'form' !== e && 'tabIndex' !== e && 'download' !== e && e in t)
              try {
                t[e] = null == r ? '' : r;
                break t;
              } catch (t) {}
            'function' == typeof r ||
              (null != r && (!1 !== r || ('a' === e[0] && 'r' === e[1])) ? t.setAttribute(e, r) : t.removeAttribute(e));
          }
        }
        function T(t) {
          this.l[t.type + !1](i.event ? i.event(t) : t);
        }
        function O(t) {
          this.l[t.type + !0](i.event ? i.event(t) : t);
        }
        function N(t, e, r, n, o, s, a, u, c) {
          var l,
            h,
            f,
            d,
            y,
            g,
            b,
            m,
            _,
            S,
            E,
            x,
            k,
            A = e.type;
          if (void 0 !== e.constructor) return null;
          null != r.__h && ((c = r.__h), (u = e.__e = r.__e), (e.__h = null), (s = [u])), (l = i.__b) && l(e);
          try {
            t: if ('function' == typeof A) {
              if (
                ((m = e.props),
                (_ = (l = A.contextType) && n[l.__c]),
                (S = l ? (_ ? _.props.value : l.__) : n),
                r.__c
                  ? (b = (h = e.__c = r.__c).__ = h.__E)
                  : ('prototype' in A && A.prototype.render
                      ? (e.__c = h = new A(m, S))
                      : ((e.__c = h = new w(m, S)), (h.constructor = A), (h.render = B)),
                    _ && _.sub(h),
                    (h.props = m),
                    h.state || (h.state = {}),
                    (h.context = S),
                    (h.__n = n),
                    (f = h.__d = !0),
                    (h.__h = [])),
                null == h.__s && (h.__s = h.state),
                null != A.getDerivedStateFromProps &&
                  (h.__s == h.state && (h.__s = p({}, h.__s)), p(h.__s, A.getDerivedStateFromProps(m, h.__s))),
                (d = h.props),
                (y = h.state),
                f)
              )
                null == A.getDerivedStateFromProps && null != h.componentWillMount && h.componentWillMount(),
                  null != h.componentDidMount && h.__h.push(h.componentDidMount);
              else {
                if (
                  (null == A.getDerivedStateFromProps &&
                    m !== d &&
                    null != h.componentWillReceiveProps &&
                    h.componentWillReceiveProps(m, S),
                  (!h.__e && null != h.shouldComponentUpdate && !1 === h.shouldComponentUpdate(m, h.__s, S)) ||
                    e.__v === r.__v)
                ) {
                  (h.props = m),
                    (h.state = h.__s),
                    e.__v !== r.__v && (h.__d = !1),
                    (h.__v = e),
                    (e.__e = r.__e),
                    (e.__k = r.__k),
                    e.__k.forEach(function (t) {
                      t && (t.__ = e);
                    }),
                    h.__h.length && a.push(h);
                  break t;
                }
                null != h.componentWillUpdate && h.componentWillUpdate(m, h.__s, S),
                  null != h.componentDidUpdate &&
                    h.__h.push(function () {
                      h.componentDidUpdate(d, y, g);
                    });
              }
              if (
                ((h.context = S),
                (h.props = m),
                (h.__v = e),
                (h.__P = t),
                (E = i.__r),
                (x = 0),
                'prototype' in A && A.prototype.render)
              )
                (h.state = h.__s), (h.__d = !1), E && E(e), (l = h.render(h.props, h.state, h.context));
              else
                do {
                  (h.__d = !1), E && E(e), (l = h.render(h.props, h.state, h.context)), (h.state = h.__s);
                } while (h.__d && ++x < 25);
              (h.state = h.__s),
                null != h.getChildContext && (n = p(p({}, n), h.getChildContext())),
                f || null == h.getSnapshotBeforeUpdate || (g = h.getSnapshotBeforeUpdate(d, y)),
                (k = null != l && l.type === v && null == l.key ? l.props.children : l),
                M(t, Array.isArray(k) ? k : [k], e, r, n, o, s, a, u, c),
                (h.base = e.__e),
                (e.__h = null),
                h.__h.length && a.push(h),
                b && (h.__E = h.__ = null),
                (h.__e = !1);
            } else
              null == s && e.__v === r.__v
                ? ((e.__k = r.__k), (e.__e = r.__e))
                : (e.__e = L(r.__e, e, r, n, o, s, a, c));
            (l = i.diffed) && l(e);
          } catch (t) {
            (e.__v = null), (c || null != s) && ((e.__e = u), (e.__h = !!c), (s[s.indexOf(u)] = null)), i.__e(t, e, r);
          }
        }
        function j(t, e) {
          i.__c && i.__c(e, t),
            t.some(function (e) {
              try {
                (t = e.__h),
                  (e.__h = []),
                  t.some(function (t) {
                    t.call(e);
                  });
              } catch (t) {
                i.__e(t, e.__v);
              }
            });
        }
        function L(t, e, r, i, o, s, a, u) {
          var c,
            l,
            f,
            d = r.props,
            p = e.props,
            g = e.type,
            b = 0;
          if (('svg' === g && (o = !0), null != s))
            for (; b < s.length; b++)
              if ((c = s[b]) && 'setAttribute' in c == !!g && (g ? c.localName === g : 3 === c.nodeType)) {
                (t = c), (s[b] = null);
                break;
              }
          if (null == t) {
            if (null === g) return document.createTextNode(p);
            (t = o ? document.createElementNS('http://www.w3.org/2000/svg', g) : document.createElement(g, p.is && p)),
              (s = null),
              (u = !1);
          }
          if (null === g) d === p || (u && t.data === p) || (t.data = p);
          else {
            if (
              ((s = s && n.call(t.childNodes)),
              (l = (d = r.props || h).dangerouslySetInnerHTML),
              (f = p.dangerouslySetInnerHTML),
              !u)
            ) {
              if (null != s)
                for (d = {}, b = 0; b < t.attributes.length; b++) d[t.attributes[b].name] = t.attributes[b].value;
              (f || l) &&
                ((f && ((l && f.__html == l.__html) || f.__html === t.innerHTML)) ||
                  (t.innerHTML = (f && f.__html) || ''));
            }
            if (
              ((function (t, e, r, n, i) {
                var o;
                for (o in r) 'children' === o || 'key' === o || o in e || I(t, o, null, r[o], n);
                for (o in e)
                  (i && 'function' != typeof e[o]) ||
                    'children' === o ||
                    'key' === o ||
                    'value' === o ||
                    'checked' === o ||
                    r[o] === e[o] ||
                    I(t, o, e[o], r[o], n);
              })(t, p, d, o, u),
              f)
            )
              e.__k = [];
            else if (
              ((b = e.props.children),
              M(
                t,
                Array.isArray(b) ? b : [b],
                e,
                r,
                i,
                o && 'foreignObject' !== g,
                s,
                a,
                s ? s[0] : r.__k && _(r, 0),
                u,
              ),
              null != s)
            )
              for (b = s.length; b--; ) null != s[b] && y(s[b]);
            u ||
              ('value' in p &&
                void 0 !== (b = p.value) &&
                (b !== t.value || ('progress' === g && !b) || ('option' === g && b !== d.value)) &&
                I(t, 'value', b, d.value, !1),
              'checked' in p && void 0 !== (b = p.checked) && b !== t.checked && I(t, 'checked', b, d.checked, !1));
          }
          return t;
        }
        function P(t, e, r) {
          try {
            'function' == typeof t ? t(e) : (t.current = e);
          } catch (t) {
            i.__e(t, r);
          }
        }
        function D(t, e, r) {
          var n, o;
          if (
            (i.unmount && i.unmount(t),
            (n = t.ref) && ((n.current && n.current !== t.__e) || P(n, null, e)),
            null != (n = t.__c))
          ) {
            if (n.componentWillUnmount)
              try {
                n.componentWillUnmount();
              } catch (t) {
                i.__e(t, e);
              }
            n.base = n.__P = null;
          }
          if ((n = t.__k)) for (o = 0; o < n.length; o++) n[o] && D(n[o], e, 'function' != typeof t.type);
          r || null == t.__e || y(t.__e), (t.__e = t.__d = void 0);
        }
        function B(t, e, r) {
          return this.constructor(t, r);
        }
        function U(t, e, r) {
          var o, s, a;
          i.__ && i.__(t, e),
            (s = (o = 'function' == typeof r) ? null : (r && r.__k) || e.__k),
            (a = []),
            N(
              e,
              (t = ((!o && r) || e).__k = g(v, null, [t])),
              s || h,
              h,
              void 0 !== e.ownerSVGElement,
              !o && r ? [r] : s ? null : e.firstChild ? n.call(e.childNodes) : null,
              a,
              !o && r ? r : s ? s.__e : e.firstChild,
              o,
            ),
            j(a, t);
        }
        function F(t, e) {
          U(t, e, F);
        }
        function H(t, e, r) {
          var i,
            o,
            s,
            a = p({}, t.props);
          for (s in e) 'key' == s ? (i = e[s]) : 'ref' == s ? (o = e[s]) : (a[s] = e[s]);
          return (
            arguments.length > 2 && (a.children = arguments.length > 3 ? n.call(arguments, 2) : r),
            b(t.type, a, i || t.key, o || t.ref, null)
          );
        }
        function W(t, e) {
          var r = {
            __c: (e = '__cC' + l++),
            __: t,
            Consumer: function (t, e) {
              return t.children(e);
            },
            Provider: function (t) {
              var r, n;
              return (
                this.getChildContext ||
                  ((r = []),
                  ((n = {})[e] = this),
                  (this.getChildContext = function () {
                    return n;
                  }),
                  (this.shouldComponentUpdate = function (t) {
                    this.props.value !== t.value && r.some(E);
                  }),
                  (this.sub = function (t) {
                    r.push(t);
                    var e = t.componentWillUnmount;
                    t.componentWillUnmount = function () {
                      r.splice(r.indexOf(t), 1), e && e.call(t);
                    };
                  })),
                t.children
              );
            },
          };
          return (r.Provider.__ = r.Consumer.contextType = r);
        }
        (n = f.slice),
          (i = {
            __e: function (t, e, r, n) {
              for (var i, o, s; (e = e.__); )
                if ((i = e.__c) && !i.__)
                  try {
                    if (
                      ((o = i.constructor) &&
                        null != o.getDerivedStateFromError &&
                        (i.setState(o.getDerivedStateFromError(t)), (s = i.__d)),
                      null != i.componentDidCatch && (i.componentDidCatch(t, n || {}), (s = i.__d)),
                      s)
                    )
                      return (i.__E = i);
                  } catch (e) {
                    t = e;
                  }
              throw t;
            },
          }),
          (o = 0),
          (s = function (t) {
            return null != t && void 0 === t.constructor;
          }),
          (w.prototype.setState = function (t, e) {
            var r;
            (r = null != this.__s && this.__s !== this.state ? this.__s : (this.__s = p({}, this.state))),
              'function' == typeof t && (t = t(p({}, r), this.props)),
              t && p(r, t),
              null != t && this.__v && (e && this.__h.push(e), E(this));
          }),
          (w.prototype.forceUpdate = function (t) {
            this.__v && ((this.__e = !0), t && this.__h.push(t), E(this));
          }),
          (w.prototype.render = v),
          (a = []),
          (u = 'function' == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout),
          (x.__r = 0),
          (l = 0);
      },
      396: (t, e, r) => {
        'use strict';
        r.r(e),
          r.d(e, {
            useCallback: () => E,
            useContext: () => x,
            useDebugValue: () => M,
            useEffect: () => m,
            useErrorBoundary: () => k,
            useImperativeHandle: () => _,
            useLayoutEffect: () => v,
            useMemo: () => S,
            useReducer: () => b,
            useRef: () => w,
            useState: () => g,
          });
        var n,
          i,
          o,
          s,
          a = r(6400),
          u = 0,
          c = [],
          l = a.options.__b,
          h = a.options.__r,
          f = a.options.diffed,
          d = a.options.__c,
          p = a.options.unmount;
        function y(t, e) {
          a.options.__h && a.options.__h(i, t, u || e), (u = 0);
          var r = i.__H || (i.__H = { __: [], __h: [] });
          return t >= r.__.length && r.__.push({}), r.__[t];
        }
        function g(t) {
          return (u = 1), b(O, t);
        }
        function b(t, e, r) {
          var o = y(n++, 2);
          return (
            (o.t = t),
            o.__c ||
              ((o.__ = [
                r ? r(e) : O(void 0, e),
                function (t) {
                  var e = o.t(o.__[0], t);
                  o.__[0] !== e && ((o.__ = [e, o.__[1]]), o.__c.setState({}));
                },
              ]),
              (o.__c = i)),
            o.__
          );
        }
        function m(t, e) {
          var r = y(n++, 3);
          !a.options.__s && T(r.__H, e) && ((r.__ = t), (r.u = e), i.__H.__h.push(r));
        }
        function v(t, e) {
          var r = y(n++, 4);
          !a.options.__s && T(r.__H, e) && ((r.__ = t), (r.u = e), i.__h.push(r));
        }
        function w(t) {
          return (
            (u = 5),
            S(function () {
              return { current: t };
            }, [])
          );
        }
        function _(t, e, r) {
          (u = 6),
            v(
              function () {
                return 'function' == typeof t
                  ? (t(e()),
                    function () {
                      return t(null);
                    })
                  : t
                    ? ((t.current = e()),
                      function () {
                        return (t.current = null);
                      })
                    : void 0;
              },
              null == r ? r : r.concat(t),
            );
        }
        function S(t, e) {
          var r = y(n++, 7);
          return T(r.__H, e) ? ((r.o = t()), (r.u = e), (r.__h = t), r.o) : r.__;
        }
        function E(t, e) {
          return (
            (u = 8),
            S(function () {
              return t;
            }, e)
          );
        }
        function x(t) {
          var e = i.context[t.__c],
            r = y(n++, 9);
          return (r.c = t), e ? (null == r.__ && ((r.__ = !0), e.sub(i)), e.props.value) : t.__;
        }
        function M(t, e) {
          a.options.useDebugValue && a.options.useDebugValue(e ? e(t) : t);
        }
        function k(t) {
          var e = y(n++, 10),
            r = g();
          return (
            (e.__ = t),
            i.componentDidCatch ||
              (i.componentDidCatch = function (t) {
                e.__ && e.__(t), r[1](t);
              }),
            [
              r[0],
              function () {
                r[1](void 0);
              },
            ]
          );
        }
        function A() {
          for (var t; (t = c.shift()); )
            if (t.__P)
              try {
                t.__H.__h.forEach(R), t.__H.__h.forEach(I), (t.__H.__h = []);
              } catch (e) {
                (t.__H.__h = []), a.options.__e(e, t.__v);
              }
        }
        (a.options.__b = function (t) {
          (i = null), l && l(t);
        }),
          (a.options.__r = function (t) {
            h && h(t), (n = 0);
            var e = (i = t.__c).__H;
            e &&
              (o === i
                ? ((e.__h = []),
                  (i.__h = []),
                  e.__.forEach(function (t) {
                    t.o = t.u = void 0;
                  }))
                : (e.__.forEach(function (t) {
                    t.u && (t.__H = t.u), t.o && (t.__ = t.o), (t.o = t.u = void 0);
                  }),
                  e.__h.forEach(R),
                  e.__h.forEach(I),
                  (e.__h = []))),
              (o = i);
          }),
          (a.options.diffed = function (t) {
            f && f(t);
            var e = t.__c;
            e &&
              e.__H &&
              e.__H.__h.length &&
              ((1 !== c.push(e) && s === a.options.requestAnimationFrame) ||
                (
                  (s = a.options.requestAnimationFrame) ||
                  function (t) {
                    var e,
                      r = function () {
                        clearTimeout(n), C && cancelAnimationFrame(e), setTimeout(t);
                      },
                      n = setTimeout(r, 100);
                    C && (e = requestAnimationFrame(r));
                  }
                )(A)),
              (i = null),
              (o = null);
          }),
          (a.options.__c = function (t, e) {
            e.some(function (t) {
              try {
                t.__H &&
                  t.__H.__.forEach(function (t) {
                    t.u && (t.__H = t.u), t.o && (t.__ = t.o), (t.o = t.u = void 0);
                  }),
                  t.__h.forEach(R),
                  (t.__h = t.__h.filter(function (t) {
                    return !t.__ || I(t);
                  }));
              } catch (r) {
                e.some(function (t) {
                  t.__h && (t.__h = []);
                }),
                  (e = []),
                  a.options.__e(r, t.__v);
              }
            }),
              d && d(t, e);
          }),
          (a.options.unmount = function (t) {
            p && p(t);
            var e,
              r = t.__c;
            r &&
              r.__H &&
              (r.__H.__.forEach(function (t) {
                try {
                  R(t);
                } catch (t) {
                  e = t;
                }
              }),
              e && a.options.__e(e, r.__v));
          });
        var C = 'function' == typeof requestAnimationFrame;
        function R(t) {
          var e = i,
            r = t.__c;
          'function' == typeof r && ((t.__c = void 0), r()), (i = e);
        }
        function I(t) {
          var e = i;
          (t.__c = t.__()), (i = e);
        }
        function T(t, e) {
          return (
            !t ||
            t.length !== e.length ||
            e.some(function (e, r) {
              return e !== t[r];
            })
          );
        }
        function O(t, e) {
          return 'function' == typeof e ? e(t) : e;
        }
      },
      5798: (t) => {
        'use strict';
        var e = String.prototype.replace,
          r = /%20/g,
          n = 'RFC3986';
        t.exports = {
          default: n,
          formatters: {
            RFC1738: function (t) {
              return e.call(t, r, '+');
            },
            RFC3986: function (t) {
              return String(t);
            },
          },
          RFC1738: 'RFC1738',
          RFC3986: n,
        };
      },
      129: (t, e, r) => {
        'use strict';
        var n = r(8261),
          i = r(5235),
          o = r(5798);
        t.exports = { formats: o, parse: i, stringify: n };
      },
      5235: (t, e, r) => {
        'use strict';
        var n = r(2769),
          i = Object.prototype.hasOwnProperty,
          o = Array.isArray,
          s = {
            allowDots: !1,
            allowPrototypes: !1,
            allowSparse: !1,
            arrayLimit: 20,
            charset: 'utf-8',
            charsetSentinel: !1,
            comma: !1,
            decoder: n.decode,
            delimiter: '&',
            depth: 5,
            ignoreQueryPrefix: !1,
            interpretNumericEntities: !1,
            parameterLimit: 1e3,
            parseArrays: !0,
            plainObjects: !1,
            strictNullHandling: !1,
          },
          a = function (t) {
            return t.replace(/&#(\d+);/g, function (t, e) {
              return String.fromCharCode(parseInt(e, 10));
            });
          },
          u = function (t, e) {
            return t && 'string' == typeof t && e.comma && t.indexOf(',') > -1 ? t.split(',') : t;
          },
          c = function (t, e, r, n) {
            if (t) {
              var o = r.allowDots ? t.replace(/\.([^.[]+)/g, '[$1]') : t,
                s = /(\[[^[\]]*])/g,
                a = r.depth > 0 && /(\[[^[\]]*])/.exec(o),
                c = a ? o.slice(0, a.index) : o,
                l = [];
              if (c) {
                if (!r.plainObjects && i.call(Object.prototype, c) && !r.allowPrototypes) return;
                l.push(c);
              }
              for (var h = 0; r.depth > 0 && null !== (a = s.exec(o)) && h < r.depth; ) {
                if (((h += 1), !r.plainObjects && i.call(Object.prototype, a[1].slice(1, -1)) && !r.allowPrototypes))
                  return;
                l.push(a[1]);
              }
              return (
                a && l.push('[' + o.slice(a.index) + ']'),
                (function (t, e, r, n) {
                  for (var i = n ? e : u(e, r), o = t.length - 1; o >= 0; --o) {
                    var s,
                      a = t[o];
                    if ('[]' === a && r.parseArrays) s = [].concat(i);
                    else {
                      s = r.plainObjects ? Object.create(null) : {};
                      var c = '[' === a.charAt(0) && ']' === a.charAt(a.length - 1) ? a.slice(1, -1) : a,
                        l = parseInt(c, 10);
                      r.parseArrays || '' !== c
                        ? !isNaN(l) && a !== c && String(l) === c && l >= 0 && r.parseArrays && l <= r.arrayLimit
                          ? ((s = [])[l] = i)
                          : '__proto__' !== c && (s[c] = i)
                        : (s = { 0: i });
                    }
                    i = s;
                  }
                  return i;
                })(l, e, r, n)
              );
            }
          };
        t.exports = function (t, e) {
          var r = (function (t) {
            if (!t) return s;
            if (null !== t.decoder && void 0 !== t.decoder && 'function' != typeof t.decoder)
              throw new TypeError('Decoder has to be a function.');
            if (void 0 !== t.charset && 'utf-8' !== t.charset && 'iso-8859-1' !== t.charset)
              throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
            var e = void 0 === t.charset ? s.charset : t.charset;
            return {
              allowDots: void 0 === t.allowDots ? s.allowDots : !!t.allowDots,
              allowPrototypes: 'boolean' == typeof t.allowPrototypes ? t.allowPrototypes : s.allowPrototypes,
              allowSparse: 'boolean' == typeof t.allowSparse ? t.allowSparse : s.allowSparse,
              arrayLimit: 'number' == typeof t.arrayLimit ? t.arrayLimit : s.arrayLimit,
              charset: e,
              charsetSentinel: 'boolean' == typeof t.charsetSentinel ? t.charsetSentinel : s.charsetSentinel,
              comma: 'boolean' == typeof t.comma ? t.comma : s.comma,
              decoder: 'function' == typeof t.decoder ? t.decoder : s.decoder,
              delimiter: 'string' == typeof t.delimiter || n.isRegExp(t.delimiter) ? t.delimiter : s.delimiter,
              depth: 'number' == typeof t.depth || !1 === t.depth ? +t.depth : s.depth,
              ignoreQueryPrefix: !0 === t.ignoreQueryPrefix,
              interpretNumericEntities:
                'boolean' == typeof t.interpretNumericEntities
                  ? t.interpretNumericEntities
                  : s.interpretNumericEntities,
              parameterLimit: 'number' == typeof t.parameterLimit ? t.parameterLimit : s.parameterLimit,
              parseArrays: !1 !== t.parseArrays,
              plainObjects: 'boolean' == typeof t.plainObjects ? t.plainObjects : s.plainObjects,
              strictNullHandling:
                'boolean' == typeof t.strictNullHandling ? t.strictNullHandling : s.strictNullHandling,
            };
          })(e);
          if ('' === t || null == t) return r.plainObjects ? Object.create(null) : {};
          for (
            var l =
                'string' == typeof t
                  ? (function (t, e) {
                      var r,
                        c = {},
                        l = e.ignoreQueryPrefix ? t.replace(/^\?/, '') : t,
                        h = e.parameterLimit === 1 / 0 ? void 0 : e.parameterLimit,
                        f = l.split(e.delimiter, h),
                        d = -1,
                        p = e.charset;
                      if (e.charsetSentinel)
                        for (r = 0; r < f.length; ++r)
                          0 === f[r].indexOf('utf8=') &&
                            ('utf8=%E2%9C%93' === f[r]
                              ? (p = 'utf-8')
                              : 'utf8=%26%2310003%3B' === f[r] && (p = 'iso-8859-1'),
                            (d = r),
                            (r = f.length));
                      for (r = 0; r < f.length; ++r)
                        if (r !== d) {
                          var y,
                            g,
                            b = f[r],
                            m = b.indexOf(']='),
                            v = -1 === m ? b.indexOf('=') : m + 1;
                          -1 === v
                            ? ((y = e.decoder(b, s.decoder, p, 'key')), (g = e.strictNullHandling ? null : ''))
                            : ((y = e.decoder(b.slice(0, v), s.decoder, p, 'key')),
                              (g = n.maybeMap(u(b.slice(v + 1), e), function (t) {
                                return e.decoder(t, s.decoder, p, 'value');
                              }))),
                            g && e.interpretNumericEntities && 'iso-8859-1' === p && (g = a(g)),
                            b.indexOf('[]=') > -1 && (g = o(g) ? [g] : g),
                            i.call(c, y) ? (c[y] = n.combine(c[y], g)) : (c[y] = g);
                        }
                      return c;
                    })(t, r)
                  : t,
              h = r.plainObjects ? Object.create(null) : {},
              f = Object.keys(l),
              d = 0;
            d < f.length;
            ++d
          ) {
            var p = f[d],
              y = c(p, l[p], r, 'string' == typeof t);
            h = n.merge(h, y, r);
          }
          return !0 === r.allowSparse ? h : n.compact(h);
        };
      },
      8261: (t, e, r) => {
        'use strict';
        var n = r(7478),
          i = r(2769),
          o = r(5798),
          s = Object.prototype.hasOwnProperty,
          a = {
            brackets: function (t) {
              return t + '[]';
            },
            comma: 'comma',
            indices: function (t, e) {
              return t + '[' + e + ']';
            },
            repeat: function (t) {
              return t;
            },
          },
          u = Array.isArray,
          c = String.prototype.split,
          l = Array.prototype.push,
          h = function (t, e) {
            l.apply(t, u(e) ? e : [e]);
          },
          f = Date.prototype.toISOString,
          d = o.default,
          p = {
            addQueryPrefix: !1,
            allowDots: !1,
            charset: 'utf-8',
            charsetSentinel: !1,
            delimiter: '&',
            encode: !0,
            encoder: i.encode,
            encodeValuesOnly: !1,
            format: d,
            formatter: o.formatters[d],
            indices: !1,
            serializeDate: function (t) {
              return f.call(t);
            },
            skipNulls: !1,
            strictNullHandling: !1,
          },
          y = {},
          g = function t(e, r, o, s, a, l, f, d, g, b, m, v, w, _, S) {
            for (var E, x = e, M = S, k = 0, A = !1; void 0 !== (M = M.get(y)) && !A; ) {
              var C = M.get(e);
              if (((k += 1), void 0 !== C)) {
                if (C === k) throw new RangeError('Cyclic object value');
                A = !0;
              }
              void 0 === M.get(y) && (k = 0);
            }
            if (
              ('function' == typeof f
                ? (x = f(r, x))
                : x instanceof Date
                  ? (x = b(x))
                  : 'comma' === o &&
                    u(x) &&
                    (x = i.maybeMap(x, function (t) {
                      return t instanceof Date ? b(t) : t;
                    })),
              null === x)
            ) {
              if (s) return l && !w ? l(r, p.encoder, _, 'key', m) : r;
              x = '';
            }
            if (
              'string' == typeof (E = x) ||
              'number' == typeof E ||
              'boolean' == typeof E ||
              'symbol' == typeof E ||
              'bigint' == typeof E ||
              i.isBuffer(x)
            ) {
              if (l) {
                var R = w ? r : l(r, p.encoder, _, 'key', m);
                if ('comma' === o && w) {
                  for (var I = c.call(String(x), ','), T = '', O = 0; O < I.length; ++O)
                    T += (0 === O ? '' : ',') + v(l(I[O], p.encoder, _, 'value', m));
                  return [v(R) + (u(x) && 1 === I.length ? '[]' : '') + '=' + T];
                }
                return [v(R) + '=' + v(l(x, p.encoder, _, 'value', m))];
              }
              return [v(r) + '=' + v(String(x))];
            }
            var N,
              j = [];
            if (void 0 === x) return j;
            if ('comma' === o && u(x)) N = [{ value: x.length > 0 ? x.join(',') || null : void 0 }];
            else if (u(f)) N = f;
            else {
              var L = Object.keys(x);
              N = d ? L.sort(d) : L;
            }
            for (var P = 'comma' === o && u(x) && 1 === x.length ? r + '[]' : r, D = 0; D < N.length; ++D) {
              var B = N[D],
                U = 'object' == typeof B && void 0 !== B.value ? B.value : x[B];
              if (!a || null !== U) {
                var F = u(x) ? ('function' == typeof o ? o(P, B) : P) : P + (g ? '.' + B : '[' + B + ']');
                S.set(e, k);
                var H = n();
                H.set(y, S), h(j, t(U, F, o, s, a, l, f, d, g, b, m, v, w, _, H));
              }
            }
            return j;
          };
        t.exports = function (t, e) {
          var r,
            i = t,
            c = (function (t) {
              if (!t) return p;
              if (null !== t.encoder && void 0 !== t.encoder && 'function' != typeof t.encoder)
                throw new TypeError('Encoder has to be a function.');
              var e = t.charset || p.charset;
              if (void 0 !== t.charset && 'utf-8' !== t.charset && 'iso-8859-1' !== t.charset)
                throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
              var r = o.default;
              if (void 0 !== t.format) {
                if (!s.call(o.formatters, t.format)) throw new TypeError('Unknown format option provided.');
                r = t.format;
              }
              var n = o.formatters[r],
                i = p.filter;
              return (
                ('function' == typeof t.filter || u(t.filter)) && (i = t.filter),
                {
                  addQueryPrefix: 'boolean' == typeof t.addQueryPrefix ? t.addQueryPrefix : p.addQueryPrefix,
                  allowDots: void 0 === t.allowDots ? p.allowDots : !!t.allowDots,
                  charset: e,
                  charsetSentinel: 'boolean' == typeof t.charsetSentinel ? t.charsetSentinel : p.charsetSentinel,
                  delimiter: void 0 === t.delimiter ? p.delimiter : t.delimiter,
                  encode: 'boolean' == typeof t.encode ? t.encode : p.encode,
                  encoder: 'function' == typeof t.encoder ? t.encoder : p.encoder,
                  encodeValuesOnly: 'boolean' == typeof t.encodeValuesOnly ? t.encodeValuesOnly : p.encodeValuesOnly,
                  filter: i,
                  format: r,
                  formatter: n,
                  serializeDate: 'function' == typeof t.serializeDate ? t.serializeDate : p.serializeDate,
                  skipNulls: 'boolean' == typeof t.skipNulls ? t.skipNulls : p.skipNulls,
                  sort: 'function' == typeof t.sort ? t.sort : null,
                  strictNullHandling:
                    'boolean' == typeof t.strictNullHandling ? t.strictNullHandling : p.strictNullHandling,
                }
              );
            })(e);
          'function' == typeof c.filter ? (i = (0, c.filter)('', i)) : u(c.filter) && (r = c.filter);
          var l,
            f = [];
          if ('object' != typeof i || null === i) return '';
          l =
            e && e.arrayFormat in a
              ? e.arrayFormat
              : e && 'indices' in e
                ? e.indices
                  ? 'indices'
                  : 'repeat'
                : 'indices';
          var d = a[l];
          r || (r = Object.keys(i)), c.sort && r.sort(c.sort);
          for (var y = n(), b = 0; b < r.length; ++b) {
            var m = r[b];
            (c.skipNulls && null === i[m]) ||
              h(
                f,
                g(
                  i[m],
                  m,
                  d,
                  c.strictNullHandling,
                  c.skipNulls,
                  c.encode ? c.encoder : null,
                  c.filter,
                  c.sort,
                  c.allowDots,
                  c.serializeDate,
                  c.format,
                  c.formatter,
                  c.encodeValuesOnly,
                  c.charset,
                  y,
                ),
              );
          }
          var v = f.join(c.delimiter),
            w = !0 === c.addQueryPrefix ? '?' : '';
          return (
            c.charsetSentinel &&
              ('iso-8859-1' === c.charset ? (w += 'utf8=%26%2310003%3B&') : (w += 'utf8=%E2%9C%93&')),
            v.length > 0 ? w + v : ''
          );
        };
      },
      2769: (t, e, r) => {
        'use strict';
        var n = r(5798),
          i = Object.prototype.hasOwnProperty,
          o = Array.isArray,
          s = (function () {
            for (var t = [], e = 0; e < 256; ++e) t.push('%' + ((e < 16 ? '0' : '') + e.toString(16)).toUpperCase());
            return t;
          })(),
          a = function (t, e) {
            for (var r = e && e.plainObjects ? Object.create(null) : {}, n = 0; n < t.length; ++n)
              void 0 !== t[n] && (r[n] = t[n]);
            return r;
          };
        t.exports = {
          arrayToObject: a,
          assign: function (t, e) {
            return Object.keys(e).reduce(function (t, r) {
              return (t[r] = e[r]), t;
            }, t);
          },
          combine: function (t, e) {
            return [].concat(t, e);
          },
          compact: function (t) {
            for (var e = [{ obj: { o: t }, prop: 'o' }], r = [], n = 0; n < e.length; ++n)
              for (var i = e[n], s = i.obj[i.prop], a = Object.keys(s), u = 0; u < a.length; ++u) {
                var c = a[u],
                  l = s[c];
                'object' == typeof l && null !== l && -1 === r.indexOf(l) && (e.push({ obj: s, prop: c }), r.push(l));
              }
            return (
              (function (t) {
                for (; t.length > 1; ) {
                  var e = t.pop(),
                    r = e.obj[e.prop];
                  if (o(r)) {
                    for (var n = [], i = 0; i < r.length; ++i) void 0 !== r[i] && n.push(r[i]);
                    e.obj[e.prop] = n;
                  }
                }
              })(e),
              t
            );
          },
          decode: function (t, e, r) {
            var n = t.replace(/\+/g, ' ');
            if ('iso-8859-1' === r) return n.replace(/%[0-9a-f]{2}/gi, unescape);
            try {
              return decodeURIComponent(n);
            } catch (t) {
              return n;
            }
          },
          encode: function (t, e, r, i, o) {
            if (0 === t.length) return t;
            var a = t;
            if (
              ('symbol' == typeof t ? (a = Symbol.prototype.toString.call(t)) : 'string' != typeof t && (a = String(t)),
              'iso-8859-1' === r)
            )
              return escape(a).replace(/%u[0-9a-f]{4}/gi, function (t) {
                return '%26%23' + parseInt(t.slice(2), 16) + '%3B';
              });
            for (var u = '', c = 0; c < a.length; ++c) {
              var l = a.charCodeAt(c);
              45 === l ||
              46 === l ||
              95 === l ||
              126 === l ||
              (l >= 48 && l <= 57) ||
              (l >= 65 && l <= 90) ||
              (l >= 97 && l <= 122) ||
              (o === n.RFC1738 && (40 === l || 41 === l))
                ? (u += a.charAt(c))
                : l < 128
                  ? (u += s[l])
                  : l < 2048
                    ? (u += s[192 | (l >> 6)] + s[128 | (63 & l)])
                    : l < 55296 || l >= 57344
                      ? (u += s[224 | (l >> 12)] + s[128 | ((l >> 6) & 63)] + s[128 | (63 & l)])
                      : ((c += 1),
                        (l = 65536 + (((1023 & l) << 10) | (1023 & a.charCodeAt(c)))),
                        (u +=
                          s[240 | (l >> 18)] +
                          s[128 | ((l >> 12) & 63)] +
                          s[128 | ((l >> 6) & 63)] +
                          s[128 | (63 & l)]));
            }
            return u;
          },
          isBuffer: function (t) {
            return !(
              !t ||
              'object' != typeof t ||
              !(t.constructor && t.constructor.isBuffer && t.constructor.isBuffer(t))
            );
          },
          isRegExp: function (t) {
            return '[object RegExp]' === Object.prototype.toString.call(t);
          },
          maybeMap: function (t, e) {
            if (o(t)) {
              for (var r = [], n = 0; n < t.length; n += 1) r.push(e(t[n]));
              return r;
            }
            return e(t);
          },
          merge: function t(e, r, n) {
            if (!r) return e;
            if ('object' != typeof r) {
              if (o(e)) e.push(r);
              else {
                if (!e || 'object' != typeof e) return [e, r];
                ((n && (n.plainObjects || n.allowPrototypes)) || !i.call(Object.prototype, r)) && (e[r] = !0);
              }
              return e;
            }
            if (!e || 'object' != typeof e) return [e].concat(r);
            var s = e;
            return (
              o(e) && !o(r) && (s = a(e, n)),
              o(e) && o(r)
                ? (r.forEach(function (r, o) {
                    if (i.call(e, o)) {
                      var s = e[o];
                      s && 'object' == typeof s && r && 'object' == typeof r ? (e[o] = t(s, r, n)) : e.push(r);
                    } else e[o] = r;
                  }),
                  e)
                : Object.keys(r).reduce(function (e, o) {
                    var s = r[o];
                    return i.call(e, o) ? (e[o] = t(e[o], s, n)) : (e[o] = s), e;
                  }, s)
            );
          },
        };
      },
      4281: (t) => {
        'use strict';
        var e = {};
        function r(t, r, n) {
          n || (n = Error);
          var i = (function (t) {
            var e, n;
            function i(e, n, i) {
              return (
                t.call(
                  this,
                  (function (t, e, n) {
                    return 'string' == typeof r ? r : r(t, e, n);
                  })(e, n, i),
                ) || this
              );
            }
            return (
              (n = t),
              ((e = i).prototype = Object.create(n.prototype)),
              (e.prototype.constructor = e),
              (e.__proto__ = n),
              i
            );
          })(n);
          (i.prototype.name = n.name), (i.prototype.code = t), (e[t] = i);
        }
        function n(t, e) {
          if (Array.isArray(t)) {
            var r = t.length;
            return (
              (t = t.map(function (t) {
                return String(t);
              })),
              r > 2
                ? 'one of '.concat(e, ' ').concat(t.slice(0, r - 1).join(', '), ', or ') + t[r - 1]
                : 2 === r
                  ? 'one of '.concat(e, ' ').concat(t[0], ' or ').concat(t[1])
                  : 'of '.concat(e, ' ').concat(t[0])
            );
          }
          return 'of '.concat(e, ' ').concat(String(t));
        }
        r(
          'ERR_INVALID_OPT_VALUE',
          function (t, e) {
            return 'The value "' + e + '" is invalid for option "' + t + '"';
          },
          TypeError,
        ),
          r(
            'ERR_INVALID_ARG_TYPE',
            function (t, e, r) {
              var i, o, s, a, u;
              if (
                ('string' == typeof e && ((o = 'not '), e.substr(0, o.length) === o)
                  ? ((i = 'must not be'), (e = e.replace(/^not /, '')))
                  : (i = 'must be'),
                (function (t, e, r) {
                  return (void 0 === r || r > t.length) && (r = t.length), t.substring(r - e.length, r) === e;
                })(t, ' argument'))
              )
                s = 'The '.concat(t, ' ').concat(i, ' ').concat(n(e, 'type'));
              else {
                var c =
                  ('number' != typeof u && (u = 0),
                  u + '.'.length > (a = t).length || -1 === a.indexOf('.', u) ? 'argument' : 'property');
                s = 'The "'.concat(t, '" ').concat(c, ' ').concat(i, ' ').concat(n(e, 'type'));
              }
              return s + '. Received type '.concat(typeof r);
            },
            TypeError,
          ),
          r('ERR_STREAM_PUSH_AFTER_EOF', 'stream.push() after EOF'),
          r('ERR_METHOD_NOT_IMPLEMENTED', function (t) {
            return 'The ' + t + ' method is not implemented';
          }),
          r('ERR_STREAM_PREMATURE_CLOSE', 'Premature close'),
          r('ERR_STREAM_DESTROYED', function (t) {
            return 'Cannot call ' + t + ' after a stream was destroyed';
          }),
          r('ERR_MULTIPLE_CALLBACK', 'Callback called multiple times'),
          r('ERR_STREAM_CANNOT_PIPE', 'Cannot pipe, not readable'),
          r('ERR_STREAM_WRITE_AFTER_END', 'write after end'),
          r('ERR_STREAM_NULL_VALUES', 'May not write null values to stream', TypeError),
          r(
            'ERR_UNKNOWN_ENCODING',
            function (t) {
              return 'Unknown encoding: ' + t;
            },
            TypeError,
          ),
          r('ERR_STREAM_UNSHIFT_AFTER_END_EVENT', 'stream.unshift() after end event'),
          (t.exports.q = e);
      },
      6753: (t, e, r) => {
        'use strict';
        var n =
          Object.keys ||
          function (t) {
            var e = [];
            for (var r in t) e.push(r);
            return e;
          };
        t.exports = c;
        var i = r(9481),
          o = r(4229);
        r(5717)(c, i);
        for (var s = n(o.prototype), a = 0; a < s.length; a++) {
          var u = s[a];
          c.prototype[u] || (c.prototype[u] = o.prototype[u]);
        }
        function c(t) {
          if (!(this instanceof c)) return new c(t);
          i.call(this, t),
            o.call(this, t),
            (this.allowHalfOpen = !0),
            t &&
              (!1 === t.readable && (this.readable = !1),
              !1 === t.writable && (this.writable = !1),
              !1 === t.allowHalfOpen && ((this.allowHalfOpen = !1), this.once('end', l)));
        }
        function l() {
          this._writableState.ended || process.nextTick(h, this);
        }
        function h(t) {
          t.end();
        }
        Object.defineProperty(c.prototype, 'writableHighWaterMark', {
          enumerable: !1,
          get: function () {
            return this._writableState.highWaterMark;
          },
        }),
          Object.defineProperty(c.prototype, 'writableBuffer', {
            enumerable: !1,
            get: function () {
              return this._writableState && this._writableState.getBuffer();
            },
          }),
          Object.defineProperty(c.prototype, 'writableLength', {
            enumerable: !1,
            get: function () {
              return this._writableState.length;
            },
          }),
          Object.defineProperty(c.prototype, 'destroyed', {
            enumerable: !1,
            get: function () {
              return (
                void 0 !== this._readableState &&
                void 0 !== this._writableState &&
                this._readableState.destroyed &&
                this._writableState.destroyed
              );
            },
            set: function (t) {
              void 0 !== this._readableState &&
                void 0 !== this._writableState &&
                ((this._readableState.destroyed = t), (this._writableState.destroyed = t));
            },
          });
      },
      2725: (t, e, r) => {
        'use strict';
        t.exports = i;
        var n = r(4605);
        function i(t) {
          if (!(this instanceof i)) return new i(t);
          n.call(this, t);
        }
        r(5717)(i, n),
          (i.prototype._transform = function (t, e, r) {
            r(null, t);
          });
      },
      9481: (t, e, r) => {
        'use strict';
        var n;
        (t.exports = x), (x.ReadableState = E), r(7187).EventEmitter;
        var i,
          o = function (t, e) {
            return t.listeners(e).length;
          },
          s = r(2503),
          a = r(8764).Buffer,
          u = r.g.Uint8Array || function () {},
          c = r(4616);
        i = c && c.debuglog ? c.debuglog('stream') : function () {};
        var l,
          h,
          f,
          d = r(7327),
          p = r(1195),
          y = r(2457).getHighWaterMark,
          g = r(4281).q,
          b = g.ERR_INVALID_ARG_TYPE,
          m = g.ERR_STREAM_PUSH_AFTER_EOF,
          v = g.ERR_METHOD_NOT_IMPLEMENTED,
          w = g.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
        r(5717)(x, s);
        var _ = p.errorOrDestroy,
          S = ['error', 'close', 'destroy', 'pause', 'resume'];
        function E(t, e, i) {
          (n = n || r(6753)),
            (t = t || {}),
            'boolean' != typeof i && (i = e instanceof n),
            (this.objectMode = !!t.objectMode),
            i && (this.objectMode = this.objectMode || !!t.readableObjectMode),
            (this.highWaterMark = y(this, t, 'readableHighWaterMark', i)),
            (this.buffer = new d()),
            (this.length = 0),
            (this.pipes = null),
            (this.pipesCount = 0),
            (this.flowing = null),
            (this.ended = !1),
            (this.endEmitted = !1),
            (this.reading = !1),
            (this.sync = !0),
            (this.needReadable = !1),
            (this.emittedReadable = !1),
            (this.readableListening = !1),
            (this.resumeScheduled = !1),
            (this.paused = !0),
            (this.emitClose = !1 !== t.emitClose),
            (this.autoDestroy = !!t.autoDestroy),
            (this.destroyed = !1),
            (this.defaultEncoding = t.defaultEncoding || 'utf8'),
            (this.awaitDrain = 0),
            (this.readingMore = !1),
            (this.decoder = null),
            (this.encoding = null),
            t.encoding && (l || (l = r(2553).s), (this.decoder = new l(t.encoding)), (this.encoding = t.encoding));
        }
        function x(t) {
          if (((n = n || r(6753)), !(this instanceof x))) return new x(t);
          var e = this instanceof n;
          (this._readableState = new E(t, this, e)),
            (this.readable = !0),
            t &&
              ('function' == typeof t.read && (this._read = t.read),
              'function' == typeof t.destroy && (this._destroy = t.destroy)),
            s.call(this);
        }
        function M(t, e, r, n, o) {
          i('readableAddChunk', e);
          var s,
            c = t._readableState;
          if (null === e)
            (c.reading = !1),
              (function (t, e) {
                if ((i('onEofChunk'), !e.ended)) {
                  if (e.decoder) {
                    var r = e.decoder.end();
                    r && r.length && (e.buffer.push(r), (e.length += e.objectMode ? 1 : r.length));
                  }
                  (e.ended = !0),
                    e.sync ? R(t) : ((e.needReadable = !1), e.emittedReadable || ((e.emittedReadable = !0), I(t)));
                }
              })(t, c);
          else if (
            (o ||
              (s = (function (t, e) {
                var r, n;
                return (
                  (n = e),
                  a.isBuffer(n) ||
                    n instanceof u ||
                    'string' == typeof e ||
                    void 0 === e ||
                    t.objectMode ||
                    (r = new b('chunk', ['string', 'Buffer', 'Uint8Array'], e)),
                  r
                );
              })(c, e)),
            s)
          )
            _(t, s);
          else if (c.objectMode || (e && e.length > 0))
            if (
              ('string' == typeof e ||
                c.objectMode ||
                Object.getPrototypeOf(e) === a.prototype ||
                (e = (function (t) {
                  return a.from(t);
                })(e)),
              n)
            )
              c.endEmitted ? _(t, new w()) : k(t, c, e, !0);
            else if (c.ended) _(t, new m());
            else {
              if (c.destroyed) return !1;
              (c.reading = !1),
                c.decoder && !r
                  ? ((e = c.decoder.write(e)), c.objectMode || 0 !== e.length ? k(t, c, e, !1) : T(t, c))
                  : k(t, c, e, !1);
            }
          else n || ((c.reading = !1), T(t, c));
          return !c.ended && (c.length < c.highWaterMark || 0 === c.length);
        }
        function k(t, e, r, n) {
          e.flowing && 0 === e.length && !e.sync
            ? ((e.awaitDrain = 0), t.emit('data', r))
            : ((e.length += e.objectMode ? 1 : r.length),
              n ? e.buffer.unshift(r) : e.buffer.push(r),
              e.needReadable && R(t)),
            T(t, e);
        }
        Object.defineProperty(x.prototype, 'destroyed', {
          enumerable: !1,
          get: function () {
            return void 0 !== this._readableState && this._readableState.destroyed;
          },
          set: function (t) {
            this._readableState && (this._readableState.destroyed = t);
          },
        }),
          (x.prototype.destroy = p.destroy),
          (x.prototype._undestroy = p.undestroy),
          (x.prototype._destroy = function (t, e) {
            e(t);
          }),
          (x.prototype.push = function (t, e) {
            var r,
              n = this._readableState;
            return (
              n.objectMode
                ? (r = !0)
                : 'string' == typeof t &&
                  ((e = e || n.defaultEncoding) !== n.encoding && ((t = a.from(t, e)), (e = '')), (r = !0)),
              M(this, t, e, !1, r)
            );
          }),
          (x.prototype.unshift = function (t) {
            return M(this, t, null, !0, !1);
          }),
          (x.prototype.isPaused = function () {
            return !1 === this._readableState.flowing;
          }),
          (x.prototype.setEncoding = function (t) {
            l || (l = r(2553).s);
            var e = new l(t);
            (this._readableState.decoder = e), (this._readableState.encoding = this._readableState.decoder.encoding);
            for (var n = this._readableState.buffer.head, i = ''; null !== n; ) (i += e.write(n.data)), (n = n.next);
            return (
              this._readableState.buffer.clear(),
              '' !== i && this._readableState.buffer.push(i),
              (this._readableState.length = i.length),
              this
            );
          });
        var A = 1073741824;
        function C(t, e) {
          return t <= 0 || (0 === e.length && e.ended)
            ? 0
            : e.objectMode
              ? 1
              : t != t
                ? e.flowing && e.length
                  ? e.buffer.head.data.length
                  : e.length
                : (t > e.highWaterMark &&
                    (e.highWaterMark = (function (t) {
                      return (
                        t >= A
                          ? (t = A)
                          : (t--, (t |= t >>> 1), (t |= t >>> 2), (t |= t >>> 4), (t |= t >>> 8), (t |= t >>> 16), t++),
                        t
                      );
                    })(t)),
                  t <= e.length ? t : e.ended ? e.length : ((e.needReadable = !0), 0));
        }
        function R(t) {
          var e = t._readableState;
          i('emitReadable', e.needReadable, e.emittedReadable),
            (e.needReadable = !1),
            e.emittedReadable || (i('emitReadable', e.flowing), (e.emittedReadable = !0), process.nextTick(I, t));
        }
        function I(t) {
          var e = t._readableState;
          i('emitReadable_', e.destroyed, e.length, e.ended),
            e.destroyed || (!e.length && !e.ended) || (t.emit('readable'), (e.emittedReadable = !1)),
            (e.needReadable = !e.flowing && !e.ended && e.length <= e.highWaterMark),
            P(t);
        }
        function T(t, e) {
          e.readingMore || ((e.readingMore = !0), process.nextTick(O, t, e));
        }
        function O(t, e) {
          for (; !e.reading && !e.ended && (e.length < e.highWaterMark || (e.flowing && 0 === e.length)); ) {
            var r = e.length;
            if ((i('maybeReadMore read 0'), t.read(0), r === e.length)) break;
          }
          e.readingMore = !1;
        }
        function N(t) {
          var e = t._readableState;
          (e.readableListening = t.listenerCount('readable') > 0),
            e.resumeScheduled && !e.paused ? (e.flowing = !0) : t.listenerCount('data') > 0 && t.resume();
        }
        function j(t) {
          i('readable nexttick read 0'), t.read(0);
        }
        function L(t, e) {
          i('resume', e.reading),
            e.reading || t.read(0),
            (e.resumeScheduled = !1),
            t.emit('resume'),
            P(t),
            e.flowing && !e.reading && t.read(0);
        }
        function P(t) {
          var e = t._readableState;
          for (i('flow', e.flowing); e.flowing && null !== t.read(); );
        }
        function D(t, e) {
          return 0 === e.length
            ? null
            : (e.objectMode
                ? (r = e.buffer.shift())
                : !t || t >= e.length
                  ? ((r = e.decoder
                      ? e.buffer.join('')
                      : 1 === e.buffer.length
                        ? e.buffer.first()
                        : e.buffer.concat(e.length)),
                    e.buffer.clear())
                  : (r = e.buffer.consume(t, e.decoder)),
              r);
          var r;
        }
        function B(t) {
          var e = t._readableState;
          i('endReadable', e.endEmitted), e.endEmitted || ((e.ended = !0), process.nextTick(U, e, t));
        }
        function U(t, e) {
          if (
            (i('endReadableNT', t.endEmitted, t.length),
            !t.endEmitted && 0 === t.length && ((t.endEmitted = !0), (e.readable = !1), e.emit('end'), t.autoDestroy))
          ) {
            var r = e._writableState;
            (!r || (r.autoDestroy && r.finished)) && e.destroy();
          }
        }
        function F(t, e) {
          for (var r = 0, n = t.length; r < n; r++) if (t[r] === e) return r;
          return -1;
        }
        (x.prototype.read = function (t) {
          i('read', t), (t = parseInt(t, 10));
          var e = this._readableState,
            r = t;
          if (
            (0 !== t && (e.emittedReadable = !1),
            0 === t &&
              e.needReadable &&
              ((0 !== e.highWaterMark ? e.length >= e.highWaterMark : e.length > 0) || e.ended))
          )
            return i('read: emitReadable', e.length, e.ended), 0 === e.length && e.ended ? B(this) : R(this), null;
          if (0 === (t = C(t, e)) && e.ended) return 0 === e.length && B(this), null;
          var n,
            o = e.needReadable;
          return (
            i('need readable', o),
            (0 === e.length || e.length - t < e.highWaterMark) && i('length less than watermark', (o = !0)),
            e.ended || e.reading
              ? i('reading or ended', (o = !1))
              : o &&
                (i('do read'),
                (e.reading = !0),
                (e.sync = !0),
                0 === e.length && (e.needReadable = !0),
                this._read(e.highWaterMark),
                (e.sync = !1),
                e.reading || (t = C(r, e))),
            null === (n = t > 0 ? D(t, e) : null)
              ? ((e.needReadable = e.length <= e.highWaterMark), (t = 0))
              : ((e.length -= t), (e.awaitDrain = 0)),
            0 === e.length && (e.ended || (e.needReadable = !0), r !== t && e.ended && B(this)),
            null !== n && this.emit('data', n),
            n
          );
        }),
          (x.prototype._read = function (t) {
            _(this, new v('_read()'));
          }),
          (x.prototype.pipe = function (t, e) {
            var r = this,
              n = this._readableState;
            switch (n.pipesCount) {
              case 0:
                n.pipes = t;
                break;
              case 1:
                n.pipes = [n.pipes, t];
                break;
              default:
                n.pipes.push(t);
            }
            (n.pipesCount += 1), i('pipe count=%d opts=%j', n.pipesCount, e);
            var s = (e && !1 === e.end) || t === process.stdout || t === process.stderr ? p : a;
            function a() {
              i('onend'), t.end();
            }
            n.endEmitted ? process.nextTick(s) : r.once('end', s),
              t.on('unpipe', function e(o, s) {
                i('onunpipe'),
                  o === r &&
                    s &&
                    !1 === s.hasUnpiped &&
                    ((s.hasUnpiped = !0),
                    i('cleanup'),
                    t.removeListener('close', f),
                    t.removeListener('finish', d),
                    t.removeListener('drain', u),
                    t.removeListener('error', h),
                    t.removeListener('unpipe', e),
                    r.removeListener('end', a),
                    r.removeListener('end', p),
                    r.removeListener('data', l),
                    (c = !0),
                    !n.awaitDrain || (t._writableState && !t._writableState.needDrain) || u());
              });
            var u = (function (t) {
              return function () {
                var e = t._readableState;
                i('pipeOnDrain', e.awaitDrain),
                  e.awaitDrain && e.awaitDrain--,
                  0 === e.awaitDrain && o(t, 'data') && ((e.flowing = !0), P(t));
              };
            })(r);
            t.on('drain', u);
            var c = !1;
            function l(e) {
              i('ondata');
              var o = t.write(e);
              i('dest.write', o),
                !1 === o &&
                  (((1 === n.pipesCount && n.pipes === t) || (n.pipesCount > 1 && -1 !== F(n.pipes, t))) &&
                    !c &&
                    (i('false write response, pause', n.awaitDrain), n.awaitDrain++),
                  r.pause());
            }
            function h(e) {
              i('onerror', e), p(), t.removeListener('error', h), 0 === o(t, 'error') && _(t, e);
            }
            function f() {
              t.removeListener('finish', d), p();
            }
            function d() {
              i('onfinish'), t.removeListener('close', f), p();
            }
            function p() {
              i('unpipe'), r.unpipe(t);
            }
            return (
              r.on('data', l),
              (function (t, e, r) {
                if ('function' == typeof t.prependListener) return t.prependListener(e, r);
                t._events && t._events.error
                  ? Array.isArray(t._events.error)
                    ? t._events.error.unshift(r)
                    : (t._events.error = [r, t._events.error])
                  : t.on(e, r);
              })(t, 'error', h),
              t.once('close', f),
              t.once('finish', d),
              t.emit('pipe', r),
              n.flowing || (i('pipe resume'), r.resume()),
              t
            );
          }),
          (x.prototype.unpipe = function (t) {
            var e = this._readableState,
              r = { hasUnpiped: !1 };
            if (0 === e.pipesCount) return this;
            if (1 === e.pipesCount)
              return (
                (t && t !== e.pipes) ||
                  (t || (t = e.pipes),
                  (e.pipes = null),
                  (e.pipesCount = 0),
                  (e.flowing = !1),
                  t && t.emit('unpipe', this, r)),
                this
              );
            if (!t) {
              var n = e.pipes,
                i = e.pipesCount;
              (e.pipes = null), (e.pipesCount = 0), (e.flowing = !1);
              for (var o = 0; o < i; o++) n[o].emit('unpipe', this, { hasUnpiped: !1 });
              return this;
            }
            var s = F(e.pipes, t);
            return (
              -1 === s ||
                (e.pipes.splice(s, 1),
                (e.pipesCount -= 1),
                1 === e.pipesCount && (e.pipes = e.pipes[0]),
                t.emit('unpipe', this, r)),
              this
            );
          }),
          (x.prototype.on = function (t, e) {
            var r = s.prototype.on.call(this, t, e),
              n = this._readableState;
            return (
              'data' === t
                ? ((n.readableListening = this.listenerCount('readable') > 0), !1 !== n.flowing && this.resume())
                : 'readable' === t &&
                  (n.endEmitted ||
                    n.readableListening ||
                    ((n.readableListening = n.needReadable = !0),
                    (n.flowing = !1),
                    (n.emittedReadable = !1),
                    i('on readable', n.length, n.reading),
                    n.length ? R(this) : n.reading || process.nextTick(j, this))),
              r
            );
          }),
          (x.prototype.addListener = x.prototype.on),
          (x.prototype.removeListener = function (t, e) {
            var r = s.prototype.removeListener.call(this, t, e);
            return 'readable' === t && process.nextTick(N, this), r;
          }),
          (x.prototype.removeAllListeners = function (t) {
            var e = s.prototype.removeAllListeners.apply(this, arguments);
            return ('readable' !== t && void 0 !== t) || process.nextTick(N, this), e;
          }),
          (x.prototype.resume = function () {
            var t = this._readableState;
            return (
              t.flowing ||
                (i('resume'),
                (t.flowing = !t.readableListening),
                (function (t, e) {
                  e.resumeScheduled || ((e.resumeScheduled = !0), process.nextTick(L, t, e));
                })(this, t)),
              (t.paused = !1),
              this
            );
          }),
          (x.prototype.pause = function () {
            return (
              i('call pause flowing=%j', this._readableState.flowing),
              !1 !== this._readableState.flowing &&
                (i('pause'), (this._readableState.flowing = !1), this.emit('pause')),
              (this._readableState.paused = !0),
              this
            );
          }),
          (x.prototype.wrap = function (t) {
            var e = this,
              r = this._readableState,
              n = !1;
            for (var o in (t.on('end', function () {
              if ((i('wrapped end'), r.decoder && !r.ended)) {
                var t = r.decoder.end();
                t && t.length && e.push(t);
              }
              e.push(null);
            }),
            t.on('data', function (o) {
              i('wrapped data'),
                r.decoder && (o = r.decoder.write(o)),
                (r.objectMode && null == o) ||
                  ((r.objectMode || (o && o.length)) && (e.push(o) || ((n = !0), t.pause())));
            }),
            t))
              void 0 === this[o] &&
                'function' == typeof t[o] &&
                (this[o] = (function (e) {
                  return function () {
                    return t[e].apply(t, arguments);
                  };
                })(o));
            for (var s = 0; s < S.length; s++) t.on(S[s], this.emit.bind(this, S[s]));
            return (
              (this._read = function (e) {
                i('wrapped _read', e), n && ((n = !1), t.resume());
              }),
              this
            );
          }),
          'function' == typeof Symbol &&
            (x.prototype[Symbol.asyncIterator] = function () {
              return void 0 === h && (h = r(5850)), h(this);
            }),
          Object.defineProperty(x.prototype, 'readableHighWaterMark', {
            enumerable: !1,
            get: function () {
              return this._readableState.highWaterMark;
            },
          }),
          Object.defineProperty(x.prototype, 'readableBuffer', {
            enumerable: !1,
            get: function () {
              return this._readableState && this._readableState.buffer;
            },
          }),
          Object.defineProperty(x.prototype, 'readableFlowing', {
            enumerable: !1,
            get: function () {
              return this._readableState.flowing;
            },
            set: function (t) {
              this._readableState && (this._readableState.flowing = t);
            },
          }),
          (x._fromList = D),
          Object.defineProperty(x.prototype, 'readableLength', {
            enumerable: !1,
            get: function () {
              return this._readableState.length;
            },
          }),
          'function' == typeof Symbol &&
            (x.from = function (t, e) {
              return void 0 === f && (f = r(5167)), f(x, t, e);
            });
      },
      4605: (t, e, r) => {
        'use strict';
        t.exports = l;
        var n = r(4281).q,
          i = n.ERR_METHOD_NOT_IMPLEMENTED,
          o = n.ERR_MULTIPLE_CALLBACK,
          s = n.ERR_TRANSFORM_ALREADY_TRANSFORMING,
          a = n.ERR_TRANSFORM_WITH_LENGTH_0,
          u = r(6753);
        function c(t, e) {
          var r = this._transformState;
          r.transforming = !1;
          var n = r.writecb;
          if (null === n) return this.emit('error', new o());
          (r.writechunk = null), (r.writecb = null), null != e && this.push(e), n(t);
          var i = this._readableState;
          (i.reading = !1), (i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark);
        }
        function l(t) {
          if (!(this instanceof l)) return new l(t);
          u.call(this, t),
            (this._transformState = {
              afterTransform: c.bind(this),
              needTransform: !1,
              transforming: !1,
              writecb: null,
              writechunk: null,
              writeencoding: null,
            }),
            (this._readableState.needReadable = !0),
            (this._readableState.sync = !1),
            t &&
              ('function' == typeof t.transform && (this._transform = t.transform),
              'function' == typeof t.flush && (this._flush = t.flush)),
            this.on('prefinish', h);
        }
        function h() {
          var t = this;
          'function' != typeof this._flush || this._readableState.destroyed
            ? f(this, null, null)
            : this._flush(function (e, r) {
                f(t, e, r);
              });
        }
        function f(t, e, r) {
          if (e) return t.emit('error', e);
          if ((null != r && t.push(r), t._writableState.length)) throw new a();
          if (t._transformState.transforming) throw new s();
          return t.push(null);
        }
        r(5717)(l, u),
          (l.prototype.push = function (t, e) {
            return (this._transformState.needTransform = !1), u.prototype.push.call(this, t, e);
          }),
          (l.prototype._transform = function (t, e, r) {
            r(new i('_transform()'));
          }),
          (l.prototype._write = function (t, e, r) {
            var n = this._transformState;
            if (((n.writecb = r), (n.writechunk = t), (n.writeencoding = e), !n.transforming)) {
              var i = this._readableState;
              (n.needTransform || i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark);
            }
          }),
          (l.prototype._read = function (t) {
            var e = this._transformState;
            null === e.writechunk || e.transforming
              ? (e.needTransform = !0)
              : ((e.transforming = !0), this._transform(e.writechunk, e.writeencoding, e.afterTransform));
          }),
          (l.prototype._destroy = function (t, e) {
            u.prototype._destroy.call(this, t, function (t) {
              e(t);
            });
          });
      },
      4229: (t, e, r) => {
        'use strict';
        function n(t) {
          var e = this;
          (this.next = null),
            (this.entry = null),
            (this.finish = function () {
              !(function (t, e, r) {
                var n = t.entry;
                for (t.entry = null; n; ) {
                  var i = n.callback;
                  e.pendingcb--, i(undefined), (n = n.next);
                }
                e.corkedRequestsFree.next = t;
              })(e, t);
            });
        }
        var i;
        (t.exports = x), (x.WritableState = E);
        var o,
          s = { deprecate: r(4927) },
          a = r(2503),
          u = r(8764).Buffer,
          c = r.g.Uint8Array || function () {},
          l = r(1195),
          h = r(2457).getHighWaterMark,
          f = r(4281).q,
          d = f.ERR_INVALID_ARG_TYPE,
          p = f.ERR_METHOD_NOT_IMPLEMENTED,
          y = f.ERR_MULTIPLE_CALLBACK,
          g = f.ERR_STREAM_CANNOT_PIPE,
          b = f.ERR_STREAM_DESTROYED,
          m = f.ERR_STREAM_NULL_VALUES,
          v = f.ERR_STREAM_WRITE_AFTER_END,
          w = f.ERR_UNKNOWN_ENCODING,
          _ = l.errorOrDestroy;
        function S() {}
        function E(t, e, o) {
          (i = i || r(6753)),
            (t = t || {}),
            'boolean' != typeof o && (o = e instanceof i),
            (this.objectMode = !!t.objectMode),
            o && (this.objectMode = this.objectMode || !!t.writableObjectMode),
            (this.highWaterMark = h(this, t, 'writableHighWaterMark', o)),
            (this.finalCalled = !1),
            (this.needDrain = !1),
            (this.ending = !1),
            (this.ended = !1),
            (this.finished = !1),
            (this.destroyed = !1);
          var s = !1 === t.decodeStrings;
          (this.decodeStrings = !s),
            (this.defaultEncoding = t.defaultEncoding || 'utf8'),
            (this.length = 0),
            (this.writing = !1),
            (this.corked = 0),
            (this.sync = !0),
            (this.bufferProcessing = !1),
            (this.onwrite = function (t) {
              !(function (t, e) {
                var r = t._writableState,
                  n = r.sync,
                  i = r.writecb;
                if ('function' != typeof i) throw new y();
                if (
                  ((function (t) {
                    (t.writing = !1), (t.writecb = null), (t.length -= t.writelen), (t.writelen = 0);
                  })(r),
                  e)
                )
                  !(function (t, e, r, n, i) {
                    --e.pendingcb,
                      r
                        ? (process.nextTick(i, n),
                          process.nextTick(I, t, e),
                          (t._writableState.errorEmitted = !0),
                          _(t, n))
                        : (i(n), (t._writableState.errorEmitted = !0), _(t, n), I(t, e));
                  })(t, r, n, e, i);
                else {
                  var o = C(r) || t.destroyed;
                  o || r.corked || r.bufferProcessing || !r.bufferedRequest || A(t, r),
                    n ? process.nextTick(k, t, r, o, i) : k(t, r, o, i);
                }
              })(e, t);
            }),
            (this.writecb = null),
            (this.writelen = 0),
            (this.bufferedRequest = null),
            (this.lastBufferedRequest = null),
            (this.pendingcb = 0),
            (this.prefinished = !1),
            (this.errorEmitted = !1),
            (this.emitClose = !1 !== t.emitClose),
            (this.autoDestroy = !!t.autoDestroy),
            (this.bufferedRequestCount = 0),
            (this.corkedRequestsFree = new n(this));
        }
        function x(t) {
          var e = this instanceof (i = i || r(6753));
          if (!e && !o.call(x, this)) return new x(t);
          (this._writableState = new E(t, this, e)),
            (this.writable = !0),
            t &&
              ('function' == typeof t.write && (this._write = t.write),
              'function' == typeof t.writev && (this._writev = t.writev),
              'function' == typeof t.destroy && (this._destroy = t.destroy),
              'function' == typeof t.final && (this._final = t.final)),
            a.call(this);
        }
        function M(t, e, r, n, i, o, s) {
          (e.writelen = n),
            (e.writecb = s),
            (e.writing = !0),
            (e.sync = !0),
            e.destroyed ? e.onwrite(new b('write')) : r ? t._writev(i, e.onwrite) : t._write(i, o, e.onwrite),
            (e.sync = !1);
        }
        function k(t, e, r, n) {
          r ||
            (function (t, e) {
              0 === e.length && e.needDrain && ((e.needDrain = !1), t.emit('drain'));
            })(t, e),
            e.pendingcb--,
            n(),
            I(t, e);
        }
        function A(t, e) {
          e.bufferProcessing = !0;
          var r = e.bufferedRequest;
          if (t._writev && r && r.next) {
            var i = e.bufferedRequestCount,
              o = new Array(i),
              s = e.corkedRequestsFree;
            s.entry = r;
            for (var a = 0, u = !0; r; ) (o[a] = r), r.isBuf || (u = !1), (r = r.next), (a += 1);
            (o.allBuffers = u),
              M(t, e, !0, e.length, o, '', s.finish),
              e.pendingcb++,
              (e.lastBufferedRequest = null),
              s.next ? ((e.corkedRequestsFree = s.next), (s.next = null)) : (e.corkedRequestsFree = new n(e)),
              (e.bufferedRequestCount = 0);
          } else {
            for (; r; ) {
              var c = r.chunk,
                l = r.encoding,
                h = r.callback;
              if (
                (M(t, e, !1, e.objectMode ? 1 : c.length, c, l, h), (r = r.next), e.bufferedRequestCount--, e.writing)
              )
                break;
            }
            null === r && (e.lastBufferedRequest = null);
          }
          (e.bufferedRequest = r), (e.bufferProcessing = !1);
        }
        function C(t) {
          return t.ending && 0 === t.length && null === t.bufferedRequest && !t.finished && !t.writing;
        }
        function R(t, e) {
          t._final(function (r) {
            e.pendingcb--, r && _(t, r), (e.prefinished = !0), t.emit('prefinish'), I(t, e);
          });
        }
        function I(t, e) {
          var r = C(e);
          if (
            r &&
            ((function (t, e) {
              e.prefinished ||
                e.finalCalled ||
                ('function' != typeof t._final || e.destroyed
                  ? ((e.prefinished = !0), t.emit('prefinish'))
                  : (e.pendingcb++, (e.finalCalled = !0), process.nextTick(R, t, e)));
            })(t, e),
            0 === e.pendingcb && ((e.finished = !0), t.emit('finish'), e.autoDestroy))
          ) {
            var n = t._readableState;
            (!n || (n.autoDestroy && n.endEmitted)) && t.destroy();
          }
          return r;
        }
        r(5717)(x, a),
          (E.prototype.getBuffer = function () {
            for (var t = this.bufferedRequest, e = []; t; ) e.push(t), (t = t.next);
            return e;
          }),
          (function () {
            try {
              Object.defineProperty(E.prototype, 'buffer', {
                get: s.deprecate(
                  function () {
                    return this.getBuffer();
                  },
                  '_writableState.buffer is deprecated. Use _writableState.getBuffer instead.',
                  'DEP0003',
                ),
              });
            } catch (t) {}
          })(),
          'function' == typeof Symbol &&
          Symbol.hasInstance &&
          'function' == typeof Function.prototype[Symbol.hasInstance]
            ? ((o = Function.prototype[Symbol.hasInstance]),
              Object.defineProperty(x, Symbol.hasInstance, {
                value: function (t) {
                  return !!o.call(this, t) || (this === x && t && t._writableState instanceof E);
                },
              }))
            : (o = function (t) {
                return t instanceof this;
              }),
          (x.prototype.pipe = function () {
            _(this, new g());
          }),
          (x.prototype.write = function (t, e, r) {
            var n,
              i = this._writableState,
              o = !1,
              s = !i.objectMode && ((n = t), u.isBuffer(n) || n instanceof c);
            return (
              s &&
                !u.isBuffer(t) &&
                (t = (function (t) {
                  return u.from(t);
                })(t)),
              'function' == typeof e && ((r = e), (e = null)),
              s ? (e = 'buffer') : e || (e = i.defaultEncoding),
              'function' != typeof r && (r = S),
              i.ending
                ? (function (t, e) {
                    var r = new v();
                    _(t, r), process.nextTick(e, r);
                  })(this, r)
                : (s ||
                    (function (t, e, r, n) {
                      var i;
                      return (
                        null === r
                          ? (i = new m())
                          : 'string' == typeof r || e.objectMode || (i = new d('chunk', ['string', 'Buffer'], r)),
                        !i || (_(t, i), process.nextTick(n, i), !1)
                      );
                    })(this, i, t, r)) &&
                  (i.pendingcb++,
                  (o = (function (t, e, r, n, i, o) {
                    if (!r) {
                      var s = (function (t, e, r) {
                        return t.objectMode || !1 === t.decodeStrings || 'string' != typeof e || (e = u.from(e, r)), e;
                      })(e, n, i);
                      n !== s && ((r = !0), (i = 'buffer'), (n = s));
                    }
                    var a = e.objectMode ? 1 : n.length;
                    e.length += a;
                    var c = e.length < e.highWaterMark;
                    if ((c || (e.needDrain = !0), e.writing || e.corked)) {
                      var l = e.lastBufferedRequest;
                      (e.lastBufferedRequest = { chunk: n, encoding: i, isBuf: r, callback: o, next: null }),
                        l ? (l.next = e.lastBufferedRequest) : (e.bufferedRequest = e.lastBufferedRequest),
                        (e.bufferedRequestCount += 1);
                    } else M(t, e, !1, a, n, i, o);
                    return c;
                  })(this, i, s, t, e, r))),
              o
            );
          }),
          (x.prototype.cork = function () {
            this._writableState.corked++;
          }),
          (x.prototype.uncork = function () {
            var t = this._writableState;
            t.corked && (t.corked--, t.writing || t.corked || t.bufferProcessing || !t.bufferedRequest || A(this, t));
          }),
          (x.prototype.setDefaultEncoding = function (t) {
            if (
              ('string' == typeof t && (t = t.toLowerCase()),
              !(
                [
                  'hex',
                  'utf8',
                  'utf-8',
                  'ascii',
                  'binary',
                  'base64',
                  'ucs2',
                  'ucs-2',
                  'utf16le',
                  'utf-16le',
                  'raw',
                ].indexOf((t + '').toLowerCase()) > -1
              ))
            )
              throw new w(t);
            return (this._writableState.defaultEncoding = t), this;
          }),
          Object.defineProperty(x.prototype, 'writableBuffer', {
            enumerable: !1,
            get: function () {
              return this._writableState && this._writableState.getBuffer();
            },
          }),
          Object.defineProperty(x.prototype, 'writableHighWaterMark', {
            enumerable: !1,
            get: function () {
              return this._writableState.highWaterMark;
            },
          }),
          (x.prototype._write = function (t, e, r) {
            r(new p('_write()'));
          }),
          (x.prototype._writev = null),
          (x.prototype.end = function (t, e, r) {
            var n = this._writableState;
            return (
              'function' == typeof t
                ? ((r = t), (t = null), (e = null))
                : 'function' == typeof e && ((r = e), (e = null)),
              null != t && this.write(t, e),
              n.corked && ((n.corked = 1), this.uncork()),
              n.ending ||
                (function (t, e, r) {
                  (e.ending = !0),
                    I(t, e),
                    r && (e.finished ? process.nextTick(r) : t.once('finish', r)),
                    (e.ended = !0),
                    (t.writable = !1);
                })(this, n, r),
              this
            );
          }),
          Object.defineProperty(x.prototype, 'writableLength', {
            enumerable: !1,
            get: function () {
              return this._writableState.length;
            },
          }),
          Object.defineProperty(x.prototype, 'destroyed', {
            enumerable: !1,
            get: function () {
              return void 0 !== this._writableState && this._writableState.destroyed;
            },
            set: function (t) {
              this._writableState && (this._writableState.destroyed = t);
            },
          }),
          (x.prototype.destroy = l.destroy),
          (x.prototype._undestroy = l.undestroy),
          (x.prototype._destroy = function (t, e) {
            e(t);
          });
      },
      5850: (t, e, r) => {
        'use strict';
        var n;
        function i(t, e, r) {
          return (
            e in t
              ? Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 })
              : (t[e] = r),
            t
          );
        }
        var o = r(8610),
          s = Symbol('lastResolve'),
          a = Symbol('lastReject'),
          u = Symbol('error'),
          c = Symbol('ended'),
          l = Symbol('lastPromise'),
          h = Symbol('handlePromise'),
          f = Symbol('stream');
        function d(t, e) {
          return { value: t, done: e };
        }
        function p(t) {
          var e = t[s];
          if (null !== e) {
            var r = t[f].read();
            null !== r && ((t[l] = null), (t[s] = null), (t[a] = null), e(d(r, !1)));
          }
        }
        function y(t) {
          process.nextTick(p, t);
        }
        var g = Object.getPrototypeOf(function () {}),
          b = Object.setPrototypeOf(
            (i(
              (n = {
                get stream() {
                  return this[f];
                },
                next: function () {
                  var t = this,
                    e = this[u];
                  if (null !== e) return Promise.reject(e);
                  if (this[c]) return Promise.resolve(d(void 0, !0));
                  if (this[f].destroyed)
                    return new Promise(function (e, r) {
                      process.nextTick(function () {
                        t[u] ? r(t[u]) : e(d(void 0, !0));
                      });
                    });
                  var r,
                    n = this[l];
                  if (n)
                    r = new Promise(
                      (function (t, e) {
                        return function (r, n) {
                          t.then(function () {
                            e[c] ? r(d(void 0, !0)) : e[h](r, n);
                          }, n);
                        };
                      })(n, this),
                    );
                  else {
                    var i = this[f].read();
                    if (null !== i) return Promise.resolve(d(i, !1));
                    r = new Promise(this[h]);
                  }
                  return (this[l] = r), r;
                },
              }),
              Symbol.asyncIterator,
              function () {
                return this;
              },
            ),
            i(n, 'return', function () {
              var t = this;
              return new Promise(function (e, r) {
                t[f].destroy(null, function (t) {
                  t ? r(t) : e(d(void 0, !0));
                });
              });
            }),
            n),
            g,
          );
        t.exports = function (t) {
          var e,
            r = Object.create(
              b,
              (i((e = {}), f, { value: t, writable: !0 }),
              i(e, s, { value: null, writable: !0 }),
              i(e, a, { value: null, writable: !0 }),
              i(e, u, { value: null, writable: !0 }),
              i(e, c, { value: t._readableState.endEmitted, writable: !0 }),
              i(e, h, {
                value: function (t, e) {
                  var n = r[f].read();
                  n ? ((r[l] = null), (r[s] = null), (r[a] = null), t(d(n, !1))) : ((r[s] = t), (r[a] = e));
                },
                writable: !0,
              }),
              e),
            );
          return (
            (r[l] = null),
            o(t, function (t) {
              if (t && 'ERR_STREAM_PREMATURE_CLOSE' !== t.code) {
                var e = r[a];
                return null !== e && ((r[l] = null), (r[s] = null), (r[a] = null), e(t)), void (r[u] = t);
              }
              var n = r[s];
              null !== n && ((r[l] = null), (r[s] = null), (r[a] = null), n(d(void 0, !0))), (r[c] = !0);
            }),
            t.on('readable', y.bind(null, r)),
            r
          );
        };
      },
      7327: (t, e, r) => {
        'use strict';
        function n(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function i(t, e, r) {
          return (
            e in t
              ? Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 })
              : (t[e] = r),
            t
          );
        }
        function o(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              'value' in n && (n.writable = !0),
              Object.defineProperty(t, n.key, n);
          }
        }
        var s = r(8764).Buffer,
          a = r(2361).inspect,
          u = (a && a.custom) || 'inspect';
        t.exports = (function () {
          function t() {
            !(function (t, e) {
              if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
            })(this, t),
              (this.head = null),
              (this.tail = null),
              (this.length = 0);
          }
          var e, r;
          return (
            (e = t),
            (r = [
              {
                key: 'push',
                value: function (t) {
                  var e = { data: t, next: null };
                  this.length > 0 ? (this.tail.next = e) : (this.head = e), (this.tail = e), ++this.length;
                },
              },
              {
                key: 'unshift',
                value: function (t) {
                  var e = { data: t, next: this.head };
                  0 === this.length && (this.tail = e), (this.head = e), ++this.length;
                },
              },
              {
                key: 'shift',
                value: function () {
                  if (0 !== this.length) {
                    var t = this.head.data;
                    return (
                      1 === this.length ? (this.head = this.tail = null) : (this.head = this.head.next),
                      --this.length,
                      t
                    );
                  }
                },
              },
              {
                key: 'clear',
                value: function () {
                  (this.head = this.tail = null), (this.length = 0);
                },
              },
              {
                key: 'join',
                value: function (t) {
                  if (0 === this.length) return '';
                  for (var e = this.head, r = '' + e.data; (e = e.next); ) r += t + e.data;
                  return r;
                },
              },
              {
                key: 'concat',
                value: function (t) {
                  if (0 === this.length) return s.alloc(0);
                  for (var e, r, n, i = s.allocUnsafe(t >>> 0), o = this.head, a = 0; o; )
                    (e = o.data), (r = i), (n = a), s.prototype.copy.call(e, r, n), (a += o.data.length), (o = o.next);
                  return i;
                },
              },
              {
                key: 'consume',
                value: function (t, e) {
                  var r;
                  return (
                    t < this.head.data.length
                      ? ((r = this.head.data.slice(0, t)), (this.head.data = this.head.data.slice(t)))
                      : (r = t === this.head.data.length ? this.shift() : e ? this._getString(t) : this._getBuffer(t)),
                    r
                  );
                },
              },
              {
                key: 'first',
                value: function () {
                  return this.head.data;
                },
              },
              {
                key: '_getString',
                value: function (t) {
                  var e = this.head,
                    r = 1,
                    n = e.data;
                  for (t -= n.length; (e = e.next); ) {
                    var i = e.data,
                      o = t > i.length ? i.length : t;
                    if ((o === i.length ? (n += i) : (n += i.slice(0, t)), 0 == (t -= o))) {
                      o === i.length
                        ? (++r, e.next ? (this.head = e.next) : (this.head = this.tail = null))
                        : ((this.head = e), (e.data = i.slice(o)));
                      break;
                    }
                    ++r;
                  }
                  return (this.length -= r), n;
                },
              },
              {
                key: '_getBuffer',
                value: function (t) {
                  var e = s.allocUnsafe(t),
                    r = this.head,
                    n = 1;
                  for (r.data.copy(e), t -= r.data.length; (r = r.next); ) {
                    var i = r.data,
                      o = t > i.length ? i.length : t;
                    if ((i.copy(e, e.length - t, 0, o), 0 == (t -= o))) {
                      o === i.length
                        ? (++n, r.next ? (this.head = r.next) : (this.head = this.tail = null))
                        : ((this.head = r), (r.data = i.slice(o)));
                      break;
                    }
                    ++n;
                  }
                  return (this.length -= n), e;
                },
              },
              {
                key: u,
                value: function (t, e) {
                  return a(
                    this,
                    (function (t) {
                      for (var e = 1; e < arguments.length; e++) {
                        var r = null != arguments[e] ? arguments[e] : {};
                        e % 2
                          ? n(Object(r), !0).forEach(function (e) {
                              i(t, e, r[e]);
                            })
                          : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r))
                            : n(Object(r)).forEach(function (e) {
                                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e));
                              });
                      }
                      return t;
                    })({}, e, { depth: 0, customInspect: !1 }),
                  );
                },
              },
            ]),
            r && o(e.prototype, r),
            t
          );
        })();
      },
      1195: (t) => {
        'use strict';
        function e(t, e) {
          n(t, e), r(t);
        }
        function r(t) {
          (t._writableState && !t._writableState.emitClose) ||
            (t._readableState && !t._readableState.emitClose) ||
            t.emit('close');
        }
        function n(t, e) {
          t.emit('error', e);
        }
        t.exports = {
          destroy: function (t, i) {
            var o = this,
              s = this._readableState && this._readableState.destroyed,
              a = this._writableState && this._writableState.destroyed;
            return s || a
              ? (i
                  ? i(t)
                  : t &&
                    (this._writableState
                      ? this._writableState.errorEmitted ||
                        ((this._writableState.errorEmitted = !0), process.nextTick(n, this, t))
                      : process.nextTick(n, this, t)),
                this)
              : (this._readableState && (this._readableState.destroyed = !0),
                this._writableState && (this._writableState.destroyed = !0),
                this._destroy(t || null, function (t) {
                  !i && t
                    ? o._writableState
                      ? o._writableState.errorEmitted
                        ? process.nextTick(r, o)
                        : ((o._writableState.errorEmitted = !0), process.nextTick(e, o, t))
                      : process.nextTick(e, o, t)
                    : i
                      ? (process.nextTick(r, o), i(t))
                      : process.nextTick(r, o);
                }),
                this);
          },
          undestroy: function () {
            this._readableState &&
              ((this._readableState.destroyed = !1),
              (this._readableState.reading = !1),
              (this._readableState.ended = !1),
              (this._readableState.endEmitted = !1)),
              this._writableState &&
                ((this._writableState.destroyed = !1),
                (this._writableState.ended = !1),
                (this._writableState.ending = !1),
                (this._writableState.finalCalled = !1),
                (this._writableState.prefinished = !1),
                (this._writableState.finished = !1),
                (this._writableState.errorEmitted = !1));
          },
          errorOrDestroy: function (t, e) {
            var r = t._readableState,
              n = t._writableState;
            (r && r.autoDestroy) || (n && n.autoDestroy) ? t.destroy(e) : t.emit('error', e);
          },
        };
      },
      8610: (t, e, r) => {
        'use strict';
        var n = r(4281).q.ERR_STREAM_PREMATURE_CLOSE;
        function i() {}
        t.exports = function t(e, r, o) {
          if ('function' == typeof r) return t(e, null, r);
          r || (r = {}),
            (o = (function (t) {
              var e = !1;
              return function () {
                if (!e) {
                  e = !0;
                  for (var r = arguments.length, n = new Array(r), i = 0; i < r; i++) n[i] = arguments[i];
                  t.apply(this, n);
                }
              };
            })(o || i));
          var s = r.readable || (!1 !== r.readable && e.readable),
            a = r.writable || (!1 !== r.writable && e.writable),
            u = function () {
              e.writable || l();
            },
            c = e._writableState && e._writableState.finished,
            l = function () {
              (a = !1), (c = !0), s || o.call(e);
            },
            h = e._readableState && e._readableState.endEmitted,
            f = function () {
              (s = !1), (h = !0), a || o.call(e);
            },
            d = function (t) {
              o.call(e, t);
            },
            p = function () {
              var t;
              return s && !h
                ? ((e._readableState && e._readableState.ended) || (t = new n()), o.call(e, t))
                : a && !c
                  ? ((e._writableState && e._writableState.ended) || (t = new n()), o.call(e, t))
                  : void 0;
            },
            y = function () {
              e.req.on('finish', l);
            };
          return (
            (function (t) {
              return t.setHeader && 'function' == typeof t.abort;
            })(e)
              ? (e.on('complete', l), e.on('abort', p), e.req ? y() : e.on('request', y))
              : a && !e._writableState && (e.on('end', u), e.on('close', u)),
            e.on('end', f),
            e.on('finish', l),
            !1 !== r.error && e.on('error', d),
            e.on('close', p),
            function () {
              e.removeListener('complete', l),
                e.removeListener('abort', p),
                e.removeListener('request', y),
                e.req && e.req.removeListener('finish', l),
                e.removeListener('end', u),
                e.removeListener('close', u),
                e.removeListener('finish', l),
                e.removeListener('end', f),
                e.removeListener('error', d),
                e.removeListener('close', p);
            }
          );
        };
      },
      5167: (t) => {
        t.exports = function () {
          throw new Error('Readable.from is not available in the browser');
        };
      },
      9946: (t, e, r) => {
        'use strict';
        var n,
          i = r(4281).q,
          o = i.ERR_MISSING_ARGS,
          s = i.ERR_STREAM_DESTROYED;
        function a(t) {
          if (t) throw t;
        }
        function u(t, e, i, o) {
          o = (function (t) {
            var e = !1;
            return function () {
              e || ((e = !0), t.apply(void 0, arguments));
            };
          })(o);
          var a = !1;
          t.on('close', function () {
            a = !0;
          }),
            void 0 === n && (n = r(8610)),
            n(t, { readable: e, writable: i }, function (t) {
              if (t) return o(t);
              (a = !0), o();
            });
          var u = !1;
          return function (e) {
            if (!a && !u)
              return (
                (u = !0),
                (function (t) {
                  return t.setHeader && 'function' == typeof t.abort;
                })(t)
                  ? t.abort()
                  : 'function' == typeof t.destroy
                    ? t.destroy()
                    : void o(e || new s('pipe'))
              );
          };
        }
        function c(t) {
          t();
        }
        function l(t, e) {
          return t.pipe(e);
        }
        function h(t) {
          return t.length ? ('function' != typeof t[t.length - 1] ? a : t.pop()) : a;
        }
        t.exports = function () {
          for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) e[r] = arguments[r];
          var n,
            i = h(e);
          if ((Array.isArray(e[0]) && (e = e[0]), e.length < 2)) throw new o('streams');
          var s = e.map(function (t, r) {
            var o = r < e.length - 1;
            return u(t, o, r > 0, function (t) {
              n || (n = t), t && s.forEach(c), o || (s.forEach(c), i(n));
            });
          });
          return e.reduce(l);
        };
      },
      2457: (t, e, r) => {
        'use strict';
        var n = r(4281).q.ERR_INVALID_OPT_VALUE;
        t.exports = {
          getHighWaterMark: function (t, e, r, i) {
            var o = (function (t, e, r) {
              return null != t.highWaterMark ? t.highWaterMark : e ? t[r] : null;
            })(e, i, r);
            if (null != o) {
              if (!isFinite(o) || Math.floor(o) !== o || o < 0) throw new n(i ? r : 'highWaterMark', o);
              return Math.floor(o);
            }
            return t.objectMode ? 16 : 16384;
          },
        };
      },
      2503: (t, e, r) => {
        t.exports = r(7187).EventEmitter;
      },
      8473: (t, e, r) => {
        ((e = t.exports = r(9481)).Stream = e),
          (e.Readable = e),
          (e.Writable = r(4229)),
          (e.Duplex = r(6753)),
          (e.Transform = r(4605)),
          (e.PassThrough = r(2725)),
          (e.finished = r(8610)),
          (e.pipeline = r(9946));
      },
      4143: (t, e, r) => {
        'use strict';
        r.r(e),
          r.d(e, {
            ArgumentOutOfRangeError: () => I.W,
            AsyncSubject: () => l.c,
            BehaviorSubject: () => u.X,
            ConnectableObservable: () => i.c,
            EMPTY: () => Y.E,
            EmptyError: () => T.K,
            GroupedObservable: () => o.T,
            NEVER: () => ht,
            Notification: () => M.P,
            NotificationKind: () => M.W,
            ObjectUnsubscribedError: () => O.N,
            Observable: () => n.y,
            ReplaySubject: () => c.t,
            Scheduler: () => S.b,
            Subject: () => a.xQ,
            Subscriber: () => x.L,
            Subscription: () => E.w,
            TimeoutError: () => j.W,
            UnsubscriptionError: () => N.B,
            VirtualAction: () => _,
            VirtualTimeScheduler: () => w,
            animationFrame: () => v,
            animationFrameScheduler: () => m,
            asap: () => h.e,
            asapScheduler: () => h.E,
            async: () => f.P,
            asyncScheduler: () => f.z,
            bindCallback: () => U,
            bindNodeCallback: () => W,
            combineLatest: () => Z.aj,
            concat: () => $.z,
            config: () => Rt.v,
            defer: () => G.P,
            empty: () => Y.c,
            forkJoin: () => Q,
            from: () => K.D,
            fromEvent: () => et,
            fromEventPattern: () => nt,
            generate: () => it,
            identity: () => C.y,
            iif: () => st,
            interval: () => ut,
            isObservable: () => R,
            merge: () => lt.T,
            never: () => ft,
            noop: () => A.Z,
            observable: () => s.L,
            of: () => dt.of,
            onErrorResumeNext: () => pt,
            pairs: () => yt,
            partition: () => wt,
            pipe: () => k.z,
            queue: () => d.c,
            queueScheduler: () => d.N,
            race: () => _t.S3,
            range: () => St,
            scheduled: () => Ct.x,
            throwError: () => xt._,
            timer: () => Mt.H,
            using: () => kt,
            zip: () => At.$R,
          });
        var n = r(2772),
          i = r(3140),
          o = r(1120),
          s = r(5050),
          a = r(211),
          u = r(9233),
          c = r(2630),
          l = r(364),
          h = r(6650),
          f = r(964),
          d = r(2546),
          p = r(5987),
          y = r(6114),
          g = (function (t) {
            function e(e, r) {
              var n = t.call(this, e, r) || this;
              return (n.scheduler = e), (n.work = r), n;
            }
            return (
              p.ZT(e, t),
              (e.prototype.requestAsyncId = function (e, r, n) {
                return (
                  void 0 === n && (n = 0),
                  null !== n && n > 0
                    ? t.prototype.requestAsyncId.call(this, e, r, n)
                    : (e.actions.push(this),
                      e.scheduled ||
                        (e.scheduled = requestAnimationFrame(function () {
                          return e.flush(null);
                        })))
                );
              }),
              (e.prototype.recycleAsyncId = function (e, r, n) {
                if ((void 0 === n && (n = 0), (null !== n && n > 0) || (null === n && this.delay > 0)))
                  return t.prototype.recycleAsyncId.call(this, e, r, n);
                0 === e.actions.length && (cancelAnimationFrame(r), (e.scheduled = void 0));
              }),
              e
            );
          })(y.o),
          b = r(8399),
          m = new ((function (t) {
            function e() {
              return (null !== t && t.apply(this, arguments)) || this;
            }
            return (
              p.ZT(e, t),
              (e.prototype.flush = function (t) {
                (this.active = !0), (this.scheduled = void 0);
                var e,
                  r = this.actions,
                  n = -1,
                  i = r.length;
                t = t || r.shift();
                do {
                  if ((e = t.execute(t.state, t.delay))) break;
                } while (++n < i && (t = r.shift()));
                if (((this.active = !1), e)) {
                  for (; ++n < i && (t = r.shift()); ) t.unsubscribe();
                  throw e;
                }
              }),
              e
            );
          })(b.v))(g),
          v = m,
          w = (function (t) {
            function e(e, r) {
              void 0 === e && (e = _), void 0 === r && (r = Number.POSITIVE_INFINITY);
              var n =
                t.call(this, e, function () {
                  return n.frame;
                }) || this;
              return (n.maxFrames = r), (n.frame = 0), (n.index = -1), n;
            }
            return (
              p.ZT(e, t),
              (e.prototype.flush = function () {
                for (
                  var t, e, r = this.actions, n = this.maxFrames;
                  (e = r[0]) && e.delay <= n && (r.shift(), (this.frame = e.delay), !(t = e.execute(e.state, e.delay)));

                );
                if (t) {
                  for (; (e = r.shift()); ) e.unsubscribe();
                  throw t;
                }
              }),
              (e.frameTimeFactor = 10),
              e
            );
          })(b.v),
          _ = (function (t) {
            function e(e, r, n) {
              void 0 === n && (n = e.index += 1);
              var i = t.call(this, e, r) || this;
              return (i.scheduler = e), (i.work = r), (i.index = n), (i.active = !0), (i.index = e.index = n), i;
            }
            return (
              p.ZT(e, t),
              (e.prototype.schedule = function (r, n) {
                if ((void 0 === n && (n = 0), !this.id)) return t.prototype.schedule.call(this, r, n);
                this.active = !1;
                var i = new e(this.scheduler, this.work);
                return this.add(i), i.schedule(r, n);
              }),
              (e.prototype.requestAsyncId = function (t, r, n) {
                void 0 === n && (n = 0), (this.delay = t.frame + n);
                var i = t.actions;
                return i.push(this), i.sort(e.sortActions), !0;
              }),
              (e.prototype.recycleAsyncId = function (t, e, r) {
                void 0 === r && (r = 0);
              }),
              (e.prototype._execute = function (e, r) {
                if (!0 === this.active) return t.prototype._execute.call(this, e, r);
              }),
              (e.sortActions = function (t, e) {
                return t.delay === e.delay
                  ? t.index === e.index
                    ? 0
                    : t.index > e.index
                      ? 1
                      : -1
                  : t.delay > e.delay
                    ? 1
                    : -1;
              }),
              e
            );
          })(y.o),
          S = r(8725),
          E = r(8760),
          x = r(979),
          M = r(2632),
          k = r(2561),
          A = r(3306),
          C = r(3608);
        function R(t) {
          return !!t && (t instanceof n.y || ('function' == typeof t.lift && 'function' == typeof t.subscribe));
        }
        var I = r(6565),
          T = r(6929),
          O = r(1016),
          N = r(8782),
          j = r(1462),
          L = r(5709),
          P = r(3642),
          D = r(9026),
          B = r(7507);
        function U(t, e, r) {
          if (e) {
            if (!(0, B.K)(e))
              return function () {
                for (var n = [], i = 0; i < arguments.length; i++) n[i] = arguments[i];
                return U(t, r)
                  .apply(void 0, n)
                  .pipe(
                    (0, L.U)(function (t) {
                      return (0, D.k)(t) ? e.apply(void 0, t) : e(t);
                    }),
                  );
              };
            r = e;
          }
          return function () {
            for (var e = [], i = 0; i < arguments.length; i++) e[i] = arguments[i];
            var o,
              s = this,
              a = { context: s, subject: o, callbackFunc: t, scheduler: r };
            return new n.y(function (n) {
              if (r) {
                var i = { args: e, subscriber: n, params: a };
                return r.schedule(F, 0, i);
              }
              if (!o) {
                o = new l.c();
                try {
                  t.apply(
                    s,
                    e.concat([
                      function () {
                        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                        o.next(t.length <= 1 ? t[0] : t), o.complete();
                      },
                    ]),
                  );
                } catch (t) {
                  (0, P._)(o) ? o.error(t) : console.warn(t);
                }
              }
              return o.subscribe(n);
            });
          };
        }
        function F(t) {
          var e = this,
            r = t.args,
            n = t.subscriber,
            i = t.params,
            o = i.callbackFunc,
            s = i.context,
            a = i.scheduler,
            u = i.subject;
          if (!u) {
            u = i.subject = new l.c();
            try {
              o.apply(
                s,
                r.concat([
                  function () {
                    for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
                    var n = t.length <= 1 ? t[0] : t;
                    e.add(a.schedule(H, 0, { value: n, subject: u }));
                  },
                ]),
              );
            } catch (t) {
              u.error(t);
            }
          }
          this.add(u.subscribe(n));
        }
        function H(t) {
          var e = t.value,
            r = t.subject;
          r.next(e), r.complete();
        }
        function W(t, e, r) {
          if (e) {
            if (!(0, B.K)(e))
              return function () {
                for (var n = [], i = 0; i < arguments.length; i++) n[i] = arguments[i];
                return W(t, r)
                  .apply(void 0, n)
                  .pipe(
                    (0, L.U)(function (t) {
                      return (0, D.k)(t) ? e.apply(void 0, t) : e(t);
                    }),
                  );
              };
            r = e;
          }
          return function () {
            for (var e = [], i = 0; i < arguments.length; i++) e[i] = arguments[i];
            var o = { subject: void 0, args: e, callbackFunc: t, scheduler: r, context: this };
            return new n.y(function (n) {
              var i = o.context,
                s = o.subject;
              if (r) return r.schedule(z, 0, { params: o, subscriber: n, context: i });
              if (!s) {
                s = o.subject = new l.c();
                try {
                  t.apply(
                    i,
                    e.concat([
                      function () {
                        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                        var r = t.shift();
                        r ? s.error(r) : (s.next(t.length <= 1 ? t[0] : t), s.complete());
                      },
                    ]),
                  );
                } catch (t) {
                  (0, P._)(s) ? s.error(t) : console.warn(t);
                }
              }
              return s.subscribe(n);
            });
          };
        }
        function z(t) {
          var e = this,
            r = t.params,
            n = t.subscriber,
            i = t.context,
            o = r.callbackFunc,
            s = r.args,
            a = r.scheduler,
            u = r.subject;
          if (!u) {
            u = r.subject = new l.c();
            try {
              o.apply(
                i,
                s.concat([
                  function () {
                    for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
                    var n = t.shift();
                    if (n) e.add(a.schedule(q, 0, { err: n, subject: u }));
                    else {
                      var i = t.length <= 1 ? t[0] : t;
                      e.add(a.schedule(V, 0, { value: i, subject: u }));
                    }
                  },
                ]),
              );
            } catch (t) {
              this.add(a.schedule(q, 0, { err: t, subject: u }));
            }
          }
          this.add(u.subscribe(n));
        }
        function V(t) {
          var e = t.value,
            r = t.subject;
          r.next(e), r.complete();
        }
        function q(t) {
          var e = t.err;
          t.subject.error(e);
        }
        var Z = r(5142),
          $ = r(9795),
          G = r(1410),
          Y = r(5631),
          J = r(2009),
          K = r(5760);
        function Q() {
          for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
          if (1 === t.length) {
            var r = t[0];
            if ((0, D.k)(r)) return X(r, null);
            if ((0, J.K)(r) && Object.getPrototypeOf(r) === Object.prototype) {
              var n = Object.keys(r);
              return X(
                n.map(function (t) {
                  return r[t];
                }),
                n,
              );
            }
          }
          if ('function' == typeof t[t.length - 1]) {
            var i = t.pop();
            return X((t = 1 === t.length && (0, D.k)(t[0]) ? t[0] : t), null).pipe(
              (0, L.U)(function (t) {
                return i.apply(void 0, t);
              }),
            );
          }
          return X(t, null);
        }
        function X(t, e) {
          return new n.y(function (r) {
            var n = t.length;
            if (0 !== n)
              for (
                var i = new Array(n),
                  o = 0,
                  s = 0,
                  a = function (a) {
                    var u = (0, K.D)(t[a]),
                      c = !1;
                    r.add(
                      u.subscribe({
                        next: function (t) {
                          c || ((c = !0), s++), (i[a] = t);
                        },
                        error: function (t) {
                          return r.error(t);
                        },
                        complete: function () {
                          (++o !== n && c) ||
                            (s === n &&
                              r.next(
                                e
                                  ? e.reduce(function (t, e, r) {
                                      return (t[e] = i[r]), t;
                                    }, {})
                                  : i,
                              ),
                            r.complete());
                        },
                      }),
                    );
                  },
                  u = 0;
                u < n;
                u++
              )
                a(u);
            else r.complete();
          });
        }
        var tt = r(4156);
        function et(t, e, r, i) {
          return (
            (0, tt.m)(r) && ((i = r), (r = void 0)),
            i
              ? et(t, e, r).pipe(
                  (0, L.U)(function (t) {
                    return (0, D.k)(t) ? i.apply(void 0, t) : i(t);
                  }),
                )
              : new n.y(function (n) {
                  rt(
                    t,
                    e,
                    function (t) {
                      arguments.length > 1 ? n.next(Array.prototype.slice.call(arguments)) : n.next(t);
                    },
                    n,
                    r,
                  );
                })
          );
        }
        function rt(t, e, r, n, i) {
          var o;
          if (
            (function (t) {
              return t && 'function' == typeof t.addEventListener && 'function' == typeof t.removeEventListener;
            })(t)
          ) {
            var s = t;
            t.addEventListener(e, r, i),
              (o = function () {
                return s.removeEventListener(e, r, i);
              });
          } else if (
            (function (t) {
              return t && 'function' == typeof t.on && 'function' == typeof t.off;
            })(t)
          ) {
            var a = t;
            t.on(e, r),
              (o = function () {
                return a.off(e, r);
              });
          } else if (
            (function (t) {
              return t && 'function' == typeof t.addListener && 'function' == typeof t.removeListener;
            })(t)
          ) {
            var u = t;
            t.addListener(e, r),
              (o = function () {
                return u.removeListener(e, r);
              });
          } else {
            if (!t || !t.length) throw new TypeError('Invalid event target');
            for (var c = 0, l = t.length; c < l; c++) rt(t[c], e, r, n, i);
          }
          n.add(o);
        }
        function nt(t, e, r) {
          return r
            ? nt(t, e).pipe(
                (0, L.U)(function (t) {
                  return (0, D.k)(t) ? r.apply(void 0, t) : r(t);
                }),
              )
            : new n.y(function (r) {
                var n,
                  i = function () {
                    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                    return r.next(1 === t.length ? t[0] : t);
                  };
                try {
                  n = t(i);
                } catch (t) {
                  return void r.error(t);
                }
                if ((0, tt.m)(e))
                  return function () {
                    return e(i, n);
                  };
              });
        }
        function it(t, e, r, i, o) {
          var s, a;
          if (1 == arguments.length) {
            var u = t;
            (a = u.initialState), (e = u.condition), (r = u.iterate), (s = u.resultSelector || C.y), (o = u.scheduler);
          } else void 0 === i || (0, B.K)(i) ? ((a = t), (s = C.y), (o = i)) : ((a = t), (s = i));
          return new n.y(function (t) {
            var n = a;
            if (o) return o.schedule(ot, 0, { subscriber: t, iterate: r, condition: e, resultSelector: s, state: n });
            for (;;) {
              if (e) {
                var i = void 0;
                try {
                  i = e(n);
                } catch (e) {
                  return void t.error(e);
                }
                if (!i) {
                  t.complete();
                  break;
                }
              }
              var u = void 0;
              try {
                u = s(n);
              } catch (e) {
                return void t.error(e);
              }
              if ((t.next(u), t.closed)) break;
              try {
                n = r(n);
              } catch (e) {
                return void t.error(e);
              }
            }
          });
        }
        function ot(t) {
          var e = t.subscriber,
            r = t.condition;
          if (!e.closed) {
            if (t.needIterate)
              try {
                t.state = t.iterate(t.state);
              } catch (t) {
                return void e.error(t);
              }
            else t.needIterate = !0;
            if (r) {
              var n = void 0;
              try {
                n = r(t.state);
              } catch (t) {
                return void e.error(t);
              }
              if (!n) return void e.complete();
              if (e.closed) return;
            }
            var i;
            try {
              i = t.resultSelector(t.state);
            } catch (t) {
              return void e.error(t);
            }
            if (!e.closed && (e.next(i), !e.closed)) return this.schedule(t);
          }
        }
        function st(t, e, r) {
          return (
            void 0 === e && (e = Y.E),
            void 0 === r && (r = Y.E),
            (0, G.P)(function () {
              return t() ? e : r;
            })
          );
        }
        var at = r(5812);
        function ut(t, e) {
          return (
            void 0 === t && (t = 0),
            void 0 === e && (e = f.P),
            (!(0, at.k)(t) || t < 0) && (t = 0),
            (e && 'function' == typeof e.schedule) || (e = f.P),
            new n.y(function (r) {
              return r.add(e.schedule(ct, t, { subscriber: r, counter: 0, period: t })), r;
            })
          );
        }
        function ct(t) {
          var e = t.subscriber,
            r = t.counter,
            n = t.period;
          e.next(r), this.schedule({ subscriber: e, counter: r + 1, period: n }, n);
        }
        var lt = r(4370),
          ht = new n.y(A.Z);
        function ft() {
          return ht;
        }
        var dt = r(8170);
        function pt() {
          for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
          if (0 === t.length) return Y.E;
          var r = t[0],
            i = t.slice(1);
          return 1 === t.length && (0, D.k)(r)
            ? pt.apply(void 0, r)
            : new n.y(function (t) {
                var e = function () {
                  return t.add(pt.apply(void 0, i).subscribe(t));
                };
                return (0, K.D)(r).subscribe({
                  next: function (e) {
                    t.next(e);
                  },
                  error: e,
                  complete: e,
                });
              });
        }
        function yt(t, e) {
          return e
            ? new n.y(function (r) {
                var n = Object.keys(t),
                  i = new E.w();
                return i.add(e.schedule(gt, 0, { keys: n, index: 0, subscriber: r, subscription: i, obj: t })), i;
              })
            : new n.y(function (e) {
                for (var r = Object.keys(t), n = 0; n < r.length && !e.closed; n++) {
                  var i = r[n];
                  t.hasOwnProperty(i) && e.next([i, t[i]]);
                }
                e.complete();
              });
        }
        function gt(t) {
          var e = t.keys,
            r = t.index,
            n = t.subscriber,
            i = t.subscription,
            o = t.obj;
          if (!n.closed)
            if (r < e.length) {
              var s = e[r];
              n.next([s, o[s]]),
                i.add(this.schedule({ keys: e, index: r + 1, subscriber: n, subscription: i, obj: o }));
            } else n.complete();
        }
        var bt = r(8463),
          mt = r(7843),
          vt = r(6008);
        function wt(t, e, r) {
          return [(0, vt.h)(e, r)(new n.y((0, mt.s)(t))), (0, vt.h)((0, bt.f)(e, r))(new n.y((0, mt.s)(t)))];
        }
        var _t = r(8821);
        function St(t, e, r) {
          return (
            void 0 === t && (t = 0),
            new n.y(function (n) {
              void 0 === e && ((e = t), (t = 0));
              var i = 0,
                o = t;
              if (r) return r.schedule(Et, 0, { index: i, count: e, start: t, subscriber: n });
              for (;;) {
                if (i++ >= e) {
                  n.complete();
                  break;
                }
                if ((n.next(o++), n.closed)) break;
              }
            })
          );
        }
        function Et(t) {
          var e = t.start,
            r = t.index,
            n = t.count,
            i = t.subscriber;
          r >= n ? i.complete() : (i.next(e), i.closed || ((t.index = r + 1), (t.start = e + 1), this.schedule(t)));
        }
        var xt = r(4944),
          Mt = r(9604);
        function kt(t, e) {
          return new n.y(function (r) {
            var n, i;
            try {
              n = t();
            } catch (t) {
              return void r.error(t);
            }
            try {
              i = e(n);
            } catch (t) {
              return void r.error(t);
            }
            var o = (i ? (0, K.D)(i) : Y.E).subscribe(r);
            return function () {
              o.unsubscribe(), n && n.unsubscribe();
            };
          });
        }
        var At = r(5080),
          Ct = r(8107),
          Rt = r(150);
      },
      364: (t, e, r) => {
        'use strict';
        r.d(e, { c: () => s });
        var n = r(5987),
          i = r(211),
          o = r(8760),
          s = (function (t) {
            function e() {
              var e = (null !== t && t.apply(this, arguments)) || this;
              return (e.value = null), (e.hasNext = !1), (e.hasCompleted = !1), e;
            }
            return (
              n.ZT(e, t),
              (e.prototype._subscribe = function (e) {
                return this.hasError
                  ? (e.error(this.thrownError), o.w.EMPTY)
                  : this.hasCompleted && this.hasNext
                    ? (e.next(this.value), e.complete(), o.w.EMPTY)
                    : t.prototype._subscribe.call(this, e);
              }),
              (e.prototype.next = function (t) {
                this.hasCompleted || ((this.value = t), (this.hasNext = !0));
              }),
              (e.prototype.error = function (e) {
                this.hasCompleted || t.prototype.error.call(this, e);
              }),
              (e.prototype.complete = function () {
                (this.hasCompleted = !0),
                  this.hasNext && t.prototype.next.call(this, this.value),
                  t.prototype.complete.call(this);
              }),
              e
            );
          })(i.xQ);
      },
      9233: (t, e, r) => {
        'use strict';
        r.d(e, { X: () => s });
        var n = r(5987),
          i = r(211),
          o = r(1016),
          s = (function (t) {
            function e(e) {
              var r = t.call(this) || this;
              return (r._value = e), r;
            }
            return (
              n.ZT(e, t),
              Object.defineProperty(e.prototype, 'value', {
                get: function () {
                  return this.getValue();
                },
                enumerable: !0,
                configurable: !0,
              }),
              (e.prototype._subscribe = function (e) {
                var r = t.prototype._subscribe.call(this, e);
                return r && !r.closed && e.next(this._value), r;
              }),
              (e.prototype.getValue = function () {
                if (this.hasError) throw this.thrownError;
                if (this.closed) throw new o.N();
                return this._value;
              }),
              (e.prototype.next = function (e) {
                t.prototype.next.call(this, (this._value = e));
              }),
              e
            );
          })(i.xQ);
      },
      2632: (t, e, r) => {
        'use strict';
        r.d(e, { P: () => a, W: () => n });
        var n,
          i = r(5631),
          o = r(8170),
          s = r(4944);
        n || (n = {});
        var a = (function () {
          function t(t, e, r) {
            (this.kind = t), (this.value = e), (this.error = r), (this.hasValue = 'N' === t);
          }
          return (
            (t.prototype.observe = function (t) {
              switch (this.kind) {
                case 'N':
                  return t.next && t.next(this.value);
                case 'E':
                  return t.error && t.error(this.error);
                case 'C':
                  return t.complete && t.complete();
              }
            }),
            (t.prototype.do = function (t, e, r) {
              switch (this.kind) {
                case 'N':
                  return t && t(this.value);
                case 'E':
                  return e && e(this.error);
                case 'C':
                  return r && r();
              }
            }),
            (t.prototype.accept = function (t, e, r) {
              return t && 'function' == typeof t.next ? this.observe(t) : this.do(t, e, r);
            }),
            (t.prototype.toObservable = function () {
              switch (this.kind) {
                case 'N':
                  return (0, o.of)(this.value);
                case 'E':
                  return (0, s._)(this.error);
                case 'C':
                  return (0, i.c)();
              }
              throw new Error('unexpected notification kind value');
            }),
            (t.createNext = function (e) {
              return void 0 !== e ? new t('N', e) : t.undefinedValueNotification;
            }),
            (t.createError = function (e) {
              return new t('E', void 0, e);
            }),
            (t.createComplete = function () {
              return t.completeNotification;
            }),
            (t.completeNotification = new t('C')),
            (t.undefinedValueNotification = new t('N', void 0)),
            t
          );
        })();
      },
      2772: (t, e, r) => {
        'use strict';
        r.d(e, { y: () => l });
        var n = r(3642),
          i = r(979),
          o = r(3142),
          s = r(2174),
          a = r(5050),
          u = r(2561),
          c = r(150),
          l = (function () {
            function t(t) {
              (this._isScalar = !1), t && (this._subscribe = t);
            }
            return (
              (t.prototype.lift = function (e) {
                var r = new t();
                return (r.source = this), (r.operator = e), r;
              }),
              (t.prototype.subscribe = function (t, e, r) {
                var n = this.operator,
                  a = (function (t, e, r) {
                    if (t) {
                      if (t instanceof i.L) return t;
                      if (t[o.b]) return t[o.b]();
                    }
                    return t || e || r ? new i.L(t, e, r) : new i.L(s.c);
                  })(t, e, r);
                if (
                  (n
                    ? a.add(n.call(a, this.source))
                    : a.add(
                        this.source || (c.v.useDeprecatedSynchronousErrorHandling && !a.syncErrorThrowable)
                          ? this._subscribe(a)
                          : this._trySubscribe(a),
                      ),
                  c.v.useDeprecatedSynchronousErrorHandling &&
                    a.syncErrorThrowable &&
                    ((a.syncErrorThrowable = !1), a.syncErrorThrown))
                )
                  throw a.syncErrorValue;
                return a;
              }),
              (t.prototype._trySubscribe = function (t) {
                try {
                  return this._subscribe(t);
                } catch (e) {
                  c.v.useDeprecatedSynchronousErrorHandling && ((t.syncErrorThrown = !0), (t.syncErrorValue = e)),
                    (0, n._)(t) ? t.error(e) : console.warn(e);
                }
              }),
              (t.prototype.forEach = function (t, e) {
                var r = this;
                return new (e = h(e))(function (e, n) {
                  var i;
                  i = r.subscribe(
                    function (e) {
                      try {
                        t(e);
                      } catch (t) {
                        n(t), i && i.unsubscribe();
                      }
                    },
                    n,
                    e,
                  );
                });
              }),
              (t.prototype._subscribe = function (t) {
                var e = this.source;
                return e && e.subscribe(t);
              }),
              (t.prototype[a.L] = function () {
                return this;
              }),
              (t.prototype.pipe = function () {
                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                return 0 === t.length ? this : (0, u.U)(t)(this);
              }),
              (t.prototype.toPromise = function (t) {
                var e = this;
                return new (t = h(t))(function (t, r) {
                  var n;
                  e.subscribe(
                    function (t) {
                      return (n = t);
                    },
                    function (t) {
                      return r(t);
                    },
                    function () {
                      return t(n);
                    },
                  );
                });
              }),
              (t.create = function (e) {
                return new t(e);
              }),
              t
            );
          })();
        function h(t) {
          if ((t || (t = c.v.Promise || Promise), !t)) throw new Error('no Promise impl found');
          return t;
        }
      },
      2174: (t, e, r) => {
        'use strict';
        r.d(e, { c: () => o });
        var n = r(150),
          i = r(1644),
          o = {
            closed: !0,
            next: function (t) {},
            error: function (t) {
              if (n.v.useDeprecatedSynchronousErrorHandling) throw t;
              (0, i.z)(t);
            },
            complete: function () {},
          };
      },
      2039: (t, e, r) => {
        'use strict';
        r.d(e, { L: () => i });
        var n = r(5987),
          i = (function (t) {
            function e() {
              return (null !== t && t.apply(this, arguments)) || this;
            }
            return (
              n.ZT(e, t),
              (e.prototype.notifyNext = function (t, e, r, n, i) {
                this.destination.next(e);
              }),
              (e.prototype.notifyError = function (t, e) {
                this.destination.error(t);
              }),
              (e.prototype.notifyComplete = function (t) {
                this.destination.complete();
              }),
              e
            );
          })(r(979).L);
      },
      2630: (t, e, r) => {
        'use strict';
        r.d(e, { t: () => l });
        var n = r(5987),
          i = r(211),
          o = r(2546),
          s = r(8760),
          a = r(9276),
          u = r(1016),
          c = r(8253),
          l = (function (t) {
            function e(e, r, n) {
              void 0 === e && (e = Number.POSITIVE_INFINITY), void 0 === r && (r = Number.POSITIVE_INFINITY);
              var i = t.call(this) || this;
              return (
                (i.scheduler = n),
                (i._events = []),
                (i._infiniteTimeWindow = !1),
                (i._bufferSize = e < 1 ? 1 : e),
                (i._windowTime = r < 1 ? 1 : r),
                r === Number.POSITIVE_INFINITY
                  ? ((i._infiniteTimeWindow = !0), (i.next = i.nextInfiniteTimeWindow))
                  : (i.next = i.nextTimeWindow),
                i
              );
            }
            return (
              n.ZT(e, t),
              (e.prototype.nextInfiniteTimeWindow = function (e) {
                if (!this.isStopped) {
                  var r = this._events;
                  r.push(e), r.length > this._bufferSize && r.shift();
                }
                t.prototype.next.call(this, e);
              }),
              (e.prototype.nextTimeWindow = function (e) {
                this.isStopped || (this._events.push(new h(this._getNow(), e)), this._trimBufferThenGetEvents()),
                  t.prototype.next.call(this, e);
              }),
              (e.prototype._subscribe = function (t) {
                var e,
                  r = this._infiniteTimeWindow,
                  n = r ? this._events : this._trimBufferThenGetEvents(),
                  i = this.scheduler,
                  o = n.length;
                if (this.closed) throw new u.N();
                if (
                  (this.isStopped || this.hasError ? (e = s.w.EMPTY) : (this.observers.push(t), (e = new c.W(this, t))),
                  i && t.add((t = new a.ht(t, i))),
                  r)
                )
                  for (var l = 0; l < o && !t.closed; l++) t.next(n[l]);
                else for (l = 0; l < o && !t.closed; l++) t.next(n[l].value);
                return this.hasError ? t.error(this.thrownError) : this.isStopped && t.complete(), e;
              }),
              (e.prototype._getNow = function () {
                return (this.scheduler || o.c).now();
              }),
              (e.prototype._trimBufferThenGetEvents = function () {
                for (
                  var t = this._getNow(),
                    e = this._bufferSize,
                    r = this._windowTime,
                    n = this._events,
                    i = n.length,
                    o = 0;
                  o < i && !(t - n[o].time < r);

                )
                  o++;
                return i > e && (o = Math.max(o, i - e)), o > 0 && n.splice(0, o), n;
              }),
              e
            );
          })(i.xQ),
          h = (function () {
            return function (t, e) {
              (this.time = t), (this.value = e);
            };
          })();
      },
      8725: (t, e, r) => {
        'use strict';
        r.d(e, { b: () => n });
        var n = (function () {
          function t(e, r) {
            void 0 === r && (r = t.now), (this.SchedulerAction = e), (this.now = r);
          }
          return (
            (t.prototype.schedule = function (t, e, r) {
              return void 0 === e && (e = 0), new this.SchedulerAction(this, t).schedule(r, e);
            }),
            (t.now = function () {
              return Date.now();
            }),
            t
          );
        })();
      },
      211: (t, e, r) => {
        'use strict';
        r.d(e, { Yc: () => l, xQ: () => h });
        var n = r(5987),
          i = r(2772),
          o = r(979),
          s = r(8760),
          a = r(1016),
          u = r(8253),
          c = r(3142),
          l = (function (t) {
            function e(e) {
              var r = t.call(this, e) || this;
              return (r.destination = e), r;
            }
            return n.ZT(e, t), e;
          })(o.L),
          h = (function (t) {
            function e() {
              var e = t.call(this) || this;
              return (
                (e.observers = []), (e.closed = !1), (e.isStopped = !1), (e.hasError = !1), (e.thrownError = null), e
              );
            }
            return (
              n.ZT(e, t),
              (e.prototype[c.b] = function () {
                return new l(this);
              }),
              (e.prototype.lift = function (t) {
                var e = new f(this, this);
                return (e.operator = t), e;
              }),
              (e.prototype.next = function (t) {
                if (this.closed) throw new a.N();
                if (!this.isStopped)
                  for (var e = this.observers, r = e.length, n = e.slice(), i = 0; i < r; i++) n[i].next(t);
              }),
              (e.prototype.error = function (t) {
                if (this.closed) throw new a.N();
                (this.hasError = !0), (this.thrownError = t), (this.isStopped = !0);
                for (var e = this.observers, r = e.length, n = e.slice(), i = 0; i < r; i++) n[i].error(t);
                this.observers.length = 0;
              }),
              (e.prototype.complete = function () {
                if (this.closed) throw new a.N();
                this.isStopped = !0;
                for (var t = this.observers, e = t.length, r = t.slice(), n = 0; n < e; n++) r[n].complete();
                this.observers.length = 0;
              }),
              (e.prototype.unsubscribe = function () {
                (this.isStopped = !0), (this.closed = !0), (this.observers = null);
              }),
              (e.prototype._trySubscribe = function (e) {
                if (this.closed) throw new a.N();
                return t.prototype._trySubscribe.call(this, e);
              }),
              (e.prototype._subscribe = function (t) {
                if (this.closed) throw new a.N();
                return this.hasError
                  ? (t.error(this.thrownError), s.w.EMPTY)
                  : this.isStopped
                    ? (t.complete(), s.w.EMPTY)
                    : (this.observers.push(t), new u.W(this, t));
              }),
              (e.prototype.asObservable = function () {
                var t = new i.y();
                return (t.source = this), t;
              }),
              (e.create = function (t, e) {
                return new f(t, e);
              }),
              e
            );
          })(i.y),
          f = (function (t) {
            function e(e, r) {
              var n = t.call(this) || this;
              return (n.destination = e), (n.source = r), n;
            }
            return (
              n.ZT(e, t),
              (e.prototype.next = function (t) {
                var e = this.destination;
                e && e.next && e.next(t);
              }),
              (e.prototype.error = function (t) {
                var e = this.destination;
                e && e.error && this.destination.error(t);
              }),
              (e.prototype.complete = function () {
                var t = this.destination;
                t && t.complete && this.destination.complete();
              }),
              (e.prototype._subscribe = function (t) {
                return this.source ? this.source.subscribe(t) : s.w.EMPTY;
              }),
              e
            );
          })(h);
      },
      8253: (t, e, r) => {
        'use strict';
        r.d(e, { W: () => i });
        var n = r(5987),
          i = (function (t) {
            function e(e, r) {
              var n = t.call(this) || this;
              return (n.subject = e), (n.subscriber = r), (n.closed = !1), n;
            }
            return (
              n.ZT(e, t),
              (e.prototype.unsubscribe = function () {
                if (!this.closed) {
                  this.closed = !0;
                  var t = this.subject,
                    e = t.observers;
                  if (((this.subject = null), e && 0 !== e.length && !t.isStopped && !t.closed)) {
                    var r = e.indexOf(this.subscriber);
                    -1 !== r && e.splice(r, 1);
                  }
                }
              }),
              e
            );
          })(r(8760).w);
      },
      979: (t, e, r) => {
        'use strict';
        r.d(e, { L: () => l });
        var n = r(5987),
          i = r(4156),
          o = r(2174),
          s = r(8760),
          a = r(3142),
          u = r(150),
          c = r(1644),
          l = (function (t) {
            function e(r, n, i) {
              var s = t.call(this) || this;
              switch (
                ((s.syncErrorValue = null),
                (s.syncErrorThrown = !1),
                (s.syncErrorThrowable = !1),
                (s.isStopped = !1),
                arguments.length)
              ) {
                case 0:
                  s.destination = o.c;
                  break;
                case 1:
                  if (!r) {
                    s.destination = o.c;
                    break;
                  }
                  if ('object' == typeof r) {
                    r instanceof e
                      ? ((s.syncErrorThrowable = r.syncErrorThrowable), (s.destination = r), r.add(s))
                      : ((s.syncErrorThrowable = !0), (s.destination = new h(s, r)));
                    break;
                  }
                default:
                  (s.syncErrorThrowable = !0), (s.destination = new h(s, r, n, i));
              }
              return s;
            }
            return (
              n.ZT(e, t),
              (e.prototype[a.b] = function () {
                return this;
              }),
              (e.create = function (t, r, n) {
                var i = new e(t, r, n);
                return (i.syncErrorThrowable = !1), i;
              }),
              (e.prototype.next = function (t) {
                this.isStopped || this._next(t);
              }),
              (e.prototype.error = function (t) {
                this.isStopped || ((this.isStopped = !0), this._error(t));
              }),
              (e.prototype.complete = function () {
                this.isStopped || ((this.isStopped = !0), this._complete());
              }),
              (e.prototype.unsubscribe = function () {
                this.closed || ((this.isStopped = !0), t.prototype.unsubscribe.call(this));
              }),
              (e.prototype._next = function (t) {
                this.destination.next(t);
              }),
              (e.prototype._error = function (t) {
                this.destination.error(t), this.unsubscribe();
              }),
              (e.prototype._complete = function () {
                this.destination.complete(), this.unsubscribe();
              }),
              (e.prototype._unsubscribeAndRecycle = function () {
                var t = this._parentOrParents;
                return (
                  (this._parentOrParents = null),
                  this.unsubscribe(),
                  (this.closed = !1),
                  (this.isStopped = !1),
                  (this._parentOrParents = t),
                  this
                );
              }),
              e
            );
          })(s.w),
          h = (function (t) {
            function e(e, r, n, s) {
              var a,
                u = t.call(this) || this;
              u._parentSubscriber = e;
              var c = u;
              return (
                (0, i.m)(r)
                  ? (a = r)
                  : r &&
                    ((a = r.next),
                    (n = r.error),
                    (s = r.complete),
                    r !== o.c &&
                      ((c = Object.create(r)),
                      (0, i.m)(c.unsubscribe) && u.add(c.unsubscribe.bind(c)),
                      (c.unsubscribe = u.unsubscribe.bind(u)))),
                (u._context = c),
                (u._next = a),
                (u._error = n),
                (u._complete = s),
                u
              );
            }
            return (
              n.ZT(e, t),
              (e.prototype.next = function (t) {
                if (!this.isStopped && this._next) {
                  var e = this._parentSubscriber;
                  u.v.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable
                    ? this.__tryOrSetError(e, this._next, t) && this.unsubscribe()
                    : this.__tryOrUnsub(this._next, t);
                }
              }),
              (e.prototype.error = function (t) {
                if (!this.isStopped) {
                  var e = this._parentSubscriber,
                    r = u.v.useDeprecatedSynchronousErrorHandling;
                  if (this._error)
                    r && e.syncErrorThrowable
                      ? (this.__tryOrSetError(e, this._error, t), this.unsubscribe())
                      : (this.__tryOrUnsub(this._error, t), this.unsubscribe());
                  else if (e.syncErrorThrowable)
                    r ? ((e.syncErrorValue = t), (e.syncErrorThrown = !0)) : (0, c.z)(t), this.unsubscribe();
                  else {
                    if ((this.unsubscribe(), r)) throw t;
                    (0, c.z)(t);
                  }
                }
              }),
              (e.prototype.complete = function () {
                var t = this;
                if (!this.isStopped) {
                  var e = this._parentSubscriber;
                  if (this._complete) {
                    var r = function () {
                      return t._complete.call(t._context);
                    };
                    u.v.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable
                      ? (this.__tryOrSetError(e, r), this.unsubscribe())
                      : (this.__tryOrUnsub(r), this.unsubscribe());
                  } else this.unsubscribe();
                }
              }),
              (e.prototype.__tryOrUnsub = function (t, e) {
                try {
                  t.call(this._context, e);
                } catch (t) {
                  if ((this.unsubscribe(), u.v.useDeprecatedSynchronousErrorHandling)) throw t;
                  (0, c.z)(t);
                }
              }),
              (e.prototype.__tryOrSetError = function (t, e, r) {
                if (!u.v.useDeprecatedSynchronousErrorHandling) throw new Error('bad call');
                try {
                  e.call(this._context, r);
                } catch (e) {
                  return u.v.useDeprecatedSynchronousErrorHandling
                    ? ((t.syncErrorValue = e), (t.syncErrorThrown = !0), !0)
                    : ((0, c.z)(e), !0);
                }
                return !1;
              }),
              (e.prototype._unsubscribe = function () {
                var t = this._parentSubscriber;
                (this._context = null), (this._parentSubscriber = null), t.unsubscribe();
              }),
              e
            );
          })(l);
      },
      8760: (t, e, r) => {
        'use strict';
        r.d(e, { w: () => a });
        var n = r(9026),
          i = r(2009),
          o = r(4156),
          s = r(8782),
          a = (function () {
            function t(t) {
              (this.closed = !1),
                (this._parentOrParents = null),
                (this._subscriptions = null),
                t && ((this._ctorUnsubscribe = !0), (this._unsubscribe = t));
            }
            var e;
            return (
              (t.prototype.unsubscribe = function () {
                var e;
                if (!this.closed) {
                  var r = this,
                    a = r._parentOrParents,
                    c = r._ctorUnsubscribe,
                    l = r._unsubscribe,
                    h = r._subscriptions;
                  if (
                    ((this.closed = !0), (this._parentOrParents = null), (this._subscriptions = null), a instanceof t)
                  )
                    a.remove(this);
                  else if (null !== a) for (var f = 0; f < a.length; ++f) a[f].remove(this);
                  if ((0, o.m)(l)) {
                    c && (this._unsubscribe = void 0);
                    try {
                      l.call(this);
                    } catch (t) {
                      e = t instanceof s.B ? u(t.errors) : [t];
                    }
                  }
                  if ((0, n.k)(h)) {
                    f = -1;
                    for (var d = h.length; ++f < d; ) {
                      var p = h[f];
                      if ((0, i.K)(p))
                        try {
                          p.unsubscribe();
                        } catch (t) {
                          (e = e || []), t instanceof s.B ? (e = e.concat(u(t.errors))) : e.push(t);
                        }
                    }
                  }
                  if (e) throw new s.B(e);
                }
              }),
              (t.prototype.add = function (e) {
                var r = e;
                if (!e) return t.EMPTY;
                switch (typeof e) {
                  case 'function':
                    r = new t(e);
                  case 'object':
                    if (r === this || r.closed || 'function' != typeof r.unsubscribe) return r;
                    if (this.closed) return r.unsubscribe(), r;
                    if (!(r instanceof t)) {
                      var n = r;
                      (r = new t())._subscriptions = [n];
                    }
                    break;
                  default:
                    throw new Error('unrecognized teardown ' + e + ' added to Subscription.');
                }
                var i = r._parentOrParents;
                if (null === i) r._parentOrParents = this;
                else if (i instanceof t) {
                  if (i === this) return r;
                  r._parentOrParents = [i, this];
                } else {
                  if (-1 !== i.indexOf(this)) return r;
                  i.push(this);
                }
                var o = this._subscriptions;
                return null === o ? (this._subscriptions = [r]) : o.push(r), r;
              }),
              (t.prototype.remove = function (t) {
                var e = this._subscriptions;
                if (e) {
                  var r = e.indexOf(t);
                  -1 !== r && e.splice(r, 1);
                }
              }),
              (t.EMPTY = (((e = new t()).closed = !0), e)),
              t
            );
          })();
        function u(t) {
          return t.reduce(function (t, e) {
            return t.concat(e instanceof s.B ? e.errors : e);
          }, []);
        }
      },
      150: (t, e, r) => {
        'use strict';
        r.d(e, { v: () => i });
        var n = !1,
          i = {
            Promise: void 0,
            set useDeprecatedSynchronousErrorHandling(t) {
              t && new Error().stack, (n = t);
            },
            get useDeprecatedSynchronousErrorHandling() {
              return n;
            },
          };
      },
      7604: (t, e, r) => {
        'use strict';
        r.d(e, { Ds: () => u, IY: () => a, ft: () => c });
        var n = r(5987),
          i = r(979),
          o = r(2772),
          s = r(7843),
          a = (function (t) {
            function e(e) {
              var r = t.call(this) || this;
              return (r.parent = e), r;
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                this.parent.notifyNext(t);
              }),
              (e.prototype._error = function (t) {
                this.parent.notifyError(t), this.unsubscribe();
              }),
              (e.prototype._complete = function () {
                this.parent.notifyComplete(), this.unsubscribe();
              }),
              e
            );
          })(i.L),
          u =
            (i.L,
            (function (t) {
              function e() {
                return (null !== t && t.apply(this, arguments)) || this;
              }
              return (
                n.ZT(e, t),
                (e.prototype.notifyNext = function (t) {
                  this.destination.next(t);
                }),
                (e.prototype.notifyError = function (t) {
                  this.destination.error(t);
                }),
                (e.prototype.notifyComplete = function () {
                  this.destination.complete();
                }),
                e
              );
            })(i.L));
        function c(t, e) {
          if (!e.closed) {
            if (t instanceof o.y) return t.subscribe(e);
            var r;
            try {
              r = (0, s.s)(t)(e);
            } catch (t) {
              e.error(t);
            }
            return r;
          }
        }
        i.L;
      },
      3140: (t, e, r) => {
        'use strict';
        r.d(e, { N: () => l, c: () => c });
        var n = r(5987),
          i = r(211),
          o = r(2772),
          s = r(979),
          a = r(8760),
          u = r(3018),
          c = (function (t) {
            function e(e, r) {
              var n = t.call(this) || this;
              return (n.source = e), (n.subjectFactory = r), (n._refCount = 0), (n._isComplete = !1), n;
            }
            return (
              n.ZT(e, t),
              (e.prototype._subscribe = function (t) {
                return this.getSubject().subscribe(t);
              }),
              (e.prototype.getSubject = function () {
                var t = this._subject;
                return (t && !t.isStopped) || (this._subject = this.subjectFactory()), this._subject;
              }),
              (e.prototype.connect = function () {
                var t = this._connection;
                return (
                  t ||
                    ((this._isComplete = !1),
                    (t = this._connection = new a.w()).add(this.source.subscribe(new h(this.getSubject(), this))),
                    t.closed && ((this._connection = null), (t = a.w.EMPTY))),
                  t
                );
              }),
              (e.prototype.refCount = function () {
                return (0, u.x)()(this);
              }),
              e
            );
          })(o.y),
          l = (function () {
            var t = c.prototype;
            return {
              operator: { value: null },
              _refCount: { value: 0, writable: !0 },
              _subject: { value: null, writable: !0 },
              _connection: { value: null, writable: !0 },
              _subscribe: { value: t._subscribe },
              _isComplete: { value: t._isComplete, writable: !0 },
              getSubject: { value: t.getSubject },
              connect: { value: t.connect },
              refCount: { value: t.refCount },
            };
          })(),
          h = (function (t) {
            function e(e, r) {
              var n = t.call(this, e) || this;
              return (n.connectable = r), n;
            }
            return (
              n.ZT(e, t),
              (e.prototype._error = function (e) {
                this._unsubscribe(), t.prototype._error.call(this, e);
              }),
              (e.prototype._complete = function () {
                (this.connectable._isComplete = !0), this._unsubscribe(), t.prototype._complete.call(this);
              }),
              (e.prototype._unsubscribe = function () {
                var t = this.connectable;
                if (t) {
                  this.connectable = null;
                  var e = t._connection;
                  (t._refCount = 0), (t._subject = null), (t._connection = null), e && e.unsubscribe();
                }
              }),
              e
            );
          })(i.Yc);
        s.L;
      },
      5142: (t, e, r) => {
        'use strict';
        r.d(e, { Ms: () => h, aj: () => l });
        var n = r(5987),
          i = r(7507),
          o = r(9026),
          s = r(2039),
          a = r(2080),
          u = r(3375),
          c = {};
        function l() {
          for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
          var r = void 0,
            n = void 0;
          return (
            (0, i.K)(t[t.length - 1]) && (n = t.pop()),
            'function' == typeof t[t.length - 1] && (r = t.pop()),
            1 === t.length && (0, o.k)(t[0]) && (t = t[0]),
            (0, u.n)(t, n).lift(new h(r))
          );
        }
        var h = (function () {
            function t(t) {
              this.resultSelector = t;
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new f(t, this.resultSelector));
              }),
              t
            );
          })(),
          f = (function (t) {
            function e(e, r) {
              var n = t.call(this, e) || this;
              return (n.resultSelector = r), (n.active = 0), (n.values = []), (n.observables = []), n;
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                this.values.push(c), this.observables.push(t);
              }),
              (e.prototype._complete = function () {
                var t = this.observables,
                  e = t.length;
                if (0 === e) this.destination.complete();
                else {
                  (this.active = e), (this.toRespond = e);
                  for (var r = 0; r < e; r++) {
                    var n = t[r];
                    this.add((0, a.D)(this, n, void 0, r));
                  }
                }
              }),
              (e.prototype.notifyComplete = function (t) {
                0 == (this.active -= 1) && this.destination.complete();
              }),
              (e.prototype.notifyNext = function (t, e, r) {
                var n = this.values,
                  i = n[r],
                  o = this.toRespond ? (i === c ? --this.toRespond : this.toRespond) : 0;
                (n[r] = e),
                  0 === o && (this.resultSelector ? this._tryResultSelector(n) : this.destination.next(n.slice()));
              }),
              (e.prototype._tryResultSelector = function (t) {
                var e;
                try {
                  e = this.resultSelector.apply(this, t);
                } catch (t) {
                  return void this.destination.error(t);
                }
                this.destination.next(e);
              }),
              e
            );
          })(s.L);
      },
      9795: (t, e, r) => {
        'use strict';
        r.d(e, { z: () => o });
        var n = r(8170),
          i = r(2257);
        function o() {
          for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
          return (0, i.u)()(n.of.apply(void 0, t));
        }
      },
      1410: (t, e, r) => {
        'use strict';
        r.d(e, { P: () => s });
        var n = r(2772),
          i = r(5760),
          o = r(5631);
        function s(t) {
          return new n.y(function (e) {
            var r;
            try {
              r = t();
            } catch (t) {
              return void e.error(t);
            }
            return (r ? (0, i.D)(r) : (0, o.c)()).subscribe(e);
          });
        }
      },
      5631: (t, e, r) => {
        'use strict';
        r.d(e, { E: () => i, c: () => o });
        var n = r(2772),
          i = new n.y(function (t) {
            return t.complete();
          });
        function o(t) {
          return t
            ? (function (t) {
                return new n.y(function (e) {
                  return t.schedule(function () {
                    return e.complete();
                  });
                });
              })(t)
            : i;
        }
      },
      5760: (t, e, r) => {
        'use strict';
        r.d(e, { D: () => s });
        var n = r(2772),
          i = r(7843),
          o = r(8107);
        function s(t, e) {
          return e ? (0, o.x)(t, e) : t instanceof n.y ? t : new n.y((0, i.s)(t));
        }
      },
      3375: (t, e, r) => {
        'use strict';
        r.d(e, { n: () => s });
        var n = r(2772),
          i = r(6900),
          o = r(3109);
        function s(t, e) {
          return e ? (0, o.r)(t, e) : new n.y((0, i.V)(t));
        }
      },
      4370: (t, e, r) => {
        'use strict';
        r.d(e, { T: () => a });
        var n = r(2772),
          i = r(7507),
          o = r(2556),
          s = r(3375);
        function a() {
          for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
          var r = Number.POSITIVE_INFINITY,
            a = null,
            u = t[t.length - 1];
          return (
            (0, i.K)(u)
              ? ((a = t.pop()), t.length > 1 && 'number' == typeof t[t.length - 1] && (r = t.pop()))
              : 'number' == typeof u && (r = t.pop()),
            null === a && 1 === t.length && t[0] instanceof n.y ? t[0] : (0, o.J)(r)((0, s.n)(t, a))
          );
        }
      },
      8170: (t, e, r) => {
        'use strict';
        r.d(e, { of: () => s });
        var n = r(7507),
          i = r(3375),
          o = r(3109);
        function s() {
          for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
          var r = t[t.length - 1];
          return (0, n.K)(r) ? (t.pop(), (0, o.r)(t, r)) : (0, i.n)(t);
        }
      },
      8821: (t, e, r) => {
        'use strict';
        r.d(e, { S3: () => u });
        var n = r(5987),
          i = r(9026),
          o = r(3375),
          s = r(2039),
          a = r(2080);
        function u() {
          for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
          if (1 === t.length) {
            if (!(0, i.k)(t[0])) return t[0];
            t = t[0];
          }
          return (0, o.n)(t, void 0).lift(new c());
        }
        var c = (function () {
            function t() {}
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new l(t));
              }),
              t
            );
          })(),
          l = (function (t) {
            function e(e) {
              var r = t.call(this, e) || this;
              return (r.hasFirst = !1), (r.observables = []), (r.subscriptions = []), r;
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                this.observables.push(t);
              }),
              (e.prototype._complete = function () {
                var t = this.observables,
                  e = t.length;
                if (0 === e) this.destination.complete();
                else {
                  for (var r = 0; r < e && !this.hasFirst; r++) {
                    var n = t[r],
                      i = (0, a.D)(this, n, void 0, r);
                    this.subscriptions && this.subscriptions.push(i), this.add(i);
                  }
                  this.observables = null;
                }
              }),
              (e.prototype.notifyNext = function (t, e, r) {
                if (!this.hasFirst) {
                  this.hasFirst = !0;
                  for (var n = 0; n < this.subscriptions.length; n++)
                    if (n !== r) {
                      var i = this.subscriptions[n];
                      i.unsubscribe(), this.remove(i);
                    }
                  this.subscriptions = null;
                }
                this.destination.next(e);
              }),
              e
            );
          })(s.L);
      },
      4944: (t, e, r) => {
        'use strict';
        r.d(e, { _: () => i });
        var n = r(2772);
        function i(t, e) {
          return e
            ? new n.y(function (r) {
                return e.schedule(o, 0, { error: t, subscriber: r });
              })
            : new n.y(function (e) {
                return e.error(t);
              });
        }
        function o(t) {
          var e = t.error;
          t.subscriber.error(e);
        }
      },
      9604: (t, e, r) => {
        'use strict';
        r.d(e, { H: () => a });
        var n = r(2772),
          i = r(964),
          o = r(5812),
          s = r(7507);
        function a(t, e, r) {
          void 0 === t && (t = 0);
          var a = -1;
          return (
            (0, o.k)(e) ? (a = Number(e) < 1 ? 1 : Number(e)) : (0, s.K)(e) && (r = e),
            (0, s.K)(r) || (r = i.P),
            new n.y(function (e) {
              var n = (0, o.k)(t) ? t : +t - r.now();
              return r.schedule(u, n, { index: 0, period: a, subscriber: e });
            })
          );
        }
        function u(t) {
          var e = t.index,
            r = t.period,
            n = t.subscriber;
          if ((n.next(e), !n.closed)) {
            if (-1 === r) return n.complete();
            (t.index = e + 1), this.schedule(t, r);
          }
        }
      },
      5080: (t, e, r) => {
        'use strict';
        r.d(e, { $R: () => c, mx: () => l });
        var n = r(5987),
          i = r(3375),
          o = r(9026),
          s = r(979),
          a = r(999),
          u = r(7604);
        function c() {
          for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
          var r = t[t.length - 1];
          return 'function' == typeof r && t.pop(), (0, i.n)(t, void 0).lift(new l(r));
        }
        var l = (function () {
            function t(t) {
              this.resultSelector = t;
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new h(t, this.resultSelector));
              }),
              t
            );
          })(),
          h = (function (t) {
            function e(e, r, n) {
              void 0 === n && (n = Object.create(null));
              var i = t.call(this, e) || this;
              return (
                (i.resultSelector = r),
                (i.iterators = []),
                (i.active = 0),
                (i.resultSelector = 'function' == typeof r ? r : void 0),
                i
              );
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                var e = this.iterators;
                (0, o.k)(t)
                  ? e.push(new d(t))
                  : 'function' == typeof t[a.hZ]
                    ? e.push(new f(t[a.hZ]()))
                    : e.push(new p(this.destination, this, t));
              }),
              (e.prototype._complete = function () {
                var t = this.iterators,
                  e = t.length;
                if ((this.unsubscribe(), 0 !== e)) {
                  this.active = e;
                  for (var r = 0; r < e; r++) {
                    var n = t[r];
                    n.stillUnsubscribed ? this.destination.add(n.subscribe()) : this.active--;
                  }
                } else this.destination.complete();
              }),
              (e.prototype.notifyInactive = function () {
                this.active--, 0 === this.active && this.destination.complete();
              }),
              (e.prototype.checkIterators = function () {
                for (var t = this.iterators, e = t.length, r = this.destination, n = 0; n < e; n++)
                  if ('function' == typeof (s = t[n]).hasValue && !s.hasValue()) return;
                var i = !1,
                  o = [];
                for (n = 0; n < e; n++) {
                  var s,
                    a = (s = t[n]).next();
                  if ((s.hasCompleted() && (i = !0), a.done)) return void r.complete();
                  o.push(a.value);
                }
                this.resultSelector ? this._tryresultSelector(o) : r.next(o), i && r.complete();
              }),
              (e.prototype._tryresultSelector = function (t) {
                var e;
                try {
                  e = this.resultSelector.apply(this, t);
                } catch (t) {
                  return void this.destination.error(t);
                }
                this.destination.next(e);
              }),
              e
            );
          })(s.L),
          f = (function () {
            function t(t) {
              (this.iterator = t), (this.nextResult = t.next());
            }
            return (
              (t.prototype.hasValue = function () {
                return !0;
              }),
              (t.prototype.next = function () {
                var t = this.nextResult;
                return (this.nextResult = this.iterator.next()), t;
              }),
              (t.prototype.hasCompleted = function () {
                var t = this.nextResult;
                return Boolean(t && t.done);
              }),
              t
            );
          })(),
          d = (function () {
            function t(t) {
              (this.array = t), (this.index = 0), (this.length = 0), (this.length = t.length);
            }
            return (
              (t.prototype[a.hZ] = function () {
                return this;
              }),
              (t.prototype.next = function (t) {
                var e = this.index++,
                  r = this.array;
                return e < this.length ? { value: r[e], done: !1 } : { value: null, done: !0 };
              }),
              (t.prototype.hasValue = function () {
                return this.array.length > this.index;
              }),
              (t.prototype.hasCompleted = function () {
                return this.array.length === this.index;
              }),
              t
            );
          })(),
          p = (function (t) {
            function e(e, r, n) {
              var i = t.call(this, e) || this;
              return (
                (i.parent = r), (i.observable = n), (i.stillUnsubscribed = !0), (i.buffer = []), (i.isComplete = !1), i
              );
            }
            return (
              n.ZT(e, t),
              (e.prototype[a.hZ] = function () {
                return this;
              }),
              (e.prototype.next = function () {
                var t = this.buffer;
                return 0 === t.length && this.isComplete ? { value: null, done: !0 } : { value: t.shift(), done: !1 };
              }),
              (e.prototype.hasValue = function () {
                return this.buffer.length > 0;
              }),
              (e.prototype.hasCompleted = function () {
                return 0 === this.buffer.length && this.isComplete;
              }),
              (e.prototype.notifyComplete = function () {
                this.buffer.length > 0
                  ? ((this.isComplete = !0), this.parent.notifyInactive())
                  : this.destination.complete();
              }),
              (e.prototype.notifyNext = function (t) {
                this.buffer.push(t), this.parent.checkIterators();
              }),
              (e.prototype.subscribe = function () {
                return (0, u.ft)(this.observable, new u.IY(this));
              }),
              e
            );
          })(u.Ds);
      },
      2257: (t, e, r) => {
        'use strict';
        r.d(e, { u: () => i });
        var n = r(2556);
        function i() {
          return (0, n.J)(1);
        }
      },
      6008: (t, e, r) => {
        'use strict';
        r.d(e, { h: () => o });
        var n = r(5987),
          i = r(979);
        function o(t, e) {
          return function (r) {
            return r.lift(new s(t, e));
          };
        }
        var s = (function () {
            function t(t, e) {
              (this.predicate = t), (this.thisArg = e);
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new a(t, this.predicate, this.thisArg));
              }),
              t
            );
          })(),
          a = (function (t) {
            function e(e, r, n) {
              var i = t.call(this, e) || this;
              return (i.predicate = r), (i.thisArg = n), (i.count = 0), i;
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                var e;
                try {
                  e = this.predicate.call(this.thisArg, t, this.count++);
                } catch (t) {
                  return void this.destination.error(t);
                }
                e && this.destination.next(t);
              }),
              e
            );
          })(i.L);
      },
      1120: (t, e, r) => {
        'use strict';
        r.d(e, { T: () => f, v: () => u });
        var n = r(5987),
          i = r(979),
          o = r(8760),
          s = r(2772),
          a = r(211);
        function u(t, e, r, n) {
          return function (i) {
            return i.lift(new c(t, e, r, n));
          };
        }
        var c = (function () {
            function t(t, e, r, n) {
              (this.keySelector = t),
                (this.elementSelector = e),
                (this.durationSelector = r),
                (this.subjectSelector = n);
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(
                  new l(t, this.keySelector, this.elementSelector, this.durationSelector, this.subjectSelector),
                );
              }),
              t
            );
          })(),
          l = (function (t) {
            function e(e, r, n, i, o) {
              var s = t.call(this, e) || this;
              return (
                (s.keySelector = r),
                (s.elementSelector = n),
                (s.durationSelector = i),
                (s.subjectSelector = o),
                (s.groups = null),
                (s.attemptedToUnsubscribe = !1),
                (s.count = 0),
                s
              );
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                var e;
                try {
                  e = this.keySelector(t);
                } catch (t) {
                  return void this.error(t);
                }
                this._group(t, e);
              }),
              (e.prototype._group = function (t, e) {
                var r = this.groups;
                r || (r = this.groups = new Map());
                var n,
                  i = r.get(e);
                if (this.elementSelector)
                  try {
                    n = this.elementSelector(t);
                  } catch (t) {
                    this.error(t);
                  }
                else n = t;
                if (!i) {
                  (i = this.subjectSelector ? this.subjectSelector() : new a.xQ()), r.set(e, i);
                  var o = new f(e, i, this);
                  if ((this.destination.next(o), this.durationSelector)) {
                    var s = void 0;
                    try {
                      s = this.durationSelector(new f(e, i));
                    } catch (t) {
                      return void this.error(t);
                    }
                    this.add(s.subscribe(new h(e, i, this)));
                  }
                }
                i.closed || i.next(n);
              }),
              (e.prototype._error = function (t) {
                var e = this.groups;
                e &&
                  (e.forEach(function (e, r) {
                    e.error(t);
                  }),
                  e.clear()),
                  this.destination.error(t);
              }),
              (e.prototype._complete = function () {
                var t = this.groups;
                t &&
                  (t.forEach(function (t, e) {
                    t.complete();
                  }),
                  t.clear()),
                  this.destination.complete();
              }),
              (e.prototype.removeGroup = function (t) {
                this.groups.delete(t);
              }),
              (e.prototype.unsubscribe = function () {
                this.closed ||
                  ((this.attemptedToUnsubscribe = !0), 0 === this.count && t.prototype.unsubscribe.call(this));
              }),
              e
            );
          })(i.L),
          h = (function (t) {
            function e(e, r, n) {
              var i = t.call(this, r) || this;
              return (i.key = e), (i.group = r), (i.parent = n), i;
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                this.complete();
              }),
              (e.prototype._unsubscribe = function () {
                var t = this.parent,
                  e = this.key;
                (this.key = this.parent = null), t && t.removeGroup(e);
              }),
              e
            );
          })(i.L),
          f = (function (t) {
            function e(e, r, n) {
              var i = t.call(this) || this;
              return (i.key = e), (i.groupSubject = r), (i.refCountSubscription = n), i;
            }
            return (
              n.ZT(e, t),
              (e.prototype._subscribe = function (t) {
                var e = new o.w(),
                  r = this.refCountSubscription,
                  n = this.groupSubject;
                return r && !r.closed && e.add(new d(r)), e.add(n.subscribe(t)), e;
              }),
              e
            );
          })(s.y),
          d = (function (t) {
            function e(e) {
              var r = t.call(this) || this;
              return (r.parent = e), e.count++, r;
            }
            return (
              n.ZT(e, t),
              (e.prototype.unsubscribe = function () {
                var e = this.parent;
                e.closed ||
                  this.closed ||
                  (t.prototype.unsubscribe.call(this),
                  (e.count -= 1),
                  0 === e.count && e.attemptedToUnsubscribe && e.unsubscribe());
              }),
              e
            );
          })(o.w);
      },
      5709: (t, e, r) => {
        'use strict';
        r.d(e, { U: () => o });
        var n = r(5987),
          i = r(979);
        function o(t, e) {
          return function (r) {
            if ('function' != typeof t)
              throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
            return r.lift(new s(t, e));
          };
        }
        var s = (function () {
            function t(t, e) {
              (this.project = t), (this.thisArg = e);
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new a(t, this.project, this.thisArg));
              }),
              t
            );
          })(),
          a = (function (t) {
            function e(e, r, n) {
              var i = t.call(this, e) || this;
              return (i.project = r), (i.count = 0), (i.thisArg = n || i), i;
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                var e;
                try {
                  e = this.project.call(this.thisArg, t, this.count++);
                } catch (t) {
                  return void this.destination.error(t);
                }
                this.destination.next(e);
              }),
              e
            );
          })(i.L);
      },
      2556: (t, e, r) => {
        'use strict';
        r.d(e, { J: () => o });
        var n = r(7746),
          i = r(3608);
        function o(t) {
          return void 0 === t && (t = Number.POSITIVE_INFINITY), (0, n.zg)(i.y, t);
        }
      },
      7746: (t, e, r) => {
        'use strict';
        r.d(e, { VS: () => l, zg: () => a });
        var n = r(5987),
          i = r(5709),
          o = r(5760),
          s = r(7604);
        function a(t, e, r) {
          return (
            void 0 === r && (r = Number.POSITIVE_INFINITY),
            'function' == typeof e
              ? function (n) {
                  return n.pipe(
                    a(function (r, n) {
                      return (0, o.D)(t(r, n)).pipe(
                        (0, i.U)(function (t, i) {
                          return e(r, t, n, i);
                        }),
                      );
                    }, r),
                  );
                }
              : ('number' == typeof e && (r = e),
                function (e) {
                  return e.lift(new u(t, r));
                })
          );
        }
        var u = (function () {
            function t(t, e) {
              void 0 === e && (e = Number.POSITIVE_INFINITY), (this.project = t), (this.concurrent = e);
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new c(t, this.project, this.concurrent));
              }),
              t
            );
          })(),
          c = (function (t) {
            function e(e, r, n) {
              void 0 === n && (n = Number.POSITIVE_INFINITY);
              var i = t.call(this, e) || this;
              return (
                (i.project = r),
                (i.concurrent = n),
                (i.hasCompleted = !1),
                (i.buffer = []),
                (i.active = 0),
                (i.index = 0),
                i
              );
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                this.active < this.concurrent ? this._tryNext(t) : this.buffer.push(t);
              }),
              (e.prototype._tryNext = function (t) {
                var e,
                  r = this.index++;
                try {
                  e = this.project(t, r);
                } catch (t) {
                  return void this.destination.error(t);
                }
                this.active++, this._innerSub(e);
              }),
              (e.prototype._innerSub = function (t) {
                var e = new s.IY(this),
                  r = this.destination;
                r.add(e);
                var n = (0, s.ft)(t, e);
                n !== e && r.add(n);
              }),
              (e.prototype._complete = function () {
                (this.hasCompleted = !0),
                  0 === this.active && 0 === this.buffer.length && this.destination.complete(),
                  this.unsubscribe();
              }),
              (e.prototype.notifyNext = function (t) {
                this.destination.next(t);
              }),
              (e.prototype.notifyComplete = function () {
                var t = this.buffer;
                this.active--,
                  t.length > 0
                    ? this._next(t.shift())
                    : 0 === this.active && this.hasCompleted && this.destination.complete();
              }),
              e
            );
          })(s.Ds),
          l = a;
      },
      9276: (t, e, r) => {
        'use strict';
        r.d(e, { QV: () => s, ht: () => u });
        var n = r(5987),
          i = r(979),
          o = r(2632);
        function s(t, e) {
          return (
            void 0 === e && (e = 0),
            function (r) {
              return r.lift(new a(t, e));
            }
          );
        }
        var a = (function () {
            function t(t, e) {
              void 0 === e && (e = 0), (this.scheduler = t), (this.delay = e);
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new u(t, this.scheduler, this.delay));
              }),
              t
            );
          })(),
          u = (function (t) {
            function e(e, r, n) {
              void 0 === n && (n = 0);
              var i = t.call(this, e) || this;
              return (i.scheduler = r), (i.delay = n), i;
            }
            return (
              n.ZT(e, t),
              (e.dispatch = function (t) {
                var e = t.notification,
                  r = t.destination;
                e.observe(r), this.unsubscribe();
              }),
              (e.prototype.scheduleMessage = function (t) {
                this.destination.add(this.scheduler.schedule(e.dispatch, this.delay, new c(t, this.destination)));
              }),
              (e.prototype._next = function (t) {
                this.scheduleMessage(o.P.createNext(t));
              }),
              (e.prototype._error = function (t) {
                this.scheduleMessage(o.P.createError(t)), this.unsubscribe();
              }),
              (e.prototype._complete = function () {
                this.scheduleMessage(o.P.createComplete()), this.unsubscribe();
              }),
              e
            );
          })(i.L),
          c = (function () {
            return function (t, e) {
              (this.notification = t), (this.destination = e);
            };
          })();
      },
      3018: (t, e, r) => {
        'use strict';
        r.d(e, { x: () => o });
        var n = r(5987),
          i = r(979);
        function o() {
          return function (t) {
            return t.lift(new s(t));
          };
        }
        var s = (function () {
            function t(t) {
              this.connectable = t;
            }
            return (
              (t.prototype.call = function (t, e) {
                var r = this.connectable;
                r._refCount++;
                var n = new a(t, r),
                  i = e.subscribe(n);
                return n.closed || (n.connection = r.connect()), i;
              }),
              t
            );
          })(),
          a = (function (t) {
            function e(e, r) {
              var n = t.call(this, e) || this;
              return (n.connectable = r), n;
            }
            return (
              n.ZT(e, t),
              (e.prototype._unsubscribe = function () {
                var t = this.connectable;
                if (t) {
                  this.connectable = null;
                  var e = t._refCount;
                  if (e <= 0) this.connection = null;
                  else if (((t._refCount = e - 1), e > 1)) this.connection = null;
                  else {
                    var r = this.connection,
                      n = t._connection;
                    (this.connection = null), !n || (r && n !== r) || n.unsubscribe();
                  }
                } else this.connection = null;
              }),
              e
            );
          })(i.L);
      },
      3109: (t, e, r) => {
        'use strict';
        r.d(e, { r: () => o });
        var n = r(2772),
          i = r(8760);
        function o(t, e) {
          return new n.y(function (r) {
            var n = new i.w(),
              o = 0;
            return (
              n.add(
                e.schedule(function () {
                  o !== t.length ? (r.next(t[o++]), r.closed || n.add(this.schedule())) : r.complete();
                }),
              ),
              n
            );
          });
        }
      },
      8107: (t, e, r) => {
        'use strict';
        r.d(e, { x: () => l });
        var n = r(2772),
          i = r(8760),
          o = r(5050),
          s = r(3109),
          a = r(999),
          u = r(336),
          c = r(9217);
        function l(t, e) {
          if (null != t) {
            if (
              (function (t) {
                return t && 'function' == typeof t[o.L];
              })(t)
            )
              return (function (t, e) {
                return new n.y(function (r) {
                  var n = new i.w();
                  return (
                    n.add(
                      e.schedule(function () {
                        var i = t[o.L]();
                        n.add(
                          i.subscribe({
                            next: function (t) {
                              n.add(
                                e.schedule(function () {
                                  return r.next(t);
                                }),
                              );
                            },
                            error: function (t) {
                              n.add(
                                e.schedule(function () {
                                  return r.error(t);
                                }),
                              );
                            },
                            complete: function () {
                              n.add(
                                e.schedule(function () {
                                  return r.complete();
                                }),
                              );
                            },
                          }),
                        );
                      }),
                    ),
                    n
                  );
                });
              })(t, e);
            if ((0, u.t)(t))
              return (function (t, e) {
                return new n.y(function (r) {
                  var n = new i.w();
                  return (
                    n.add(
                      e.schedule(function () {
                        return t.then(
                          function (t) {
                            n.add(
                              e.schedule(function () {
                                r.next(t),
                                  n.add(
                                    e.schedule(function () {
                                      return r.complete();
                                    }),
                                  );
                              }),
                            );
                          },
                          function (t) {
                            n.add(
                              e.schedule(function () {
                                return r.error(t);
                              }),
                            );
                          },
                        );
                      }),
                    ),
                    n
                  );
                });
              })(t, e);
            if ((0, c.z)(t)) return (0, s.r)(t, e);
            if (
              (function (t) {
                return t && 'function' == typeof t[a.hZ];
              })(t) ||
              'string' == typeof t
            )
              return (function (t, e) {
                if (!t) throw new Error('Iterable cannot be null');
                return new n.y(function (r) {
                  var n,
                    o = new i.w();
                  return (
                    o.add(function () {
                      n && 'function' == typeof n.return && n.return();
                    }),
                    o.add(
                      e.schedule(function () {
                        (n = t[a.hZ]()),
                          o.add(
                            e.schedule(function () {
                              if (!r.closed) {
                                var t, e;
                                try {
                                  var i = n.next();
                                  (t = i.value), (e = i.done);
                                } catch (t) {
                                  return void r.error(t);
                                }
                                e ? r.complete() : (r.next(t), this.schedule());
                              }
                            }),
                          );
                      }),
                    ),
                    o
                  );
                });
              })(t, e);
          }
          throw new TypeError(((null !== t && typeof t) || t) + ' is not observable');
        }
      },
      6114: (t, e, r) => {
        'use strict';
        r.d(e, { o: () => i });
        var n = r(5987),
          i = (function (t) {
            function e(e, r) {
              var n = t.call(this, e, r) || this;
              return (n.scheduler = e), (n.work = r), (n.pending = !1), n;
            }
            return (
              n.ZT(e, t),
              (e.prototype.schedule = function (t, e) {
                if ((void 0 === e && (e = 0), this.closed)) return this;
                this.state = t;
                var r = this.id,
                  n = this.scheduler;
                return (
                  null != r && (this.id = this.recycleAsyncId(n, r, e)),
                  (this.pending = !0),
                  (this.delay = e),
                  (this.id = this.id || this.requestAsyncId(n, this.id, e)),
                  this
                );
              }),
              (e.prototype.requestAsyncId = function (t, e, r) {
                return void 0 === r && (r = 0), setInterval(t.flush.bind(t, this), r);
              }),
              (e.prototype.recycleAsyncId = function (t, e, r) {
                if ((void 0 === r && (r = 0), null !== r && this.delay === r && !1 === this.pending)) return e;
                clearInterval(e);
              }),
              (e.prototype.execute = function (t, e) {
                if (this.closed) return new Error('executing a cancelled action');
                this.pending = !1;
                var r = this._execute(t, e);
                if (r) return r;
                !1 === this.pending &&
                  null != this.id &&
                  (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
              }),
              (e.prototype._execute = function (t, e) {
                var r = !1,
                  n = void 0;
                try {
                  this.work(t);
                } catch (t) {
                  (r = !0), (n = (!!t && t) || new Error(t));
                }
                if (r) return this.unsubscribe(), n;
              }),
              (e.prototype._unsubscribe = function () {
                var t = this.id,
                  e = this.scheduler,
                  r = e.actions,
                  n = r.indexOf(this);
                (this.work = null),
                  (this.state = null),
                  (this.pending = !1),
                  (this.scheduler = null),
                  -1 !== n && r.splice(n, 1),
                  null != t && (this.id = this.recycleAsyncId(e, t, null)),
                  (this.delay = null);
              }),
              e
            );
          })(
            (function (t) {
              function e(e, r) {
                return t.call(this) || this;
              }
              return (
                n.ZT(e, t),
                (e.prototype.schedule = function (t, e) {
                  return void 0 === e && (e = 0), this;
                }),
                e
              );
            })(r(8760).w),
          );
      },
      8399: (t, e, r) => {
        'use strict';
        r.d(e, { v: () => o });
        var n = r(5987),
          i = r(8725),
          o = (function (t) {
            function e(r, n) {
              void 0 === n && (n = i.b.now);
              var o =
                t.call(this, r, function () {
                  return e.delegate && e.delegate !== o ? e.delegate.now() : n();
                }) || this;
              return (o.actions = []), (o.active = !1), (o.scheduled = void 0), o;
            }
            return (
              n.ZT(e, t),
              (e.prototype.schedule = function (r, n, i) {
                return (
                  void 0 === n && (n = 0),
                  e.delegate && e.delegate !== this
                    ? e.delegate.schedule(r, n, i)
                    : t.prototype.schedule.call(this, r, n, i)
                );
              }),
              (e.prototype.flush = function (t) {
                var e = this.actions;
                if (this.active) e.push(t);
                else {
                  var r;
                  this.active = !0;
                  do {
                    if ((r = t.execute(t.state, t.delay))) break;
                  } while ((t = e.shift()));
                  if (((this.active = !1), r)) {
                    for (; (t = e.shift()); ) t.unsubscribe();
                    throw r;
                  }
                }
              }),
              e
            );
          })(i.b);
      },
      6650: (t, e, r) => {
        'use strict';
        r.d(e, { e: () => l, E: () => c });
        var n = r(5987),
          i = 1,
          o = (function () {
            return Promise.resolve();
          })(),
          s = {};
        function a(t) {
          return t in s && (delete s[t], !0);
        }
        var u = (function (t) {
            function e(e, r) {
              var n = t.call(this, e, r) || this;
              return (n.scheduler = e), (n.work = r), n;
            }
            return (
              n.ZT(e, t),
              (e.prototype.requestAsyncId = function (e, r, n) {
                return (
                  void 0 === n && (n = 0),
                  null !== n && n > 0
                    ? t.prototype.requestAsyncId.call(this, e, r, n)
                    : (e.actions.push(this),
                      e.scheduled ||
                        (e.scheduled =
                          ((u = e.flush.bind(e, null)),
                          (c = i++),
                          (s[c] = !0),
                          o.then(function () {
                            return a(c) && u();
                          }),
                          c)))
                );
                var u, c;
              }),
              (e.prototype.recycleAsyncId = function (e, r, n) {
                if ((void 0 === n && (n = 0), (null !== n && n > 0) || (null === n && this.delay > 0)))
                  return t.prototype.recycleAsyncId.call(this, e, r, n);
                0 === e.actions.length && (a(r), (e.scheduled = void 0));
              }),
              e
            );
          })(r(6114).o),
          c = new ((function (t) {
            function e() {
              return (null !== t && t.apply(this, arguments)) || this;
            }
            return (
              n.ZT(e, t),
              (e.prototype.flush = function (t) {
                (this.active = !0), (this.scheduled = void 0);
                var e,
                  r = this.actions,
                  n = -1,
                  i = r.length;
                t = t || r.shift();
                do {
                  if ((e = t.execute(t.state, t.delay))) break;
                } while (++n < i && (t = r.shift()));
                if (((this.active = !1), e)) {
                  for (; ++n < i && (t = r.shift()); ) t.unsubscribe();
                  throw e;
                }
              }),
              e
            );
          })(r(8399).v))(u),
          l = c;
      },
      964: (t, e, r) => {
        'use strict';
        r.d(e, { P: () => o, z: () => i });
        var n = r(6114),
          i = new (r(8399).v)(n.o),
          o = i;
      },
      2546: (t, e, r) => {
        'use strict';
        r.d(e, { c: () => s, N: () => o });
        var n = r(5987),
          i = (function (t) {
            function e(e, r) {
              var n = t.call(this, e, r) || this;
              return (n.scheduler = e), (n.work = r), n;
            }
            return (
              n.ZT(e, t),
              (e.prototype.schedule = function (e, r) {
                return (
                  void 0 === r && (r = 0),
                  r > 0
                    ? t.prototype.schedule.call(this, e, r)
                    : ((this.delay = r), (this.state = e), this.scheduler.flush(this), this)
                );
              }),
              (e.prototype.execute = function (e, r) {
                return r > 0 || this.closed ? t.prototype.execute.call(this, e, r) : this._execute(e, r);
              }),
              (e.prototype.requestAsyncId = function (e, r, n) {
                return (
                  void 0 === n && (n = 0),
                  (null !== n && n > 0) || (null === n && this.delay > 0)
                    ? t.prototype.requestAsyncId.call(this, e, r, n)
                    : e.flush(this)
                );
              }),
              e
            );
          })(r(6114).o),
          o = new ((function (t) {
            function e() {
              return (null !== t && t.apply(this, arguments)) || this;
            }
            return n.ZT(e, t), e;
          })(r(8399).v))(i),
          s = o;
      },
      999: (t, e, r) => {
        'use strict';
        function n() {
          return 'function' == typeof Symbol && Symbol.iterator ? Symbol.iterator : '@@iterator';
        }
        r.d(e, { hZ: () => i });
        var i = n();
      },
      5050: (t, e, r) => {
        'use strict';
        r.d(e, { L: () => n });
        var n = (function () {
          return ('function' == typeof Symbol && Symbol.observable) || '@@observable';
        })();
      },
      3142: (t, e, r) => {
        'use strict';
        r.d(e, { b: () => n });
        var n = (function () {
          return 'function' == typeof Symbol ? Symbol('rxSubscriber') : '@@rxSubscriber_' + Math.random();
        })();
      },
      6565: (t, e, r) => {
        'use strict';
        r.d(e, { W: () => n });
        var n = (function () {
          function t() {
            return (
              Error.call(this), (this.message = 'argument out of range'), (this.name = 'ArgumentOutOfRangeError'), this
            );
          }
          return (t.prototype = Object.create(Error.prototype)), t;
        })();
      },
      6929: (t, e, r) => {
        'use strict';
        r.d(e, { K: () => n });
        var n = (function () {
          function t() {
            return Error.call(this), (this.message = 'no elements in sequence'), (this.name = 'EmptyError'), this;
          }
          return (t.prototype = Object.create(Error.prototype)), t;
        })();
      },
      1016: (t, e, r) => {
        'use strict';
        r.d(e, { N: () => n });
        var n = (function () {
          function t() {
            return (
              Error.call(this), (this.message = 'object unsubscribed'), (this.name = 'ObjectUnsubscribedError'), this
            );
          }
          return (t.prototype = Object.create(Error.prototype)), t;
        })();
      },
      1462: (t, e, r) => {
        'use strict';
        r.d(e, { W: () => n });
        var n = (function () {
          function t() {
            return Error.call(this), (this.message = 'Timeout has occurred'), (this.name = 'TimeoutError'), this;
          }
          return (t.prototype = Object.create(Error.prototype)), t;
        })();
      },
      8782: (t, e, r) => {
        'use strict';
        r.d(e, { B: () => n });
        var n = (function () {
          function t(t) {
            return (
              Error.call(this),
              (this.message = t
                ? t.length +
                  ' errors occurred during unsubscription:\n' +
                  t
                    .map(function (t, e) {
                      return e + 1 + ') ' + t.toString();
                    })
                    .join('\n  ')
                : ''),
              (this.name = 'UnsubscriptionError'),
              (this.errors = t),
              this
            );
          }
          return (t.prototype = Object.create(Error.prototype)), t;
        })();
      },
      3642: (t, e, r) => {
        'use strict';
        r.d(e, { _: () => i });
        var n = r(979);
        function i(t) {
          for (; t; ) {
            var e = t,
              r = e.closed,
              i = e.destination,
              o = e.isStopped;
            if (r || o) return !1;
            t = i && i instanceof n.L ? i : null;
          }
          return !0;
        }
      },
      1644: (t, e, r) => {
        'use strict';
        function n(t) {
          setTimeout(function () {
            throw t;
          }, 0);
        }
        r.d(e, { z: () => n });
      },
      3608: (t, e, r) => {
        'use strict';
        function n(t) {
          return t;
        }
        r.d(e, { y: () => n });
      },
      9026: (t, e, r) => {
        'use strict';
        r.d(e, { k: () => n });
        var n = (function () {
          return (
            Array.isArray ||
            function (t) {
              return t && 'number' == typeof t.length;
            }
          );
        })();
      },
      9217: (t, e, r) => {
        'use strict';
        r.d(e, { z: () => n });
        var n = function (t) {
          return t && 'number' == typeof t.length && 'function' != typeof t;
        };
      },
      4156: (t, e, r) => {
        'use strict';
        function n(t) {
          return 'function' == typeof t;
        }
        r.d(e, { m: () => n });
      },
      5812: (t, e, r) => {
        'use strict';
        r.d(e, { k: () => i });
        var n = r(9026);
        function i(t) {
          return !(0, n.k)(t) && t - parseFloat(t) + 1 >= 0;
        }
      },
      2009: (t, e, r) => {
        'use strict';
        function n(t) {
          return null !== t && 'object' == typeof t;
        }
        r.d(e, { K: () => n });
      },
      336: (t, e, r) => {
        'use strict';
        function n(t) {
          return !!t && 'function' != typeof t.subscribe && 'function' == typeof t.then;
        }
        r.d(e, { t: () => n });
      },
      7507: (t, e, r) => {
        'use strict';
        function n(t) {
          return t && 'function' == typeof t.schedule;
        }
        r.d(e, { K: () => n });
      },
      3306: (t, e, r) => {
        'use strict';
        function n() {}
        r.d(e, { Z: () => n });
      },
      8463: (t, e, r) => {
        'use strict';
        function n(t, e) {
          function r() {
            return !r.pred.apply(r.thisArg, arguments);
          }
          return (r.pred = t), (r.thisArg = e), r;
        }
        r.d(e, { f: () => n });
      },
      2561: (t, e, r) => {
        'use strict';
        r.d(e, { U: () => o, z: () => i });
        var n = r(3608);
        function i() {
          for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
          return o(t);
        }
        function o(t) {
          return 0 === t.length
            ? n.y
            : 1 === t.length
              ? t[0]
              : function (e) {
                  return t.reduce(function (t, e) {
                    return e(t);
                  }, e);
                };
        }
      },
      7843: (t, e, r) => {
        'use strict';
        r.d(e, { s: () => l });
        var n = r(6900),
          i = r(1644),
          o = r(999),
          s = r(5050),
          a = r(9217),
          u = r(336),
          c = r(2009),
          l = function (t) {
            if (t && 'function' == typeof t[s.L])
              return (
                (l = t),
                function (t) {
                  var e = l[s.L]();
                  if ('function' != typeof e.subscribe)
                    throw new TypeError('Provided object does not correctly implement Symbol.observable');
                  return e.subscribe(t);
                }
              );
            if ((0, a.z)(t)) return (0, n.V)(t);
            if ((0, u.t)(t))
              return (
                (r = t),
                function (t) {
                  return (
                    r
                      .then(
                        function (e) {
                          t.closed || (t.next(e), t.complete());
                        },
                        function (e) {
                          return t.error(e);
                        },
                      )
                      .then(null, i.z),
                    t
                  );
                }
              );
            if (t && 'function' == typeof t[o.hZ])
              return (
                (e = t),
                function (t) {
                  for (var r = e[o.hZ](); ; ) {
                    var n = void 0;
                    try {
                      n = r.next();
                    } catch (e) {
                      return t.error(e), t;
                    }
                    if (n.done) {
                      t.complete();
                      break;
                    }
                    if ((t.next(n.value), t.closed)) break;
                  }
                  return (
                    'function' == typeof r.return &&
                      t.add(function () {
                        r.return && r.return();
                      }),
                    t
                  );
                }
              );
            var e,
              r,
              l,
              h = (0, c.K)(t) ? 'an invalid object' : "'" + t + "'";
            throw new TypeError(
              'You provided ' +
                h +
                ' where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.',
            );
          };
      },
      6900: (t, e, r) => {
        'use strict';
        r.d(e, { V: () => n });
        var n = function (t) {
          return function (e) {
            for (var r = 0, n = t.length; r < n && !e.closed; r++) e.next(t[r]);
            e.complete();
          };
        };
      },
      2080: (t, e, r) => {
        'use strict';
        r.d(e, { D: () => a });
        var n = r(5987),
          i = (function (t) {
            function e(e, r, n) {
              var i = t.call(this) || this;
              return (i.parent = e), (i.outerValue = r), (i.outerIndex = n), (i.index = 0), i;
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                this.parent.notifyNext(this.outerValue, t, this.outerIndex, this.index++, this);
              }),
              (e.prototype._error = function (t) {
                this.parent.notifyError(t, this), this.unsubscribe();
              }),
              (e.prototype._complete = function () {
                this.parent.notifyComplete(this), this.unsubscribe();
              }),
              e
            );
          })(r(979).L),
          o = r(7843),
          s = r(2772);
        function a(t, e, r, n, a) {
          if ((void 0 === a && (a = new i(t, r, n)), !a.closed))
            return e instanceof s.y ? e.subscribe(a) : (0, o.s)(e)(a);
        }
      },
      1717: (t, e, r) => {
        'use strict';
        r.r(e),
          r.d(e, {
            audit: () => o,
            auditTime: () => l,
            buffer: () => h,
            bufferCount: () => y,
            bufferTime: () => w,
            bufferToggle: () => I,
            bufferWhen: () => N,
            catchError: () => P,
            combineAll: () => F,
            combineLatest: () => z,
            concat: () => q,
            concatAll: () => Z.u,
            concatMap: () => G,
            concatMapTo: () => Y,
            count: () => J,
            debounce: () => X,
            debounceTime: () => rt,
            defaultIfEmpty: () => st,
            delay: () => ht,
            delayWhen: () => gt,
            dematerialize: () => _t,
            distinct: () => xt,
            distinctUntilChanged: () => At,
            distinctUntilKeyChanged: () => It,
            elementAt: () => Wt,
            endWith: () => Vt,
            every: () => qt,
            exhaust: () => Gt,
            exhaustMap: () => Qt,
            expand: () => ee,
            filter: () => Ot.h,
            finalize: () => ie,
            find: () => ae,
            findIndex: () => le,
            first: () => fe,
            flatMap: () => $.VS,
            groupBy: () => de.v,
            ignoreElements: () => pe,
            isEmpty: () => be,
            last: () => Ee,
            map: () => Kt.U,
            mapTo: () => xe,
            materialize: () => Ae,
            max: () => Le,
            merge: () => De,
            mergeAll: () => Be.J,
            mergeMap: () => $.zg,
            mergeMapTo: () => Ue,
            mergeScan: () => Fe,
            min: () => ze,
            multicast: () => qe,
            observeOn: () => $e.QV,
            onErrorResumeNext: () => Ge,
            pairwise: () => Ke,
            partition: () => er,
            pluck: () => rr,
            publish: () => or,
            publishBehavior: () => ar,
            publishLast: () => cr,
            publishReplay: () => hr,
            race: () => dr,
            reduce: () => je,
            refCount: () => kr.x,
            repeat: () => pr,
            repeatWhen: () => br,
            retry: () => wr,
            retryWhen: () => Er,
            sample: () => Ar,
            sampleTime: () => Ir,
            scan: () => Ie,
            sequenceEqual: () => jr,
            share: () => Ur,
            shareReplay: () => Fr,
            single: () => Hr,
            skip: () => Vr,
            skipLast: () => $r,
            skipUntil: () => Jr,
            skipWhile: () => Xr,
            startWith: () => rn,
            subscribeOn: () => an,
            switchAll: () => fn,
            switchMap: () => cn,
            switchMapTo: () => dn,
            take: () => Ut,
            takeLast: () => we,
            takeUntil: () => pn,
            takeWhile: () => bn,
            tap: () => Sn,
            throttle: () => kn,
            throttleTime: () => Rn,
            throwIfEmpty: () => jt,
            timeInterval: () => jn,
            timeout: () => Hn,
            timeoutWith: () => Dn,
            timestamp: () => Wn,
            toArray: () => qn,
            window: () => Zn,
            windowCount: () => Yn,
            windowTime: () => Qn,
            windowToggle: () => oi,
            windowWhen: () => ui,
            withLatestFrom: () => hi,
            zip: () => yi,
            zipAll: () => gi,
          });
        var n = r(5987),
          i = r(7604);
        function o(t) {
          return function (e) {
            return e.lift(new s(t));
          };
        }
        var s = (function () {
            function t(t) {
              this.durationSelector = t;
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new a(t, this.durationSelector));
              }),
              t
            );
          })(),
          a = (function (t) {
            function e(e, r) {
              var n = t.call(this, e) || this;
              return (n.durationSelector = r), (n.hasValue = !1), n;
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                if (((this.value = t), (this.hasValue = !0), !this.throttled)) {
                  var e = void 0;
                  try {
                    e = (0, this.durationSelector)(t);
                  } catch (t) {
                    return this.destination.error(t);
                  }
                  var r = (0, i.ft)(e, new i.IY(this));
                  !r || r.closed ? this.clearThrottle() : this.add((this.throttled = r));
                }
              }),
              (e.prototype.clearThrottle = function () {
                var t = this,
                  e = t.value,
                  r = t.hasValue,
                  n = t.throttled;
                n && (this.remove(n), (this.throttled = void 0), n.unsubscribe()),
                  r && ((this.value = void 0), (this.hasValue = !1), this.destination.next(e));
              }),
              (e.prototype.notifyNext = function () {
                this.clearThrottle();
              }),
              (e.prototype.notifyComplete = function () {
                this.clearThrottle();
              }),
              e
            );
          })(i.Ds),
          u = r(964),
          c = r(9604);
        function l(t, e) {
          return (
            void 0 === e && (e = u.P),
            o(function () {
              return (0, c.H)(t, e);
            })
          );
        }
        function h(t) {
          return function (e) {
            return e.lift(new f(t));
          };
        }
        var f = (function () {
            function t(t) {
              this.closingNotifier = t;
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new d(t, this.closingNotifier));
              }),
              t
            );
          })(),
          d = (function (t) {
            function e(e, r) {
              var n = t.call(this, e) || this;
              return (n.buffer = []), n.add((0, i.ft)(r, new i.IY(n))), n;
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                this.buffer.push(t);
              }),
              (e.prototype.notifyNext = function () {
                var t = this.buffer;
                (this.buffer = []), this.destination.next(t);
              }),
              e
            );
          })(i.Ds),
          p = r(979);
        function y(t, e) {
          return (
            void 0 === e && (e = null),
            function (r) {
              return r.lift(new g(t, e));
            }
          );
        }
        var g = (function () {
            function t(t, e) {
              (this.bufferSize = t), (this.startBufferEvery = e), (this.subscriberClass = e && t !== e ? m : b);
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new this.subscriberClass(t, this.bufferSize, this.startBufferEvery));
              }),
              t
            );
          })(),
          b = (function (t) {
            function e(e, r) {
              var n = t.call(this, e) || this;
              return (n.bufferSize = r), (n.buffer = []), n;
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                var e = this.buffer;
                e.push(t), e.length == this.bufferSize && (this.destination.next(e), (this.buffer = []));
              }),
              (e.prototype._complete = function () {
                var e = this.buffer;
                e.length > 0 && this.destination.next(e), t.prototype._complete.call(this);
              }),
              e
            );
          })(p.L),
          m = (function (t) {
            function e(e, r, n) {
              var i = t.call(this, e) || this;
              return (i.bufferSize = r), (i.startBufferEvery = n), (i.buffers = []), (i.count = 0), i;
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                var e = this,
                  r = e.bufferSize,
                  n = e.startBufferEvery,
                  i = e.buffers,
                  o = e.count;
                this.count++, o % n == 0 && i.push([]);
                for (var s = i.length; s--; ) {
                  var a = i[s];
                  a.push(t), a.length === r && (i.splice(s, 1), this.destination.next(a));
                }
              }),
              (e.prototype._complete = function () {
                for (var e = this.buffers, r = this.destination; e.length > 0; ) {
                  var n = e.shift();
                  n.length > 0 && r.next(n);
                }
                t.prototype._complete.call(this);
              }),
              e
            );
          })(p.L),
          v = r(7507);
        function w(t) {
          var e = arguments.length,
            r = u.P;
          (0, v.K)(arguments[arguments.length - 1]) && ((r = arguments[arguments.length - 1]), e--);
          var n = null;
          e >= 2 && (n = arguments[1]);
          var i = Number.POSITIVE_INFINITY;
          return (
            e >= 3 && (i = arguments[2]),
            function (e) {
              return e.lift(new _(t, n, i, r));
            }
          );
        }
        var _ = (function () {
            function t(t, e, r, n) {
              (this.bufferTimeSpan = t),
                (this.bufferCreationInterval = e),
                (this.maxBufferSize = r),
                (this.scheduler = n);
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(
                  new E(t, this.bufferTimeSpan, this.bufferCreationInterval, this.maxBufferSize, this.scheduler),
                );
              }),
              t
            );
          })(),
          S = (function () {
            return function () {
              this.buffer = [];
            };
          })(),
          E = (function (t) {
            function e(e, r, n, i, o) {
              var s = t.call(this, e) || this;
              (s.bufferTimeSpan = r),
                (s.bufferCreationInterval = n),
                (s.maxBufferSize = i),
                (s.scheduler = o),
                (s.contexts = []);
              var a = s.openContext();
              if (((s.timespanOnly = null == n || n < 0), s.timespanOnly)) {
                var u = { subscriber: s, context: a, bufferTimeSpan: r };
                s.add((a.closeAction = o.schedule(x, r, u)));
              } else {
                var c = { subscriber: s, context: a },
                  l = { bufferTimeSpan: r, bufferCreationInterval: n, subscriber: s, scheduler: o };
                s.add((a.closeAction = o.schedule(k, r, c))), s.add(o.schedule(M, n, l));
              }
              return s;
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                for (var e, r = this.contexts, n = r.length, i = 0; i < n; i++) {
                  var o = r[i],
                    s = o.buffer;
                  s.push(t), s.length == this.maxBufferSize && (e = o);
                }
                e && this.onBufferFull(e);
              }),
              (e.prototype._error = function (e) {
                (this.contexts.length = 0), t.prototype._error.call(this, e);
              }),
              (e.prototype._complete = function () {
                for (var e = this.contexts, r = this.destination; e.length > 0; ) {
                  var n = e.shift();
                  r.next(n.buffer);
                }
                t.prototype._complete.call(this);
              }),
              (e.prototype._unsubscribe = function () {
                this.contexts = null;
              }),
              (e.prototype.onBufferFull = function (t) {
                this.closeContext(t);
                var e = t.closeAction;
                if ((e.unsubscribe(), this.remove(e), !this.closed && this.timespanOnly)) {
                  t = this.openContext();
                  var r = this.bufferTimeSpan,
                    n = { subscriber: this, context: t, bufferTimeSpan: r };
                  this.add((t.closeAction = this.scheduler.schedule(x, r, n)));
                }
              }),
              (e.prototype.openContext = function () {
                var t = new S();
                return this.contexts.push(t), t;
              }),
              (e.prototype.closeContext = function (t) {
                this.destination.next(t.buffer);
                var e = this.contexts;
                (e ? e.indexOf(t) : -1) >= 0 && e.splice(e.indexOf(t), 1);
              }),
              e
            );
          })(p.L);
        function x(t) {
          var e = t.subscriber,
            r = t.context;
          r && e.closeContext(r),
            e.closed || ((t.context = e.openContext()), (t.context.closeAction = this.schedule(t, t.bufferTimeSpan)));
        }
        function M(t) {
          var e = t.bufferCreationInterval,
            r = t.bufferTimeSpan,
            n = t.subscriber,
            i = t.scheduler,
            o = n.openContext();
          n.closed || (n.add((o.closeAction = i.schedule(k, r, { subscriber: n, context: o }))), this.schedule(t, e));
        }
        function k(t) {
          var e = t.subscriber,
            r = t.context;
          e.closeContext(r);
        }
        var A = r(8760),
          C = r(2080),
          R = r(2039);
        function I(t, e) {
          return function (r) {
            return r.lift(new T(t, e));
          };
        }
        var T = (function () {
            function t(t, e) {
              (this.openings = t), (this.closingSelector = e);
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new O(t, this.openings, this.closingSelector));
              }),
              t
            );
          })(),
          O = (function (t) {
            function e(e, r, n) {
              var i = t.call(this, e) || this;
              return (i.closingSelector = n), (i.contexts = []), i.add((0, C.D)(i, r)), i;
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                for (var e = this.contexts, r = e.length, n = 0; n < r; n++) e[n].buffer.push(t);
              }),
              (e.prototype._error = function (e) {
                for (var r = this.contexts; r.length > 0; ) {
                  var n = r.shift();
                  n.subscription.unsubscribe(), (n.buffer = null), (n.subscription = null);
                }
                (this.contexts = null), t.prototype._error.call(this, e);
              }),
              (e.prototype._complete = function () {
                for (var e = this.contexts; e.length > 0; ) {
                  var r = e.shift();
                  this.destination.next(r.buffer),
                    r.subscription.unsubscribe(),
                    (r.buffer = null),
                    (r.subscription = null);
                }
                (this.contexts = null), t.prototype._complete.call(this);
              }),
              (e.prototype.notifyNext = function (t, e) {
                t ? this.closeBuffer(t) : this.openBuffer(e);
              }),
              (e.prototype.notifyComplete = function (t) {
                this.closeBuffer(t.context);
              }),
              (e.prototype.openBuffer = function (t) {
                try {
                  var e = this.closingSelector.call(this, t);
                  e && this.trySubscribe(e);
                } catch (t) {
                  this._error(t);
                }
              }),
              (e.prototype.closeBuffer = function (t) {
                var e = this.contexts;
                if (e && t) {
                  var r = t.buffer,
                    n = t.subscription;
                  this.destination.next(r), e.splice(e.indexOf(t), 1), this.remove(n), n.unsubscribe();
                }
              }),
              (e.prototype.trySubscribe = function (t) {
                var e = this.contexts,
                  r = new A.w(),
                  n = { buffer: [], subscription: r };
                e.push(n);
                var i = (0, C.D)(this, t, n);
                !i || i.closed ? this.closeBuffer(n) : ((i.context = n), this.add(i), r.add(i));
              }),
              e
            );
          })(R.L);
        function N(t) {
          return function (e) {
            return e.lift(new j(t));
          };
        }
        var j = (function () {
            function t(t) {
              this.closingSelector = t;
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new L(t, this.closingSelector));
              }),
              t
            );
          })(),
          L = (function (t) {
            function e(e, r) {
              var n = t.call(this, e) || this;
              return (n.closingSelector = r), (n.subscribing = !1), n.openBuffer(), n;
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                this.buffer.push(t);
              }),
              (e.prototype._complete = function () {
                var e = this.buffer;
                e && this.destination.next(e), t.prototype._complete.call(this);
              }),
              (e.prototype._unsubscribe = function () {
                (this.buffer = void 0), (this.subscribing = !1);
              }),
              (e.prototype.notifyNext = function () {
                this.openBuffer();
              }),
              (e.prototype.notifyComplete = function () {
                this.subscribing ? this.complete() : this.openBuffer();
              }),
              (e.prototype.openBuffer = function () {
                var t = this.closingSubscription;
                t && (this.remove(t), t.unsubscribe());
                var e,
                  r = this.buffer;
                this.buffer && this.destination.next(r), (this.buffer = []);
                try {
                  e = (0, this.closingSelector)();
                } catch (t) {
                  return this.error(t);
                }
                (t = new A.w()),
                  (this.closingSubscription = t),
                  this.add(t),
                  (this.subscribing = !0),
                  t.add((0, i.ft)(e, new i.IY(this))),
                  (this.subscribing = !1);
              }),
              e
            );
          })(i.Ds);
        function P(t) {
          return function (e) {
            var r = new D(t),
              n = e.lift(r);
            return (r.caught = n);
          };
        }
        var D = (function () {
            function t(t) {
              this.selector = t;
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new B(t, this.selector, this.caught));
              }),
              t
            );
          })(),
          B = (function (t) {
            function e(e, r, n) {
              var i = t.call(this, e) || this;
              return (i.selector = r), (i.caught = n), i;
            }
            return (
              n.ZT(e, t),
              (e.prototype.error = function (e) {
                if (!this.isStopped) {
                  var r = void 0;
                  try {
                    r = this.selector(e, this.caught);
                  } catch (e) {
                    return void t.prototype.error.call(this, e);
                  }
                  this._unsubscribeAndRecycle();
                  var n = new i.IY(this);
                  this.add(n);
                  var o = (0, i.ft)(r, n);
                  o !== n && this.add(o);
                }
              }),
              e
            );
          })(i.Ds),
          U = r(5142);
        function F(t) {
          return function (e) {
            return e.lift(new U.Ms(t));
          };
        }
        var H = r(9026),
          W = r(5760);
        function z() {
          for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
          var r = null;
          return (
            'function' == typeof t[t.length - 1] && (r = t.pop()),
            1 === t.length && (0, H.k)(t[0]) && (t = t[0].slice()),
            function (e) {
              return e.lift.call((0, W.D)([e].concat(t)), new U.Ms(r));
            }
          );
        }
        var V = r(9795);
        function q() {
          for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
          return function (e) {
            return e.lift.call(V.z.apply(void 0, [e].concat(t)));
          };
        }
        var Z = r(2257),
          $ = r(7746);
        function G(t, e) {
          return (0, $.zg)(t, e, 1);
        }
        function Y(t, e) {
          return G(function () {
            return t;
          }, e);
        }
        function J(t) {
          return function (e) {
            return e.lift(new K(t, e));
          };
        }
        var K = (function () {
            function t(t, e) {
              (this.predicate = t), (this.source = e);
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new Q(t, this.predicate, this.source));
              }),
              t
            );
          })(),
          Q = (function (t) {
            function e(e, r, n) {
              var i = t.call(this, e) || this;
              return (i.predicate = r), (i.source = n), (i.count = 0), (i.index = 0), i;
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                this.predicate ? this._tryPredicate(t) : this.count++;
              }),
              (e.prototype._tryPredicate = function (t) {
                var e;
                try {
                  e = this.predicate(t, this.index++, this.source);
                } catch (t) {
                  return void this.destination.error(t);
                }
                e && this.count++;
              }),
              (e.prototype._complete = function () {
                this.destination.next(this.count), this.destination.complete();
              }),
              e
            );
          })(p.L);
        function X(t) {
          return function (e) {
            return e.lift(new tt(t));
          };
        }
        var tt = (function () {
            function t(t) {
              this.durationSelector = t;
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new et(t, this.durationSelector));
              }),
              t
            );
          })(),
          et = (function (t) {
            function e(e, r) {
              var n = t.call(this, e) || this;
              return (n.durationSelector = r), (n.hasValue = !1), n;
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                try {
                  var e = this.durationSelector.call(this, t);
                  e && this._tryNext(t, e);
                } catch (t) {
                  this.destination.error(t);
                }
              }),
              (e.prototype._complete = function () {
                this.emitValue(), this.destination.complete();
              }),
              (e.prototype._tryNext = function (t, e) {
                var r = this.durationSubscription;
                (this.value = t),
                  (this.hasValue = !0),
                  r && (r.unsubscribe(), this.remove(r)),
                  (r = (0, i.ft)(e, new i.IY(this))) && !r.closed && this.add((this.durationSubscription = r));
              }),
              (e.prototype.notifyNext = function () {
                this.emitValue();
              }),
              (e.prototype.notifyComplete = function () {
                this.emitValue();
              }),
              (e.prototype.emitValue = function () {
                if (this.hasValue) {
                  var e = this.value,
                    r = this.durationSubscription;
                  r && ((this.durationSubscription = void 0), r.unsubscribe(), this.remove(r)),
                    (this.value = void 0),
                    (this.hasValue = !1),
                    t.prototype._next.call(this, e);
                }
              }),
              e
            );
          })(i.Ds);
        function rt(t, e) {
          return (
            void 0 === e && (e = u.P),
            function (r) {
              return r.lift(new nt(t, e));
            }
          );
        }
        var nt = (function () {
            function t(t, e) {
              (this.dueTime = t), (this.scheduler = e);
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new it(t, this.dueTime, this.scheduler));
              }),
              t
            );
          })(),
          it = (function (t) {
            function e(e, r, n) {
              var i = t.call(this, e) || this;
              return (
                (i.dueTime = r),
                (i.scheduler = n),
                (i.debouncedSubscription = null),
                (i.lastValue = null),
                (i.hasValue = !1),
                i
              );
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                this.clearDebounce(),
                  (this.lastValue = t),
                  (this.hasValue = !0),
                  this.add((this.debouncedSubscription = this.scheduler.schedule(ot, this.dueTime, this)));
              }),
              (e.prototype._complete = function () {
                this.debouncedNext(), this.destination.complete();
              }),
              (e.prototype.debouncedNext = function () {
                if ((this.clearDebounce(), this.hasValue)) {
                  var t = this.lastValue;
                  (this.lastValue = null), (this.hasValue = !1), this.destination.next(t);
                }
              }),
              (e.prototype.clearDebounce = function () {
                var t = this.debouncedSubscription;
                null !== t && (this.remove(t), t.unsubscribe(), (this.debouncedSubscription = null));
              }),
              e
            );
          })(p.L);
        function ot(t) {
          t.debouncedNext();
        }
        function st(t) {
          return (
            void 0 === t && (t = null),
            function (e) {
              return e.lift(new at(t));
            }
          );
        }
        var at = (function () {
            function t(t) {
              this.defaultValue = t;
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new ut(t, this.defaultValue));
              }),
              t
            );
          })(),
          ut = (function (t) {
            function e(e, r) {
              var n = t.call(this, e) || this;
              return (n.defaultValue = r), (n.isEmpty = !0), n;
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                (this.isEmpty = !1), this.destination.next(t);
              }),
              (e.prototype._complete = function () {
                this.isEmpty && this.destination.next(this.defaultValue), this.destination.complete();
              }),
              e
            );
          })(p.L);
        function ct(t) {
          return t instanceof Date && !isNaN(+t);
        }
        var lt = r(2632);
        function ht(t, e) {
          void 0 === e && (e = u.P);
          var r = ct(t) ? +t - e.now() : Math.abs(t);
          return function (t) {
            return t.lift(new ft(r, e));
          };
        }
        var ft = (function () {
            function t(t, e) {
              (this.delay = t), (this.scheduler = e);
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new dt(t, this.delay, this.scheduler));
              }),
              t
            );
          })(),
          dt = (function (t) {
            function e(e, r, n) {
              var i = t.call(this, e) || this;
              return (i.delay = r), (i.scheduler = n), (i.queue = []), (i.active = !1), (i.errored = !1), i;
            }
            return (
              n.ZT(e, t),
              (e.dispatch = function (t) {
                for (
                  var e = t.source, r = e.queue, n = t.scheduler, i = t.destination;
                  r.length > 0 && r[0].time - n.now() <= 0;

                )
                  r.shift().notification.observe(i);
                if (r.length > 0) {
                  var o = Math.max(0, r[0].time - n.now());
                  this.schedule(t, o);
                } else this.unsubscribe(), (e.active = !1);
              }),
              (e.prototype._schedule = function (t) {
                (this.active = !0),
                  this.destination.add(
                    t.schedule(e.dispatch, this.delay, { source: this, destination: this.destination, scheduler: t }),
                  );
              }),
              (e.prototype.scheduleNotification = function (t) {
                if (!0 !== this.errored) {
                  var e = this.scheduler,
                    r = new pt(e.now() + this.delay, t);
                  this.queue.push(r), !1 === this.active && this._schedule(e);
                }
              }),
              (e.prototype._next = function (t) {
                this.scheduleNotification(lt.P.createNext(t));
              }),
              (e.prototype._error = function (t) {
                (this.errored = !0), (this.queue = []), this.destination.error(t), this.unsubscribe();
              }),
              (e.prototype._complete = function () {
                this.scheduleNotification(lt.P.createComplete()), this.unsubscribe();
              }),
              e
            );
          })(p.L),
          pt = (function () {
            return function (t, e) {
              (this.time = t), (this.notification = e);
            };
          })(),
          yt = r(2772);
        function gt(t, e) {
          return e
            ? function (r) {
                return new vt(r, e).lift(new bt(t));
              }
            : function (e) {
                return e.lift(new bt(t));
              };
        }
        var bt = (function () {
            function t(t) {
              this.delayDurationSelector = t;
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new mt(t, this.delayDurationSelector));
              }),
              t
            );
          })(),
          mt = (function (t) {
            function e(e, r) {
              var n = t.call(this, e) || this;
              return (
                (n.delayDurationSelector = r), (n.completed = !1), (n.delayNotifierSubscriptions = []), (n.index = 0), n
              );
            }
            return (
              n.ZT(e, t),
              (e.prototype.notifyNext = function (t, e, r, n, i) {
                this.destination.next(t), this.removeSubscription(i), this.tryComplete();
              }),
              (e.prototype.notifyError = function (t, e) {
                this._error(t);
              }),
              (e.prototype.notifyComplete = function (t) {
                var e = this.removeSubscription(t);
                e && this.destination.next(e), this.tryComplete();
              }),
              (e.prototype._next = function (t) {
                var e = this.index++;
                try {
                  var r = this.delayDurationSelector(t, e);
                  r && this.tryDelay(r, t);
                } catch (t) {
                  this.destination.error(t);
                }
              }),
              (e.prototype._complete = function () {
                (this.completed = !0), this.tryComplete(), this.unsubscribe();
              }),
              (e.prototype.removeSubscription = function (t) {
                t.unsubscribe();
                var e = this.delayNotifierSubscriptions.indexOf(t);
                return -1 !== e && this.delayNotifierSubscriptions.splice(e, 1), t.outerValue;
              }),
              (e.prototype.tryDelay = function (t, e) {
                var r = (0, C.D)(this, t, e);
                r && !r.closed && (this.destination.add(r), this.delayNotifierSubscriptions.push(r));
              }),
              (e.prototype.tryComplete = function () {
                this.completed && 0 === this.delayNotifierSubscriptions.length && this.destination.complete();
              }),
              e
            );
          })(R.L),
          vt = (function (t) {
            function e(e, r) {
              var n = t.call(this) || this;
              return (n.source = e), (n.subscriptionDelay = r), n;
            }
            return (
              n.ZT(e, t),
              (e.prototype._subscribe = function (t) {
                this.subscriptionDelay.subscribe(new wt(t, this.source));
              }),
              e
            );
          })(yt.y),
          wt = (function (t) {
            function e(e, r) {
              var n = t.call(this) || this;
              return (n.parent = e), (n.source = r), (n.sourceSubscribed = !1), n;
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                this.subscribeToSource();
              }),
              (e.prototype._error = function (t) {
                this.unsubscribe(), this.parent.error(t);
              }),
              (e.prototype._complete = function () {
                this.unsubscribe(), this.subscribeToSource();
              }),
              (e.prototype.subscribeToSource = function () {
                this.sourceSubscribed ||
                  ((this.sourceSubscribed = !0), this.unsubscribe(), this.source.subscribe(this.parent));
              }),
              e
            );
          })(p.L);
        function _t() {
          return function (t) {
            return t.lift(new St());
          };
        }
        var St = (function () {
            function t() {}
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new Et(t));
              }),
              t
            );
          })(),
          Et = (function (t) {
            function e(e) {
              return t.call(this, e) || this;
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                t.observe(this.destination);
              }),
              e
            );
          })(p.L);
        function xt(t, e) {
          return function (r) {
            return r.lift(new Mt(t, e));
          };
        }
        var Mt = (function () {
            function t(t, e) {
              (this.keySelector = t), (this.flushes = e);
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new kt(t, this.keySelector, this.flushes));
              }),
              t
            );
          })(),
          kt = (function (t) {
            function e(e, r, n) {
              var o = t.call(this, e) || this;
              return (o.keySelector = r), (o.values = new Set()), n && o.add((0, i.ft)(n, new i.IY(o))), o;
            }
            return (
              n.ZT(e, t),
              (e.prototype.notifyNext = function () {
                this.values.clear();
              }),
              (e.prototype.notifyError = function (t) {
                this._error(t);
              }),
              (e.prototype._next = function (t) {
                this.keySelector ? this._useKeySelector(t) : this._finalizeNext(t, t);
              }),
              (e.prototype._useKeySelector = function (t) {
                var e,
                  r = this.destination;
                try {
                  e = this.keySelector(t);
                } catch (t) {
                  return void r.error(t);
                }
                this._finalizeNext(e, t);
              }),
              (e.prototype._finalizeNext = function (t, e) {
                var r = this.values;
                r.has(t) || (r.add(t), this.destination.next(e));
              }),
              e
            );
          })(i.Ds);
        function At(t, e) {
          return function (r) {
            return r.lift(new Ct(t, e));
          };
        }
        var Ct = (function () {
            function t(t, e) {
              (this.compare = t), (this.keySelector = e);
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new Rt(t, this.compare, this.keySelector));
              }),
              t
            );
          })(),
          Rt = (function (t) {
            function e(e, r, n) {
              var i = t.call(this, e) || this;
              return (i.keySelector = n), (i.hasKey = !1), 'function' == typeof r && (i.compare = r), i;
            }
            return (
              n.ZT(e, t),
              (e.prototype.compare = function (t, e) {
                return t === e;
              }),
              (e.prototype._next = function (t) {
                var e;
                try {
                  var r = this.keySelector;
                  e = r ? r(t) : t;
                } catch (t) {
                  return this.destination.error(t);
                }
                var n = !1;
                if (this.hasKey)
                  try {
                    n = (0, this.compare)(this.key, e);
                  } catch (t) {
                    return this.destination.error(t);
                  }
                else this.hasKey = !0;
                n || ((this.key = e), this.destination.next(t));
              }),
              e
            );
          })(p.L);
        function It(t, e) {
          return At(function (r, n) {
            return e ? e(r[t], n[t]) : r[t] === n[t];
          });
        }
        var Tt = r(6565),
          Ot = r(6008),
          Nt = r(6929);
        function jt(t) {
          return (
            void 0 === t && (t = Dt),
            function (e) {
              return e.lift(new Lt(t));
            }
          );
        }
        var Lt = (function () {
            function t(t) {
              this.errorFactory = t;
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new Pt(t, this.errorFactory));
              }),
              t
            );
          })(),
          Pt = (function (t) {
            function e(e, r) {
              var n = t.call(this, e) || this;
              return (n.errorFactory = r), (n.hasValue = !1), n;
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                (this.hasValue = !0), this.destination.next(t);
              }),
              (e.prototype._complete = function () {
                if (this.hasValue) return this.destination.complete();
                var t = void 0;
                try {
                  t = this.errorFactory();
                } catch (e) {
                  t = e;
                }
                this.destination.error(t);
              }),
              e
            );
          })(p.L);
        function Dt() {
          return new Nt.K();
        }
        var Bt = r(5631);
        function Ut(t) {
          return function (e) {
            return 0 === t ? (0, Bt.c)() : e.lift(new Ft(t));
          };
        }
        var Ft = (function () {
            function t(t) {
              if (((this.total = t), this.total < 0)) throw new Tt.W();
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new Ht(t, this.total));
              }),
              t
            );
          })(),
          Ht = (function (t) {
            function e(e, r) {
              var n = t.call(this, e) || this;
              return (n.total = r), (n.count = 0), n;
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                var e = this.total,
                  r = ++this.count;
                r <= e && (this.destination.next(t), r === e && (this.destination.complete(), this.unsubscribe()));
              }),
              e
            );
          })(p.L);
        function Wt(t, e) {
          if (t < 0) throw new Tt.W();
          var r = arguments.length >= 2;
          return function (n) {
            return n.pipe(
              (0, Ot.h)(function (e, r) {
                return r === t;
              }),
              Ut(1),
              r
                ? st(e)
                : jt(function () {
                    return new Tt.W();
                  }),
            );
          };
        }
        var zt = r(8170);
        function Vt() {
          for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
          return function (e) {
            return (0, V.z)(e, zt.of.apply(void 0, t));
          };
        }
        function qt(t, e) {
          return function (r) {
            return r.lift(new Zt(t, e, r));
          };
        }
        var Zt = (function () {
            function t(t, e, r) {
              (this.predicate = t), (this.thisArg = e), (this.source = r);
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new $t(t, this.predicate, this.thisArg, this.source));
              }),
              t
            );
          })(),
          $t = (function (t) {
            function e(e, r, n, i) {
              var o = t.call(this, e) || this;
              return (o.predicate = r), (o.thisArg = n), (o.source = i), (o.index = 0), (o.thisArg = n || o), o;
            }
            return (
              n.ZT(e, t),
              (e.prototype.notifyComplete = function (t) {
                this.destination.next(t), this.destination.complete();
              }),
              (e.prototype._next = function (t) {
                var e = !1;
                try {
                  e = this.predicate.call(this.thisArg, t, this.index++, this.source);
                } catch (t) {
                  return void this.destination.error(t);
                }
                e || this.notifyComplete(!1);
              }),
              (e.prototype._complete = function () {
                this.notifyComplete(!0);
              }),
              e
            );
          })(p.L);
        function Gt() {
          return function (t) {
            return t.lift(new Yt());
          };
        }
        var Yt = (function () {
            function t() {}
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new Jt(t));
              }),
              t
            );
          })(),
          Jt = (function (t) {
            function e(e) {
              var r = t.call(this, e) || this;
              return (r.hasCompleted = !1), (r.hasSubscription = !1), r;
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                this.hasSubscription || ((this.hasSubscription = !0), this.add((0, i.ft)(t, new i.IY(this))));
              }),
              (e.prototype._complete = function () {
                (this.hasCompleted = !0), this.hasSubscription || this.destination.complete();
              }),
              (e.prototype.notifyComplete = function () {
                (this.hasSubscription = !1), this.hasCompleted && this.destination.complete();
              }),
              e
            );
          })(i.Ds),
          Kt = r(5709);
        function Qt(t, e) {
          return e
            ? function (r) {
                return r.pipe(
                  Qt(function (r, n) {
                    return (0, W.D)(t(r, n)).pipe(
                      (0, Kt.U)(function (t, i) {
                        return e(r, t, n, i);
                      }),
                    );
                  }),
                );
              }
            : function (e) {
                return e.lift(new Xt(t));
              };
        }
        var Xt = (function () {
            function t(t) {
              this.project = t;
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new te(t, this.project));
              }),
              t
            );
          })(),
          te = (function (t) {
            function e(e, r) {
              var n = t.call(this, e) || this;
              return (n.project = r), (n.hasSubscription = !1), (n.hasCompleted = !1), (n.index = 0), n;
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                this.hasSubscription || this.tryNext(t);
              }),
              (e.prototype.tryNext = function (t) {
                var e,
                  r = this.index++;
                try {
                  e = this.project(t, r);
                } catch (t) {
                  return void this.destination.error(t);
                }
                (this.hasSubscription = !0), this._innerSub(e);
              }),
              (e.prototype._innerSub = function (t) {
                var e = new i.IY(this),
                  r = this.destination;
                r.add(e);
                var n = (0, i.ft)(t, e);
                n !== e && r.add(n);
              }),
              (e.prototype._complete = function () {
                (this.hasCompleted = !0), this.hasSubscription || this.destination.complete(), this.unsubscribe();
              }),
              (e.prototype.notifyNext = function (t) {
                this.destination.next(t);
              }),
              (e.prototype.notifyError = function (t) {
                this.destination.error(t);
              }),
              (e.prototype.notifyComplete = function () {
                (this.hasSubscription = !1), this.hasCompleted && this.destination.complete();
              }),
              e
            );
          })(i.Ds);
        function ee(t, e, r) {
          return (
            void 0 === e && (e = Number.POSITIVE_INFINITY),
            (e = (e || 0) < 1 ? Number.POSITIVE_INFINITY : e),
            function (n) {
              return n.lift(new re(t, e, r));
            }
          );
        }
        var re = (function () {
            function t(t, e, r) {
              (this.project = t), (this.concurrent = e), (this.scheduler = r);
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new ne(t, this.project, this.concurrent, this.scheduler));
              }),
              t
            );
          })(),
          ne = (function (t) {
            function e(e, r, n, i) {
              var o = t.call(this, e) || this;
              return (
                (o.project = r),
                (o.concurrent = n),
                (o.scheduler = i),
                (o.index = 0),
                (o.active = 0),
                (o.hasCompleted = !1),
                n < Number.POSITIVE_INFINITY && (o.buffer = []),
                o
              );
            }
            return (
              n.ZT(e, t),
              (e.dispatch = function (t) {
                var e = t.subscriber,
                  r = t.result,
                  n = t.value,
                  i = t.index;
                e.subscribeToProjection(r, n, i);
              }),
              (e.prototype._next = function (t) {
                var r = this.destination;
                if (r.closed) this._complete();
                else {
                  var n = this.index++;
                  if (this.active < this.concurrent) {
                    r.next(t);
                    try {
                      var i = (0, this.project)(t, n);
                      if (this.scheduler) {
                        var o = { subscriber: this, result: i, value: t, index: n };
                        this.destination.add(this.scheduler.schedule(e.dispatch, 0, o));
                      } else this.subscribeToProjection(i, t, n);
                    } catch (t) {
                      r.error(t);
                    }
                  } else this.buffer.push(t);
                }
              }),
              (e.prototype.subscribeToProjection = function (t, e, r) {
                this.active++, this.destination.add((0, i.ft)(t, new i.IY(this)));
              }),
              (e.prototype._complete = function () {
                (this.hasCompleted = !0),
                  this.hasCompleted && 0 === this.active && this.destination.complete(),
                  this.unsubscribe();
              }),
              (e.prototype.notifyNext = function (t) {
                this._next(t);
              }),
              (e.prototype.notifyComplete = function () {
                var t = this.buffer;
                this.active--,
                  t && t.length > 0 && this._next(t.shift()),
                  this.hasCompleted && 0 === this.active && this.destination.complete();
              }),
              e
            );
          })(i.Ds);
        function ie(t) {
          return function (e) {
            return e.lift(new oe(t));
          };
        }
        var oe = (function () {
            function t(t) {
              this.callback = t;
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new se(t, this.callback));
              }),
              t
            );
          })(),
          se = (function (t) {
            function e(e, r) {
              var n = t.call(this, e) || this;
              return n.add(new A.w(r)), n;
            }
            return n.ZT(e, t), e;
          })(p.L);
        function ae(t, e) {
          if ('function' != typeof t) throw new TypeError('predicate is not a function');
          return function (r) {
            return r.lift(new ue(t, r, !1, e));
          };
        }
        var ue = (function () {
            function t(t, e, r, n) {
              (this.predicate = t), (this.source = e), (this.yieldIndex = r), (this.thisArg = n);
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new ce(t, this.predicate, this.source, this.yieldIndex, this.thisArg));
              }),
              t
            );
          })(),
          ce = (function (t) {
            function e(e, r, n, i, o) {
              var s = t.call(this, e) || this;
              return (s.predicate = r), (s.source = n), (s.yieldIndex = i), (s.thisArg = o), (s.index = 0), s;
            }
            return (
              n.ZT(e, t),
              (e.prototype.notifyComplete = function (t) {
                var e = this.destination;
                e.next(t), e.complete(), this.unsubscribe();
              }),
              (e.prototype._next = function (t) {
                var e = this.predicate,
                  r = this.thisArg,
                  n = this.index++;
                try {
                  e.call(r || this, t, n, this.source) && this.notifyComplete(this.yieldIndex ? n : t);
                } catch (t) {
                  this.destination.error(t);
                }
              }),
              (e.prototype._complete = function () {
                this.notifyComplete(this.yieldIndex ? -1 : void 0);
              }),
              e
            );
          })(p.L);
        function le(t, e) {
          return function (r) {
            return r.lift(new ue(t, r, !0, e));
          };
        }
        var he = r(3608);
        function fe(t, e) {
          var r = arguments.length >= 2;
          return function (n) {
            return n.pipe(
              t
                ? (0, Ot.h)(function (e, r) {
                    return t(e, r, n);
                  })
                : he.y,
              Ut(1),
              r
                ? st(e)
                : jt(function () {
                    return new Nt.K();
                  }),
            );
          };
        }
        var de = r(1120);
        function pe() {
          return function (t) {
            return t.lift(new ye());
          };
        }
        var ye = (function () {
            function t() {}
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new ge(t));
              }),
              t
            );
          })(),
          ge = (function (t) {
            function e() {
              return (null !== t && t.apply(this, arguments)) || this;
            }
            return n.ZT(e, t), (e.prototype._next = function (t) {}), e;
          })(p.L);
        function be() {
          return function (t) {
            return t.lift(new me());
          };
        }
        var me = (function () {
            function t() {}
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new ve(t));
              }),
              t
            );
          })(),
          ve = (function (t) {
            function e(e) {
              return t.call(this, e) || this;
            }
            return (
              n.ZT(e, t),
              (e.prototype.notifyComplete = function (t) {
                var e = this.destination;
                e.next(t), e.complete();
              }),
              (e.prototype._next = function (t) {
                this.notifyComplete(!1);
              }),
              (e.prototype._complete = function () {
                this.notifyComplete(!0);
              }),
              e
            );
          })(p.L);
        function we(t) {
          return function (e) {
            return 0 === t ? (0, Bt.c)() : e.lift(new _e(t));
          };
        }
        var _e = (function () {
            function t(t) {
              if (((this.total = t), this.total < 0)) throw new Tt.W();
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new Se(t, this.total));
              }),
              t
            );
          })(),
          Se = (function (t) {
            function e(e, r) {
              var n = t.call(this, e) || this;
              return (n.total = r), (n.ring = new Array()), (n.count = 0), n;
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                var e = this.ring,
                  r = this.total,
                  n = this.count++;
                e.length < r ? e.push(t) : (e[n % r] = t);
              }),
              (e.prototype._complete = function () {
                var t = this.destination,
                  e = this.count;
                if (e > 0)
                  for (var r = this.count >= this.total ? this.total : this.count, n = this.ring, i = 0; i < r; i++) {
                    var o = e++ % r;
                    t.next(n[o]);
                  }
                t.complete();
              }),
              e
            );
          })(p.L);
        function Ee(t, e) {
          var r = arguments.length >= 2;
          return function (n) {
            return n.pipe(
              t
                ? (0, Ot.h)(function (e, r) {
                    return t(e, r, n);
                  })
                : he.y,
              we(1),
              r
                ? st(e)
                : jt(function () {
                    return new Nt.K();
                  }),
            );
          };
        }
        function xe(t) {
          return function (e) {
            return e.lift(new Me(t));
          };
        }
        var Me = (function () {
            function t(t) {
              this.value = t;
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new ke(t, this.value));
              }),
              t
            );
          })(),
          ke = (function (t) {
            function e(e, r) {
              var n = t.call(this, e) || this;
              return (n.value = r), n;
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                this.destination.next(this.value);
              }),
              e
            );
          })(p.L);
        function Ae() {
          return function (t) {
            return t.lift(new Ce());
          };
        }
        var Ce = (function () {
            function t() {}
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new Re(t));
              }),
              t
            );
          })(),
          Re = (function (t) {
            function e(e) {
              return t.call(this, e) || this;
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                this.destination.next(lt.P.createNext(t));
              }),
              (e.prototype._error = function (t) {
                var e = this.destination;
                e.next(lt.P.createError(t)), e.complete();
              }),
              (e.prototype._complete = function () {
                var t = this.destination;
                t.next(lt.P.createComplete()), t.complete();
              }),
              e
            );
          })(p.L);
        function Ie(t, e) {
          var r = !1;
          return (
            arguments.length >= 2 && (r = !0),
            function (n) {
              return n.lift(new Te(t, e, r));
            }
          );
        }
        var Te = (function () {
            function t(t, e, r) {
              void 0 === r && (r = !1), (this.accumulator = t), (this.seed = e), (this.hasSeed = r);
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new Oe(t, this.accumulator, this.seed, this.hasSeed));
              }),
              t
            );
          })(),
          Oe = (function (t) {
            function e(e, r, n, i) {
              var o = t.call(this, e) || this;
              return (o.accumulator = r), (o._seed = n), (o.hasSeed = i), (o.index = 0), o;
            }
            return (
              n.ZT(e, t),
              Object.defineProperty(e.prototype, 'seed', {
                get: function () {
                  return this._seed;
                },
                set: function (t) {
                  (this.hasSeed = !0), (this._seed = t);
                },
                enumerable: !0,
                configurable: !0,
              }),
              (e.prototype._next = function (t) {
                if (this.hasSeed) return this._tryNext(t);
                (this.seed = t), this.destination.next(t);
              }),
              (e.prototype._tryNext = function (t) {
                var e,
                  r = this.index++;
                try {
                  e = this.accumulator(this.seed, t, r);
                } catch (t) {
                  this.destination.error(t);
                }
                (this.seed = e), this.destination.next(e);
              }),
              e
            );
          })(p.L),
          Ne = r(2561);
        function je(t, e) {
          return arguments.length >= 2
            ? function (r) {
                return (0, Ne.z)(Ie(t, e), we(1), st(e))(r);
              }
            : function (e) {
                return (0, Ne.z)(
                  Ie(function (e, r, n) {
                    return t(e, r, n + 1);
                  }),
                  we(1),
                )(e);
              };
        }
        function Le(t) {
          return je(
            'function' == typeof t
              ? function (e, r) {
                  return t(e, r) > 0 ? e : r;
                }
              : function (t, e) {
                  return t > e ? t : e;
                },
          );
        }
        var Pe = r(4370);
        function De() {
          for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
          return function (e) {
            return e.lift.call(Pe.T.apply(void 0, [e].concat(t)));
          };
        }
        var Be = r(2556);
        function Ue(t, e, r) {
          return (
            void 0 === r && (r = Number.POSITIVE_INFINITY),
            'function' == typeof e
              ? (0, $.zg)(
                  function () {
                    return t;
                  },
                  e,
                  r,
                )
              : ('number' == typeof e && (r = e),
                (0, $.zg)(function () {
                  return t;
                }, r))
          );
        }
        function Fe(t, e, r) {
          return (
            void 0 === r && (r = Number.POSITIVE_INFINITY),
            function (n) {
              return n.lift(new He(t, e, r));
            }
          );
        }
        var He = (function () {
            function t(t, e, r) {
              (this.accumulator = t), (this.seed = e), (this.concurrent = r);
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new We(t, this.accumulator, this.seed, this.concurrent));
              }),
              t
            );
          })(),
          We = (function (t) {
            function e(e, r, n, i) {
              var o = t.call(this, e) || this;
              return (
                (o.accumulator = r),
                (o.acc = n),
                (o.concurrent = i),
                (o.hasValue = !1),
                (o.hasCompleted = !1),
                (o.buffer = []),
                (o.active = 0),
                (o.index = 0),
                o
              );
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                if (this.active < this.concurrent) {
                  var e = this.index++,
                    r = this.destination,
                    n = void 0;
                  try {
                    n = (0, this.accumulator)(this.acc, t, e);
                  } catch (t) {
                    return r.error(t);
                  }
                  this.active++, this._innerSub(n);
                } else this.buffer.push(t);
              }),
              (e.prototype._innerSub = function (t) {
                var e = new i.IY(this),
                  r = this.destination;
                r.add(e);
                var n = (0, i.ft)(t, e);
                n !== e && r.add(n);
              }),
              (e.prototype._complete = function () {
                (this.hasCompleted = !0),
                  0 === this.active &&
                    0 === this.buffer.length &&
                    (!1 === this.hasValue && this.destination.next(this.acc), this.destination.complete()),
                  this.unsubscribe();
              }),
              (e.prototype.notifyNext = function (t) {
                var e = this.destination;
                (this.acc = t), (this.hasValue = !0), e.next(t);
              }),
              (e.prototype.notifyComplete = function () {
                var t = this.buffer;
                this.active--,
                  t.length > 0
                    ? this._next(t.shift())
                    : 0 === this.active &&
                      this.hasCompleted &&
                      (!1 === this.hasValue && this.destination.next(this.acc), this.destination.complete());
              }),
              e
            );
          })(i.Ds);
        function ze(t) {
          return je(
            'function' == typeof t
              ? function (e, r) {
                  return t(e, r) < 0 ? e : r;
                }
              : function (t, e) {
                  return t < e ? t : e;
                },
          );
        }
        var Ve = r(3140);
        function qe(t, e) {
          return function (r) {
            var n;
            if (
              ((n =
                'function' == typeof t
                  ? t
                  : function () {
                      return t;
                    }),
              'function' == typeof e)
            )
              return r.lift(new Ze(n, e));
            var i = Object.create(r, Ve.N);
            return (i.source = r), (i.subjectFactory = n), i;
          };
        }
        var Ze = (function () {
            function t(t, e) {
              (this.subjectFactory = t), (this.selector = e);
            }
            return (
              (t.prototype.call = function (t, e) {
                var r = this.selector,
                  n = this.subjectFactory(),
                  i = r(n).subscribe(t);
                return i.add(e.subscribe(n)), i;
              }),
              t
            );
          })(),
          $e = r(9276);
        function Ge() {
          for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
          return (
            1 === t.length && (0, H.k)(t[0]) && (t = t[0]),
            function (e) {
              return e.lift(new Ye(t));
            }
          );
        }
        var Ye = (function () {
            function t(t) {
              this.nextSources = t;
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new Je(t, this.nextSources));
              }),
              t
            );
          })(),
          Je = (function (t) {
            function e(e, r) {
              var n = t.call(this, e) || this;
              return (n.destination = e), (n.nextSources = r), n;
            }
            return (
              n.ZT(e, t),
              (e.prototype.notifyError = function () {
                this.subscribeToNextSource();
              }),
              (e.prototype.notifyComplete = function () {
                this.subscribeToNextSource();
              }),
              (e.prototype._error = function (t) {
                this.subscribeToNextSource(), this.unsubscribe();
              }),
              (e.prototype._complete = function () {
                this.subscribeToNextSource(), this.unsubscribe();
              }),
              (e.prototype.subscribeToNextSource = function () {
                var t = this.nextSources.shift();
                if (t) {
                  var e = new i.IY(this),
                    r = this.destination;
                  r.add(e);
                  var n = (0, i.ft)(t, e);
                  n !== e && r.add(n);
                } else this.destination.complete();
              }),
              e
            );
          })(i.Ds);
        function Ke() {
          return function (t) {
            return t.lift(new Qe());
          };
        }
        var Qe = (function () {
            function t() {}
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new Xe(t));
              }),
              t
            );
          })(),
          Xe = (function (t) {
            function e(e) {
              var r = t.call(this, e) || this;
              return (r.hasPrev = !1), r;
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                var e;
                this.hasPrev ? (e = [this.prev, t]) : (this.hasPrev = !0),
                  (this.prev = t),
                  e && this.destination.next(e);
              }),
              e
            );
          })(p.L),
          tr = r(8463);
        function er(t, e) {
          return function (r) {
            return [(0, Ot.h)(t, e)(r), (0, Ot.h)((0, tr.f)(t, e))(r)];
          };
        }
        function rr() {
          for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
          var r = t.length;
          if (0 === r) throw new Error('list of properties cannot be empty.');
          return function (e) {
            return (0, Kt.U)(nr(t, r))(e);
          };
        }
        function nr(t, e) {
          return function (r) {
            for (var n = r, i = 0; i < e; i++) {
              var o = null != n ? n[t[i]] : void 0;
              if (void 0 === o) return;
              n = o;
            }
            return n;
          };
        }
        var ir = r(211);
        function or(t) {
          return t
            ? qe(function () {
                return new ir.xQ();
              }, t)
            : qe(new ir.xQ());
        }
        var sr = r(9233);
        function ar(t) {
          return function (e) {
            return qe(new sr.X(t))(e);
          };
        }
        var ur = r(364);
        function cr() {
          return function (t) {
            return qe(new ur.c())(t);
          };
        }
        var lr = r(2630);
        function hr(t, e, r, n) {
          r && 'function' != typeof r && (n = r);
          var i = 'function' == typeof r ? r : void 0,
            o = new lr.t(t, e, n);
          return function (t) {
            return qe(function () {
              return o;
            }, i)(t);
          };
        }
        var fr = r(8821);
        function dr() {
          for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
          return function (e) {
            return 1 === t.length && (0, H.k)(t[0]) && (t = t[0]), e.lift.call(fr.S3.apply(void 0, [e].concat(t)));
          };
        }
        function pr(t) {
          return (
            void 0 === t && (t = -1),
            function (e) {
              return 0 === t ? (0, Bt.c)() : t < 0 ? e.lift(new yr(-1, e)) : e.lift(new yr(t - 1, e));
            }
          );
        }
        var yr = (function () {
            function t(t, e) {
              (this.count = t), (this.source = e);
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new gr(t, this.count, this.source));
              }),
              t
            );
          })(),
          gr = (function (t) {
            function e(e, r, n) {
              var i = t.call(this, e) || this;
              return (i.count = r), (i.source = n), i;
            }
            return (
              n.ZT(e, t),
              (e.prototype.complete = function () {
                if (!this.isStopped) {
                  var e = this.source,
                    r = this.count;
                  if (0 === r) return t.prototype.complete.call(this);
                  r > -1 && (this.count = r - 1), e.subscribe(this._unsubscribeAndRecycle());
                }
              }),
              e
            );
          })(p.L);
        function br(t) {
          return function (e) {
            return e.lift(new mr(t));
          };
        }
        var mr = (function () {
            function t(t) {
              this.notifier = t;
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new vr(t, this.notifier, e));
              }),
              t
            );
          })(),
          vr = (function (t) {
            function e(e, r, n) {
              var i = t.call(this, e) || this;
              return (i.notifier = r), (i.source = n), (i.sourceIsBeingSubscribedTo = !0), i;
            }
            return (
              n.ZT(e, t),
              (e.prototype.notifyNext = function () {
                (this.sourceIsBeingSubscribedTo = !0), this.source.subscribe(this);
              }),
              (e.prototype.notifyComplete = function () {
                if (!1 === this.sourceIsBeingSubscribedTo) return t.prototype.complete.call(this);
              }),
              (e.prototype.complete = function () {
                if (((this.sourceIsBeingSubscribedTo = !1), !this.isStopped)) {
                  if (
                    (this.retries || this.subscribeToRetries(),
                    !this.retriesSubscription || this.retriesSubscription.closed)
                  )
                    return t.prototype.complete.call(this);
                  this._unsubscribeAndRecycle(), this.notifications.next(void 0);
                }
              }),
              (e.prototype._unsubscribe = function () {
                var t = this.notifications,
                  e = this.retriesSubscription;
                t && (t.unsubscribe(), (this.notifications = void 0)),
                  e && (e.unsubscribe(), (this.retriesSubscription = void 0)),
                  (this.retries = void 0);
              }),
              (e.prototype._unsubscribeAndRecycle = function () {
                var e = this._unsubscribe;
                return (
                  (this._unsubscribe = null),
                  t.prototype._unsubscribeAndRecycle.call(this),
                  (this._unsubscribe = e),
                  this
                );
              }),
              (e.prototype.subscribeToRetries = function () {
                var e;
                this.notifications = new ir.xQ();
                try {
                  e = (0, this.notifier)(this.notifications);
                } catch (e) {
                  return t.prototype.complete.call(this);
                }
                (this.retries = e), (this.retriesSubscription = (0, i.ft)(e, new i.IY(this)));
              }),
              e
            );
          })(i.Ds);
        function wr(t) {
          return (
            void 0 === t && (t = -1),
            function (e) {
              return e.lift(new _r(t, e));
            }
          );
        }
        var _r = (function () {
            function t(t, e) {
              (this.count = t), (this.source = e);
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new Sr(t, this.count, this.source));
              }),
              t
            );
          })(),
          Sr = (function (t) {
            function e(e, r, n) {
              var i = t.call(this, e) || this;
              return (i.count = r), (i.source = n), i;
            }
            return (
              n.ZT(e, t),
              (e.prototype.error = function (e) {
                if (!this.isStopped) {
                  var r = this.source,
                    n = this.count;
                  if (0 === n) return t.prototype.error.call(this, e);
                  n > -1 && (this.count = n - 1), r.subscribe(this._unsubscribeAndRecycle());
                }
              }),
              e
            );
          })(p.L);
        function Er(t) {
          return function (e) {
            return e.lift(new xr(t, e));
          };
        }
        var xr = (function () {
            function t(t, e) {
              (this.notifier = t), (this.source = e);
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new Mr(t, this.notifier, this.source));
              }),
              t
            );
          })(),
          Mr = (function (t) {
            function e(e, r, n) {
              var i = t.call(this, e) || this;
              return (i.notifier = r), (i.source = n), i;
            }
            return (
              n.ZT(e, t),
              (e.prototype.error = function (e) {
                if (!this.isStopped) {
                  var r = this.errors,
                    n = this.retries,
                    o = this.retriesSubscription;
                  if (n) (this.errors = void 0), (this.retriesSubscription = void 0);
                  else {
                    r = new ir.xQ();
                    try {
                      n = (0, this.notifier)(r);
                    } catch (e) {
                      return t.prototype.error.call(this, e);
                    }
                    o = (0, i.ft)(n, new i.IY(this));
                  }
                  this._unsubscribeAndRecycle(),
                    (this.errors = r),
                    (this.retries = n),
                    (this.retriesSubscription = o),
                    r.next(e);
                }
              }),
              (e.prototype._unsubscribe = function () {
                var t = this.errors,
                  e = this.retriesSubscription;
                t && (t.unsubscribe(), (this.errors = void 0)),
                  e && (e.unsubscribe(), (this.retriesSubscription = void 0)),
                  (this.retries = void 0);
              }),
              (e.prototype.notifyNext = function () {
                var t = this._unsubscribe;
                (this._unsubscribe = null),
                  this._unsubscribeAndRecycle(),
                  (this._unsubscribe = t),
                  this.source.subscribe(this);
              }),
              e
            );
          })(i.Ds),
          kr = r(3018);
        function Ar(t) {
          return function (e) {
            return e.lift(new Cr(t));
          };
        }
        var Cr = (function () {
            function t(t) {
              this.notifier = t;
            }
            return (
              (t.prototype.call = function (t, e) {
                var r = new Rr(t),
                  n = e.subscribe(r);
                return n.add((0, i.ft)(this.notifier, new i.IY(r))), n;
              }),
              t
            );
          })(),
          Rr = (function (t) {
            function e() {
              var e = (null !== t && t.apply(this, arguments)) || this;
              return (e.hasValue = !1), e;
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                (this.value = t), (this.hasValue = !0);
              }),
              (e.prototype.notifyNext = function () {
                this.emitValue();
              }),
              (e.prototype.notifyComplete = function () {
                this.emitValue();
              }),
              (e.prototype.emitValue = function () {
                this.hasValue && ((this.hasValue = !1), this.destination.next(this.value));
              }),
              e
            );
          })(i.Ds);
        function Ir(t, e) {
          return (
            void 0 === e && (e = u.P),
            function (r) {
              return r.lift(new Tr(t, e));
            }
          );
        }
        var Tr = (function () {
            function t(t, e) {
              (this.period = t), (this.scheduler = e);
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new Or(t, this.period, this.scheduler));
              }),
              t
            );
          })(),
          Or = (function (t) {
            function e(e, r, n) {
              var i = t.call(this, e) || this;
              return (
                (i.period = r),
                (i.scheduler = n),
                (i.hasValue = !1),
                i.add(n.schedule(Nr, r, { subscriber: i, period: r })),
                i
              );
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                (this.lastValue = t), (this.hasValue = !0);
              }),
              (e.prototype.notifyNext = function () {
                this.hasValue && ((this.hasValue = !1), this.destination.next(this.lastValue));
              }),
              e
            );
          })(p.L);
        function Nr(t) {
          var e = t.subscriber,
            r = t.period;
          e.notifyNext(), this.schedule(t, r);
        }
        function jr(t, e) {
          return function (r) {
            return r.lift(new Lr(t, e));
          };
        }
        var Lr = (function () {
            function t(t, e) {
              (this.compareTo = t), (this.comparator = e);
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new Pr(t, this.compareTo, this.comparator));
              }),
              t
            );
          })(),
          Pr = (function (t) {
            function e(e, r, n) {
              var i = t.call(this, e) || this;
              return (
                (i.compareTo = r),
                (i.comparator = n),
                (i._a = []),
                (i._b = []),
                (i._oneComplete = !1),
                i.destination.add(r.subscribe(new Dr(e, i))),
                i
              );
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                this._oneComplete && 0 === this._b.length ? this.emit(!1) : (this._a.push(t), this.checkValues());
              }),
              (e.prototype._complete = function () {
                this._oneComplete ? this.emit(0 === this._a.length && 0 === this._b.length) : (this._oneComplete = !0),
                  this.unsubscribe();
              }),
              (e.prototype.checkValues = function () {
                for (var t = this, e = t._a, r = t._b, n = t.comparator; e.length > 0 && r.length > 0; ) {
                  var i = e.shift(),
                    o = r.shift(),
                    s = !1;
                  try {
                    s = n ? n(i, o) : i === o;
                  } catch (t) {
                    this.destination.error(t);
                  }
                  s || this.emit(!1);
                }
              }),
              (e.prototype.emit = function (t) {
                var e = this.destination;
                e.next(t), e.complete();
              }),
              (e.prototype.nextB = function (t) {
                this._oneComplete && 0 === this._a.length ? this.emit(!1) : (this._b.push(t), this.checkValues());
              }),
              (e.prototype.completeB = function () {
                this._oneComplete ? this.emit(0 === this._a.length && 0 === this._b.length) : (this._oneComplete = !0);
              }),
              e
            );
          })(p.L),
          Dr = (function (t) {
            function e(e, r) {
              var n = t.call(this, e) || this;
              return (n.parent = r), n;
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                this.parent.nextB(t);
              }),
              (e.prototype._error = function (t) {
                this.parent.error(t), this.unsubscribe();
              }),
              (e.prototype._complete = function () {
                this.parent.completeB(), this.unsubscribe();
              }),
              e
            );
          })(p.L);
        function Br() {
          return new ir.xQ();
        }
        function Ur() {
          return function (t) {
            return (0, kr.x)()(qe(Br)(t));
          };
        }
        function Fr(t, e, r) {
          var n;
          return (
            (n = t && 'object' == typeof t ? t : { bufferSize: t, windowTime: e, refCount: !1, scheduler: r }),
            function (t) {
              return t.lift(
                (function (t) {
                  var e,
                    r,
                    n = t.bufferSize,
                    i = void 0 === n ? Number.POSITIVE_INFINITY : n,
                    o = t.windowTime,
                    s = void 0 === o ? Number.POSITIVE_INFINITY : o,
                    a = t.refCount,
                    u = t.scheduler,
                    c = 0,
                    l = !1,
                    h = !1;
                  return function (t) {
                    var n;
                    c++,
                      !e || l
                        ? ((l = !1),
                          (e = new lr.t(i, s, u)),
                          (n = e.subscribe(this)),
                          (r = t.subscribe({
                            next: function (t) {
                              e.next(t);
                            },
                            error: function (t) {
                              (l = !0), e.error(t);
                            },
                            complete: function () {
                              (h = !0), (r = void 0), e.complete();
                            },
                          })),
                          h && (r = void 0))
                        : (n = e.subscribe(this)),
                      this.add(function () {
                        c--,
                          n.unsubscribe(),
                          (n = void 0),
                          r && !h && a && 0 === c && (r.unsubscribe(), (r = void 0), (e = void 0));
                      });
                  };
                })(n),
              );
            }
          );
        }
        function Hr(t) {
          return function (e) {
            return e.lift(new Wr(t, e));
          };
        }
        var Wr = (function () {
            function t(t, e) {
              (this.predicate = t), (this.source = e);
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new zr(t, this.predicate, this.source));
              }),
              t
            );
          })(),
          zr = (function (t) {
            function e(e, r, n) {
              var i = t.call(this, e) || this;
              return (i.predicate = r), (i.source = n), (i.seenValue = !1), (i.index = 0), i;
            }
            return (
              n.ZT(e, t),
              (e.prototype.applySingleValue = function (t) {
                this.seenValue
                  ? this.destination.error('Sequence contains more than one element')
                  : ((this.seenValue = !0), (this.singleValue = t));
              }),
              (e.prototype._next = function (t) {
                var e = this.index++;
                this.predicate ? this.tryNext(t, e) : this.applySingleValue(t);
              }),
              (e.prototype.tryNext = function (t, e) {
                try {
                  this.predicate(t, e, this.source) && this.applySingleValue(t);
                } catch (t) {
                  this.destination.error(t);
                }
              }),
              (e.prototype._complete = function () {
                var t = this.destination;
                this.index > 0
                  ? (t.next(this.seenValue ? this.singleValue : void 0), t.complete())
                  : t.error(new Nt.K());
              }),
              e
            );
          })(p.L);
        function Vr(t) {
          return function (e) {
            return e.lift(new qr(t));
          };
        }
        var qr = (function () {
            function t(t) {
              this.total = t;
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new Zr(t, this.total));
              }),
              t
            );
          })(),
          Zr = (function (t) {
            function e(e, r) {
              var n = t.call(this, e) || this;
              return (n.total = r), (n.count = 0), n;
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                ++this.count > this.total && this.destination.next(t);
              }),
              e
            );
          })(p.L);
        function $r(t) {
          return function (e) {
            return e.lift(new Gr(t));
          };
        }
        var Gr = (function () {
            function t(t) {
              if (((this._skipCount = t), this._skipCount < 0)) throw new Tt.W();
            }
            return (
              (t.prototype.call = function (t, e) {
                return 0 === this._skipCount ? e.subscribe(new p.L(t)) : e.subscribe(new Yr(t, this._skipCount));
              }),
              t
            );
          })(),
          Yr = (function (t) {
            function e(e, r) {
              var n = t.call(this, e) || this;
              return (n._skipCount = r), (n._count = 0), (n._ring = new Array(r)), n;
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                var e = this._skipCount,
                  r = this._count++;
                if (r < e) this._ring[r] = t;
                else {
                  var n = r % e,
                    i = this._ring,
                    o = i[n];
                  (i[n] = t), this.destination.next(o);
                }
              }),
              e
            );
          })(p.L);
        function Jr(t) {
          return function (e) {
            return e.lift(new Kr(t));
          };
        }
        var Kr = (function () {
            function t(t) {
              this.notifier = t;
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new Qr(t, this.notifier));
              }),
              t
            );
          })(),
          Qr = (function (t) {
            function e(e, r) {
              var n = t.call(this, e) || this;
              n.hasValue = !1;
              var o = new i.IY(n);
              n.add(o), (n.innerSubscription = o);
              var s = (0, i.ft)(r, o);
              return s !== o && (n.add(s), (n.innerSubscription = s)), n;
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (e) {
                this.hasValue && t.prototype._next.call(this, e);
              }),
              (e.prototype.notifyNext = function () {
                (this.hasValue = !0), this.innerSubscription && this.innerSubscription.unsubscribe();
              }),
              (e.prototype.notifyComplete = function () {}),
              e
            );
          })(i.Ds);
        function Xr(t) {
          return function (e) {
            return e.lift(new tn(t));
          };
        }
        var tn = (function () {
            function t(t) {
              this.predicate = t;
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new en(t, this.predicate));
              }),
              t
            );
          })(),
          en = (function (t) {
            function e(e, r) {
              var n = t.call(this, e) || this;
              return (n.predicate = r), (n.skipping = !0), (n.index = 0), n;
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                var e = this.destination;
                this.skipping && this.tryCallPredicate(t), this.skipping || e.next(t);
              }),
              (e.prototype.tryCallPredicate = function (t) {
                try {
                  var e = this.predicate(t, this.index++);
                  this.skipping = Boolean(e);
                } catch (t) {
                  this.destination.error(t);
                }
              }),
              e
            );
          })(p.L);
        function rn() {
          for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
          var r = t[t.length - 1];
          return (0, v.K)(r)
            ? (t.pop(),
              function (e) {
                return (0, V.z)(t, e, r);
              })
            : function (e) {
                return (0, V.z)(t, e);
              };
        }
        var nn = r(6650),
          on = r(5812),
          sn = (function (t) {
            function e(e, r, n) {
              void 0 === r && (r = 0), void 0 === n && (n = nn.e);
              var i = t.call(this) || this;
              return (
                (i.source = e),
                (i.delayTime = r),
                (i.scheduler = n),
                (!(0, on.k)(r) || r < 0) && (i.delayTime = 0),
                (n && 'function' == typeof n.schedule) || (i.scheduler = nn.e),
                i
              );
            }
            return (
              n.ZT(e, t),
              (e.create = function (t, r, n) {
                return void 0 === r && (r = 0), void 0 === n && (n = nn.e), new e(t, r, n);
              }),
              (e.dispatch = function (t) {
                var e = t.source,
                  r = t.subscriber;
                return this.add(e.subscribe(r));
              }),
              (e.prototype._subscribe = function (t) {
                var r = this.delayTime,
                  n = this.source;
                return this.scheduler.schedule(e.dispatch, r, { source: n, subscriber: t });
              }),
              e
            );
          })(yt.y);
        function an(t, e) {
          return (
            void 0 === e && (e = 0),
            function (r) {
              return r.lift(new un(t, e));
            }
          );
        }
        var un = (function () {
          function t(t, e) {
            (this.scheduler = t), (this.delay = e);
          }
          return (
            (t.prototype.call = function (t, e) {
              return new sn(e, this.delay, this.scheduler).subscribe(t);
            }),
            t
          );
        })();
        function cn(t, e) {
          return 'function' == typeof e
            ? function (r) {
                return r.pipe(
                  cn(function (r, n) {
                    return (0, W.D)(t(r, n)).pipe(
                      (0, Kt.U)(function (t, i) {
                        return e(r, t, n, i);
                      }),
                    );
                  }),
                );
              }
            : function (e) {
                return e.lift(new ln(t));
              };
        }
        var ln = (function () {
            function t(t) {
              this.project = t;
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new hn(t, this.project));
              }),
              t
            );
          })(),
          hn = (function (t) {
            function e(e, r) {
              var n = t.call(this, e) || this;
              return (n.project = r), (n.index = 0), n;
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                var e,
                  r = this.index++;
                try {
                  e = this.project(t, r);
                } catch (t) {
                  return void this.destination.error(t);
                }
                this._innerSub(e);
              }),
              (e.prototype._innerSub = function (t) {
                var e = this.innerSubscription;
                e && e.unsubscribe();
                var r = new i.IY(this),
                  n = this.destination;
                n.add(r),
                  (this.innerSubscription = (0, i.ft)(t, r)),
                  this.innerSubscription !== r && n.add(this.innerSubscription);
              }),
              (e.prototype._complete = function () {
                var e = this.innerSubscription;
                (e && !e.closed) || t.prototype._complete.call(this), this.unsubscribe();
              }),
              (e.prototype._unsubscribe = function () {
                this.innerSubscription = void 0;
              }),
              (e.prototype.notifyComplete = function () {
                (this.innerSubscription = void 0), this.isStopped && t.prototype._complete.call(this);
              }),
              (e.prototype.notifyNext = function (t) {
                this.destination.next(t);
              }),
              e
            );
          })(i.Ds);
        function fn() {
          return cn(he.y);
        }
        function dn(t, e) {
          return e
            ? cn(function () {
                return t;
              }, e)
            : cn(function () {
                return t;
              });
        }
        function pn(t) {
          return function (e) {
            return e.lift(new yn(t));
          };
        }
        var yn = (function () {
            function t(t) {
              this.notifier = t;
            }
            return (
              (t.prototype.call = function (t, e) {
                var r = new gn(t),
                  n = (0, i.ft)(this.notifier, new i.IY(r));
                return n && !r.seenValue ? (r.add(n), e.subscribe(r)) : r;
              }),
              t
            );
          })(),
          gn = (function (t) {
            function e(e) {
              var r = t.call(this, e) || this;
              return (r.seenValue = !1), r;
            }
            return (
              n.ZT(e, t),
              (e.prototype.notifyNext = function () {
                (this.seenValue = !0), this.complete();
              }),
              (e.prototype.notifyComplete = function () {}),
              e
            );
          })(i.Ds);
        function bn(t, e) {
          return (
            void 0 === e && (e = !1),
            function (r) {
              return r.lift(new mn(t, e));
            }
          );
        }
        var mn = (function () {
            function t(t, e) {
              (this.predicate = t), (this.inclusive = e);
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new vn(t, this.predicate, this.inclusive));
              }),
              t
            );
          })(),
          vn = (function (t) {
            function e(e, r, n) {
              var i = t.call(this, e) || this;
              return (i.predicate = r), (i.inclusive = n), (i.index = 0), i;
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                var e,
                  r = this.destination;
                try {
                  e = this.predicate(t, this.index++);
                } catch (t) {
                  return void r.error(t);
                }
                this.nextOrComplete(t, e);
              }),
              (e.prototype.nextOrComplete = function (t, e) {
                var r = this.destination;
                Boolean(e) ? r.next(t) : (this.inclusive && r.next(t), r.complete());
              }),
              e
            );
          })(p.L),
          wn = r(3306),
          _n = r(4156);
        function Sn(t, e, r) {
          return function (n) {
            return n.lift(new En(t, e, r));
          };
        }
        var En = (function () {
            function t(t, e, r) {
              (this.nextOrObserver = t), (this.error = e), (this.complete = r);
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new xn(t, this.nextOrObserver, this.error, this.complete));
              }),
              t
            );
          })(),
          xn = (function (t) {
            function e(e, r, n, i) {
              var o = t.call(this, e) || this;
              return (
                (o._tapNext = wn.Z),
                (o._tapError = wn.Z),
                (o._tapComplete = wn.Z),
                (o._tapError = n || wn.Z),
                (o._tapComplete = i || wn.Z),
                (0, _n.m)(r)
                  ? ((o._context = o), (o._tapNext = r))
                  : r &&
                    ((o._context = r),
                    (o._tapNext = r.next || wn.Z),
                    (o._tapError = r.error || wn.Z),
                    (o._tapComplete = r.complete || wn.Z)),
                o
              );
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                try {
                  this._tapNext.call(this._context, t);
                } catch (t) {
                  return void this.destination.error(t);
                }
                this.destination.next(t);
              }),
              (e.prototype._error = function (t) {
                try {
                  this._tapError.call(this._context, t);
                } catch (t) {
                  return void this.destination.error(t);
                }
                this.destination.error(t);
              }),
              (e.prototype._complete = function () {
                try {
                  this._tapComplete.call(this._context);
                } catch (t) {
                  return void this.destination.error(t);
                }
                return this.destination.complete();
              }),
              e
            );
          })(p.L),
          Mn = { leading: !0, trailing: !1 };
        function kn(t, e) {
          return (
            void 0 === e && (e = Mn),
            function (r) {
              return r.lift(new An(t, !!e.leading, !!e.trailing));
            }
          );
        }
        var An = (function () {
            function t(t, e, r) {
              (this.durationSelector = t), (this.leading = e), (this.trailing = r);
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new Cn(t, this.durationSelector, this.leading, this.trailing));
              }),
              t
            );
          })(),
          Cn = (function (t) {
            function e(e, r, n, i) {
              var o = t.call(this, e) || this;
              return (
                (o.destination = e),
                (o.durationSelector = r),
                (o._leading = n),
                (o._trailing = i),
                (o._hasValue = !1),
                o
              );
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                (this._hasValue = !0),
                  (this._sendValue = t),
                  this._throttled || (this._leading ? this.send() : this.throttle(t));
              }),
              (e.prototype.send = function () {
                var t = this._hasValue,
                  e = this._sendValue;
                t && (this.destination.next(e), this.throttle(e)), (this._hasValue = !1), (this._sendValue = void 0);
              }),
              (e.prototype.throttle = function (t) {
                var e = this.tryDurationSelector(t);
                e && this.add((this._throttled = (0, i.ft)(e, new i.IY(this))));
              }),
              (e.prototype.tryDurationSelector = function (t) {
                try {
                  return this.durationSelector(t);
                } catch (t) {
                  return this.destination.error(t), null;
                }
              }),
              (e.prototype.throttlingDone = function () {
                var t = this._throttled,
                  e = this._trailing;
                t && t.unsubscribe(), (this._throttled = void 0), e && this.send();
              }),
              (e.prototype.notifyNext = function () {
                this.throttlingDone();
              }),
              (e.prototype.notifyComplete = function () {
                this.throttlingDone();
              }),
              e
            );
          })(i.Ds);
        function Rn(t, e, r) {
          return (
            void 0 === e && (e = u.P),
            void 0 === r && (r = Mn),
            function (n) {
              return n.lift(new In(t, e, r.leading, r.trailing));
            }
          );
        }
        var In = (function () {
            function t(t, e, r, n) {
              (this.duration = t), (this.scheduler = e), (this.leading = r), (this.trailing = n);
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new Tn(t, this.duration, this.scheduler, this.leading, this.trailing));
              }),
              t
            );
          })(),
          Tn = (function (t) {
            function e(e, r, n, i, o) {
              var s = t.call(this, e) || this;
              return (
                (s.duration = r),
                (s.scheduler = n),
                (s.leading = i),
                (s.trailing = o),
                (s._hasTrailingValue = !1),
                (s._trailingValue = null),
                s
              );
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                this.throttled
                  ? this.trailing && ((this._trailingValue = t), (this._hasTrailingValue = !0))
                  : (this.add((this.throttled = this.scheduler.schedule(On, this.duration, { subscriber: this }))),
                    this.leading
                      ? this.destination.next(t)
                      : this.trailing && ((this._trailingValue = t), (this._hasTrailingValue = !0)));
              }),
              (e.prototype._complete = function () {
                this._hasTrailingValue
                  ? (this.destination.next(this._trailingValue), this.destination.complete())
                  : this.destination.complete();
              }),
              (e.prototype.clearThrottle = function () {
                var t = this.throttled;
                t &&
                  (this.trailing &&
                    this._hasTrailingValue &&
                    (this.destination.next(this._trailingValue),
                    (this._trailingValue = null),
                    (this._hasTrailingValue = !1)),
                  t.unsubscribe(),
                  this.remove(t),
                  (this.throttled = null));
              }),
              e
            );
          })(p.L);
        function On(t) {
          t.subscriber.clearThrottle();
        }
        var Nn = r(1410);
        function jn(t) {
          return (
            void 0 === t && (t = u.P),
            function (e) {
              return (0, Nn.P)(function () {
                return e.pipe(
                  Ie(
                    function (e, r) {
                      var n = e.current;
                      return { value: r, current: t.now(), last: n };
                    },
                    { current: t.now(), value: void 0, last: void 0 },
                  ),
                  (0, Kt.U)(function (t) {
                    var e = t.current,
                      r = t.last,
                      n = t.value;
                    return new Ln(n, e - r);
                  }),
                );
              });
            }
          );
        }
        var Ln = (function () {
            return function (t, e) {
              (this.value = t), (this.interval = e);
            };
          })(),
          Pn = r(1462);
        function Dn(t, e, r) {
          return (
            void 0 === r && (r = u.P),
            function (n) {
              var i = ct(t),
                o = i ? +t - r.now() : Math.abs(t);
              return n.lift(new Bn(o, i, e, r));
            }
          );
        }
        var Bn = (function () {
            function t(t, e, r, n) {
              (this.waitFor = t), (this.absoluteTimeout = e), (this.withObservable = r), (this.scheduler = n);
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new Un(t, this.absoluteTimeout, this.waitFor, this.withObservable, this.scheduler));
              }),
              t
            );
          })(),
          Un = (function (t) {
            function e(e, r, n, i, o) {
              var s = t.call(this, e) || this;
              return (
                (s.absoluteTimeout = r),
                (s.waitFor = n),
                (s.withObservable = i),
                (s.scheduler = o),
                s.scheduleTimeout(),
                s
              );
            }
            return (
              n.ZT(e, t),
              (e.dispatchTimeout = function (t) {
                var e = t.withObservable;
                t._unsubscribeAndRecycle(), t.add((0, i.ft)(e, new i.IY(t)));
              }),
              (e.prototype.scheduleTimeout = function () {
                var t = this.action;
                t
                  ? (this.action = t.schedule(this, this.waitFor))
                  : this.add((this.action = this.scheduler.schedule(e.dispatchTimeout, this.waitFor, this)));
              }),
              (e.prototype._next = function (e) {
                this.absoluteTimeout || this.scheduleTimeout(), t.prototype._next.call(this, e);
              }),
              (e.prototype._unsubscribe = function () {
                (this.action = void 0), (this.scheduler = null), (this.withObservable = null);
              }),
              e
            );
          })(i.Ds),
          Fn = r(4944);
        function Hn(t, e) {
          return void 0 === e && (e = u.P), Dn(t, (0, Fn._)(new Pn.W()), e);
        }
        function Wn(t) {
          return (
            void 0 === t && (t = u.P),
            (0, Kt.U)(function (e) {
              return new zn(e, t.now());
            })
          );
        }
        var zn = (function () {
          return function (t, e) {
            (this.value = t), (this.timestamp = e);
          };
        })();
        function Vn(t, e, r) {
          return 0 === r ? [e] : (t.push(e), t);
        }
        function qn() {
          return je(Vn, []);
        }
        function Zn(t) {
          return function (e) {
            return e.lift(new $n(t));
          };
        }
        var $n = (function () {
            function t(t) {
              this.windowBoundaries = t;
            }
            return (
              (t.prototype.call = function (t, e) {
                var r = new Gn(t),
                  n = e.subscribe(r);
                return n.closed || r.add((0, i.ft)(this.windowBoundaries, new i.IY(r))), n;
              }),
              t
            );
          })(),
          Gn = (function (t) {
            function e(e) {
              var r = t.call(this, e) || this;
              return (r.window = new ir.xQ()), e.next(r.window), r;
            }
            return (
              n.ZT(e, t),
              (e.prototype.notifyNext = function () {
                this.openWindow();
              }),
              (e.prototype.notifyError = function (t) {
                this._error(t);
              }),
              (e.prototype.notifyComplete = function () {
                this._complete();
              }),
              (e.prototype._next = function (t) {
                this.window.next(t);
              }),
              (e.prototype._error = function (t) {
                this.window.error(t), this.destination.error(t);
              }),
              (e.prototype._complete = function () {
                this.window.complete(), this.destination.complete();
              }),
              (e.prototype._unsubscribe = function () {
                this.window = null;
              }),
              (e.prototype.openWindow = function () {
                var t = this.window;
                t && t.complete();
                var e = this.destination,
                  r = (this.window = new ir.xQ());
                e.next(r);
              }),
              e
            );
          })(i.Ds);
        function Yn(t, e) {
          return (
            void 0 === e && (e = 0),
            function (r) {
              return r.lift(new Jn(t, e));
            }
          );
        }
        var Jn = (function () {
            function t(t, e) {
              (this.windowSize = t), (this.startWindowEvery = e);
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new Kn(t, this.windowSize, this.startWindowEvery));
              }),
              t
            );
          })(),
          Kn = (function (t) {
            function e(e, r, n) {
              var i = t.call(this, e) || this;
              return (
                (i.destination = e),
                (i.windowSize = r),
                (i.startWindowEvery = n),
                (i.windows = [new ir.xQ()]),
                (i.count = 0),
                e.next(i.windows[0]),
                i
              );
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                for (
                  var e = this.startWindowEvery > 0 ? this.startWindowEvery : this.windowSize,
                    r = this.destination,
                    n = this.windowSize,
                    i = this.windows,
                    o = i.length,
                    s = 0;
                  s < o && !this.closed;
                  s++
                )
                  i[s].next(t);
                var a = this.count - n + 1;
                if (
                  (a >= 0 && a % e == 0 && !this.closed && i.shift().complete(), ++this.count % e == 0 && !this.closed)
                ) {
                  var u = new ir.xQ();
                  i.push(u), r.next(u);
                }
              }),
              (e.prototype._error = function (t) {
                var e = this.windows;
                if (e) for (; e.length > 0 && !this.closed; ) e.shift().error(t);
                this.destination.error(t);
              }),
              (e.prototype._complete = function () {
                var t = this.windows;
                if (t) for (; t.length > 0 && !this.closed; ) t.shift().complete();
                this.destination.complete();
              }),
              (e.prototype._unsubscribe = function () {
                (this.count = 0), (this.windows = null);
              }),
              e
            );
          })(p.L);
        function Qn(t) {
          var e = u.P,
            r = null,
            n = Number.POSITIVE_INFINITY;
          return (
            (0, v.K)(arguments[3]) && (e = arguments[3]),
            (0, v.K)(arguments[2]) ? (e = arguments[2]) : (0, on.k)(arguments[2]) && (n = Number(arguments[2])),
            (0, v.K)(arguments[1]) ? (e = arguments[1]) : (0, on.k)(arguments[1]) && (r = Number(arguments[1])),
            function (i) {
              return i.lift(new Xn(t, r, n, e));
            }
          );
        }
        var Xn = (function () {
            function t(t, e, r, n) {
              (this.windowTimeSpan = t),
                (this.windowCreationInterval = e),
                (this.maxWindowSize = r),
                (this.scheduler = n);
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(
                  new ei(t, this.windowTimeSpan, this.windowCreationInterval, this.maxWindowSize, this.scheduler),
                );
              }),
              t
            );
          })(),
          ti = (function (t) {
            function e() {
              var e = (null !== t && t.apply(this, arguments)) || this;
              return (e._numberOfNextedValues = 0), e;
            }
            return (
              n.ZT(e, t),
              (e.prototype.next = function (e) {
                this._numberOfNextedValues++, t.prototype.next.call(this, e);
              }),
              Object.defineProperty(e.prototype, 'numberOfNextedValues', {
                get: function () {
                  return this._numberOfNextedValues;
                },
                enumerable: !0,
                configurable: !0,
              }),
              e
            );
          })(ir.xQ),
          ei = (function (t) {
            function e(e, r, n, i, o) {
              var s = t.call(this, e) || this;
              (s.destination = e),
                (s.windowTimeSpan = r),
                (s.windowCreationInterval = n),
                (s.maxWindowSize = i),
                (s.scheduler = o),
                (s.windows = []);
              var a = s.openWindow();
              if (null !== n && n >= 0) {
                var u = { subscriber: s, window: a, context: null },
                  c = { windowTimeSpan: r, windowCreationInterval: n, subscriber: s, scheduler: o };
                s.add(o.schedule(ii, r, u)), s.add(o.schedule(ni, n, c));
              } else {
                var l = { subscriber: s, window: a, windowTimeSpan: r };
                s.add(o.schedule(ri, r, l));
              }
              return s;
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                for (var e = this.windows, r = e.length, n = 0; n < r; n++) {
                  var i = e[n];
                  i.closed || (i.next(t), i.numberOfNextedValues >= this.maxWindowSize && this.closeWindow(i));
                }
              }),
              (e.prototype._error = function (t) {
                for (var e = this.windows; e.length > 0; ) e.shift().error(t);
                this.destination.error(t);
              }),
              (e.prototype._complete = function () {
                for (var t = this.windows; t.length > 0; ) {
                  var e = t.shift();
                  e.closed || e.complete();
                }
                this.destination.complete();
              }),
              (e.prototype.openWindow = function () {
                var t = new ti();
                return this.windows.push(t), this.destination.next(t), t;
              }),
              (e.prototype.closeWindow = function (t) {
                t.complete();
                var e = this.windows;
                e.splice(e.indexOf(t), 1);
              }),
              e
            );
          })(p.L);
        function ri(t) {
          var e = t.subscriber,
            r = t.windowTimeSpan,
            n = t.window;
          n && e.closeWindow(n), (t.window = e.openWindow()), this.schedule(t, r);
        }
        function ni(t) {
          var e = t.windowTimeSpan,
            r = t.subscriber,
            n = t.scheduler,
            i = t.windowCreationInterval,
            o = r.openWindow(),
            s = this,
            a = { action: s, subscription: null },
            u = { subscriber: r, window: o, context: a };
          (a.subscription = n.schedule(ii, e, u)), s.add(a.subscription), s.schedule(t, i);
        }
        function ii(t) {
          var e = t.subscriber,
            r = t.window,
            n = t.context;
          n && n.action && n.subscription && n.action.remove(n.subscription), e.closeWindow(r);
        }
        function oi(t, e) {
          return function (r) {
            return r.lift(new si(t, e));
          };
        }
        var si = (function () {
            function t(t, e) {
              (this.openings = t), (this.closingSelector = e);
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new ai(t, this.openings, this.closingSelector));
              }),
              t
            );
          })(),
          ai = (function (t) {
            function e(e, r, n) {
              var i = t.call(this, e) || this;
              return (
                (i.openings = r),
                (i.closingSelector = n),
                (i.contexts = []),
                i.add((i.openSubscription = (0, C.D)(i, r, r))),
                i
              );
            }
            return (
              n.ZT(e, t),
              (e.prototype._next = function (t) {
                var e = this.contexts;
                if (e) for (var r = e.length, n = 0; n < r; n++) e[n].window.next(t);
              }),
              (e.prototype._error = function (e) {
                var r = this.contexts;
                if (((this.contexts = null), r))
                  for (var n = r.length, i = -1; ++i < n; ) {
                    var o = r[i];
                    o.window.error(e), o.subscription.unsubscribe();
                  }
                t.prototype._error.call(this, e);
              }),
              (e.prototype._complete = function () {
                var e = this.contexts;
                if (((this.contexts = null), e))
                  for (var r = e.length, n = -1; ++n < r; ) {
                    var i = e[n];
                    i.window.complete(), i.subscription.unsubscribe();
                  }
                t.prototype._complete.call(this);
              }),
              (e.prototype._unsubscribe = function () {
                var t = this.contexts;
                if (((this.contexts = null), t))
                  for (var e = t.length, r = -1; ++r < e; ) {
                    var n = t[r];
                    n.window.unsubscribe(), n.subscription.unsubscribe();
                  }
              }),
              (e.prototype.notifyNext = function (t, e, r, n, i) {
                if (t === this.openings) {
                  var o = void 0;
                  try {
                    o = (0, this.closingSelector)(e);
                  } catch (t) {
                    return this.error(t);
                  }
                  var s = new ir.xQ(),
                    a = new A.w(),
                    u = { window: s, subscription: a };
                  this.contexts.push(u);
                  var c = (0, C.D)(this, o, u);
                  c.closed ? this.closeWindow(this.contexts.length - 1) : ((c.context = u), a.add(c)),
                    this.destination.next(s);
                } else this.closeWindow(this.contexts.indexOf(t));
              }),
              (e.prototype.notifyError = function (t) {
                this.error(t);
              }),
              (e.prototype.notifyComplete = function (t) {
                t !== this.openSubscription && this.closeWindow(this.contexts.indexOf(t.context));
              }),
              (e.prototype.closeWindow = function (t) {
                if (-1 !== t) {
                  var e = this.contexts,
                    r = e[t],
                    n = r.window,
                    i = r.subscription;
                  e.splice(t, 1), n.complete(), i.unsubscribe();
                }
              }),
              e
            );
          })(R.L);
        function ui(t) {
          return function (e) {
            return e.lift(new ci(t));
          };
        }
        var ci = (function () {
            function t(t) {
              this.closingSelector = t;
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new li(t, this.closingSelector));
              }),
              t
            );
          })(),
          li = (function (t) {
            function e(e, r) {
              var n = t.call(this, e) || this;
              return (n.destination = e), (n.closingSelector = r), n.openWindow(), n;
            }
            return (
              n.ZT(e, t),
              (e.prototype.notifyNext = function (t, e, r, n, i) {
                this.openWindow(i);
              }),
              (e.prototype.notifyError = function (t) {
                this._error(t);
              }),
              (e.prototype.notifyComplete = function (t) {
                this.openWindow(t);
              }),
              (e.prototype._next = function (t) {
                this.window.next(t);
              }),
              (e.prototype._error = function (t) {
                this.window.error(t), this.destination.error(t), this.unsubscribeClosingNotification();
              }),
              (e.prototype._complete = function () {
                this.window.complete(), this.destination.complete(), this.unsubscribeClosingNotification();
              }),
              (e.prototype.unsubscribeClosingNotification = function () {
                this.closingNotification && this.closingNotification.unsubscribe();
              }),
              (e.prototype.openWindow = function (t) {
                void 0 === t && (t = null), t && (this.remove(t), t.unsubscribe());
                var e = this.window;
                e && e.complete();
                var r,
                  n = (this.window = new ir.xQ());
                this.destination.next(n);
                try {
                  r = (0, this.closingSelector)();
                } catch (t) {
                  return this.destination.error(t), void this.window.error(t);
                }
                this.add((this.closingNotification = (0, C.D)(this, r)));
              }),
              e
            );
          })(R.L);
        function hi() {
          for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
          return function (e) {
            var r;
            'function' == typeof t[t.length - 1] && (r = t.pop());
            var n = t;
            return e.lift(new fi(n, r));
          };
        }
        var fi = (function () {
            function t(t, e) {
              (this.observables = t), (this.project = e);
            }
            return (
              (t.prototype.call = function (t, e) {
                return e.subscribe(new di(t, this.observables, this.project));
              }),
              t
            );
          })(),
          di = (function (t) {
            function e(e, r, n) {
              var i = t.call(this, e) || this;
              (i.observables = r), (i.project = n), (i.toRespond = []);
              var o = r.length;
              i.values = new Array(o);
              for (var s = 0; s < o; s++) i.toRespond.push(s);
              for (s = 0; s < o; s++) {
                var a = r[s];
                i.add((0, C.D)(i, a, void 0, s));
              }
              return i;
            }
            return (
              n.ZT(e, t),
              (e.prototype.notifyNext = function (t, e, r) {
                this.values[r] = e;
                var n = this.toRespond;
                if (n.length > 0) {
                  var i = n.indexOf(r);
                  -1 !== i && n.splice(i, 1);
                }
              }),
              (e.prototype.notifyComplete = function () {}),
              (e.prototype._next = function (t) {
                if (0 === this.toRespond.length) {
                  var e = [t].concat(this.values);
                  this.project ? this._tryProject(e) : this.destination.next(e);
                }
              }),
              (e.prototype._tryProject = function (t) {
                var e;
                try {
                  e = this.project.apply(this, t);
                } catch (t) {
                  return void this.destination.error(t);
                }
                this.destination.next(e);
              }),
              e
            );
          })(R.L),
          pi = r(5080);
        function yi() {
          for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
          return function (e) {
            return e.lift.call(pi.$R.apply(void 0, [e].concat(t)));
          };
        }
        function gi(t) {
          return function (e) {
            return e.lift(new pi.mx(t));
          };
        }
      },
      5987: (t, e, r) => {
        'use strict';
        r.d(e, { ZT: () => i });
        var n = function (t, e) {
          return (
            (n =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (t, e) {
                  t.__proto__ = e;
                }) ||
              function (t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
              }),
            n(t, e)
          );
        };
        function i(t, e) {
          function r() {
            this.constructor = t;
          }
          n(t, e), (t.prototype = null === e ? Object.create(e) : ((r.prototype = e.prototype), new r()));
        }
      },
      9509: (t, e, r) => {
        var n = r(8764),
          i = n.Buffer;
        function o(t, e) {
          for (var r in t) e[r] = t[r];
        }
        function s(t, e, r) {
          return i(t, e, r);
        }
        i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow ? (t.exports = n) : (o(n, e), (e.Buffer = s)),
          (s.prototype = Object.create(i.prototype)),
          o(i, s),
          (s.from = function (t, e, r) {
            if ('number' == typeof t) throw new TypeError('Argument must not be a number');
            return i(t, e, r);
          }),
          (s.alloc = function (t, e, r) {
            if ('number' != typeof t) throw new TypeError('Argument must be a number');
            var n = i(t);
            return void 0 !== e ? ('string' == typeof r ? n.fill(e, r) : n.fill(e)) : n.fill(0), n;
          }),
          (s.allocUnsafe = function (t) {
            if ('number' != typeof t) throw new TypeError('Argument must be a number');
            return i(t);
          }),
          (s.allocUnsafeSlow = function (t) {
            if ('number' != typeof t) throw new TypeError('Argument must be a number');
            return n.SlowBuffer(t);
          });
      },
      7253: (t, e, r) => {
        const n = r(9539),
          i = r(7187);
        var o = 'object' == typeof Reflect ? Reflect : null,
          s =
            o && 'function' == typeof o.apply
              ? o.apply
              : function (t, e, r) {
                  return Function.prototype.apply.call(t, e, r);
                };
        function a() {
          i.call(this);
        }
        function u(t, e, r) {
          try {
            s(t, e, r);
          } catch (t) {
            setTimeout(() => {
              throw t;
            });
          }
        }
        function c(t, e) {
          for (var r = new Array(e), n = 0; n < e; ++n) r[n] = t[n];
          return r;
        }
        (t.exports = a),
          n.inherits(a, i),
          (a.prototype.emit = function (t) {
            for (var e = [], r = 1; r < arguments.length; r++) e.push(arguments[r]);
            var n = 'error' === t,
              i = this._events;
            if (void 0 !== i) n = n && void 0 === i.error;
            else if (!n) return !1;
            if (n) {
              var o;
              if ((e.length > 0 && (o = e[0]), o instanceof Error)) throw o;
              var s = new Error('Unhandled error.' + (o ? ' (' + o.message + ')' : ''));
              throw ((s.context = o), s);
            }
            var a = i[t];
            if (void 0 === a) return !1;
            if ('function' == typeof a) u(a, this, e);
            else {
              var l = a.length,
                h = c(a, l);
              for (r = 0; r < l; ++r) u(h[r], this, e);
            }
            return !0;
          });
      },
      7478: (t, e, r) => {
        'use strict';
        var n = r(210),
          i = r(1924),
          o = r(631),
          s = n('%TypeError%'),
          a = n('%WeakMap%', !0),
          u = n('%Map%', !0),
          c = i('WeakMap.prototype.get', !0),
          l = i('WeakMap.prototype.set', !0),
          h = i('WeakMap.prototype.has', !0),
          f = i('Map.prototype.get', !0),
          d = i('Map.prototype.set', !0),
          p = i('Map.prototype.has', !0),
          y = function (t, e) {
            for (var r, n = t; null !== (r = n.next); n = r)
              if (r.key === e) return (n.next = r.next), (r.next = t.next), (t.next = r), r;
          };
        t.exports = function () {
          var t,
            e,
            r,
            n = {
              assert: function (t) {
                if (!n.has(t)) throw new s('Side channel does not contain ' + o(t));
              },
              get: function (n) {
                if (a && n && ('object' == typeof n || 'function' == typeof n)) {
                  if (t) return c(t, n);
                } else if (u) {
                  if (e) return f(e, n);
                } else if (r)
                  return (function (t, e) {
                    var r = y(t, e);
                    return r && r.value;
                  })(r, n);
              },
              has: function (n) {
                if (a && n && ('object' == typeof n || 'function' == typeof n)) {
                  if (t) return h(t, n);
                } else if (u) {
                  if (e) return p(e, n);
                } else if (r)
                  return (function (t, e) {
                    return !!y(t, e);
                  })(r, n);
                return !1;
              },
              set: function (n, i) {
                a && n && ('object' == typeof n || 'function' == typeof n)
                  ? (t || (t = new a()), l(t, n, i))
                  : u
                    ? (e || (e = new u()), d(e, n, i))
                    : (r || (r = { key: {}, next: null }),
                      (function (t, e, r) {
                        var n = y(t, e);
                        n ? (n.value = r) : (t.next = { key: e, next: t.next, value: r });
                      })(r, n, i));
              },
            };
          return n;
        };
      },
      2553: (t, e, r) => {
        'use strict';
        var n = r(9509).Buffer,
          i =
            n.isEncoding ||
            function (t) {
              switch ((t = '' + t) && t.toLowerCase()) {
                case 'hex':
                case 'utf8':
                case 'utf-8':
                case 'ascii':
                case 'binary':
                case 'base64':
                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                case 'raw':
                  return !0;
                default:
                  return !1;
              }
            };
        function o(t) {
          var e;
          switch (
            ((this.encoding = (function (t) {
              var e = (function (t) {
                if (!t) return 'utf8';
                for (var e; ; )
                  switch (t) {
                    case 'utf8':
                    case 'utf-8':
                      return 'utf8';
                    case 'ucs2':
                    case 'ucs-2':
                    case 'utf16le':
                    case 'utf-16le':
                      return 'utf16le';
                    case 'latin1':
                    case 'binary':
                      return 'latin1';
                    case 'base64':
                    case 'ascii':
                    case 'hex':
                      return t;
                    default:
                      if (e) return;
                      (t = ('' + t).toLowerCase()), (e = !0);
                  }
              })(t);
              if ('string' != typeof e && (n.isEncoding === i || !i(t))) throw new Error('Unknown encoding: ' + t);
              return e || t;
            })(t)),
            this.encoding)
          ) {
            case 'utf16le':
              (this.text = u), (this.end = c), (e = 4);
              break;
            case 'utf8':
              (this.fillLast = a), (e = 4);
              break;
            case 'base64':
              (this.text = l), (this.end = h), (e = 3);
              break;
            default:
              return (this.write = f), void (this.end = d);
          }
          (this.lastNeed = 0), (this.lastTotal = 0), (this.lastChar = n.allocUnsafe(e));
        }
        function s(t) {
          return t <= 127 ? 0 : t >> 5 == 6 ? 2 : t >> 4 == 14 ? 3 : t >> 3 == 30 ? 4 : t >> 6 == 2 ? -1 : -2;
        }
        function a(t) {
          var e = this.lastTotal - this.lastNeed,
            r = (function (t, e, r) {
              if (128 != (192 & e[0])) return (t.lastNeed = 0), '�';
              if (t.lastNeed > 1 && e.length > 1) {
                if (128 != (192 & e[1])) return (t.lastNeed = 1), '�';
                if (t.lastNeed > 2 && e.length > 2 && 128 != (192 & e[2])) return (t.lastNeed = 2), '�';
              }
            })(this, t);
          return void 0 !== r
            ? r
            : this.lastNeed <= t.length
              ? (t.copy(this.lastChar, e, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal))
              : (t.copy(this.lastChar, e, 0, t.length), void (this.lastNeed -= t.length));
        }
        function u(t, e) {
          if ((t.length - e) % 2 == 0) {
            var r = t.toString('utf16le', e);
            if (r) {
              var n = r.charCodeAt(r.length - 1);
              if (n >= 55296 && n <= 56319)
                return (
                  (this.lastNeed = 2),
                  (this.lastTotal = 4),
                  (this.lastChar[0] = t[t.length - 2]),
                  (this.lastChar[1] = t[t.length - 1]),
                  r.slice(0, -1)
                );
            }
            return r;
          }
          return (
            (this.lastNeed = 1),
            (this.lastTotal = 2),
            (this.lastChar[0] = t[t.length - 1]),
            t.toString('utf16le', e, t.length - 1)
          );
        }
        function c(t) {
          var e = t && t.length ? this.write(t) : '';
          if (this.lastNeed) {
            var r = this.lastTotal - this.lastNeed;
            return e + this.lastChar.toString('utf16le', 0, r);
          }
          return e;
        }
        function l(t, e) {
          var r = (t.length - e) % 3;
          return 0 === r
            ? t.toString('base64', e)
            : ((this.lastNeed = 3 - r),
              (this.lastTotal = 3),
              1 === r
                ? (this.lastChar[0] = t[t.length - 1])
                : ((this.lastChar[0] = t[t.length - 2]), (this.lastChar[1] = t[t.length - 1])),
              t.toString('base64', e, t.length - r));
        }
        function h(t) {
          var e = t && t.length ? this.write(t) : '';
          return this.lastNeed ? e + this.lastChar.toString('base64', 0, 3 - this.lastNeed) : e;
        }
        function f(t) {
          return t.toString(this.encoding);
        }
        function d(t) {
          return t && t.length ? this.write(t) : '';
        }
        (e.s = o),
          (o.prototype.write = function (t) {
            if (0 === t.length) return '';
            var e, r;
            if (this.lastNeed) {
              if (void 0 === (e = this.fillLast(t))) return '';
              (r = this.lastNeed), (this.lastNeed = 0);
            } else r = 0;
            return r < t.length ? (e ? e + this.text(t, r) : this.text(t, r)) : e || '';
          }),
          (o.prototype.end = function (t) {
            var e = t && t.length ? this.write(t) : '';
            return this.lastNeed ? e + '�' : e;
          }),
          (o.prototype.text = function (t, e) {
            var r = (function (t, e, r) {
              var n = e.length - 1;
              if (n < r) return 0;
              var i = s(e[n]);
              return i >= 0
                ? (i > 0 && (t.lastNeed = i - 1), i)
                : --n < r || -2 === i
                  ? 0
                  : (i = s(e[n])) >= 0
                    ? (i > 0 && (t.lastNeed = i - 2), i)
                    : --n < r || -2 === i
                      ? 0
                      : (i = s(e[n])) >= 0
                        ? (i > 0 && (2 === i ? (i = 0) : (t.lastNeed = i - 3)), i)
                        : 0;
            })(this, t, e);
            if (!this.lastNeed) return t.toString('utf8', e);
            this.lastTotal = r;
            var n = t.length - (r - this.lastNeed);
            return t.copy(this.lastChar, 0, n), t.toString('utf8', e, n);
          }),
          (o.prototype.fillLast = function (t) {
            if (this.lastNeed <= t.length)
              return (
                t.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed),
                this.lastChar.toString(this.encoding, 0, this.lastTotal)
              );
            t.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, t.length), (this.lastNeed -= t.length);
          });
      },
      655: (t, e, r) => {
        'use strict';
        r.r(e),
          r.d(e, {
            __assign: () => o,
            __asyncDelegator: () => _,
            __asyncGenerator: () => w,
            __asyncValues: () => S,
            __await: () => v,
            __awaiter: () => l,
            __classPrivateFieldGet: () => A,
            __classPrivateFieldIn: () => R,
            __classPrivateFieldSet: () => C,
            __createBinding: () => f,
            __decorate: () => a,
            __exportStar: () => d,
            __extends: () => i,
            __generator: () => h,
            __importDefault: () => k,
            __importStar: () => M,
            __makeTemplateObject: () => E,
            __metadata: () => c,
            __param: () => u,
            __read: () => y,
            __rest: () => s,
            __spread: () => g,
            __spreadArray: () => m,
            __spreadArrays: () => b,
            __values: () => p,
          });
        var n = function (t, e) {
          return (
            (n =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (t, e) {
                  t.__proto__ = e;
                }) ||
              function (t, e) {
                for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
              }),
            n(t, e)
          );
        };
        function i(t, e) {
          if ('function' != typeof e && null !== e)
            throw new TypeError('Class extends value ' + String(e) + ' is not a constructor or null');
          function r() {
            this.constructor = t;
          }
          n(t, e), (t.prototype = null === e ? Object.create(e) : ((r.prototype = e.prototype), new r()));
        }
        var o = function () {
          return (
            (o =
              Object.assign ||
              function (t) {
                for (var e, r = 1, n = arguments.length; r < n; r++)
                  for (var i in (e = arguments[r])) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
                return t;
              }),
            o.apply(this, arguments)
          );
        };
        function s(t, e) {
          var r = {};
          for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e.indexOf(n) < 0 && (r[n] = t[n]);
          if (null != t && 'function' == typeof Object.getOwnPropertySymbols) {
            var i = 0;
            for (n = Object.getOwnPropertySymbols(t); i < n.length; i++)
              e.indexOf(n[i]) < 0 && Object.prototype.propertyIsEnumerable.call(t, n[i]) && (r[n[i]] = t[n[i]]);
          }
          return r;
        }
        function a(t, e, r, n) {
          var i,
            o = arguments.length,
            s = o < 3 ? e : null === n ? (n = Object.getOwnPropertyDescriptor(e, r)) : n;
          if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) s = Reflect.decorate(t, e, r, n);
          else
            for (var a = t.length - 1; a >= 0; a--)
              (i = t[a]) && (s = (o < 3 ? i(s) : o > 3 ? i(e, r, s) : i(e, r)) || s);
          return o > 3 && s && Object.defineProperty(e, r, s), s;
        }
        function u(t, e) {
          return function (r, n) {
            e(r, n, t);
          };
        }
        function c(t, e) {
          if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata) return Reflect.metadata(t, e);
        }
        function l(t, e, r, n) {
          return new (r || (r = Promise))(function (i, o) {
            function s(t) {
              try {
                u(n.next(t));
              } catch (t) {
                o(t);
              }
            }
            function a(t) {
              try {
                u(n.throw(t));
              } catch (t) {
                o(t);
              }
            }
            function u(t) {
              var e;
              t.done
                ? i(t.value)
                : ((e = t.value),
                  e instanceof r
                    ? e
                    : new r(function (t) {
                        t(e);
                      })).then(s, a);
            }
            u((n = n.apply(t, e || [])).next());
          });
        }
        function h(t, e) {
          var r,
            n,
            i,
            o,
            s = {
              label: 0,
              sent: function () {
                if (1 & i[0]) throw i[1];
                return i[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (o = { next: a(0), throw: a(1), return: a(2) }),
            'function' == typeof Symbol &&
              (o[Symbol.iterator] = function () {
                return this;
              }),
            o
          );
          function a(o) {
            return function (a) {
              return (function (o) {
                if (r) throw new TypeError('Generator is already executing.');
                for (; s; )
                  try {
                    if (
                      ((r = 1),
                      n &&
                        (i = 2 & o[0] ? n.return : o[0] ? n.throw || ((i = n.return) && i.call(n), 0) : n.next) &&
                        !(i = i.call(n, o[1])).done)
                    )
                      return i;
                    switch (((n = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                      case 0:
                      case 1:
                        i = o;
                        break;
                      case 4:
                        return s.label++, { value: o[1], done: !1 };
                      case 5:
                        s.label++, (n = o[1]), (o = [0]);
                        continue;
                      case 7:
                        (o = s.ops.pop()), s.trys.pop();
                        continue;
                      default:
                        if (!((i = (i = s.trys).length > 0 && i[i.length - 1]) || (6 !== o[0] && 2 !== o[0]))) {
                          s = 0;
                          continue;
                        }
                        if (3 === o[0] && (!i || (o[1] > i[0] && o[1] < i[3]))) {
                          s.label = o[1];
                          break;
                        }
                        if (6 === o[0] && s.label < i[1]) {
                          (s.label = i[1]), (i = o);
                          break;
                        }
                        if (i && s.label < i[2]) {
                          (s.label = i[2]), s.ops.push(o);
                          break;
                        }
                        i[2] && s.ops.pop(), s.trys.pop();
                        continue;
                    }
                    o = e.call(t, s);
                  } catch (t) {
                    (o = [6, t]), (n = 0);
                  } finally {
                    r = i = 0;
                  }
                if (5 & o[0]) throw o[1];
                return { value: o[0] ? o[1] : void 0, done: !0 };
              })([o, a]);
            };
          }
        }
        var f = Object.create
          ? function (t, e, r, n) {
              void 0 === n && (n = r);
              var i = Object.getOwnPropertyDescriptor(e, r);
              (i && !('get' in i ? !e.__esModule : i.writable || i.configurable)) ||
                (i = {
                  enumerable: !0,
                  get: function () {
                    return e[r];
                  },
                }),
                Object.defineProperty(t, n, i);
            }
          : function (t, e, r, n) {
              void 0 === n && (n = r), (t[n] = e[r]);
            };
        function d(t, e) {
          for (var r in t) 'default' === r || Object.prototype.hasOwnProperty.call(e, r) || f(e, t, r);
        }
        function p(t) {
          var e = 'function' == typeof Symbol && Symbol.iterator,
            r = e && t[e],
            n = 0;
          if (r) return r.call(t);
          if (t && 'number' == typeof t.length)
            return {
              next: function () {
                return t && n >= t.length && (t = void 0), { value: t && t[n++], done: !t };
              },
            };
          throw new TypeError(e ? 'Object is not iterable.' : 'Symbol.iterator is not defined.');
        }
        function y(t, e) {
          var r = 'function' == typeof Symbol && t[Symbol.iterator];
          if (!r) return t;
          var n,
            i,
            o = r.call(t),
            s = [];
          try {
            for (; (void 0 === e || e-- > 0) && !(n = o.next()).done; ) s.push(n.value);
          } catch (t) {
            i = { error: t };
          } finally {
            try {
              n && !n.done && (r = o.return) && r.call(o);
            } finally {
              if (i) throw i.error;
            }
          }
          return s;
        }
        function g() {
          for (var t = [], e = 0; e < arguments.length; e++) t = t.concat(y(arguments[e]));
          return t;
        }
        function b() {
          for (var t = 0, e = 0, r = arguments.length; e < r; e++) t += arguments[e].length;
          var n = Array(t),
            i = 0;
          for (e = 0; e < r; e++) for (var o = arguments[e], s = 0, a = o.length; s < a; s++, i++) n[i] = o[s];
          return n;
        }
        function m(t, e, r) {
          if (r || 2 === arguments.length)
            for (var n, i = 0, o = e.length; i < o; i++)
              (!n && i in e) || (n || (n = Array.prototype.slice.call(e, 0, i)), (n[i] = e[i]));
          return t.concat(n || Array.prototype.slice.call(e));
        }
        function v(t) {
          return this instanceof v ? ((this.v = t), this) : new v(t);
        }
        function w(t, e, r) {
          if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.');
          var n,
            i = r.apply(t, e || []),
            o = [];
          return (
            (n = {}),
            s('next'),
            s('throw'),
            s('return'),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n
          );
          function s(t) {
            i[t] &&
              (n[t] = function (e) {
                return new Promise(function (r, n) {
                  o.push([t, e, r, n]) > 1 || a(t, e);
                });
              });
          }
          function a(t, e) {
            try {
              (r = i[t](e)).value instanceof v ? Promise.resolve(r.value.v).then(u, c) : l(o[0][2], r);
            } catch (t) {
              l(o[0][3], t);
            }
            var r;
          }
          function u(t) {
            a('next', t);
          }
          function c(t) {
            a('throw', t);
          }
          function l(t, e) {
            t(e), o.shift(), o.length && a(o[0][0], o[0][1]);
          }
        }
        function _(t) {
          var e, r;
          return (
            (e = {}),
            n('next'),
            n('throw', function (t) {
              throw t;
            }),
            n('return'),
            (e[Symbol.iterator] = function () {
              return this;
            }),
            e
          );
          function n(n, i) {
            e[n] = t[n]
              ? function (e) {
                  return (r = !r) ? { value: v(t[n](e)), done: 'return' === n } : i ? i(e) : e;
                }
              : i;
          }
        }
        function S(t) {
          if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.');
          var e,
            r = t[Symbol.asyncIterator];
          return r
            ? r.call(t)
            : ((t = p(t)),
              (e = {}),
              n('next'),
              n('throw'),
              n('return'),
              (e[Symbol.asyncIterator] = function () {
                return this;
              }),
              e);
          function n(r) {
            e[r] =
              t[r] &&
              function (e) {
                return new Promise(function (n, i) {
                  !(function (t, e, r, n) {
                    Promise.resolve(n).then(function (e) {
                      t({ value: e, done: r });
                    }, e);
                  })(n, i, (e = t[r](e)).done, e.value);
                });
              };
          }
        }
        function E(t, e) {
          return Object.defineProperty ? Object.defineProperty(t, 'raw', { value: e }) : (t.raw = e), t;
        }
        var x = Object.create
          ? function (t, e) {
              Object.defineProperty(t, 'default', { enumerable: !0, value: e });
            }
          : function (t, e) {
              t.default = e;
            };
        function M(t) {
          if (t && t.__esModule) return t;
          var e = {};
          if (null != t) for (var r in t) 'default' !== r && Object.prototype.hasOwnProperty.call(t, r) && f(e, t, r);
          return x(e, t), e;
        }
        function k(t) {
          return t && t.__esModule ? t : { default: t };
        }
        function A(t, e, r, n) {
          if ('a' === r && !n) throw new TypeError('Private accessor was defined without a getter');
          if ('function' == typeof e ? t !== e || !n : !e.has(t))
            throw new TypeError('Cannot read private member from an object whose class did not declare it');
          return 'm' === r ? n : 'a' === r ? n.call(t) : n ? n.value : e.get(t);
        }
        function C(t, e, r, n, i) {
          if ('m' === n) throw new TypeError('Private method is not writable');
          if ('a' === n && !i) throw new TypeError('Private accessor was defined without a setter');
          if ('function' == typeof e ? t !== e || !i : !e.has(t))
            throw new TypeError('Cannot write private member to an object whose class did not declare it');
          return 'a' === n ? i.call(t, r) : i ? (i.value = r) : e.set(t, r), r;
        }
        function R(t, e) {
          if (null === e || ('object' != typeof e && 'function' != typeof e))
            throw new TypeError("Cannot use 'in' operator on non-object");
          return 'function' == typeof t ? e === t : t.has(e);
        }
      },
      4927: (t, e, r) => {
        function n(t) {
          try {
            if (!r.g.localStorage) return !1;
          } catch (t) {
            return !1;
          }
          var e = r.g.localStorage[t];
          return null != e && 'true' === String(e).toLowerCase();
        }
        t.exports = function (t, e) {
          if (n('noDeprecation')) return t;
          var r = !1;
          return function () {
            if (!r) {
              if (n('throwDeprecation')) throw new Error(e);
              n('traceDeprecation') ? console.trace(e) : console.warn(e), (r = !0);
            }
            return t.apply(this, arguments);
          };
        };
      },
      384: (t) => {
        t.exports = function (t) {
          return (
            t &&
            'object' == typeof t &&
            'function' == typeof t.copy &&
            'function' == typeof t.fill &&
            'function' == typeof t.readUInt8
          );
        };
      },
      5955: (t, e, r) => {
        'use strict';
        var n = r(2584),
          i = r(8662),
          o = r(6430),
          s = r(5692);
        function a(t) {
          return t.call.bind(t);
        }
        var u = 'undefined' != typeof BigInt,
          c = 'undefined' != typeof Symbol,
          l = a(Object.prototype.toString),
          h = a(Number.prototype.valueOf),
          f = a(String.prototype.valueOf),
          d = a(Boolean.prototype.valueOf);
        if (u) var p = a(BigInt.prototype.valueOf);
        if (c) var y = a(Symbol.prototype.valueOf);
        function g(t, e) {
          if ('object' != typeof t) return !1;
          try {
            return e(t), !0;
          } catch (t) {
            return !1;
          }
        }
        function b(t) {
          return '[object Map]' === l(t);
        }
        function m(t) {
          return '[object Set]' === l(t);
        }
        function v(t) {
          return '[object WeakMap]' === l(t);
        }
        function w(t) {
          return '[object WeakSet]' === l(t);
        }
        function _(t) {
          return '[object ArrayBuffer]' === l(t);
        }
        function S(t) {
          return 'undefined' != typeof ArrayBuffer && (_.working ? _(t) : t instanceof ArrayBuffer);
        }
        function E(t) {
          return '[object DataView]' === l(t);
        }
        function x(t) {
          return 'undefined' != typeof DataView && (E.working ? E(t) : t instanceof DataView);
        }
        (e.isArgumentsObject = n),
          (e.isGeneratorFunction = i),
          (e.isTypedArray = s),
          (e.isPromise = function (t) {
            return (
              ('undefined' != typeof Promise && t instanceof Promise) ||
              (null !== t && 'object' == typeof t && 'function' == typeof t.then && 'function' == typeof t.catch)
            );
          }),
          (e.isArrayBufferView = function (t) {
            return 'undefined' != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(t) : s(t) || x(t);
          }),
          (e.isUint8Array = function (t) {
            return 'Uint8Array' === o(t);
          }),
          (e.isUint8ClampedArray = function (t) {
            return 'Uint8ClampedArray' === o(t);
          }),
          (e.isUint16Array = function (t) {
            return 'Uint16Array' === o(t);
          }),
          (e.isUint32Array = function (t) {
            return 'Uint32Array' === o(t);
          }),
          (e.isInt8Array = function (t) {
            return 'Int8Array' === o(t);
          }),
          (e.isInt16Array = function (t) {
            return 'Int16Array' === o(t);
          }),
          (e.isInt32Array = function (t) {
            return 'Int32Array' === o(t);
          }),
          (e.isFloat32Array = function (t) {
            return 'Float32Array' === o(t);
          }),
          (e.isFloat64Array = function (t) {
            return 'Float64Array' === o(t);
          }),
          (e.isBigInt64Array = function (t) {
            return 'BigInt64Array' === o(t);
          }),
          (e.isBigUint64Array = function (t) {
            return 'BigUint64Array' === o(t);
          }),
          (b.working = 'undefined' != typeof Map && b(new Map())),
          (e.isMap = function (t) {
            return 'undefined' != typeof Map && (b.working ? b(t) : t instanceof Map);
          }),
          (m.working = 'undefined' != typeof Set && m(new Set())),
          (e.isSet = function (t) {
            return 'undefined' != typeof Set && (m.working ? m(t) : t instanceof Set);
          }),
          (v.working = 'undefined' != typeof WeakMap && v(new WeakMap())),
          (e.isWeakMap = function (t) {
            return 'undefined' != typeof WeakMap && (v.working ? v(t) : t instanceof WeakMap);
          }),
          (w.working = 'undefined' != typeof WeakSet && w(new WeakSet())),
          (e.isWeakSet = function (t) {
            return w(t);
          }),
          (_.working = 'undefined' != typeof ArrayBuffer && _(new ArrayBuffer())),
          (e.isArrayBuffer = S),
          (E.working =
            'undefined' != typeof ArrayBuffer &&
            'undefined' != typeof DataView &&
            E(new DataView(new ArrayBuffer(1), 0, 1))),
          (e.isDataView = x);
        var M = 'undefined' != typeof SharedArrayBuffer ? SharedArrayBuffer : void 0;
        function k(t) {
          return '[object SharedArrayBuffer]' === l(t);
        }
        function A(t) {
          return void 0 !== M && (void 0 === k.working && (k.working = k(new M())), k.working ? k(t) : t instanceof M);
        }
        function C(t) {
          return g(t, h);
        }
        function R(t) {
          return g(t, f);
        }
        function I(t) {
          return g(t, d);
        }
        function T(t) {
          return u && g(t, p);
        }
        function O(t) {
          return c && g(t, y);
        }
        (e.isSharedArrayBuffer = A),
          (e.isAsyncFunction = function (t) {
            return '[object AsyncFunction]' === l(t);
          }),
          (e.isMapIterator = function (t) {
            return '[object Map Iterator]' === l(t);
          }),
          (e.isSetIterator = function (t) {
            return '[object Set Iterator]' === l(t);
          }),
          (e.isGeneratorObject = function (t) {
            return '[object Generator]' === l(t);
          }),
          (e.isWebAssemblyCompiledModule = function (t) {
            return '[object WebAssembly.Module]' === l(t);
          }),
          (e.isNumberObject = C),
          (e.isStringObject = R),
          (e.isBooleanObject = I),
          (e.isBigIntObject = T),
          (e.isSymbolObject = O),
          (e.isBoxedPrimitive = function (t) {
            return C(t) || R(t) || I(t) || T(t) || O(t);
          }),
          (e.isAnyArrayBuffer = function (t) {
            return 'undefined' != typeof Uint8Array && (S(t) || A(t));
          }),
          ['isProxy', 'isExternal', 'isModuleNamespaceObject'].forEach(function (t) {
            Object.defineProperty(e, t, {
              enumerable: !1,
              value: function () {
                throw new Error(t + ' is not supported in userland');
              },
            });
          });
      },
      9539: (t, e, r) => {
        var n =
            Object.getOwnPropertyDescriptors ||
            function (t) {
              for (var e = Object.keys(t), r = {}, n = 0; n < e.length; n++)
                r[e[n]] = Object.getOwnPropertyDescriptor(t, e[n]);
              return r;
            },
          i = /%[sdj%]/g;
        (e.format = function (t) {
          if (!m(t)) {
            for (var e = [], r = 0; r < arguments.length; r++) e.push(u(arguments[r]));
            return e.join(' ');
          }
          r = 1;
          for (
            var n = arguments,
              o = n.length,
              s = String(t).replace(i, function (t) {
                if ('%%' === t) return '%';
                if (r >= o) return t;
                switch (t) {
                  case '%s':
                    return String(n[r++]);
                  case '%d':
                    return Number(n[r++]);
                  case '%j':
                    try {
                      return JSON.stringify(n[r++]);
                    } catch (t) {
                      return '[Circular]';
                    }
                  default:
                    return t;
                }
              }),
              a = n[r];
            r < o;
            a = n[++r]
          )
            g(a) || !_(a) ? (s += ' ' + a) : (s += ' ' + u(a));
          return s;
        }),
          (e.deprecate = function (t, r) {
            if ('undefined' != typeof process && !0 === process.noDeprecation) return t;
            if ('undefined' == typeof process)
              return function () {
                return e.deprecate(t, r).apply(this, arguments);
              };
            var n = !1;
            return function () {
              if (!n) {
                if (process.throwDeprecation) throw new Error(r);
                process.traceDeprecation ? console.trace(r) : console.error(r), (n = !0);
              }
              return t.apply(this, arguments);
            };
          });
        var o = {},
          s = /^$/;
        if ({ NODE_ENV: 'production', WALLETLINK_URL: void 0, WALLETLINK_VERSION: '3.3.0' }.NODE_DEBUG) {
          var a = { NODE_ENV: 'production', WALLETLINK_URL: void 0, WALLETLINK_VERSION: '3.3.0' }.NODE_DEBUG;
          (a = a
            .replace(/[|\\{}()[\]^$+?.]/g, '\\$&')
            .replace(/\*/g, '.*')
            .replace(/,/g, '$|^')
            .toUpperCase()),
            (s = new RegExp('^' + a + '$', 'i'));
        }
        function u(t, r) {
          var n = { seen: [], stylize: l };
          return (
            arguments.length >= 3 && (n.depth = arguments[2]),
            arguments.length >= 4 && (n.colors = arguments[3]),
            y(r) ? (n.showHidden = r) : r && e._extend(n, r),
            v(n.showHidden) && (n.showHidden = !1),
            v(n.depth) && (n.depth = 2),
            v(n.colors) && (n.colors = !1),
            v(n.customInspect) && (n.customInspect = !0),
            n.colors && (n.stylize = c),
            h(n, t, n.depth)
          );
        }
        function c(t, e) {
          var r = u.styles[e];
          return r ? '[' + u.colors[r][0] + 'm' + t + '[' + u.colors[r][1] + 'm' : t;
        }
        function l(t, e) {
          return t;
        }
        function h(t, r, n) {
          if (
            t.customInspect &&
            r &&
            x(r.inspect) &&
            r.inspect !== e.inspect &&
            (!r.constructor || r.constructor.prototype !== r)
          ) {
            var i = r.inspect(n, t);
            return m(i) || (i = h(t, i, n)), i;
          }
          var o = (function (t, e) {
            if (v(e)) return t.stylize('undefined', 'undefined');
            if (m(e)) {
              var r = "'" + JSON.stringify(e).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
              return t.stylize(r, 'string');
            }
            return b(e)
              ? t.stylize('' + e, 'number')
              : y(e)
                ? t.stylize('' + e, 'boolean')
                : g(e)
                  ? t.stylize('null', 'null')
                  : void 0;
          })(t, r);
          if (o) return o;
          var s = Object.keys(r),
            a = (function (t) {
              var e = {};
              return (
                t.forEach(function (t, r) {
                  e[t] = !0;
                }),
                e
              );
            })(s);
          if (
            (t.showHidden && (s = Object.getOwnPropertyNames(r)),
            E(r) && (s.indexOf('message') >= 0 || s.indexOf('description') >= 0))
          )
            return f(r);
          if (0 === s.length) {
            if (x(r)) {
              var u = r.name ? ': ' + r.name : '';
              return t.stylize('[Function' + u + ']', 'special');
            }
            if (w(r)) return t.stylize(RegExp.prototype.toString.call(r), 'regexp');
            if (S(r)) return t.stylize(Date.prototype.toString.call(r), 'date');
            if (E(r)) return f(r);
          }
          var c,
            l = '',
            _ = !1,
            M = ['{', '}'];
          return (
            p(r) && ((_ = !0), (M = ['[', ']'])),
            x(r) && (l = ' [Function' + (r.name ? ': ' + r.name : '') + ']'),
            w(r) && (l = ' ' + RegExp.prototype.toString.call(r)),
            S(r) && (l = ' ' + Date.prototype.toUTCString.call(r)),
            E(r) && (l = ' ' + f(r)),
            0 !== s.length || (_ && 0 != r.length)
              ? n < 0
                ? w(r)
                  ? t.stylize(RegExp.prototype.toString.call(r), 'regexp')
                  : t.stylize('[Object]', 'special')
                : (t.seen.push(r),
                  (c = _
                    ? (function (t, e, r, n, i) {
                        for (var o = [], s = 0, a = e.length; s < a; ++s)
                          R(e, String(s)) ? o.push(d(t, e, r, n, String(s), !0)) : o.push('');
                        return (
                          i.forEach(function (i) {
                            i.match(/^\d+$/) || o.push(d(t, e, r, n, i, !0));
                          }),
                          o
                        );
                      })(t, r, n, a, s)
                    : s.map(function (e) {
                        return d(t, r, n, a, e, _);
                      })),
                  t.seen.pop(),
                  (function (t, e, r) {
                    return t.reduce(function (t, e) {
                      return e.indexOf('\n'), t + e.replace(/\u001b\[\d\d?m/g, '').length + 1;
                    }, 0) > 60
                      ? r[0] + ('' === e ? '' : e + '\n ') + ' ' + t.join(',\n  ') + ' ' + r[1]
                      : r[0] + e + ' ' + t.join(', ') + ' ' + r[1];
                  })(c, l, M))
              : M[0] + l + M[1]
          );
        }
        function f(t) {
          return '[' + Error.prototype.toString.call(t) + ']';
        }
        function d(t, e, r, n, i, o) {
          var s, a, u;
          if (
            ((u = Object.getOwnPropertyDescriptor(e, i) || { value: e[i] }).get
              ? (a = u.set ? t.stylize('[Getter/Setter]', 'special') : t.stylize('[Getter]', 'special'))
              : u.set && (a = t.stylize('[Setter]', 'special')),
            R(n, i) || (s = '[' + i + ']'),
            a ||
              (t.seen.indexOf(u.value) < 0
                ? (a = g(r) ? h(t, u.value, null) : h(t, u.value, r - 1)).indexOf('\n') > -1 &&
                  (a = o
                    ? a
                        .split('\n')
                        .map(function (t) {
                          return '  ' + t;
                        })
                        .join('\n')
                        .substr(2)
                    : '\n' +
                      a
                        .split('\n')
                        .map(function (t) {
                          return '   ' + t;
                        })
                        .join('\n'))
                : (a = t.stylize('[Circular]', 'special'))),
            v(s))
          ) {
            if (o && i.match(/^\d+$/)) return a;
            (s = JSON.stringify('' + i)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)
              ? ((s = s.substr(1, s.length - 2)), (s = t.stylize(s, 'name')))
              : ((s = s
                  .replace(/'/g, "\\'")
                  .replace(/\\"/g, '"')
                  .replace(/(^"|"$)/g, "'")),
                (s = t.stylize(s, 'string')));
          }
          return s + ': ' + a;
        }
        function p(t) {
          return Array.isArray(t);
        }
        function y(t) {
          return 'boolean' == typeof t;
        }
        function g(t) {
          return null === t;
        }
        function b(t) {
          return 'number' == typeof t;
        }
        function m(t) {
          return 'string' == typeof t;
        }
        function v(t) {
          return void 0 === t;
        }
        function w(t) {
          return _(t) && '[object RegExp]' === M(t);
        }
        function _(t) {
          return 'object' == typeof t && null !== t;
        }
        function S(t) {
          return _(t) && '[object Date]' === M(t);
        }
        function E(t) {
          return _(t) && ('[object Error]' === M(t) || t instanceof Error);
        }
        function x(t) {
          return 'function' == typeof t;
        }
        function M(t) {
          return Object.prototype.toString.call(t);
        }
        function k(t) {
          return t < 10 ? '0' + t.toString(10) : t.toString(10);
        }
        (e.debuglog = function (t) {
          if (((t = t.toUpperCase()), !o[t]))
            if (s.test(t)) {
              var r = process.pid;
              o[t] = function () {
                var n = e.format.apply(e, arguments);
                console.error('%s %d: %s', t, r, n);
              };
            } else o[t] = function () {};
          return o[t];
        }),
          (e.inspect = u),
          (u.colors = {
            bold: [1, 22],
            italic: [3, 23],
            underline: [4, 24],
            inverse: [7, 27],
            white: [37, 39],
            grey: [90, 39],
            black: [30, 39],
            blue: [34, 39],
            cyan: [36, 39],
            green: [32, 39],
            magenta: [35, 39],
            red: [31, 39],
            yellow: [33, 39],
          }),
          (u.styles = {
            special: 'cyan',
            number: 'yellow',
            boolean: 'yellow',
            undefined: 'grey',
            null: 'bold',
            string: 'green',
            date: 'magenta',
            regexp: 'red',
          }),
          (e.types = r(5955)),
          (e.isArray = p),
          (e.isBoolean = y),
          (e.isNull = g),
          (e.isNullOrUndefined = function (t) {
            return null == t;
          }),
          (e.isNumber = b),
          (e.isString = m),
          (e.isSymbol = function (t) {
            return 'symbol' == typeof t;
          }),
          (e.isUndefined = v),
          (e.isRegExp = w),
          (e.types.isRegExp = w),
          (e.isObject = _),
          (e.isDate = S),
          (e.types.isDate = S),
          (e.isError = E),
          (e.types.isNativeError = E),
          (e.isFunction = x),
          (e.isPrimitive = function (t) {
            return (
              null === t ||
              'boolean' == typeof t ||
              'number' == typeof t ||
              'string' == typeof t ||
              'symbol' == typeof t ||
              void 0 === t
            );
          }),
          (e.isBuffer = r(384));
        var A = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        function C() {
          var t = new Date(),
            e = [k(t.getHours()), k(t.getMinutes()), k(t.getSeconds())].join(':');
          return [t.getDate(), A[t.getMonth()], e].join(' ');
        }
        function R(t, e) {
          return Object.prototype.hasOwnProperty.call(t, e);
        }
        (e.log = function () {
          console.log('%s - %s', C(), e.format.apply(e, arguments));
        }),
          (e.inherits = r(5717)),
          (e._extend = function (t, e) {
            if (!e || !_(e)) return t;
            for (var r = Object.keys(e), n = r.length; n--; ) t[r[n]] = e[r[n]];
            return t;
          });
        var I = 'undefined' != typeof Symbol ? Symbol('util.promisify.custom') : void 0;
        function T(t, e) {
          if (!t) {
            var r = new Error('Promise was rejected with a falsy value');
            (r.reason = t), (t = r);
          }
          return e(t);
        }
        (e.promisify = function (t) {
          if ('function' != typeof t) throw new TypeError('The "original" argument must be of type Function');
          if (I && t[I]) {
            var e;
            if ('function' != typeof (e = t[I]))
              throw new TypeError('The "util.promisify.custom" argument must be of type Function');
            return Object.defineProperty(e, I, { value: e, enumerable: !1, writable: !1, configurable: !0 }), e;
          }
          function e() {
            for (
              var e,
                r,
                n = new Promise(function (t, n) {
                  (e = t), (r = n);
                }),
                i = [],
                o = 0;
              o < arguments.length;
              o++
            )
              i.push(arguments[o]);
            i.push(function (t, n) {
              t ? r(t) : e(n);
            });
            try {
              t.apply(this, i);
            } catch (t) {
              r(t);
            }
            return n;
          }
          return (
            Object.setPrototypeOf(e, Object.getPrototypeOf(t)),
            I && Object.defineProperty(e, I, { value: e, enumerable: !1, writable: !1, configurable: !0 }),
            Object.defineProperties(e, n(t))
          );
        }),
          (e.promisify.custom = I),
          (e.callbackify = function (t) {
            if ('function' != typeof t) throw new TypeError('The "original" argument must be of type Function');
            function e() {
              for (var e = [], r = 0; r < arguments.length; r++) e.push(arguments[r]);
              var n = e.pop();
              if ('function' != typeof n) throw new TypeError('The last argument must be of type Function');
              var i = this,
                o = function () {
                  return n.apply(i, arguments);
                };
              t.apply(this, e).then(
                function (t) {
                  process.nextTick(o.bind(null, null, t));
                },
                function (t) {
                  process.nextTick(T.bind(null, t, o));
                },
              );
            }
            return Object.setPrototypeOf(e, Object.getPrototypeOf(t)), Object.defineProperties(e, n(t)), e;
          });
      },
      6430: (t, e, r) => {
        'use strict';
        var n = r(4029),
          i = r(3083),
          o = r(1924),
          s = o('Object.prototype.toString'),
          a = r(6410)(),
          u = 'undefined' == typeof globalThis ? r.g : globalThis,
          c = i(),
          l = o('String.prototype.slice'),
          h = {},
          f = r(882),
          d = Object.getPrototypeOf;
        a &&
          f &&
          d &&
          n(c, function (t) {
            if ('function' == typeof u[t]) {
              var e = new u[t]();
              if (Symbol.toStringTag in e) {
                var r = d(e),
                  n = f(r, Symbol.toStringTag);
                if (!n) {
                  var i = d(r);
                  n = f(i, Symbol.toStringTag);
                }
                h[t] = n.get;
              }
            }
          });
        var p = r(5692);
        t.exports = function (t) {
          return (
            !!p(t) &&
            (a && Symbol.toStringTag in t
              ? (function (t) {
                  var e = !1;
                  return (
                    n(h, function (r, n) {
                      if (!e)
                        try {
                          var i = r.call(t);
                          i === n && (e = i);
                        } catch (t) {}
                    }),
                    e
                  );
                })(t)
              : l(s(t), 8, -1))
          );
        };
      },
      7529: (t) => {
        t.exports = function () {
          for (var t = {}, r = 0; r < arguments.length; r++) {
            var n = arguments[r];
            for (var i in n) e.call(n, i) && (t[i] = n[i]);
          }
          return t;
        };
        var e = Object.prototype.hasOwnProperty;
      },
      6601: () => {},
      4654: () => {},
      2361: () => {},
      4616: () => {},
      3083: (t, e, r) => {
        'use strict';
        var n = [
            'BigInt64Array',
            'BigUint64Array',
            'Float32Array',
            'Float64Array',
            'Int16Array',
            'Int32Array',
            'Int8Array',
            'Uint16Array',
            'Uint32Array',
            'Uint8Array',
            'Uint8ClampedArray',
          ],
          i = 'undefined' == typeof globalThis ? r.g : globalThis;
        t.exports = function () {
          for (var t = [], e = 0; e < n.length; e++) 'function' == typeof i[n[e]] && (t[t.length] = n[e]);
          return t;
        };
      },
      882: (t, e, r) => {
        'use strict';
        var n = r(210)('%Object.getOwnPropertyDescriptor%', !0);
        if (n)
          try {
            n([], 'length');
          } catch (t) {
            n = null;
          }
        t.exports = n;
      },
      626: (t) => {
        'use strict';
        t.exports = { i8: '3.3.0' };
      },
    },
    __webpack_module_cache__ = {};
  function __webpack_require__(t) {
    var e = __webpack_module_cache__[t];
    if (void 0 !== e) return e.exports;
    var r = (__webpack_module_cache__[t] = { id: t, loaded: !1, exports: {} });
    return __webpack_modules__[t].call(r.exports, r, r.exports, __webpack_require__), (r.loaded = !0), r.exports;
  }
  (__webpack_require__.amdO = {}),
    (__webpack_require__.d = (t, e) => {
      for (var r in e)
        __webpack_require__.o(e, r) &&
          !__webpack_require__.o(t, r) &&
          Object.defineProperty(t, r, { enumerable: !0, get: e[r] });
    }),
    (__webpack_require__.g = (function () {
      if ('object' == typeof globalThis) return globalThis;
      try {
        return this || new Function('return this')();
      } catch (t) {
        if ('object' == typeof window) return window;
      }
    })()),
    (__webpack_require__.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
    (__webpack_require__.r = (t) => {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(t, '__esModule', { value: !0 });
    }),
    (__webpack_require__.nmd = (t) => ((t.paths = []), t.children || (t.children = []), t));
  var __webpack_exports__ = {};
  (() => {
    'use strict';
    __webpack_require__(5811);
  })();
})();
