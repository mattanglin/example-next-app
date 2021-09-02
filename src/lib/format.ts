const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const readableDate = (date: string) => {
  const d = new Date(date);
  const today = new Date();
  const age = today.getTime() - d.getTime();
  const dayDiff = Math.round(age / (1000 * 60 * 60 * 24));
  const hourDiff = Math.round(age / (1000 * 60 * 60));
  const minDiff = Math.round( age / (1000 * 60));

  if (dayDiff > 9) {
    const month = months[d.getMonth()];
    const day = d.getDate();
    const year = d.getFullYear();
    const currentYear = today.getFullYear();

    return year === currentYear ? `${month} ${day}` : `${month} ${day}, ${year}` ;
  }
  if (dayDiff > 1 && dayDiff < 10) return `${dayDiff} days ago`;
  if (hourDiff>= 1) return `${hourDiff} hour${hourDiff > 1 ? 's' : ''} ago`;
  if (minDiff > 2) return `${minDiff} minutes ago`;
  return 'just now';
};

