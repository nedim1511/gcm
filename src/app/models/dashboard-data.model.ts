export class DashboardData {
  constructor(
    public issuedGiftCards: {
      range: { date: Date; amount: number }[];
      total: number;
    },
    public issuedCash: {
      range: { date: Date; amount: number }[];
      total: number;
    },
    public redeemedGiftCards: {
      range: { date: Date; amount: number }[];
      total: number;
    },
    public redeemedCash: {
      range: { date: Date; amount: number }[];
      total: number;
    },
    public openGiftCards: {
      range: { date: Date; amount: number }[];
      total: number;
    },
    public openCash: {
      range: { date: Date; amount: number }[];
      total: number;
    },
    public currency?: string
  ) {}
}
