import Spinner from "react-bootstrap/Spinner";

function LoadingSpinner({ size }: { size: "sm" | undefined }) {
  return <Spinner animation="border" size={size} />;
}

export default LoadingSpinner;
