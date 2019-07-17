import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  loadingElement:HTMLIonLoadingElement;

  constructor(
    private alertController:AlertController, 
    private loadingController:LoadingController,
  ) { }

  async  showLoading() {
    this.loadingElement = await this.loadingController.create({
      message: 'Aguarde...',
      spinner: 'crescent',
    });
    return await this.loadingElement.present();
  }

  async hideLoading(){
    if(this.loadingElement){
     return await this.loadingElement.dismiss();
    }
  }

  async exibirMensagem(msg) {
  
    const alert = await this.alertController.create({
      header: 'Sucesso',
      subHeader: '',
      message: msg,
      buttons: [
        {
          text: 'Ok',
          handler: data =>{
            this.cancelar();
          }
        }
      ]
    });
    return await alert.present();
  }

  cancelar(){
    
  }
}
