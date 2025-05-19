
const StatusIcon = () => {
  return (
    <span className="inline-flex items-center justify-center w-6 h-6 text-sm font-semibold text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
      <svg
        className="w-2.5 h-2.5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 16 12"
      >
        <path
          stroke="#5F6FFF"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 5.917 5.724 10.5 15 1.5"
        />
      </svg>
      <span className="sr-only">Icon description</span>
    </span>
  );
};

export default StatusIcon;
