const SPECIAL_DAYS: Record<string, [string, string]> = {
    "11,25": ["🎄", "Merry Christmas!"],
    "9,31": ["🎃", "Happy Halloween!"],
    "1,14": ["❤️", "Happy Valentine's Day!"],
    "2,17": ["☘️", "Happy St. Patrick's Day!"],
    "0,1": ["🎆", "Happy New Year!"],
    "3,1": ["🤡", "April Fools' Day!"],
    "10,24": ["🦃", "Happy Thanksgiving!"],
    "10,25": ["🦃", "Happy Thanksgiving!"],
    "10,26": ["🦃", "Happy Thanksgiving!"],
    "10,27": ["🦃", "Happy Thanksgiving!"],
    "10,28": ["🦃", "Happy Thanksgiving!"],
    "10,29": ["🦃", "Happy Thanksgiving!"],
    "10,30": ["🦃", "Happy Thanksgiving!"],
}


function getCurrentDateKey(): string {
    const now = new Date()
    const month = now.getMonth()
    const day = now.getDate()
    return `${month},${day}`
}

/**
 * Returns a special emoji for special days to be displayed on the root page.
 * @returns {string | null} The special day emoji, or null if today is not a special day.
 */
export function getSpecialDayEmoji(): string | null {
    return SPECIAL_DAYS[getCurrentDateKey()]?.[0] || null
}

/**
 * Returns a special message for special days to be displayed on the root page.
 * @returns {string | null} The special day message, or null if today is not a special day.
 */
export function getSpecialDayMessage(): string | null {
    return SPECIAL_DAYS[getCurrentDateKey()]?.[1] || null
} 