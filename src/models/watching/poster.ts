declare global {
  namespace Model {
    type PosterAM = {
      id?: number;
      image: string;
      group: number;
    };

    type PosterDM = PosterAM & {
      id: number;
    };
  }
}

export {};
