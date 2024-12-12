import {
  Divider,
  HStack,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";

const Retourneren = () => {
  return (
    <VStack
      w={{ base: "100%", sm: "100%", md: "80%" }}
      mx={"auto"}
      justifyContent={"center"}
      m={{ base: 2, sm: 2, md: "auto" }}
    >
      <Text fontSize={"2xl"} fontWeight={"bold"} my={5}>
        Vezenden & Retourneren
      </Text>
      <HStack
        w={"100%"}
        alignItems={"start"}
        flexDirection={{ base: "column", sm: "column", md: "row" }}
        justifyContent={"center"}
        my={5}
      >
        <VStack
          w={{ base: "100%", sm: "100%", md: "50%" }}
          p={{ base: 2, sm: 2, md: 0 }}
          justifyContent={"center"}
        >
          <HStack w={"100%"} justifyContent={"center"}>
            <Divider border={"1px solid black"} w={"20%"} />
            <Text fontSize={"medium"} w={"max-content"} fontWeight={"semibold"}>
              VERZENDING NEDERLAND & BELGIË
            </Text>
            <Divider border={"1px solid black"} w={"20%"} />
          </HStack>
          <Stack>
            <p>
              We doen altijd ons best om uw pakket zo snel mogelijk te
              verzenden. Daarom verzenden wij de meeste zendingen met PostNL of
              DHL binnen Nederland en België. Afhankelijk van het grootte van
              het pakket kan er voor een ander bezorgdienst gekozen worden.
            </p>
            <p>
              Zodra het artikel verzendklaar is gemaakt ontvangt u van PostNL of
              DHL een Track &amp; Trace code. Hiermee kunt u uw zending
              eenvoudig volgen.
            </p>
            <p>
              Voor artikelen die op voorraad zijn geldt op werkdagen voor 16.00
              uur besteld, dan wordt het dezelfde dag verzonden. Wij hanteren
              een levertijd van 1 tot 2 werkdagen.
            </p>
            <h5>Artikelen in nabestelling:</h5>
            <p>
              Voor artikelen die de status <strong>nabestelling</strong> hebben
              geldt over het algemeen een levertijd van{" "}
              <strong>4 tot 8 werkdagen.</strong>
            </p>
            <h5>
              <strong>Contact</strong>
            </h5>
            <p>
              Mocht uw zending niet binnen deze termijn zijn ontvangen, neem dan
              contact met ons op via{" "}
              <a style={{ color: "blue" }} href="mailto:casaversenl@gmail.com">
                casaversenl@gmail.com.
              </a>
            </p>
          </Stack>
        </VStack>
        <VStack
          w={{ base: "100%", sm: "100%", md: "50%" }}
          p={{ base: 2, sm: 2, md: 0 }}
          alignItems={"start"}
        >
          <HStack w={"100%"} justifyContent={"center"}>
            <Divider border={"1px solid black"} w={"20%"} />
            <Text fontSize={"medium"} w={"max-content"} fontWeight={"semibold"}>
              RETOURNEREN
            </Text>
            <Divider border={"1px solid black"} w={"20%"} />
          </HStack>
          <div>
            <p>
              U heeft het recht uw bestelling tot 14 dagen na ontvangst zonder
              opgave van reden te annuleren. U heeft na annulering nogmaals 14
              dagen om uw product retour te sturen. U krijgt dan het volledige
              orderbedrag gecrediteerd. Enkel de verzendkosten voor retour van u
              thuis naar onze webwinkel zijn voor eigen rekening. U kunt het
              artikel ook zelf brengen naar ons magazijn in Veenendaal.
            </p>
            <br />
            <p>
              Indien u gebruik maakt van uw herroepingsrecht, zal het product
              met alle geleverde toebehoren en - indien redelijkerwijze mogelijk
              - in de originele staat (dus niet geïnstalleerd en niet gebruikt)
              en in de originele verpakking aan ons geretourneerd worden.
            </p>
            <br />
            <p>
              Wij zullen vervolgens het verschuldigde orderbedrag binnen 14
              dagen na het ontvangen van uw retour terugstorten via de
              oorspronkelijke betaalmethode mits het product reeds in goede orde
              retour ontvangen is.
            </p>
          </div>
        </VStack>
      </HStack>
      <HStack
        w={"100%"}
        alignItems={"start"}
        flexDirection={{ base: "column", sm: "column", md: "row" }}
        justifyContent={"center"}
        my={5}
      >
        <VStack
          w={{ base: "100%", sm: "100%", md: "50%" }}
          p={{ base: 2, sm: 2, md: 0 }}
          justifyContent={"center"}
        >
          <HStack w={"100%"} justifyContent={"center"}>
            <Divider border={"1px solid black"} w={"20%"} />
            <Text fontSize={"medium"} w={"max-content"} fontWeight={"semibold"}>
              ARTIKEL RUILEN
            </Text>
            <Divider border={"1px solid black"} w={"20%"} />
          </HStack>
          <div>
            <p>
              Ruilen van onze producten is mogelijk. Ruilen is alleen mogelijk
              als de producten niet zijn gebruikt of geïnstalleerd. Wil je een
              artikel ruilen voor een soortgelijk artikel in een andere afmeting
              of kleur? Neem dan{" "}
              <Link style={{ color: "blue" }} href="/contact">
                contact
              </Link>{" "}
              op met onze klantenservice via{" "}
              <a style={{ color: "blue" }} href="mailto:casaversenl@gmail.com">
                casaversenl@gmail.com
              </a>
            </p>
            <br />
            <p>
              U kunt onze algemene voorwaarden&nbsp;
              <Link style={{ color: "blue" }} href="/algemene-voorwaarden">
                hier
              </Link>
              &nbsp;lezen.
            </p>
          </div>
        </VStack>
        <VStack
          w={{ base: "100%", sm: "100%", md: "50%" }}
          p={{ base: 2, sm: 2, md: 0 }}
          alignItems={"start"}
        >
          <HStack w={"100%"} justifyContent={"center"}>
            <Divider border={"1px solid black"} w={"20%"} />
            <Text fontSize={"medium"} w={"max-content"} fontWeight={"semibold"}>
              RETOURVOORWAARDEN
            </Text>
            <Divider border={"1px solid black"} w={"20%"} />
          </HStack>
          <div>
            <p>
              De volgende voorwaarden zijn van toepassing op het retourneren van
              artikelen:
            </p>
            <UnorderedList spacing={"10px"} my={5}>
              <ListItem>
                Artikelen die gebruikt of geinstalleerd zijn kunnen niet
                geretourneerd worden.
              </ListItem>
              <ListItem>Beschadig de doos niet en schrijf er niet op.</ListItem>
              <ListItem>
                Artikelen moeten worden geretourneerd in de originele verpakking
                metlabel of de sticker er nog aan.
              </ListItem>
              <ListItem>
                Het retourformulier dient volledig en correct te worden ingevuld
                en bij de geretourneerde artikelen te worden bijgesloten.
              </ListItem>
            </UnorderedList>
            <p>
              SimpleDeal.nl kan een vergoeding vragen voor artikelen die
              beschadigd zijn.
            </p>
          </div>
        </VStack>
      </HStack>
      <HStack
        w={"100%"}
        alignItems={"start"}
        flexDirection={{ base: "column", sm: "column", md: "row" }}
        justifyContent={"center"}
        my={5}
      >
        <VStack
          w={{ base: "100%", sm: "100%", md: "50%" }}
          p={{ base: 2, sm: 2, md: 0 }}
          justifyContent={"center"}
        >
          <HStack w={"100%"} justifyContent={"center"}>
            <Divider border={"1px solid black"} w={"20%"} />
            <Text fontSize={"medium"} w={"max-content"} fontWeight={"semibold"}>
              TERUGBETALINGEN
            </Text>
            <Divider border={"1px solid black"} w={"20%"} />
          </HStack>
          <div>
            <p>
              Als je artikelen hebt geretourneerd, wordt het aankoopbedrag
              teruggestort via dezelfde betaalmethode die je hebt gebruikt bij
              het bestellen. Zie hieronder voor meer informatie:
            </p>
            <UnorderedList spacing={"10px"} my={5}>
              <ListItem>
                <strong>Creditcard</strong>: het aankoopbedrag wordt automatisch
                binnen 1 tot 4 weken teruggestort op uw creditcardrekening.
              </ListItem>
              <ListItem>
                <strong>PayPal</strong>: verwerkt automatisch terugbetalingen.
              </ListItem>

              <ListItem>
                <strong>Giropay</strong>: het bedrag wordt binnen 2 tot 4
                werkdagen teruggestort op de rekening.
              </ListItem>
              <ListItem>
                <strong>iDeal</strong>: het bedrag wordt binnen 2 tot 4
                werkdagen op de rekening teruggestort.
              </ListItem>
              <ListItem>
                <strong>In3:</strong> Betaalverplichting komt automatisch te
                vervallen en het eerste aanbetaling zal binnen 2 tot 4 werkdagen
                teruggestort worden op de rekening.
              </ListItem>
            </UnorderedList>
          </div>
        </VStack>
        <VStack
          w={{ base: "100%", sm: "100%", md: "50%" }}
          p={{ base: 2, sm: 2, md: 0 }}
          alignItems={"start"}
        >
          <HStack w={"100%"} justifyContent={"center"}>
            <Divider border={"1px solid black"} w={"20%"} />
            <Text fontSize={"medium"} w={"max-content"} fontWeight={"semibold"}>
              GEEN ANTWOORD GEVONDEN?
            </Text>
            <Divider border={"1px solid black"} w={"20%"} />
          </HStack>
          <div>
            <p>Via onderstaande informatie kun je contact met ons opnemen:</p>
            <br />
            <p>
              <a style={{ color: "blue" }}>+31619103508</a> <br />
              Maandag - Vrijdag 9:00 - 18:00
            </p>
            <br />
            <p>
              <a style={{ color: "blue" }} href="mailto:casaversenl@gmail.com">
                casaversenl@gmail.com
              </a>
              <br />
              We antwoorden meestal binnen een uur
            </p>
          </div>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default Retourneren;
