import { Component, ElementRef, ViewChild, Input, Output } from '@angular/core';
import { InfoData } from '../../interfaces/Data';
import { DocumentService } from '../../services/document.service';
import { Documents } from '../../interfaces/allDocuments';
import { Document } from '../../interfaces/document';
import Swal from 'sweetalert2';
import { FailDocuments } from '../../interfaces/failDocuments';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'search-box-document',
  templateUrl: './search-box-document.component.html',
  styleUrls: ['./search-box-document.component.sass']
})
export class SearchBoxDocumentComponent {

  //Inputs de enviar datos por fecha
  public input1Value!: string;
  public input2Value!: string;

  //Inputs buscar documentos en falla por fecha
  public initialDate! : string;
  public finalDate! : string;

  //Buscar documentos por fs
  public inputId!: string;

  //Variable donde se almacena el documento buscado
  public document?: Document;

  //Listas de documentos
  public allDocuments!: Documents[];
  public failDocuments!: FailDocuments[];

  //Variables de envío de docuemtos por fs y DSE
  public numberFS! : number;
  public numberDSE! : number;

  //Validaciones
  public validationFist: boolean = false;
  public isLoading: boolean = false;
  public firstDateIsNotFilled: boolean = false;
  public firstDateClass = false;
  public firstDateNotFilledDF: boolean = false;
  public firstDateClassDF: boolean = false;
  initialSelectionFailDocuments = [];
  allowMultiSelectFailDocuments = true;
  selectionFailsDocuments = new SelectionModel<FailDocuments>(this.allowMultiSelectFailDocuments, this.initialSelectionFailDocuments)

  @Input()
  public typeOf!: boolean;

  constructor(private documentService: DocumentService) { }


  //Send Documents in failed
  sendDocumentsFailed(){
    console.log(this.selectionFailsDocuments.selected);
    if(this.selectionFailsDocuments){
      Swal.fire({
        title: 'Enviando documentos...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      this.documentService.sendAllDocumentsFailed(this.selectionFailsDocuments.selected)
    .subscribe((response)=>{
      Swal.close();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Documentos enviados con éxito',
        showConfirmButton: false,
        timer: 1500
      })
    },
    error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo salió mal enviando los documento, intenta nuevamente!'
      })
    }
    )
    }
  }

  //Validation of send values by month
  onFirstDateChange(){
    this.firstDateIsNotFilled = !!this.input1Value;
  }
  onFirstDateChangeDF(){
    this.firstDateNotFilledDF = !!this.initialDate;
  }

  //Send documents by month
  emitValueByMonth() {
    this.firstDateClass = !this.firstDateClass
    if(this.firstDateIsNotFilled){
      Swal.fire({
        title: 'Enviando documentos...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      this.documentService.getDocumentsByMonths(this.input1Value, this.input2Value).subscribe(
        response => {
          Swal.close();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Documentos enviados con éxito',
            showConfirmButton: false,
            timer: 1500
          })
          console.log(response);
          return response
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salió mal enviando los documento, intenta nuevamente!'
          })
        }
      )
      console.log(this.input1Value, this.input2Value)
    }else{
      Swal.fire({
        icon: 'info',
        title: 'Campos incompletos',
        text: 'Llena el campo fecha de inicio'
      })
    }
  }


  sendDocuementByFs(){
    if(this.numberDSE && this.numberFS)
    {
      Swal.fire({
        title: 'Enviando documentos...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      this.documentService.sendOneDocumentByFs(this.numberFS,  this.numberDSE).subscribe(
        response =>
        {
          Swal.close();
          if(response.error){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Algo salió mal enviando los documento, puede que el documento ya esté ingresado, intenta nuevamente!'
            })
            return;
          }
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Documentos enviados con éxito',
            showConfirmButton: false,
            timer: 1500
          })
          console.log(response);
        },
        error =>
        {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salió mal enviando los documento, intenta nuevamente!'
          })
          console.log(error.message);
        }
      )
    }
    else
    {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Completa los campos e intenta nuevamente!'
      })
    }
  }
  //Get document by id
  emitValueById() {
    this.isLoading = true;
    if (this.inputId) {
      this.documentService.getDocumentResponse().subscribe(
        response => {
          this.isLoading = false;
          this.allDocuments = response.filter(doc => this.inputId === doc.numero.toString());
          this.inputId = "";
        },
        error => {
          console.log("Error" + error.message);
          this.isLoading = false;
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: 'Error 500'
          });
        }
      );
    }
  }

  //Get all documents
  getAllDocuments() {
    this.isLoading = true;
    this.failDocuments = [];
    this.documentService.getDocumentResponse().subscribe(
      response => {
        this.isLoading = false;
        this.allDocuments = response;
        return response;
      },
      error => {
        console.log("Error" + error.message);
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: 'Error 500'

        })
        return error
      }
    )
  }

  //Get Documents in failure
  getAllDocumentsInFailure(){
    this.firstDateClassDF = !this.firstDateClassDF;
    this.isLoading = true;
    if(this.firstDateNotFilledDF){
      this.documentService.getfailDocumentsByMonth<FailDocuments[]>(this.initialDate, this.finalDate).subscribe(
        response => {
          console.log(response);
          this.failDocuments = response;
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
        }
      )
    }else{
      Swal.fire({
        icon: 'info',
        title: 'Campos incompletos',
        text: 'Llena el campo fecha de inicio'
      })
      this.isLoading = false;
    }
  }

}
