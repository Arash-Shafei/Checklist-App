import { useParams } from "react-router-dom";

function TemplateEditorPage() {
  let { name } = useParams();

  return (
    <>
      <h1>
        In this page, Template Managers are able to alter templates using an
        editor
      </h1>
      <h2>You can now edit the template for {name}</h2>
    </>
  );
}

export default TemplateEditorPage;
