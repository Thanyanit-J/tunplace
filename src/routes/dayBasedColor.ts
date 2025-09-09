export function getDayBasedColor(): string {
  const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
  const colors = {
    0: 'red',    // Sunday
    1: 'yellow', // Monday
    2: 'pink',   // Tuesday
    3: 'green',  // Wednesday
    4: 'orange', // Thursday
    5: 'blue',   // Friday
    6: 'purple'  // Saturday
  };
  return colors[today as keyof typeof colors] || 'gray';
}