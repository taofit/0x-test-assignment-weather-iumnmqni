export const formatHour = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        hour12: true,
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