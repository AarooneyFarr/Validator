export const capitalize = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
}

export function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}