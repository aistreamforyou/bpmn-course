export var baseXml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:camunda="http://camunda.org/schema/1.0/bpmn" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" xmlns:signavio="http://www.signavio.com" id="sid-0b0aaa25-3baf-4875-9d7a-0907d599a9ef" targetNamespace="http://www.omg.org/spec/BPMN/20100524/MODEL" exporter="Camunda Modeler" exporterVersion="3.5.0" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">\n' +
  '  <dataStore id="FinancialAccountingSystem" name="Financial Accounting System" isUnlimited="false">\n' +
  '    <dataState id="DataState_1" />\n' +
  '  </dataStore>\n' +
  '  <message id="foxMessage_en" name="foxMessage_en" />\n' +
  '  <collaboration id="collaboration_3">\n' +
  '    <participant id="Process_Engine_1" name="Invoice Receipt" processRef="invoice" />\n' +
  '  </collaboration>\n' +
  '  <process id="invoice" name="Invoice Receipt" isExecutable="true" camunda:versionTag="V2.0" camunda:historyTimeToLive="45">\n' +
  '    <laneSet id="laneSet_5">\n' +
  '      <lane id="Accountant" name="Accountant" />\n' +
  '      <lane id="teamAssistant" name="Team Assistant">\n' +
  '        <flowNodeRef>assignApprover</flowNodeRef>\n' +
  '        <flowNodeRef>StartEvent_1</flowNodeRef>\n' +
  '      </lane>\n' +
  '      <lane id="Approver" name="Approver" />\n' +
  '    </laneSet>\n' +
  '    <businessRuleTask id="assignApprover" name="Assign Approver Group" camunda:resultVariable="approverGroups" camunda:decisionRef="invoice-assign-approver" camunda:mapDecisionResult="collectEntries">\n' +
  '      <incoming>SequenceFlow_1</incoming>\n' +
  '    </businessRuleTask>\n' +
  '    <startEvent id="StartEvent_1" name="Invoice&#10;received" camunda:formKey="embedded:app:forms/start-form.html">\n' +
  '      <outgoing>SequenceFlow_1</outgoing>\n' +
  '    </startEvent>\n' +
  '    <sequenceFlow id="SequenceFlow_1" name="" sourceRef="StartEvent_1" targetRef="assignApprover" />\n' +
  '  </process>\n' +
  '  <bpmndi:BPMNDiagram id="BPMNDiagram_73">\n' +
  '    <bpmndi:BPMNPlane id="BPMNPlane_73" bpmnElement="collaboration_3">\n' +
  '      <bpmndi:BPMNShape id="Process_Engine_1_gui" bpmnElement="Process_Engine_1" isHorizontal="true">\n' +
  '        <omgdc:Bounds x="160" y="80" width="1009" height="486" />\n' +
  '      </bpmndi:BPMNShape>\n' +
  '      <bpmndi:BPMNShape id="Freigebender_105_gui" bpmnElement="Approver" isHorizontal="true">\n' +
  '        <omgdc:Bounds x="190" y="262" width="979" height="161" />\n' +
  '      </bpmndi:BPMNShape>\n' +
  '      <bpmndi:BPMNShape id="Team-Assistenz_110_gui" bpmnElement="teamAssistant" isHorizontal="true">\n' +
  '        <omgdc:Bounds x="190" y="80" width="979" height="183" />\n' +
  '      </bpmndi:BPMNShape>\n' +
  '      <bpmndi:BPMNShape id="Buchhaltung_119_gui" bpmnElement="Accountant" isHorizontal="true">\n' +
  '        <omgdc:Bounds x="190" y="422" width="979" height="144" />\n' +
  '      </bpmndi:BPMNShape>\n' +
  '      <bpmndi:BPMNEdge id="BPMNEdge_SequenceFlow_2" bpmnElement="SequenceFlow_1" sourceElement="_BPMNShape_StartEvent_3" targetElement="Freigebenden_zuordnen_143_gui">\n' +
  '        <omgdi:waypoint x="284" y="172" />\n' +
  '        <omgdi:waypoint x="340" y="172" />\n' +
  '      </bpmndi:BPMNEdge>\n' +
  '      <bpmndi:BPMNShape id="Freigebenden_zuordnen_143_gui" bpmnElement="assignApprover" isHorizontal="true">\n' +
  '        <omgdc:Bounds x="340" y="132" width="100" height="80" />\n' +
  '      </bpmndi:BPMNShape>\n' +
  '      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_3" bpmnElement="StartEvent_1">\n' +
  '        <omgdc:Bounds x="256" y="158" width="28" height="28" />\n' +
  '        <bpmndi:BPMNLabel>\n' +
  '          <omgdc:Bounds x="249" y="191" width="42" height="27" />\n' +
  '        </bpmndi:BPMNLabel>\n' +
  '      </bpmndi:BPMNShape>\n' +
  '    </bpmndi:BPMNPlane>\n' +
  '  </bpmndi:BPMNDiagram>\n' +
  '</definitions>\n'
