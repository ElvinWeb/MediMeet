import { MONTHS_SHORT } from "../constants/dateConstants";

export const slotDateFormat = (slotDate) => {
  const dateArray = slotDate.split("_");
  return (
    dateArray[0] + " " + MONTHS_SHORT[Number(dateArray[1])] + " " + dateArray[2]
  );
};
