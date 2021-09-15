public with sharing class Controller {

//getting fields from the object
    @AuraEnabled(cacheable=true)
    public static List<Form__c> getData(){
        List<Form__c> formList = [SELECT First_Name__c, Last_Name__c, Gender__c,Country__c, Phone__c, Email__c FROM Form__c];
        try{
            return formList;
        }
        catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }
  
   //apply search

     @AuraEnabled(cacheable= true)
     public static List<Form__c> fetchDetail(String searchKey){

         String strKey ='%'+ searchKey + '%';
         list <Form__c> fList = new List<Form__c>();
         for(Form__c dataList:[SELECT First_Name__c, Last_Name__c, Gender__c,Country__c, Phone__c, Email__c FROM Form__c WHERE First_Name__c LIKE :strKey OR Last_Name__c LIKE :strKey OR Country__c LIKE :strKey OR Gender__c LIKE :strKey])
         {
             fList.add(dataList);
             }
             if(fList.size()==0){
                 throw new AuraHandledException('No record found');
             }
             return fList;

}

     // delete row using row action
     @AuraEnabled
     public static void deleteRow(list<Id> fetchData){
         try {list<Form__c> deleteFetchData = new list<Form__c>();
            System.debug('fetchData ====> '+fetchData);
            for(Id idForm : fetchData) {
                deleteFetchData.add(new Form__c(Id = idForm));
            }
            if(!deleteFetchData.isEmpty()) {
                delete deleteFetchData;
            }
        }
        catch (Exception e) {
             throw new AuraHandledException(e.getMessage());
         }
     }


}

