import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router)
  if(sessionStorage.getItem("token")){
    //authorised user
    return true;

  }else{
    //unauthorised user
    alert("Unauthorised Access..Please Login!!")
    //navigate to login page
    router.navigateByUrl('/login')
    return false;

  }
};
