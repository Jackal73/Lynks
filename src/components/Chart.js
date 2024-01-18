"use client";

import { addDays, differenceInDays, formatISO9075, parseISO } from "date-fns";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Chart({ data }) {
  const xLabelKey = Object.keys(data[0] || {}).find((key) => key !== "date");

  const dataWithoutGaps = [];

  data.forEach((value, index) => {
    const date = value.date;
    dataWithoutGaps.push({
      date,
      [xLabelKey]: value?.[xLabelKey] || 0,
    });
    const nextDate = data?.[index + 1]?.date;

    if (date && nextDate) {
      const daysBetween = differenceInDays(parseISO(nextDate), parseISO(date));

      if (daysBetween > 0) {
        for (let i = 1; i < daysBetween; i++) {
          const dateBetween = formatISO9075(addDays(parseISO(date), i)).split(
            " "
          )[0];
          dataWithoutGaps.push({
            date: dateBetween,
            [xLabelKey]: 0,
          });
        }
      }
    }
  });

  return (
    <div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          width={730}
          height={250}
          data={dataWithoutGaps}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid horizontal={false} strokeWidth="3" stroke="#3b3b3b" />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            tick={{ fill: "#5b5b5b" }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            tick={{ fill: "#5b5b5b" }}
          />
          <Tooltip />

          {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" /> */}
          <Line
            type="monotone"
            dataKey={xLabelKey}
            stroke="#d97706"
            strokeWidth="3"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

{
  /* <AreaChart
width={730}
height={250}
data={data}
margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
>
<defs>
  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
  </linearGradient>
  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
  </linearGradient>
</defs>
<XAxis dataKey="name" />
<YAxis />
<CartesianGrid strokeDasharray="3 3" />
<Tooltip />
<Area
  type="monotone"
  dataKey="uv"
  stroke="#8884d8"
  fillOpacity={1}
  fill="url(#colorUv)"
/>
<Area
  type="monotone"
  dataKey="pv"
  stroke="#82ca9d"
  fillOpacity={1}
  fill="url(#colorPv)"
/>
</AreaChart> */
}
