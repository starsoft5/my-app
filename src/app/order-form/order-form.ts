import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Component({
  selector: 'order-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './order-form.html'
})
export class OrderFormComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  orderForm!: FormGroup;
  products: any[] = [];
  private baseUrl = environment.azureFunctionBaseUrl;
  ngOnInit() {
    this.orderForm = this.fb.group({
      customerName: ['', Validators.required],
      orderDate: ['', Validators.required],
      address: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      items: this.fb.array([])
    });

    this.loadProducts();
    this.addItem(); // Add initial row
  }

  loadProducts() {
    this.http.get<any[]>(`${this.baseUrl}/GetAllProductsFunction`)
      .subscribe(data => this.products = data);
  }

  get items(): FormArray {
    return this.orderForm.get('items') as FormArray;
  }

  addItem() {
    const item = this.fb.group({
      productId: [0, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [{ value: 0, disabled: true }, Validators.required],
      lineTotal: [{ value: 0, disabled: true }]
    });

    item.get('productId')?.valueChanges.subscribe(productId => {
      const validProductId = productId ?? '';
      const product = this.products.find(p => p.id === +validProductId);
      const price = product ? product.price : 0;
      const quantity = item.get('quantity')?.value ?? 0;
      item.patchValue({ price, lineTotal: price * quantity });
    });

    item.get('quantity')?.valueChanges.subscribe(qty => {
      const price = item.get('price')?.value || 0;
      const quantity = qty ?? 0;
      item.patchValue({ lineTotal: price * quantity }, { emitEvent: false });
    });

    this.items.push(item);
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  get grandTotal(): number {
    return this.items.controls.reduce((sum, ctrl) => {
      return sum + (ctrl.get('lineTotal')?.value || 0);
    }, 0);
  }

  onSubmit() {
    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      return;
    }

    const formValue = this.orderForm.getRawValue(); // Includes disabled fields
    const order = {
      customerName: formValue.customerName,
      orderDate: formValue.orderDate,
      address: formValue.address,
      mobileNumber: formValue.mobileNumber,
      items: formValue.items.map((item: any) => ({
        Id: Number(item.productId),
        quantity: item.quantity,
        price: item.price
      }))
    };

    this.http.post(`${this.baseUrl}/CreateOrderFunction`, order).subscribe(res => {
      alert('Order submitted successfully!');
      this.orderForm.reset();
      this.items.clear();
      this.addItem();
    });
  }
}
