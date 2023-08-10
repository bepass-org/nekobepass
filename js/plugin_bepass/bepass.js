import { util } from "../common/util.js";
import { commomClass } from "../common/common.js";
import { TR } from "../common/translate.js";

class bepassClass {
    constructor() {
        this.sharedStorage = {};
        this.defaultSharedStorage = {};
        this.common = new commomClass();
    }

    _initDefaultSharedStorage() {
        // start of default keys
        this.defaultSharedStorage.jsVersion = 1;
        this.defaultSharedStorage.name = "bepass";
        // end of default keys
        this.defaultSharedStorage.tlsHeaderLength = 5;
        this.defaultSharedStorage.remoteDNSAddr = "https://1.1.1.1/dns-query";
        this.defaultSharedStorage.dnsCacheTTL = 30;
        this.defaultSharedStorage.baSniChunksLengthRange = "1, 5";
        this.defaultSharedStorage.sniChunksLengthRange = "1, 5";
        this.defaultSharedStorage.chunksDelayRange = "20, 50";
        this.defaultSharedStorage.allowInsecure = false;
        this.defaultSharedStorage.workerEnabled = false;
        this.defaultSharedStorage.workerDNSOnly = false;
        this.defaultSharedStorage.workerCleanIPAndPort = "104.31.16.104:443";
        this.defaultSharedStorage.workerAddress = "https://example.user.worker.dev/dns-query";

        for (var k in this.defaultSharedStorage) {
            let v = this.defaultSharedStorage[k];
            this.common._setType(k, typeof v);

            if (!this.sharedStorage.hasOwnProperty(k)) {
                this.sharedStorage[k] = v;
            }
        }
    }

    _onSharedStorageUpdated() {
        // not null
        for (var k in this.sharedStorage) {
            if (this.sharedStorage[k] == null) {
                this.sharedStorage[k] = "";
            }
        }
        this._setShareLink();
    }

    _setShareLink() {
        var builder = util.newURL("bepass")
        if (this.sharedStorage.name.isNotBlank()) builder.hash = "#" + encodeURIComponent(this.sharedStorage.name)

        builder.searchParams.set("tlsHeaderLength", this.sharedStorage.tlsHeaderLength)
        builder.searchParams.set("remoteDNSAddr", this.sharedStorage.remoteDNSAddr)
        builder.searchParams.set("sniChunksLengthRange", this.sharedStorage.sniChunksLengthRange)
        builder.searchParams.set("baSniChunksLengthRange", this.sharedStorage.baSniChunksLengthRange)
        builder.searchParams.set("chunksDelayRange", this.sharedStorage.chunksDelayRange)
        builder.searchParams.set("workerAddress", this.sharedStorage.workerAddress)
        builder.searchParams.set("workerCleanIPAndPort", this.sharedStorage.workerCleanIPAndPort)

        if (this.sharedStorage.allowInsecure) {
            builder.searchParams.set("allow_insecure", "1")
        }

        if (this.sharedStorage.workerEnabled) {
            builder.searchParams.set("workerEnabled", "1")
        } else {
            builder.searchParams.set("workerEnabled", "0")
        }

        if (this.sharedStorage.workerDNSOnly) {
            builder.searchParams.set("workerDNSOnly", "1")
        } else {
            builder.searchParams.set("workerDNSOnly", "0")
        }

        if (this.sharedStorage.name.isNotBlank()) {
            builder.searchParams.set("remarks", this.sharedStorage.name)
        }

        this.sharedStorage.shareLink = builder.toString()
    }

    // UI Interface

    requirePreferenceScreenConfig() {
        let sb = [
            {
                title: "TLS Client Hello Split Settings",
                preferences: [
                    {
                        type: "EditTextPreference",
                        key: "remoteDNSAddr",
                        icon: "ic_maps_directions_boat",
                    },
                    {
                        type: "EditTextPreference",
                        key: "tlsHeaderLength",
                        icon: "ic_baseline_layers_24",
                    },
                    {
                        type: "EditTextPreference",
                        key: "sniChunksLengthRange",
                        icon: "ic_action_copyright",
                    },
                    {
                        type: "EditTextPreference",
                        key: "baSniChunksLengthRange",
                        icon: "ic_action_copyright",
                    },
                    {
                        type: "EditTextPreference",
                        key: "chunksDelayRange",
                        icon: "ic_baseline_timelapse_24",
                    },
                    {
                        "type": "SwitchPreference",
                        "key": "allowInsecure",
                        "icon": "ic_notification_enhanced_encryption",
                    },
                    {
                        "type": "SwitchPreference",
                        "key": "workerEnabled",
                        "icon": "ic_hardware_router",
                    },
                ],
            },
            {
                "key": "workerSettingsCategory",
                "preferences": [
                    {
                        "type": "SwitchPreference",
                        "key": "workerDNSOnly",
                        "icon": "ic_hardware_router",
                    },
                    {
                        "type": "EditTextPreference",
                        "key": "workerAddress",
                        "icon": "ic_action_copyright",
                    },
                    {
                        "type": "EditTextPreference",
                        "key": "workerCleanIPAndPort",
                        "icon": "ic_maps_directions_boat",
                    },
                ]
            },
        ];
        this.common._applyTranslateToPreferenceScreenConfig(sb, TR);
        return JSON.stringify(sb);
    }

    setSharedStorage(b64Str) {
        this.sharedStorage = util.decodeB64Str(b64Str);
        this._initDefaultSharedStorage();
    }

    requireSetProfileCache() {
        for (var k in this.defaultSharedStorage) {
            this.common.setKV(k, this.sharedStorage[k]);
        }
    }

    onPreferenceCreated() {
        let this2 = this

        function listenOnPreferenceChangedNow(key) {
            neko.listenOnPreferenceChanged(key)
            this2._onPreferenceChanged(key, this2.sharedStorage[key])
        }

        listenOnPreferenceChangedNow("workerEnabled")
    }

    sharedStorageFromProfileCache() {
        for (var k in this.defaultSharedStorage) {
            this.sharedStorage[k] = this.common.getKV(k);
        }
        this._onSharedStorageUpdated();
        return JSON.stringify(this.sharedStorage);
    }

    // 用户修改 preference 时调用
    onPreferenceChanged(b64Str) {
        let args = util.decodeB64Str(b64Str)
        this._onPreferenceChanged(args.key, args.newValue)
    }

    _onPreferenceChanged(key, newValue) {
        if (key == "wrokerEnabled") {
            if (newValue == true) {
                neko.setPreferenceVisibility("serverSecurityCategory", true)
            } else {
                neko.setPreferenceVisibility("serverSecurityCategory", false)
            }
        }
    }

    // Interface

    parseShareLink(b64Str) {
        let args = util.decodeB64Str(b64Str)

        this.sharedStorage = {}
        this._initDefaultSharedStorage()

        var url = util.tryParseURL(args.shareLink)
        if (typeof url == "string") return url // error string

        this.sharedStorage.tlsHeaderLength = builder.searchParams.get("tlsHeaderLength")
        this.sharedStorage.remoteDNSAddr = builder.searchParams.get("remoteDNSAddr")
        this.sharedStorage.sniChunksLengthRange = builder.searchParams.get("sniChunksLengthRange")
        this.sharedStorage.baSniChunksLengthRange = builder.searchParams.get("baSniChunksLengthRange")
        this.sharedStorage.chunksDelayRange = builder.searchParams.get("chunksDelayRange")
        this.sharedStorage.workerAddress = builder.searchParams.get("workerAddress")
        this.sharedStorage.workerCleanIPAndPort = builder.searchParams.get("workerCleanIPAndPort")

        util.ifNotNull(url.searchParams.get("allow_insecure"), (it) => {
            if (it == "1" || it == "true") this.sharedStorage.allowInsecure = true
        })

        util.ifNotNull(url.searchParams.get("workerEnabled"), (it) => {
            if (it == "1" || it == "true") this.sharedStorage.workerEnabled = true
        })

        util.ifNotNull(url.searchParams.get("workerDNSOnly"), (it) => {
            if (it == "1" || it == "true") this.sharedStorage.workerDNSOnly = true
        })

        this._onSharedStorageUpdated()
        return JSON.stringify(this.sharedStorage)
    }

    buildAllConfig(b64Str) {
        try {
            let args = util.decodeB64Str(b64Str);
            let bepass = util.decodeB64Str(args.sharedStorage);

            let configObject = {
                "TLSHeaderLength": util.stringToInt(bepass.tlsHeaderLength),
                "RemoteDNSAddr": bepass.remoteDNSAddr,
                "DnsCacheTTL": 300,
                "BindAddress": "127.0.0.1:" + args.port,
                "ChunksLengthBeforeSni": util.stringToRange(bepass.baSniChunksLengthRange),
                "SniChunksLength": util.stringToRange(bepass.sniChunksLengthRange),
                "ChunksLengthAfterSni": util.stringToRange(bepass.baSniChunksLengthRange),
                "DelayBetweenChunks": util.stringToRange(bepass.chunksDelayRange),
                "WorkerAddress": util.stringToWorkerAddress(bepass.workerAddress),
                "WorkerIPPortAddress": util.stringToWorkerIPPort(bepass.workerCleanIPAndPort),
                "WorkerEnabled": bepass.workerEnabled,
                "WorkerDNSOnly": bepass.workerDNSOnly,
                "EnableLowLevelSockets": true
            };

            let v = {};
            v.nekoCommands = ["%exe%", "-c", "config.json"];
            v.nekoRunConfigs = [
                {
                    name: "config.json",
                    content: JSON.stringify(configObject),
                },
            ];
            return JSON.stringify(v);
        } catch (error) {
            neko.logError(error.toString());
        }
    }
}

export const bepass = new bepassClass();
