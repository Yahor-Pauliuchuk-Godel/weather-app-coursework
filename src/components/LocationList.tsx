import { Link } from "react-router-dom";

type LocationItem = {
  ID: string;
  EnglishName: string;
  [key: string]: any;
}

type LocationListProps<T extends LocationItem> = {
  locations: T[] | undefined;
  onItemClick: (item: T) => void;
  isLoading: boolean;
  error: unknown;
  backLink?: {
    to: string;
    label: string;
  };
}

const LocationList = <T extends LocationItem>({
  locations,
  onItemClick,
  isLoading,
  error,
  backLink
}: LocationListProps<T>) => {
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>;
  if (!locations || locations.length === 0) return <p>No locations found.</p>;

  return (
    <div className="mt-4">
      <ul className="list-group">
        {locations.map((item) => (
          <li key={item.ID} className="list-group-item text-center">
            <button
              className="btn btn-link text-decoration-none"
              onClick={() => onItemClick(item)}
            >
              {item.EnglishName}
            </button>
          </li>
        ))}
      </ul>

      {backLink && (
        <div className="text-center mt-3">
          <Link to={backLink.to} className="btn btn-secondary">
            {backLink.label}
          </Link>
        </div>
      )}
    </div>
  );
};

export default LocationList;