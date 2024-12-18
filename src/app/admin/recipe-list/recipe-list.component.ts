import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {

  allRecipes:any = []
  searchRecipe:any = ""
  constructor(private api:ApiService){}
  
  ngOnInit(){
    this.getAllRecipes()
  }
  getAllRecipes(){
    this.api.getAllRecipesAPI().subscribe((res:any)=>{
      this.allRecipes = res
      console.log(this.allRecipes);
      
    })
  }
  removeRecipe(id:string){
    this.api.deleteRecipeAPI(id).subscribe((res:any)=>{
      this.getAllRecipes()
    })
  }
}
