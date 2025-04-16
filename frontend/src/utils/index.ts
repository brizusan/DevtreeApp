export const waitSleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const isValidURL = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};
