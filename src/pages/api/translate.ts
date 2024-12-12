import { NextApiRequest, NextApiResponse } from "next";

import { TextResult, Translator } from "deepl-node";

const translator = new Translator(process.env.DEEPL_API_KEY as string);

const translate = async (text: string | string[]) => {
  const result = await translator.translateText(text, null, "nl");
  return result;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { text } = req.body;
    const result: TextResult | TextResult[] = await translate(text);

    res.status(200).json({ result: (result as TextResult).text });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default handler;
