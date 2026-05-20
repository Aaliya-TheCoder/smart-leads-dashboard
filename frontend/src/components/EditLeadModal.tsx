import { useState }
  from "react";

import API from "../api/axios";

import toast from "react-hot-toast";

import type { Lead }
  from "../types/lead";

interface Props {

  lead: Lead;

  closeModal: () => void;

  fetchLeads: () => void;
}

const EditLeadModal = ({
  lead,
  closeModal,
  fetchLeads,
}: Props) => {

  const [formData,
    setFormData] =
    useState({
      name: lead.name,

      email: lead.email,

      status: lead.status,

      source: lead.source,
    });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement
    >
  ) => {

    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      await API.put(
        `/leads/${lead._id}`,

        formData
      );

      toast.success(
        "Lead Updated"
      );

      fetchLeads();

      closeModal();

    } catch (error) {

      toast.error(
        "Update Failed"
      );
    }
  };

  return (

    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">

      <div className="bg-white p-6 rounded-lg w-96">

        <h2 className="text-2xl font-bold mb-4">

          Edit Lead

        </h2>

        <form
          onSubmit={handleSubmit}
        >

          <input
            type="text"

            name="name"

            value={formData.name}

            onChange={handleChange}

            className="w-full border p-2 mb-3 rounded"
          />

          <input
            type="email"

            name="email"

            value={formData.email}

            onChange={handleChange}

            className="w-full border p-2 mb-3 rounded"
          />

          <select
            name="status"

            value={formData.status}

            onChange={handleChange}

            className="w-full border p-2 mb-3 rounded"
          >

            <option>
              New
            </option>

            <option>
              Contacted
            </option>

            <option>
              Qualified
            </option>

            <option>
              Lost
            </option>

          </select>

          <select
            name="source"

            value={formData.source}

            onChange={handleChange}

            className="w-full border p-2 mb-3 rounded"
          >

            <option>
              Website
            </option>

            <option>
              Instagram
            </option>

            <option>
              Referral
            </option>

          </select>

          <div className="flex justify-between">

            <button
              className="bg-black text-white px-4 py-2 rounded"
            >
              Update
            </button>

            <button
              type="button"

              onClick={closeModal}

              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditLeadModal;