import deepl from "deepl-node";

const translator = new deepl.Translator(process.env.DEEPL_API_KEY as string);

const translate = async (text: string | string[]) => {
  try {
    const result = await translator.translateText(text, null, "nl");
    return result;
  } catch (error) {
    return { text: "Translate error" };
  }
};

export default translate;
