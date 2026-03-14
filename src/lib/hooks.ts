import { useSearchParams } from "react-router-dom";

import Config from "@/lib/config";
import { Pagination } from "@/lib/models";

/**
 * Reads `page` and `size` from the URL search params, returns a typed
 * `Pagination` object and a stable `onPageChange` handler that preserves all
 * other query params when the page changes.
 *
 * Also exposes `params` (all current params as a plain object) and the raw
 * `setSearchParams` for custom filter/sort updates.
 */
export function usePagination() {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);
  const { page, size } = params;

  const pagination: Pagination = {
    page: page ? parseInt(page) : 1,
    pageSize: size ? parseInt(size) : Config.PAGE_SIZE,
  };

  const onPageChange = (page: number, pageSize: number) => {
    setSearchParams({ ...params, page: page.toString(), size: pageSize.toString() });
  };

  return { pagination, onPageChange, params, setSearchParams };
}
