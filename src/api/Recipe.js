import request from './axios'

// API methods for recipes

export function getRecipes(options={page: 1, pageSize: 10}) {
    const params = new URLSearchParams(options);
    return request({
        url: "/recipes?" + params.toString(),
        method: "get" 
    })
}


export function getRecipeById(id) {
    return request({
        url: `/recipe/${id}`,
        method: "get" 
    })
}

export function editRecipe(id,recipe) {
    return request({
        url: `/recipe/${id}`,
        method: "put",
        data: recipe
    })
}

export function removeRecipe(id) {
    return request({
        url: `/recipe/${id}`,
        method: "delete"
    })
}

export function createRecipe(recipe) {
    return request({
        url: `/recipe/create`,
        method: "post",
        data: recipe
    })
}