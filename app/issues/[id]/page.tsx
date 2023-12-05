import { prisma } from "../../config/db";
import { notFound } from "next/navigation";
import { Grid, Box, Flex } from "@radix-ui/themes";
import IssueDetails from "./_components/IssueDetails";
import EditIssueButton from "./_components/EditIssueButton";
import DeleteIssueButton from "./_components/DeleteIssueButton";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", md: "5" }} gap="4">
      <Box className='md:col-span-4'>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
