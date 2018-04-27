import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
    //----------------------------------------------------------
    urlPoint: any = 'http://www.monosisgroup.com/api/';
    //urlPoint: any = 'http://localhost:5001/api/';
    urlBase: any = 'azmoon_base/';
    urlApp: any = 'azmoon_app/';
    //----------------------------------------------------------
    constructor(private http: HttpClient) { }
    //----------------------------------------------------------
    public getUrlPoint() {
        return this.urlPoint;
    }
    public getUrlApp() {
        return this.urlApp;
    }
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
    public find_exam_list_by_lesson_name(lesson_name?: any, teacher_name?: any,  student_id?: any) {
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
        return this.http.get(this.urlPoint + this.urlApp + 'find_study_by_name/' + value);
    }
    //----------------------------------------------------------
    public mobile_in_use(value?: any) {
        return this.http.get(this.urlPoint + this.urlApp + 'mobile_in_use/' + value);
    }
    //----------------------------------------------------------
    public generate_security_code(value?: any) {
        return this.http.get(this.urlPoint + this.urlApp + 'generate_security_code/' + value, { observe: 'response' });
    }
    public check_security_code(value?: any, header?: any) {
        return this.http.get(this.urlPoint + this.urlApp + 'check_security_code/' + value, { headers: { 's-token': header } });
    }
    //----------------------------------------------------------
    public save_result_exam(data?: any) {
        return this.http.post(this.urlPoint + this.urlApp + 'result_exam', data);
    }
}