import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { recipeModel } from '../admin/model/recipeModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //  SERVER_URL ="http://localhost:3000"
  SERVER_URL ="https://cookpedia-server-3.onrender.com"

  constructor(private http:HttpClient) { }

  getAllRecipesAPI(){
    return this.http.get(`${this.SERVER_URL}/all-recipes`)
  }
  addTestimonyAPI(reqBody:any){
    return this.http.post(`${this.SERVER_URL}/add-testimony`,reqBody)
  }
  registerAPI(reqBody:any){
    return this.http.post(`${this.SERVER_URL}/register`,reqBody)
  }
  loginAPI(reqBody:any){
    return this.http.post(`${this.SERVER_URL}/login`,reqBody)
  }

  //appendToken in req Header
  appendToken(){
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem('token')
    if(token){
      headers = headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }

  //recipe/:id/view
  viewRecipeAPI(recipeId:string){
    return this.http.get(`${this.SERVER_URL}/recipe/${recipeId}/view`,this.appendToken())
  }
  ///related-recipes?cuisine=Italian
relatedRecipeAPI(cuisine:string){
  return this.http.get(`${this.SERVER_URL}/related-recipes?cuisine=${cuisine}`,this.appendToken())

}
downloadRecipeAPI(recipeId:string,reqBody:any){
  return this.http.post(`${this.SERVER_URL}/recipe/${recipeId}/download`,reqBody,this.appendToken())
}

//recipe/:id/save
saveRecipeAPI(recipeId:string,reqBody:any){
  return this.http.post(`${this.SERVER_URL}/recipe/${recipeId}/save`,reqBody,this.appendToken())
}
getUserSaveRecipesAPI(){
  return this.http.get(`${this.SERVER_URL}/get-save-recipes`,this.appendToken())
}
deleteSaveRecipeAPI(id:string){
  return this.http.delete(`${this.SERVER_URL}/save-recipes/${id}/remove`,this.appendToken())
}

getUserDownloadRecipesAPI(){
  return this.http.get(`${this.SERVER_URL}/user-downloads`,this.appendToken())

}

// user/edit
editUserAPI(reqBody:any){
  return this.http.post(`${this.SERVER_URL}/user/edit`,reqBody,this.appendToken())

}
//all-users
allUserAPI(){
  return this.http.get(`${this.SERVER_URL}/all-users`,this.appendToken())

}
//dowload-list
allDowloadListAPI(){
  return this.http.get(`${this.SERVER_URL}/download-list`,this.appendToken())

}
// all-feedback
getAllFeedbackAPI(){
  return this.http.get(`${this.SERVER_URL}/all-feedback`,this.appendToken())
}
// http://localhost:4001/feedback/67505a34cbdae7a8fba288b9/update?status=Approved
updateFeedbackStatusAPI(feedBackId:string,status:string){
  return this.http.get(`${this.SERVER_URL}/feedback/${feedBackId}/update?status=${status}`,this.appendToken())
}
// all-approve-feedback
getAllApprovedFeedbackAPI(){
  return this.http.get(`${this.SERVER_URL}/all-approve-feedack`)
}
//add-recipe
addRecipeAPI(reqBody:any){
  return this.http.post(`${this.SERVER_URL}/add-recipe`,reqBody,this.appendToken())

}
  ///recipe/675fa9bc6a94cf81c3f38861/edit
  updateRecipeAPI(id:string,reqBody:recipeModel){
    return this.http.put(`${this.SERVER_URL}/recipe/${id}/edit`,reqBody,this.appendToken())
  }
  ///recipe/675fa9bc6a94cf81c3f38861/remove
  deleteRecipeAPI(id:string){
    return this.http.delete(`${this.SERVER_URL}/recipes/${id}/remove`,this.appendToken())
  }

  //getChartdata
  getChartData(){
    this.allDowloadListAPI().subscribe((res:any)=>{
      console.log(res);
      // code extracting cuisine and its total download count as object and added to an array.
      // input : [  {recipeCuisine,count}   ]"
      // output : [   {name:recipeCuisine,y:totalCount}  ]

      //algorithm
      // 1. create an empty array for utput, object for storing each array item
      // 2. get each array item of res and store its recipeCuisine & count to a variable
      // 3. check recipeCuisine is available in output object, if present then set the value of recipeCuisine key as total existing recipeCuisine value with nre count, not present then insert recipeCuisine as key and value as its count
      // 4. push each key from output object into output array

      let downloadArrayList:any = []
      let output:any = {}
      res.forEach((item:any)=>{
        // item = {recipeCuisine: "Mexican", count:4}
        let cuisine = item.recipeCuisine // cuisine = "Mexican"
        let currentCount = item.count // count = 4
        if(output.hasOwnProperty(cuisine)){
          output[cuisine] += currentCount
        }else{
          output[cuisine] = currentCount // output = {Mexican:4}
        }
      })
      console.log(output);
      for(let cuisine in output){
        downloadArrayList.push({name:cuisine,y:output[cuisine]})
      }
      console.log(downloadArrayList);
      localStorage.setItem("chart",JSON.stringify(downloadArrayList))
    })

  }
} 


