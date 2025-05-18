export const COLORS = ["#10B981", "#3B82F6", "#EF4444"];

export const getAppointmentStatusCounts = (appointments) => {
  let cancelled = 0;
  let completed = 0;
  let paid = 0;

  appointments.forEach((item) => {
    if (item.cancelled) cancelled++;
    if (item.isCompleted) completed++;
    if (item.payment) paid++;
  });

  return [
    { name: "Cancelled", value: cancelled },
    { name: "Completed", value: completed },
    { name: "Paid", value: paid },
  ];
};
