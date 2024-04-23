import { useParams } from "react-router-dom";

function SummaryChecklist() {
  let { id } = useParams();
  return <h1>Here you will see the Summary Checklist for {id}</h1>;
}

export default SummaryChecklist;
