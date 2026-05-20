import API from "../api/axios";

import toast from "react-hot-toast";

import type { Lead }
  from "../types/lead";

interface Props {

  leads: Lead[];

  fetchLeads: () => void;

  setEditLead:
    (lead: Lead) => void;
}

const LeadTable = ({

  leads,

  fetchLeads,

  setEditLead,

}: Props) => {

  // GET ROLE

  const role =
    localStorage.getItem(
      "role"
    );

  console.log(role);

  // DELETE LEAD

  const deleteLead = async (
    id: string
  ) => {

    try {

      await API.delete(
        `/leads/${id}`
      );

      toast.success(
        "Lead Deleted"
      );

      fetchLeads();

    } catch (error) {

      toast.error(
        "Delete Failed"
      );
    }
  };

  return (

    <table
      className="
        w-full
        bg-white
        bg-white text-black
        shadow-lg
        rounded-lg
        overflow-hidden
      "
    >

      <thead>

        <tr
          className="
            bg-black
            text-white
          "
        >

          <th className="p-3">
            Name
          </th>

          <th>
            Email
          </th>

          <th>
            Status
          </th>

          <th>
            Source
          </th>

          <th>
            Actions
          </th>

        </tr>

      </thead>

      <tbody>

        {leads.map((lead) => (

          <tr
            key={lead._id}

            className="
              border
              text-center
              dark:border-gray-700
            "
          >

            <td className="p-3">
              {lead.name}
            </td>

            <td>
              {lead.email}
            </td>

            <td>
              {lead.status}
            </td>

            <td>
              {lead.source}
            </td>

            <td className="space-x-2">

              {/* EDIT BUTTON */}

              <button
                onClick={() =>
                  setEditLead(
                    lead
                  )
                }

                className="
                  bg-blue-500
                  hover:bg-blue-600
                  text-white
                  px-3
                  py-1
                  rounded
                "
              >

                Edit

              </button>

              {/* DELETE BUTTON */}

              {role === "admin" && (

                <button
                  onClick={() =>
                    deleteLead(
                      lead._id
                    )
                  }

                  className="
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    px-3
                    py-1
                    rounded
                  "
                >

                  Delete

                </button>

              )}

            </td>

          </tr>

        ))}

      </tbody>

    </table>
  );
};

export default LeadTable;