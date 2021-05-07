<template>
  <div class="camera_outer">
    <div class="chart-wrapper" style="display: none">
      <bar-chart :dataseries="dataseries" :datax="dataxx" />
    </div>
    <div class="flex">
      <div id="refreshDataList" class="img-box">
        <ul style="display: flex;">
        <el-li>
           <div class="container" style="float:left;">
          <video
        v-show="showThisVideo"
        id="videoCamera"
        :width="videoWidth"
        :height="videoHeight"
        autoplay
        @dblclick="setImage()"
      />
      <div class="img-container" style="float:left;" @dblclick="sureSavaHandle">
        <canvas
          v-show="showThisCancas"
          id="canvasCamera"
          style="display: block"
          :width="videoWidth"
          :height="videoHeight"
        />
        </div>
      </div>
        </el-li>
        <el-li>
          <img id="imgU" :style="Pcolor[U]" :src="imgs[U]" :alt="U" width="300" height="300" @click="setImage(U)"> <span @click="del(U)"><em class="el-icon-delete" /></span>
        </el-li>
        <el-li>

    <div style="float:left;">
      <button @click="getCompetence()">打开摄像头</button>
      <button @click="stopNavigator()">关闭摄像头</button>
      <BR/>
      <input v-model="step" placeholder="步长" size="4">
      <input v-model="filterp" placeholder="容差" size="4">
      <input v-model="lmin" placeholder="lmin" size="4">
      <input v-model="lmax" placeholder="lmax" size="4">
      <BR/>
      <button @click="makeCubeStr()">开始编码</button>
      <BR/>
      <el-input v-if="inputedit" v-model="cubestr" style="width:250px" type="textarea" rows="6" @blur="cancelEdit()" />
      <div v-else style="" @click="confirmEdit()" v-html="cubestr">cubestr</div>
      <div v-html="reskociembastr">reskociembastr</div>
    </div>
        </el-li>
        </ul>
        <ul>
        <el-li><img id="imgL" :style="Pcolor[L]" :src="imgs[L]" :alt="L" width="300" height="300" @click="setImage(L)"> <span @click="del(L)"><em class="el-icon-delete" /></span></el-li>
        <el-li><img id="imgF" :style="Pcolor[F]" :src="imgs[F]" :alt="F" width="300" height="300" @click="setImage(F)"> <span @click="del(F)"><em class="el-icon-delete" /></span></el-li>
        <el-li><img id="imgR" :style="Pcolor[R]" :src="imgs[R]" :alt="R" width="300" height="300" @click="setImage(R)"> <span @click="del(R)"><em class="el-icon-delete" /></span></el-li>
        <el-li><img id="imgB" :style="Pcolor[B]" :src="imgs[B]" :alt="B" width="300" height="300" @click="setImage(B)"> <span @click="del(B)"><em class="el-icon-delete" /></span></el-li>
        </ul>
        <ul>
        <el-li style="margin: 0 80% 0 20%;"><img id="imgD" :style="Pcolor[D]" :src="imgs[D]" :alt="D" width="300" height="300" @click="setImage(D)"> <span @click="del(D)"><em class="el-icon-delete" /></span></el-li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import BarChart from './components/BarChart'
import { solve } from '@/api/kociemba'
import lang from './translations/zh.json'
const animationDuration = 6000
var colorList = [
  '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
  '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
  '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
]
export default {
  components: {
    BarChart
  },
  data() {
    return {
      checkCube: false, // 是否检查魔方数据
      myCropper: null, // 截图器
      inputedit: false,
      cubestr: '', // 魔方编码
      reskociembastr: '', // 魔方解码
      videoWidth: 300, // 视频width
      videoHeight: 300,
      imgs: [], // 魔方图
      targetImageDatas: { 'U': {}, 'R': {}, 'F': {}, 'D': {}, 'L': {}, 'B': {}}, // 截图数据暂存
      step: 10, // 像素抽取步长
      filterp: 25, // 颜色识别容差
      lmin: 20, // 颜色分布阀值
      lmax: 250, // 颜色分布阀值

      currentP: 'U',
      U: 'U', // 魔方上
      R: 'R', // 右
      F: 'F', // 前
      D: 'D', // 下
      L: 'L', // 左
      B: 'B', // 后
      Pcolor: {
        U: { border: '1px #000000 solid' },
        R: '',
        F: '',
        D: '',
        L: '',
        B: ''
      },
      thisCancas: null, // 画布
      thisContext: null, // 画布内容
      thisVideo: null, // 视频
      showThisVideo: true, // 视频框是否显示
      showThisCancas: false, // 画布是否显示
      dataseries: [{ // 色彩分布直方图
        name: '数量',
        type: 'bar',
        stack: 'vistors',
        barWidth: '60%',
        data: [79, 52, 200, 334, 390, 330, 220],
        itemStyle: {
          normal: {
            // 好，这里就是重头戏了，定义一个list，然后根据索引取得不同的值，这样就实现了，
            color: function(params) {
              return colorList[params.dataIndex]
            }, // 以下为是否显示，显示位置和显示格式的设置了
            label: {
              show: false,
              position: 'top',
              // formatter: '{c}'
              formatter: '{b}\n {c}'
            }}
        },
        animationDuration
      }],
      dataxx: [{
        type: 'category',
        data: [79, 52, 200, 334, 390, 330, 220],
        axisTick: {
          alignWithLabel: true
        }
      }]
    }
  },
  watch: {
    cubestr(curVal, oldVal) {
      // if (curVal.length > this.titleMaxLength) {
      //   this.cubestr = String(curVal).slice(0, this.titleMaxLength);
      // }
      this.cubestr = curVal.toUpperCase().replace(/[^URFDLB\s]/g, '')
      this.makeSolve()
    }
  },
  mounted() {
    this.getCompetence()
    // 监听键盘按键事件
    const self = this
    this.$nextTick(function() {
      document.addEventListener('keyup', function(e) {
        // 此处填写你的业务逻辑即可
        if (e.keyCode === 27) {
          self.sureCancelHandle()
        }
      })
    })
  },
  methods: {
    // 调用权限（打开摄像头功能）
    getCompetence(position) {
      var _this = this

      this.thisCancas = document.getElementById('canvasCamera')
      this.thisContext = this.thisCancas.getContext('2d')
      this.thisVideo = document.getElementById('videoCamera')
      // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {}
      }
      // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
      // 使用getUserMedia，因为它会覆盖现有的属性。
      // 这里，如果缺少getUserMedia属性，就添加它。
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function(constraints) {
          // 首先获取现存的getUserMedia(如果存在)
          var getUserMedia =
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.getUserMedia
          // 有些浏览器不支持，会返回错误信息
          // 保持接口一致
          if (!getUserMedia) {
            return Promise.reject(
              new Error('getUserMedia is not implemented in this browser')
            )
          }
          // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
          return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject)
          })
        }
      }
      var constraints = {
        audio: false,
        video: {
          width: this.videoWidth,
          height: this.videoHeight,
          transform: 'scaleX(-1)'
        }
      }
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
          // 旧的浏览器可能没有srcObject
          if ('srcObject' in _this.thisVideo) {
            _this.thisVideo.srcObject = stream
          } else {
            // 避免在新的浏览器中使用它，因为它正在被弃用。
            _this.thisVideo.src = window.URL.createObjectURL(stream)
          }
          _this.thisVideo.onloadedmetadata = function(e) {
            _this.thisVideo.play()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    cancelEdit() {
      this.inputedit = false
    },
    confirmEdit() {
      this.inputedit = true
    },
    sureCancelHandle() {
    },
    sureSavaHandle() {},
    makeCubeStr() {
      var _this = this
      console.log('_this.targetImageDatas', _this.targetImageDatas, Object.keys(_this.targetImageDatas))
      if (Object.keys(_this.targetImageDatas).length !== 6) {
        _this.reskociembastr = lang.zh.haventScannedAllSides
        if (_this.checkCube) return
      }
      var cubebox = []
      var cubemaster = {}
      var imageData
      for (var cubei1 in _this.targetImageDatas) {
        imageData = _this.targetImageDatas[cubei1]
        cubemaster[cubei1] = _this.getImagePx(imageData, Math.floor(imageData.width / 2), Math.floor(imageData.height / 2))
        _this.Pcolor[cubei1] = { border: '3px ' + cubemaster[cubei1]['color'] + ' solid' }
      }
      for (var cubei in _this.targetImageDatas) {
        imageData = _this.targetImageDatas[cubei]
        var stepx = Math.floor(imageData.width / 3)
        var stepy = Math.floor(imageData.height / 3)
        cubebox[cubei] = {}
        cubebox[cubei]['pois'] = []
        cubebox[cubei]['poisColor'] = []
        cubebox[cubei]['cubeStr'] = []
        cubebox[cubei]['chkall'] = true
        for (var ciy = Math.floor(stepy / 2); ciy < imageData.height; ciy += stepy) {
          for (var cix = Math.floor(stepx / 2); cix < imageData.width; cix += stepx) {
            console.log('*****************cubei-cix-ciy-', cubei, cix, ciy, '************')
            var px = _this.getImagePx(imageData, cix, ciy)
            cubebox[cubei].pois.push(px)
            var haschk = false
            var ddback = 15000
            var ccback = ' '
            for (var cc in cubemaster) {
              // if (_this.chkRGBASHSL(cubemaster[cc].rgbh, px.rgbh, _this.filterp, true)) {
              //   cubebox[cubei].cubeStr.push(cc)
              //   haschk = true
              //   break
              // }
              // chkRGBLAB
              var { result, dd } = _this.chkRGBLAB(cubemaster[cc].rgbh, px.rgbh, _this.filterp, true)
              if (result) {
                cubebox[cubei].cubeStr.push(cc)
                haschk = true
                break
              } else if (dd < ddback) {
                ddback = dd
                ccback = cc
                console.log('chkRGBLAB->false1', cc, result, dd, ccback, ddback)
              } else {
                console.log('chkRGBLAB->false2', cc, result, dd, ccback, ddback)
              }
            }
            if (!haschk) {
              cubebox[cubei].cubeStr.push(ccback)
              cubebox[cubei]['chkall'] = false
            }
          }
        }
      }
      console.log('cubemaster', cubemaster, '\n cubebox', cubebox)
      _this.cubestr = ''

      if (Object.keys(cubebox) !== 6) {
        _this.reskociembastr = lang.zh.haventScannedAllSides
        if (_this.checkCube) return
      }
      for (var cubeii in _this.targetImageDatas) {
        if (cubebox[cubeii].cubeStr.length !== 9) {
          _this.reskociembastr = lang.zh.haventScannedAllSides
          if (_this.checkCube) return
        }
        _this.cubestr += cubebox[cubeii].cubeStr.join('') + '\n'
        console.log('cubebox-' + cubeii + '\n cubeStr', cubebox[cubeii].cubeStr.join(''))
      }
      _this.makeSolve()
    },
    makeSolve() {
      var _this = this
      var reqcubestr = _this.cubestr.replace(/\s+\n+/g, '')
      console.log('reqcubestr', reqcubestr)
      solve({ cubeStr: reqcubestr }).then(response => {
        console.log('solve.response', response)
        if (response.code === 20000) {
          _this.reskociembastr = _this.cubeStr2Zhcn(response.data)
        } else {
          _this.reskociembastr = response
        }
      })
    },
    cubeStr2Zhcn(cstr) {
      console.log('lang', lang)
      // cstr = "U' B L U' R D2 B D F2 D' F' U L2 U R2 U D2 R2 F2 D2"
      var cstrs = cstr.split(' ')
      for (var i in cstrs) {
        if (cstrs[i]) {
          cstrs[i] = cstrs[i] + '：' + lang.zh.solveManual[cstrs[i]]
        }
      }
      return cstrs.join(';<BR/>')
    },
    //  绘制图片（拍照功能）
    setImage(position) {
      var _this = this
      position = position || _this.currentP
      console.log('_this.currentP', _this.currentP)
      var ctx = _this.thisContext
      // 点击，canvas画图, 创建画布
      ctx.drawImage(
        _this.thisVideo, // 像素员
        0,
        0,
        _this.videoWidth,
        _this.videoHeight
      )
      // var imgdata = ctx.getImageData(0, 0, 300, 300)
      // _this.grayscale(imgdata) // 黑白化
      // _this.hashColor(imgdata, _this.step, _this.filterp, _this.lmin, _this.lmax) // 珊格化图片色彩，统计色彩分布
      // ctx.putImageData(imgdata, 0, 0)

      // _this.thisContext.lineWidth = 5
      // 绘画矩形
      // _this.thisContext.strokeRect(75, 140, 150, 110) // 起点 宽高 绘制
      // _this.thisContext.fillRect(130, 190, 40, 60) // 起点宽高 填充
      // ctx.font = '12px serif'
      // ctx.fillText('你好 魔方', 50, 100)
      // Roof
      // _this.thisContext.beginPath() // 绘制轨迹
      // _this.thisContext.moveTo(50, 140) // 移动到起始点
      // _this.thisContext.lineTo(150, 60) // 划线
      // _this.thisContext.lineTo(250, 140) // 划线
      // _this.thisContext.closePath() // 轨迹结束
      // _this.thisContext.stroke()

      // 获取图片base64链接
      // console.log('this.thisCancas', _this.thisCancas, _this.thisCancas)
      // var image = this.thisCancas.toDataURL('image/png')
      var image
      // var image = this.thisCancas.toDataURL('image/jpeg')
      // _this.$set(_this.imgs, position, image)// base 64 图片地址形成预览
      // _this.$set(_this.imgfiles, position, _this.dataURLtoFile(image, position))
      // _this.imgs.push({ position: image })// base 64 图片地址形成预览
      // _this.imgfiles.push({ position: _this.dataURLtoFile(image, position) })
      // console.log('imgfiles', _this.imgfiles, _this.imgs)

      if (_this.myCropper) _this.myCropper.destroy()
      _this.myCropper = new Cropper(_this.thisCancas, {
        viewMode: 1,
        dragMode: 'none',
        initialAspectRatio: 1,
        aspectRatio: 1,
        background: false,
        autoCropArea: 0.6,
        zoomOnWheel: false
      })
      _this.showThisCancas = true
      _this.showThisVideo = false
      _this.sureSavaHandle = function() {
        var scancas = _this.myCropper.getCroppedCanvas({
          imageSmoothingQuality: 'high'
        })
        image = scancas.toDataURL('image/jpeg')

        var ctxx = scancas.getContext('2d')
        console.log('scancas.images', ctxx)

        _this.targetImageDatas[position] = ctxx.getImageData(0, 0, scancas.width, scancas.height)

        image = scancas.toDataURL('image/jpeg')

        _this.$set(_this.imgs, position, image)// base 64 图片地址形成预览 设置数组并触发更新的方法 _this.$set(array, index, data)
        // _this.$set(_this.imgfiles, position, _this.dataURLtoFile(image, position))
        _this.myCropper.destroy()
        _this.showThisCancas = false
        _this.showThisVideo = true
        _this.sureSavaHandle = function() {}
        switch (_this.currentP) {
          case 'U':
            _this.currentP = 'L'
            break
          case 'R':
            _this.currentP = 'B'
            break
          case 'F':
            _this.currentP = 'R'
            break
          case 'D':
            _this.currentP = 'U'
            break
          case 'L':
            _this.currentP = 'F'
            break
          case 'B':
            _this.currentP = 'D'
            break
          default:
            _this.currentP = 'U'
        }
        console.log('_this.currentP2', _this.currentP)
      }
      _this.sureCancelHandle = function() {
        if (this.myCropper) this.myCropper.destroy()
        this.showThisCancas = false
        this.showThisVideo = true
        _this.sureCancelHandle = function() {}
        _this.sureSavaHandle = function() {}
      }
    },
    // base64转文件
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(',')
      var mime = arr[0].match(/:(.*?);/)[1]
      var bstr = atob(arr[1])
      var n = bstr.length
      var u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, { type: mime })
    },
    del(i) { // 根据下标删除
      this.$delete(this.imgs, i)
      // this.$delete(this.imgfiles, i)
      // this.imgfiles.splice(i)
      // this.imgs.splice(i)
      console.log('images', this.imgs)
    }, // 关闭摄像头
    stopNavigator() {
      this.thisVideo.srcObject.getTracks()[0].stop()
    }, // 图片黑白化
    grayscale(imageData) {
      const data = imageData.data
      for (var i = 0; i < data.length; i += 4) {
        var avg = (data[i] + data[i + 1] + data[i + 2]) / 3
        data[i] = avg // red
        data[i + 1] = avg // green
        data[i + 2] = avg // blue
      }
    }, // 图片相似检测lab
    chkRGBLAB(p1, p2, d, showlog = false) {
      var r1 = p1[0]
      var g1 = p1[1]
      var b1 = p1[2]
      var r2 = p2[0]
      var g2 = p2[1]
      var b2 = p2[2]
      var rmean = r1 + r2
      var dR = r1 - r2
      var dG = g1 - g2
      var dB = b1 - b2
      var dd = (2 + rmean / 256) * (dR ** 2) + 4 * (dG ** 2) + (2 + (255 - rmean) / 256) * (dB ** 2)
      var result = dd < d ** 2
      if (showlog === true) {
        console.log('p1', p1, '\n p2', p2, '\n d', dR, dG, dG, rmean, Math.floor(dd), d ** 2, result)
      }

      return { result, dd }
    }, // 图片相似检测lab
    chkRGB(p1, p2, d, showlog) {
      var x1 = p1[0]
      var y1 = p1[1]
      var z1 = p1[2]
      var x2 = p2[0]
      var y2 = p2[1]
      var z2 = p2[2]
      var k1 = (x1 / y1).toFixed(2) || 1
      if (y1 === 0) k1 = 1
      var k2 = (x1 / z1).toFixed(2) || 1
      if (z1 === 0) k2 = 1
      var k3 = (y1 / z1).toFixed(2) || 1
      if (z1 === 0) k3 = 1
      var dx, dy, dz
      if (k1 > 1) {
        dx = (d / k1).toFixed(2)
        dy = d
      } else {
        dx = d
        dy = d * k1
      }
      if (k2 > 1) {
        dx = Math.min((d / k2).toFixed(2), dx)
        dz = d
      } else {
        dz = d * k2
      }

      if (k3 > 1) {
        dy = Math.min((d / k3).toFixed(2), d)
        dz = Math.min(dz, d)
      } else {
        dz = Math.min(d * k3, d)
      }
      if (showlog === true) {
        console.log('dx', p1, p2, '\n k', k1, k2, k3, '\n dmax', dx, dy, dz, '\n d', x1 - x2, y1 - y2, z1 - z2)
      }
      // dx = d
      // dy = d
      // dz = d
      if (Math.abs(x1 - x2) > dx) return false
      if (Math.abs(y1 - y2) > dy || Math.abs(z1 - z2) > dz) return false
      return true
    }, // 图片相似检测HSL
    chkRGBASHSL(p1, p2, d, showlog) {
      var x1 = p1[0]
      var y1 = p1[1]
      var z1 = p1[2]
      var x2 = p2[0]
      var y2 = p2[1]
      var z2 = p2[2]
      var p1_h = this.RGB2HSL(x1, y1, z1)
      var p2_h = this.RGB2HSL(x2, y2, z2)
      var dh0 = 0
      if (p1_h[1] > p2_h[1]) {
        dh0 = p1_h[1] / p2_h[1]
      } else {
        dh0 = p2_h[1] / p1_h[1]
      }
      if (showlog === true) {
        console.log('p1', p1, p1_h, '\n p2', p2, p2_h)
      }
      if (p1_h[1] < 0.15 && p2_h[1] < 0.15) return true
      if (p1_h[2] < 0.05 && p2_h[2] < 0.05) return true
      if (Math.abs(p1_h[0] - p2_h[0]) > dh0) return false
      return true
    },
    sleep(d) {
      for (var t = Date.now(); Date.now() - t <= d;);
    },
    setImagePx(imageData, x, y, px) {
      var psyx = imageData.width * 4 * y + x * 4
      imageData.data[psyx] = px[0]
      imageData.data[psyx + 1] = px[1]
      imageData.data[psyx + 2] = px[2]
      imageData.data[psyx + 3] = px[3]
    }, // RGB 转换成 color16进制
    RGBtoColor(RGBH) {
      return ('#' + RGBH[0].toString(16).toUpperCase().padStart(2, '0') + RGBH[1].toString(16).toUpperCase().padStart(2, '0') + RGBH[2].toString(16).toUpperCase().padStart(2, '0'))
    }, // hsl转换成rgb
    HSL2RGB(H = 0, S = 0, L = 0, stringMode = false) {
      const C = (1 - Math.abs(2 * L - 1)) * S
      const X = C * (1 - Math.abs(((H / 60) % 2) - 1))
      const m = L - C / 2
      const vRGB = []
      if (H >= 0 && H < 60) {
        vRGB.push(C, X, 0)
      } else if (H >= 60 && H < 120) {
        vRGB.push(X, C, 0)
      } else if (H >= 120 && H < 180) {
        vRGB.push(0, C, X)
      } else if (H >= 180 && H < 240) {
        vRGB.push(0, X, C)
      } else if (H >= 240 && H < 300) {
        vRGB.push(X, 0, C)
      } else if (H >= 300 && H < 360) {
        vRGB.push(C, 0, X)
      }
      const [vR, vG, vB] = vRGB
      const R = 255 * (vR + m)
      const G = 255 * (vG + m)
      const B = 255 * (vB + m)

      if (stringMode) {
        return `rgb(${R},${G},${B})`
      }

      return [R, G, B]
    }, // RGB转换成HSL
    RGB2HSL(R = 0, G = 0, B = 0, stringMode = false) {
      const _R = R / 255
      const _G = G / 255
      const _B = B / 255
      const Cmax = Math.max(_R, _G, _B)
      const Cmin = Math.min(_R, _G, _B)
      const V = Cmax - Cmin

      let H = 0
      if (V === 0) {
        H = 0
      } else if (Cmax === _R) {
        H = 60 * (((_G - _B) / V) % 6)
      } else if (Cmax === _G) {
        H = 60 * ((_B - _R) / V + 2)
      } else if (Cmax === _B) {
        H = 60 * ((_R - _G) / V + 4)
      }

      H = Math.floor(this.backCycle(H, 360))
      const L = this.numberFixed((Cmax + Cmin) / 2)
      const S = V === 0 ? 0 : this.numberFixed(V / (1 - Math.abs(2 * L - 1)))

      if (stringMode) {
        return `hsl(${H},${this.numberFixed(100 * S)}%,${this.numberFixed(100 * L)}%)`
      }
      return [H, S, L]
    }, // 360度循环计算
    backCycle(num, cycle) {
      let index = num % cycle
      if (index < 0) {
        index += cycle
      }
      return index
    },
    numberFixed(num = 0, count = 3) {
      const power = Math.pow(10, count)
      return Math.floor(num * power) / power
    },
    getImagePx(imageData, x, y) {
      var psyx = imageData.width * 4 * y + x * 4
      var rgbh = [imageData.data[psyx], imageData.data[psyx + 1], imageData.data[psyx + 2], imageData.data[psyx + 3]]
      return { 'color': this.RGBtoColor(rgbh), 'rgbh': rgbh }
    }, // 按顶点步长填充方块色区
    fillbox(imageData, ps, step) {
      for (var y = 0; y < step; y++) {
        for (var x = 0; x < step; x++) {
          var psyx = ps + imageData.width * 4 * y + x * 4
          imageData.data[psyx] = imageData.data[ps]
          imageData.data[psyx + 1] = imageData.data[ps + 1]
          imageData.data[psyx + 2] = imageData.data[ps + 2]
          imageData.data[psyx + 3] = imageData.data[ps + 3]
        }
      }
    }, // 图形按色区格式化
    hashColor(imageData, step, filterp, countlevelmin, countlevelmax) {
      var _this = this
      const data = imageData.data
      var hashpois = {}
      var pois = []
      /** 取出取样点*/
      for (var j = 0; j < imageData.height / step; j++) {
        for (var i = 0; i < imageData.width / step; i++) {
          var ps = imageData.width * 4 * step * j + i * step * 4 // 计算每个方块的起始点位
          var hashkey = data[ps] + ', ' + data[ps + 1] + ', ' + data[ps + 2] + ', ' + data[ps + 3]
          var pi = {
            'ixj': i + 'x' + j,
            'ps': ps,
            'hashkey': hashkey,
            'RGBH': [data[ps], data[ps + 1], data[ps + 2], data[ps + 3]]
          }
          pois.push(pi)
        }
      }
      /** 判断相似取样点并统一颜色值*/
      var pi1, pi2
      while (pois.length > 0) {
        // console.log('pois1-length-' + index1, pois.length)
        pi1 = pois[0]
        pois.splice(0, 1)
        hashkey = pi1.hashkey
        if (!(hashkey in hashpois)) {
          hashpois[hashkey] = {
            'color': _this.RGBtoColor(pi1.RGBH),
            'hashkey': hashkey,
            'RGBH': pi1.RGBH,
            'count': 1,
            'pois': [pi1]
          }
        }
        // hashpois[hashkey]['count'] = hashpois[hashkey]['count'] + 1
        // hashpois[hashkey].pois.push(pi1)
        _this.fillbox(imageData, pi1.ps, step)
        var index2 = 0
        while (index2 < pois.length) {
          // console.log('pois2-length-' + index2, pois.length)
          pi2 = pois[index2]
          if (_this.chkRGBLAB(pi1.RGBH, pi2.RGBH, filterp)) {
            // pois[index2]['checked'] = true
            data[pi2.ps] = data[pi1.ps]
            data[pi2.ps + 1] = data[pi1.ps + 1]
            data[pi2.ps + 2] = data[pi1.ps + 2]
            data[pi2.ps + 3] = data[pi1.ps + 3]
            pois.splice(index2, 1)
            // console.log('pi1', pi1, 'pi2', pi2)
            hashpois[hashkey]['count'] = hashpois[hashkey]['count'] + 1
            hashpois[hashkey].pois.push(pi2)
            _this.fillbox(imageData, pi2.ps, step)
          } else {
            index2++
          }
        }
      }
      // 统计取样点分布保留有效取样点
      var hashpois2 = []
      _this.dataxx[0].data = []
      _this.dataseries[0].data = []
      colorList = []
      for (var hi in hashpois) {
        if (hashpois[hi].count > countlevelmin && hashpois[hi].count < countlevelmax) {
          _this.dataxx[0].data.push(hashpois[hi]['color'])
          colorList.push(hashpois[hi]['color'])
          _this.dataseries[0].data.push(hashpois[hi].count)
          hashpois2.push(hashpois[hi])
        }
      }
      console.log('hashpois', hashpois, '\n hashpois2', hashpois2, '\n colorList', colorList, '\n dataseries', _this.dataseries[0].data)
      // console.log('chk', _this.chkRGB([189, 173, 176, 255], [189, 173, 176, 255], _this.filterp, true))
      return
    }
  }
}
</script>
  <style lang="scss" scoped>
.camera_outer {
  position: relative;
  overflow: hidden;
  background-size: 100%;
  video,
  canvas,
  .tx_img {
    -moz-transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    -o-transform: scaleX(-1);
    transform: scaleX(-1);
  }
  .btn_camera {
    position: absolute;
    bottom: 4px;
    left: 0;
    right: 0;
    height: 50px;
    background-color: rgba(0, 0, 0, 0.3);
    line-height: 50px;
    text-align: center;
    color: #ffffff;
  }
  .bg_r_img {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
  }
  .img_bg_camera {
    position: absolute;
    right: 0;
    top: 0;
    img {
      width: 300px;
      height: 300px;
    }
    .img_btn_camera {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 50px;
      line-height: 50px;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.3);
      color: #ffffff;
      .loding_img {
        width: 50px;
        height: 50px;
      }
    }
  }
}
.container{
  display: flex;
  float: left;
}
.img-container{
  height: 300px;
  overflow: hidden;
}
.img-box{
  ul: {display: flex;}
}
el-li{
      float: left;
      img{
      border: 1px #ece9e9 solid;
      display: block;
      width: 300px;
      height: 300px;
      }
      }
</style>
