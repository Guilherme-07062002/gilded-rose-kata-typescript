import { Item, GildedRose } from "@/gilded-rose";

describe("testing gilded rose", () => {
  it("when the item 'sell in' date has passed, the quality decreases twice as fast", () => {
    const item = new Item("Item", 0, 10);
    const gildedRose = new GildedRose([item]);

    const result = gildedRose.updateQuality();

    expect(result[0].quality).toBe(8);
  });

  it("the quality of an item is never negative", () => {
    const item = new Item("Item", 0, 0);

    const gildedRose = new GildedRose([item]);
    const result = gildedRose.updateQuality();

    expect(result[0].quality).toBeGreaterThanOrEqual(0);
  });

  it("the aged brie increase your quality in +1 as it ages", () => {
    const item = new Item("Aged Brie", 16, 10);

    const gildedRose = new GildedRose([item]);
    const result = gildedRose.updateQuality();

    expect(result[0].quality).toBe(11);
  });

  it("quality of an item is never higher than 50", () => {
    const item = new Item("Aged Brie", 0, 50);
    const gildedRose = new GildedRose([item]);

    const result = gildedRose.updateQuality();

    expect(result[0].quality).toBeLessThanOrEqual(50);
  });

  it("the sulfuras never decreases in quality", () => {
    const item = new Item("Sulfuras, Hand of Ragnaros", null, 15);
    const gildedRose = new GildedRose([item]);

    const result = gildedRose.updateQuality();

    expect(result[0].quality).toBeGreaterThanOrEqual(15);
  });

  it("`backstage passes` and `aged brie` increases in quality as sell date approaches", () => {
    const item1 = new Item("Backstage passes to a TAFKAL80ETC concert", 15, 15);
    const item2 = new Item("Aged Brie", 15, 15);
    const gildedRose = new GildedRose([item1, item2]);

    const result = gildedRose.updateQuality();

    expect(result[0].quality).toBe(16);
    expect(result[1].quality).toBe(16);
  });

  it("backstage passes and aged brie cheese increases in +2 quality when sell date is lower or equal than 10", () => {
    const item = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 15);
    const gildedRose = new GildedRose([item]);

    const result = gildedRose.updateQuality();

    expect(result[0].quality).toBe(17);
  });

  it("backstage passes and aged brie cheese increases in +2 quality when sell date is lower or equal than 10", () => {
    const item = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 15);
    const gildedRose = new GildedRose([item]);

    const result = gildedRose.updateQuality();

    expect(result[0].quality).toBe(18);
  });

  it("quality of backstage passes is 0 after the concert", () => {
    const item = new Item("Backstage passes to a TAFKAL80ETC concert", 0, 15);
    const gildedRose = new GildedRose([item]);

    const result = gildedRose.updateQuality();

    expect(result[0].quality).toBe(0);
  });

  it("if aged brie sell date is lower than 0 and quality is lower than 50 increase quality +1", () => {
    const item = new Item("Aged Brie", -10, 40);
    const gildedRose = new GildedRose([item]);

    const result = gildedRose.updateQuality();

    expect(result[0].quality).toBe(42);
  });
});
