import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "@/assets/css/reset.less";
import "virtual:windi.css";
//引入Elmessage和Elloading的css样式文件
import "element-plus/theme-chalk/el-loading.css";
import "element-plus/theme-chalk/el-message.css";
import SolanaWallets from "solana-wallets-vue";
import "solana-wallets-vue/styles.css";

import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { Cluster } from "@/constants/index";

const walletOptions = {
  wallets: [new PhantomWalletAdapter()],
  cluster: Cluster,
  autoConnect: true,
};
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(SolanaWallets, walletOptions);
app.mount("#app");
