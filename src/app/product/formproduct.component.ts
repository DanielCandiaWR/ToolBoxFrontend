import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product.service';
import { Router,ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
    selector: 'app-form-product',
    templateUrl: './formproduct.component.html'
})

export class FormProductComponent implements OnInit{

    protected product: Product = new Product()
    protected title:string = "Add Product"
    protected errors:string[];

    constructor(
        private productService: ProductService, 
        private router: Router,
        private activatedRoute: ActivatedRoute
    ){}

    ngOnInit(){
        this.uploadProduct();
    }

    uploadProduct(): void{
        this.activatedRoute.params.subscribe(params => {
            let id = params['id']
            if(id){
                this.productService.getProduct(id).subscribe( (product) => this.product = product)
            }
        })
    }

    createProduct(): void{
        this.productService.createProduct(this.product).subscribe(
            product =>  {
                this.router.navigate(['./products'])
                swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'New Product Added',
                    text: `Product ${product.productName} was successfully created`,
                    showConfirmButton: false,
                    timer: 1500
                })
            }, err =>{
                this.errors = err.error.errors as string[];
            }
        )
    }

    updateProduct(): void {
        this.productService.updateProduct(this.product).subscribe( 
            product => {
                this.router.navigate(['/products'])
                swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Updated Product',
                    text: `Product ${product.productName} was successfully updated`,
                    showConfirmButton: false,
                    timer: 1500
                })
            },err =>{
                this.errors = err.error.errors as string[];
            }
        )
    }
}