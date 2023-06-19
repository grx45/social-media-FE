import { Hide, UnorderedList, ListIcon, Flex, Button } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BiHomeSmile,
  BiNotification,
  BiMessageAlt,
  BiTrendingUp,
} from "react-icons/bi";
import { RxPerson, RxPencil2 } from "react-icons/rx";

function Footerbar() {
  const Navigate = useNavigate();
  return (
    <Hide above="lg">
      <Flex
        position="fixed"
        bottom={"0"}
        w="100vw"
        borderTop="1px"
        borderColor="gray.100"
        backgroundColor={"white"}
        justifyContent="space-evenly"
        pb="3"
        fontSize="3xl"
      >
        <UnorderedList>
          <Button onClick={() => Navigate("/landing")} variant="unstyled">
            <BiHomeSmile size={"30px"} />
          </Button>
        </UnorderedList>
        <UnorderedList>
          <Button variant="unstyled">
            <BiNotification size={"30px"} />
          </Button>
        </UnorderedList>
        <UnorderedList>
          <Button variant="unstyled">
            <BiMessageAlt size={"30px"} />
          </Button>
        </UnorderedList>
        <UnorderedList>
          <Button variant="unstyled">
            <RxPerson size={"30px"} />
          </Button>
        </UnorderedList>
        <UnorderedList>
          <Button variant="unstyled">
            <BiTrendingUp size={"30px"} />
          </Button>
        </UnorderedList>
      </Flex>
    </Hide>
  );
}

export default Footerbar;
