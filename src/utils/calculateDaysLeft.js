export function calculateDaysLeft(endDate) {
  // Get the current date
  const currentDate = new Date();

  // Convert the endDate string to a Date object
  const end = new Date(endDate);

  // Calculate the difference in milliseconds
  const difference = end.getTime() - currentDate.getTime();

  // Convert milliseconds to days
  const daysDifference = Math.ceil(Math.abs(difference) / (1000 * 3600 * 24));

  // // Determine if end date is in the past or the future
  // if (difference < 0) {
  //   // End date is in the past
  //   return `${daysDifference} days have passed since it expired on ${endDate}.`;
  // } else if (difference === 0) {
  //   // End date is today
  //   return `The contract expires today ${endDate}.`;
  // } else {
  //   // End date is in the future
  //   return `${daysDifference} days left until it expires on ${endDate}.`;
  // }

  if (difference < 0) {
    return -1 * daysDifference;
  } else return daysDifference;
}
