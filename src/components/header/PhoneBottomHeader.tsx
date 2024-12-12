import {
  useDisclosure,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";

import { MdOutlineMenu } from "react-icons/md";
import React from "react";
import { useSelector } from "react-redux";
import { StateProps } from "../../../type";
import Link from "next/link";

function HomeBottomHeader() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  const { categories } = useSelector((state: StateProps) => state.next);
  return (
    <>
      <Button ref={btnRef} bgColor={"transparent"} onClick={onOpen}>
        <MdOutlineMenu color="black" size={"32px"} />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader p={3} h={"max-content"}>
            Categorieën
          </DrawerHeader>

          <DrawerBody
            className={"bg-amazon_light"}
            display={"flex"}
            flexDirection={"column"}
          >
            <Link
              href={"/all-products"}
              className="text-white my-3 text-md hover:border-white cursor-pointer duration-300"
              onClick={onClose}
            >
              Alle producten
            </Link>
            {categories?.length > 0 &&
              categories?.map((category: any, id: number) => (
                <Link
                  href={`/category/${category.name}`}
                  className="text-white my-3 text-md hover:border-white cursor-pointer duration-300"
                  key={"category " + id}
                  onClick={onClose}
                >
                  {category.name}
                </Link>
              ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default HomeBottomHeader;
