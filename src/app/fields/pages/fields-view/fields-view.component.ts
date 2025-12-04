import { Component } from '@angular/core';
import { CardFieldListComponent } from "../../components/card-field-list/card-field-list.component";
import {
  NavbarAgriculturalProducerComponent
} from "../../../public/components/navbar-agricultural-producer/navbar-agricultural-producer.component";
import { TranslateModule } from "@ngx-translate/core";
import { FieldsService } from "../../services/fields.service";
import { Fields } from "../../models/fields.entity";

@Component({
  selector: 'app-fields-view',
  standalone: true,
  imports: [
    CardFieldListComponent,
    NavbarAgriculturalProducerComponent,
    TranslateModule
  ],
  templateUrl: './fields-view.component.html',
  styleUrl: './fields-view.component.css'
})
export class FieldsViewComponent {

  userId!: number;
  fields: Fields[] = [];

  constructor(private fieldsService: FieldsService) {
    this.getUserIdFromLS();
    this.loadFields();
  }

  getUserIdFromLS() {
    this.userId = JSON.parse(localStorage.getItem('userId') || '0');
  }

  loadFields() {
    this.fieldsService.getFieldsByUserId(this.userId).subscribe({
      next: (response) => {
        this.fields = response;
        console.log("FIELDS:", this.fields);
      },
      error: (err) => {
        console.error("Error al cargar fields:", err);
      }
    });
  }
}
