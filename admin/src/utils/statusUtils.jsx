import { RADIAN } from "../constants/chartConstants";

export const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={15}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

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
