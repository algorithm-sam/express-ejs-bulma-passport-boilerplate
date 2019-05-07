const connection = require("../db/mysql");


export const isAgent = () => {
    return true;
}

export const isSuperAgent = () => {
    return true;
}

export const isAdmin = () => {
    return true;
}