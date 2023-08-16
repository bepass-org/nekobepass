import { Base64 } from 'js-base64'

//fuck Chrome, force use core-js URL
const configurator = require('core-js/configurator');
configurator({
    usePolyfill: ['URL'], // polyfills will be used anyway
});
require('core-js/actual/url')

class utilClass {
    newURL(protocol) {
        return new URL(protocol + "://localhost/")
    }

    tryParseURL(str) {
        try {
            return new URL(str)
        } catch (error) {
            return error.toString()
        }
    }

    isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }

    isNotBlank(str) {
        return !this.isBlank(str);
    }

    isIpv6(str) {
        const regexExp = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/gi;
        return regexExp.test(str);
    }

    wrapUri(addr, port) {
        if (this.isIpv6(addr)) {
            return "[" + addr + "]" + ":" + port
        } else {
            return addr + ":" + port
        }
    }

    unwrapIpv6(addr) {
        if (addr.startsWith("[") && addr.endsWith("]")) {
            return addr.replace("[", "").replace("]", "")
        }
        return addr
    }

    addSplash(str) {
        if (str.startsWith("/")) {
            return str
        } else {
            return "/" + str
        }
    }

    ifNotNull(any, callback) {
        if (any != null) callback(any)
    }

    decodeB64Str(b64Str) {
        try {
            let jsonStr = Base64.decode(b64Str)
            return JSON.parse(jsonStr)
        } catch (error) {
            return {}
        }
    }

    encodeB64Str(obj) {
        return Base64.encode(JSON.stringify(obj), true)
    }

    stringToInt(str){
        const e = parseInt(str)
        return isNaN(e) ? 5 : e
    }

    stringToRange(str){
        let first = 1
        let second = 5
        const tmp = str.trim().replace("[", "").replace("]", "")
        if(!tmp.includes(",")){
            const e = parseInt(tmp)
            return isNaN(e) ? [1, 5] : [e, e]
        }
        const tmpFirst = tmp.split(",")[0]
        const e1 = parseInt(tmpFirst)
        first = isNaN(e1) ? 1 : e1

        const tmpSecond = tmp.split(",")[1]
        const e2 = parseInt(tmpSecond)
        second = isNaN(e2) ? 5 : e2

        return [first, second]
    }

    stringToWorkerAddress(str){
        let addr = str;
        if(!addr.startsWith("https://")){
            addr = "https://" + addr
        }
        if(!addr.endsWith("/dns-query")){
            addr = addr + "/dns-query"
        }
        return addr
    }

    stringToWorkerIPPort(str){
        let addr = str;
        if(!addr.includes(":")){
            addr = addr + ":443"
        }
        return addr
    }

    stringToHostsArray(str){
        const hosts = []
        const hostsList = str.trim().split(",")
        if(hostsList){
            for(let i = 0; i < hostsList.length; i++) {
                const sTemp = hostsList[i].split(":")
                if(sTemp.length > 1){
                    hosts.push(
                        {
                            "Domain": sTemp[0],
                            "IP": sTemp[1]
                        }
                    )
                }
            }
        }
        return hosts
    }
}

export const util = new utilClass();
try {
    window.util = util
} catch (error) {

}

// add utils to prototype

Object.prototype.global_export = function (name, f) {
    Object.prototype[name] = f
}

String.prototype.contains = function (s) { return this.indexOf(s) >= 0 }
String.prototype.isBlank = function () { return util.isBlank(this) }
String.prototype.isNotBlank = function () { return util.isNotBlank(this) }
String.prototype.isIpv6 = function () { return util.isIpv6(this) }
String.prototype.substringBefore = function (s) {
    if (!this.contains(s)) return this
    return this.substring(0, this.indexOf(s))
}
String.prototype.substringAfter = function (s) {
    if (!this.contains(s)) return this
    return this.substring(this.indexOf(s) + s.length)
}
String.prototype.toInt = function () { return parseInt(this) }
String.prototype.firstLine = function () { return this.split("\n")[0] }
String.prototype.lines = function () { return this.split("\n") }
