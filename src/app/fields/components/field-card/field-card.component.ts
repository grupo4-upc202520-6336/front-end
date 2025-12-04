import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Fields } from "../../models/fields.entity";
import { MatCard, MatCardActions, MatCardContent, MatCardImage } from "@angular/material/card";
import { MatButton } from "@angular/material/button";
import { FieldsService } from "../../services/fields.service";
import { NgIf } from "@angular/common";
import { Router } from "@angular/router";
import { FieldFormEditComponent } from "../field-form-edit/field-form-edit.component";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-field-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardImage,
    MatCardContent,
    MatCardActions,
    MatButton,
    NgIf,
    FieldFormEditComponent,
    TranslateModule
  ],
  templateUrl: './field-card.component.html',
  styleUrl: './field-card.component.css'
})
export class FieldCardComponent {

  @Input() field!: Fields;

  // Eventos hacia el padre
  @Output() deleteField = new EventEmitter<void>();
  @Output() editField = new EventEmitter<number>();

  isModalOpen: boolean = false;

  fieldService: FieldsService = inject(FieldsService);

  constructor(private router: Router) {}

  // ----------------------------
  // 🗑️ ELIMINAR FIELD
  // ----------------------------
  onFieldDeleted(fieldId: number): void {
    this.fieldService.deleteField(fieldId, this.field.producerId).subscribe(() => {
      console.log(`Field ${fieldId} deleted`);
      this.deleteField.emit();
    });
  }

  // ----------------------------
  // ✏️ ABRIR FORMULARIO DE EDICIÓN
  // ----------------------------
  openModal() {
    this.editField.emit(this.field.id);
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onEditSuccess() {
    this.editField.emit(this.field.id);
    this.closeModal();
  }

  // ----------------------------
  // 🌱 NAVEGAR AL HOME DEL PROCESO AGRÍCOLA
  // ----------------------------
  goToHome(fieldId: number) {
    console.log("Navigating to field:", fieldId);

    this.router.navigate([`/producer/home-agricultural-process/${fieldId}`]);
  }
}
