export class CardListItem {
  constructor(
    public id?: number,
    public code?: string,
    public amount?: number,
    public initialAmount?: number,
    public currency?: string,
    public deleted?: boolean
  ) {}
}
