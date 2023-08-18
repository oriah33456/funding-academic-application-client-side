import { Component, OnInit, } from '@angular/core';
import { FundingPageListComponent } from 'src/app/fundings-page/funding-page-list/funding-page-list.component';
import { DialogService } from 'src/app/shared/dialog.service';

@Component({
  selector: 'app-my-approvals',
  templateUrl: './my-approvals.component.html',
  styleUrls: ['./my-approvals.component.scss']
})
export class MyApprovalsComponent implements OnInit {

  constructor(private dialogService: DialogService) { }

  ngOnInit(): void {
  }


}
