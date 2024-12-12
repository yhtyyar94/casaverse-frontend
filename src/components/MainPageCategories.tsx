import React, { useEffect } from "react";
import Link from "next/link";
import { Box, Button, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

const MainPageCategories = ({ categoriesData }: any) => {
  const [categories, setCategories] = React.useState(categoriesData);
  const slider = React.useRef<HTMLDivElement>(null);

  const handleClick = (direction: string) => {
    if (direction === "left" && slider.current) {
      slider.current.scrollLeft -= 40;
    } else if (direction === "right" && slider.current) {
      slider.current.scrollLeft += 40;
    }
  };

  React.useEffect(() => {
    setCategories(categoriesData);
  }, [categoriesData]);

  return (
    <Box
      mb={10}
      p={1}
      bgColor={"white"}
      borderRadius={"5px"}
      w={{ base: "90%", md: "95%" }}
      mx={"auto"}
      boxShadow={"0 0 10px rgba(0,0,0,0.1)"}
    >
      <Text fontWeight={"bold"} fontSize={"lg"} m={0}>
        Categorieën
      </Text>
      <Box
        display={"flex"}
        justifyContent={"space-around"}
        alignItems={"center"}
        flexDirection={"row"}
      >
        <Button
          w={"2%"}
          h={"100px"}
          p={0}
          bgColor={"transparent"}
          _hover={{ bgColor: "aliceblue" }}
          onClick={() => handleClick("left")}
        >
          <FaAngleDoubleLeft size={"24px"} />
        </Button>
        <Box
          overflowX={"auto"}
          mb={2}
          mt={5}
          display={"flex"}
          // flexShrink={0}
          my={0}
          w={"94%"}
          ref={slider}
        >
          {categories?.map((category: any, i: any) => (
            <Link
              key={`/category/${category.name} ${i}`}
              href={`/category/${category.name}`}
              passHref
            >
              <Box
                flexShrink={0}
                w={200}
                mx={1}
                display={"flex"}
                flexDirection={"column"}
                flexWrap={"wrap"}
                justifyContent={"center"}
              >
                <Image
                  className="scale-90 hover:scale-100 transition-transform duration-300"
                  objectFit="contain"
                  w={150}
                  h={100}
                  color="white"
                  src={category.url}
                  alt="productImage"
                  borderRadius={"50% 50% 50% 50% / 50% 50% 50% 50%"}
                  mx={"auto"}
                />
                <Text w={"100%"} fontWeight={"semibold"} textAlign={"center"}>
                  {category.name}
                </Text>
              </Box>
            </Link>
          ))}
        </Box>
        <Button
          w={"2%"}
          h={"100px"}
          p={0}
          bgColor={"transparent"}
          _hover={{ bgColor: "aliceblue" }}
          onClick={() => handleClick("right")}
        >
          <FaAngleDoubleRight size={"24px"} />
        </Button>
      </Box>
    </Box>
  );
};

export default MainPageCategories;
