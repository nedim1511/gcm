import { Pipe, PipeTransform } from "@angular/core";
import { CardListItem } from "../models/card-list-item.model";

@Pipe({ name: "giftCardFilter" })
export class GiftCardFilterPipe implements PipeTransform {
  /**
   * Transform
   *
   * @param {CardListItem[]} items
   * @param {string} searchText
   * @returns {CardListItem[]}
   */
  transform(items: CardListItem[], searchText: string): CardListItem[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter((it) => {
      return (
        it.code.toLowerCase().includes(searchText) ||
        it.amount == +searchText ||
        it.id.toString().includes(searchText)
      );
    });
  }
}
