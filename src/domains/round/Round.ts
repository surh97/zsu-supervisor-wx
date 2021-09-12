/** 轮次 */
export default class Round {
  public static build(data: Round): Round {
    const round: Round = new Round();
    round.id = data.id;
    round.name = data.name;
    round.remarks = data.remarks;
    return round;
  }

  public static builds(datas: Round[]): Round[] {
    const rounds: Round[] = [];
    datas.forEach(
      (data: Round): void => {
        const round: Round = Round.build(data);
        rounds.push(round);
      },
    );
    return rounds;
  }

  /** 编号 */
  public id: number = null;
  /** 名 */
  public name: string = null;
  /** 备注 */
  public remarks: string = null;
}
