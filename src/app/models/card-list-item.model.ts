export class CardListItem {
  constructor(
    public id?: number,
    public code?: string,
    public amount?: number,
    public initialAmount?: number,
    public currency?: string,
    public deleted?: boolean,
    public history?: CardListItemHistory,
    public creationDate?: any
  ) {}
}

export class CardListItemHistory {
  constructor(
    public icon?: string,
    public title?: string,
    public description?: string,
    public date?: Date
  ) {}
}
