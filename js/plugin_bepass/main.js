import { util } from "../common/util.js";
import { LANG, LANG_TR } from "../common/translate.js";

import { bepass } from "./bepass.js";

// Init

export function nekoInit(b64Str) {
  let args = util.decodeB64Str(b64Str);

  LANG = args.lang;

  let plgConfig = {
    ok: true,
    reason: "",
    minVersion: 1,
    protocols: [
      {
        protocolId: "bepass",
        links: ["bepass://"],
        haveStandardLink: false,
        canShare: true,
        canMux: false,
        canMapping: false,
        canTCPing: false,
        canICMPing: false,
        needBypassRootUid: true,
      }
    ],
  };
  return JSON.stringify(plgConfig);
}

export function nekoProtocol(protocolId) {
  if (protocolId == "bepass") {
    return bepass;
  }
}

export function nekoAbout() {
  return "早期测试版本，上游版本 v0.1.2\n" +
    "1 目前不兼容链式代理\n" +
    "2 目前无法使用域名，请使用 IP 地址类型的服务器\n" +
    "这个插件是实验性的。如果在使用过程中遇到任何问题，请自行解决。"
}

// export interface to browser
global_export("nekoInit", nekoInit)
global_export("nekoProtocol", nekoProtocol)
global_export("nekoAbout", nekoAbout)
