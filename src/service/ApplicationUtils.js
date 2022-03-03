import React from 'react';
import {appendErrors} from "react-hook-form";

const PATH = '/certificates';
const TAG = 'tag';
const NAME = 'name';
const DESCRIPTION = 'description';
const USER = 'user';
const JWT = 'jwt';

class ApplicationUtils{
    clearElementText(element){
        let el = document.querySelector(element);
        el.innerHTML = '';
    }

    addTextToElement(element, text){
        let el = document.querySelector(element);
        el.textContent += text;
    }

    tagsArrayToString(tags){
        let tagsNames = [];
        tags.forEach((tag) => {
            tagsNames.push(tag.name);
        });

        return tagsNames.join(' ');
    }

    isLogin(login){
        if(login===null){
            return false;
        }
        return localStorage.getItem(login) !== null;
    }

    getQueryParams(){
        return new URLSearchParams(window.location.search);
    }

    getQueryParam(param){
        return this.getQueryParams().get(param);
    }

    setQueryParam(param, value, path, doReplace){
        if(param && path) {
            let url = this.getQueryParams();
            doReplace === true? url.set(param, value) : url.append(param, value);
            window.history.pushState('', '', path + '?' +url.toString())
        }
    }

    createSearchQuery(values){
        if(!values){
            return;
        }
        let valArray = values.split(' ');

       // for(let i = 0;i < valArray.length;i++){
            if (valArray.length === 1) {
                this.setQueryParam('tag1', valArray[0], PATH);
            } else {
                this.setQueryParam('tag1', valArray[0], PATH);
                this.setQueryParam('tag2', valArray[1], PATH);
            }
            
       // }
        this.setQueryParam("offset", 0, PATH, true);
        this.setQueryParam("limit", 10, PATH, true);

        return this.getQueryParams();
    }

    clearSearchQuery(path){
        let url = this.getQueryParams();

        url.delete('tag1');
        url.delete('tag2');
        // url.delete(DESCRIPTION);
        window.history.pushState('', '', path + '?' +url.toString())
    }

    getCurrentUser(){
        return localStorage.getItem(JWT);
    }

    isNumber(value){
        console.log('heyho nan'+value);
       if (isNaN(value)) {
           return false;
       } else {
           return true;
       }
    }
    
    isPositiveNumber(value){
        return value >= 0;
    }
}

export default new ApplicationUtils();