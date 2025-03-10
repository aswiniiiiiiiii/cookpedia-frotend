import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions = {

  }

  selected = new Date()
  isSideBarOpen:boolean = true
  columnWidth:string = "col-lg-10"
  userCount:number = 0
  recipeCount:number = 0
  downloadCount:number = 0
  requestCount:number = 0


  constructor(private router:Router,private api:ApiService){
   if(localStorage.getItem('chart')){
    let chartData = JSON.parse(localStorage.getItem("chart") || "")
    this.chartOptions = {
      chart :{
        type:'bar'
      },
      title:{
        text:'Analysis of Download Recipe Based on Cuisine',
        align:'left'
      },
      xAxis:{
        type:'category'
      },
      yAxis:{
        title:{
          text:'Total Download Recipe Count'
        }
      },
      legend:{
        enabled:false
      },
      credits:{
        enabled:false
      },
      series:[{
        name:"Cuisine",
        colorByPoint:true,
        type:'bar',
        data:chartData
      }]
    }
   }
    
  }

  ngOnInit(){
    this.getUserCount()
    this.getRecipeCount()
    this.getDownloadCount()
    this.getRequestCount()
  }

  getUserCount(){
    this.api.allUserAPI().subscribe((res:any)=>{
      this.userCount = res.length
      // console.log(this.userCount);
      
    })
  }
  
 getRecipeCount(){
    this.api.getAllRecipesAPI().subscribe((res:any)=>{
      this.recipeCount = res.length
    })
  }

  // getDownloadCount(){
  //   this.api.allDowloadListAPI().subscribe((res:any)=>{
  //     this.downloadCount = res.map((item:any)=>item.count).reduce((a:any,b:any)=>a+b)
  //   })
  //   console.log(res);
  //   let downloadArrayList:any = []
  //   let output:any = {}
  //   res.forEach((item:any)=>{
  //   let cuisine = item.recipeCuisine //cuisine = mexican
  //   let currentCount = item.count //currentCount=4
  //   if(output.hasOwnProperty(cuisine)){
  //     output[cuisine] +=currentCount

  //   }else{
  //     output[cuisine] = currentCount  //output={Meaxican=4}
  //   }
  //   })
  //   console.log(output);
  //   for(let cuisine in output){
  //     downloadArrayList.push({name:cuisine,y:output[cuisine]})

  //   }
  //   console.log(downloadArrayList);
    
    
  // }
  getDownloadCount(){
    this.api.allDowloadListAPI().subscribe((res:any)=>{
      this.downloadCount = res.map((item:any)=>item.count).reduce((a:any,b:any)=>a+b)
 
    })
  }
  getRequestCount(){
    this.api.allUserAPI().subscribe((res:any)=>{
      this.requestCount = res.filter((item:any)=>item.status=="Pendng").length
    })
  }
  menuBtnClick(){
    this.isSideBarOpen =!this.isSideBarOpen
    this.columnWidth = "col"
  }

  logoutAdmin(){
    sessionStorage.clear()
    localStorage.clear()
    this.router.navigateByUrl('/')
  }
}
