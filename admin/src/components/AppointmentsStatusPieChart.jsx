import PropTypes from "prop-types";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import {
  getAppointmentStatusCounts,
  renderCustomizedLabel,
} from "../utils/statusUtils.jsx";
import { COLORS } from "../constants/chartConstants.js";

const AppointmentsStatusPieChart = ({ appointments }) => {
  const chartData = getAppointmentStatusCounts(appointments);

  return (
    <div className="w-full sm:w-1/2 bg-white rounded-lg shadow">
      <div className="flex items-center gap-2.5 px-4 py-4 rounded-t border">
        <p className="font-semibold">Booking Status Activity</p>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart margin={{ top: 22 }}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={115}
            fill="#8884d8"
            dataKey="value"
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

AppointmentsStatusPieChart.propTypes = {
  appointments: PropTypes.array.isRequired,
};

export default AppointmentsStatusPieChart;
