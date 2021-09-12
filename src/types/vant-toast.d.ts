export interface VanToast {
  clear(): () => void;
}
declare module 'vant/types/toast' {
  interface VanToast {
    clear: () => void;
  }
}
