import { useParams, useNavigate, Link } from "react-router-dom";

import { Button } from "@mui/material";

function Checklist() {
  let { name } = useParams();
  let navigate = useNavigate();
  return (
    <>
      <Button onClick={() => navigate(-1)}>Go Back</Button>
      <h1>You will see {name} here</h1>
    </>
  );
}

export default Checklist;
