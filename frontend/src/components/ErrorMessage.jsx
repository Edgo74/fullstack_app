function ErrorMessage({ message }) {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="text-lg text-red-500">
        Error: {message || 'Quelque chose s\'est mal passé'}
      </div>
    </div>
  );
}

export default ErrorMessage;