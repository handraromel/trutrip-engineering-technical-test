import { format, parseISO } from 'date-fns';

/**
 * Formats an ISO date string to a human-readable format
 * @param isoDate - ISO date string (e.g., "2025-08-09T00:24:15.977Z")
 * @param formatPattern - Optional custom format pattern
 * @returns Formatted date string (e.g., "09 August 2025, 12:02AM")
 */
export const formatDate = (
  isoDate: string,
  formatPattern: string = 'dd MMMM yyyy, h:mmaa',
): string => {
  try {
    const date = parseISO(isoDate);
    return format(date, formatPattern);
  } catch (error) {
    console.error('Error formatting date:', error);
    return isoDate; // Return original string if formatting fails
  }
};

/**
 * Formats an ISO date string to the specific format: "09 August 2025, 12:02PM"
 * @param isoDate - ISO date string
 * @returns Formatted date string
 */
export const formatDateDisplay = (isoDate: string): string => {
  return formatDate(isoDate, 'dd MMMM yyyy, h:mmaa');
};
