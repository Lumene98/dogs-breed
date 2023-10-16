export type SubBreed = string[];

export interface IBreeds {
  [breedName: string]: SubBreed;
}

interface IBaseResponse {
  message: unknown;
  status: string;
}

export interface IBreedsResponse extends IBaseResponse {
  message: IBreeds;
}

export interface IImageResponse extends IBaseResponse {
  message: string[];
}

export const getBreeds = async (): Promise<{
  message: IBreeds;
  status: string;
}> => {
  const response = await window.fetch("https://dog.ceo/api/breeds/list/all");

  const { message, status }: IBreedsResponse = await (<
    Promise<IBreedsResponse>
  >response.json());

  return { message, status };
};

export const getImages = async (
  breed: string,
  number: number = 10,
): Promise<{ message: string[]; status: string }> => {
  let url = "";
  if (breed) {
    url = `https://dog.ceo/api/breed/${breed}/images`;
  } else {
    url = `https://dog.ceo/api/breeds/image/random/${number}`;
  }
  const response = await window.fetch(url);

  const { message, status }: IImageResponse = await (<Promise<IImageResponse>>(
    response.json()
  ));

  return { message, status };
};
