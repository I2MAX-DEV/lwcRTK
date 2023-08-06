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