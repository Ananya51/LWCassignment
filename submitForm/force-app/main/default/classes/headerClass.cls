public with sharing class headerClass {

    @AuraEnabled(cacheable= true)
     public static List<Account> details(String searchKey){

         String strKey ='%'+ searchKey + '%';
         list <Account> fList =[SELECT Id, Name, Industry FROM Account WHERE Name LIKE: strKey];

         if(fList.isEmpty()){
             throw new AuraHandledException('No Record Found..');
         }
         return fList;

}
}
