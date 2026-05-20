import { CSVLink }
    from "react-csv";

import type { Lead } from "../types/lead";

interface Props {
    leads: Lead[];
}

const ExportCSV = ({
    leads,
}: Props) => {

    return (
        <CSVLink
            data={leads}

            filename="leads.csv"

            className="bg-green-500 text-white px-4 py-2 rounded"
        >
            Export CSV
        </CSVLink>
    );
};

export default ExportCSV;