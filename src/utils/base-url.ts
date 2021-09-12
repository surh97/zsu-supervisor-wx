let baseUrl: string = '';

switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = 'http://localhost:8080';
    break;
  case 'production':
    baseUrl = 'https://ddpj.sysu.edu.cn/zsu-ssm';
    // baseUrl = 'https://192.168.3.93:8080/zsu-ssm';
    break;
}

export default baseUrl;
