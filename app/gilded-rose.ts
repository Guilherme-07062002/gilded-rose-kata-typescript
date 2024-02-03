export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  protected updateSulfura(item: Item) {
    item.quality = 80;
  }

  protected updateAgedBrie(item: Item) {
    item.quality += 1;
  }

  protected updateBackstagePasses(item: Item) {
    if (item.quality < 50) {
      if (item.sellIn < 0) {
        item.quality -= item.quality;
      } else if (item.sellIn < 5) {
        item.quality += 3;
      } else if (item.sellIn < 10) {
        item.quality += 2;
      } else {
        item.quality += 1;
      }
    }
  }

  protected updateConjured(item: Item) {
    if (item.sellIn > 0) {
      item.quality -= 2;
    } else {
      item.quality -= 4;
    }
  }

  protected updateItem(item: Item) {
    if (item.sellIn > 0) {
      item.quality -= 1;
    } else {
      item.quality -= 2;
    }
  }

  protected checkQuality(item: Item) {
    if (item.quality < 0) {
      item.quality = 0;
    } else if (item.quality > 50 && item.name !== "Sulfuras, Hand of Ragnaros") {
      item.quality = 50;
    }
  }

  public updateQuality() {
    this.items.map((item) => {
      item.sellIn -= 1;
      switch (item.name) {
        case "Sulfuras, Hand of Ragnaros":
          this.updateSulfura(item);
          break;
        case "Aged Brie":
          this.updateAgedBrie(item);
          break;
        case "Backstage passes to a TAFKAL80ETC concert":
          this.updateBackstagePasses(item);
          break;
        case "Conjured":
          this.updateConjured(item);
          break;
        default:
          this.updateItem(item);
      }
      this.checkQuality(item);
    })

    return this.items;
  }
}
