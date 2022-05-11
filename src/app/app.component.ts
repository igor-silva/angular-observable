import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  valoresRecebidos: string[] = [];
  inscricaoObservable: Subscription;

  ngOnInit() {
    const observable = this.novoObservable();

    this.inscricaoObservable = observable.subscribe(
      valor => {
        this.valoresRecebidos.push(valor);
      },
      erro => {
        this.valoresRecebidos.push(erro);
      },
      () => {
        this.valoresRecebidos.push("O observable foi encerrado!");
      });
  }

  novoObservable(): Observable<string> {
    return new Observable<string>(observador => {
      setTimeout(() => {
        observador.next("Primeiro timeout");
      }, 2000);

      setTimeout(() => {
        observador.next("Segundo timeout");

        //(Obs: erro finaliza o observable automaticamente)
        //DESCOMENTE LINHA ABAIXO PARA EMITIR ERRO 
         observador.error("Erro no observable!");

        //DESCOMENTE LINHA ABAIXO PARA FINALIZAR O OBSERVABLE
        // observador.complete();
      }, 3000);

      setTimeout(() => {
        observador.next("Terceiro timeout");
      }, 5000);

      setTimeout(() => {
        observador.next("Quarto timeout");
      }, 4000);
    });
  }

  ngOnDestroy() {
    if (this.inscricaoObservable)
      this.inscricaoObservable.unsubscribe();
  }
}
