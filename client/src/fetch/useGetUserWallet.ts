import { apiPaths } from "@/core/httpClient/apiPaths";
import { httpClient } from "@/core/httpClient";
import { useQuery } from "@tanstack/react-query";

export const useGetUserWallet = (telegramUserId: string) => {
  return useQuery({
    queryKey: ["userWallet", telegramUserId],
    queryFn: () =>
      httpClient.get<{ wallet: string; balance: string }>(
        apiPaths.getUserWallet(),
        { telegramUserId }
      ),
    enabled: !!telegramUserId,
  });
};
