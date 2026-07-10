import { TailSpin } from "react-loader-spinner";
import "./loaderComponent.css";
function LoaderComponent() {
  return (
    <>
    <div className="loader-container">
      <TailSpin height={60} width={60} color="#007bff" ariaLabel="loading" />
    </div>
    </>
  );
}

export default LoaderComponent;
