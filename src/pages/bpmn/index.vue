<template>
  <div class="page-wrapper">
    <div>
<!--      <a ref="saveBpmn" href="javascript:" title="保存为bpmn">保存为bpmn</a>&emsp;&emsp;&emsp;&emsp;-->
<!--      <a ref="saveSvg" href="javascript:" title="保存为svg">保存为svg</a>-->
    </div>
    <div class="containers" style="width: 98%;">
      <div style="width:73%;height: 700px;overflow-y: hidden;" ref="canvas"></div>
      <div style="width: 23%;" id="js-properties-panel"></div>
    </div>
    <div class="btn-wrapper">
      <div class="btn-pane">
        <i class="iconfont icon-wenjianjia icon-size" @click="addFile"></i>
        <i class="iconfont icon-tianjia icon-size" @click="newFile"></i>
      </div>
      <div class="btn-pane">
        <a ref="saveBpmn" href="javascript:" title="保存为bpmn">
          <i class="iconfont icon-ft-download icon-size" @click="bpmnClick"></i>
        </a>
        <a ref="saveSvg" href="javascript:" title="保存为svg">
          <i class="iconfont icon-xingzhuangjiehe icon-size" @click="svgClick"></i>
        </a>
      </div>
      <input type="file" id="file" @change="selectFile()" style="filter:alpha(opacity=0);opacity: 0;width:0;height:0;"/>
    </div>
  </div>
</template>
<script>
  import BpmnModeler from 'bpmn-js/lib/Modeler'
  import {xmlData} from "../../mock/xmlStr";
  import {baseXml} from "../../mock/baseXmlStr";
  //右侧属性面板
  import propertiesPanelModule from 'bpmn-js-properties-panel'
  import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
  import camundaModuleDescriptor from 'camunda-bpmn-moddle/resources/camunda'

  export default {
    name: 'Index',
    data(){
      return {
        bpmnModeler: {},//建模器
        svgData: {},//svg数据
        currentTarget: {},
      }
    },
    mounted(){
      //初始化为默认xml文件
      this.currentTarget = xmlData
      console.log('xmldata:', xmlData)
      this.bpmnInit()
    },
    methods: {
      bpmnClick(){
        this.$refs.saveBpmn.click()
      },
      svgClick(){
        this.$refs.saveSvg.click()
      },
      //初始化一个新的xml
      newFile(){
        this.currentTarget = baseXml
        this.bpmnInit()
      },
      //触发文件选择框
      addFile(){
        document.querySelector('#file').click()
      },
      selectFile(){
        let file = document.getElementById('file').files[0]
        let reader = new FileReader()
        reader.readAsText(file, 'UTF-8')
        reader.onload = (e) => {
          console.log(e.target.result)
          this.currentTarget = e.target.result
          this.bpmnInit()
        }
      },
      //初始化
      bpmnInit(){
        //清除原有的流程图
        this.clearDiagram()
        //获取canvas容器
        const canvas = this.$refs.canvas
        //初始化建模器
        this.bpmnModeler = new BpmnModeler({
          container: canvas,
          //添加控制板
          propertiesPanel: {
            parent: '#js-properties-panel'
          },
          additionalModules: [
            propertiesProviderModule,
            //右侧属性栏
            propertiesPanelModule
          ],
          moddleExtensions: {
            camunda: camundaModuleDescriptor
          }
        })
        //绘制
        this.createParagraph()
    },
      //添加监听
      addBpmnListener(){
        let that = this
        //获取a标签的dom节点
        const downloadLink = that.$refs.saveBpmn
        const downloadSvgLink = that.$refs.saveSvg
        this.bpmnModeler.on('commandStack.changed', function() {
          console.log(123)
          that.saveDiagram(function (data) {
            that.setEncoded(downloadLink, 'diagram.bpmn', data.xml)
          })
          that.saveSvg(function (data) {
            that.setEncoded(downloadSvgLink, 'diagram.svg', data.svg)
          })
        })
      },
      //当图发生变化时，会调用这个函数，这个data就是图的xml
      setEncoded(link, name, data){
        //将xml转换为url，用于下载
        const encodedData = encodeURIComponent(data)
        //下载图的具体操作，改变a的属性，className零a标签可点击，零href能下载，dounload是下载的文件的名字
        // console.log(link,name,data)
        // let xmlFile = new File([data], 'test.bpmn')
        // console.log('xmlFile:', xmlFile)
        if(data){
          link.className = 'active'
          link.href = 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData
          link.download = name
        }
      },
      //下载为svg格式
      saveSvg(done){
        this.bpmnModeler.saveSVG().then(done)
      },
      //下载为bpmn格式
      saveDiagram(done){
        this.bpmnModeler.saveXML({format: true}).then(done)
      },
      //清空流程图
      clearDiagram(){
        this.$refs.canvas.innerHTML = ''
      },
      //创建流程图
      async createParagraph(){
        let elementRegistry, modeling, idList, elementToColor
        await this.bpmnModeler.importXML(this.currentTarget)
        //添加监听
        await this.addBpmnListener()

        // 为已执行的节点添加颜色
        modeling = this.bpmnModeler.get('modeling')
        elementRegistry = this.bpmnModeler.get('elementRegistry')
        idList = ['StartEvent_1','assignApprover','SequenceFlow_1']
        elementToColor = idList.map(item=>{
          return elementRegistry.get(item)
        })
        modeling.setColor(elementToColor, {
          stroke: 'green',
          fill: 'yellow'
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  .page-wrapper{
    position: relative;
    .btn-wrapper{
      position: absolute;
      bottom: 50px;
      left: 20px;
      .btn-pane{
        display: inline-block;
        border: 1px solid #aaaaaa;
        padding: 5px;
        text-decoration: none;
        .icon-size{
          font-size: 20px;
          color: #333333;
        }
        .icon-size:hover{
          cursor: pointer;
        }
      }
    }
  }
  .containers{
    background-color: #ffffff;
    height: calc(100vh - 52px);
    display: flex;
    justify-content: space-between;
  }
</style>
