import { Flex, Card, Box } from "@radix-ui/themes";
import Skeleton from "../../../components/Skeleton"

const LoadingIssueDetailPage = () => {
  return (
    <div>
      <Box className="max-w-xl">
        <Skeleton />
        <Flex className="space-x-4" my="2">
          <Skeleton width="5rem" />
          <Skeleton width="8rem" />
        </Flex>
        <Card className="prose" mt="4">
          <Skeleton count={3} />
        </Card>
      </Box>
    </div>
  );
};

export default LoadingIssueDetailPage;
