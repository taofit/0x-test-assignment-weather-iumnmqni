export const getBackgroundClass = (): string => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) {
        return 'morning';
    } else if (hour >= 11 && hour < 17) {
        return 'afternoon';
    } else if (hour >= 17 && hour < 21) {
        return 'evening';
    } else {
        return 'night';
    }
}