declare global {
  namespace Model {
    type WatchingInfo = {
      watchingTypes: { anime?: string; serial?: string; movie?: string };
      statusTypes: string[];
      airStatusTypes: string[];
    };
  }
}

export {};
