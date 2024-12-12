import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Text,
  Box,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";

const VeelgesteldeVragen = () => {
  return (
    <Stack
      my={10}
      w={{ base: "90%", sm: "90%", md: "70%", lg: "60%" }}
      mx={"auto"}
    >
      <Text
        textAlign={"center"}
        w={"100%"}
        my={5}
        fontSize={"2xl"}
        fontWeight={"bold"}
      >
        Veelgestelde vragen
      </Text>
      <Text my={5}>
        We hebben een aantal veelgestelde vragen voor u op een rijtje gezet. We
        hopen u hiermee te helpen maar mocht dit niet gelukt zijn neem dan{" "}
        <Link style={{ color: "blue" }} href={"/contact"}>
          contact
        </Link>{" "}
        met ons op.
      </Text>
      <Accordion>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    fontWeight={"semibold"}
                  >
                    Moet ik verzendkosten betalen?
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" />
                  ) : (
                    <AddIcon fontSize="12px" />
                  )}
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Voor bestellingen met een totaalwaarde vanaf €50 inlcusief BTW
                zijn er geen verzendkosten. Voor bestellingen met een
                totaalwaarde onder de €50 geldt er verzendkosten van €6,99
                inclusief BTW.
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    fontWeight={"semibold"}
                  >
                    Kan ik ook vanuit het buitenland bestellen?
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" />
                  ) : (
                    <AddIcon fontSize="12px" />
                  )}
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Ja dat is mogelijk. Op dit moment bezorgen wij alleen naar
                Duitsland en België.
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    fontWeight={"semibold"}
                  >
                    Mijn product is na 2 werkdagen niet binnengekomen, wat nu?
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" />
                  ) : (
                    <AddIcon fontSize="12px" />
                  )}
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Neem dan even contact op met onze klantenservice.Dit kan
                telefonisch op werkdagen van 09:00 tot 17:00 uur op
                telefoonnummer: 0627382805. Of stuur een e-mail naar
                casaversenl@gmail.com en vermeld uw bestelnummer. Dan komen wij
                daar binnen 1 werkdag op terug.
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    fontWeight={"semibold"}
                  >
                    Zit er garantie op mijn producten?
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" />
                  ) : (
                    <AddIcon fontSize="12px" />
                  )}
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Alle producten van casaverse.nl zijn nieuw en ongebruikt. Daar
                zit dus standaard fabrieksgarantie op. De fabrieksgarantie kan
                per artikel verschillen, dus let op de productpagina hoeveel
                jaar garantie op dat product zit.
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    fontWeight={"semibold"}
                  >
                    Kan ik mijn product bij jullie afhalen?
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" />
                  ) : (
                    <AddIcon fontSize="12px" />
                  )}
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Wij hebben een centrale magazijn in Veenendaal. Neem{" "}
                <Link style={{ color: "blue" }} href={"/contact"}>
                  contact
                </Link>{" "}
                op met de klantenservice voor de mogelijkheden.
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    fontWeight={"semibold"}
                  >
                    Wat zijn jullie werktijden?
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" />
                  ) : (
                    <AddIcon fontSize="12px" />
                  )}
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Op werkdagen tussen 09:00 en 17:00 uur zijn we telefonisch
                bereikbaar.
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    fontWeight={"semibold"}
                  >
                    Krijg ik een Track&Trace code van mijn bestelling?
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" />
                  ) : (
                    <AddIcon fontSize="12px" />
                  )}
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Voor alle bestellingen sturen wij per e-mail een Track & Trace
                code op zodra deze bekend is.
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    fontWeight={"semibold"}
                  >
                    Ik heb geen bevestiging gekregen na het bestellen van een
                    product, wat nu?
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" />
                  ) : (
                    <AddIcon fontSize="12px" />
                  )}
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Neem{" "}
                <Link style={{ color: "blue" }} href={"/contact"}>
                  contact
                </Link>{" "}
                op met onze klantenservice. Zij kunnen controleren of alles goed
                is gegaan en u verder helpen bij het plaatsen van uw bestelling.
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    fontWeight={"semibold"}
                  >
                    Het product wat ik wil bestellen is uitverkocht, hoelang
                    duurt het voordat er een nieuwe voorraad komt?
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" />
                  ) : (
                    <AddIcon fontSize="12px" />
                  )}
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Dat kan per artikel verschillend zijn. Neem{" "}
                <Link style={{ color: "blue" }} href={"/contact"}>
                  contact
                </Link>{" "}
                op met de klantenservice voor de actuele levertijden en
                voorraden.
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    fontWeight={"semibold"}
                  >
                    Als ik mijn product terug stuur krijg ik mijn geld dan ook
                    terug?
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" />
                  ) : (
                    <AddIcon fontSize="12px" />
                  )}
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Zodra het artikel bij ons retour aankomt, wordt het
                gecontroleerd en afgemeld. Na het afmelden van uw bestelling
                ontvangt u binnen enkele werkdagen uw geld teruggestort op uw
                rekening waarmee u de bestelling heeft betaald.
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </Stack>
  );
};

export default VeelgesteldeVragen;
