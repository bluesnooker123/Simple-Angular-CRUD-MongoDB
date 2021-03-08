import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DataServiceService } from '../../_services/data-service.service';

@Component({
  selector: 'app-configpayment',
  templateUrl: './configpayment.component.html',
  styleUrls: ['./configpayment.component.css']
})
export class ConfigPaymentComponent implements OnInit {
  which_type = "getway";
  title_text = "Payment Getway";
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
      name: {
        title: 'Name',
        // filter: false,
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
      ////console.log(Object.keys(event));
      this.create_PaymentConfig(this.which_type, event.newData);
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }
  onSaveConfirm(event) {
    if (window.confirm('Are you sure you want to save?')) {
      this.update_PaymentConfig(this.which_type, event.data, event.newData);
      //event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }
  onDeleteConfirm(event) {
    //console.log(JSON.parse(localStorage.getItem('currentUser')).user);
    if(JSON.parse(localStorage.getItem('currentUser')).isSuperUser != "Yes"){
      alert("You don't have permission to delete data!");
      return;
    }
    if (window.confirm('Are you sure you want to delete?')) {
      this.delete_PaymentConfig(this.which_type, event.data);
      //event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

   create_PaymentConfig(which, newData):  void{
    this.dataService.configCreatePaymentConfig(which, newData).subscribe(res => {
      //console.log("create_PaymentConfig result: " + JSON.stringify(res));
      this.read_PaymentConfig();
    });
  }
   read_PaymentConfig():  void{
    this.dataService.configReadPaymentConfig(this.which_type).subscribe(res => {
      //console.log("read_PaymentConfig result: " + JSON.stringify(res));
      this.data = res;
    });
  }
   update_PaymentConfig(which, oldData, newData): void{
    this.dataService.configUpdatePaymentConfig(which, oldData, newData).subscribe(res => {
      //console.log("update_PaymentConfig result: " + JSON.stringify(res));
      this.read_PaymentConfig();
    });
  }
   delete_PaymentConfig(which, deleted_Data): void{
    this.dataService.configDeletePaymentConfig(which, deleted_Data).subscribe(res => {
      //console.log("delete_PaymentConfig result: " + JSON.stringify(res));
      this.read_PaymentConfig();
    });

  }

  ngOnInit(): void {
    var temp = window.location.href;
    if(temp.substr(temp.indexOf('%3F') + 3,temp.length)) {
      this.which_type = temp.substr(temp.indexOf('%3F') + 3,temp.length);
    }
    ////console.log(this.which_type);
    ////console.log(document.getElementById("title"));
    if(this.which_type == "getway")
      this.title_text = "Payment Getway";
    else if(this.which_type == "type")
      this.title_text = "Payment Type";
    this.read_PaymentConfig();
  }
}
