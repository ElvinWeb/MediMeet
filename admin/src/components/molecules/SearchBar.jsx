import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { searchValidationSchema } from "../../validation/searchValidationSchema";

function SearchBar({ onSearchSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(searchValidationSchema),
    defaultValues: {
      search: "",
    },
    mode: "all",
  });

  const onSubmit = async (data) => {
    onSearchSubmit(data.search);
  };

  return (
    <form className="max-w-md mb-3" onSubmit={handleSubmit(onSubmit)}>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative w-80">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          id="search"
          className="block w-full p-4 ps-10 text-sm outline-none text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:bg-primary"
          placeholder="Search appointments"
          {...register("search")}
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-primary hover:bg-primary focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
        >
          Search
        </button>
      </div>
      {errors.search && (
        <p className="text-red-500 text-xs mt-1 ps-1">
          {errors.search.message}
        </p>
      )}
    </form>
  );
}

SearchBar.propTypes = {
  onSearchSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
