import { Navigate } from "react-router";

export default function Redirect(path) {
    return (
      <Navigate to={path}/>
    );
  }