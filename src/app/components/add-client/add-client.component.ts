import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { Client }  from '../../models/Client';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }

  disableBalanceOnAdd: boolean;
@ViewChild('clientForm') form: any; //ViewChild se foloseste pt submit-erea template driven form-ului
  constructor(
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private router: Router,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
     this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    if(this.disableBalanceOnAdd) { //daca ii disabled si nu se poate adauga din form atunci se trimite obiectu client fara valoarea balance si o setam aici
      value.balance = 0;
    }

    if(!valid) {
      this.flashMessage.show('formularul nu a fost completat corect!', {cssClass: 'alert-danger', timeout: 4000});
    } else {
      this.clientService.newClient(value);
      this.flashMessage.show('client adaugat cu succes', {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/']);
    }
  }

}
