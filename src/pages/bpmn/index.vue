<template>
  <div>
    <div>
      <a ref="saveBpmn" href="javascript:" title="保存为bpmn">保存为bpmn</a>&emsp;&emsp;&emsp;&emsp;
      <a ref="saveSvg" href="javascript:" title="保存为svg">保存为svg</a>
    </div>
    <div class="containers">
      <div style="width:80%;height: 800px;" ref="canvas"></div>
      <div id="js-properties-panel"></div>
    </div>
  </div>
</template>
<script>
  import BpmnModeler from 'bpmn-js/lib/Modeler'
  import {xmlData} from "../../mock/xmlStr";
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
      }
    },
    mounted(){
      this.bpmnInit()
    },
    methods: {
      //初始化
      bpmnInit(){
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
            //右侧属性栏
            propertiesProviderModule,
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
      //创建流程图
      async createParagraph(){
        let elementRegistry, modeling, idList, elementToColor
        const res = await this.bpmnModeler.importXML(xmlData)
        //添加监听
        await this.addBpmnListener()
        //让流程图自适应屏幕
        // let canvas = this.bpmnModeler.get('canvas')
        // canvas.zoom('fit-viewport')
        //为已执行的节点添加颜色
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
  .containers{
    background-color: #ffffff;
    width: 100%;
    height: calc(100vh - 52px);
    display: flex;
    justify-content: space-between;
  }
</style>
