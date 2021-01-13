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

```text
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

## 下载为bpmn、svg
```html
<a ref="saveBpmn" href="javascript:" title="保存为bpmn">保存为bpmn</a>
```

+  添加监听
```js
addBpmnListener()
{
  let that = this
  //获取a标签的dom节点
  const downloadLink = that.$refs.saveBpmn
  const downloadSvgLink = that.$refs.saveSvg
  this.bpmnModeler.on('commandStack.changed', function() {
    //当流程图发生变化时，执行以下代码
    //当流程图变化时，执行自定义的方法：saveDiagram(),并将回调函数传递给saveDiagram
    that.saveDiagram(function (data) {
      that.setEncoded(downloadLink, 'diagram.bpmn', data.xml)
    })
    that.saveSvg(function (data) {
      that.setEncoded(downloadSvgLink, 'diagram.svg', data.svg)
    })
  })
}

//下载为svg格式
saveSvg(done)
{
  this.bpmnModeler.saveSVG().then(done)
}
//下载为bpmn格式
saveDiagram(done)
{
  //在此调用建模器的saveXML方法，该方法会返回一个promise，该promise代理的数据中包含xml
  // data: { xml: xmlData}
  // 将done设置为promise的成功处理函数，而js会通过then将promise的值传递给done
  this.bpmnModeler.saveXML({format: true}).then(done)
}

//当图发生变化时，会调用这个函数，这个data就是图的xml
setEncoded(link, name, data)
{
  //将xml转换为url，用于下载
  const encodedData = encodeURIComponent(data)
  //下载图的具体操作，改变a的属性，className零a标签可点击，零href能下载，dounload是下载的文件的名字
  if(data){
    link.className = 'active'
    link.href = 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData
    link.download = name
  }
}
```

























































































