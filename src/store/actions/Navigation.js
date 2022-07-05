import { endPoint } from '../../config/Config';
import axios from 'axios'
export const doGetNavigation = (  setShowMainLoader) => async (dispatch) => {
    try { 
        
        

        const api = `${endPoint}api/navigation`; 
        const token =  `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}` 
      const data =await  axios.get(api , { headers: {"Authorization" : token} }).then(res => {
     
        setShowMainLoader(false);
   
          return res.data ;
        }) 
        .catch((error) => {
            console.log(error)
        }); 
        localStorage.setItem("userName", data.userName);
        localStorage.setItem("roleName", data.RoleName);
      await  dispatch({
            type: "GET_NAV",
            payload: data,
        })
       
    }
    catch (error) {
        // alert(error?.response?.data?.message)
    }
}
