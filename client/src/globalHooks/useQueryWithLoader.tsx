import { ApolloError } from "@apollo/client";
import { useEffect } from "react";
import { useDelayedLoading } from "./useDelayedLoading";
import { showToast } from "src/utils/toast";
import FullScreenLoader from "src/globalComponents/FullScreenLoader";
import React from "react";

interface BaseQueryResult<TData> {
  data?: TData;
  loading: boolean;
  error?: ApolloError;
  refetch?: () => void;
}

interface UseQueryWithLoaderOptions {
  delayMs?: number;
  onCompleted?: <TData>(data: TData) => void;
  onError?: (error: ApolloError) => void;
}

/**
 * 🪄 通用封裝：讓任何 Apollo codegen hook（例如 useGetJournalsQuery）
 * 都能直接使用 loader 與錯誤提示
 *
 * @example
 * const { data, loader, error } = useQueryWithLoader(useGetJournalsQuery);
 */
export function useQueryWithLoader<TData>(
  useQueryHook: () => BaseQueryResult<TData>,
  options?: UseQueryWithLoaderOptions
) {
  const { data, loading, error, refetch } = useQueryHook();
  const showLoading = useDelayedLoading(loading, options?.delayMs ?? 500);

  useEffect(() => {
    if (error) {
      showToast.error(error.message || "Something went wrong");
      options?.onError?.(error);
    }
  }, [error, options]);

  useEffect(() => {
    if (!loading && data) {
      options?.onCompleted?.(data);
    }
  }, [loading, data, options]);

  return {
    data,
    error,
    refetch,
    loader: showLoading ? <FullScreenLoader /> : undefined,
  };
}
