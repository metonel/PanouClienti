import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';

import { Client } from '../../models/Client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  totalOwed: number;

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      this.getTotalOwed();
    });
  }

  getTotalOwed() {
    this.totalOwed = this.clients.reduce((total, client) => {
      return total + parseFloat(client.balance.toString()); //vedea balance ca fiind string si + nu il aduna, il concatena
    }, 0);  //0 ii parametru de inceput pt reduce, la el tot o sa adauge
  }

}
