import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Input,
  FormLabel,
  Textarea,
  Select,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

function ReviewModal({
  isOpen,
  onClose,
  stars,
  setStars,
  title,
  setTitle,
  content,
  setContent,
  userId,
  productId,
  setAlreadyReviewed,
}: any) {
  const toast = useToast();
  const sendReview = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/api/create-review",
        {
          stars,
          title,
          content,
          productId,
          userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data?.data) {
        onClose();
        setAlreadyReviewed(true);
        toast({
          title: "Review toegevoegd",
          description: "Bedankt voor je review",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Er is iets fout gegaan",
        description: "Probeer het opnieuw",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={{ base: "5px", sm: "5px" }}>
          <form>
            <ModalHeader>Schrijf een review</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormLabel fontWeight={"semibold"}>Titel</FormLabel>
              <Input
                placeholder="Titel"
                onChange={(e) => setTitle(e.target.value)}
                defaultValue={title}
                mb={3}
                required
              />
              <FormLabel fontWeight={"semibold"}>Review</FormLabel>
              <Textarea
                placeholder="Review"
                onChange={(e) => setContent(e.target.value)}
                defaultValue={content}
                required
              />
              <Text my={2} fontWeight={"semibold"}>
                Hoeveel sterren geef jij?
              </Text>
              <Select
                onChange={(e) => setStars(parseInt(e.target.value))}
                value={stars}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option selected value="5">
                  5
                </option>
              </Select>
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={sendReview}
                bgColor={"#febd00"}
                _hover={{ bgColor: "orange" }}
                mr={3}
                type="submit"
              >
                Toevoegen
              </Button>
              <Button type="button" onClick={onClose}>
                Annuleren
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ReviewModal;
