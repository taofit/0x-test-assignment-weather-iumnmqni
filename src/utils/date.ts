export const formatHour = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        hour12: true,
    }
    if (new Date(date).getDate() === new Date().getDate() && new Date(date).getHours() === new Date().getHours()) {
        return 'Now';
    }
    return new Date(date).toLocaleString('en-US', options)
}

export const formatWeekday = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
    }
    if (new Date(date).getDate() === new Date().getDate()) {
        return 'Today';
    }
    return new Date(date).toLocaleString('en-US', options)
}