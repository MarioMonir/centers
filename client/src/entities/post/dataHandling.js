export const dateHandling = (createdAt) => {
  createdAt = new Date(createdAt);
  const now = new Date();
  let difference = (now - new Date(createdAt)) / (1000 * 60);
  if (difference > 60) {
    difference = difference / 60;
    if (difference > 24) {
      difference = difference / 24;
      if (difference > 7) {
        const day = createdAt.getDay();
        const month = createdAt.getMonth(); // month (in integer 0-11)
        const year = createdAt.getFullYear(); // year
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        return months[month] + " " + day + ", " + year;
      } else {
        return Math.round(difference) + "d";
      }
    } else {
      return Math.round(difference) + "h";
    }
  } else {
    return Math.round(difference) + "m";
  }
};

// ------------------------------------------------

export const numberHandling = (number) => {
  if (number > 999) {
    return Math.round(number / 100) / 10 + "K";
  } else {
    return number;
  }
};

// ------------------------------------------------
