## 魔方解不开了怎么办，让程序来帮你。
只需用摄像头把魔方的六个面扫描一遍就能直接给出还原步骤。即使你的魔方不是标准配色或房间的照明情况特殊也可以通过颜色校准模式来识别。这款荷兰小哥发布的3阶魔方解算器“Qbr”已经在GitHub上开源。 https://github.com/kkoomen/qbr.git
遗憾的是这款qdr是python版本的，这里整理出vue版本，前端图片识别编码魔方，后端通过kkoomen解码，这里提供node-c++版本

```
步骤数: 20
复原教程: B2 U2 F' R U D' L' B' U L F U F2 R2 F2 D' F2 D R2 D2
1. 将魔方的后面旋转180°。
2. 将魔方的顶层旋转180°。
3. 将魔方的前面向左旋转90°。
...
20.将魔方的底层向右旋转90°。
```
## 安装方法
使用Qbr需要你的电脑装有node npm，Git以及一个摄像头。
安装方法如下
````
$ git clone --depth 1 https://github.com/toger2021/vue-cube.git
$ cd vue-cube
# 安装node module
$ npm install
# 启动vue程序即可
$ npm run dev
````

## vue-cube项目地址：
[https://github.com/toger2021/vue-cube.git](https://github.com/toger2021/vue-cube.git)
[https://gitee.com/taoren/vue-cube.git](https://gitee.com/taoren/vue-cube.git)

## cube-java java实现以及JFrame的实现
[https://github.com/toger2021/cube-java](https://github.com/toger2021/cube-java)
[https://gitee.com/taoren/cube-java.git](https://gitee.com/taoren/cube-java.git)

## cube-kociemba 优化后的jar包源文件
[https://github.com/toger2021/demo-cube.git](https://github.com/toger2021/demo-cube.git)]
[https://gitee.com/taoren/demo-cube.git](https://gitee.com/taoren/demo-cube.git)
maven 引用使用
```
<dependency>
            <groupId>io.github.toger2021</groupId>
            <artifactId>cube-kociemba</artifactId>
            <version>1.0.1</version>
 </dependency>
```

## 参考链接：
[1]http://programmablebrick.blogspot.com/2017/02/rubiks-cube-tracker-using-opencv.html
[2]https://www.youtube.com/watch?v=ixTddQQ2Hs4
[色差计算(颜色之间的相似度计算)] https://blog.csdn.net/qq_16564093/article/details/80698479
