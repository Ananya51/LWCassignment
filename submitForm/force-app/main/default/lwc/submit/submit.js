import { LightningElement, track, wire, api } from 'lwc';
import getMethod from '@salesforce/apex/Controller.getData';
import deleteRow from '@salesforce/apex/Controller.deleteRow';
import fetchDetail from '@salesforce/apex/Controller.fetchDetail';

const actions=[
  { label: 'View', name: 'view'},
  {label:'Edit', name:'edit'},
  {label:'Delete', name:'delete'}

];

const columns = [
    {label: 'First Name', fieldName:'First_Name__c', type:'text'},
    {label: 'Last Name', fieldName:'Last_Name__c', type:'text'},
    {label: 'Gender', fieldName:'Gender__c', type:'picklist'},
    {label: 'Country', fieldName:'Country__c', type:'text'},
    {label: 'Phone', fieldName: 'Phone__c', type:'number'},
    {label: 'Email Address', fieldName: 'Email__c', type:'email'},
    {type:'action', typeAttributes:{rowActions: actions, menuAlignment: 'right'}}
];



export default class Submit extends LightningElement {
    col = columns;
    @wire(getMethod) fetchData;
    @track bShowModal = false;
    @track Form__c;
    @track error;
    @track rowShowModal = false;
    @track currentRecordId;
    @track currentRecord;
    @track isEditForm = false;


//modal.................
  @api openModal(){
        this.bShowModal=true;
    }
    closeModal(){
        this.bShowModal=false;
    }
    refreshPage(){
        window.location.reload();
    }



//search data  
      handleKeyChange(event){
        const searchKey = event.target.value;
        if(searchKey){
          fetchDetail({searchKey})
          .then(result=>{
            this.Form__c=result;
          })
          .catch(error => { 
            this.error = error; 
        });

        }else
        this.Form__c = undefined;
      }

//row action(view, edit, delete)
     handleRowAction(event){
       let actionName = event.detail.action.name;
       window.console.log('actionName ===>' +actionName);
       let row = event.detail.row;
       window.console.log('row ===>' +row);
       switch (actionName){
         case 'view':
           this.viewCurrentRecord(row);
           break;
          case 'edit':
            this.editCurrentRecord(row);
            break; 
            case 'delete':
              this.deleteRecord(row);
              break;
       }
     }
     // view the current details
     viewCurrentRecord(currentRow){
       this.rowShowModal = true;
       this.isEditForm = false;
       this.record = currentRow;
     }
     closedModal(){
       this.rowShowModal = false;
     }

     editCurrentRecord(currentRow){
       this.rowShowModal = true;
       this.isEditForm = true;

       this.currentRecordId = currentRow.Id;
     }
     //deleting a row from table and database
    deleteRecord(currentRow){
      let currentRecord = [];
      currentRecord.push(currentRow.Id);
      
      // calling apex class method to delete the selected contact
      deleteRow({fetchData: currentRecord})
      .then(_result => {
          window.location.reload();
      })
    }

     handleSubmit(event){
       this.template.querySelector('lightning-record-edit-form').submit(event.detail.id);
     }
     close(){
       window.location.reload();
     }

}