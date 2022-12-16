import { HttpHeaders } from "@angular/common/http";

export default function instance() {
    const headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    headers_object.append(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}`
    );
    headers_object.append('withCredentials', 'true');

    const httpOptions = {
        headers: headers_object,
    };

    return httpOptions;
}