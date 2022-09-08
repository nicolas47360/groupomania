export function getAuthToken() {
    return localStorage.getItem("token");
}

export function isLoggedIn() {
    let authToken = getAuthToken();
    if (authToken) {
        return authToken;
    }
    return null;
}
