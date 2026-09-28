/** Joins class names, skipping empty values. No merging of conflicting classes. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
