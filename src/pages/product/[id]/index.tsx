import FormattedPrice from "@/components/FormattedPrice";
import LocationOnGoogleMaps from "@/components/LocationOnGoogleMaps";
import Products from "@/components/Products";
import Reviews from "@/components/Review";
import { addToCart, addToFavorite } from "@/store/nextSlice";
import getAllProducts from "@/utils/getAllProducts";
import getAverageRating from "@/utils/getAverageRating";
import getReviews from "@/utils/getReviews";
import getSimilarProducts from "@/utils/getSimilarProducts";
import getSingleProduct from "@/utils/getSingleProduct";
import {
  HStack,
  Stack,
  VStack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Button,
  Input,
  useNumberInput,
  Image as ChakraImage,
  Text,
  ListItem,
  ListIcon,
  List,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import React, { useEffect, useRef, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";
import { IoCheckmarkSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { BeatLoader } from "react-spinners";

const DynamicPage = ({
  averageRating,
  productData,
  reviewsData,
  similarProducts,
}: {
  averageRating: any;
  productData: any;
  reviewsData: any;
  similarProducts: any;
}) => {
  const [product, setProduct] = useState<any>(productData);
  const [similar, setSimilarProducts] = useState<any>(similarProducts);
  const [reviews, setReviews] = useState<any>(reviewsData);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const firstDivRef = useRef<HTMLDivElement>(null);
  const secondDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (firstDivRef.current && secondDivRef.current) {
        if (firstDivRef.current.getBoundingClientRect().bottom === 310) {
          secondDivRef.current.style.top = "0";
          secondDivRef.current.style.position = "static";
        } else {
          secondDivRef.current.style.top = "200px";
          secondDivRef.current.style.position = "sticky";
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //scroll to photos
  const refPhotos = React.useRef<HTMLDivElement>(null);
  const path = useRouter().asPath;
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: 6,
      precision: 0,
    });

  const dispatch = useDispatch();
  const refDescription = React.useRef<HTMLParagraphElement>(null);
  const refDescription2 = React.useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (productData) {
      setProduct(productData);
      setSimilarProducts(similarProducts);
      setReviews(reviewsData);
      setIsLoading(false);
    }
  }, [productData, similarProducts, reviewsData]);

  useEffect(() => {
    setQuantity(parseInt(getInputProps().value));
  }, [getInputProps()]);

  if (!product) {
    return (
      <div className="w-full md:h-[80vh] flex flex-col gap-6 items-center justify-center py-20">
        <p>Loading...</p>
        <BeatLoader color="#131921" size={40} />
      </div>
    );
  }

  if (Object.keys(product).length === 0) {
    return (
      <div className="flex justify-center items-center sm:h-[80vh] lg:h-[80vh]">
        <h1 className="text-3xl font-bold">Geen product gevonden</h1>
      </div>
    );
  }

  if (product.attributes?.showBolComData && refDescription.current) {
    refDescription.current.innerHTML =
      product.attributes.bolDetails.attributes.find(
        (attr: any) => attr.id === "Beschrijving"
      )?.values[0]?.value;
    if (refDescription2.current) {
      refDescription2.current.innerHTML =
        product.attributes.bolDetails.attributes.find(
          (attr: any) => attr.id === "Beschrijving"
        )?.values[0]?.value;
    }
  }

  const attrs = [];

  if (product.attributes?.showBolComData) {
    for (let i = 0; i < product.attributes.bolDetails.attributes?.length; i++) {
      if (
        product.attributes.bolDetails.attributes[i].id !== "Beschrijving" &&
        product.attributes.bolDetails.attributes[i].id !== "Titel" &&
        product.attributes.bolDetails.attributes[i].id !== "niet-abseo" &&
        product.attributes.bolDetails.attributes[i].id !== "SEO Slak" &&
        product.attributes.bolDetails.attributes[i].id !==
          "Handelsnaam en contactadres van fabrikant of importeur in de EU"
      ) {
        attrs.push({
          id: product.attributes.bolDetails.attributes[i].id,
          value: product.attributes.bolDetails.attributes[i].values[0].value,
        });
      }
    }
  } else if (product.attributes?.attributes) {
    const keys = Object.keys(product.attributes.attributes);
    for (let i = 0; i < keys?.length; i++) {
      if (keys[i][1] !== null) {
        attrs.push({
          id: keys[i],
          value: product.attributes.attributes[keys[i]],
        });
      }
    }
  }

  // metadata
  const meta = {
    title: product.attributes?.showBolComData
      ? product.attributes.bolDetails.attributes.find(
          (item: any) => item.id === "Titel"
        )["values"][0].value
      : product.attributes?.title,
    description: product.attributes?.showBolComData
      ? product.attributes.bolDetails.attributes.find(
          (item: any) => item.id === "Beschrijving"
        )["values"][0].value
      : product.attributes?.description,
    image: product.attributes?.image.data
      ? product.attributes?.image.data[0]?.attributes?.url
      : product.attributes?.imageUrls[0],
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="Casaverse, home, casa verse" />
        <meta property="og:locale" content="nl_NL" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta name="title" content={meta.title} />

        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.image} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_AUTH_URL}${path}`}
        />
        <meta property="og:site_name" content="Casa Verse" />
        <meta property="og:locale" content="nl_NL" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@casaverse" />
        <meta name="twitter:creator" content="@casaverse" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
      </Head>
      <div className="w-full mx-auto px-4 py-4 md:py-10">
        {isLoading ? (
          <div className="w-full flex flex-col gap-6 items-center justify-center py-20">
            <p>Loading...</p>
            <BeatLoader color="#131921" size={40} />
          </div>
        ) : (
          <VStack className="w-full grid sm:grid-cols-1 md:grid-cols-3 gap-3 bg-white rounded-lg">
            <Text
              w={"100%"}
              className="text-xl md:text-3xl sm:text-sm tracking-wide font-bold"
            >
              {product.attributes?.showBolComData
                ? product.attributes.bolDetails.attributes.find(
                    (item: any) => item.id === "Titel"
                  )["values"][0].value
                : product.attributes?.title}
            </Text>
            <div className="w-full grid sm:grid-col-1 md:grid-cols-2 gap-3 bg-white rounded-lg">
              <div
                ref={firstDivRef}
                className="w-full flex items-center justify-center rounded-lg relative group overflow-hidden flex-col sm:w-[95%]"
              >
                <VStack m={{ sm: 0, md: 5 }}>
                  <Carousel
                    autoPlay
                    infiniteLoop
                    showStatus={false}
                    showIndicators={false}
                    showThumbs={false}
                    interval={3000}
                    selectedItem={selectedImage}
                    onChange={(index) => setSelectedImage(index)}
                    stopOnHover={true}
                    width={500}
                  >
                    {product.attributes?.image.data
                      ? product.attributes?.image.data?.map(
                          (image: any, i: number) => (
                            <Box
                              key={"images " + i}
                              w={"100%"}
                              h={"400px"}
                              bgColor={"white"}
                            >
                              <Image
                                src={image.attributes.url}
                                alt="product image"
                                objectFit={"contain"}
                                layout="fill"
                                color="white"
                              />
                            </Box>
                          )
                        )
                      : product.attributes?.imageUrls?.map(
                          (image: string, i: number) => (
                            <Box
                              key={"images " + i}
                              w={"100%"}
                              h={"400px"}
                              bgColor={"white"}
                            >
                              <Image
                                src={image}
                                alt="product image"
                                layout="fill"
                                objectFit="contain"
                                color="white"
                              />
                            </Box>
                          )
                        )}
                  </Carousel>

                  <HStack
                    overflowX={"scroll"}
                    mb={2}
                    mt={5}
                    spacing={0.5}
                    ref={refPhotos}
                    w={"100%"}
                  >
                    {product.attributes?.image.data
                      ? product.attributes?.image.data?.map(
                          (image: any, i: number) => (
                            <ChakraImage
                              key={"images " + i}
                              src={image.attributes.url}
                              alt="product image"
                              width={100}
                              height={100}
                              onClick={() => setSelectedImage(i)}
                              style={{ cursor: "pointer" }}
                              border={
                                i === selectedImage
                                  ? "2px solid rgb(254 189 105)"
                                  : "1px solid gray"
                              }
                              objectFit={"contain"}
                              mx={1}
                              p={1}
                            />
                          )
                        )
                      : product.attributes?.imageUrls?.map(
                          (image: string, i: number) => (
                            <ChakraImage
                              key={"images " + i}
                              src={image}
                              alt="product image"
                              width={100}
                              height={100}
                              onClick={() => setSelectedImage(i)}
                              style={{ cursor: "pointer" }}
                              border={
                                i === selectedImage
                                  ? "2px solid rgb(254 189 105)"
                                  : "1px solid gray"
                              }
                              objectFit={"contain"}
                              mx={1}
                              p={1}
                            />
                          )
                        )}
                  </HStack>
                </VStack>
                <Stack w={"100%"} display={{ base: "none", md: "inline-flex" }}>
                  <Tabs>
                    <TabList>
                      <Tab>Productomschrijving</Tab>
                      <Tab>Algemene kenmerken</Tab>
                      <Tab>Reviews</Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel>
                        <p
                          className="text-sm text-gray-600"
                          ref={refDescription}
                        >
                          {product.attributes?.showBolComData
                            ? product.attributes.bolDetails.attributes.find(
                                (attr: any) => attr.id == "Beschrijving"
                              )?.values[0].value
                            : product.attributes?.description}
                        </p>
                      </TabPanel>
                      <TabPanel>
                        <table style={{ width: "100%" }}>
                          <tbody>
                            {attrs?.map((attr: any, i: number) => (
                              <tr
                                key={"attr " + i}
                                style={{
                                  marginTop: "10px",
                                  backgroundColor: i % 2 === 0 ? "#f7f7f7" : "",
                                }}
                              >
                                <td>{attr.id}</td>
                                <td style={{ textAlign: "center" }}>
                                  {attr.value}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </TabPanel>
                      <TabPanel>
                        <Reviews
                          reviewsData={reviews}
                          averageRating={averageRating}
                        />
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </Stack>
              </div>
              <div
                ref={secondDivRef}
                className="sm:col-span-1 md:col-span-1 flex flex-col gap-3 justify-center sm:p-0 sticky h-[max-content] sm:w-[95%] w-full"
              >
                <div className="flex flex-col justify-center sm:w-full w-90% border border-gray-200 rounded-lg mx-auto p-10">
                  <p className="text-base text-gray-600 flex items-center gap-1">
                    <span className="text-5xl text-red-600 font-bold">
                      <FormattedPrice amount={product.attributes?.price} />
                    </span>
                    {product.oldPrice && (
                      <span className="ml-1 line-through">
                        <FormattedPrice amount={product.attributes?.oldPrice} />
                      </span>
                    )}
                  </p>
                  {product.attributes?.oldPrice && (
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-3">
                      bespaard:{" "}
                      <span>
                        <FormattedPrice
                          amount={
                            product.attributes?.oldPrice -
                            product.attributes?.price
                          }
                        />
                      </span>
                    </p>
                  )}
                  {product.attributes?.voorraad && (
                    <Text
                      border={"1px solid green"}
                      w={"max-content"}
                      px={1}
                      color={"green"}
                      fontWeight={"semibold"}
                      my={4}
                    >
                      op voorraad
                    </Text>
                  )}
                  <HStack
                    alignItems={{ base: "start", md: "center" }}
                    alignContent={{ base: "start", md: "center" }}
                    mt={5}
                    flexDirection={{ base: "column", md: "row" }}
                  >
                    <HStack>
                      <Stack display={"flex"} flexDirection={"row"}>
                        <Button {...getDecrementButtonProps()}>-</Button>
                        <Input {...getInputProps()} textAlign={"center"} />
                        <Button {...getIncrementButtonProps()}>+</Button>
                      </Stack>
                      <Stack>
                        <Text
                          _hover={{
                            border: "1px solid blue",
                            borderRadius: "5px",
                          }}
                          cursor={"pointer"}
                          p={1}
                          onClick={() =>
                            dispatch(
                              addToFavorite({
                                id: product.id,
                                brand: product.attributes?.brand,
                                category:
                                  product.attributes?.category?.data?.attributes
                                    ?.title,
                                description: product.attributes?.showBolComData
                                  ? product.attributes?.showBolComData
                                  : product.attributes?.description,
                                image: product?.attributes?.image?.data
                                  ? product?.attributes?.image?.data[0]
                                      ?.attributes?.url
                                  : product.attributes?.imageUrls[0],
                                isNew: product.attributes?.isNew,
                                oldPrice: product.attributes?.oldPrice,
                                price: product.attributes?.price,
                                title: product.attributes?.showBolComData
                                  ? product.attributes.bolDetails.attributes.find(
                                      (item: any) => item.id === "Titel"
                                    )["values"][0].value
                                  : product.attributes?.title,
                                quantity: quantity,
                              })
                            )
                          }
                        >
                          <CiHeart size={"32px"} color="blue" />
                        </Text>
                      </Stack>
                    </HStack>
                    <Stack w={{ base: "100%", md: "auto" }}>
                      <Button
                        onClick={() =>
                          dispatch(
                            addToCart({
                              id: product.id,
                              brand: product.attributes?.brand,
                              category:
                                product.attributes?.category?.data?.attributes
                                  ?.title,
                              description: product.attributes?.showBolComData
                                ? product.attributes?.showBolComData
                                : product.attributes?.description,
                              image: product?.attributes?.image?.data
                                ? product?.attributes?.image?.data[0]
                                    ?.attributes?.url
                                : product.attributes?.imageUrls[0],
                              isNew: product.attributes?.isNew,
                              oldPrice: product.attributes?.oldPrice,
                              price: product.attributes?.price,
                              title: product.attributes?.showBolComData
                                ? product.attributes.bolDetails.attributes.find(
                                    (item: any) => item.id === "Titel"
                                  )["values"][0].value
                                : product.attributes?.title,
                              quantity: quantity,
                            })
                          )
                        }
                        bgColor={"#febd00"}
                        fontWeight={"normal"}
                        _hover={{ bgColor: "#f7ca00" }}
                        w={{ base: "100%", md: "auto" }}
                      >
                        <FiShoppingCart
                          style={{ marginRight: "10px" }}
                          size={"18px"}
                        />
                        In winkelwagen
                      </Button>
                    </Stack>
                  </HStack>
                  <Stack mt={10}>
                    <List spacing={3}>
                      <ListItem alignItems={"center"} display={"flex"}>
                        <ListIcon as={IoCheckmarkSharp} color="green.500" />
                        Bestellen via Casa Verse
                      </ListItem>
                      <ListItem alignItems={"center"} display={"flex"}>
                        <ListIcon as={IoCheckmarkSharp} color="green.500" />
                        <Text
                          as={"span"}
                          color={"green"}
                          fontWeight={"bold"}
                          mr={1}
                        >
                          Inclusief
                        </Text>{" "}
                        verzendkosten
                      </ListItem>
                      <ListItem alignItems={"center"} display={"flex"}>
                        <ListIcon as={IoCheckmarkSharp} color="green.500" />
                        Betalen via{" "}
                        <Link
                          passHref
                          href={"https://stripe.com/"}
                          style={{ marginLeft: "5px", color: "blue" }}
                        >
                          Stripe
                        </Link>
                      </ListItem>
                      <ListItem alignItems={"center"} display={"flex"}>
                        <ListIcon as={IoCheckmarkSharp} color="green.500" />
                        14 dagen bedenktijd en retourneren
                      </ListItem>
                    </List>
                    <Text mt={10}>
                      Bekijk de extra{" "}
                      <Link
                        passHref
                        href={"/algemene-voorwaarden"}
                        style={{ marginLeft: "5px", color: "blue" }}
                      >
                        voorwaarden
                      </Link>{" "}
                    </Text>
                  </Stack>
                </div>
                <Stack
                  // w={{ base: "90%", md: "100%" }}
                  display={{ base: "inline-flex", md: "none" }}
                >
                  <Tabs>
                    <TabList>
                      <Tab fontSize={{ base: "14px", md: "16px" }}>
                        Productomschrijving
                      </Tab>
                      <Tab fontSize={{ base: "14px", md: "16px" }}>
                        Algemene kenmerken
                      </Tab>
                      <Tab fontSize={{ base: "14px", md: "16px" }}>Reviews</Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel>
                        <p
                          className="text-sm text-gray-600"
                          ref={refDescription2}
                        >
                          {product.attributes?.showBolComData
                            ? product.attributes.bolDetails.attributes.find(
                                (attr: any) => attr.id == "Beschrijving"
                              )?.values[0].value
                            : product.attributes?.description}
                        </p>
                      </TabPanel>
                      <TabPanel overflowX={"hidden"}>
                        <table style={{ width: "100%" }}>
                          <tbody>
                            {attrs?.map((attr: any, i: number) => (
                              <tr
                                key={"attr " + i}
                                style={{
                                  marginTop: "10px",
                                  backgroundColor: i % 2 === 0 ? "#f7f7f7" : "",
                                }}
                              >
                                <td>{attr.id}</td>
                                <td style={{ textAlign: "center" }}>
                                  {attr.value}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </TabPanel>
                      <TabPanel>
                        <Reviews
                          reviewsData={reviews}
                          averageRating={averageRating}
                        />
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </Stack>
              </div>
            </div>
            <HStack
              w={"100%"}
              alignItems={"top"}
              display={"flex"}
              spacing={"auto"}
              flexWrap={"wrap"}
            >
              <Stack w={"100%"}>
                <Text fontSize={"xl"} fontWeight={"bold"} pl={5}>
                  Bekijk ook eens
                </Text>
                <Products productData={similar} similar={true} />
              </Stack>
            </HStack>
          </VStack>
        )}
        <LocationOnGoogleMaps />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const id =
      params && typeof params.id == "string" && params.id?.split("?")[0];

    if (!id) {
      return { props: { productData: {} } };
    }

    const res = await getSingleProduct(id);
    if (!res.data || res.data.length === 0) {
      return { props: { productData: {} } };
    }

    const reviews = await getReviews(id);
    const averageRating = await getAverageRating(id);

    const similar = await getSimilarProducts(
      res.data?.attributes?.category?.data?.attributes?.title
    );

    const similarProducts = similar?.data?.filter(
      (item: any) => item.id != res?.data?.id
    );

    return {
      props: {
        productData: res?.data,
        similarProducts: similarProducts,
        reviewsData: reviews?.data,
        averageRating: averageRating.data,
      },
    };
  } catch (error) {
    console.log("error", error);
    return { props: { productData: {} } };
  }
};

export default DynamicPage;
