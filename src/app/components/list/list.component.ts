import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import {Issue} from '../../issue.model';
import { map } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { IssueService } from '../../issue.service';
import { AlertService } from '../../_services/alert.service';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  issues: Issue[];
  displayedColumns = ['title', 'responsible', 'severity', 'status', 'actions'];

  constructor(private issueService: IssueService,
              private router: Router,
              private authenticationService: AuthenticationService,
              private alertService: AlertService
              ) {

             // redirect to home if not logged in
             if (this.authenticationService.currentUserValue) {
              this.router.navigate(['/']);
            }

}

  ngOnInit() {

    this.fetchIssues();
  }

  fetchIssues(){

    this.issueService
        .getIssues()
        .subscribe((data: Issue[]) => {

            this.issues = data;

        });
  }

  editIssue(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteIssue(id) {
    this.issueService.deleteIssue(id).subscribe(() =>{
      this.alertService.success('Record Deleted Sucessfuly');
      this.fetchIssues();
    });

  }

}
