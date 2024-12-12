import {
  Button,
  Divider,
  HStack,
  Stack,
  Text,
  Tooltip,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { MdOutlineStarOutline, MdOutlineStarPurple500 } from "react-icons/md";
import ReviewModal from "./ReviewModal";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";

const Reviews = ({ reviewsData, averageRating }: any) => {
  const [reviews, setReviews] = useState(reviewsData);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userInfo } = useSelector((state: any) => state.next);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [stars, setStars] = useState(5);
  const [canReview, setCanReview] = useState(false);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setReviews(reviewsData);
  }, [reviewsData]);

  useEffect(() => {
    const id = (router.query?.id as string)?.split("?")[0];

    if (userInfo && id) {
      axios
        .post(
          "/api/can-review",
          {
            productId: id,
            userId: userInfo.id,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data?.data?.length > 0) {
            setCanReview(true);
          }
        })
        .catch((err) => console.log(err));
      axios
        .post(
          "/api/is-already-reviewed",
          {
            productId: id,
            userId: userInfo.id,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data?.data?.length > 0) {
            setAlreadyReviewed(true);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [router.query?.id, userInfo]);

  return (
    <Stack w={"100%"}>
      <HStack
        display={"flex"}
        justifyContent={{ sm: "start", md: "start", lg: "space-between" }}
        flexDirection={{
          base: "column",
          sm: "column",
          md: "column",
          lg: "row",
        }}
        flexWrap={"wrap"}
      >
        <VStack>
          <Text
            fontWeight={"bold"}
            fontSize={"large"}
            w={"100%"}
            textAlign={"left"}
          >
            Reviews
          </Text>
          <HStack>
            {[...Array(5)]?.map((_, i) =>
              i + 1 <= averageRating?.averageRating ? (
                <MdOutlineStarPurple500
                  key={i}
                  color={"#febd00"}
                  size={"22px"}
                />
              ) : (
                <MdOutlineStarOutline key={i} color={"#febd00"} size={"22px"} />
              )
            )}
            <Text fontSize={"sm"} color={"gray"}>
              {averageRating?.averageRating?.toString()?.substring(0, 4)}{" "}
              Gebaseerd op {averageRating?.totalReviews} reviews
            </Text>
          </HStack>
        </VStack>
        <VStack
          display={"flex"}
          //   justifyContent={{ base: "left", sm: "left", md: "right" }}
          alignItems={"center"}
          w={{ base: "100%", sm: "100%", md: "100%", lg: "auto" }}
        >
          <Tooltip
            label={
              !userInfo
                ? "Log in om een review te schrijven"
                : !canReview
                ? "Je kunt wel reviews schrijven bij alles wat je ooit via casaverse.nl gekocht hebt."
                : alreadyReviewed && "Je hebt dit product al gereviewd"
            }
          >
            <Button
              bgColor={"#febd00"}
              _hover={{ bgColor: "orange" }}
              w={{ sm: "100%", md: "100%", lg: "auto" }}
              onClick={onOpen}
              isDisabled={!userInfo || !canReview || alreadyReviewed}
            >
              Schrijf een review
            </Button>
          </Tooltip>
        </VStack>
      </HStack>
      <ReviewModal
        isOpen={isOpen}
        onClose={onClose}
        stars={stars}
        setStars={setStars}
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        userId={userInfo?.id}
        productId={router.query?.id}
        setAlreadyReviewed={setAlreadyReviewed}
      />
      <Divider my={5} />
      {reviews?.map((review: any) => (
        <div
          key={review.id}
          className="w-full bg-white text-black p-4 border border-gray-300 rounded-lg group overflow-hidden"
        >
          <HStack>
            {[...Array(5)]?.map((_, i) =>
              i + 1 <= review?.attributes?.stars ? (
                <MdOutlineStarPurple500
                  key={i}
                  color={"#febd00"}
                  size={"22px"}
                />
              ) : (
                <MdOutlineStarOutline key={i} color={"#febd00"} size={"22px"} />
              )
            )}
          </HStack>
          <Text fontSize={"xs"} color={"gray"} mb={2}>
            door {review.attributes?.user?.data?.attributes?.firstname}{" "}
            {new Date(review?.attributes?.createdAt).toLocaleDateString(
              "nl-NL"
            )}
          </Text>
          <Text fontWeight={"semibold"}>{review.attributes?.title}</Text>
          <Text>{review.attributes.review}</Text>
        </div>
      ))}
    </Stack>
  );
};

export default Reviews;
