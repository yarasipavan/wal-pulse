import { useRouteError } from "react-router-dom";
function ErrorPage() {
  let error = useRouteError();
  return (
    <div className="bg-dark m-auto text-light" style={{ height: "100vh" }}>
      <h1 className="text-center">OOPS!</h1>
      <h3 className="text-danger text-center">{error.statusText}</h3>
    </div>
  );
}

export default ErrorPage;
