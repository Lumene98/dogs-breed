import {
  server,
  breedsResponse,
  imageResponseRandom,
  breed,
  subBreed,
  imageResponseBreed,
} from "util/mocks";
import { getBreeds, getImages } from "./api";

describe("Api:", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("Get Breeds:", async () => {
    const response = await getBreeds();

    expect(response).toMatchObject(breedsResponse);
  });

  test("Get Images:", async () => {
    const response = await getImages("", 12);

    expect(response).toMatchObject(imageResponseRandom);
  });

  test("Get Images with breed and subBreed:", async () => {
    const response = await getImages(breed + "/" + subBreed);

    expect(response).toMatchObject(imageResponseBreed);
  });
});
