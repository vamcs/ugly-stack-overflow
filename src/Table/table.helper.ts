import { Question } from "../api/api.helper";

export type ApiProperty = "activity" | "creation";

export type LocalProperty = "question_id" | "is_answered" | "display_name";

export type Property = ApiProperty | LocalProperty;

export type SortDirection = "asc" | "desc";

export type Sort = {
  property: Property;
  direction: SortDirection;
};

export function isApiProperty(property: string): property is ApiProperty {
  return property === "activity" || property === "creation";
}

export function getSortFunction(
  property: LocalProperty,
  direction: SortDirection
) {
  if (property === "display_name") {
    return (a: Question, b: Question) => {
      return sortFunction(
        a.owner?.display_name ?? "",
        b.owner?.display_name ?? "",
        direction
      );
    };
  }

  return (a: Question, b: Question) =>
    sortFunction(a[property], b[property], direction);
}

function sortFunction(
  a: string | number | boolean,
  b: string | number | boolean,
  direction: SortDirection
) {
  if (direction === "asc") {
    return a === b ? 0 : a > b ? 1 : -1;
  }
  return a === b ? 0 : a > b ? -1 : 1;
}
