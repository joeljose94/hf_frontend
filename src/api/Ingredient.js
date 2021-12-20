import request from './axios'

// API methods for ingredients

export function getAllIngredients() {
    return request({
        url: "/ingredients",
        method: "get" 
    })
}
