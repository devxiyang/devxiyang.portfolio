export function formatDate(dateString: string | Date) {
  // If dateString is already a Date object, use it directly
  const date = dateString instanceof Date 
    ? dateString 
    : new Date(dateString);
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    console.warn(`Invalid date: ${dateString}`);
    return 'No date';
  }
  
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
