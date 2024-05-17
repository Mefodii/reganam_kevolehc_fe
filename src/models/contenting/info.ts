declare global {
  namespace Model {
    type ContentingInfo = {
      contentItemPartStatusTypes: string[];
      downloadStatusTypes: string[];
      contentItemTypes: string[];
      fileExtensionTypes: string[];
      contentWatcherSourceTypes: string[];
      contentWatcherStatusTypes: string[];
    };
  }
}

export {};
