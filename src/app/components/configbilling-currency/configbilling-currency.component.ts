import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DataServiceService } from '../../_services/data-service.service';

@Component({
  selector: 'app-configbilling-currency',
  templateUrl: './configbilling-currency.component.html',
  styleUrls: ['./configbilling-currency.component.css']
})
export class ConfigBillingCurrencyComponent implements OnInit {
  which_type = "currency";
  data = [];
  settings = {
    // selectMode: 'multi',
    actions: {delete: (JSON.parse(localStorage.getItem('currentUser')).isSuperUser == "Yes")},
    delete: {
      confirmDelete: true,
    },
    add: {
      confirmCreate: true,
    },
    edit: {
      confirmSave: true,
    },
    columns: {
      description: {
        title: 'Description',
      },
      currency_code: {
        title: 'Currency Code',
      },
      isActive: {
        title: 'Active/In Active',
        filter: {
          type: 'checkbox',
          config: {
            true: 'Yes',
            false: 'No',
          },
        },
        editor: {
          type: 'checkbox',
          config: {
            true: 'Yes',
            false: 'No',
          },
        },
      },
    },
    pager:{
      perPage: 25,
    },
};

  constructor(private dataService : DataServiceService) {
  }
  onCreateConfirm(event) {
    if (window.confirm('Are you sure you want to create?')) {
      //console.log(Object.keys(event));
      this.create_BillingConfig(this.which_type, event.newData);
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }
  onSaveConfirm(event) {
    if (window.confirm('Are you sure you want to save?')) {
      this.update_BillingConfig(this.which_type, event.data, event.newData);
      //event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }
  onDeleteConfirm(event) {
   // console.log(JSON.parse(localStorage.getItem('currentUser')).user);
    if(JSON.parse(localStorage.getItem('currentUser')).isSuperUser != "Yes"){
      alert("You don't have permission to delete data!");
      return;
    }
    if (window.confirm('Are you sure you want to delete?')) {
      this.delete_BillingConfig(this.which_type, event.data);
      //event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

   create_BillingConfig(which, newData):  void{
    this.dataService.configCreateBillingConfig(which, newData).subscribe(res => {
      //console.log("create_BillingConfig result: " + JSON.stringify(res));
      this.read_BillingConfig();
    });
  }
   read_BillingConfig():  void{
    this.dataService.configReadBillingConfig(this.which_type).subscribe(res => {
      //console.log("read_BillingConfig result: " + JSON.stringify(res));
      this.data = res;
    });
  }
   update_BillingConfig(which, oldData, newData): void{
    this.dataService.configUpdateBillingConfig(which, oldData, newData).subscribe(res => {
      //console.log("update_BillingConfig result: " + JSON.stringify(res));
      this.read_BillingConfig();
    });
  }
   delete_BillingConfig(which, deleted_Data): void{
    this.dataService.configDeleteBillingConfig(which, deleted_Data).subscribe(res => {
      //console.log("delete_BillingConfig result: " + JSON.stringify(res));
      this.read_BillingConfig();
    });

  }

  ngOnInit(): void {
    var temp = window.location.href;
    if(temp.substr(temp.indexOf('%3F') + 3,temp.length)) {
      this.which_type = temp.substr(temp.indexOf('%3F') + 3,temp.length);
    }
    //console.log(this.which_type);
    //console.log(document.getElementById("title"));
    this.read_BillingConfig();
  }
}
