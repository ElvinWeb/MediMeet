import PropTypes from "prop-types";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#10B981", "#3B82F6", "#EF4444"];

const getAppointmentStatusCounts = (appointments) => {
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

const DoctorAppointmentsStatusPieChart = ({ appointments }) => {
  const chartData = getAppointmentStatusCounts(appointments);

  return (
    <div className="w-2/4 h-2/3 bg-white p-5 rounded-md shadow">
      <h3 className="font-semibold text-lg mb-2">Booking Status Activity</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

DoctorAppointmentsStatusPieChart.propTypes = {
  appointments: PropTypes.array.isRequired,
};

export default DoctorAppointmentsStatusPieChart;
