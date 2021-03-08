import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DataServiceService } from '../../_services/data-service.service';

@Component({
  selector: 'app-configaccount',
  styleUrls: ['./configaccount.component.css'],
  templateUrl: './configaccount.component.html',
})
export class ConfigAccountComponent implements OnInit {
  which_type = "company";
  title_text = "Company Type";
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
      this.create_AccountConfig(this.which_type, event.newData);
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }
  onSaveConfirm(event) {
    if (window.confirm('Are you sure you want to save?')) {
      this.update_AccountConfig(this.which_type, event.data, event.newData);
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
      this.delete_AccountConfig(JSON.parse(localStorage.getItem('currentUser')).user, this.which_type, event.data);
      //event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

   create_AccountConfig(which, newData):  void{
    this.dataService.configCreateAccountConfig(which, newData).subscribe(res => {
      //console.log("create_AccountConfig result: " + JSON.stringify(res));
      this.read_AccountConfig();
    });
  }
   read_AccountConfig():  void{
    this.dataService.configReadAccountConfig(this.which_type).subscribe(res => {
      //console.log("read_AccountConfig result: " + JSON.stringify(res));
      this.data = res;
    });
  }
   update_AccountConfig(which, oldData, newData): void{
    this.dataService.configUpdateAccountConfig(which, oldData, newData).subscribe(res => {
      //console.log("update_AccountConfig result: " + JSON.stringify(res));
      this.read_AccountConfig();
    });
  }
   delete_AccountConfig(user_id, which, deleted_Data): void{
    this.dataService.configDeleteAccountConfig(user_id, which, deleted_Data).subscribe(res => {
      //console.log("delete_AccountConfig result: " + JSON.stringify(res));
      this.read_AccountConfig();
    });

  }

  ngOnInit(): void {
    var temp = window.location.href;
    if(temp.substr(temp.indexOf('%3F') + 3,temp.length)) {
      this.which_type = temp.substr(temp.indexOf('%3F') + 3,temp.length);
    }
    ////console.log(this.which_type);
    ////console.log(document.getElementById("title"));
    if(this.which_type == "company")
      this.title_text = "Company Type";
    else if(this.which_type == "industry")
      this.title_text = "Industry Type";
    else if(this.which_type == "credit")
      this.title_text = "Credit Rating";
    this.read_AccountConfig();
  }
}
