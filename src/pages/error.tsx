import { isRouteErrorResponse, useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError() as Error;
  if (!isRouteErrorResponse(error)) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center h-dvh">
      <h1 className="text-5xl mb-4 text-center">Oops!</h1>
      <p className="text-4xl mb-4 text-center">
        Sorry, an unexpected error has occurred.
      </p>
      <p className="italic">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export default Error;
