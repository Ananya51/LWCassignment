import { LightningElement, track } from 'lwc';
import Amazon_Logo from '@salesforce/resourceUrl/amazon_logo';
import Amazon_Cart from '@salesforce/resourceUrl/amazon_cart';// Example :- import TRAILHEAD_LOGO from '@salesforce/resourceUrl/trailhead_logo';'

export default class Header extends LightningElement {

    amazonLogoURL=Amazon_Logo;
    amazonCartURL = Amazon_Cart;

@track data;


    handleSearch(event){
        const searchKey = event.target.value;
        if(searchKey){
            details({searchKey})
            .then(result=>{
                this.data=result;
            })
            .catch(error =>{
                this.error = error;
            });
        }else
        this.data = undefined;
    }
}