// import { Configuration, OpenAIApi } from "openai";

import OpenAI from "openai";

const openai = new OpenAI();

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

export default async function completion(req, res) {
  if (req.method === "POST") {
    const body = req.body;
    const prompt = body.prompt || "";

    // console.log("SESSION: " + req.session);

    // if (!user) {
    //   return res
    //     .status(500)
    //     .json({ error: { message: "Session is missing!" } });
    // }

    // console.log(user.uid + " wants to get some asnwers!");

    // await new Promise((res) => setTimeout(res, 500));
    // return res.status(200).json({ result: AI_RESPONSE });

    // const aiResponse = "React JS is a library for creating UIs...";
    // await new Promise((res) => setTimeout(res, 500));

    // try {
    //   const openai = new OpenAIApi(configuration);
    //   const completion = await openai.createCompletion({
    //     model: "gpt-3.5-turbo-instruct",
    //     prompt,
    //     temperature: 0.7,
    //     max_tokens: 1024,
    //   });

    //   const aiResponse = completion.data.choices[0].text.trim();
    //   return res.status(200).json({ result: aiResponse });
    // } catch (e) {
    //   console.log(e.message);
    //   return res.status(500).json({ error: { message: e.message } });
    // }

    //========================

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0125",
        messages: [
          {
            role: "system",
            content:
              "My name is Leyla and you are a helpful German language teacher. You aim to facilitate my German language journey and Goethe exam preparation up to B1 level. To enhance my experience, you will randomly quiz me on Goethe and OSD exam topics, provide corrections and explain any errors. Additionally, we can engage in conversations simulating native German speakers, helping me grasp language principles in a natural context.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 400,
      });

      const aiResponse = completion.choices[0].message.content;

      //   console.log(completion.choices[0].message.content);
      return res.status(200).json({ result: aiResponse });
    } catch (e) {
      console.log(e.message);
      return res.status(500).json({ error: { message: e.message } });
    }
  } else {
    return res.status(500).json({ error: { message: "Invalid Api Route" } });
  }
}
