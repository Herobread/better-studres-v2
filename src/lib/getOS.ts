import { OperatingSystems } from "@src/types/osTypes"

export function getOS(): OperatingSystems {
    const userAgent = window.navigator.userAgent.toLowerCase()
    const macosPlatforms = /(macintosh|macintel|macppc|mac68k|macos)/i
    const windowsPlatforms = /(win32|win64|windows|wince)/i
    const iosPlatforms = /(iphone|ipad|ipod)/i

    let os: OperatingSystems = "windows"

    if (macosPlatforms.test(userAgent)) {
        os = "macos"
    } else if (iosPlatforms.test(userAgent)) {
        os = "ios"
    } else if (windowsPlatforms.test(userAgent)) {
        os = "windows"
    } else if (/android/.test(userAgent)) {
        os = "android"
    } else if (!os && /linux/.test(userAgent)) {
        os = "linux"
    }

    return os
}
