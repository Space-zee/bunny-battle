export const formatAddress = (address: string) => {
  return (
    address.slice(0, 4) +
    "..." +
    address.slice(address.length - 5, address.length)
  );
};

export const formatEthBalance = (amount: string) => {
  const dotIndex = amount.indexOf(".");
  return amount.slice(0, dotIndex + 4);
};
