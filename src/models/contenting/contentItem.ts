declare global {
  namespace Model {
    type ContentItemSM = any; // TODO;
    type ContentItemAM = ContentItemSM;
    type ContentItemDM = ContentItemAM;
    type ContentItemCreateProps = {
      formMode: 'CREATE';
    };
    type ContentItemUpdateProps = {
      contentItem: ContentItemDM;
      formMode: 'UPDATE';
    };
    type ContentItemProps = ContentItemCreateProps | ContentItemUpdateProps;
    type ContentItemModel = Worker<
      ContentItemProps,
      ContentItemSM,
      ContentItemAM,
      ContentItemDM
    > & {
      mandatoryFields: string[];
    };
  }
}

export {};
