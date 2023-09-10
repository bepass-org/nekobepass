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
  return "Bepass plugin v1.5.4\n" +
    "Fragmentation support\n" +
    "TLS padding support\n" +
    "Full tcp proxy through cloudflare support\n" +
    "For more info please visit https://github.com/uoosef/nekobepass"
}

// export interface to browser
global_export("nekoInit", nekoInit)
global_export("nekoProtocol", nekoProtocol)
global_export("nekoAbout", nekoAbout)
