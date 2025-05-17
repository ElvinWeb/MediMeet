export const formatSlotDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}_${month}_${year}`;
};

export const isSlotAvailable = (bookedSlots, slotDate, slotTime) => {
  return !(
    bookedSlots &&
    bookedSlots[slotDate] &&
    bookedSlots[slotDate].includes(slotTime)
  );
};

export const generateAvailableSlots = (bookedSlots = {}) => {
  const today = new Date();
  const allSlots = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);

    const endTime = new Date(currentDate);
    endTime.setHours(21, 0, 0, 0);

    if (i === 0) {
      currentDate.setHours(Math.max(currentDate.getHours() + 1, 10));
      currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
    } else {
      currentDate.setHours(10);
      currentDate.setMinutes(0);
    }

    const timeSlots = [];

    while (currentDate < endTime) {
      const slotTime = currentDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const slotDate = formatSlotDate(currentDate);

      if (isSlotAvailable(bookedSlots, slotDate, slotTime)) {
        timeSlots.push({
          datetime: new Date(currentDate),
          time: slotTime,
        });
      }

      currentDate.setMinutes(currentDate.getMinutes() + 30);
    }

    allSlots.push(timeSlots);
  }

  return allSlots;
};
