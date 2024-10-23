import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { OperationResponceInterface, OperationStepDetails, StartOperationRequestInterface } from 'src/app/models/operation';
import { DestroyService } from 'src/app/services/destroy-service/destroy.service';
import { MessageService } from 'src/app/services/message-service/message.service';
import { OperationsRequestsService } from 'src/app/services/operations-requests-service/operations-requests.service';

@Component({
  selector: 'app-account-refill',
  templateUrl: './account-refill.component.html',
  styleUrls: ['./account-refill.component.scss'],
  providers: [DestroyService]
})
export class AccountRefillComponent implements OnInit {

  titleText: string = '';
  formRefill!: FormGroup;
  selectedValue: string = '';
  amount: number | null = null;
  loaderRun: boolean = false;
  successSend: boolean = false;
  accountRefillData$?: Observable<OperationResponceInterface | null>
  codeOperation: StartOperationRequestInterface = {operationCode: 'AccountRefill'};

  constructor(
    private readonly fb: FormBuilder,
    private readonly operService: OperationsRequestsService,
    private readonly destroy$: DestroyService,
    private readonly router: Router,
    private readonly messageServise: MessageService,
  ) {}

  ngOnInit(): void {
    this.initRefill();
    this.initForm();
  }

  initRefill(): void {
    this.accountRefillData$ = this.operService.startOperation(this.codeOperation).pipe(
      tap({
        next: (res) => {
          localStorage.setItem('requestId', res.requestId.toString());
          this.titleText = res.name
        },
        error: () => {
          this.router.navigate(['/home'], {
            queryParams: {operationError: true}
          })
        }
      })
    );
  }

  initForm(): void {
    this.formRefill = this.fb.group({
      account: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1), Validators.max(1000000), Validators.pattern( /^\d+$/)]],
    });
  }

  onSubmit(): void {
    if (this.formRefill.valid) {
      this.loaderRun = true;
      this.formRefill.disable();
      const accountValue: string = this.formRefill.get('account')?.value;
      const amountValue: string = this.formRefill.get('amount')?.value.toString();
      const dataStepOperation: OperationStepDetails = {accountValue: accountValue, amountValue: amountValue, operationName: this.titleText}

      this.operService.secondStepOperation(amountValue, accountValue, this.titleText).pipe(takeUntil(this.destroy$)).subscribe({
        next: () => {
          this.successSend = true;
          this.operService.setOperationStepDetails(dataStepOperation);
          this.router.navigate(['refill-account/confirm-refill']);
        },
        error: () => {
          this.loaderRun = false;
          this.formRefill.enable();
          this.messageServise.errorMessage('Ошибка операции');
        }
      });
    }
  }
   
}
