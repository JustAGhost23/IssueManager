import dynamic from "next/dynamic";
import CreateIssueFormSkeleton from "./loading";

const CreateIssueForm = dynamic(() => import("../_components/CreateIssueForm"), {
  ssr: false,
  loading: () => <CreateIssueFormSkeleton />,
});

const NewIssuePage = () => {
  return <CreateIssueForm />;
};

export default NewIssuePage;
