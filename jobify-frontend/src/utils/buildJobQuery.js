export const buildJobsQuery = (page, filters) => {
  const params = new URLSearchParams({ page });

  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.append(key, value);
  });

  return `/api/jobs?${params.toString()}`;
};
