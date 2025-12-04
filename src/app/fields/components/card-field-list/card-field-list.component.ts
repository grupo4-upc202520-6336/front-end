import { Component, Input, OnInit } from '@angular/core';
import { Fields } from "../../models/fields.entity";
import { FieldsService } from "../../services/fields.service";
import { FieldCardComponent } from "../field-card/field-card.component";
import { CommonModule } from '@angular/common';
import { MatButton } from "@angular/material/button";
import { FieldFormComponent } from "../field-form/field-form.component";
import { FieldFormEditComponent } from "../field-form-edit/field-form-edit.component";

@Component({
  selector: 'app-card-field-list',
  standalone: true,
  imports: [
    CommonModule,
    FieldCardComponent,
    MatButton,
    FieldFormComponent,
    FieldFormEditComponent,
  ],
  templateUrl: './card-field-list.component.html',
  styleUrl: './card-field-list.component.css'
})
export class CardFieldListComponent implements OnInit {

  fields: Array<Fields> = [];
  @Input() currentUserId!: number;

  isModalOpen = false;
  isEditModalOpen = false;

  selectedFieldId!: number;

  message: string = '';

  constructor(private fieldService: FieldsService) {}

  ngOnInit(): void {
    this.loadFields();
  }

  loadFields(): void {
    this.fieldService.getFieldsByUserId(this.currentUserId).subscribe((fields) => {
      this.fields = fields;
      this.message = fields.length === 0 ? 'No fields found' : '';
    });
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onFieldAdded(): void {
    this.loadFields();
    this.closeModal();
  }

  /** NUEVO: abrir modal de edición */
  openEditModal(fieldId: number): void {
    this.selectedFieldId = fieldId;
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

  onFieldEdited(): void {
    this.loadFields();
    this.closeEditModal();
  }

  reload() {
    this.loadFields();
  }
}
