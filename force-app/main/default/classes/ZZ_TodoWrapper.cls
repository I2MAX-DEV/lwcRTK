/**
 * 본 소프트웨어는 관련 법률에 따라 보호되는 삼성의 지식재산 및 영업비밀 입니다.
 * 본 소프트웨어를 권한 없이 사용하거나 삼성의 사전 서면 동의 없이 제3자에게 공개하는 행위는 엄격히 금지되어 있으며
 * 위반 시 귀하는 무단 사용 또는 비밀 유지 의무 위반에 대해 법적인 책임을 져야 합니다.
 *
 * This software is the intellectual property and confidential information of Samsung Electronics, Co., Ltd.
 * (“Samsung”) protected by applicable laws. The unauthorized use or disclosure of the software to any third
 * party without the prior written consent of Samsung is strictly prohibited, and you should be legally
 * responsible for the unauthorized use or violation of confidentiality obligation.
 */

/****************************************************************************************
 * @filename      : 
 * @projectname   : SSDS-공통
 * @author        : I2MAX
 * @date          : 2022-07-27
 * @group         :
 * @group-content :
 * @description   : 
 * @reference     :
 * @release       : v1.0.0
 * @modification Log
 * ===============================================================
 * ver     date            author          description
 * ===============================================================
 0.1     2022-07-27      I2MAX           Create
 ****************************************************************************************/
public with sharing class ZZ_TodoWrapper {
    @AuraEnabled
    public String id {get;set;}

    @AuraEnabled
    public String content {get;set;}

    @AuraEnabled
    public String status {get;set;}

    public ZZ_TodoWrapper(){}

    public ZZ_TodoWrapper(Todo__c todo){
        this.id = todo.Id;
        this.content = todo.Content__c;
        this.status = todo.Status__c;
    }

    public static Todo__c getSobject(ZZ_TodoWrapper wrapper, Boolean isCreate){
        Todo__c todo = new Todo__c();
        todo.Content__c = wrapper.content;
        todo.Status__c = wrapper.status;
        if(!isCreate){
            todo.Id = wrapper.id;
        }
        return todo;
    }
}