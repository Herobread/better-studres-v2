/**
 * Returns a special emoji for special days to be displayed on the root page.
 * @returns {string | null} The special day emoji, or null if today is not a special day.
 */
export function getSpecialDayEmoji(): string | null {
    const now = new Date()
    const month = now.getMonth() // 0-11 (Jan-Dec)
    const day = now.getDate()

    // Special days map: [month, day] -> [emoji, description]
    const specialDays: Record<string, [string, string]> = {
        // Christmas
        "11,25": ["🎄", "Merry Christmas!"],
        // Halloween
        "9,31": ["🎃", "Happy Halloween!"],
        // Valentine's Day
        "1,14": ["❤️", "Happy Valentine's Day!"],
        // St. Patrick's Day
        "2,17": ["☘️", "Happy St. Patrick's Day!"],
        // New Year's Day
        "0,1": ["🎆", "Happy New Year!"],
        // April Fools' Day
        "3,1": ["🤡", "April Fools' Day!"],
        // Thanksgiving (4th Thursday of November)
        "10,24": ["🦃", "Happy Thanksgiving!"],
        "10,25": ["🦃", "Happy Thanksgiving!"],
        "10,26": ["🦃", "Happy Thanksgiving!"],
        "10,27": ["🦃", "Happy Thanksgiving!"],
        "10,28": ["🦃", "Happy Thanksgiving!"],
        "10,29": ["🦃", "Happy Thanksgiving!"],
        "10,30": ["🦃", "Happy Thanksgiving!"],
    }

    const key = `${month},${day}`
    return specialDays[key]?.[0] || null
}

/**
 * Returns a special message for special days to be displayed on the root page.
 * @returns {string | null} The special day message, or null if today is not a special day.
 */
export function getSpecialDayMessage(): string | null {
    const now = new Date()
    const month = now.getMonth()
    const day = now.getDate()

    // Special days map: [month, day] -> [emoji, description]
    const specialDays: Record<string, [string, string]> = {
        // Christmas
        "11,25": ["🎄", "Merry Christmas!"],
        // Halloween
        "9,31": ["🎃", "Happy Halloween!"],
        // Valentine's Day
        "1,14": ["❤️", "Happy Valentine's Day!"],
        // St. Patrick's Day
        "2,17": ["☘️", "Happy St. Patrick's Day!"],
        // New Year's Day
        "0,1": ["🎆", "Happy New Year!"],
        // April Fools' Day
        "3,1": ["🤡", "April Fools' Day!"],
        // Thanksgiving (4th Thursday of November)
        "10,24": ["🦃", "Happy Thanksgiving!"],
        "10,25": ["🦃", "Happy Thanksgiving!"],
        "10,26": ["🦃", "Happy Thanksgiving!"],
        "10,27": ["🦃", "Happy Thanksgiving!"],
        "10,28": ["🦃", "Happy Thanksgiving!"],
        "10,29": ["🦃", "Happy Thanksgiving!"],
        "10,30": ["🦃", "Happy Thanksgiving!"],
    }

    const key = `${month},${day}`
    return specialDays[key]?.[1] || null
} 