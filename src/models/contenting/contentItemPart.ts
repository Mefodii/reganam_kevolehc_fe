declare global {
  namespace Model {
    type ContentItemPartSM = any; // TODO;
    type ContentItemPartAM = ContentItemPartSM;
    type ContentItemPartDM = ContentItemPartAM;
    type ContentItemPartCreateProps = {
      formMode: 'CREATE';
    };
    type ContentItemPartUpdateProps = {
      contentItemPart: ContentItemPartDM;
      formMode: 'UPDATE';
    };
    type ContentItemPartProps =
      | ContentItemPartCreateProps
      | ContentItemPartUpdateProps;
    type ContentItemPartModel = Worker<
      ContentItemPartProps,
      ContentItemPartSM,
      ContentItemPartAM,
      ContentItemPartDM
    > & {
      mandatoryFields: string[];
    };
  }
}

export {};
