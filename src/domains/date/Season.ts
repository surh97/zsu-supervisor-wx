/** 季度 */
export default class Season {
  public static build(data: Season): Season {
    const season: Season = new Season();
    season.id = data.id = undefined ? null : data.id;
    season.name = data.name = undefined ? null : data.name;
    return season;
  }

  public static builds(datas: Season[]): Season[] {
    const seasons: Season[] = [];
    datas.forEach(
      (data: Season): void => {
        const season: Season = Season.build(data);
        seasons.push(season);
      },
    );
    return seasons;
  }

  /** 编号 */
  public id: number = null;
  /** 季度 */
  public name: string = null;
}
