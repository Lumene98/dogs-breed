import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  type IBreedsResponse,
  getBreeds,
  getImages,
  type IImageResponse,
} from "./api";

const breed = "deerhound";
const subBreed = "scottish";

const breedsResponse: IBreedsResponse = {
  message: {
    breed: ["boston", "english", "french"],
  },
  status: "success",
};

const imageResponseRandom: IImageResponse = {
  message: ["https://images.dog.ceo/breeds/pomeranian/n02112018_3126.jpg"],
  status: "success",
};

const imageResponseBreed: IImageResponse = {
  message: [
    "https://images.dog.ceo/breeds/deerhound-scottish/n02092002_1029.jpg",
  ],
  status: "success",
};

describe("Api:", () => {
  const server = setupServer(
    rest.get("https://dog.ceo/api/breeds/list/all", (req, res, ctx) => {
      return res(ctx.json(breedsResponse));
    }),
    rest.get("https://dog.ceo/api/breeds/image/random/10", (req, res, ctx) => {
      return res(ctx.json(imageResponseRandom));
    }),
    rest.get(
      `https://dog.ceo/api/breed/${breed}/${subBreed}/images`,
      (req, res, ctx) => {
        return res(ctx.json(imageResponseBreed));
      },
    ),
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("Get Breeds:", async () => {
    const response = await getBreeds();

    expect(response).toMatchObject(breedsResponse);
  });

  test("Get Images:", async () => {
    const response = await getImages("");

    expect(response).toMatchObject(imageResponseRandom);
  });

  test("Get Images with breed and subBreed:", async () => {
    const response = await getImages(breed + "/" + subBreed);

    expect(response).toMatchObject(imageResponseBreed);
  });
});
