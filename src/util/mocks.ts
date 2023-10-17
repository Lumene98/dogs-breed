import { rest } from "msw";
import { setupServer } from "msw/node";

import { type IBreedsResponse, type IImageResponse } from "../services/api";

export const breed = "deerhound";
export const subBreed = "scottish";

export const breedsResponse: IBreedsResponse = {
  message: {
    breed: ["boston", "english", "french"],
    [breed]: [subBreed],
  },
  status: "success",
};

export const imageResponseRandom: IImageResponse = {
  message: ["https://images.dog.ceo/breeds/pomeranian/n02112018_3126.jpg"],
  status: "success",
};

export const imageResponseBreed: IImageResponse = {
  message: [
    "https://images.dog.ceo/breeds/deerhound-scottish/n02092002_1029.jpg",
  ],
  status: "success",
};

export const server = setupServer(
  rest.get("https://dog.ceo/api/breeds/list/all", (req, res, ctx) => {
    return res(ctx.json(breedsResponse));
  }),
  rest.get("https://dog.ceo/api/breeds/image/random/12", (req, res, ctx) => {
    return res(ctx.json(imageResponseRandom));
  }),
  rest.get(
    `https://dog.ceo/api/breed/${breed}/${subBreed}/images`,
    (req, res, ctx) => {
      return res(ctx.json(imageResponseBreed));
    },
  ),
);
