import { Component, OnInit, OnDestroy } from '@angular/core';
import { Document } from '../document';

import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit, OnDestroy {
  document: Document;
  private _docSub: Subscription;

  constructor(
    private documentService: DocumentService
  ) { }

  ngOnInit() {
    this._docSub = this.documentService.currentDocument
      .pipe(
        startWith({id: '', doc: 'Selecione um documento existente ou crie um novo para iniciar'})
      )
      .subscribe(
        document => this.document = document
      )
  }

  ngOnDestroy(): void {
    this._docSub.unsubscribe();
  }

  editDoc() {
    this.documentService.editDocument(this.document);
  }

}
