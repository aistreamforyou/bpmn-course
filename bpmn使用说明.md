# bpmn基本用法

## 安装

```
npm i bpmn-js -S
```



## 全局引入bpmn样式表

````js
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
````



## 显示流程图

````html
// 1、创建流程图的容器
<div style="width:100%;height: 1000px;" ref="canvas"></div>
````

```js
// 2、引入建模器
import BpmnModeler from 'bpmn-js/lib/Modeler'

// 3、引入测试数据 （将xml文件转换为字符串）
import {xmlData} from "../../mock/xmlStr";

```

```js
// 4、
    //初始化
    bpmnInit(){
        //获取canvas容器
        const canvas = this.$refs.canvas
        //初始化建模器
        this.bpmnModeler = new BpmnModeler({
            container: canvas
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
```

## 属性面板
```text
npm i bpmn-js-properties-panel -S
npm i camunda-bpmn-moddle -S
```

```js
//属性面板样式
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css'
```

```js
//右侧属性面板
  import propertiesPanelModule from 'bpmn-js-properties-panel'
  import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
  import camundaModuleDescriptor from 'camunda-bpmn-moddle/resources/camunda'
  
  this.bpmnModeler = new BpmnModeler({
    container: canvas,
    //添加控制板
    propertiesPanel: {
      parent: '#js-properties-panel'//属性面板容器的id（开发者指定）
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
```




























































































