import { Injectable } from "@angular/core";
import * as loki from 'lokijs';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    //---------------------------------------------------------
    db = new loki('bus.json');
    //---------------------------------------------------------
    constructor() { }
    //---------------------------------------------------------
    getUserRange() {
        let user: any[] = [];
        user.push({ user_range_name: 'مقطع ابتدایی', user_range_value: 'ابتدایی', user_range_number: '6 تا 12 سال', range_value: '6-12', user_pic_default: 'range-boy-6-12.svg', user_sex_pic: [{ 'img': 'boy.svg', 'name': 'boy' }, { 'img': 'girl.svg', 'name': 'girl' }] });
        user.push({ user_range_name: 'مقطع متوسطه', user_range_value: 'متوسطه', user_range_number: '12 تا 18 سال', range_value: '12-18', user_pic_default: 'range-boy-12-18.svg', user_sex_pic: [{ 'img': 'boy.svg', 'name': 'boy' }, { 'img': 'girl.svg', 'name': 'boy' }] });
        user.push({ user_range_name: 'متوسطه به بالا', user_range_value: 'بالا', user_range_number: '18 سال به بالا', range_value: '18', user_pic_default: 'range-male-18.svg', user_sex_pic: [{ 'img': 'man.svg', 'name': 'man' }, { 'img': 'woman.svg', 'name': 'woman' }] });
        return user;
    }
    //---------------------------------------------------------
    inMemoryInsert(data?: any) {
        this.db.addCollection('user');
        this.db.getCollection('user').insert(data);
    }
    //---------------------------------------------------------
    inMemoryFindUser() {
        if (this.db.getCollection('user')){
            return this.db.getCollection('user').find({ $loki: { '$gte': 1 } })[0];
        }
        else {
            if (localStorage.getItem('user')) {
                this.loadFromStorage(JSON.parse(localStorage.getItem('user')));
                localStorage.clear();
                return this.db.getCollection('user').find({ $loki: { '$gte': 1 } })[0];
            } else {
                return null;
            }
        }
    }
    //---------------------------------------------------------
    loadFromStorage(data?: any) {
        delete data.$loki;
        delete data.meta;
        this.inMemoryInsert(data);
    }
    //---------------------------------------------------------
    updateUser(new_user) {
        this.db.getCollection('user').remove(this.inMemoryFindUser());
        this.db.getCollection('user').insert(new_user);
    }
    //---------------------------------------------------------
}   