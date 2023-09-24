const LEAP_API_KEY = "83523521-5710-4474-9b98-bddac7cd2b85";
const MODEL_ID = "37d42ae9-5f5f-4399-b60b-014d35e762a5";

const generateImage = async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const url = `https://api.tryleap.ai/api/v1/images/models/37d42ae9-5f5f-4399-b60b-014d35e762a5/inferences`;
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer ${LEAP_API_KEY}`,
      },
      body: JSON.stringify({
        prompt,
        negativePrompt: "asymmetric, watermarks",
        steps: 20,
        width: 512,
        height: 512,
        numberOfImages: 1,
        promptStrength: 7,
        seed: 4523184,
        enhancePrompt: false,
        upscaleBy: "x1",
        sampler: "ddim",
      }),
    };

    const response = await fetch(url, options);
    const json = await response.json();

    res.status(200).json(json);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const getImage = async (req, res) => {
  try {
    const { inferenceId } = req.params;
    await new Promise((resolve) => setTimeout(resolve, 25000));
    const url = `https://api.tryleap.ai/api/v1/images/models/37d42ae9-5f5f-4399-b60b-014d35e762a5/inferences/${inferenceId}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${LEAP_API_KEY}`,
      },
    };

    console.log("Fetching image from:", url);
    const fetchResponse = await fetch(url, options);
    const json = await fetchResponse.json();

    if (json.images && json.images.length > 0) {
      const outputImageUrl = json.images[0].uri;
      console.log("outputImageUrl", outputImageUrl);
      res.status(200).json({ imageUrl: outputImageUrl });
    } else {
      res.status(404).json({ error: "Image not found" });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = { generateImage, getImage };
