import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Text,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

function ModalImg(props) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>

        <ModalBody>
          <Text>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus
            eveniet voluptate, in, mollitia eligendi sequi magni corporis
            blanditiis asperiores ipsam ex minus, voluptatibus tempore et nobis
            reiciendis exercitationem dolorum nulla?
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={props.onClose}>
            Close
          </Button>
        </ModalFooter>
        {/* ==================================================== */}
      </ModalContent>
    </Modal>
  );
}

export default ModalImg;
