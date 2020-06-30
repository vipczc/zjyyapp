#!/bin/bash
echo "开始编译项目!"
npm run build
echo "开始上传静态资源到OSS!"
distPath="./public/dist"
ossPath="oss://jhyl-static-file/zj2y_app/dist"
ossutil64 cp $distPath $ossPath -r -u
echo "上传结束！"
echo "重新启动项目！"
pm2 restart zj2y_app_test