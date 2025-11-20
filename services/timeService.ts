
// Helper to parse "9:35am" into minutes from midnight
export const parseTime = (timeStr: string): number => {
  const [time, modifier] = timeStr.toLowerCase().split(/(?=[ap]m)/);
  let [hours, minutes] = time.split(':').map(Number);

  if (modifier === 'pm' && hours !== 12) hours += 12;
  if (modifier === 'am' && hours === 12) hours = 0;

  return hours * 60 + minutes;
};

// Get duration and offset for positioning (assuming 8am start)
export const getTimeBlockStyle = (timeRange: string) => {
  // Format: "9:35am - 10:25am"
  const [startStr, endStr] = timeRange.split(' - ');
  
  const startMins = parseTime(startStr);
  const endMins = parseTime(endStr);
  
  const dayStart = 8 * 60; // 8:00 AM start for calendar
  
  // 1 min = 1.5px height (adjust as needed for scale)
  const scale = 1.3; 
  
  const top = (startMins - dayStart) * scale;
  const height = (endMins - startMins) * scale;

  return { top: `${top}px`, height: `${height}px` };
};

export const parseDays = (dayStr: string): string[] => {
  const days: string[] = [];
  if (dayStr.includes('M')) days.push('Mon');
  if (dayStr.includes('T')) days.push('Tue');
  if (dayStr.includes('W')) days.push('Wed');
  if (dayStr.includes('TH') || dayStr.includes('Th')) days.push('Thu'); // Handle TH
  if (dayStr.includes('F')) days.push('Fri');
  
  // Clean up T vs TH overlap if simplified parsing
  // If string is exactly "TTH", split logic:
  if (dayStr === 'TTH') return ['Tue', 'Thu'];
  if (dayStr === 'MWF') return ['Mon', 'Wed', 'Fri'];
  
  return days;
};
