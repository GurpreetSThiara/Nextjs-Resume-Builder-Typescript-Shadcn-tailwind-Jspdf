export const isValidURL = (url: string) => {
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/i;
    return urlPattern.test(url);
};
