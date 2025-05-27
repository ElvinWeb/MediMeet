import PropTypes from "prop-types";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { assets } from "../../assets/assets.js";
import { COLORS } from "../../constants/chartConstants.js";
import {
  getAppointmentStatusCounts,
  renderCustomizedLabel,
} from "../../utils/statusUtils.jsx";

const AppointmentsStatusPieChart = ({ appointments }) => {
  const chartData = getAppointmentStatusCounts(appointments);

  return (
    <div className="w-full sm:w-1/2 bg-white rounded-lg shadow">
      <div className="flex items-center gap-2.5 px-4 py-4 rounded-t border">
        <img
          src={assets.pie_chart_icon}
          alt="calendar image"
          width={20}
          height={20}
        />
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
