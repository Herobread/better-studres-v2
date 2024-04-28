export function getTimeDifferenceString(
    startDate: Date,
    endDate: Date,
): string {
    if (!isDateValid(startDate) || !isDateValid(endDate)) {
        return ""
    }

    const timeDifference = Math.abs(endDate.getTime() - startDate.getTime())
    const timeDifferenceInSeconds = Math.floor(timeDifference / 1000)

    if (timeDifferenceInSeconds >= 31536000) {
        // 1 year = 31536000 seconds
        const years = Math.floor(timeDifferenceInSeconds / 31536000)
        return `${years} year${years !== 1 ? "s" : ""} ago`
    } else if (timeDifferenceInSeconds >= 2592000) {
        // 1 month = 2592000 seconds
        const months = Math.floor(timeDifferenceInSeconds / 2592000)
        return `${months} month${months !== 1 ? "s" : ""} ago`
    } else if (timeDifferenceInSeconds >= 604800) {
        // 1 week = 604800 seconds
        const weeks = Math.floor(timeDifferenceInSeconds / 604800)
        return `${weeks} week${weeks !== 1 ? "s" : ""} ago`
    } else if (timeDifferenceInSeconds >= 86400) {
        // 1 day = 86400 seconds
        const days = Math.floor(timeDifferenceInSeconds / 86400)
        return `${days} day${days !== 1 ? "s" : ""} ago`
    } else if (timeDifferenceInSeconds >= 3600) {
        // 1 hour = 3600 seconds
        const hours = Math.floor(timeDifferenceInSeconds / 3600)
        return `${hours} hour${hours !== 1 ? "s" : ""} ago`
    } else if (timeDifferenceInSeconds >= 60) {
        // 1 minute = 60 seconds
        const minutes = Math.floor(timeDifferenceInSeconds / 60)
        return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`
    } else {
        return `${timeDifferenceInSeconds} second${
            timeDifferenceInSeconds !== 1 ? "s" : ""
        } ago`
    }
}

export function isDateValid(date: Date) {
    return !isNaN(date.getTime())
}
