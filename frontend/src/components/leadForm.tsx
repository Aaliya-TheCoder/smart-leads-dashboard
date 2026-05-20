import { useState } from "react";

import API from "../api/axios";

import toast from "react-hot-toast";

interface Props {
  fetchLeads: () => void;
}

const LeadForm = ({
  fetchLeads,
}: Props) => {

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      status: "New",
      source: "Website",
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

      await API.post(
        "/leads",
        formData
      );

      toast.success(
        "Lead Created"
      );

      fetchLeads();

      setFormData({
        name: "",
        email: "",
        status: "New",
        source: "Website",
      });

    } catch (error) {

      toast.error(
        "Failed to create lead"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}

      className="bg-white shadow-lg p-5 rounded-lg mb-6"
    >

      <h2 className="text-2xl font-bold mb-4">

        Add Lead

      </h2>

      <div className="grid grid-cols-2 gap-4">

        <input
          type="text"

          name="name"

          placeholder="Lead Name"

          value={formData.name}

          onChange={handleChange}

          className="border p-2 rounded"
        />

        <input
          type="email"

          name="email"

          placeholder="Lead Email"

          value={formData.email}

          onChange={handleChange}

          className="border p-2 rounded"
        />

        <select
          name="status"

          value={formData.status}

          onChange={handleChange}

          className="border p-2 rounded"
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

          className="border p-2 rounded"
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

      </div>

      <button
        className="bg-black text-white px-4 py-2 rounded mt-4"
      >
        Add Lead
      </button>

    </form>
  );
};

export default LeadForm;