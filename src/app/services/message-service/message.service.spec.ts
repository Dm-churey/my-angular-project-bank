import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MessageService } from './message.service';

describe('MessageService', () => {
  let messageService: MessageService;
  let snackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [MessageService, { provide: MatSnackBar, useValue: snackBarMock }]
    });

    messageService = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(messageService).toBeTruthy();
  });

  it('should open a login error message', () => {
    const mockError = { error: 'Ошибка входа' };
    
    messageService.loginOrRegisterOrLogoutErrorResponce(mockError);
    
    expect(snackBarMock.open).toHaveBeenCalledWith(
      mockError.error,
      'Закрыть',
      { duration: 4000, panelClass: [ 'snackbar-container_error' ] }
    );
  });
  
  it('should open a success message', () => {
    const mockMessage = 'Сообщение об успехе';
    
    messageService.successResponce(mockMessage);
    
    expect(snackBarMock.open).toHaveBeenCalledWith(
      mockMessage,
      'Закрыть',
      { duration: 4000, panelClass: [ 'snackbar-container_success' ] }
    );
  });
  
  it('should open an error message', () => {
    const mockMessage = 'Сообщение об ошибке';
    
    messageService.errorMessage(mockMessage);
    
    expect(snackBarMock.open).toHaveBeenCalledWith(
      mockMessage,
      'Закрыть',
      { duration: 5000, panelClass: ['snackbar-container_error'] }
    );
  });

});