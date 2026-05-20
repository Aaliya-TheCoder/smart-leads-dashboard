interface Props {
    status: string;

    setStatus: React.Dispatch<
        React.SetStateAction<string>
    >;

    source: string;

    setSource: React.Dispatch<
        React.SetStateAction<string>
    >;
}

const Filters = ({
    status,
    setStatus,
    source,
    setSource,
}: Props) => {
    return (
        <div className="flex gap-4 mb-4">

            <select
                value={status}

                onChange={(e) =>
                    setStatus(e.target.value)
                }

                className="border p-2"
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

            <select
                value={source}

                onChange={(e) =>
                    setSource(e.target.value)
                }

                className="border p-2"
            >
                <option value="">
                    All Sources
                </option>

                <option value="Website">
                    Website
                </option>

                <option value="Instagram">
                    Instagram
                </option>

                <option value="Referral">
                    Referral
                </option>
            </select>

        </div>
    );
};

export default Filters;