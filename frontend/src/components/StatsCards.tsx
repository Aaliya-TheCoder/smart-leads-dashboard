import type { Lead }
  from "../types/lead";

interface Props {
  leads: Lead[];
}

const StatsCards = ({
  leads,
}: Props) => {

  const total =
    leads.length;

  const newLeads =
    leads.filter(
      (lead) =>
        lead.status === "New"
    ).length;

  const qualified =
    leads.filter(
      (lead) =>
        lead.status ===
        "Qualified"
    ).length;

  const lost =
    leads.filter(
      (lead) =>
        lead.status === "Lost"
    ).length;

  return (

    <div className="grid grid-cols-4 gap-5 mb-8">

      <div className="bg-white shadow-lg rounded-lg p-5">

        <h2 className="text-gray-500">

          Total Leads

        </h2>

        <p className="text-3xl font-bold">

          {total}

        </p>

      </div>

      <div className="bg-blue-100 shadow-lg rounded-lg p-5">

        <h2 className="text-gray-600">

          New Leads

        </h2>

        <p className="text-3xl font-bold">

          {newLeads}

        </p>

      </div>

      <div className="bg-green-100 shadow-lg rounded-lg p-5">

        <h2 className="text-gray-600">

          Qualified

        </h2>

        <p className="text-3xl font-bold">

          {qualified}

        </p>

      </div>

      <div className="bg-red-100 shadow-lg rounded-lg p-5">

        <h2 className="text-gray-600">

          Lost Leads

        </h2>

        <p className="text-3xl font-bold">

          {lost}

        </p>

      </div>

    </div>
  );
};

export default StatsCards;