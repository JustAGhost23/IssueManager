import authOptions from "@/app/api/auth/auth";
import { getServerSession } from "next-auth";
import { prisma } from "../../config/db";
import { notFound } from "next/navigation";
import { Grid, Box, Flex } from "@radix-ui/themes";
import { cache } from "react";
import IssueDetails from "./_components/IssueDetails";
import EditIssueButton from "./_components/EditIssueButton";
import DeleteIssueButton from "./_components/DeleteIssueButton";
import AssigneeSelect from "./_components/AssigneeSelect";

interface Props {
  params: { id: string };
}

const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  const issue = await fetchUser(parseInt(params.id));

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", md: "5" }} gap="4">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  return {
    title: issue?.title,
    description: "Details of issue " + issue?.id,
  };
}

export default IssueDetailPage;
