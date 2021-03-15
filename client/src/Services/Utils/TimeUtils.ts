export default function RelativeDate(date: string): string {
  let current = Date.now();
  let prev = Date.parse(date);

  // get seconds difference
  var delta = Math.round((current - prev) / 1000);

  var minute = 60,
    hour = minute * 60,
    day = hour * 24,
    week = day * 7;

  if (delta < day) {
    return "Less than one day ago";
  } else if (delta < week) {
    return Math.floor(delta / day) + " days ago";
  } else {
    return Math.floor(delta / week) + " weeks ago";
  }
}
