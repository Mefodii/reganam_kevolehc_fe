declare global {
  namespace Model {
    type PosterSM = {
      id?: number;
      image: string;
      group: number;
    };

    type PosterDM = PosterSM & {
      id: number;
    };
  }
}

export const poster = {};
