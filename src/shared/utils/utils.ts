export const parseUsername = (username: string | undefined): string => {
  if (username) {
    const escapedUsername = username.replace(/_/g, '\\_');
    return `@${escapedUsername},`;
  }
  return '';
};
