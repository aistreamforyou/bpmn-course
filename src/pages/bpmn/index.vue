<template>
  <div class="containers">
    <div style="width:80%;height: 1000px;" ref="canvas"></div>
    <div id="js-properties-panel"></div>
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
      //创建流程图
      async createParagraph(){
        let elementRegistry, modeling, idList, elementToColor
        await this.bpmnModeler.importXML(xmlData)
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
