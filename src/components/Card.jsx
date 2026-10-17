const Card = ({
  title,
  description,
  image,
  buttonText = "Learn More",
  onClick,
}) => {
  return (
    <div className="max-w-sm overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-shadow duration-300 hover:shadow-xl">
      <div className="p-5">
        <h2 className="mb-2 text-xl font-semibold text-gray-800">{title}</h2>

        <p className="mb-4 text-sm leading-6 text-gray-600">{description}</p>

        <button
          type="button"
          onClick={onClick}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Card;
