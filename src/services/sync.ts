import useSWR from "swr";

import { CourseListItem, SyncCourseItem } from "@/lib/models";
import { fetcher, request } from "@/services/request";

export async function syncLessons(courses: SyncCourseItem[]) {
  const resp = await request(`/api/sync-lessons-v2/`, {
    method: "POST",
    data: courses,
  });
  return resp.data;
}

export function useLessons() {
  const { data, error, mutate } = useSWR<CourseListItem[]>(
    "/api/lesson/",
    fetcher
  );
  return {
    courses: data,
    loading: !error && !data,
    isError: error,
    mutate,
  };
}
