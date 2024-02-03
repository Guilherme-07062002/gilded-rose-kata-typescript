import { Item, GildedRose } from "@/gilded-rose";

describe("testing gilded rose", () => {
  it('should define a object `Item`', () => {
    const item = new Item("Item", 15, 10);

    expect(item).toBeDefined();
  })

  it('should define a object `GildedRose`', () => {
    const gildedRose = new GildedRose();

    expect(gildedRose).toBeDefined();
  })

  it('should define a object `GildedRose` with a array of items', () => {
    const item1 = new Item("Item", 15, 10);
    const item2 = new Item("Item", 15, 10);
    const gildedRose = new GildedRose([item1, item2]);

    expect(gildedRose.items).toBeDefined();
    expect(gildedRose.items).toHaveLength(2);
  })

  it("decreases the `quality` and `sell in` of an item by 1 in the end day", () => {
    const item = new Item("Item", 15, 10);
    const gildedRose = new GildedRose([item]);

    const result = gildedRose.updateQuality();

    expect(result[0].sellIn).toBe(14);
    expect(result[0].quality).toBe(9);
  });

  it("when the item 'sell in' date has passed, the quality decreases twice as fast", () => {
    const item = new Item("Item", -1, 10);
    const gildedRose = new GildedRose([item]);

    const result = gildedRose.updateQuality();

    expect(result[0].quality).toBe(8);
  });

  it("the quality of an item is never negative", () => {
    const item = new Item("Item", 0, -5);

    const gildedRose = new GildedRose([item]);
    const result = gildedRose.updateQuality();

    expect(result[0].quality).toBeGreaterThanOrEqual(0);
  });

  it("the aged brie increase your quality in +1 as it ages", () => {
    const item = new Item("Aged Brie", 16, 49);

    const gildedRose = new GildedRose([item]);
    const result = gildedRose.updateQuality();

    expect(result[0].quality).toBe(50);
  });

  it("quality of an item is never higher than 50", () => {
    const item = new Item("Backstage passes to a TAFKAL80ETC concert", 1, 49);
    const gildedRose = new GildedRose([item]);

    const result = gildedRose.updateQuality();

    expect(result[0].quality).toBeLessThanOrEqual(50);
  });

  it("quality of an item is never higher than 50", () => {
    const item = new Item("Backstage passes to a TAFKAL80ETC concert", 1, 51);
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

  it("`backstage passes` increases +1 in quality as sell date approaches", () => {
    const item1 = new Item("Backstage passes to a TAFKAL80ETC concert", 15, 15);
    const gildedRose = new GildedRose([item1]);

    const result = gildedRose.updateQuality();

    expect(result[0].quality).toBe(16);
  });

  it("backstage passes increases +2 in quality when sell date is lower or equal than 10", () => {
    const item = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 15);
    const gildedRose = new GildedRose([item]);

    const result = gildedRose.updateQuality();

    expect(result[0].quality).toBe(17);
  });

  it("backstage passes  increases in +3 quality when sell date is lower or equal than 5", () => {
    const item = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 15);
    const gildedRose = new GildedRose([item]);

    const result = gildedRose.updateQuality();

    expect(result[0].quality).toBe(18);
  });

  it("quality of backstage go to 0 when sell in has passed", () => {
    const item = new Item("Backstage passes to a TAFKAL80ETC concert", -4, 15);
    const gildedRose = new GildedRose([item]);

    const result = gildedRose.updateQuality();

    expect(result[0].quality).toBe(0);
  });

  it("the `conjured` itens decrease the quality twice as fast as the normal items", () => {
    const item1 = new Item("Conjured", 15, 15);
    const item2 = new Item("Conjured", -1, 15);
    const gildedRose = new GildedRose([item1, item2]);

    const result = gildedRose.updateQuality();

    expect(result[0].quality).toBe(13);
    expect(result[1].quality).toBe(11);
  })
});
