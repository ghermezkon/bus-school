import { Injectable } from "@angular/core";

@Injectable()
export class MessageService {
    constructor() { }
    getUserRange() {
        let user: any[] = [];
        user.push({ user_range_name: 'مقطع ابتدایی', user_range_value: 'ابتدایی', user_range_number: '6 تا 12 سال', range_value: '6-12', user_pic_default: 'range-boy-6-12.svg', user_sex_pic: [{ 'img': 'boy.svg', 'name': 'boy' }, { 'img': 'girl.svg', 'name': 'girl' }] });
        user.push({ user_range_name: 'مقطع متوسطه', user_range_value: 'متوسطه', user_range_number: '12 تا 18 سال', range_value: '12-18', user_pic_default: 'range-boy-12-18.svg', user_sex_pic: [{ 'img': 'boy.svg', 'name': 'boy' }, { 'img': 'girl.svg', 'name': 'boy' }] });
        user.push({ user_range_name: 'متوسطه به بالا', user_range_value: 'بالا', user_range_number: '18 سال به بالا', range_value: '18', user_pic_default: 'range-male-18.svg', user_sex_pic: [{ 'img': 'man.svg', 'name': 'man' }, { 'img': 'woman.svg', 'name': 'woman' }] });
        return user;
    }
}