import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';

import { IssueService } from '../../issue.service';
import { Issue } from '../../issue.model';
import { AlertService } from '../../_services/alert.service';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: String;
  issue: any = {};
  updateForm: FormGroup;

  constructor(private issueService: IssueService,
              private router: Router,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private fb: FormBuilder ) {

             // redirect to home if already logged in
             if (this.authenticationService.currentUserValue) {
              this.router.navigate(['/']);
            }

              this.createForm();

   }

    createForm() {
     this.updateForm = this.fb.group({
    title: [' ', Validators.required],
    responsible: '',
    description: '',
    severity: '',
    status: ''
});

    }


  ngOnInit() {

    this.route.params.subscribe(params => {

      this.id = params.id;
      this.issueService.getIssuesById(this.id).subscribe(res => {

            this.issue = res;
            this.updateForm.get('title').setValue(this.issue.title);
            this.updateForm.get('responsible').setValue(this.issue.responsible);
            this.updateForm.get('description').setValue(this.issue.description);
            this.updateForm.get('severity').setValue(this.issue.severity);
            this.updateForm.get('status').setValue(this.issue.status);
      });

    });

  }

      updateIssue(title, responsible, description, severity, status) {
          this.issueService.updateIssue(this.id, title, responsible, description, severity, status).subscribe(() => {
            this.alertService.success('Update is Sucessful');
          });
      }
}
