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
        this.defaultSharedStorage.tlsHeaderLength = "5";
        this.defaultSharedStorage.remoteDNSAddr = "https://yarp.lefolgoc.net/dns-query";
        this.defaultSharedStorage.dnsCacheTTL = "1800";
        this.defaultSharedStorage.dnsRequestTimeout = "10";
        this.defaultSharedStorage.baSniChunksLengthRange = "5, 10";
        this.defaultSharedStorage.sniChunksLengthRange = "1, 5";
        this.defaultSharedStorage.chunksDelayRange = "30, 40";
        this.defaultSharedStorage.allowInsecure = false;
        this.defaultSharedStorage.enableDNSFragmentation = false;
        this.defaultSharedStorage.workerEnabled = false;
        this.defaultSharedStorage.workerDNSOnly = false;
        this.defaultSharedStorage.tlsPaddingEnabled = false;
        this.defaultSharedStorage.tlsPaddingSize = "200, 500";
        this.defaultSharedStorage.workerCleanIPAndPort = "104.31.16.104:443";
        this.defaultSharedStorage.hosts = "example.com:1.2.3.4, yarp.lefolgoc.net:5.39.88.20";
        this.defaultSharedStorage.workerAddress = "https://example.user.worker.dev/dns-query";
        this.defaultSharedStorage.udpBindAddress = "0.0.0.0";
        this.defaultSharedStorage.udpReadTimeout = "120";
        this.defaultSharedStorage.udpWriteTimeout = "120";
        this.defaultSharedStorage.udpLinkIdleTimeout = "120";

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
        builder.searchParams.set("tlsPaddingSize", this.sharedStorage.tlsPaddingSize)
        builder.searchParams.set("chunksDelayRange", this.sharedStorage.chunksDelayRange)
        builder.searchParams.set("workerAddress", this.sharedStorage.workerAddress)
        builder.searchParams.set("workerCleanIPAndPort", this.sharedStorage.workerCleanIPAndPort)
        builder.searchParams.set("hosts", this.sharedStorage.hosts)
        builder.searchParams.set("dnsCacheTTL", this.sharedStorage.dnsCacheTTL)
        builder.searchParams.set("dnsRequestTimeout", this.sharedStorage.dnsRequestTimeout)
        builder.searchParams.set("udpBindAddress", this.sharedStorage.udpBindAddress)
        builder.searchParams.set("udpReadTimeout", this.sharedStorage.udpReadTimeout)
        builder.searchParams.set("udpWriteTimeout", this.sharedStorage.udpWriteTimeout)
        builder.searchParams.set("udpLinkIdleTimeout", this.sharedStorage.udpLinkIdleTimeout)

        if (this.sharedStorage.allowInsecure) {
            builder.searchParams.set("allow_insecure", "1")
        }

        if (this.sharedStorage.workerEnabled) {
            builder.searchParams.set("workerEnabled", "1")
        } else {
            builder.searchParams.set("workerEnabled", "0")
        }

        if (this.sharedStorage.enableDNSFragmentation) {
            builder.searchParams.set("enableDNSFragmentation", "1")
        } else {
            builder.searchParams.set("enableDNSFragmentation", "0")
        }

        if (this.sharedStorage.tlsPaddingEnabled) {
            builder.searchParams.set("tlsPaddingEnabled", "1")
        } else {
            builder.searchParams.set("tlsPaddingEnabled", "0")
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
                        key: "tlsHeaderLength",
                        icon: "ic_baseline_layers_24",
                    },
                    {
                        type: "EditTextPreference",
                        key: "remoteDNSAddr",
                        icon: "ic_maps_directions_boat",
                    },
                    {
                        type: "EditTextPreference",
                        key: "dnsCacheTTL",
                        icon: "ic_baseline_refresh_24",
                    },
                    {
                        type: "EditTextPreference",
                        key: "dnsRequestTimeout",
                        icon: "ic_service_busy",
                    },
                    {
                        "type": "SwitchPreference",
                        "key": "enableDNSFragmentation",
                        "icon": "ic_baseline_view_list_24",
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
                        type: "EditTextPreference",
                        key: "hosts",
                        icon: "baseline_wrap_text_24",
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
                    {
                        "type": "SwitchPreference",
                        "key": "tlsPaddingEnabled",
                        "icon": "ic_baseline_fingerprint_24",
                    },
                    {
                        "type": "EditTextPreference",
                        "key": "tlsPaddingSize",
                        "icon": "ic_file_cloud_queue",
                    },
                ],
            },
            {
                "key": "udpSettings",
                "preferences": [
                    {
                        "type": "EditTextPreference",
                        "key": "udpBindAddress",
                        "icon": "ic_hardware_router",
                    },
                    {
                        "type": "EditTextPreference",
                        "key": "udpReadTimeout",
                        "icon": "ic_baseline_timelapse_24",
                    },
                    {
                        "type": "EditTextPreference",
                        "key": "udpWriteTimeout",
                        "icon": "ic_baseline_timelapse_24",
                    },
                    {
                        "type": "EditTextPreference",
                        "key": "udpLinkIdleTimeout",
                        "icon": "ic_baseline_timelapse_24",
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
        listenOnPreferenceChangedNow("tlsPaddingEnabled")
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
        if (key == "workerEnabled") {
            if (newValue == true) {
                neko.setPreferenceVisibility("workerDNSOnly", true)
                neko.setPreferenceVisibility("workerAddress", true)
                neko.setPreferenceVisibility("workerCleanIPAndPort", true)
            } else {
                neko.setPreferenceVisibility("workerDNSOnly", false)
                neko.setPreferenceVisibility("workerAddress", false)
                neko.setPreferenceVisibility("workerCleanIPAndPort", false)
            }
        }
        if (key == "tlsPaddingEnabled") {
            if (newValue == true) {
                neko.setPreferenceVisibility("tlsPaddingSize", true)
            } else {
                neko.setPreferenceVisibility("tlsPaddingSize", false)
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
        this.sharedStorage.tlsPaddingSize = builder.searchParams.get("tlsPaddingSize")
        this.sharedStorage.dnsCacheTTL = builder.searchParams.get("dnsCacheTTL")
        this.sharedStorage.dnsRequestTimeout = builder.searchParams.get("dnsRequestTimeout")
        this.sharedStorage.hosts = builder.searchParams.get("hosts")
        this.sharedStorage.udpBindAddress = builder.searchParams.get("udpBindAddress")
        this.sharedStorage.udpReadTimeout = builder.searchParams.get("udpReadTimeout")
        this.sharedStorage.udpWriteTimeout = builder.searchParams.get("udpWriteTimeout")
        this.sharedStorage.udpLinkIdleTimeout = builder.searchParams.get("udpLinkIdleTimeout")

        util.ifNotNull(url.searchParams.get("allow_insecure"), (it) => {
            if (it == "1" || it == "true") this.sharedStorage.allowInsecure = true
        })

        util.ifNotNull(url.searchParams.get("workerEnabled"), (it) => {
            if (it == "1" || it == "true") this.sharedStorage.workerEnabled = true
        })

        util.ifNotNull(url.searchParams.get("enableDNSFragmentation"), (it) => {
            if (it == "1" || it == "true") this.sharedStorage.enableDNSFragmentation = true
        })

        util.ifNotNull(url.searchParams.get("tlsPaddingEnabled"), (it) => {
            if (it == "1" || it == "true") this.sharedStorage.tlsPaddingEnabled = true
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
                "TLSPaddingEnabled": bepass.tlsPaddingEnabled,
                "TLSPaddingSize": util.stringToRange(bepass.tlsPaddingSize),
                "RemoteDNSAddr": bepass.remoteDNSAddr,
                "EnableDNSFragmentation": bepass.enableDNSFragmentation,
                "DnsCacheTTL": util.stringToInt(bepass.dnsCacheTTL),
                "DnsRequestTimeout": util.stringToInt(bepass.dnsRequestTimeout),
                "BindAddress": "127.0.0.1:" + args.port,
                "ChunksLengthBeforeSni": util.stringToRange(bepass.baSniChunksLengthRange),
                "SniChunksLength": util.stringToRange(bepass.sniChunksLengthRange),
                "ChunksLengthAfterSni": util.stringToRange(bepass.baSniChunksLengthRange),
                "DelayBetweenChunks": util.stringToRange(bepass.chunksDelayRange),
                "WorkerAddress": util.stringToWorkerAddress(bepass.workerAddress),
                "WorkerIPPortAddress": util.stringToWorkerIPPort(bepass.workerCleanIPAndPort),
                "WorkerEnabled": bepass.workerEnabled,
                "WorkerDNSOnly": bepass.workerDNSOnly,
                "EnableLowLevelSockets": true,
                "Hosts": util.stringToHostsArray(bepass.hosts),
                "UDPBindAddress": bepass.udpBindAddress,
                "UDPReadTimeout": util.stringToInt(bepass.udpReadTimeout),
                "UDPWriteTimeout": util.stringToInt(bepass.udpWriteTimeout),
                "udpLinkIdleTimeout": util.stringToInt(bepass.udpLinkIdleTimeout)
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
