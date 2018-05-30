import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    //----------------------------------------------------------
    urlPoint: any = 'http://www.monosisgroup.com/api/';
    //urlPoint: any = 'http://localhost:5001/api/';
    urlBase: any = 'azmoon_base/';
    urlApp: any = 'azmoon_app/';
    urlSignup: any = 'azmoon_app_signup/';
    //----------------------------------------------------------
    constructor(private http: HttpClient) { }
    //----------------------------------------------------------
    public getUrlPoint() {
        return this.urlPoint;
    }
    //----------------------------------------------------------
    public getUrlApp() {
        return this.urlSignup;
    }
    //----------------------------------------------------------
    public getDate() {
        return this.http.get(this.urlPoint + 'currentDate');
    }
    //----------------------------------------------------------
    public getAllTeacher(data?: any) {
        return this.http.get(this.urlPoint + this.urlApp + 'find_teacher_for_app/' + data)
    }
    //----------------------------------------------------------
    public find_exam_lesson_by_teacher_name(data?: any, student_id?: any) {
        return this.http.get(this.urlPoint + this.urlApp + 'find_exam_lesson_by_teacher_name/' + data + '/' + student_id);
    }
    //----------------------------------------------------------
    public find_exam_list_by_lesson_name(lesson_name?: any, teacher_name?: any, student_id?: any) {
        return this.http.get(this.urlPoint + this.urlApp + 'find_exam_list_by_lesson_name/' + lesson_name + '/' + teacher_name + '/' + student_id);
    }
    //----------------------------------------------------------
    public find_exam_by_id(value?: any) {
        return this.http.get(this.urlPoint + this.urlApp + 'find_exam_by_id/' + value);
    }
    //----------------------------------------------------------
    public find_score_by_exam_id(value?: any) {
        return this.http.get(this.urlPoint + this.urlApp + 'find_score_by_exam_id/' + value);
    }
    //----------------------------------------------------------
    public find_study_by_name(value?: any) {
        return this.http.get(this.urlPoint + this.urlSignup + 'find_study_by_name/' + value);
    }
    //----------------------------------------------------------
    public mobile_in_use(value?: any) {
        return this.http.get(this.urlPoint + this.urlSignup + 'mobile_in_use/' + value);
    }
    //----------------------------------------------------------
    public generate_security_code(value?: any) {
        return this.http.get(this.urlPoint + this.urlSignup + 'generate_security_code/' + value, { observe: 'response' });
    }
    public check_security_code(value?: any, header?: any) {
        return this.http.get(this.urlPoint + this.urlSignup + 'check_security_code/' + value, { headers: { 's-token': header } });
    }
    //----------------------------------------------------------
    public save_result_exam(data?: any) {
        return this.http.post(this.urlPoint + this.urlApp + 'result_exam', data);
    }
    //-----------------------------------------------------------
    public find_student_exam_list(value?: any) {
        return this.http.get(this.urlPoint + this.urlApp + 'find_student_exam_list/' + value);
    }
    public find_student_exam_detail(exam_id?: any, student_id?: any) {
        return this.http.get(this.urlPoint + this.urlApp + 'find_student_exam_detail/' + exam_id + '/' + student_id);
    }
    //-----------------------------------------------------------
    public save_shekayat(data?: any) {
        return this.http.post(this.urlPoint + this.urlApp + 'save_shekayat', data);
    }
    //-----------------------------------------------------------
    public getSamanToken() {
        return this.http.get(this.urlPoint + 'payment/' + '5001' + '/' + 1500);
    }
    public test() {
        return this.http.get(this.urlPoint + 'test', { responseType: 'text', observe: 'response' });
    }
}