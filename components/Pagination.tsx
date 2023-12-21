import {
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import { Button, Flex, Text } from "@radix-ui/themes";
import React from "react";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  return (
    <Flex align="center" gap="2">
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>
      <Button color="gray" variant="soft" disabled={currentPage === 1}>
        <FaAngleDoubleLeft />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === 1}>
        <FaChevronLeft />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === pageCount}>
        <FaChevronRight />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === pageCount}>
        <FaAngleDoubleRight />
      </Button>
    </Flex>
  );
};

export default Pagination;
