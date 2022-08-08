import { hasChanged as hasAliasChanged } from "./alias";

export const hasChanged = (o1, o2) => {
  if (o1?.name !== o2?.name) return true;
  if (o1?.check_date !== o2?.check_date) return true;
  if (o1?.airing_status !== o2?.airing_status) return true;
  if (o1?.single !== o2?.single) return true;
  if (o1?.status !== o2?.status) return true;
  if (o1?.watched_date !== o2?.watched_date) return true;
  if (o1?.year !== o2?.year) return true;
  if (o1?.rating !== o2?.rating) return true;
  if (hasAliasChanged(o1.aliases, o2.aliases)) return true;

  return false;
};
