import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    //ia id-ul clientului din url
    this.id = this.route.snapshot.params['id'];
    //client
    this.clientService.getClient(this.id).subscribe(client => { //returneaza un observer cu obiectul client si trebuie sa subscriem pentru a-l folosi
      if(client != null) {      //cateodata daca un client e sters, da totusi eroare cand i se cauta id-ul (nu ca si cum n-ar exista, dar nici nu exista...)
        if(client.balance > 0) {
          this.hasBalance = true;   //hasBalance ii folosit pt a schimba clasa in bootstrap
        }
      }

      this.client = client;
    });
  }

  updateBalance() {
    this.clientService.updateClient(this.client);
    this.flashMessage.show('suma a fost modificata', {
      cssClass: 'alert-success', timeout:4000
    });
  }

  onDeleteClick() {
    if(confirm('sigur stergi?')) {
      this.clientService.deleteClient(this.client); 
      this.flashMessage.show('client sters', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/']);
    }
  }
}
