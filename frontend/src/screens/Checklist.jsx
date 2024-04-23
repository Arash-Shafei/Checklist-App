import { useParams, Link } from "react-router-dom";

import { Button } from "@mui/material";

function Checklist() {
  let { name } = useParams();
  return (
    <>
      <Link to={`/group/${name}`}>
        <Button>Go Back</Button>
      </Link>
      <h1>You will see {name} here</h1>
    </>
  );
}

export default Checklist;
