/****************************************************************************************
 * @filename      : 
 * @projectname   : SSDS-공통
 * @author        : I2MAX
 * @date          : 2022-07-26
 * @group         :
 * @group-content :
 * @description   : 
 * @reference     :
 * @release       : v1.0.0
 * @modification Log
 * ===============================================================
 * ver     date            author          description
 * ===============================================================
 0.1     2022-07-26      I2MAX           Create
 ****************************************************************************************/
public with sharing class ZZ_TodoController {
//    /**
//     * @return List<Todo_c>
//     */
//    @AuraEnabled(Cacheable=true)
//    public static List<Todo__c> getTodos(){
//        return [SELECT text__c, completed__c, Id, Sequence__c FROM Todo__c];
//    }

    @AuraEnabled
    public static void addTodos(String text){
        Todo__c todo = new Todo__c();
        todo.text__c = text;

        insert todo;
    }

    @AuraEnabled
    public static Map<String, ZZ_TodoWrapper> getTodos(){
        Map<String, ZZ_TodoWrapper> mapOfTodoById = new Map<String, ZZ_TodoWrapper>();
        try {
            List<Todo__c> lstTodo = [SELECT Id, Content__c, Status__c FROM Todo__c];
            if(lstTodo.size() > 0){
                for(Todo__c todo : lstTodo){
                    mapOfTodoById.put(todo.Id, new ZZ_TodoWrapper(todo));
                }
            }
            return mapOfTodoById;
        } catch (Exception e) {
            return mapOfTodoById;
        }
    }


    @AuraEnabled
    public static void deleteTodo(String recordId){
        delete [SELECT Id FROM Todo__c WHERE Id=:recordId];
    }


    @AuraEnabled
    public static ZZ_TodoWrapper addNewTodo(String content){
        try {
            ZZ_TodoWrapper wrapper = new ZZ_TodoWrapper();
            wrapper.content = content;
            wrapper.status = 'Incomplete';
            Todo__c todo  = ZZ_TodoWrapper.getSobject(wrapper, true);
            insert todo;

            wrapper.id = todo.Id;
            return wrapper;
        } catch (Exception e) {
            return null;
        }
    }

    @AuraEnabled
    public static ZZ_TodoWrapper changeTodoStatus(String strTodo){
        try {
            ZZ_TodoWrapper wrapper = (ZZ_TodoWrapper)JSON.deserialize(strTodo, ZZ_TodoWrapper.class);
            Todo__c todo  = ZZ_TodoWrapper.getSobject(wrapper, false);
            update todo;
            return wrapper;
        } catch (Exception e) {
            return null;
        }
    }



    @AuraEnabled
    public static List<Todo__c> getDefaultTodos(){
        List<Todo__c> lstTodo = new List<Todo__c>();
        try {
            lstTodo = [SELECT Id, Content__c, Status__c FROM Todo__c];
            return lstTodo;
        } catch (Exception e) {
            return lstTodo;
        }
    }

    @AuraEnabled
    public static Todo__c addDefaultNewTodo(String content){
        try {
            Todo__c todo = new Todo__c(
                    Content__c = content,
                    Status__c = 'Incomplete'
            );
            System.debug('asdfasdf : ' + todo);
            insert todo;

            System.debug('asdfasdf : ' + todo);

            return todo;
        } catch (Exception e) {
            return null;
        }
    }


    @AuraEnabled
    public static Todo__c changeDefaultTodoStatus(String recordId, String status){
        try {
            Todo__c todo = [SELECT Id, Status__c, Content__c FROM Todo__c WHERE Id =: recordId];
            todo.Status__c = status;
            upsert todo;
            return todo;
        } catch (Exception e) {
            return null;
        }
    }
}