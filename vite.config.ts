import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import compressPlugin from 'vite-plugin-compression'; //静态资源压缩

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    compressPlugin({
      //gzip静态资源压缩
      verbose: true, // 默认即可
      disable: false, //开启压缩(不禁用)，默认即可
      deleteOriginFile: false, //删除源文件
      threshold: 10240, //压缩前最小文件大小
      algorithm: 'gzip', //压缩算法
      ext: '.gz', //文件类型
    }),
  ],
  // 打包配置
  build: {
    // 清除console和debugger
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    //警报门槛，限制大文件大小
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id: any) {
          // cicd打包会出错 暂时解决办法事手动部署
          if (id.includes('node_modules')) {
            return id.toString()?.split('node_modules/.pnpm/')[1]?.split('/')[0].toString();
          }
        },
      },
    },
  },
});
