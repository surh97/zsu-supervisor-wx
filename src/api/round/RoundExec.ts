import service from '@/utils/request';
import { RoundExec } from '@/domains/round';

/** 获取轮次执行列表 */
export function listRoundExecApi(param: RoundExec) {
  return service.post('/v2/rounds/execs/executions/list', param);
}
