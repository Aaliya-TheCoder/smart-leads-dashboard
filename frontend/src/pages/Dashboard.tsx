import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../api/axios";

import LeadForm from "../components/leadForm";

import LeadTable from "../components/Leadtable";

import ExportCSV from "../components/ExportCSV";

import EditLeadModal
  from "../components/EditLeadModal";

import type { Lead }
  from "../types/lead";

import StatsCards
  from "../components/StatsCards";

import LeadChart
  from "../components/LeadChart";

const Dashboard = () => {

  const navigate =
    useNavigate();

  // DARK MODE

  const [darkMode,
    setDarkMode] =
    useState(false);

  // LEADS

  const [leads, setLeads] =
    useState<Lead[]>([]);

  const [loading, setLoading] =
    useState(true);

  // SEARCH + FILTER

  const [search, setSearch] =
    useState("");

  const [statusFilter,
    setStatusFilter] =
    useState("");

  // PAGINATION

  const [currentPage,
    setCurrentPage] =
    useState(1);

  const leadsPerPage = 5;

  // EDIT LEAD

  const [editLead,
    setEditLead] =
    useState<Lead | null>(
      null
    );

  // FETCH LEADS

  const fetchLeads = async () => {

    try {

      const { data } =
        await API.get("/leads");

      setLeads(data.leads);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  // LOGOUT

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "role"
    );

    navigate("/");
  };

  // LOAD LEADS

  useEffect(() => {

    fetchLeads();

  }, []);

  // FILTER LEADS

  const filteredLeads =
    leads.filter((lead) => {

      const matchesSearch =
        lead.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        statusFilter === "" ||

        lead.status ===
        statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });

  // PAGINATION

  const lastIndex =
    currentPage *
    leadsPerPage;

  const firstIndex =
    lastIndex -
    leadsPerPage;

  const currentLeads =
    filteredLeads.slice(
      firstIndex,
      lastIndex
    );

  return (

    <div
      className={`min-h-screen p-10 transition-all duration-300 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-black"
      }`}
    >

      {/* HEADER */}

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">

          Smart Leads Dashboard

        </h1>

        <div className="flex gap-4">

          {/* DARK MODE */}

          <button
            onClick={() =>
              setDarkMode(
                !darkMode
              )
            }

            className="
              bg-black
              text-white
              px-4
              py-2
              rounded-lg
              hover:bg-gray-800
              transition
            "
          >

            {darkMode
              ? "Light Mode"
              : "Dark Mode"}

          </button>

          {/* LOGOUT */}

          <button
            onClick={logout}

            className="
              bg-red-500
              hover:bg-red-600
              text-white
              px-5
              py-2
              rounded-lg
              transition
            "
          >
            Logout
          </button>

        </div>

      </div>

      {/* STATS */}

      <StatsCards
        leads={leads}
      />

      {/* CHART */}

      <div
        className={`
          mt-8
          p-6
          rounded-2xl
          shadow-lg
          ${
            darkMode
              ? "bg-gray-800"
              : "bg-white"
          }
        `}
      >

        <LeadChart
          leads={leads}
        />

      </div>

      {/* TOP ACTIONS */}

      <div className="flex justify-between items-center mt-10 mb-6">

        <h2 className="text-2xl font-semibold">

          Manage Leads

        </h2>

        <ExportCSV
          leads={leads}
        />

      </div>

      {/* ADD LEAD FORM */}

      <div
        className={`
          p-6
          rounded-2xl
          shadow-lg
          mb-6
          ${
            darkMode
              ? "bg-gray-800"
              : "bg-white"
          }
        `}
      >

        <LeadForm
          fetchLeads={fetchLeads}
        />

      </div>

      {/* SEARCH + FILTER */}

      <div className="flex gap-4 mb-6">

        {/* SEARCH */}

        <input
          type="text"

          placeholder="Search Leads"

          value={search}

          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }

          className={`
            flex-1
            border
            p-3
            rounded-lg
            outline-none
            ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-black"
            }
          `}
        />

        {/* FILTER */}

        <select
          value={statusFilter}

          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }

          className={`
            border
            p-3
            rounded-lg
            outline-none
            ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-black"
            }
          `}
        >

          <option value="">
            All Status
          </option>

          <option value="New">
            New
          </option>

          <option value="Contacted">
            Contacted
          </option>

          <option value="Qualified">
            Qualified
          </option>

          <option value="Lost">
            Lost
          </option>

        </select>

      </div>

      {/* TABLE */}

      {loading ? (

        <div className="text-center text-2xl mt-20">

          Loading...

        </div>

      ) : (

        <>

          <LeadTable
            leads={currentLeads}

            fetchLeads={fetchLeads}

            setEditLead={setEditLead}
          />

          {/* PAGINATION */}

          <div className="flex gap-3 mt-6">

            <button
              onClick={() =>
                setCurrentPage(
                  currentPage - 1
                )
              }

              disabled={
                currentPage === 1
              }

              className="
                bg-black
                text-white
                px-4
                py-2
                rounded-lg
                disabled:bg-gray-400
              "
            >
              Prev
            </button>

            <button
              onClick={() =>
                setCurrentPage(
                  currentPage + 1
                )
              }

              disabled={
                lastIndex >=
                filteredLeads.length
              }

              className="
                bg-black
                text-white
                px-4
                py-2
                rounded-lg
                disabled:bg-gray-400
              "
            >
              Next
            </button>

          </div>

        </>

      )}

      {/* EDIT MODAL */}

      {editLead && (

        <EditLeadModal
          lead={editLead}

          fetchLeads={fetchLeads}

          closeModal={() =>
            setEditLead(null)
          }
        />

      )}

    </div>
  );
};

export default Dashboard;