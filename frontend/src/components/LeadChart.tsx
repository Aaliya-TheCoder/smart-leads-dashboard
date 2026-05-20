import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
} from "recharts";

import type { Lead }
  from "../types/lead";

interface Props {
  leads: Lead[];
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
];

const LeadChart = ({
  leads,
}: Props) => {

  const data = [

    {
      name: "New",

      value:
        leads.filter(
          (lead) =>
            lead.status === "New"
        ).length,
    },

    {
      name: "Contacted",

      value:
        leads.filter(
          (lead) =>
            lead.status ===
            "Contacted"
        ).length,
    },

    {
      name: "Qualified",

      value:
        leads.filter(
          (lead) =>
            lead.status ===
            "Qualified"
        ).length,
    },

    {
      name: "Lost",

      value:
        leads.filter(
          (lead) =>
            lead.status === "Lost"
        ).length,
    },
  ];

  return (

    <div className="bg-white p-5 rounded-lg shadow-lg mb-8">

      <h2 className="text-2xl font-bold mb-4">

        Lead Statistics

      </h2>

      <PieChart
        width={400}
        height={300}
      >

        <Pie
          data={data}

          cx="50%"

          cy="50%"

          outerRadius={100}

          dataKey="value"

          label
        >

          {data.map(
            (_, index) => (

              <Cell
                key={index}

                fill={
                  COLORS[index]
                }
              />
            )
          )}

        </Pie>

        <Tooltip />

      </PieChart>

    </div>
  );
};

export default LeadChart;