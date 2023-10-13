type SubBreed = string[];

export interface Breeds {
  [breedName: string]: SubBreed;
}

interface BaseResponse {
  message: unknown;
  status: string;
}

interface BreedsResponse extends BaseResponse {
  message: Breeds;
}

interface ImageResponse extends BaseResponse {
  message: string[];
}

export const getBreeds = async (): Promise<{
  message: Breeds;
  status: string;
}> => {
  const response = await window.fetch("https://dog.ceo/api/breeds/list/all");

  const { message, status }: BreedsResponse = await (<Promise<BreedsResponse>>(
    response.json()
  ));

  return { message, status };
};

export const getImages = async (
  breed: string,
  number: number = 10,
): Promise<{ message: string[]; status: string }> => {
  let url = "";
  if (breed) {
    url = `https://dog.ceo/api/breed/${breed}/images/${number}`;
  } else {
    url = `https://dog.ceo/api/breeds/image/random/${number}`;
  }
  const response = await window.fetch(url);

  const { message, status }: ImageResponse = await (<Promise<ImageResponse>>(
    response.json()
  ));

  return { message, status };
};
