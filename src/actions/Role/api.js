const url = localStorage.getItem("authUser");
// UserApi 
export const fetchUser =async () => {
 
 var finalReturn=   fetch(url + "/api/Users")
    .then((response) => response.json())
    .then((json) => {
 
    //   setUserRegistered(json);

   var nestedApi=   fetch(url + "/api/Roles")
        .then((response) => response.json())
        .then((role) => {
        //   setRoles(role);
        //   setSelectedRole(role[0].Id)
        //   setisLoading(false);
        // returner = {
        //     UserRegistered :json,
        //     role :role,
        //     selectedRole :role[0].Id
        // };
    
   return {
            UserRegistered :json,
            role :role,
            selectedRole :role[0].Id
        } 
    });
return nestedApi
    }); 
return finalReturn;
};
// export const createPost = (newPost) => axios.post(url, newPost);
// export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
// export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
// export const deletePost = (id) => axios.delete(`${url}/${id}`);
