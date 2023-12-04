import { prisma } from "../../../config/db";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import EditIssueFormSkeleton from "./loading";

const EditIssueForm = dynamic(() => import("../_components/EditIssueForm"), {
  ssr: false,
  loading: () => <EditIssueFormSkeleton />,
});

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return <EditIssueForm issue={issue} />;
};

export default EditIssuePage;
