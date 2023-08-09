import { Injectable } from '@angular/core';
import { InfoData } from '../interfaces/Data';
import { HttpClient } from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { Documents } from '../interfaces/allDocuments';
import { Document } from '../interfaces/document';
import { FailDocuments } from '../interfaces/failDocuments';




@Injectable({ providedIn: 'root' })
export class DocumentService {

  private baseUrl: string = 'https://localhost:44353/api/Document'

  constructor(private http: HttpClient) { }

  //Get all documents
  getDocumentResponse(): Observable<Documents[]> {
    const url = `${this.baseUrl}/getDocumentResponse`;
    return this.http.get<Documents[]>(url);
  }

  //Get document by Id
  getInfoDocumentById(document: string): Observable<Document> {
    const url = `${this.baseUrl}/getInfoDocument?documento=${document}`
    return this.http.get<Document>(url);
  }

  //Send document by months
  getDocumentsByMonths(initialDate: string, finalDate: string) {

    if(initialDate && finalDate){
      const url = `${this.baseUrl}/getDocumentsMonth?initialDate=${initialDate}&finalDate=${finalDate}`;
      return this.http.post(url, {})
    }
    else{
      const url = `${this.baseUrl}/getDocumentsMonth?initialDate=${initialDate}`
      return this.http.post(url, {});
    }
  }

  //GetAllFailDocuments
  getfailDocumentsByMonth<FailDocuments>(initialDate: string, finalDate: string) {
    if(initialDate && finalDate){
      const url = `${this.baseUrl}/getFailDocumentsByMonth?initialDate=${initialDate}&finalDate=${finalDate}`
      return this.http.post<FailDocuments>(url, {});
    }
    const url = `${this.baseUrl}/getFailDocumentsByMonth?initialDate=${initialDate}`
    return this.http.post<FailDocuments>(url, {});
  }

  //Send all documents in fail
  sendAllDocumentsFailed(documentList: FailDocuments[]){
    const url = `${this.baseUrl}/sendFailedDocuments`;
    return this.http.post<FailDocuments[]>(url, documentList);
  }

  //SendOneDocument
  sendOneDocumentByFs(numeroFS: number, numeroDSE: number): Observable<Document>{
    const url = `${this.baseUrl}/SendDocument?invoiceNumber=${numeroFS}&numerotn=${numeroDSE}`;
    return this.http.post<Document>(url, {});
  }
}
