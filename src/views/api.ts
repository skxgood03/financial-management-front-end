import requests from "@/utlis/requests";

// 折线图接口
export function info(date:string){
    return requests({
        url:`/total_consumption?date=${date}`,
        method:"GET"
    })
}

export function total(date:string){
    return requests({
        url:`/annual_income?date=${date}`,
        method:"GET"
    })
}