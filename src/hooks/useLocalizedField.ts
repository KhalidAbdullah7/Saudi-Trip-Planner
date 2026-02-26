import { useTranslation } from "react-i18next";

/**
 * Returns the correct localized field from an object with *En/*Ar suffixed keys.
 * Usage: const name = useLocalizedField(destination, "name"); // nameEn or nameAr
 */
export function useLocalizedField<T extends Record<string, unknown>>(
  obj: T,
  fieldBase: string
): string {
  const { i18n } = useTranslation();
  const suffix = i18n.language === "ar" ? "Ar" : "En";
  return (obj[`${fieldBase}${suffix}`] as string) || (obj[`${fieldBase}En`] as string) || "";
}
