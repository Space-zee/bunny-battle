import { apiPaths } from "@/core/httpClient/apiPaths";
import HttpService from "@/core/httpClient/httpClient.class";
import { useQuery } from "@tanstack/react-query";

export const useGetUserWallet = (telegramUserId: string) => {
  const httpService = new HttpService();

  return useQuery({
    queryKey: ["userWallet", telegramUserId],
    queryFn: () =>
      httpService.get<string>(apiPaths.getUserWallet(), { telegramUserId }),
  });
};
